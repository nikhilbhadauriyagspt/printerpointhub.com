import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ShieldCheck, Box } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function TheVault({ products = [] }) {
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (products.length === 0) return null;

  return (
    <section className="px-6 md:px-10 lg:px-16 py-24 lg:py-32 bg-white font-urbanist overflow-hidden relative border-b border-slate-50">
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        <div className="relative group/carousel">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            {/* Header with Nav integrated into Carousel context */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[1px] w-4 bg-indigo-600 animate-pulse" />
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em]">Premium Hardware</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                  <span className="block mb-2">THE</span>
                  <span className="text-transparent stroke-text-light">VAULT.</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-sm mb-2">
                 <div className="flex gap-2">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-sm" />
                    <CarouselNext className="static translate-y-0 h-12 w-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-sm" />
                 </div>
              </div>
            </div>

            <CarouselContent className="-ml-4 px-4">
              {products.map((p, i) => (
                <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <motion.div
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="group relative bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-8 cursor-pointer hover:bg-white transition-all duration-700 h-[450px] flex flex-col hover:border-blue-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)]"
                  >
                    <div className="relative aspect-square mb-8 flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50 shadow-inner" />
                      <motion.img 
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        src={getImagePath(p.images)} 
                        alt={p.name} 
                        className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply relative z-10 transition-transform duration-700" 
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col pt-2">
                      <div className="flex items-center gap-2 mb-3">
                         <Box size={12} className="text-indigo-600" />
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.brand_name || 'Authorized'}</span>
                      </div>
                      <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-tighter line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors mb-2">{p.name}</h4>
                      
                      <div className="mt-auto flex items-center justify-between">
                         <p className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</p>
                         <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-900 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 shadow-sm">
                            <ArrowUpRight size={20} />
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-20 flex justify-center">
           <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] hover:text-indigo-600 transition-colors">
              Access Complete Archive
              <div className="h-12 w-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500">
                <ArrowRight size={18} />
              </div>
           </Link>
        </div>
      </div>

      <style>{`
        .stroke-text-light {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
