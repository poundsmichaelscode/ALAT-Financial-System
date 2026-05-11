import { Router } from 'express';
import { requireAuth, permit } from '../middlewares/auth.js';
import { adminOverview, listUsers } from '../controllers/admin.controller.js';
const router = Router();
router.use(requireAuth, permit('super_admin', 'admin')); 
router.get('/overview', adminOverview);
router.get('/users', listUsers);
export default router;
