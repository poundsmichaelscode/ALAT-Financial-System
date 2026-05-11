import { Request, Response, NextFunction } from 'express';
import QRCode from 'qrcode';
import { Receipt } from '../models/Receipt.js';
import { Invoice } from '../models/Invoice.js';

export async function listReceipts(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Receipt.find({ business: req.user!.activeBusiness }).populate('invoice').sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: items });
  } catch (e) { next(e); }
}

export async function createReceipt(req: Request, res: Response, next: NextFunction) {
  try {
    let amount = Number(req.body.amount || 0);
    let paidBy = req.body.paidBy || 'Customer';
    if (req.body.invoiceId) {
      const invoice = await Invoice.findOne({ _id: req.body.invoiceId, business: req.user!.activeBusiness });
      if (invoice) {
        amount = amount || invoice.total;
        paidBy = paidBy || invoice.clientName;
      }
    }
    const receiptNumber = req.body.receiptNumber || `RCT-${Date.now()}`;
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({ receiptNumber, amount, paidBy }));
    const receipt = await Receipt.create({
      business: req.user!.activeBusiness,
      invoice: req.body.invoiceId,
      receiptNumber,
      amount,
      paidBy,
      qrCodeUrl
    });
    res.status(201).json({ success: true, data: receipt });
  } catch (e) { next(e); }
}
