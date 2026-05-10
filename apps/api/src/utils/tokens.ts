import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export type TokenPayload = { userId: string; role: string; activeBusiness?: string };
export const signAccessToken = (payload: TokenPayload) => jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtExpiresIn as any });
export const signRefreshToken = (payload: TokenPayload) => jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn as any });
export const verifyAccessToken = (token: string) => jwt.verify(token, env.jwtAccessSecret) as TokenPayload;
