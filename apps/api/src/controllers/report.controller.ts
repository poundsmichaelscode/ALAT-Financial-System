import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Expense } from '../models/Expense.js';
import { Invoice } from '../models/Invoice.js';

export async function profitLoss(req: Request, res: Response, next: NextFunction) {
  try {
    const businessObjectId = new mongoose.Types.ObjectId(req.user!.activeBusiness!);
    const [expenses, income] = await Promise.all([
      Expense.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: '$category', total: { $sum: '$amount' } } }]),
      Invoice.aggregate([{ $match: { business: businessObjectId, status: 'paid' } }, { $group: { _id: null, total: { $sum: '$total' } } }])
    ]);
    const totalIncome = income[0]?.total || 0;
    const totalExpenses = expenses.reduce((sum: number, item: any) => sum + item.total, 0);
    res.json({ success: true, data: { totalIncome, totalExpenses, netProfit: totalIncome - totalExpenses, expenses } });
  } catch (e) { next(e); }
}
