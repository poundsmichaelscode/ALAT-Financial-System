import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Bot, Building2, FileText, LayoutDashboard, ReceiptText, ScrollText, Shield, Users, WalletCards } from 'lucide-react';

const links = [
  ['/', 'Dashboard', BarChart3],
  ['/expenses', 'Expenses', ReceiptText],
  ['/invoices', 'Invoices', FileText],
  ['/receipts', 'Receipts', ScrollText],
  ['/payroll', 'Payroll', Users],
  ['/reports', 'Reports', LayoutDashboard],
  ['/businesses', 'Businesses', Building2],
  ['/admin', 'Admin', Shield],
  ['/ai', 'AI Assistant', Bot]
] as const;

export default function Layout() {
  const navigate = useNavigate();
  function logout() { localStorage.clear(); navigate('/login'); }
  return <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#064e3b,transparent_35%),#020617]">
    <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-white/10 bg-white/[0.04] p-6 lg:block">
      <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><WalletCards /></div><div><h1 className="text-xl font-black">ALAT Finance</h1><p className="text-xs text-slate-400">Financial OS</p></div></div>
      <nav className="mt-10 space-y-2">{links.map(([to,label,Icon]) => <NavLink key={to} to={to} className={({isActive}) => `flex items-center gap-3 rounded-2xl px-4 py-3 ${isActive ? 'bg-emerald-400 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      <button onClick={logout} className="mt-8 w-full rounded-2xl border border-white/10 px-4 py-3 text-slate-300 hover:bg-white/10">Logout</button>
    </aside>
    <main className="lg:ml-72 p-4 md:p-8"><Outlet/></main>
  </div>;
}
