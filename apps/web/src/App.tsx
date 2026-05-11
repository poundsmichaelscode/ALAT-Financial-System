import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Invoices from './pages/Invoices';
import Receipts from './pages/Receipts';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import Businesses from './pages/Businesses';
import Admin from './pages/Admin';
import AI from './pages/AI';
import Layout from './components/Layout';

function Protected({ children }: { children: JSX.Element }) {
  return localStorage.getItem('alat_access_token') ? children : <Navigate to="/login" />;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Protected><Layout/></Protected>}>
      <Route index element={<Dashboard/>}/>
      <Route path="expenses" element={<Expenses/>}/>
      <Route path="invoices" element={<Invoices/>}/>
      <Route path="receipts" element={<Receipts/>}/>
      <Route path="payroll" element={<Payroll/>}/>
      <Route path="reports" element={<Reports/>}/>
      <Route path="businesses" element={<Businesses/>}/>
      <Route path="admin" element={<Admin/>}/>
      <Route path="ai" element={<AI/>}/>
    </Route>
  </Routes>;
}
