import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiHome } from 'react-icons/fi';
import Button from '../components/common/Button/Button';
import { ROUTES } from '../config/routes';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto text-3xl">
          <FiLock />
        </div>
        <h1 className="text-3xl font-black text-slate-100">401 Access Denied</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          You do not have permission to access this resource. Please log in with valid credentials.
        </p>
        <Link to={ROUTES.HOME} className="inline-block pt-2">
          <Button variant="primary" leftIcon={<FiHome />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
