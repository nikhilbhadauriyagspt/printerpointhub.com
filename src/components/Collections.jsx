import { motion } from "framer-motion";
import { Printer, ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// Import local assets
import printerCat from "@/assets/category/printer_cat.jpg";
import { cn } from "../lib/utils";

export default function Collections() {
  return (
    <section className="bg-white font-urbanist relative overflow-hidden py-20 lg:py-32">
      
      {/* --- CREATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute top-1/4 -left-20 w-[40%] h-[40%] bg-indigo-50/40 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: DYNAMIC CONTENT NODE --- */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  High-Performance <br />
                  <span className="text-indigo-600">Printers.</span>
                </h3>

                <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
                  Experience the pinnacle of printing technology with our elite selection of devices. Built for speed, clarity, and reliability, perfect for any home or office setup.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link to="/shop?category=printers" className="w-full sm:w-auto relative group">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-14 px-8 bg-slate-900 text-white rounded-xl text-sm font-bold tracking-widest uppercase flex items-center gap-3 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300"
                  >
                    Explore Series
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: MULTI-LAYERED VISUAL CANVAS --- */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <div className="relative">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-[2rem] lg:rounded-[3rem] shadow-2xl shadow-slate-900/10 group bg-slate-50"
              >
                <img 
                  src={printerCat} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply" 
                  alt="Printer Excellence" 
                />
                
                {/* Dynamic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-80" />
                
                {/* Floating Interactive Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center gap-3 border border-white z-20 hidden md:flex"
                >
                   <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                     <Printer size={20} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Top Rated</p>
                     <p className="text-sm font-bold text-slate-900">Series X Pro</p>
                   </div>
                </motion.div>

                {/* Bottom Glass Hub */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 shadow-xl overflow-hidden z-30 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                      <div>
                         <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1">Authentic Gear</p>
                         <h4 className="text-lg md:text-xl font-black text-white tracking-tight">Premium Print Architecture</h4>
                      </div>
                   </div>
                   <Link to="/shop?category=printers" className="h-12 w-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 group-hover:-rotate-12">
                      <ArrowUpRight size={20} />
                   </Link>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
