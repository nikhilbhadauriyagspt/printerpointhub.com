import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown,  X,
  Smartphone,
  Cpu,
  Monitor,
  Headphones,
  Gamepad,
  LogOut,
  Settings,
  Package,
  ArrowRight,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Phone,
  LayoutGrid,
  Zap,
  ShieldCheck,
  MousePointer2,
  Sparkles,
  Layers,
  ShoppingBasket,
  Terminal,
  Activity,
  Box,
  Home,
  HelpCircle,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer, isSearchOpen, openSearch, closeSearch } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          
          const filteredProds = (pData.status === 'success' ? pData.data : []).filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );

          const matchedCats = categories.flatMap(parent => [parent, ...(parent.children || [])])
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4);

          setSuggestions({
            products: filteredProds,
            categories: matchedCats
          });
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeSearch();
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          const filtered = data.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });

    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setBrands(data.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
        }
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-urbanist",
          isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg" : "bg-white border-b border-slate-100"
        )}
      >
        {/* --- MAIN HEADER: LOGO, SEARCH, ACTIONS --- */}
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            
            {/* LOGO SECTION */}
            <div className="hidden lg:flex w-[350px] items-center gap-6">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <img 
                    src="/logo/EASYMYPRINT.png" 
                    alt="Printer Point Hub" 
                    className="h-8 lg:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="h-10 w-px bg-slate-200 hidden sm:block" />
                <div className="hidden sm:flex flex-col justify-center leading-none">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
                </div>
              </Link>
            </div>

            {/* MOBILE LOGO (VISIBLE ONLY ON MOBILE) */}
            <div className="lg:hidden flex-shrink-0">
               <Link to="/">
                 <img src="/logo/EASYMYPRINT.png" alt="Printer Point Hub" className="h-8 w-auto object-contain" />
               </Link>
            </div>

            {/* SEARCH BAR (CENTERED) */}
            <div className="hidden lg:flex flex-1 max-w-4xl mx-8 items-center relative group" onMouseEnter={() => setIsSearchFocused(true)} onMouseLeave={() => setIsSearchFocused(false)}>
               <div className="absolute left-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
                 <Search size={16} strokeWidth={2.5} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search products, brands, and categories..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onFocus={() => setIsSearchFocused(true)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                 className="w-full h-12 pl-14 pr-32 bg-slate-50 border border-slate-200 rounded-2xl text-[12px] font-bold uppercase tracking-wider focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all"
               />
               <button 
                 onClick={handleSearch}
                 className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-black/5"
               >
                 Search
               </button>

               {/* --- SEARCH SUGGESTIONS DROPDOWN --- */}
               <AnimatePresence>
                 {isSearchFocused && (searchQuery.length > 0 || recentSearches.length > 0) && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.98 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.98 }}
                     className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden z-[120]"
                   >
                     <div className="flex divide-x divide-slate-100">
                        {/* Categories & Recent Searches */}
                        <div className="w-[280px] p-6 bg-slate-50/50">
                           {searchQuery.length > 0 && suggestions.categories.length > 0 && (
                             <div className="mb-8">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Suggested Categories</p>
                               <div className="space-y-2">
                                 {suggestions.categories.map(cat => (
                                   <Link 
                                     key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => { setSearchQuery(''); setIsSearchFocused(false); }}
                                     className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:text-indigo-600 transition-all group"
                                   >
                                     <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm border border-slate-100">
                                        <Box size={14} />
                                     </div>
                                     <span className="text-[11px] font-bold uppercase tracking-tight">{cat.name}</span>
                                   </Link>
                                 ))}
                               </div>
                             </div>
                           )}

                           {recentSearches.length > 0 && (
                             <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent Searches</p>
                               <div className="space-y-1">
                                 {recentSearches.map((s, i) => (
                                   <div 
                                     key={i} onClick={() => { setSearchQuery(s); navigate(`/shop?search=${encodeURIComponent(s)}`); setIsSearchFocused(false); }}
                                     className="flex items-center justify-between p-2 rounded-xl hover:bg-white cursor-pointer group"
                                   >
                                     <div className="flex items-center gap-3">
                                        <Clock size={12} className="text-slate-300" />
                                        <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900">{s}</span>
                                     </div>
                                     <ArrowRight size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                        </div>

                        {/* Product Suggestions */}
                        <div className="flex-1 p-6">
                           <div className="flex items-center justify-between mb-6">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matched Products</p>
                              {isSearching && <Loader2 size={14} className="animate-spin text-indigo-600" />}
                           </div>
                           
                           {suggestions.products.length > 0 ? (
                             <div className="grid grid-cols-2 gap-4">
                                {suggestions.products.map(p => (
                                  <Link 
                                    key={p.id} to={`/product/${p.slug}`} onClick={() => { setSearchQuery(''); setIsSearchFocused(false); }}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                                  >
                                    <div className="h-14 w-14 rounded-xl bg-slate-50 flex items-center justify-center p-2 shrink-0 overflow-hidden">
                                       <img 
                                         src={(() => {
                                           try {
                                             const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                                             return imgs && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/50";
                                           } catch(e) { return "https://via.placeholder.com/50"; }
                                         })()} 
                                         alt="" className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" 
                                       />
                                    </div>
                                    <div className="min-w-0">
                                       <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate leading-tight mb-1">{p.name}</p>
                                       <p className="text-[10px] font-black text-indigo-600 tracking-tight">${p.price}</p>
                                    </div>
                                  </Link>
                                ))}
                             </div>
                           ) : searchQuery.length > 0 && !isSearching ? (
                             <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                                   <Search size={20} />
                                </div>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">No matching products found</p>
                             </div>
                           ) : (
                             <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-200 mb-4">
                                   <Zap size={20} className="fill-current" />
                                </div>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Start typing to explore models</p>
                             </div>
                           )}
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* ACTIONS HUB */}
            <div className="flex w-auto lg:w-[350px] items-center justify-end gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/wishlist" className="h-11 w-11 flex items-center justify-center rounded-2xl transition-all relative text-slate-600 hover:bg-slate-50 hover:text-red-500 border border-transparent hover:border-slate-100">
                  <Heart size={20} strokeWidth={2} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">{wishlistCount}</span>
                  )}
                </Link>

                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openCartDrawer}
                  className="h-11 w-11 flex items-center justify-center rounded-2xl transition-all relative text-slate-600 hover:bg-slate-50 hover:text-indigo-600 border border-transparent hover:border-slate-100"
                >
                  <ShoppingBag size={20} strokeWidth={2} />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-slate-900 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
                </motion.button>
              </div>

              <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

              <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                {user ? (
                   <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="h-11 w-11 bg-slate-900 text-white flex items-center justify-center text-[12px] font-black cursor-pointer rounded-2xl shadow-lg shadow-slate-900/10 overflow-hidden"
                   >
                     {(user.name || 'U').charAt(0).toUpperCase()}
                   </motion.div>
                ) : (
                  <Link to="/login" className="h-11 px-6 flex items-center gap-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-600/20 transition-all group">
                    <User size={16} strokeWidth={2.5} className="transition-transform group-hover:scale-110" />
                    <span className="hidden sm:block">Login</span>
                  </Link>
                )}

                <AnimatePresence>
                  {isProfileOpen && user && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-200 p-3 z-[110] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
                    >
                      <div className="px-5 py-4 bg-slate-50 rounded-2xl mb-2 border border-slate-100">
                        <p className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Authenticated</p>
                        <p className="text-sm font-black text-slate-900 truncate">{user.name}</p>
                      </div>
                      <div className="p-1 space-y-1">
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all uppercase tracking-widest rounded-xl"><User size={14} /> Profile Hub</Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all uppercase tracking-widest rounded-xl"><Package size={14} /> My Logistics</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest rounded-xl mt-1 border-t border-slate-50 pt-2"><LogOut size={14} /> Disconnect</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="xl:hidden h-11 w-11 flex items-center justify-center bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 active:scale-95 transition-all"
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM NAVIGATION: DEPARTMENTS, LINKS, TRUST --- */}
        <div className="hidden xl:block border-t border-slate-100 py-3 bg-white">
          <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between">
            
            {/* DEPARTMENTS TOGGLE */}
            <button 
              onMouseEnter={() => setActiveDropdown('categories')}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 text-[11px] font-black tracking-[0.1em] uppercase group relative overflow-hidden",
                activeDropdown === 'categories' 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10"
              )}
            >
               <LayoutGrid size={14} className={cn("transition-transform duration-500", activeDropdown === 'categories' ? "rotate-90" : "group-hover:rotate-12")} />
               <span>Browse Departments</span>
               <ChevronDown size={14} className={cn("ml-2 transition-transform duration-300", activeDropdown === 'categories' && "rotate-180")} />
            </button>

            {/* MAIN NAV LINKS */}
            <nav className="flex items-center gap-2">
              {[
                { name: 'Home', path: '/', icon: <Home size={14} /> },
                { name: 'Store', path: '/shop' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' }
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={cn(
                      "px-6 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-300 rounded-xl flex items-center gap-2",
                      isActive 
                        ? "text-indigo-600 bg-indigo-50" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* HP PREMIUM TRUST BADGE (INTEGRATED) */}
            <div className="flex items-center gap-4 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl group/hp cursor-default transition-all hover:bg-white hover:shadow-md">
               <div className="relative">
                  <div className="h-6 w-6 bg-white p-1 flex items-center justify-center rounded-md shadow-inner border border-slate-100 group-hover/hp:border-indigo-300 transition-colors">
                     <img src="/brands/hp.png" alt="HP" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-500 rounded-full border-2 border-white animate-pulse" />
               </div>
               <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Authorized</span>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tight">HP Partner</span>
               </div>
            </div>

          </div>
        </div>

        {/* --- COMPACT PROFESSIONAL MEGA MENU --- */}
        <AnimatePresence>
          {activeDropdown === 'categories' && (
            <motion.div 
              ref={dropdownRef}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden z-[90] shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="max-w-[1920px] mx-auto flex min-h-[320px] max-h-[480px]">
                
                {/* CATEGORIES SIDEBAR */}
                <div className="w-[280px] border-r border-slate-100 p-4 bg-slate-50/50 overflow-y-auto custom-scrollbar">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 mb-4">Product Groups</p>
                  <div className="space-y-1">
                    {categories.map(parent => (
                      <motion.div 
                        key={parent.id}
                        onMouseEnter={() => setHoveredParent(parent.id)}
                        className={cn(
                          "group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300",
                          String(hoveredParent) === String(parent.id) 
                            ? "bg-white shadow-sm text-indigo-600 border border-slate-100" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                           <div className={cn(
                             "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
                             String(hoveredParent) === String(parent.id) 
                               ? "bg-indigo-600 text-white" 
                               : "bg-slate-100 text-slate-400 group-hover:text-slate-900"
                           )}>
                              {parent.name.toLowerCase().includes('printer') ? <Monitor size={14} /> : <Cpu size={14} />}
                           </div>
                           <span className="text-[12px] font-bold uppercase tracking-tight">{parent.name}</span>
                        </div>
                        <ChevronRight size={12} className={cn("transition-all duration-300", String(hoveredParent) === String(parent.id) ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* SUBCATEGORIES GRID */}
                <div className="flex-1 p-8 bg-white overflow-y-auto custom-scrollbar">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                     <div className="flex items-center gap-3">
                        <span className="h-1 w-4 bg-indigo-600 rounded-full" />
                        <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">{activeParent?.name} Collections</h4>
                     </div>
                     <Link 
                       to={`/shop?category=${activeParent?.slug}`} 
                       onClick={() => setActiveDropdown(null)} 
                       className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:gap-3 transition-all flex items-center gap-2 group"
                     >
                        View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {subCategoriesToDisplay.map((sub) => (
                      <Link 
                        key={sub.id}
                        to={`/shop?category=${sub.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-indigo-50 hover:bg-indigo-50/30 transition-all duration-300"
                      >
                        <div className="h-10 w-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm">
                           <ShoppingBasket size={18} />
                        </div>
                        <div>
                           <span className="text-[12px] font-bold text-slate-900 block leading-none uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{sub.name}</span>
                           <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Explore Items</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* QUICK LINKS / BRANDS (COMPACT) */}
                <div className="w-[300px] border-l border-slate-100 p-6 bg-slate-50/30 flex flex-col gap-6">
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Partner Ecosystem</p>
                      <div className="grid grid-cols-2 gap-2">
                        {brands.map(brand => (
                          <Link 
                            key={brand.id} to={`/shop?brand=${encodeURIComponent(brand.name)}`} onClick={() => setActiveDropdown(null)}
                            className="px-3 py-2 bg-white border border-slate-100 text-[9px] font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all rounded-lg text-center uppercase"
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                   </div>

                   <div className="mt-auto p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden group/cta shadow-xl">
                      <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Sparkles size={60} />
                      </div>
                      <div className="relative z-10">
                        <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-2">Service Node</p>
                        <h4 className="text-[14px] font-black text-white uppercase tracking-tight leading-tight mb-4">Request Custom<br/>Bulk Quote</h4>
                        <Link to="/contact" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest hover:text-indigo-400 transition-colors">
                           CONTACT SALES <ArrowRight size={12} />
                        </Link>
                      </div>
                   </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- PREMIUM COMPACT SEARCH COMMAND CENTER --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeSearch}
              className="fixed inset-0 z-[200] bg-slate-950/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[210] px-6"
            >
              <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden">
                <form onSubmit={handleSearch} className="relative group p-4">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search premium inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-12 pr-12 bg-slate-50 border border-transparent rounded-[1.5rem] text-sm font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-indigo-600 transition-all duration-500 shadow-inner placeholder:text-slate-300"
                  />
                  <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={2.5} />
                  <button onClick={closeSearch} className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors">
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </form>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-8 pt-0">
                  <AnimatePresence mode="wait">
                    {searchQuery.trim().length > 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 py-4">
                        {/* Categories Segment */}
                        {suggestions.categories.length > 0 && (
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] px-4">Departments</p>
                            <div className="grid grid-cols-2 gap-2">
                              {suggestions.categories.map(cat => (
                                <Link 
                                  key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => { closeSearch(); setSearchQuery(''); }}
                                  className="flex items-center justify-between p-4 bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all rounded-2xl group"
                                >
                                  <span className="text-xs font-black text-slate-900 uppercase">{cat.name}</span>
                                  <ArrowRight size={14} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Products Segment */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-4">Inventory Units</p>
                          <div className="space-y-2">
                            {suggestions.products.map((p) => (
                              <Link 
                                key={p.id} to={`/product/${p.slug}`} onClick={() => { closeSearch(); setSearchQuery(''); saveSearch(searchQuery); }}
                                className="flex items-center gap-6 p-4 border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all rounded-2xl group"
                              >
                                <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform">
                                  <img src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-black text-slate-900 uppercase truncate leading-tight group-hover:text-indigo-600 transition-colors">{p.name}</p>
                                  <p className="text-[10px] font-bold text-indigo-600 mt-1">${p.price}</p>
                                </div>
                                <ArrowRight size={16} className="text-slate-200 group-hover:text-indigo-600 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <button onClick={handleSearch} className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-xl">Execute Exhaustive Search</button>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-6">
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] border-b border-slate-50 pb-4">Recent Access</h4>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.length > 0 ? (
                              recentSearches.map(t => (
                                <button 
                                  key={t} onClick={() => setSearchQuery(t)} 
                                  className="px-4 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest flex items-center gap-2"
                                >
                                  <Clock size={12} className="opacity-40" /> {t}
                                </button>
                              ))
                            ) : (
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No log entries found</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-50 pb-4">Quick Nodes</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {categories.slice(0, 4).map(cat => (
                              <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={closeSearch} className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-indigo-600 transition-all">
                                 <span className="text-[10px] font-black text-slate-900 group-hover:text-white uppercase truncate">{cat.name}</span>
                                 <ChevronRight size={14} className="text-slate-300 group-hover:text-white" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* --- MOBILE NAVIGATION SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-slate-950/20 backdrop-blur-md xl:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] shadow-2xl xl:hidden flex flex-col font-urbanist"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4">
                  <img src="/logo/PRINTER POINT HUB.png" alt="PRINTER POINT HUB" className="h-9 w-auto object-contain" />
                  <div className="h-6 w-px bg-slate-200" />
                  <div className="flex flex-col justify-center leading-none">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
                  </div>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-900 border border-slate-100 shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em] px-2">Navigation</p>
                  <nav className="flex flex-col gap-1">
                    {[
                      { name: 'Home', path: '/', icon: <Home size={18} /> },
                      { name: 'Store', path: '/shop', icon: <ShoppingBag size={18} /> },
                      { name: 'About', path: '/about', icon: <Activity size={18} /> },
                      { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
                      { name: 'FAQ', path: '/faq', icon: <HelpCircle size={18} /> }
                    ].map((link) => (
                      <Link 
                        key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                          location.pathname === link.path ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {link.icon} {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-10 border-t border-slate-50">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] px-2">Account Node</p>
                   {user ? (
                     <div className="space-y-1">
                        <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-xl"><User size={18} /> Profile Dashboard</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl"><LogOut size={18} /> Terminate Session</button>
                     </div>
                   ) : (
                     <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-4 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"><User size={18} /> Authorized Login</Link>
                   )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-indigo-600" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Node Active</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
