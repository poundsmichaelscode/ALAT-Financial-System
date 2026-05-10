import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { createBusiness, listBusinesses } from '../controllers/business.controller.js';
const router=Router(); router.use(requireAuth); router.route('/').get(listBusinesses).post(createBusiness); export default router;
