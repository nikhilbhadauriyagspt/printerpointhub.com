import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowUpRight, Globe, Mail, Loader2, CheckCircle2, MapPin, Phone, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-20 pb-10 font-urbanist relative overflow-hidden border-t border-slate-100">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-flex items-center gap-5 group">
              <img src="/logo/EASYMYPRINT.png" alt="Printer Point Hub" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                <span className="text-[13px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
              </div>
            </Link>
            <p className="text-slate-500 text-lg font-bold leading-relaxed max-w-md">
              Authorized HP Partner specializing in premium hardware solutions and professional operational systems for global enterprises.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                  <ShieldCheck size={16} className="text-indigo-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Authorized HP Partner</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-slate-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Stay Informed</h4>
                    <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-tight">Subscribe to our <br/><span className="text-transparent stroke-text-white">Professional Updates.</span></h3>
                  </div>
                  <form onSubmit={handleSubscribe} className="relative group/form">
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR EMAIL"
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:bg-white focus:text-slate-900 transition-all font-bold placeholder:text-white/30"
                    />
                    <button
                      disabled={loading}
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-slate-900 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : "Join"}
                    </button>
                  </form>
               </div>
            </div>
          </div>
        </div>

        {/* --- LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-20 pt-20 border-t border-slate-50">
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">Collections</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-slate-900 transition-colors text-[13px] font-black uppercase tracking-tight flex items-center gap-3 group">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">Support Hub</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Track Orders', path: '/orders' },
                { name: 'FAQs', path: '/faq' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-slate-900 transition-colors text-[13px] font-black uppercase tracking-tight flex items-center gap-3 group">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">Legal Policies</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Return Policy', path: '/return-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-slate-900 transition-colors text-[13px] font-black uppercase tracking-tight flex items-center gap-3 group">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">Location</h4>
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <MapPin size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-[13px] font-black text-slate-500 leading-relaxed uppercase tracking-tight">
                    500 W Peace St <br /> Raleigh, NC 27603, USA
                  </span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <Mail size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-[13px] font-black text-slate-500 tracking-tight">info@printerpointhub.com</span>
               </div>
            </div>
          </div>
        </div>

        {/* --- MAP INTEGRATION --- */}
        <div className="w-full h-[250px] mb-12 rounded-[2.5rem] overflow-hidden border border-slate-100 group shadow-inner grayscale hover:grayscale-0 transition-all duration-1000">
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.3456789!2d-78.6456789!3d35.7856789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f6789abcdef%3A0x123456789abcdef!2zNzIyIE4gV2VzdCBTdCwgUmFsZWlnaCwgTkMgMjc2MDMsIFVTQQ!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            <span>© 2026 PRINTER POINT HUB | ALL RIGHTS RESERVED. <span className="mx-2">|</span> A SUBSIDIARY OF PRIMEFIX SOLUTIONS LLC</span>
          </div>

          <div className="flex items-center gap-8 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-950">Verified Merchant</span>
             </div>
             <div className="text-indigo-600 italic font-black text-xl">PayPal</div>
          </div>
        </div>

      </div>

      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
      `}</style>
    </footer>
  );
}


