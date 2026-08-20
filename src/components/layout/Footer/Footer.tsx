import React, { useState } from 'react';
import { FiZap, FiSend, FiShield, FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import { useToastStore } from '../../../store/useToastStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success, warning } = useToastStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      success('Subscribed! 🎁', 'Check your inbox for a ₹1,000 welcome gift coupon.');
      setEmail('');
    } else {
      warning('Invalid Email', 'Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <FiTruck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">Express Shipping</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Free on orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <FiShield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">2-Year Warranty</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Comprehensive hardware coverage</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <FiRefreshCw className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">30-Day Returns</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Hassle-free money back</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <FiHeadphones className="w-6 h-6 text-pink-600 dark:text-pink-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">24/7 Tech Support</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct concierge assistance</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <FiZap className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white tracking-wider">
                AURA<span className="text-indigo-600 dark:text-indigo-500">STORE</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Architecting luxury audio, biometrics, and high-performance computing peripherals for creators and power users.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog-section" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Hi-Fi Audio</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Smart Wearables</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Gaming Peripherals</a></li>
              <li><a href="#catalog-section" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Smart Living</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Warranty Claim</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">VIP Newsletter</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Subscribe to receive exclusive hardware releases & ₹1,000 instant coupon.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1 transition-all cursor-pointer"
              >
                <FiSend className="w-3.5 h-3.5" /> Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AuraStore Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-xs font-mono">
            <span>React 19 Enterprise Edition</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
