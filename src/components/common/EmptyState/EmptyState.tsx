import React from 'react';
import { FiInbox } from 'react-icons/fi';
import { Button } from '../../ui/Button/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'There are currently no items to display.',
  icon = <FiInbox className="w-12 h-12 text-slate-500" />,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-slate-800 my-4 ${className}`}>
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-4 shadow-inner">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-100 mb-1">{title}</h4>
      <p className="text-sm text-slate-400 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
