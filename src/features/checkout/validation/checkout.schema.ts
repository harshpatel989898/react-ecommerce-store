import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(['card', 'applepay', 'crypto', 'cod']),
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(19),
  cardHolder: z.string().min(2, 'Cardholder name is required'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Expiry must be MM/YY format'),
  cardCvv: z.string().min(3, 'CVV must be 3 or 4 digits').max(4),
});

export const checkoutFormSchema = shippingSchema.merge(paymentSchema);

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
