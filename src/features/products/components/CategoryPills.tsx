import React from 'react';
import { Category } from '../../../types/product.types';
import { useUIStore } from '../../../store/useUIStore';

export interface CategoryPillsProps {
  categories: Category[];
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ categories }) => {
  const { activeCategory, setActiveCategory } = useUIStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar-none pb-2 my-4 sm:my-6 touch-pan-x">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer select-none shrink-0 ${
              isActive
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {cat.itemCount}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryPills;
