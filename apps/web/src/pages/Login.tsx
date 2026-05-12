import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WalletCards } from 'lucide-react';
import { login } from '../store/authSlice';

export default function Login(){
  const [email,setEmail]=useState('admin@alatfinance.com');
  const [password,setPassword]=useState('Password123!');
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch<any>(); const nav=useNavigate();
  async function submit(e:React.FormEvent){e.preventDefault();setErr('');setLoading(true);try{await dispatch(login({email,password})).unwrap();nav('/')}catch(e:any){setErr(String(e || 'Authentication failed. Check API server and credentials.'))}finally{setLoading(false)}}
  return <div className="grid min-h-screen place-items-center p-6">
    <motion.form initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} onSubmit={submit} className="card w-full max-w-md p-8">
      <div className="mb-6 inline-flex items-center gap-3 rounded-3xl bg-white/10 p-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EFE3CA] text-[#170C79]"><WalletCards/></div><div><h1 className="text-2xl font-black">ALAT Finance</h1><p className="text-xs text-[#8ACBD0]">Premium financial SaaS</p></div></div>
      <h2 className="text-3xl font-black">Welcome back</h2><p className="mt-2 text-slate-300">Sign in to manage expenses, invoices, receipts, payroll and business analytics.</p>
      <div className="mt-8 space-y-4"><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>{err&&<p className="rounded-2xl bg-red-500/15 p-3 text-sm text-red-100">{err}</p>}<button disabled={loading} className="btn w-full">{loading?'Signing in...':'Login'}</button></div>
    </motion.form>
  </div>
}
