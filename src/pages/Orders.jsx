import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, Box, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'Your acquisition has been registered' },
    { key: 'processing', label: 'In Preparation', icon: Package, desc: 'Units are being meticulously checked' },
    { key: 'shipped', label: 'In Transit', icon: Truck, desc: 'Consignment has left our facility' },
    { key: 'out_for_delivery', label: 'Arrival Imminent', icon: MapPin, desc: 'Courier is approaching destination' },
    { key: 'delivered', label: 'Handover Complete', icon: CheckCircle2, desc: 'Successfully reached destination' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 font-urbanist px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-10 shadow-sm">
            <Package size={40} className="text-slate-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">Track Order.</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">Login to see your full history or enter your guest email below.</p>
          
          <form onSubmit={handleGuestSearch} className="flex flex-col sm:flex-row gap-4 mb-16 group">
            <input 
              type="email" 
              required
              placeholder="ENTER GUEST EMAIL ADDRESS" 
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="flex-1 h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
            />
            <button className="h-16 px-12 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
              Locate Order
            </button>
          </form>

          <div className="pt-10 border-t border-slate-50">
            <Link to="/login" className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] hover:underline">Authentication Terminal</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-urbanist relative overflow-hidden">
      <SEO title="Order History | PRINTER POINT HUB" />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- HERO MATCHED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-indigo-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-indigo-600">Acquisition History</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              MY <span className="text-transparent stroke-text-light">ORDERS.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
             <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{orders.length} Units Reserved</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Synchronizing Archive...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-[4rem] border border-slate-100">
            <Package size={48} className="text-slate-200 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Zero History Found</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 mb-10">No acquisitions detected in this terminal.</p>
            <Link to="/shop" className="h-16 px-12 bg-slate-950 text-white rounded-full inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all group">
              Browse Inventory <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={order.id} 
                className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden group hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.04)]"
              >
                <div className="p-8 lg:p-10 border-b border-slate-50 flex flex-wrap items-center justify-between gap-8 bg-slate-50/30">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-900 flex items-center justify-center">
                        <Package size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisition ID</p>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">#PFX-{order.order_code || order.id}</h3>
                      </div>
                    </div>
                    
                    <div className="hidden lg:block h-10 w-px bg-slate-200" />
                    
                    <div className="hidden sm:block">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar size={10} className="text-indigo-600" /> Dispatch Date
                      </p>
                      <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="hidden md:block text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Settlement</p>
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{order.payment_method === 'cod' ? 'Upon Arrival' : 'PayPal Secure'}</p>
                    </div>
                    
                    <div className={cn(
                      "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-sm border",
                      order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-indigo-50 text-indigo-600 border-blue-100"
                    )}>
                      <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500" :
                        order.status === 'pending' ? "bg-amber-500" : "bg-indigo-500"
                      )} />
                      {order.status}
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Valuation</p>
                      <p className="text-2xl font-black text-indigo-600 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 lg:p-12 flex flex-col lg:flex-row gap-16">
                  <div className="flex-1 space-y-8">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-8 group/item">
                        <div className="h-20 w-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center p-4 shrink-0 transition-all duration-500 group-hover/item:bg-white group-hover/item:border-blue-100 group-hover/item:scale-105 group-hover/item:shadow-lg group-hover/item:shadow-indigo-500/5">
                          <img 
                            src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Authorized Unit</span>
                          <h4 className="text-[15px] font-black text-slate-900 uppercase truncate tracking-tight group-hover/item:text-indigo-600 transition-colors">{item.product_name}</h4>
                          <div className="flex items-center gap-4 mt-2">
                             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                             <div className="h-1 w-1 rounded-full bg-slate-200" />
                             <span className="text-[11px] font-black text-slate-900 tracking-tight">${parseFloat(item.price).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[380px] space-y-8 pt-8 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-16">
                    <div className="flex flex-col gap-6">
                       <div className="space-y-3">
                          <div className="flex items-center gap-3">
                             <MapPin size={16} className="text-indigo-600" />
                             <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Destination Hub</h4>
                          </div>
                          <p className="text-[13px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight pl-7">
                            {order.address}, {order.city}<br />
                            {order.zipCode || 'United States'}
                          </p>
                       </div>
                       
                       <button 
                        onClick={() => setSelectedOrder(order)}
                        className="w-full h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-black/10 group"
                      >
                        Track Real-Time Status <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tracking Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[1000]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-[3.5rem] z-[1001] shadow-[0_50px_100px_rgba(0,0,0,0.15)] p-12 font-urbanist border border-slate-100"
              >
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">Tracking Hub.</h2>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mt-3">Deployment #PFX-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                    <X size={24} />
                  </button>
                </div>

                <div className="relative space-y-12">
                  <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-100" />

                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const isActive = selectedOrder.status === step.key;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-10 group">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 border-2 ${
                          isCompleted ? 'bg-slate-950 border-slate-950 text-white shadow-xl shadow-black/10' : 'bg-white border-slate-100 text-slate-200'
                        }`}>
                          <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                        </div>
                        
                        <div className="flex-1 py-1">
                          <h4 className={`text-sm font-black uppercase tracking-widest transition-colors duration-500 ${isCompleted ? 'text-slate-950' : 'text-slate-300'}`}>
                            {step.label}
                          </h4>
                          <p className={`text-[11px] font-bold mt-1 transition-colors duration-500 ${isCompleted ? 'text-slate-500' : 'text-slate-300'}`}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <motion.div 
                              layoutId="active-tag"
                              className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-blue-100"
                            >
                              <div className="h-1 w-1 rounded-full bg-indigo-600 animate-ping" />
                              Current Real-Time Status
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Logistics Provider</p>
                    <p className="text-xs font-black text-slate-900 uppercase">PRINTER POINT HUB Network</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimate</p>
                    <p className="text-xs font-black text-slate-900 uppercase">Express Dispatch Active</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Global Styles for Stroke Text */}
      <style>{`
        .stroke-text-light {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
