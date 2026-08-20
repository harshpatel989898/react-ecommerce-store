import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', disabled, id, ...props }, ref) => {
    const checkboxId = id || (typeof label === 'string' ? `cb-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={checkboxId} className={`inline-flex items-center gap-2.5 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={`w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all ${className}`}
            {...props}
          />
          {label && <span className="text-sm font-medium text-slate-200 select-none">{label}</span>}
        </label>
        {error && <span className="text-xs font-medium text-rose-400">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
