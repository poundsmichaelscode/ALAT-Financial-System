import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createPayroll, listPayrolls } from '../controllers/payroll.controller.js';
const router=Router(); router.use(requireAuth); router.route('/').get(listPayrolls).post(createPayroll); export default router;
