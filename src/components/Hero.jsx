import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Zap, Shield, Search, Cpu, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

// Import local assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: "NXT-01",
    title: "Clear & Sharp",
    highlight: "Daily Prints.",
    desc: "The perfect choice for high-quality documents every single day. Reliable printers that work as hard as you do.",
    image: banner1,
    link: "/shop",
    specs: ["Sharp Text", "Clean Prints", "Reliable"],
    accent: "indigo"
  },
  {
    id: "VIS-02",
    title: "Beautiful Photos",
    highlight: "Real Colors.",
    desc: "Bring your pictures to life with bright, real-life colors. Perfect for your special photos and creative designs.",
    image: banner2,
    link: "/shop",
    specs: ["Rich Colors", "Photo Quality", "Deep Blacks"],
    accent: "purple"
  },
  {
    id: "SMR-03",
    title: "Easy Wireless",
    highlight: "Mobile Print.",
    desc: "Print anything directly from your phone or tablet without any wires. Simple, fast, and extremely easy to use.",
    image: banner3,
    link: "/shop",
    specs: ["Phone Print", "No Wires", "Easy Setup"],
    accent: "blue"
  },
  {
    id: "ULT-04",
    title: "Fastest Speed",
    highlight: "For Big Work.",
    desc: "Quickly print hundreds of pages without any trouble. The best partner for busy offices and heavy printing tasks.",
    image: banner4,
    link: "/shop",
    specs: ["High Speed", "Large Trays", "Heavy Duty"],
    accent: "slate"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-auto lg:h-[calc(100vh-140px)] bg-white flex items-center pt-24 lg:pt-12 pb-12 overflow-hidden font-urbanist text-left">
      
      {/* --- PREMIUM BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#F8FAFC]" />
        {/* Animated Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] bg-indigo-100/40 blur-[120px] rounded-full pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-indigo-50/50 blur-[100px] rounded-full pointer-events-none" 
        />
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1920px] mx-auto w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT: CONTENT ENGINE --- */}
          <div className="lg:col-span-5 flex flex-col order-2 lg:order-1 relative z-20 min-h-[480px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                <h1 className="text-4xl md:text-5xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6 uppercase">
                  {slides[current].title}
                  <br />
                  <span className="text-indigo-600 relative inline-block">
                    {slides[current].highlight}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="absolute -bottom-1 left-0 h-1.5 bg-indigo-600/10 -z-10" 
                    />
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-lg border-l-4 border-indigo-100 pl-6 italic text-left">
                  {slides[current].desc}
                </p>

                {/* Refined Specs */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-12">
                  {slides[current].specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform" />
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-6">
                  <Link to={slides[current].link}>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="h-14 px-8 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-all duration-300"
                    >
                      Shop Collection
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                  
                  <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-5 py-2.5 rounded-xl border border-white shadow-xl">
                    <img src="/brands/hp.png" alt="HP" className="h-6 w-6 object-contain" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authorized</span>
                      <span className="text-[10px] font-black text-slate-900 leading-none">HP Partner</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Navigation Progress */}
            <div className="flex items-center gap-4 mt-16">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={cn(
                      "h-1 transition-all duration-700 rounded-full",
                      current === idx ? "w-10 bg-indigo-600" : "w-3 bg-slate-200 hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">0{current + 1} / 0{slides.length}</span>
            </div>
          </div>

          {/* --- RIGHT: VISUAL MULTIVERSE --- */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[45vh] lg:h-[65vh] w-full z-10 flex items-center justify-center">
            
            <div className="relative w-full h-full">
              {/* Main Image Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl group bg-white border-[10px] border-white"
                >
                  <img 
                    src={slides[current].image} 
                    alt={slides[current].title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute bottom-8 right-8 flex items-center gap-2 z-40">
                 <button onClick={prevSlide} className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-lg">
                    <ChevronLeft size={20} />
                 </button>
                 <button onClick={nextSlide} className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300 group shadow-lg">
                    <ChevronRight size={20} />
                 </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
