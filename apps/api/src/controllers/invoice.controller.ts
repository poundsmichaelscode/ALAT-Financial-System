import { Request, Response, NextFunction } from 'express';
import PDFDocument from 'pdfkit';
import * as XLSX from 'xlsx';
import { Invoice } from '../models/Invoice.js';
import { Transaction } from '../models/Transaction.js';
import { pagination } from '../utils/query.js';
import { AppError } from '../utils/AppError.js';

function calculateInvoice(body: any) {
  const items = (body.items || []).map((item: any) => ({
    description: item.description || item.name || 'Service',
    quantity: Number(item.quantity || 1),
    unitPrice: Number(item.unitPrice || item.price || 0)
  })).filter((item: any) => item.quantity > 0 && item.unitPrice >= 0);
  const subtotal = items.reduce((sum: number, item: any) => sum + item.quantity * item.unitPrice, 0);
  const tax = Number(body.tax || 0);
  const discount = Number(body.discount || 0);
  const total = Math.max(subtotal + tax - discount, 0);
  return { items, subtotal, tax, discount, total };
}

function makeInvoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
}

async function streamInvoicePdf(invoice: any, res: Response) {
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {
    const result = Buffer.concat(chunks);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${invoice.invoiceNumber}.pdf`);
    res.send(result);
  });

  doc.fontSize(22).text('ALAT Financial System', { align: 'left' });
  doc.moveDown(0.5).fontSize(18).text('INVOICE', { align: 'right' });
  doc.moveDown();
  doc.fontSize(11).text(`Invoice No: ${invoice.invoiceNumber}`);
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
  doc.text(`Due Date: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}`);
  doc.text(`Status: ${invoice.status}`);
  doc.moveDown();
  doc.fontSize(13).text('Bill To', { underline: true });
  doc.fontSize(11).text(invoice.clientName || 'Client');
  if (invoice.clientEmail) doc.text(invoice.clientEmail);
  if (invoice.clientAddress) doc.text(invoice.clientAddress);
  doc.moveDown();

  doc.fontSize(12).text('Items', { underline: true });
  doc.moveDown(0.4);
  invoice.items.forEach((item: any, index: number) => {
    doc.fontSize(10).text(`${index + 1}. ${item.description} | Qty: ${item.quantity} | Unit: ${item.unitPrice.toLocaleString()} | Total: ${(item.quantity * item.unitPrice).toLocaleString()}`);
  });
  doc.moveDown();
  const subtotal = invoice.items.reduce((s: number, i: any) => s + i.quantity * i.unitPrice, 0);
  doc.fontSize(12).text(`Subtotal: ${subtotal.toLocaleString()}`, { align: 'right' });
  doc.text(`Tax: ${(invoice.tax || 0).toLocaleString()}`, { align: 'right' });
  doc.text(`Discount: ${(invoice.discount || 0).toLocaleString()}`, { align: 'right' });
  doc.fontSize(15).text(`Grand Total: ${invoice.total.toLocaleString()}`, { align: 'right' });
  if (invoice.notes) { doc.moveDown(); doc.fontSize(10).text(`Notes: ${invoice.notes}`); }
  doc.end();
}

export async function listInvoices(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit, skip, page } = pagination(req.query);
    const filter: any = { business: req.user!.activeBusiness };
    if (req.query.status) filter.status = req.query.status;
    const [items, total] = await Promise.all([
      Invoice.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Invoice.countDocuments(filter)
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
  } catch (e) { next(e); }
}

export async function createInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.clientName) return next(new AppError(400, 'Client name is required'));
    const totals = calculateInvoice(req.body);
    if (!totals.items.length) return next(new AppError(400, 'At least one invoice item is required'));
    const invoiceNumber = req.body.invoiceNumber || makeInvoiceNumber();
    const invoice = await Invoice.create({
      ...req.body,
      ...totals,
      invoiceNumber,
      business: req.user!.activeBusiness
    });
    if (invoice.status === 'paid') {
      await Transaction.create({ business: req.user!.activeBusiness, type: 'income', source: 'invoice', amount: invoice.total, description: `Invoice ${invoiceNumber}`, referenceId: String(invoice._id) });
    }
    res.status(201).json({ success: true, data: invoice });
  } catch (e) { next(e); }
}

export async function updateInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const update: any = { ...req.body };
    if (req.body.items) Object.assign(update, calculateInvoice(req.body));
    const item = await Invoice.findOneAndUpdate({ _id: req.params.id, business: req.user!.activeBusiness }, update, { new: true, runValidators: true });
    if (!item) return next(new AppError(404, 'Invoice not found'));
    if (item.status === 'paid') {
      await Transaction.findOneAndUpdate(
        { business: req.user!.activeBusiness, source: 'invoice', referenceId: String(item._id) },
        { type: 'income', amount: item.total, description: `Invoice ${item.invoiceNumber}` },
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, data: item });
  } catch (e) { next(e); }
}

export async function deleteInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, business: req.user!.activeBusiness });
    if (!invoice) return next(new AppError(404, 'Invoice not found'));
    await Transaction.deleteOne({ business: req.user!.activeBusiness, source: 'invoice', referenceId: String(invoice._id) });
    res.json({ success: true, message: 'Invoice deleted' });
  } catch (e) { next(e); }
}

export async function downloadInvoicePdf(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, business: req.user!.activeBusiness });
    if (!invoice) return next(new AppError(404, 'Invoice not found'));
    await streamInvoicePdf(invoice, res);
  } catch (e) { next(e); }
}

export async function downloadInvoiceXlsx(req: Request, res: Response, next: NextFunction) {
  try {
    const invoice: any = await Invoice.findOne({ _id: req.params.id, business: req.user!.activeBusiness }).lean();
    if (!invoice) return next(new AppError(404, 'Invoice not found'));
    const rows = invoice.items.map((item: any) => ({
      InvoiceNumber: invoice.invoiceNumber,
      Client: invoice.clientName,
      Description: item.description,
      Quantity: item.quantity,
      UnitPrice: item.unitPrice,
      LineTotal: item.quantity * item.unitPrice,
      Tax: invoice.tax,
      Discount: invoice.discount,
      GrandTotal: invoice.total,
      Status: invoice.status,
      CreatedAt: invoice.createdAt
    }));
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Invoice');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${invoice.invoiceNumber}.xlsx`);
    res.send(buffer);
  } catch (e) { next(e); }
}
