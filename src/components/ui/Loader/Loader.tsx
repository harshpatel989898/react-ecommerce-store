import React from 'react';

export interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'white' | 'slate';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  const variantMap = {
    primary: 'border-indigo-500/30 border-t-indigo-500',
    white: 'border-white/30 border-t-white',
    slate: 'border-slate-600/30 border-t-slate-300',
  };

  return (
    <div
      role="status"
      aria-label="loading"
      className={`inline-block animate-spin rounded-full ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
