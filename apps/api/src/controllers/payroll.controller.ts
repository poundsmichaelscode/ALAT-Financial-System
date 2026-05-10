import { Request, Response, NextFunction } from 'express';
import { Payroll } from '../models/Payroll.js';
import { pagination } from '../utils/query.js';
export async function listPayrolls(req: Request,res: Response,next: NextFunction){try{const {limit,skip,page}=pagination(req.query); const [items,total]=await Promise.all([Payroll.find({business:req.user!.activeBusiness}).populate('employee').sort({createdAt:-1}).skip(skip).limit(limit),Payroll.countDocuments({business:req.user!.activeBusiness})]); res.json({success:true,data:{items,total,page,limit}})}catch(e){next(e)}}
export async function createPayroll(req: Request,res: Response,next: NextFunction){try{const netPay=Number(req.body.baseSalary||0)+Number(req.body.bonuses||0)-Number(req.body.deductions||0)-Number(req.body.tax||0); const payroll=await Payroll.create({...req.body,netPay,business:req.user!.activeBusiness}); res.status(201).json({success:true,data:payroll})}catch(e){next(e)}}
