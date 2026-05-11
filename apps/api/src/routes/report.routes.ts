import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { cashFlow, profitLoss, taxSummary } from '../controllers/report.controller.js';
const router=Router();
router.use(requireAuth);
router.get('/profit-loss', profitLoss);
router.get('/cash-flow', cashFlow);
router.get('/tax', taxSummary);
export default router;
