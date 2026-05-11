import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Businesses() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', industry: '', currency: 'NGN' });
  const load = () => api.get('/businesses').then(r => setItems(r.data.data));
  useEffect(load, []);
  async function create(e:any){ e.preventDefault(); await api.post('/businesses', form); setForm({ name: '', industry: '', currency: 'NGN' }); load(); }
  return <div><h1 className="text-3xl font-black">Multi-Business</h1><p className="mt-2 text-slate-400">Create and manage separate companies, accounts and records.</p>
    <form onSubmit={create} className="card mt-6 grid gap-3 p-5 md:grid-cols-4"><input className="input" placeholder="Business name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input className="input" placeholder="Industry" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}/><input className="input" placeholder="Currency" value={form.currency} onChange={e=>setForm({...form,currency:e.target.value})}/><button className="btn">Create Business</button></form>
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map(b=><div key={b._id} className="card p-5"><h3 className="text-xl font-bold">{b.name}</h3><p className="mt-2 text-slate-400">{b.industry || 'General business'} · {b.currency}</p></div>)}</div>
  </div>;
}
