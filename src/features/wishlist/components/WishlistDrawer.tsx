import React from 'react';
import { FiTrash2, FiShoppingBag, FiHeart } from 'react-icons/fi';
import Drawer from '../../../components/common/Drawer/Drawer';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { useCartStore } from '../../../store/useCartStore';
import { formatCurrency } from '../../../utils/helpers';
import EmptyState from '../../../components/common/EmptyState/EmptyState';

export const WishlistDrawer: React.FC = () => {
  const { items, isDrawerOpen, closeDrawer, removeItem } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addToCart(product);
    removeItem(product.id);
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title="Saved Favorites ❤️"
      subtitle={`${items.length} items saved for later`}
    >
      <div className="flex flex-col h-full justify-between">
        {items.length === 0 ? (
          <EmptyState
            icon={<FiHeart className="w-12 h-12 text-slate-400 dark:text-slate-600" />}
            title="Wishlist is Empty"
            description="Explore our hardware catalog and save items you want to keep track of."
            actionText="Explore Items"
            onAction={closeDrawer}
          />
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
            {items.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">{product.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{product.tagline}</p>
                  <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-1">{formatCurrency(product.price)}</p>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                    title="Move to Cart"
                  >
                    <FiShoppingBag className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/40 transition-colors cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default WishlistDrawer;
