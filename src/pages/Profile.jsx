import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { 
  User, 
  Lock, 
  ShoppingBag, 
  Package, 
  ChevronRight, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  Terminal,
  Activity,
  Box,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully!");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Password changed successfully!");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Security update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist overflow-hidden">
      <SEO title="Member Dashboard | PRINTER POINT HUB" />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- HERO MATCHED PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-[1px] w-6 bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Member Portal</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-4">
            MY <span className="text-transparent stroke-text-light">DASHBOARD.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- NAVIGATION SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-50/50 border border-slate-100 p-10 rounded-[3rem] text-center relative overflow-hidden group">
                <div className="absolute -inset-4 bg-indigo-600/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col items-center">
                   <div className="h-24 w-20 bg-slate-950 flex items-center justify-center text-white text-4xl font-black shadow-2xl rounded-2xl mb-8 uppercase tracking-tighter">
                     {user.name.charAt(0)}
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">{user.name}</h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1.5 p-2 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                {[
                  { id: 'profile', label: 'Personal Details', icon: User },
                  { id: 'orders', label: 'Order History', icon: Package },
                  { id: 'security', label: 'Security Hub', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 group",
                      activeTab === tab.id 
                      ? "bg-white text-indigo-600 shadow-lg border border-indigo-50" 
                      : "text-slate-400 hover:text-slate-900 hover:bg-white/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                       <tab.icon size={16} className={activeTab === tab.id ? "text-indigo-600" : ""} />
                       {tab.label}
                    </div>
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-500",
                      activeTab === tab.id ? "bg-indigo-600 scale-100 shadow-[0_0_8px_rgba(37,99,235,0.6)]" : "bg-slate-200 scale-0 group-hover:scale-100"
                    )} />
                  </button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all duration-500 group"
                  >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Terminate Session
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTENT HUB --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-slate-100 p-10 md:p-16 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-end justify-between mb-16 border-b border-slate-100 pb-10">
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3">Identity Setup</p>
                      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Profile Details.</h3>
                    </div>
                    <User size={28} className="text-slate-200" />
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                        <input 
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Contact Number</label>
                        <input 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Primary Address</label>
                      <textarea 
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all resize-none shadow-inner"
                      ></textarea>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isUpdating}
                      className="h-16 px-14 bg-slate-950 text-white rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-2xl disabled:opacity-50"
                    >
                      {isUpdating ? "Updating..." : "Commit Changes"}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-950 text-white rounded-[3.5rem] p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-10 group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Package size={120} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                         <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Recent Transactions</h4>
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none mb-4">Order History.</h3>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{orders.length} successful acquisitions completed</p>
                    </div>
                    <Link to="/shop" className="h-14 px-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all relative z-10 shadow-xl shadow-indigo-600/20 group">
                      New Order <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {orders.length === 0 ? (
                      <div className="bg-slate-50 border border-slate-100 rounded-[3.5rem] py-32 text-center">
                        <Box size={64} strokeWidth={1} className="text-slate-200 mx-auto mb-8" />
                        <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em]">Zero operational records detected.</p>
                      </div>
                    ) : (
                      orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden group hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)]">
                          <div className="p-10 flex items-center justify-between border-b border-slate-50 bg-slate-50/30">
                            <div className="flex items-center gap-8">
                               <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                  <Activity size={24} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Order ID</p>
                                  <h4 className="text-xl font-black text-slate-900 uppercase">#PFX-{order.id}</h4>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-2xl font-black text-slate-900 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                               <span className={cn(
                                 "mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all",
                                 order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-blue-100'
                               )}>
                                 <div className={cn("h-1 w-1 rounded-full animate-pulse", order.status === 'delivered' ? "bg-emerald-500" : "bg-indigo-500")} />
                                 {order.status}
                               </span>
                            </div>
                          </div>
                          <div className="p-8 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-indigo-600" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date: {new Date(order.created_at).toLocaleDateString()}</span>
                             </div>
                             <Link to="/orders" className="flex items-center gap-3 text-[10px] font-black text-slate-900 uppercase tracking-widest hover:text-indigo-600 transition-all group">
                               Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                             </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-slate-100 p-10 md:p-16 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-end justify-between mb-16 border-b border-slate-100 pb-10">
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3">Gateway Access</p>
                      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Security Hub.</h3>
                    </div>
                    <Lock size={28} className="text-slate-200" />
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">New Access Key</label>
                      <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} strokeWidth={2} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.password}
                          onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})}
                          className="w-full h-16 pl-16 pr-16 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Verify Access Key</label>
                      <div className="relative group">
                        <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} strokeWidth={2} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          className="w-full h-16 pl-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isUpdating}
                      className="h-16 px-14 bg-red-500 text-white rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-slate-950 transition-all shadow-2xl shadow-red-500/20 disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Authorize Key Change"}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <style>{`
        .stroke-text-light {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
