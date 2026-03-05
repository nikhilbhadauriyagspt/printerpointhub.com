import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Immersive Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[1000]"
          />

          {/* Floating Premium Hub */}
          <motion.div
            initial={{ x: '100%', opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-4 right-4 bottom-4 w-full max-w-[480px] bg-white/95 backdrop-blur-3xl z-[1001] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] flex flex-col font-urbanist rounded-[3rem] border border-white/50 overflow-hidden"
          >
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-600 m-8 opacity-20" />
            
            {/* Hub Header */}
            <div className="p-10 border-b border-slate-100 relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                     <div className="h-1 w-1 rounded-full bg-indigo-600 animate-pulse" />
                     <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Cart Infrastructure</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Your Selection.</h2>
                </div>
                <button 
                  onClick={closeCartDrawer}
                  className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Hub Content */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-6 p-5 rounded-[2rem] bg-slate-50/50 border border-transparent hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
                    >
                      <div className="h-24 w-24 rounded-2xl bg-white border border-slate-100 p-4 flex items-center justify-center flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500 shadow-sm">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{item.brand_name || 'AUTHENTIC'}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <h3 className="text-[13px] font-black text-slate-900 uppercase truncate pr-4">{item.name}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 bg-white rounded-xl px-3 py-1.5 border border-slate-100 shadow-sm">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-indigo-600 transition-colors"><Minus size={12} strokeWidth={3} /></button>
                            <span className="text-xs font-black w-4 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-indigo-600 transition-colors"><Plus size={12} strokeWidth={3} /></button>
                          </div>
                          <span className="text-base font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="h-24 w-24 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
                    <ShoppingBag size={32} className="text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">Inventory Empty.</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed mb-10">No professional gear detected in your current session.</p>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="h-14 px-10 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center"
                  >
                    Enter Showroom
                  </Link>
                </div>
              )}
            </div>

            {/* Hub Footer */}
            {cart.length > 0 && (
              <div className="p-10 bg-slate-50/80 border-t border-slate-100 backdrop-blur-md">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Total Valuation</span>
                     <div className="flex items-center gap-3">
                        <Activity size={14} className="text-indigo-600 animate-pulse" />
                        <span className="text-3xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                     </div>
                  </div>
                  <div className="h-12 w-px bg-slate-200" />
                  <div className="text-right">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Items</span>
                     <span className="text-xl font-black text-indigo-600">{cartCount} Units</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                  >
                    View Operational Bag
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] group"
                  >
                    <ShieldCheck size={18} />
                    INITIALIZE CHECKOUT
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                   <div className="flex items-center gap-2">
                      <Zap size={12} className="text-slate-900" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Encrypted</span>
                   </div>
                   <div className="h-1 w-1 rounded-full bg-slate-300" />
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-slate-900" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Verified Hub</span>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
