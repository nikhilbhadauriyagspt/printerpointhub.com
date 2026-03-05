import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const subcategories = categories
    .filter(parent => 
      !parent.name.toLowerCase().includes('laptop') && 
      !parent.slug.toLowerCase().includes('laptop') &&
      !parent.name.toLowerCase().includes('chromebook')
    )
    .flatMap(parent => parent.children || [])
    .filter(sub => 
      !sub.name.toLowerCase().includes('laptop') && 
      !sub.slug.toLowerCase().includes('laptop') &&
      !sub.name.toLowerCase().includes('chromebook')
    );

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="px-6 md:px-10 lg:px-20 py-20 lg:py-32 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Shop By <span className="text-indigo-600">Category.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="swiper-prev-btn h-14 w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 group shadow-sm">
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
             </button>
             <button className="swiper-next-btn h-14 w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 group shadow-sm">
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
            navigation={{
              prevEl: '.swiper-prev-btn',
              nextEl: '.swiper-next-btn',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1440: { slidesPerView: 5 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item, i) => (
              <SwiperSlide key={item.id} className="h-full py-4">
                <Link to={`/shop?category=${item.slug}`} className="block h-full group">
                  <motion.div
                    className="relative flex flex-col bg-[#F8FAFC] rounded-[2.5rem] transition-all duration-500 h-[400px] overflow-hidden hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-transparent hover:border-slate-100"
                  >
                    {/* Image Area */}
                    <div className="relative flex-1 flex items-center justify-center p-8 mt-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-10 w-full h-full flex items-center justify-center"
                      >
                        <img 
                          src={getImagePath(item.image)} 
                          alt={item.name}
                          className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply transition-all duration-500 group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                      </motion.div>
                    </div>

                    {/* Info Footer */}
                    <div className="p-8 pt-0 flex flex-col items-center text-center">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="inline-flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-indigo-600">
                          Explore
                        </span>
                        <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-600" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
