import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Business } from '../models/Business.js';
import { User } from '../models/User.js';
import { Employee } from '../models/Employee.js';
import { Expense } from '../models/Expense.js';
import { Transaction } from '../models/Transaction.js';
import { Invoice } from '../models/Invoice.js';
import { AppError } from '../utils/AppError.js';

export async function listBusinesses(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user!.userId).populate('businesses activeBusiness');
    res.json({ success: true, data: user?.businesses || [] });
  } catch (e) { next(e); }
}

export async function createBusiness(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.name) return next(new AppError(400, 'Business name is required'));
    const business = await Business.create({
      name: req.body.name,
      industry: req.body.industry,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      currency: req.body.currency || 'NGN',
      owner: req.user!.userId,
      members: [{ user: req.user!.userId, role: 'admin' }]
    });
    await User.findByIdAndUpdate(req.user!.userId, { $addToSet: { businesses: business._id }, activeBusiness: business._id });
    res.status(201).json({ success: true, data: business });
  } catch (e) { next(e); }
}

export async function updateBusiness(req: Request, res: Response, next: NextFunction) {
  try {
    const business = await Business.findOneAndUpdate({ _id: req.params.id, owner: req.user!.userId }, req.body, { new: true, runValidators: true });
    if (!business) return next(new AppError(404, 'Business not found'));
    res.json({ success: true, data: business });
  } catch (e) { next(e); }
}

export async function deleteBusiness(req: Request, res: Response, next: NextFunction) {
  try {
    const business = await Business.findOneAndDelete({ _id: req.params.id, owner: req.user!.userId });
    if (!business) return next(new AppError(404, 'Business not found'));
    await User.findByIdAndUpdate(req.user!.userId, { $pull: { businesses: business._id } });
    res.json({ success: true, message: 'Business deleted' });
  } catch (e) { next(e); }
}

export async function addClient(req: Request, res: Response, next: NextFunction) {
  try {
    const business = await Business.findOneAndUpdate({ _id: req.params.id, owner: req.user!.userId }, { $push: { clients: req.body } }, { new: true });
    if (!business) return next(new AppError(404, 'Business not found'));
    res.status(201).json({ success: true, data: business });
  } catch (e) { next(e); }
}

export async function addProject(req: Request, res: Response, next: NextFunction) {
  try {
    const business = await Business.findOneAndUpdate({ _id: req.params.id, owner: req.user!.userId }, { $push: { projects: req.body } }, { new: true });
    if (!business) return next(new AppError(404, 'Business not found'));
    res.status(201).json({ success: true, data: business });
  } catch (e) { next(e); }
}

export async function businessPerformance(req: Request, res: Response, next: NextFunction) {
  try {
    const businessId = new mongoose.Types.ObjectId(req.params.id);
    const [workers, expenseRows, incomeRows, invoices] = await Promise.all([
      Employee.countDocuments({ business: businessId }),
      Expense.aggregate([{ $match: { business: businessId } }, { $group: { _id: '$category', total: { $sum: '$amount' } } }]),
      Transaction.aggregate([{ $match: { business: businessId, type: 'income' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Invoice.aggregate([{ $match: { business: businessId } }, { $group: { _id: '$status', total: { $sum: '$total' }, count: { $sum: 1 } } }])
    ]);
    const totalExpenses = expenseRows.reduce((sum: number, row: any) => sum + row.total, 0);
    const totalIncome = incomeRows[0]?.total || 0;
    res.json({ success: true, data: { workers, totalIncome, totalExpenses, netBalance: totalIncome - totalExpenses, expensesByCategory: expenseRows, invoices } });
  } catch (e) { next(e); }
}
