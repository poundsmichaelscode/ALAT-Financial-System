import { Request, Response, NextFunction } from 'express';
import { Notification } from '../models/Notification.js';
export async function listNotifications(req: Request,res: Response,next: NextFunction){try{const items=await Notification.find({$or:[{user:req.user!.userId},{business:req.user!.activeBusiness}]}).sort({createdAt:-1}).limit(50);res.json({success:true,data:items})}catch(e){next(e)}}
