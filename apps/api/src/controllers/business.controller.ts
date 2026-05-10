import { Request, Response, NextFunction } from 'express';
import { Business } from '../models/Business.js';
import { User } from '../models/User.js';
export async function listBusinesses(req: Request,res: Response,next: NextFunction){try{const user=await User.findById(req.user!.userId).populate('businesses activeBusiness');res.json({success:true,data:user?.businesses||[]})}catch(e){next(e)}}
export async function createBusiness(req: Request,res: Response,next: NextFunction){try{const business=await Business.create({name:req.body.name,industry:req.body.industry,currency:req.body.currency||'NGN',owner:req.user!.userId,members:[{user:req.user!.userId,role:'admin'}]}); await User.findByIdAndUpdate(req.user!.userId,{$addToSet:{businesses:business._id},activeBusiness:business._id}); res.status(201).json({success:true,data:business})}catch(e){next(e)}}
