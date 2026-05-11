import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import StatCard from '../components/StatCard';

export default function Admin() {
  const [overview, setOverview] = useState<any>();
  const [users, setUsers] = useState<any[]>([]);
  useEffect(()=>{ api.get('/admin/overview').then(r=>setOverview(r.data.data)); api.get('/admin/users').then(r=>setUsers(r.data.data)); }, []);
  if (!overview) return <p>Loading admin panel...</p>;
  return <div><h1 className="text-3xl font-black">Admin Panel</h1><p className="mt-2 text-slate-400">Manage users, businesses, usage and platform activity.</p>
    <section className="mt-8 grid gap-4 md:grid-cols-5"><StatCard label="Users" value={String(overview.users)}/><StatCard label="Businesses" value={String(overview.businesses)}/><StatCard label="Expenses" value={String(overview.expenses)}/><StatCard label="Invoices" value={String(overview.invoices)}/><StatCard label="AI Insights" value={String(overview.aiInsights)}/></section>
    <div className="card mt-6 overflow-hidden"><table className="w-full text-left"><thead className="bg-white/10"><tr><th className="p-4">User</th><th>Email</th><th>Role</th></tr></thead><tbody>{users.map(u=><tr key={u._id} className="border-t border-white/10"><td className="p-4">{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody></table></div>
  </div>;
}
