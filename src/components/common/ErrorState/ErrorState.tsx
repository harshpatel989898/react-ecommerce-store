import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Button } from '../../ui/Button/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading data. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-rose-500/20 bg-rose-950/10 my-4 ${className}`}>
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-4">
        <FiAlertTriangle className="w-10 h-10 text-rose-400" />
      </div>
      <h4 className="text-lg font-bold text-slate-100 mb-1">{title}</h4>
      <p className="text-sm text-slate-400 max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" size="md" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
