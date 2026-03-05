import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Check, Plus, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-20 py-20 lg:py-32 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              New <span className="text-indigo-600">Arrivals.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[11px] font-black text-slate-900 uppercase tracking-widest hover:text-indigo-600 transition-colors bg-slate-50 hover:bg-indigo-50 pl-6 pr-2 py-2 rounded-full border border-slate-100 hover:border-indigo-100">
              Browse Complete Gallery
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white shadow-sm transition-all duration-300">
                <ArrowRight size={16} />
              </div>
           </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          {products.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.05 }}
                className="group relative bg-[#F8FAFC] rounded-[2rem] border border-transparent p-6 flex flex-col transition-all duration-500 hover:bg-white hover:border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full overflow-hidden"
              >
                {/* Wishlist Icon */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                    isInWishlist(p.id) ? "text-red-500 shadow-md border-red-100" : "text-slate-300 hover:text-red-500 hover:border-red-100"
                  )}
                >
                  <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>

                {/* Product Visual Area */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative aspect-square mb-8 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-90 transition-transform duration-500 opacity-80 shadow-inner" />
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                    />
                  </div>

                  <div className="space-y-3 px-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-500">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-black text-indigo-600 tracking-tight">${p.price}</span>
                    </div>
                  </div>
                </Link>

                {/* Action Hub */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-12 rounded-xl flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm",
                      addedItems[p.id] 
                        ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                        : "bg-slate-900 text-white hover:bg-indigo-600 shadow-black/10 hover:shadow-indigo-600/20"
                    )}
                  >
                    {addedItems[p.id] ? <Check size={16} /> : <Plus size={16} />}
                    {addedItems[p.id] ? "SUCCESS" : "ADD TO CART"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
