import { checkoutFormSchema, shippingSchema, paymentSchema } from '../features/checkout/validation/checkout.schema';

export const validators = {
  checkoutForm: checkoutFormSchema,
  shipping: shippingSchema,
  payment: paymentSchema,
};
