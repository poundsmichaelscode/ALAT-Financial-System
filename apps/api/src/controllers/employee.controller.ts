import { Request, Response, NextFunction } from 'express';
import { Employee } from '../models/Employee.js';
export async function listEmployees(req: Request,res: Response,next: NextFunction){try{const items=await Employee.find({business:req.user!.activeBusiness}).sort({createdAt:-1});res.json({success:true,data:items})}catch(e){next(e)}}
export async function createEmployee(req: Request,res: Response,next: NextFunction){try{const employee=await Employee.create({...req.body,business:req.user!.activeBusiness});res.status(201).json({success:true,data:employee})}catch(e){next(e)}}
