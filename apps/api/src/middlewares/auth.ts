import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/tokens.js';
import { AppError } from '../utils/AppError.js';

declare global { namespace Express { interface Request { user?: { userId: string; role: string; activeBusiness?: string } } } }

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return next(new AppError(401, 'Authentication required'));
  try { req.user = verifyAccessToken(header.split(' ')[1]); next(); } catch { next(new AppError(401, 'Invalid or expired token')); }
}
export const permit = (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError(401, 'Authentication required'));
  if (!roles.includes(req.user.role)) return next(new AppError(403, 'Insufficient permissions'));
  next();
};
