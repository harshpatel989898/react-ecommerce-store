import React from 'react';
import { Loader } from '../Loader/Loader';

export interface LoadingOverlayProps {
  active: boolean;
  text?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ active, text }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[1600] bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 animate-fadeIn">
      <Loader size="xl" variant="primary" />
      {text && <p className="text-sm font-semibold text-slate-200">{text}</p>}
    </div>
  );
};
