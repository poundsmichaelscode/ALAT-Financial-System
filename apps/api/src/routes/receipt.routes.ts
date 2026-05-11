import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createReceipt, listReceipts } from '../controllers/receipt.controller.js';
const router = Router();
router.use(requireAuth);
router.route('/').get(listReceipts).post(createReceipt);
export default router;
