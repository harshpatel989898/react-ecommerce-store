import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiStar, FiEye, FiCheck } from 'react-icons/fi';
import { Product } from '../../../types/product.types';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { useUIStore } from '../../../store/useUIStore';
import { formatCurrency } from '../../../utils/helpers';
import Badge from '../../../components/common/Badge/Badge';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openProductModal, viewMode } = useUIStore();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, selectedColor);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => openProductModal(product)}
        className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-md dark:shadow-xl cursor-pointer"
      >
        <div className="relative w-full sm:w-48 h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-2.5 left-2.5">
              <Badge variant={product.badge}>{product.badge}</Badge>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between h-full min-w-0 w-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-bold">
                <FiStar className="fill-amber-400" /> {product.rating} ({product.reviewCount})
              </div>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              {product.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{product.tagline}</p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs line-through text-slate-400 dark:text-slate-500 font-medium">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleWishlist}
                className={`p-2.5 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-pink-50 dark:bg-pink-500/20 text-pink-500 dark:text-pink-400 border-pink-200 dark:border-pink-500/40'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 dark:fill-pink-400' : ''}`} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                {isAdding ? <FiCheck className="w-4 h-4 animate-bounce" /> : <FiShoppingBag className="w-4 h-4" />}
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 hover:border-indigo-500/50 transition-all duration-300 shadow-md dark:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 overflow-hidden cursor-pointer h-full"
    >
      {/* Image Container */}
      <div className="relative w-full h-56 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge}>{product.badge}</Badge>
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handleToggleWishlist}
            className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
              isWishlisted
                ? 'bg-pink-500/20 text-pink-500 dark:text-pink-400 border-pink-500/40 shadow-lg shadow-pink-500/20'
                : 'bg-white/80 dark:bg-slate-950/60 text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
            }`}
            title="Add to Wishlist"
          >
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 dark:fill-pink-400' : ''}`} />
          </button>
        </div>

        {/* Quick View Floating Button */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="w-full py-2.5 rounded-xl bg-white/90 dark:bg-slate-950/90 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:bg-indigo-600 transition-all"
          >
            <FiEye className="w-4 h-4" /> Quick View
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-bold">
              <FiStar className="fill-amber-400 w-3.5 h-3.5" /> {product.rating}
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{product.tagline}</p>
        </div>

        {/* Colors selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 my-3">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-4 h-4 rounded-full border-2 transition-transform ${
                  selectedColor === c ? 'scale-125 border-indigo-500' : 'border-slate-300 dark:border-slate-800 hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}

        {/* Footer Price & Add Button */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] line-through text-slate-400 dark:text-slate-500 font-medium">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {isAdding ? <FiCheck className="w-4 h-4 animate-bounce" /> : <FiShoppingBag className="w-4 h-4" />}
            <span>{isAdding ? 'Added' : 'Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
