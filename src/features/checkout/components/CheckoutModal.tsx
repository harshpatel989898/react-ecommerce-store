import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, CheckoutFormData } from '../validation/checkout.schema';
import { useCartStore } from '../../../store/useCartStore';
import { useToastStore } from '../../../store/useToastStore';
import Modal from '../../../components/common/Modal/Modal';
import { formatCurrency, maskCardNumber } from '../../../utils/helpers';
import { OrderDetails } from '../../../types/cart.types';
import { FiCheckCircle, FiCreditCard, FiLock, FiArrowRight, FiRotateCw } from 'react-icons/fi';
import { Input } from '../../../components/ui/Input/Input';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTaxAmount,
    getTotalAmount,
    setLastOrder,
    clearCart,
  } = useCartStore();

  const { success } = useToastStore();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@auratech.io',
      phone: '+1 (555) 389-2049',
      address: '742 Evergreen Terrace, Suite 400',
      city: 'San Francisco',
      postalCode: '94107',
      country: 'United States',
      paymentMethod: 'card',
      cardNumber: '4532 8920 4109 8832',
      cardHolder: 'ALEX MORGAN',
      cardExpiry: '08/28',
      cardCvv: '842',
    },
  });

  const formValues = watch();

  const handleNextToPayment = () => {
    if (!formValues.fullName || !formValues.email || !formValues.address || !formValues.city || !formValues.postalCode) {
      useToastStore.getState().error('Missing Fields', 'Please fill in all shipping fields correctly.');
      return;
    }
    setCurrentStep(2);
  };

  const onSubmitOrder = (data: CheckoutFormData) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const order: OrderDetails = {
        orderId: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        subtotal: getSubtotal(),
        discount: getDiscountAmount(),
        shipping: getShippingFee(),
        tax: getTaxAmount(),
        total: getTotalAmount(),
        shippingAddress: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod === 'card' ? 'Credit Card (Visa)' : data.paymentMethod.toUpperCase(),
        cardLast4: data.cardNumber.slice(-4),
        orderDate: new Date().toISOString(),
        status: 'Confirmed',
      };

      setConfirmedOrder(order);
      setLastOrder(order);
      clearCart();
      setCurrentStep(3);
      success('Order Placed Successfully! 🎉', 'Your luxury hardware package is being prepared for dispatch.');
    }, 1800);
  };

  return (
    <Modal isOpen={isCheckoutOpen} onClose={closeCheckout} maxWidth="3xl">
      {/* Checkout Step Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center font-bold">
            <FiLock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Secure Checkout</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">256-Bit SSL Encrypted Transaction</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className={`px-3 py-1 rounded-full ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            1. Shipping
          </span>
          <span className="text-slate-400 dark:text-slate-600">→</span>
          <span className={`px-3 py-1 rounded-full ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            2. Payment
          </span>
          <span className="text-slate-400 dark:text-slate-600">→</span>
          <span className={`px-3 py-1 rounded-full ${currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            3. Done
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmitOrder)}>
        {/* Step 1: Shipping Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
              <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} />
              <Input label="Street Address" {...register('address')} error={errors.address?.message} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="City" {...register('city')} error={errors.city?.message} />
              <Input label="Postal Code" {...register('postalCode')} error={errors.postalCode?.message} />
              <Input label="Country" {...register('country')} error={errors.country?.message} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Order Total: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">{formatCurrency(getTotalAmount())}</span>
              </div>
              <button
                type="button"
                onClick={handleNextToPayment}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Continue to Payment <FiArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interactive 3D Card & Payment */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Interactive Card Preview */}
            <div className="relative w-full max-w-sm mx-auto h-48 rounded-2xl p-6 bg-gradient-to-tr from-indigo-900 via-slate-900 to-pink-900 border border-slate-700 shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center z-10">
                <FiCreditCard className="w-8 h-8 text-indigo-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">VISA</span>
              </div>
              <div className="z-10">
                <p className="text-lg font-mono font-extrabold tracking-widest text-white">
                  {maskCardNumber(formValues.cardNumber || '')}
                </p>
              </div>
              <div className="flex justify-between items-end z-10 text-xs text-slate-300">
                <div>
                  <span className="text-[9px] uppercase tracking-wider block text-slate-400">Card Holder</span>
                  <span className="font-bold tracking-wider">{formValues.cardHolder || 'CARD HOLDER'}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider block text-slate-400">Expires</span>
                  <span className="font-bold font-mono">{formValues.cardExpiry || 'MM/YY'}</span>
                </div>
              </div>
            </div>

            {/* Payment Fields */}
            <div className="space-y-4">
              <Input label="Card Number" {...register('cardNumber')} error={errors.cardNumber?.message} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Cardholder Name" {...register('cardHolder')} error={errors.cardHolder?.message} />
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Expiry (MM/YY)" {...register('cardExpiry')} error={errors.cardExpiry?.message} />
                  <Input label="CVV" {...register('cardCvv')} error={errors.cardCvv?.message} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
              >
                Back to Shipping
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                {isProcessing ? <FiRotateCw className="animate-spin w-4 h-4" /> : <FiLock className="w-4 h-4" />}
                {isProcessing ? 'Authorizing Payment...' : `Pay ${formatCurrency(getTotalAmount())}`}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {currentStep === 3 && confirmedOrder && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl shadow-xl shadow-emerald-500/20">
              <FiCheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Confirmed!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Thank you for shopping at AuraStore. Your order ID is{' '}
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{confirmedOrder.orderId}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping To</span>
                <span className="font-semibold text-slate-200">{confirmedOrder.shippingAddress.fullName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Items Count</span>
                <span className="font-semibold text-slate-200">{confirmedOrder.items.length} items</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Paid</span>
                <span className="font-bold text-emerald-400">{formatCurrency(confirmedOrder.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCheckout}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer mt-4"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default CheckoutModal;
