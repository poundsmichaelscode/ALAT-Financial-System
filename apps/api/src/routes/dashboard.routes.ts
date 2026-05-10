import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { dashboardSummary } from '../controllers/dashboard.controller.js';
const router=Router(); router.get('/summary',requireAuth,dashboardSummary); export default router;
