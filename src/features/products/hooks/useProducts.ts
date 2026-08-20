import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../../services/product.service';
import { Category, Product, ProductReview } from '../../../types/product.types';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: ProductService.getCategories,
  });
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: ProductService.getProducts,
  });
};

export const useProductDetail = (id: string | null) => {
  return useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: () => (id ? ProductService.getProductById(id) : Promise.resolve(undefined)),
    enabled: Boolean(id),
  });
};

export const useProductReviews = (productId: string | null) => {
  return useQuery<ProductReview[]>({
    queryKey: ['product-reviews', productId],
    queryFn: () => (productId ? ProductService.getProductReviews(productId) : Promise.resolve([])),
    enabled: Boolean(productId),
  });
};
