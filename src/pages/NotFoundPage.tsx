import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertOctagon, FiHome } from 'react-icons/fi';
import Button from '../components/common/Button/Button';
import { ROUTES } from '../config/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-3xl">
          <FiAlertOctagon />
        </div>
        <h1 className="text-4xl font-black text-slate-100">404</h1>
        <h2 className="text-lg font-bold text-slate-300">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested luxury hardware URL does not exist or has been moved.
        </p>
        <Link to={ROUTES.HOME} className="inline-block pt-2">
          <Button variant="primary" leftIcon={<FiHome />}>
            Back to Home Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
