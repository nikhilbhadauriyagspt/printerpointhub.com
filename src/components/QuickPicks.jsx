import { motion } from "framer-motion";
import { Plus, ArrowRight, Check, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import 'swiper/css';

export default function QuickPicks({ products = [] }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  
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
              Essential <span className="text-indigo-600">Quick Picks.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="qp-prev h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm cursor-pointer group">
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
             </button>
             <button className="qp-next h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm cursor-pointer group">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ prevEl: '.qp-prev', nextEl: '.qp-next' }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1440: { slidesPerView: 4.5 },
              1600: { slidesPerView: 5.5 },
            }}
            className="!overflow-visible"
          >
            {products.map((p, i) => (
              <SwiperSlide key={p.id} className="py-4">
                <motion.div 
                  onClick={() => navigate(`/product/${p.slug || p.id}`)}
                  whileHover={{ y: -8 }}
                  className="flex flex-col p-6 bg-white border border-transparent rounded-[2rem] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-indigo-100 group cursor-pointer h-[420px]"
                >
                  <div className="relative h-[200px] bg-slate-50 rounded-[1.5rem] overflow-hidden mb-6 flex items-center justify-center p-6 group-hover:bg-indigo-50/50 transition-colors duration-500">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">{p.brand_name || 'Authorized'}</span>
                       <div className="flex items-center gap-1.5">
                          <div className="h-1 w-1 rounded-full bg-emerald-500" />
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">In Stock</span>
                       </div>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight mb-2">{p.name}</h4>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                       <p className="text-xl font-black text-indigo-600 tracking-tight">${p.price}</p>
                       <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          addToCart(p);
                        }}
                        className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
                          cart.find(i => i.id === p.id) 
                            ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                            : "bg-slate-900 text-white group-hover:bg-indigo-600 shadow-black/10 hover:shadow-indigo-600/20"
                        )}
                      >
                        {cart.find(i => i.id === p.id) ? <Check size={18} strokeWidth={3} /> : <Plus size={20} />}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
