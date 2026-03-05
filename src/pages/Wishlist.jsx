import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ArrowRight, ShieldCheck, Activity, Plus, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-10 mx-auto shadow-sm group hover:scale-110 transition-transform duration-500">
            <Heart size={40} className="text-slate-200 group-hover:text-red-400 transition-colors duration-500" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Wishlist Empty.</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12 max-w-xs mx-auto leading-relaxed">Your professional curation is awaiting its first acquisition.</p>
          <Link to="/shop" className="h-16 px-12 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-4 mx-auto w-fit">
            INITIALIZE DISCOVERY <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- HERO MATCHED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500">Curated Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              THE <span className="text-transparent stroke-text-light">WISHLIST.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
             <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{wishlistCount} Units Marked</p>
          </div>
        </div>

        {/* --- FLOATING GALLERY GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, i) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 flex flex-col transition-all duration-700 hover:bg-white hover:border-red-100 hover:shadow-[0_40px_80px_rgba(239,68,68,0.04)] h-full overflow-hidden"
              >
                {/* Wishlist Removal */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-white border border-slate-100 text-slate-300 hover:text-red-500 flex items-center justify-center transition-all duration-500 shadow-sm"
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>

                {/* Product Visual Area */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative aspect-square mb-8 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50 shadow-inner" />
                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-700"
                    />
                  </div>

                  <div className="space-y-3 px-2">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50/50 px-3 py-1 rounded-full border border-red-100/50">{p.brand_name || 'AUTHORIZED'}</span>
                    <h3 className="text-[16px] font-black text-slate-900 uppercase tracking-tighter line-clamp-2 leading-tight group-hover:text-red-500 transition-colors duration-500">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-black text-slate-950 tracking-tighter">${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>

                {/* Action Hub */}
                <div className="mt-8 pt-6 border-t border-slate-100/50">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(p)}
                    className="w-full h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 transition-all duration-500 shadow-xl group/btn"
                  >
                    <Plus size={18} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
                    ADD TO SELECTION
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
          <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all">
            <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-slate-900 transition-colors">
               <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            </div>
            Continue Browsing Catalog
          </Link>
          <div className="flex items-center gap-10 opacity-60">
             <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Listings</span>
             </div>
             <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Support</span>
             </div>
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
