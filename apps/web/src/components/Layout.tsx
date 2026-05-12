import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Bot, Building2, FileText, LayoutDashboard, LogOut, Menu, ReceiptText, ScrollText, Shield, Users, WalletCards, X } from 'lucide-react';
import { useState } from 'react';

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

function Sidebar({ onClick }: { onClick?: () => void }) {
  return <aside className="flex h-full flex-col p-5">
    <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 p-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EFE3CA] text-[#170C79]"><WalletCards /></div>
      <div><h1 className="text-lg font-black">ALAT Finance</h1><p className="text-xs text-[#8ACBD0]">Business Financial OS</p></div>
    </div>
    <nav className="mt-8 space-y-2">{links.map(([to,label,Icon]) => <NavLink onClick={onClick} key={to} to={to} end={to === '/'} className={({isActive}) => `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-[#EFE3CA] text-[#170C79] shadow-xl shadow-black/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
    <div className="mt-auto rounded-3xl border border-[#56B6C6]/20 bg-[#56B6C6]/10 p-4 text-sm text-slate-200">
      <p className="font-bold text-[#8ACBD0]">AI Finance Health</p>
      <p className="mt-1 text-xs text-slate-300">Track cash flow, invoices, receipts and business performance in one place.</p>
    </div>
  </aside>;
}

export default function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  function logout() { localStorage.clear(); navigate('/login'); }
  return <div className="min-h-screen">
    <div className="fixed left-0 top-0 z-40 hidden h-full w-72 border-r border-white/10 bg-[#080521]/80 backdrop-blur-2xl lg:block"><Sidebar /></div>
    {open && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} /><motion.div initial={{x:-320}} animate={{x:0}} className="relative h-full w-80 border-r border-white/10 bg-[#080521] shadow-2xl"><button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-xl bg-white/10 p-2"><X size={18}/></button><Sidebar onClick={() => setOpen(false)} /></motion.div></div>}
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080521]/70 px-4 py-3 backdrop-blur-xl lg:ml-72 lg:px-8">
      <div className="flex items-center justify-between">
        <button onClick={() => setOpen(true)} className="rounded-2xl bg-white/10 p-3 lg:hidden"><Menu size={20}/></button>
        <div><p className="text-xs uppercase tracking-[0.28em] text-[#8ACBD0]">Production workspace</p><h2 className="font-black">ALAT Financial System</h2></div>
        <button onClick={logout} className="btn-secondary"><LogOut size={16}/> <span className="hidden sm:inline">Logout</span></button>
      </div>
    </header>
    <main className="p-4 pb-16 lg:ml-72 lg:p-8"><motion.div initial={{opacity:0, y:18}} animate={{opacity:1, y:0}} transition={{duration:.35}}><Outlet/></motion.div></main>
  </div>;
}
