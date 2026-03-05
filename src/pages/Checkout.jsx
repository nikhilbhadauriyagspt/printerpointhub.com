import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, User, Mail, Phone, Activity, Terminal, Box, CheckCircle2, Loader2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const tax = 0; 
  const finalTotal = total + shipping + tax;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-urbanist bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative z-10">
          <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 mx-auto shadow-sm">
             <ShoppingBag size={32} className="text-slate-200" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Your Bag is Empty.</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12 max-w-xs mx-auto leading-relaxed">Please add professional hardware to your bag before initiating checkout.</p>
          <Link to="/shop" className="h-16 px-12 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-indigo-600 transition-all shadow-xl flex items-center gap-4 mx-auto w-fit">
            RETURN TO SHOP <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-12">
          <div className="h-28 w-28 rounded-[2.5rem] bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-xl border border-emerald-100 relative z-10">
            <CheckCircle2 size={56} strokeWidth={1.5} />
          </div>
          <div className="absolute -inset-4 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        </motion.div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">ORDER <span className="text-emerald-500">CONFIRMED.</span></h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">Deployment protocol successfully initiated.</p>
        
        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 mb-12 max-w-md w-full relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
             <Terminal size={60} />
          </div>
          <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3">Unique Tracking Reference</p>
          <p className="text-3xl font-black text-slate-900 uppercase tracking-tight">#PFX-{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="h-16 px-14 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-indigo-600 transition-all shadow-[0_20px_40px_rgba(15,23,42,0.2)]">
          Back to Command Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- CHECKOUT HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-slate-100 pb-12">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors mb-6 group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK TO OPERATIONAL BAG
            </Link>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              SECURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-400 italic">CHECKOUT.</span>
            </h1>
          </div>

          {/* Precision Stepper */}
          <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
               <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black transition-all", step >= 1 ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-300")}>01</div>
               <span className={cn("text-[9px] font-black uppercase tracking-widest", step >= 1 ? "text-slate-900" : "text-slate-300")}>Logistics</span>
            </div>
            <div className="h-px w-8 bg-slate-200" />
            <div className="flex items-center gap-3">
               <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black transition-all", step >= 2 ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-300")}>02</div>
               <span className={cn("text-[9px] font-black uppercase tracking-widest", step >= 2 ? "text-slate-900" : "text-slate-300")}>Acquisition</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Main Modules */}
          <div className="lg:col-span-8 space-y-16">
            
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl shadow-sm border border-blue-100"><Mail size={18} strokeWidth={2.5} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">IDENTITY PROTOCOL</h3>
                    </div>
                    <div className="relative group">
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="OFFICIAL EMAIL ADDRESS" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                    </div>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center rounded-xl shadow-lg"><MapPin size={18} strokeWidth={2.5} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">DESTINATION PARAMETERS</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                      <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                    </div>
                    <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="COMPLETE STREET ADDRESS" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="CITY" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                      <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP CODE" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                    </div>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="VOICE COMM NODE (PHONE)" className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner" />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-indigo-600 text-white flex items-center justify-center rounded-xl shadow-lg shadow-indigo-600/20"><CreditCard size={18} strokeWidth={2.5} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">ACQUISITION METHOD</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 group",
                          formData.paymentMethod === 'cod' ? "border-indigo-600 bg-indigo-50/30 shadow-xl shadow-indigo-600/5" : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between mb-10">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-indigo-600" : "border-slate-200")}>
                            {formData.paymentMethod === 'cod' && <motion.div layoutId="payDot" className="h-3 w-3 rounded-full bg-indigo-600" />}
                          </div>
                          <Truck size={32} className={cn("transition-colors duration-500", formData.paymentMethod === 'cod' ? "text-indigo-600" : "text-slate-200")} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Cash on Delivery</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Settle upon successful hardware arrival</p>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 group",
                          formData.paymentMethod === 'paypal' ? "border-indigo-600 bg-indigo-50/30 shadow-xl shadow-indigo-600/5" : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between mb-10">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-indigo-600" : "border-slate-200")}>
                            {formData.paymentMethod === 'paypal' && <motion.div layoutId="payDot" className="h-3 w-3 rounded-full bg-indigo-600" />}
                          </div>
                          <div className={cn("italic font-black text-2xl transition-colors duration-500", formData.paymentMethod === 'paypal' ? "text-indigo-600" : "text-slate-200")}>PayPal</div>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">PayPal Express</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Instant digital asset settlement</p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-8 pt-8">
                          <div className="p-10 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10"><ShieldCheck size={100} /></div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 opacity-60 relative z-10">Gateway secured by 256-bit AES Encryption.</p>
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] relative z-10 shadow-xl shadow-indigo-600/20">
                              <Lock size={14} className="text-white" /> Operational Security Active
                            </div>
                          </div>
                          <div className="relative z-0 max-w-lg mx-auto">
                            <PayPalButtons 
                              style={{ layout: "vertical", shape: "pill", label: "pay" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [{ amount: { value: finalTotal.toString() }, description: `PRINTER POINT HUB Operational Supply - ${cartCount} Units` }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  await handleOrderSuccess(details);
                                } catch (err) { alert("Failed to capture payment node."); }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Bar */}
            <div className="pt-12 flex flex-col items-center gap-6">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="h-16 px-16 bg-indigo-600 text-white hover:bg-slate-900 rounded-full flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] disabled:opacity-50 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      {step === 1 ? 'PROCEED TO ACQUISITION' : 'INITIALIZE FULL DEPLOYMENT'}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.3em] transition-all flex items-center gap-2">
                   <ArrowRight size={14} className="rotate-180" /> BACK TO LOGISTICS
                </button>
              )}
            </div>
          </div>

          {/* --- SIDEBAR: OPERATIONAL SUMMARY --- */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] sticky top-32 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                 <Box size={18} className="text-indigo-600" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">MANIFEST</h3>
              </div>
              
              <div className="space-y-6 mb-12 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="h-20 w-20 bg-white rounded-[1.5rem] p-3 flex items-center justify-center border border-slate-100 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-1">{item.brand_name || 'HP AUTH'}</span>
                      <h4 className="text-[12px] font-black text-slate-900 uppercase truncate leading-tight group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                         <p className="text-[10px] font-bold text-slate-400">Qty: {item.quantity}</p>
                         <p className="text-[11px] font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-10">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <span>Unit Total</span>
                  <span className="text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <span>Logistics</span>
                  <span className="text-emerald-500 font-black text-[9px]">Free Shipping</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">VALUATION</span>
                  <span className="text-4xl font-black text-indigo-600 tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 opacity-60">
                  <Lock size={14} className="text-slate-400" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">End-to-End SSL Link Active</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

