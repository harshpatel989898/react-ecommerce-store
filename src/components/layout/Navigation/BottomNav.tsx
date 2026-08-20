import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiHeart, FiShoppingBag, FiUser } from 'react-icons/fi';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { scrollToElement } from '../../../utils/helpers';

export const BottomNav: React.FC = () => {
  const { items: cartItems, openDrawer: openCartDrawer } = useCartStore();
  const { items: wishlistItems, openDrawer: openWishlistDrawer } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1200] glass-panel border-t border-slate-200 dark:border-slate-800/90 py-2 px-3 shadow-2xl">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => scrollToElement('hero-section')}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
        >
          <FiHome className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Catalog / Products */}
        <button
          onClick={() => scrollToElement('catalog-section')}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
        >
          <FiGrid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Catalog</span>
        </button>

        {/* Wishlist Trigger */}
        <button
          onClick={openWishlistDrawer}
          className="relative flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors p-1"
        >
          <FiHeart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-extrabold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>

        {/* Cart Drawer Trigger */}
        <button
          onClick={openCartDrawer}
          className="relative flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
        >
          <FiShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-extrabold flex items-center justify-center shadow-lg shadow-indigo-600/30">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        {/* User Account / Auth */}
        <NavLink
          to={isAuthenticated ? '#' : '/login'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors p-1 ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`
          }
        >
          <FiUser className="w-5 h-5" />
          <span className="text-[10px] font-medium">{isAuthenticated ? 'Account' : 'Login'}</span>
        </NavLink>
      </div>
    </div>
  );
};
