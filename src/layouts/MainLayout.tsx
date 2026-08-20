import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Header/Navbar';
import { Footer } from '../components/layout/Footer/Footer';
import { BottomNav } from '../components/layout/Navigation/BottomNav';
import { ToastContainer } from '../components/common/Toast/ToastContainer';
import { CartDrawer } from '../features/cart/components/CartDrawer';
import { WishlistDrawer } from '../features/wishlist/components/WishlistDrawer';
import { ProductModal } from '../features/products/components/ProductModal';
import { CheckoutModal } from '../features/checkout/components/CheckoutModal';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-300 relative pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 pt-16 sm:pt-20">{children || <Outlet />}</main>
      <Footer />

      {/* Mobile Bottom Quick Navigation Bar */}
      <BottomNav />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductModal />
      <CheckoutModal />

      {/* Global Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
