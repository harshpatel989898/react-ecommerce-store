import { create } from 'zustand';
import { Product, ProductSortOption, ViewMode } from '../types/product.types';

interface UIState {
  // Product Modal State
  selectedProduct: Product | null;
  isProductModalOpen: boolean;

  // Catalog Filter State
  activeCategory: string;
  searchQuery: string;
  sortBy: ProductSortOption;
  viewMode: ViewMode;

  // Product Modal Actions
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Catalog Actions
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: ProductSortOption) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedProduct: null,
  isProductModalOpen: false,

  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  viewMode: 'grid',

  openProductModal: (product) => set({ selectedProduct: product, isProductModalOpen: true }),
  closeProductModal: () => set({ isProductModalOpen: false }),

  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setViewMode: (mode) => set({ viewMode: mode }),
  resetFilters: () => set({ activeCategory: 'all', searchQuery: '', sortBy: 'featured' }),
}));
