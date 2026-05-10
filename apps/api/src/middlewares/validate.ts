import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
export const validate = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!result.success) return next({ statusCode: 400, message: 'Validation failed', errors: result.error.flatten() });
  next();
};
