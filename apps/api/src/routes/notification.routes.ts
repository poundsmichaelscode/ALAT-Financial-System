import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { listNotifications } from '../controllers/notification.controller.js';
const router=Router(); router.get('/',requireAuth,listNotifications); export default router;
