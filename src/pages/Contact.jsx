import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ArrowRight, Loader2, CheckCircle2, Terminal, Activity, Globe, Headphones, ChevronDown, Zap } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-urbanist overflow-hidden">
      <SEO 
        title="Contact Us | PRINTER POINT HUB" 
        description="Get in touch with PRINTER POINT HUB for premium support, corporate inquiries, or product guidance. Our specialists are here to assist."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 mb-20 relative overflow-hidden text-center">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 uppercase">
            Get In <span className="text-indigo-600">Touch.</span>
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-indigo-100 pl-6">
            Connect with our dedicated specialists for refined guidance on premium hardware and professional workspace configurations.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- CONTACT MODULES --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-[#F8FAFC] border border-transparent hover:border-indigo-100 transition-all duration-500 group relative overflow-hidden rounded-[2.5rem] hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Email Inquiry</p>
              <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">info@printerpointhub.com</h4>
            </div>

            <div className="p-8 bg-[#F8FAFC] border border-transparent hover:border-indigo-100 transition-all duration-500 group relative overflow-hidden rounded-[2.5rem] hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Office Location</p>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">500 W Peace St <br/> Raleigh, NC 27603, USA</h4>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20 group transition-all duration-500">
              <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
                 <ShieldCheck size={180} />
              </div>
              
              <div className="relative z-10">
                <div className="h-16 w-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6">
                   <img src="/brands/hp.png" alt="HP" className="h-8 w-auto object-contain" />
                </div>
                
                <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">Partner Status</p>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-6">
                  AUTHORIZED <br/> HP PARTNER.
                </h4>
                
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 w-fit px-4 py-2 rounded-xl">
                   <CheckCircle2 size={14} className="text-indigo-200" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Verified Merchant</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTACT FORM MODULE --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-[3rem] hover:border-indigo-100 transition-colors duration-500">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                  <div className="h-20 w-20 rounded-3xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Request Received.</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-10">A specialist will reach out within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="h-14 px-10 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">New Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required type="text" placeholder="ARTHUR DENT" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        required type="email" placeholder="NAME@DOMAIN.COM" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topic</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Inquiries</option>
                          <option>Corporate Procurement</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                    <textarea 
                      required rows="4" placeholder="HOW CAN WE ASSIST YOU?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-center pt-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="h-14 px-12 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "Submit Message"
                      )}
                    </motion.button>
                  </div>
                  {status === 'error' && <p className="text-center text-red-500 text-[10px] font-black uppercase tracking-widest mt-4">Submission Failed: Please try again</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


