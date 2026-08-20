import { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
  minSpend?: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  cardLast4?: string;
  orderDate: string;
  status: OrderStatus;
}
