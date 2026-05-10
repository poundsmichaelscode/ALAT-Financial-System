import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { profitLoss } from '../controllers/report.controller.js';
const router=Router(); router.get('/profit-loss',requireAuth,profitLoss); export default router;
