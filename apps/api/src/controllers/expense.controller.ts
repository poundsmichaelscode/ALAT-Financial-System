import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Expense } from '../models/Expense.js';
import { Transaction } from '../models/Transaction.js';
import { pagination, dateFilter } from '../utils/query.js';
import { AppError } from '../utils/AppError.js';

function riskScore(amount: number, category: string) {
  let score = 12;
  if (amount > 250000) score += 35;
  if (['Miscellaneous', 'Marketing', 'Maintenance'].includes(category)) score += 10;
  return Math.min(score, 95);
}

export async function listExpenses(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit, skip, page } = pagination(req.query);
    const filter: any = { business: req.user!.activeBusiness, ...dateFilter(req.query) };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.approvalStatus = req.query.status;
    if (req.query.search) filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { category: { $regex: req.query.search, $options: 'i' } },
      { department: { $regex: req.query.search, $options: 'i' } }
    ];
    const [items, total] = await Promise.all([
      Expense.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
      Expense.countDocuments(filter)
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
  } catch (e) { next(e); }
}

export async function listIncome(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit, skip, page } = pagination(req.query);
    const filter: any = { business: req.user!.activeBusiness, type: 'income', ...dateFilter(req.query) };
    if (req.query.search) filter.description = { $regex: req.query.search, $options: 'i' };
    const [items, total] = await Promise.all([
      Transaction.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
      Transaction.countDocuments(filter)
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
  } catch (e) { next(e); }
}

export async function createExpense(req: Request, res: Response, next: NextFunction) {
  try {
    const amount = Number(req.body.amount);
    const category = String(req.body.category || 'Miscellaneous').trim();
    if (!req.body.title || !amount || amount <= 0) return next(new AppError(400, 'Title and a valid amount are required'));
    const expense = await Expense.create({
      ...req.body,
      category,
      amount,
      riskScore: riskScore(amount, category),
      business: req.user!.activeBusiness,
      createdBy: req.user!.userId
    });
    await Transaction.create({
      business: req.user!.activeBusiness,
      type: 'expense',
      source: 'expense',
      amount,
      description: req.body.title,
      date: req.body.date || new Date(),
      referenceId: String(expense._id)
    });
    res.status(201).json({ success: true, data: expense });
  } catch (e) { next(e); }
}

export async function createIncome(req: Request, res: Response, next: NextFunction) {
  try {
    const amount = Number(req.body.amount);
    if (!req.body.description || !amount || amount <= 0) return next(new AppError(400, 'Description and a valid amount are required'));
    const income = await Transaction.create({
      business: req.user!.activeBusiness,
      type: 'income',
      source: req.body.source || 'manual',
      amount,
      description: req.body.description,
      date: req.body.date || new Date(),
      referenceId: req.body.referenceId
    });
    res.status(201).json({ success: true, data: income });
  } catch (e) { next(e); }
}

export async function updateExpense(req: Request, res: Response, next: NextFunction) {
  try {
    const body = { ...req.body };
    if (body.amount) body.amount = Number(body.amount);
    if (body.amount || body.category) body.riskScore = riskScore(Number(body.amount || 0), body.category || 'Miscellaneous');
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id, business: req.user!.activeBusiness }, body, { new: true, runValidators: true });
    if (!expense) return next(new AppError(404, 'Expense not found'));
    await Transaction.findOneAndUpdate(
      { referenceId: String(expense._id), business: req.user!.activeBusiness, source: 'expense' },
      { amount: expense.amount, description: expense.title, date: expense.date },
      { new: true }
    );
    res.json({ success: true, data: expense });
  } catch (e) { next(e); }
}

export async function updateIncome(req: Request, res: Response, next: NextFunction) {
  try {
    const body = { ...req.body };
    if (body.amount) body.amount = Number(body.amount);
    const income = await Transaction.findOneAndUpdate({ _id: req.params.id, business: req.user!.activeBusiness, type: 'income' }, body, { new: true, runValidators: true });
    if (!income) return next(new AppError(404, 'Income record not found'));
    res.json({ success: true, data: income });
  } catch (e) { next(e); }
}

export async function deleteExpense(req: Request, res: Response, next: NextFunction) {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, business: req.user!.activeBusiness });
    if (!expense) return next(new AppError(404, 'Expense not found'));
    await Transaction.deleteOne({ referenceId: String(expense._id), business: req.user!.activeBusiness, source: 'expense' });
    res.json({ success: true, message: 'Expense deleted' });
  } catch (e) { next(e); }
}

export async function deleteIncome(req: Request, res: Response, next: NextFunction) {
  try {
    const income = await Transaction.findOneAndDelete({ _id: req.params.id, business: req.user!.activeBusiness, type: 'income' });
    if (!income) return next(new AppError(404, 'Income record not found'));
    res.json({ success: true, message: 'Income record deleted' });
  } catch (e) { next(e); }
}

export async function expenseSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const businessObjectId = new mongoose.Types.ObjectId(req.user!.activeBusiness!);
    const [expensesByCategory, expenseTotal, incomeTotal, monthly, risky] = await Promise.all([
      Expense.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } }, { $sort: { total: -1 } }]),
      Transaction.aggregate([{ $match: { business: businessObjectId, type: 'expense' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Transaction.aggregate([{ $match: { business: businessObjectId, type: 'income' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Transaction.aggregate([{ $match: { business: businessObjectId } }, { $group: { _id: { month: { $dateToString: { format: '%Y-%m', date: '$date' } }, type: '$type' }, total: { $sum: '$amount' } } }, { $sort: { '_id.month': 1 } }]),
      Expense.find({ business: businessObjectId }).sort({ riskScore: -1, amount: -1 }).limit(5)
    ]);
    const chartMap = new Map<string, any>();
    for (const row of monthly) {
      const month = row._id.month;
      const record = chartMap.get(month) || { month, income: 0, expenses: 0, net: 0 };
      if (row._id.type === 'income') record.income = row.total;
      if (row._id.type === 'expense') record.expenses = row.total;
      record.net = record.income - record.expenses;
      chartMap.set(month, record);
    }
    const totalExpenses = expenseTotal[0]?.total || 0;
    const totalIncome = incomeTotal[0]?.total || 0;
    const largest = expensesByCategory[0];
    res.json({ success: true, data: {
      totalExpenses, totalIncome,
      profit: Math.max(totalIncome - totalExpenses, 0),
      loss: Math.max(totalExpenses - totalIncome, 0),
      netBalance: totalIncome - totalExpenses,
      expensesByCategory,
      monthly: Array.from(chartMap.values()),
      risky,
      aiInsight: totalExpenses === 0 ? 'No expenses yet. Start tracking expenses to unlock useful AI insights.' :
        `${largest?._id || 'General'} is your highest spending category. ${totalIncome >= totalExpenses ? 'Your business is profitable; protect the margin by reviewing recurring expenses.' : 'Your expenses exceed income; pause non-essential spending and prioritize revenue collection.'}`
    } });
  } catch (e) { next(e); }
}
