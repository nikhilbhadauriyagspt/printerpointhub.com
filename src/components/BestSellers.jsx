import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, ShoppingBag, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
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
    <section className="px-6 md:px-10 lg:px-20 py-20 lg:py-32 bg-[#F8FAFC] font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Top Rated <span className="text-indigo-600">Best Sellers.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="bs-prev h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm cursor-pointer group">
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
             </button>
             <button className="bs-next h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm cursor-pointer group">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
              1600: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {products.map((p) => (
                <SwiperSlide key={p.id} className="h-full py-4">
                  <motion.div 
                    className="relative bg-white rounded-[2rem] border border-transparent transition-all duration-500 h-[430px] flex flex-col group overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-indigo-100"
                  >
                    {/* --- TOP: IMAGE PEDESTAL --- */}
                    <div className="relative h-[220px] bg-slate-50 flex items-center justify-center p-8 group-hover:bg-indigo-50/50 transition-colors duration-500">
                      
                      {/* Wishlist */}
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                          isInWishlist(p.id) ? "text-red-500 shadow-md border-red-100" : "text-slate-400 hover:text-red-500 hover:border-red-100"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-transform duration-500" 
                        alt={p.name} 
                      />
                    </div>

                    {/* --- BOTTOM: CONTENT --- */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="h-1 w-1 rounded-full bg-indigo-600" />
                         <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{p.brand_name || 'Authorized'}</span>
                      </div>

                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight line-clamp-2 leading-[1.2] mb-2 group-hover:text-indigo-600 transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</span>
                           <span className="text-xl font-black text-indigo-600 tracking-tight">${p.price}</span>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                              : "bg-slate-900 text-white hover:bg-indigo-600 shadow-black/10 hover:shadow-indigo-600/20"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={18} strokeWidth={3} /> : <ShoppingBag size={18} />}
                        </motion.button>
                      </div>
                    </div>

                    {/* Reveal Details Link */}
                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                  </motion.div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
