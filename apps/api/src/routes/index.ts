import { Router } from 'express';
import auth from './auth.routes.js'; import expenses from './expense.routes.js'; import invoices from './invoice.routes.js'; import payrolls from './payroll.routes.js'; import employees from './employee.routes.js'; import dashboard from './dashboard.routes.js'; import reports from './report.routes.js'; import ai from './ai.routes.js'; import notifications from './notification.routes.js'; import businesses from './business.routes.js';
const router=Router();
router.get('/health',(_req,res)=>res.json({success:true,message:'ALAT Financial System API is healthy'}));
router.use('/auth',auth); router.use('/businesses',businesses); router.use('/dashboard',dashboard); router.use('/expenses',expenses); router.use('/invoices',invoices); router.use('/payrolls',payrolls); router.use('/employees',employees); router.use('/reports',reports); router.use('/ai',ai); router.use('/notifications',notifications);
export default router;
