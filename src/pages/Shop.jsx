import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  ShoppingBag, 
  Heart,
  X,
  Loader2,
  Check,
  ArrowUpDown,
  SlidersHorizontal,
  ArrowRight,
  Plus,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => {
      if (d.status === 'success') {
        setBrands(d.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
      }
    });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="bg-white min-h-screen font-urbanist">
      <SEO 
        title="Premium Catalog | PRINTER POINT HUB" 
        description="Browse our authorized catalog of high-performance tech solutions."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="pt-32 pb-16 px-6 md:px-10 lg:px-20 bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-12">
              Explore Our <span className="text-indigo-600">Inventory.</span>
            </h1>
            
            {/* Search Bar Refinement */}
            <div className="w-full max-w-2xl relative group">
               <input 
                 type="text" 
                 placeholder="Search products, brands or collections..."
                 value={search}
                 onChange={(e) => updateFilter('search', e.target.value)}
                 className="w-full h-16 pl-14 pr-32 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-sm font-bold uppercase tracking-wider focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-300 shadow-sm relative z-10"
               />
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 z-20" size={20} strokeWidth={2.5} />
               <div className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-lg z-20 hover:bg-indigo-600 transition-all cursor-pointer">
                  Search
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- STICKY FILTER CONTROL HUB --- */}
      <div className="sticky top-[80px] lg:top-[96px] z-[45] bg-white/90 backdrop-blur-xl border-y border-slate-100 py-4 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "h-11 px-6 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                isFilterOpen ? "bg-slate-900 text-white shadow-xl" : "bg-white border border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600"
              )}
            >
              <SlidersHorizontal size={16} />
              {isFilterOpen ? "Hide Filters" : "Filter Gallery"}
            </button>

            {/* Quick Filter Chips */}
            <AnimatePresence>
              {(category || brand || search) && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="hidden sm:flex items-center gap-2 border-l border-slate-100 pl-4">
                  {category && (
                    <button onClick={() => updateFilter('category', '')} className="h-8 px-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 hover:bg-indigo-100 transition-all">
                      {category} <X size={10} />
                    </button>
                  )}
                  {brand && (
                    <button onClick={() => updateFilter('brand', '')} className="h-8 px-3 bg-slate-100 border border-slate-200 text-slate-900 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 hover:bg-slate-200 transition-all">
                      {brand} <X size={10} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-3 bg-[#F8FAFC] px-4 py-2 rounded-xl border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sort</span>
                <select 
                  value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-transparent text-[10px] font-black uppercase focus:outline-none cursor-pointer text-slate-900"
                >
                  <option value="newest">Recent</option>
                  <option value="price_low">Price: Low</option>
                  <option value="price_high">Price: High</option>
                  <option value="name_asc">A-Z</option>
                </select>
             </div>
             <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l border-slate-100 pl-6">{total} Units</p>
          </div>
        </div>

        {/* --- EXPANDABLE FILTER DRAWER --- */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="max-w-[1920px] mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-1 w-1 bg-indigo-600 rounded-full" /> Collections
                  </h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                        className={cn("w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase transition-all rounded-lg", category === cat.slug ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-1 w-1 bg-indigo-600 rounded-full" /> Partner Brands
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <button 
                        key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                        className={cn("px-3 py-2 text-[9px] font-bold uppercase border transition-all rounded-lg", brand === b.name ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white border-slate-100 text-slate-500 hover:border-slate-900 hover:text-slate-900")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-[2rem] flex flex-col justify-between shadow-xl lg:col-span-2 relative overflow-hidden">
                   <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
                      <Zap size={150} />
                   </div>
                   <div className="relative z-10">
                      <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Filtering Logic</p>
                      <h5 className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-6">Refine Your Selection.</h5>
                   </div>
                   <button 
                     onClick={() => navigate('/shop')}
                     className="relative z-10 w-full py-4 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg"
                   >
                     Reset All Filters
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-20 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-10 w-10 text-indigo-600 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Accessing Inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center bg-[#F8FAFC] rounded-[3rem] border border-slate-100">
            <div className="h-20 w-20 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
               <X size={32} className="text-slate-200" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">No Units Found</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-10">Try adjusting your search or filters</p>
            <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all">Clear Refinement</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
            {products.map((p, i) => (
              <motion.div 
                key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.05 }}
                className="group relative bg-[#F8FAFC] rounded-[2rem] border border-transparent p-6 flex flex-col transition-all duration-500 hover:bg-white hover:border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full overflow-hidden"
              >
                {/* Wishlist Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                    isInWishlist(p.id) ? "text-red-500 shadow-md border-red-100" : "text-slate-300 hover:text-red-500 hover:border-red-100"
                  )}
                >
                  <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>

                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative aspect-square mb-8 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-90 transition-transform duration-500 opacity-80 shadow-inner" />
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={getImagePath(p.images)} alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                    />
                  </div>

                  <div className="space-y-3 px-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-500">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-black text-indigo-600 tracking-tight">${p.price}</span>
                    </div>
                  </div>
                </Link>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-12 rounded-xl flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm",
                      addedItems[p.id] 
                        ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                        : "bg-slate-900 text-white hover:bg-indigo-600 shadow-black/10 hover:shadow-indigo-600/20"
                    )}
                  >
                    {addedItems[p.id] ? <Check size={16} /> : <Plus size={16} />}
                    {addedItems[p.id] ? "SUCCESS" : "ADD TO CART"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
