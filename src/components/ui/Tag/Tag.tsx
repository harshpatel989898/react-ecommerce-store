import React from 'react';

export interface TagProps {
  label: string;
  color?: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, color = 'indigo', className = '' }) => {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 ${className}`}
    >
      #{label}
    </span>
  );
};
