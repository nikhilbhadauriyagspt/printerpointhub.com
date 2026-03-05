import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Terminal, Activity, Globe } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Authentication protocol failed.');
      }
    } catch (err) {
      setError('Connection timeout: Unable to reach terminal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-urbanist px-6 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-slate-100/50 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* --- BRAND HEADER --- */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-10 transition-transform hover:scale-105 group">
            <div className="flex items-center gap-4">
              <img src="/logo/EASYMYPRINT.png" alt="PRINTER POINT HUB" className="h-10 w-auto object-contain" />
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-6">
             <span className="h-[1px] w-6 bg-indigo-600 animate-pulse" />
             <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em]">Secure Access Hub</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-none">Welcome Back.</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Access Only</p>
        </div>

        {/* --- LOGIN MODULE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative hover:border-blue-100 transition-colors duration-700"
        >
          <form onSubmit={handleLogin} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100 text-center flex items-center justify-center gap-2"
                >
                  <Activity size={14} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} strokeWidth={2} />
                  <input 
                    required type="email" placeholder="NAME@DOMAIN.COM" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 pl-16 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} strokeWidth={2} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-16 pl-16 pr-16 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                  </button>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.15)] disabled:opacity-50 group"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  SIGN IN
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-50 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              New to our network?
              <Link to="/signup" className="text-indigo-600 font-black hover:underline ml-2">Request Access</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

