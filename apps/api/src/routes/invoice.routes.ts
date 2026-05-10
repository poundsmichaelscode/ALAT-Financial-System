import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createInvoice, listInvoices, updateInvoice } from '../controllers/invoice.controller.js';
const router=Router(); router.use(requireAuth); router.route('/').get(listInvoices).post(createInvoice); router.patch('/:id',updateInvoice); export default router;
