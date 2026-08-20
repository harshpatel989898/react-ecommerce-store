import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiEye, FiClock, FiArrowDown } from 'react-icons/fi';
import { ProductService } from '../../../services/product.service';
import { useCartStore } from '../../../store/useCartStore';
import { useUIStore } from '../../../store/useUIStore';
import { formatCurrency, scrollToElement } from '../../../utils/helpers';

interface HeroSlide {
  title: string;
  subtitle: string;
  tag: string;
  accentColor: string;
  gradient: string;
  productId: string;
  discount: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    title: 'Lossless Spatial Studio Sound',
    subtitle: 'Next-Gen Active Hybrid Noise Cancellation with 60-Hour Playback.',
    tag: '🔥 2026 AUDIO FLAGSHIP',
    accentColor: '#6366f1',
    gradient: 'from-indigo-600/30 via-purple-600/20 to-transparent',
    productId: 'prod-01',
    discount: '23% OFF',
  },
  {
    title: 'Chronos Titanium Genesis',
    subtitle: 'Aerospace Grade 5 Titanium with Continuous ECG & Sapphire Display.',
    tag: '✨ ULTRA PERFORMANCE',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/30 via-blue-600/20 to-transparent',
    productId: 'prod-02',
    discount: 'SAVE ₹6,000',
  },
  {
    title: '150" 4K Laser Cinema Wall',
    subtitle: 'Transform any room with 2500 ANSI Lumens & Dolby Atmos Sound.',
    tag: '⚡ SMART LIVING REVOLUTION',
    accentColor: '#ec4899',
    gradient: 'from-pink-600/30 via-rose-600/20 to-transparent',
    productId: 'prod-09',
    discount: '25% OFF',
  },
];

export const HeroBanner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });

  const { addToCart } = useCartStore();
  const { openProductModal } = useUIStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const slide = HERO_SLIDES[activeIndex];
  const product = ProductService.MOCK_PRODUCTS.find((p) => p.id === slide.productId);

  const formatTwoDigits = (val: number) => (val < 10 ? `0${val}` : `${val}`);

  return (
    <section id="hero-section" className="relative pt-28 pb-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 lg:p-12 overflow-hidden backdrop-blur-xl shadow-xl dark:shadow-2xl">
          {/* Animated Background Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-all duration-700 pointer-events-none opacity-40 dark:opacity-100`} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              {/* Flash Sale Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                  {slide.tag}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <FiClock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
                  <span>Ends in:</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                    {formatTwoDigits(timeLeft.hours)}:{formatTwoDigits(timeLeft.minutes)}:{formatTwoDigits(timeLeft.seconds)}
                  </span>
                </div>
              </div>

              {/* Animated Slide Title & Subtitle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.productId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Price & Action Buttons */}
              {product && (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-slate-400 dark:text-slate-500 font-medium">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <FiShoppingBag className="w-4 h-4" /> Quick Buy
                    </button>
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <FiEye className="w-4 h-4" /> Inspect
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Product Image Banner */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {product && (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ duration: 0.5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-colors" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 w-full max-w-sm h-72 lg:h-80 object-cover rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800/80 transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-rose-600 text-white font-black text-xs shadow-lg uppercase tracking-wider">
                      {slide.discount}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Slide Controls & Progress Dots */}
          <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-indigo-600 dark:bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToElement('catalog-section')}
                className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors mr-2 cursor-pointer"
              >
                Scroll Catalog <FiArrowDown className="animate-bounce" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
