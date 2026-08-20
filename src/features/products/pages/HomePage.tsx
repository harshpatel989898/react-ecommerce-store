import React, { useMemo } from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoryPills from '../components/CategoryPills';
import ProductCard from '../components/ProductCard';
import { useUIStore } from '../../../store/useUIStore';
import { ProductService } from '../../../services/product.service';
import { ProductSortOption } from '../../../types/product.types';
import { FiGrid, FiList, FiSearch, FiSliders } from 'react-icons/fi';
import EmptyState from '../../../components/common/EmptyState/EmptyState';

export const HomePage: React.FC = () => {
  const {
    activeCategory,
    searchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters,
  } = useUIStore();

  const categories = ProductService.MOCK_CATEGORIES;
  const products = ProductService.MOCK_PRODUCTS;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search Query Filter
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting Logic
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div>
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Main Catalog Area */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Catalog Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Explore Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Showing <span className="text-indigo-600 dark:text-indigo-400 font-bold">{filteredProducts.length}</span> precision-engineered hardware items
            </p>
          </div>

          {/* Controls: Sort Dropdown & Grid/List View Switcher */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <FiSliders className="absolute left-3 w-4 h-4 text-indigo-600 dark:text-indigo-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as ProductSortOption)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none shadow-sm"
              >
                <option value="featured">Sort: Featured Picks</option>
                <option value="rating">Sort: Top Customer Ratings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Grid View"
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="List View"
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <CategoryPills categories={categories} />

        {/* Product Grid / List Rendering */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mt-6'
                : 'flex flex-col gap-4 mt-6'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FiSearch className="w-12 h-12 text-slate-500" />}
            title="No Products Matched Your Search"
            description="Try searching for 'headphones', 'titanium', 'gaming' or reset your active filters."
            actionText="Reset All Filters"
            onAction={resetFilters}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;
