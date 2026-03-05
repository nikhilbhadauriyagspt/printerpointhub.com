import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Globe, ArrowRight, Box, Printer, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";
import { cn } from '../lib/utils';

export default function About() {
  return (
    <div className="bg-white min-h-screen font-urbanist overflow-hidden">
      <SEO 
        title="Our Enterprise Journey | PRINTER POINT HUB" 
        description="Learn about PRINTER POINT HUB, our vision to redefine tech experience, and our commitment as an authorized HP partner."
      />

      {/* --- WIDE SPLIT HERO --- */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 md:px-10 lg:px-20 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black text-slate-900 leading-[1] tracking-tight uppercase">
              Redefining <br />
              <span className="text-indigo-600">Excellence.</span>
            </h1>

            <p className="text-slate-600 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl border-l-4 border-indigo-100 pl-8">
              We curate high-performance hardware solutions for the modern era. PRINTER POINT HUB was established to bridge the gap between innovation and accessibility across the globe.
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <Link to="/shop">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-16 px-12 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-indigo-600 shadow-2xl transition-all duration-500"
                >
                  Explore Archive <ArrowRight size={18} />
                </motion.button>
              </Link>
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
                <img src="/brands/hp.png" alt="HP" className="h-10 w-10 object-contain" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authorized</span>
                  <span className="text-sm font-black text-slate-900 leading-none">HP Partner</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-[3rem] lg:rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] group bg-[#F8FAFC] border-[12px] border-white"
            >
              <img src={banner1} alt="Boutique Hardware" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- REFINED FOUNDATION --- */}
      <section className="py-20 lg:py-32 px-6 md:px-10 lg:px-20 bg-[#F8FAFC] relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-10">
             <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
               Strategic <br /><span className="text-indigo-600">Architecture.</span>
             </h2>
             <div className="space-y-6">
                <p className="text-lg font-bold text-slate-800 leading-relaxed tracking-wide max-w-lg">
                  PRINTER POINT HUB was established to bridge the gap in authorized hardware accessibility for enterprise-grade solutions.
                </p>
                <p className="text-base font-medium text-slate-500 leading-relaxed max-w-lg">
                  Established with a global vision, we have deployed a national network that ensures professionals have direct, secure access to precision-engineered units across the country.
                </p>
             </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 gap-5">
             {[
               { icon: <ShieldCheck size={24} />, title: "Authenticity Standard", desc: "100% genuine hardware verification protocol." },
               { icon: <Zap size={24} />, title: "Performance Hub", desc: "Elite-tier professional configurations for every workflow." },
               { icon: <Globe size={24} />, title: "Global Logistics", desc: "Tracked international fulfillment and delivery infrastructure." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ x: 10 }}
                 className="bg-white p-6 md:p-8 rounded-[2rem] border border-transparent hover:border-indigo-100 transition-all duration-500 group shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex items-center gap-6"
               >
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                    <p className="text-sm font-medium text-slate-500">{item.desc}</p>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 lg:py-32 px-6 md:px-10 lg:px-20 bg-white">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-12 lg:p-16 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Box size={150} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Our Objective</span>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">Empowering <br /><span className="text-white">Precision.</span></h3>
                <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-sm pt-4">To provide the definitive framework for professional hardware through authorized acquisition.</p>
             </div>
          </div>
          <div className="p-12 lg:p-16 bg-indigo-600 text-white rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-indigo-600/20">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity text-white">
                <Globe size={150} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">Our Future</span>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">Global <br />Stewardship.</h3>
                <p className="text-indigo-50 font-medium text-lg leading-relaxed max-w-sm pt-4">To become the primary gateway for premium tech ecosystems, setting the benchmark for expert service.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- ADVANTAGE STRIP --- */}
      <section className="py-16 bg-white border-y border-slate-100 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
           {[
             { title: "Authorized Partner", icon: ShieldCheck },
             { title: "Expert Advisory", icon: Zap },
             { title: "Priority Dispatch", icon: Package },
             { title: "Secure Logistics", icon: Globe }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="h-12 w-12 rounded-full bg-[#F8FAFC] border border-slate-100 text-slate-400 flex items-center justify-center group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all duration-300">
                   <item.icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-black text-slate-600 tracking-wide group-hover:text-slate-900 transition-colors">{item.title}</span>
             </div>
           ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="px-6 md:px-10 lg:px-20 py-20 lg:py-32 bg-[#F8FAFC]">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-12 lg:p-24 bg-slate-900 text-white relative overflow-hidden text-center rounded-[3rem] shadow-2xl group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_60%)] opacity-[0.15] group-hover:opacity-[0.2] transition-opacity duration-1000" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-10 relative z-10 leading-[1.1]">
              Elite <br /><span className="text-indigo-400">Performance.</span>
            </h2>
            <Link to="/shop" className="h-14 px-10 bg-white text-slate-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl relative z-10 inline-flex items-center gap-4 group">
              Join The Circle <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

