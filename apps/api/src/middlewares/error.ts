import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
export function notFound(req: Request, _res: Response, next: NextFunction) { next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`)); }
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode || 500;
  res.status(status).json({ success: false, message: err.message || 'Internal server error', errors: err.errors });
}
