import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-urbanist pb-20">
      {/* --- PREMIUM PAGE HEADER --- */}
      <header className="pt-32 pb-16 px-6 md:px-10 lg:px-20 bg-white relative overflow-hidden text-center border-b border-slate-100">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Breadcrumb Tag */}
            <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full shadow-sm">
              <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                <ChevronRight size={10} strokeWidth={3} />
                <span className="text-indigo-600">Legal Document</span>
              </nav>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-10 uppercase">
              {title.split(' ').slice(0, -1).join(' ')} <span className="text-indigo-600">{title.split(' ').slice(-1)}</span>
            </h1>

            <div className="flex flex-col items-center gap-6">
              {subtitle && (
                <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">
                  {subtitle}
                </p>
              )}
              
              <div className="flex items-center gap-3 bg-indigo-50/50 px-5 py-2.5 rounded-xl border border-indigo-100/50">
                <Clock size={14} className="text-indigo-600" />
                <span className="text-indigo-900 text-[10px] font-black uppercase tracking-widest">Revised: {lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <article className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-4xl mx-auto prose prose-slate prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-slate-900 prose-h2:flex prose-h2:flex-col prose-h2:gap-3 prose-h2:before:content-[''] prose-h2:before:h-1 prose-h2:before:w-12 prose-h2:before:bg-indigo-600 prose-h2:before:rounded-full prose-p:text-slate-600 prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-li:text-slate-600 prose-li:font-medium prose-strong:text-slate-900 prose-a:text-indigo-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
