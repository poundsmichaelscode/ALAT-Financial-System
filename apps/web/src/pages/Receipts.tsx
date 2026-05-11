import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Receipts() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ amount: '', paidBy: '' });
  const load = () => api.get('/receipts').then(r => setItems(r.data.data));
  useEffect(load, []);
  async function create(e: any) { e.preventDefault(); await api.post('/receipts', { amount: Number(form.amount), paidBy: form.paidBy }); setForm({ amount: '', paidBy: '' }); load(); }
  return <div><h1 className="text-3xl font-black">Receipts</h1><p className="mt-2 text-slate-400">Generate receipt records with QR codes.</p>
    <form onSubmit={create} className="card mt-6 grid gap-3 p-5 md:grid-cols-3"><input className="input" placeholder="Paid by" value={form.paidBy} onChange={e=>setForm({...form,paidBy:e.target.value})}/><input className="input" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/><button className="btn">Generate Receipt</button></form>
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map(r=><div key={r._id} className="card p-5"><p className="text-sm text-slate-400">{r.receiptNumber}</p><h3 className="mt-2 text-2xl font-black">₦{r.amount?.toLocaleString()}</h3><p className="mt-1 text-slate-300">Paid by {r.paidBy}</p>{r.qrCodeUrl && <img src={r.qrCodeUrl} className="mt-4 h-28 w-28 rounded-xl bg-white p-2"/>}</div>)}</div>
  </div>;
}
