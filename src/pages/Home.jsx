import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import BrandShowcase from "@/components/BrandShowcase";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, Headphones, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Authorized HP Partner | Premium Printers & Hardware" 
        description="Premium destination for authorized HP printers, precision tech, and essential accessories. Delivering excellence in tech solutions across the USA."
      />
      
      <Hero />
      <Features />
      <ShopByCategory categories={data.categories} />
      <Collections />
      <BestSellers products={data.all} />
      <BrandShowcase brands={data.brands} />
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />

      <QuickPicks products={data.all} />

      {/* 13. EXPERT CONSULTING - MODERN PREMIUM REDESIGN */}
      <section className="py-20 lg:py-32 bg-white font-urbanist relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                Professional <span className="text-indigo-600">Expert Guidance.</span>
              </h2>
              
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10 max-w-lg">
                Get the best advice for your office setup. Our specialists help you choose the right printers and tools to make your work easier and faster.
              </p>
              
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-14 px-8 bg-slate-900 text-white rounded-xl text-sm font-bold tracking-widest uppercase flex items-center gap-3 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300"
                >
                  Contact An Expert
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>

            {/* Right Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Shield size={24} />, title: "Full Warranty", desc: "Reliable protection for every machine." },
                { icon: <Wrench size={24} />, title: "Easy Setup", desc: "We help you get started quickly." },
                { icon: <Zap size={24} />, title: "Quick Support", desc: "Help is always just a call away." },
                { icon: <Layers size={24} />, title: "Bulk Orders", desc: "Great pricing for large office needs." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-[#F8FAFC] border border-transparent hover:border-indigo-100 rounded-[2rem] transition-all duration-500 group hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                >
                   <div className="h-12 w-12 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 shadow-sm">
                      {item.icon}
                   </div>
                   <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                   <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
