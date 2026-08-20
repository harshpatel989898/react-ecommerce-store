export interface ProductVariant {
  name: string;
  colorHex?: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export type ProductBadge = 'HOT' | 'NEW' | 'SALE' | 'LIMITED';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  colors?: string[];
  sizes?: string[];
  badge?: ProductBadge;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  accentColor: string;
}

export type ProductSortOption = 'featured' | 'rating' | 'price-low' | 'price-high' | 'discount';
export type ViewMode = 'grid' | 'list';
