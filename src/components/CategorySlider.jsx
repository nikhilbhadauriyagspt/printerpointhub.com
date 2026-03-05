import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Loader2, Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import API_BASE_URL from "../config";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, subtitle, products = [], bgColor = "bg-white" }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
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
    <section className={cn("px-6 md:px-10 lg:px-16 py-24 lg:py-32 font-urbanist overflow-hidden relative border-b border-slate-50", bgColor)}>
      
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
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em]">{subtitle}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                  <span className="block mb-2">{title.split(' ')[0]}</span>
                  <span className="text-transparent stroke-text-light">{title.split(' ').slice(1).join(' ')}.</span>
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
                    className="relative bg-white rounded-[2.5rem] border border-slate-100 transition-all duration-700 h-[430px] flex flex-col group overflow-hidden hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:border-blue-100"
                  >
                    {/* --- TOP: IMAGE PEDESTAL --- */}
                    <div className="relative h-[220px] bg-slate-50 flex items-center justify-center p-8 group-hover:bg-indigo-50/50 transition-colors duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Wishlist */}
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all duration-500 shadow-sm",
                          isInWishlist(p.id) ? "text-red-500 shadow-md" : "text-slate-300 hover:text-red-500 hover:scale-110"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <motion.img 
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]" 
                        alt={p.name} 
                      />
                    </div>

                    {/* --- BOTTOM: CONTENT --- */}
                    <div className="flex-1 p-7 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                         <span className="h-[1px] w-4 bg-indigo-600" />
                         <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em]">{p.brand_name || 'Authorized'}</span>
                      </div>

                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="font-black text-slate-900 text-[17px] uppercase tracking-tighter line-clamp-2 leading-[1.1] mb-2 group-hover:text-indigo-600 transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Premium Unit</span>
                           <span className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</span>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                              : "bg-slate-900 text-white hover:bg-indigo-600 shadow-black/10 hover:shadow-indigo-600/20"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <ShoppingBag size={20} />}
                        </motion.button>
                      </div>
                    </div>

                    {/* Reveal Details Link */}
                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Global Styles for Stroke Text */}
        <style>{`
          .stroke-text-light {
            -webkit-text-stroke: 2px #0f172a;
            color: transparent;
          }
        `}</style>
      </div>
    </section>
  );
}
