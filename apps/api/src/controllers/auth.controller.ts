import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { Business } from '../models/Business.js';
import { AppError } from '../utils/AppError.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) throw new AppError(409, 'Email already registered');
    const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password, role: 'admin' });
    const business = await Business.create({ name: req.body.businessName || `${req.body.name}'s Business`, owner: user._id, members: [{ user: user._id, role: 'admin' }] });
    user.businesses = [business._id as any]; user.activeBusiness = business._id as any; await user.save();
    const payload = { userId: user.id, role: user.role, activeBusiness: String(business._id) };
    res.status(201).json({ success: true, data: { user: sanitize(user), accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) } });
  } catch (e) { next(e); }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user:any = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await user.comparePassword(req.body.password))) throw new AppError(401, 'Invalid email or password');
    user.lastLoginAt = new Date(); await user.save();
    const payload = { userId: user.id, role: user.role, activeBusiness: String(user.activeBusiness) };
    res.json({ success: true, data: { user: sanitize(user), accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) } });
  } catch (e) { next(e); }
}
export async function me(req: Request, res: Response, next: NextFunction) { try { const user = await User.findById(req.user!.userId).populate('businesses activeBusiness'); res.json({ success: true, data: user }); } catch(e){ next(e); } }
function sanitize(user: any) { const obj = user.toObject(); delete obj.password; return obj; }
