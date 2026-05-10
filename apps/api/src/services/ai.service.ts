import OpenAI from 'openai';
import { env } from '../config/env.js';
import { Expense } from '../models/Expense.js';
import { Invoice } from '../models/Invoice.js';
const client = env.openaiApiKey ? new OpenAI({ apiKey: env.openaiApiKey }) : null;
export async function askFinanceAI(business: string, prompt: string) {
  const [expenses, invoices] = await Promise.all([Expense.find({ business }).sort({ date: -1 }).limit(50), Invoice.find({ business }).sort({ createdAt: -1 }).limit(30)]);
  const context = { expenses: expenses.map(e => ({ title:e.title, amount:e.amount, category:e.category, date:e.date, status:e.approvalStatus })), invoices: invoices.map(i => ({ client:i.clientName,total:i.total,status:i.status,dueDate:i.dueDate })) };
  if (!client) return fallbackInsight(prompt, context);
  const completion = await client.chat.completions.create({ model: 'gpt-4o-mini', messages: [
    { role: 'system', content: 'You are ALAT Financial Assistant. Give concise, practical fintech insights, fraud flags, forecasts and savings recommendations. Do not provide legal/tax advice as final authority.' },
    { role: 'user', content: `Business financial context: ${JSON.stringify(context)}

Question: ${prompt}` }
  ]});
  return completion.choices[0]?.message?.content || fallbackInsight(prompt, context).summary;
}
function fallbackInsight(prompt:string, context:any){ const totalExpenses=context.expenses.reduce((s:any,e:any)=>s+e.amount,0); const top=context.expenses.reduce((m:any,e:any)=>{m[e.category]=(m[e.category]||0)+e.amount;return m},{}); return { summary:`AI key is not configured. Based on available data, total tracked expenses are ${totalExpenses}. Top categories: ${Object.entries(top).sort((a:any,b:any)=>b[1]-a[1]).slice(0,3).map(([k,v])=>`${k}: ${v}`).join(', ')}. Prompt received: ${prompt}`, recommendations:['Set monthly category budgets','Review pending approvals weekly','Flag expenses above department limits'], riskFlags:[] }; }
