import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-28 w-28 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
          <ShoppingBag size={48} className="text-slate-300" strokeWidth={1} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Cart Empty</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">Your selection awaits initialization.</p>
        <Link to="/shop" className="h-16 px-12 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-4 hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-600/20 group">
          Access Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- HERO MATCHED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-indigo-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-indigo-600">Current Selection</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Shopping <span className="text-transparent stroke-text-light">Bag.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
             <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{cartCount} Units Reserved</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 group hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500"
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-[1.5rem] bg-slate-50 p-6 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img 
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 relative z-10"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left">
                    <div className="flex flex-col mb-6">
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">{item.brand_name || 'Authorized'}</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-2">{item.name}</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="h-12 px-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-white hover:text-indigo-600 rounded-lg transition-all"><Minus size={14} /></button>
                        <span className="text-xs font-black w-8 text-center text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-white hover:text-indigo-600 rounded-lg transition-all"><Plus size={14} /></button>
                      </div>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">${item.price * item.quantity}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all absolute top-6 right-6 sm:static sm:top-auto sm:right-auto shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors pt-8 pl-4 group">
              <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-indigo-600 transition-colors">
                 <ChevronLeft size={14} />
              </div>
              Continue Browsing
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-slate-950 rounded-[3rem] p-10 lg:p-12 text-white sticky top-32 shadow-2xl shadow-slate-900/20">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Order Summary</h3>
                 <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg font-black">${total}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Logistics</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">Calculated Next</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Grand Total</span>
                  <span className="text-4xl font-black tracking-tighter">${total}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full h-20 bg-indigo-600 hover:bg-white hover:text-slate-950 text-white rounded-[1.5rem] flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-[0.98] group"
              >
                Secure Checkout
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-10 pt-10 border-t border-white/10 text-center">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-4">
                  Encrypted Transaction Protocol
                </p>
                <div className="flex justify-center gap-4 opacity-30">
                   <div className="h-6 w-10 bg-white rounded" />
                   <div className="h-6 w-10 bg-white rounded" />
                   <div className="h-6 w-10 bg-white rounded" />
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Global Styles for Stroke Text */}
        <style>{`
          .stroke-text-light {
            -webkit-text-stroke: 2px #0f172a;
            color: transparent;
          }
        `}</style>
      </div>
    </div>
  );
}
