import { Request, Response, NextFunction } from 'express';
import { askFinanceAI } from '../services/ai.service.js';
import { AIInsight } from '../models/AIInsight.js';
export async function askAI(req: Request,res: Response,next: NextFunction){try{const answer:any=await askFinanceAI(req.user!.activeBusiness!, req.body.prompt); const text=typeof answer==='string'?answer:answer.summary; await AIInsight.create({business:req.user!.activeBusiness,prompt:req.body.prompt,summary:text,recommendations:answer.recommendations||[]}); res.json({success:true,data:{answer}})}catch(e){next(e)}}
