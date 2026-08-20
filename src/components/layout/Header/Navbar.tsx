import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiHeart, FiSearch, FiX, FiStar, FiZap, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { useUIStore } from '../../../store/useUIStore';
import { useTheme } from '../../../theme/useThemeContext';
import { useAuthStore } from '../../../store/useAuthStore';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product.types';
import { formatCurrency, scrollToElement } from '../../../utils/helpers';
import { Sidebar } from '../Sidebar/Sidebar';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { resolvedTheme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuthStore();
  const { items: cartItems, openDrawer: openCartDrawer } = useCartStore();
  const { items: wishlistItems, openDrawer: openWishlistDrawer } = useWishlistStore();
  const { searchQuery, setSearchQuery, openProductModal } = useUIStore();

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val && val.trim().length > 1) {
      const q = val.toLowerCase().trim();
      const results = ProductService.MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      ).slice(0, 4);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    openProductModal(product);
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg py-3'
            : 'bg-gradient-to-b from-white/90 via-white/50 to-transparent dark:from-slate-950/90 dark:via-slate-950/40 dark:to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              <FiMenu className="w-5 h-5" />
            </button>

            {/* Logo Brand */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToElement('hero-section')}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <FiZap className="w-5 h-5 text-indigo-400 group-hover:text-pink-400 transition-colors" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-600 dark:from-white dark:via-slate-100 dark:to-indigo-300 bg-clip-text text-transparent">
                  AURA<span className="text-indigo-600 dark:text-indigo-500">STORE</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-indigo-600/80 dark:text-indigo-400/80">
                  Luxury Hardware
                </span>
              </div>
            </div>

            {/* Instant Live Search Input & Dropdown */}
            <div className="relative flex-1 max-w-md hidden md:block">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-3.5 w-4 h-4 text-indigo-500 dark:text-indigo-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search titanium smartwatch, ANC audio, gaming..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  className="w-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm rounded-xl pl-10 pr-10 py-2.5 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Live Search Results Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <FiStar className="text-indigo-500 fill-indigo-500" /> Quick Matches
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate">{product.name}</h4>
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">{formatCurrency(product.price)}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions: Theme Switch, Wishlist & Cart Drawers */}
            <div className="flex items-center gap-2.5">
              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-all cursor-pointer"
                title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {resolvedTheme === 'dark' ? (
                  <FiSun className="w-5 h-5 text-amber-400" />
                ) : (
                  <FiMoon className="w-5 h-5 text-indigo-600" />
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={openWishlistDrawer}
                className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-all cursor-pointer"
                title="Saved Favorites"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-lg shadow-pink-500/40"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={openCartDrawer}
                className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <FiShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <motion.span
                  key={totalCartCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold"
                >
                  {totalCartCount}
                </motion.span>
              </button>

              {/* User Avatar / Auth */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {user?.name?.[0] || 'U'}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
