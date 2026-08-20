import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingBag, FiStar, FiCheck, FiMinus, FiPlus, FiZap } from 'react-icons/fi';
import Modal from '../../../components/common/Modal/Modal';
import { useUIStore } from '../../../store/useUIStore';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { ProductService } from '../../../services/product.service';
import { formatCurrency } from '../../../utils/helpers';
import Badge from '../../../components/common/Badge/Badge';

export const ProductModal: React.FC = () => {
  const { selectedProduct, isProductModalOpen, closeProductModal } = useUIStore();
  const { addToCart, openCheckout } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
      setSelectedColor(selectedProduct.colors && selectedProduct.colors.length > 0 ? selectedProduct.colors[0] : '');
      setSelectedSize(selectedProduct.sizes && selectedProduct.sizes.length > 0 ? selectedProduct.sizes[0] : '');
      setQuantity(1);
      setActiveTab('desc');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);
  const reviews = ProductService.MOCK_REVIEWS;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    closeProductModal();
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    closeProductModal();
    openCheckout();
  };

  return (
    <Modal isOpen={isProductModalOpen} onClose={closeProductModal} maxWidth="4xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
              src={activeImage || selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            {selectedProduct.badge && (
              <div className="absolute top-3 left-3">
                <Badge variant={selectedProduct.badge}>{selectedProduct.badge}</Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1">
              {selectedProduct.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === img ? 'border-indigo-500 scale-105' : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-bold">
                <FiStar className="fill-amber-400" /> {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{selectedProduct.name}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{selectedProduct.tagline}</p>
          </div>

          {/* Price & Stock */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(selectedProduct.price)}</span>
            {selectedProduct.originalPrice && (
              <span className="text-base line-through text-slate-400 dark:text-slate-500 font-medium">
                {formatCurrency(selectedProduct.originalPrice)}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20 ml-auto">
              In Stock ({selectedProduct.stockCount} units)
            </span>
          </div>

          {/* Colors Selection */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Color Choice
              </label>
              <div className="flex items-center gap-3">
                {selectedProduct.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor === c ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/30' : 'border-slate-300 dark:border-slate-800'
                    }`}
                    style={{ backgroundColor: c }}
                  >
                    {selectedColor === c && <FiCheck className="text-white text-xs" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection */}
          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Size
              </label>
              <div className="flex items-center gap-2">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Wishlist */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-slate-900 dark:text-slate-100">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(selectedProduct.stockCount, q + 1))}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(selectedProduct)}
              className={`p-3 rounded-xl border transition-all ${
                isWishlisted
                  ? 'bg-pink-50 dark:bg-pink-500/20 text-pink-500 dark:text-pink-400 border-pink-200 dark:border-pink-500/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500 dark:fill-pink-400' : ''}`} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FiShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FiZap className="w-4 h-4" /> Buy Now
            </button>
          </div>
        </div>

        {/* Bottom Section: Tabs for Overview, Specs, Reviews */}
        <div className="lg:col-span-12 border-t border-slate-200 dark:border-slate-800 pt-6 mt-4">
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
            <button
              onClick={() => setActiveTab('desc')}
              className={`text-sm font-bold pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'desc' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-bold pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'specs' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Technical Specs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'reviews' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selectedProduct.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {selectedProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FiCheck className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(selectedProduct.specs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">{key}</span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{rev.userName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-bold">
                      <FiStar className="fill-amber-400" /> {rev.rating}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
