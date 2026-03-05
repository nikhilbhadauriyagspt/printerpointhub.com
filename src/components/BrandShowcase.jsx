import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  // Use a slower, smoother scroll for a premium feel
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-20 lg:py-32 bg-white font-urbanist relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white,transparent)] opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Strategic <span className="text-indigo-600">Partnerships.</span>
            </h2>
          </div>
        </div>

        {/* --- PREMIUM FLOATING SCROLL --- */}
        <div className="relative w-full overflow-hidden py-10 -my-10">
          {/* Soft Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <div className="animate-marquee-slow flex items-center gap-6 whitespace-nowrap py-10">
            {marqueeBrands.map((brand, i) => (
              <Link 
                key={`${brand.id}-${i}`}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group relative"
              >
                <div className="h-36 w-64 bg-slate-50 rounded-[2rem] border border-transparent shadow-sm flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:bg-white hover:border-indigo-100">
                  
                  {/* Floating Pedestal Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                  {/* Logo Container */}
                  <div className="h-14 w-14 relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand.name} 
                      className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 mix-blend-multiply" 
                    />
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center transition-all duration-500 transform group-hover:translate-y-1">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                      {brand.name}
                    </span>
                    <div className="h-0.5 w-0 bg-indigo-600 mt-2 transition-all duration-500 group-hover:w-6 rounded-full" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Global Styles */}
      <style>{`
        .animate-marquee-slow {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
