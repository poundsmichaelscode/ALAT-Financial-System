import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createExpense, deleteExpense, listExpenses, updateExpense } from '../controllers/expense.controller.js';
const router=Router(); router.use(requireAuth); router.route('/').get(listExpenses).post(createExpense); router.route('/:id').patch(updateExpense).delete(deleteExpense); export default router;
