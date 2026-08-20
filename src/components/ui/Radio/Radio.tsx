import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', disabled, id, ...props }, ref) => {
    const radioId = id || (typeof label === 'string' ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <label htmlFor={radioId} className={`inline-flex items-center gap-2.5 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input
          id={radioId}
          ref={ref}
          type="radio"
          disabled={disabled}
          className={`w-4 h-4 border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all ${className}`}
          {...props}
        />
        {label && <span className="text-sm font-medium text-slate-200 select-none">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
