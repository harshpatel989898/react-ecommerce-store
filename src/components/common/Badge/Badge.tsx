import React from 'react';
import { cn } from '../../../utils/helpers';
import { ProductBadge } from '../../../types/product.types';

export interface BadgeProps {
  variant?: ProductBadge | 'default' | 'success' | 'warning' | 'info' | 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const styles: Record<string, string> = {
    HOT: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    NEW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    SALE: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    LIMITED: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
    secondary: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border',
        styles[variant] || styles.default,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
