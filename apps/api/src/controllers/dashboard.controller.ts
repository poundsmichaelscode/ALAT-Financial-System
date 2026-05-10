import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Expense } from '../models/Expense.js';
import { Invoice } from '../models/Invoice.js';
import { Payroll } from '../models/Payroll.js';

export async function dashboardSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const businessId = req.user!.activeBusiness!;
    const businessObjectId = new mongoose.Types.ObjectId(businessId);

    const [expenseAgg, incomeAgg, pendingInvoices, payrollAgg, expensesByCategory, recentExpenses] = await Promise.all([
      Expense.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Invoice.aggregate([{ $match: { business: businessObjectId, status: 'paid' } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
      Invoice.countDocuments({ business: businessId, status: 'pending' }),
      Payroll.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: null, total: { $sum: '$netPay' } } }]),
      Expense.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: '$category', value: { $sum: '$amount' } } }, { $sort: { value: -1 } }]),
      Expense.find({ business: businessId }).sort({ date: -1 }).limit(6)
    ]);

    const totalExpenses = expenseAgg[0]?.total || 0;
    const totalIncome = incomeAgg[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        pendingInvoices,
        payrollTotal: payrollAgg[0]?.total || 0,
        expensesByCategory,
        recentExpenses,
        aiRecommendation: totalExpenses > totalIncome
          ? 'Expenses are higher than income. Review operational costs and recurring payments.'
          : 'Cash flow is positive. Consider allocating surplus to savings or growth.'
      }
    });
  } catch (e) { next(e); }
}
