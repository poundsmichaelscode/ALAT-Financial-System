import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createEmployee, listEmployees } from '../controllers/employee.controller.js';
const router=Router(); router.use(requireAuth); router.route('/').get(listEmployees).post(createEmployee); export default router;
