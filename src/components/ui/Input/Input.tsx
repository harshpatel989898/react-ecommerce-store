import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      leftIcon,
      rightIcon,
      sizeVariant = 'md',
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const effectiveStartIcon = startIcon || leftIcon;
    const effectiveEndIcon = endIcon || rightIcon;

    const sizeStyles = {
      sm: 'py-1.5 text-xs',
      md: 'py-2.5 text-sm',
      lg: 'py-3.5 text-base',
    };

    const paddingLeft = effectiveStartIcon ? 'pl-10' : 'pl-3.5';
    const paddingRight = effectiveEndIcon ? 'pr-10' : 'pr-3.5';

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {effectiveStartIcon && (
            <div className="absolute left-3 flex items-center justify-center text-slate-400 pointer-events-none">
              {effectiveStartIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`w-full rounded-xl bg-slate-50 dark:bg-slate-900/80 border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/50'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500'
            } ${paddingLeft} ${paddingRight} ${sizeStyles[sizeVariant]} ${className}`}
            {...props}
          />
          {effectiveEndIcon && (
            <div className="absolute right-3 flex items-center justify-center text-slate-400">
              {effectiveEndIcon}
            </div>
          )}
        </div>
        {error ? (
          <span className="text-xs font-medium text-rose-500 dark:text-rose-400 animate-fadeIn">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
