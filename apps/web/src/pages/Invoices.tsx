import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Invoices() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ clientName: '', clientEmail: '', description: '', quantity: '1', unitPrice: '', tax: '0', discount: '0', status: 'pending' });
  const load = () => api.get('/invoices').then(r => setItems(r.data.data.items));
  useEffect(load, []);
  async function create(e: any) {
    e.preventDefault();
    await api.post('/invoices', { clientName: form.clientName, clientEmail: form.clientEmail, tax: Number(form.tax), discount: Number(form.discount), status: form.status, items: [{ description: form.description, quantity: Number(form.quantity), unitPrice: Number(form.unitPrice) }] });
    setForm({ clientName: '', clientEmail: '', description: '', quantity: '1', unitPrice: '', tax: '0', discount: '0', status: 'pending' });
    load();
  }
  return <div><h1 className="text-3xl font-black">Invoices</h1><p className="mt-2 text-slate-400">Create, track, download and email invoices.</p>
    <form onSubmit={create} className="card mt-6 grid gap-3 p-5 md:grid-cols-4">
      <input className="input" placeholder="Client name" value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})}/>
      <input className="input" placeholder="Client email" value={form.clientEmail} onChange={e=>setForm({...form,clientEmail:e.target.value})}/>
      <input className="input" placeholder="Service/Product" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      <input className="input" placeholder="Unit price" value={form.unitPrice} onChange={e=>setForm({...form,unitPrice:e.target.value})}/>
      <input className="input" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})}/>
      <input className="input" placeholder="Tax" value={form.tax} onChange={e=>setForm({...form,tax:e.target.value})}/>
      <select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option className="text-black">pending</option><option className="text-black">paid</option><option className="text-black">overdue</option></select>
      <button className="btn">Create Invoice</button>
    </form>
    <div className="card mt-6 overflow-hidden"><table className="w-full text-left"><thead className="bg-white/10"><tr><th className="p-4">Invoice</th><th>Client</th><th>Total</th><th>Status</th></tr></thead><tbody>{items.map(i=><tr key={i._id} className="border-t border-white/10"><td className="p-4">{i.invoiceNumber}</td><td>{i.clientName}</td><td>₦{i.total?.toLocaleString()}</td><td>{i.status}</td></tr>)}</tbody></table></div>
  </div>;
}
