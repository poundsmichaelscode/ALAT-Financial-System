import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Expense } from '../models/Expense.js';
import { Invoice } from '../models/Invoice.js';
import { Payroll } from '../models/Payroll.js';
import { Transaction } from '../models/Transaction.js';

export async function profitLoss(req: Request, res: Response, next: NextFunction) {
  try {
    const businessObjectId = new mongoose.Types.ObjectId(req.user!.activeBusiness!);
    const [expenses, income, payroll] = await Promise.all([
      Expense.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: '$category', total: { $sum: '$amount' } } }]),
      Invoice.aggregate([{ $match: { business: businessObjectId, status: 'paid' } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
      Payroll.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: null, total: { $sum: '$netPay' } } }])
    ]);
    const totalIncome = income[0]?.total || 0;
    const totalExpenses = expenses.reduce((sum: number, item: any) => sum + item.total, 0);
    const payrollTotal = payroll[0]?.total || 0;
    res.json({ success: true, data: { totalIncome, totalExpenses, payrollTotal, netProfit: totalIncome - totalExpenses - payrollTotal, expenses } });
  } catch (e) { next(e); }
}

export async function cashFlow(req: Request, res: Response, next: NextFunction) {
  try {
    const businessObjectId = new mongoose.Types.ObjectId(req.user!.activeBusiness!);
    const rows = await Transaction.aggregate([
      { $match: { business: businessObjectId } },
      { $group: { _id: { month: { $dateToString: { format: '%Y-%m', date: '$date' } }, type: '$type' }, total: { $sum: '$amount' } } },
      { $sort: { '_id.month': 1 } }
    ]);
    const map = new Map<string, any>();
    for (const row of rows) {
      const month = row._id.month;
      const item = map.get(month) || { month, income: 0, expenses: 0, net: 0 };
      if (row._id.type === 'income') item.income = row.total;
      if (row._id.type === 'expense') item.expenses = row.total;
      item.net = item.income - item.expenses;
      map.set(month, item);
    }
    res.json({ success: true, data: Array.from(map.values()) });
  } catch (e) { next(e); }
}

export async function taxSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const businessObjectId = new mongoose.Types.ObjectId(req.user!.activeBusiness!);
    const [invoiceTax, payrollTax, taxExpenses] = await Promise.all([
      Invoice.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: null, total: { $sum: '$tax' } } }]),
      Payroll.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: null, total: { $sum: '$tax' } } }]),
      Expense.aggregate([{ $match: { business: businessObjectId, category: 'Tax' } }, { $group: { _id: null, total: { $sum: '$amount' } } }])
    ]);
    res.json({ success: true, data: { invoiceTax: invoiceTax[0]?.total || 0, payrollTax: payrollTax[0]?.total || 0, taxExpenses: taxExpenses[0]?.total || 0 } });
  } catch (e) { next(e); }
}
