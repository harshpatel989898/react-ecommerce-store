import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTag, FiArrowRight, FiTruck } from 'react-icons/fi';
import Drawer from '../../../components/common/Drawer/Drawer';
import { useCartStore } from '../../../store/useCartStore';
import { formatCurrency } from '../../../utils/helpers';
import { APP_CONSTANTS } from '../../../constants/app.constants';
import EmptyState from '../../../components/common/EmptyState/EmptyState';

export const CartDrawer: React.FC = () => {
  const [couponInput, setCouponInput] = useState('');
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    activeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTaxAmount,
    getTotalAmount,
    openCheckout,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getTaxAmount();
  const total = getTotalAmount();

  const FREE_SHIPPING_THRESHOLD = APP_CONSTANTS.FREE_SHIPPING_THRESHOLD;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      if (applyCoupon(couponInput)) {
        setCouponInput('');
      }
    }
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title="Shopping Cart 🛒"
      subtitle={`${items.length} unique items in order`}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        {/* Free Shipping Progress Indicator */}
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-xs">
          <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 mb-1.5 font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <FiTruck className="w-4 h-4" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">You Unlocked Free Shipping! 🎉</span>
              ) : (
                `Add ${formatCurrency(remainingForFreeShipping)} for FREE Shipping`
              )}
            </span>
            <span className="font-mono text-slate-500 dark:text-slate-400">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {items.length === 0 ? (
          <EmptyState
            icon={<FiShoppingBag className="w-12 h-12 text-slate-400 dark:text-slate-600" />}
            title="Your Cart is Empty"
            description="Explore our high-performance hardware catalog and add your favorite tech items."
            actionText="Start Shopping"
            onAction={closeDrawer}
          />
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}_${item.selectedColor}_${item.selectedSize}_${idx}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">{item.product.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.selectedColor && (
                      <span className="flex items-center gap-1">
                        Color:
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300 dark:border-slate-700"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                      </span>
                    )}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>
                  <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-1">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 p-1 transition-colors"
                    title="Remove item"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-1 py-0.5">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)
                      }
                      className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <FiMinus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-900 dark:text-slate-100">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)
                      }
                      className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <FiPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Promo Coupon Form */}
        {items.length > 0 && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {activeCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <FiTag /> Coupon {activeCoupon.code} ({activeCoupon.discountPercentage}% OFF)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-rose-500 hover:underline font-semibold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (AURA20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {shipping === 0 ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span> : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount</span>
                <span className="text-indigo-600 dark:text-indigo-400 text-base">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={openCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Proceed to Checkout <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
