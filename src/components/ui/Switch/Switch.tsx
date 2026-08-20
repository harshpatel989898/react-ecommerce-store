import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: { track: 'w-8 h-4.5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-3.5' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7.5', thumb: 'w-6.5 h-6.5', translate: 'translate-x-6.5' },
  };

  const currentSize = sizeMap[size];

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`${currentSize.track} rounded-full transition-colors duration-200 ease-in-out ${
            checked ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
          }`}
        />
        <div
          className={`absolute left-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md ${
            currentSize.thumb
          } ${checked ? currentSize.translate : 'translate-x-0'}`}
        />
      </div>
      {label && <span className="text-sm font-medium text-slate-200 select-none">{label}</span>}
    </label>
  );
};
