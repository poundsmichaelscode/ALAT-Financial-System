import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createEmployee, deleteEmployee, listEmployees, updateEmployee } from '../controllers/employee.controller.js';
const router=Router(); router.use(requireAuth); router.route('/').get(listEmployees).post(createEmployee); router.route('/:id').patch(updateEmployee).delete(deleteEmployee); export default router;
