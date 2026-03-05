import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();
  const { cartCount, openCartDrawer, openSearch } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Store', path: '/shop', icon: ShoppingBag },
    { name: 'Search', type: 'button', onClick: openSearch, icon: Search },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Account', path: '/login', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-t border-gray-100 pb-safe">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.type === 'button') {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-1 w-full"
              >
                <div className="relative text-slate-400">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 w-full relative"
            >
              <div className={`relative ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name === 'Store' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-black text-white text-[8px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="bottomNavActive"
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" 
                  />
                )}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
