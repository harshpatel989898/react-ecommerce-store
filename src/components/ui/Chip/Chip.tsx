import React from 'react';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onSelect,
  onRemove,
  icon,
  className = '',
}) => {
  return (
    <div
      onClick={onSelect}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer select-none ${
        selected
          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
          : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
      } ${className}`}
    >
      {icon && <span className="text-slate-400">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 text-slate-400 hover:text-white transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};
