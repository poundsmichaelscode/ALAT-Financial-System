import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { Business } from '../models/Business.js';
import { Expense } from '../models/Expense.js';
import { Invoice } from '../models/Invoice.js';
import { AIInsight } from '../models/AIInsight.js';

export async function adminOverview(_req: Request, res: Response, next: NextFunction) {
  try {
    const [users, businesses, expenses, invoices, aiInsights] = await Promise.all([
      User.countDocuments(), Business.countDocuments(), Expense.countDocuments(), Invoice.countDocuments(), AIInsight.countDocuments()
    ]);
    res.json({ success: true, data: { users, businesses, expenses, invoices, aiInsights } });
  } catch (e) { next(e); }
}

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(200);
    res.json({ success: true, data: users });
  } catch (e) { next(e); }
}
