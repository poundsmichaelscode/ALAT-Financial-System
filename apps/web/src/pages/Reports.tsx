import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import StatCard from '../components/StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export default function Reports() {
  const [pl, setPl] = useState<any>();
  const [cash, setCash] = useState<any[]>([]);
  const [tax, setTax] = useState<any>();
  useEffect(()=>{ api.get('/reports/profit-loss').then(r=>setPl(r.data.data)); api.get('/reports/cash-flow').then(r=>setCash(r.data.data)); api.get('/reports/tax').then(r=>setTax(r.data.data)); }, []);
  if (!pl) return <p>Loading reports...</p>;
  return <div><h1 className="text-3xl font-black">Financial Reports</h1><p className="mt-2 text-slate-400">Profit & loss, cash flow, tax and AI-ready summaries.</p>
    <section className="mt-8 grid gap-4 md:grid-cols-3"><StatCard label="Income" value={`₦${pl.totalIncome.toLocaleString()}`}/><StatCard label="Expenses" value={`₦${pl.totalExpenses.toLocaleString()}`}/><StatCard label="Net Profit" value={`₦${pl.netProfit.toLocaleString()}`}/></section>
    <section className="mt-6 grid gap-4 xl:grid-cols-2"><div className="card p-6"><h2 className="font-bold">Expenses by Category</h2><ResponsiveContainer width="100%" height={260}><BarChart data={pl.expenses}><XAxis dataKey="_id"/><YAxis/><Tooltip/><Bar dataKey="total"/></BarChart></ResponsiveContainer></div><div className="card p-6"><h2 className="font-bold">Cash Flow</h2><ResponsiveContainer width="100%" height={260}><LineChart data={cash}><XAxis dataKey="month"/><YAxis/><Tooltip/><Line dataKey="income" strokeWidth={3}/><Line dataKey="expenses" strokeWidth={3}/><Line dataKey="net" strokeWidth={3}/></LineChart></ResponsiveContainer></div></section>
    {tax && <div className="card mt-6 p-6"><h2 className="font-bold">Tax Summary</h2><p className="mt-3 text-slate-300">Invoice Tax: ₦{tax.invoiceTax.toLocaleString()} | Payroll Tax: ₦{tax.payrollTax.toLocaleString()} | Tax Expenses: ₦{tax.taxExpenses.toLocaleString()}</p></div>}
  </div>;
}
