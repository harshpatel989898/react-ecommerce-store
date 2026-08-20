import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiHeart, FiShoppingBag, FiUser, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { Drawer } from '../../ui/Drawer/Drawer';
import { useTheme } from '../../../theme/useThemeContext';
import { useAuthStore } from '../../../store/useAuthStore';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItems = useCartStore((s) => s.items);
  const wishlistItems = useWishlistStore((s) => s.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { label: 'Products', path: '/', icon: <FiGrid className="w-5 h-5" /> },
    {
      label: 'Wishlist',
      path: '#',
      icon: <FiHeart className="w-5 h-5" />,
      badge: wishlistItems.length,
    },
    {
      label: 'Cart',
      path: '#',
      icon: <FiShoppingBag className="w-5 h-5" />,
      badge: cartCount,
    },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="left" size="sm">
      <div className="flex flex-col h-full justify-between gap-6">
        <div>
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              AuraStore
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge ? (
                  <span className="px-2 py-0.5 text-xs font-bold bg-indigo-600 text-white rounded-full">
                    {link.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {resolvedTheme === 'dark' ? (
                <FiSun className="w-4 h-4 text-amber-400" />
              ) : (
                <FiMoon className="w-4 h-4 text-indigo-600" />
              )}
              <span>{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 px-2 py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <FiUser className="w-4 h-4" />
              <span>Sign In</span>
            </NavLink>
          )}
        </div>
      </div>
    </Drawer>
  );
};
