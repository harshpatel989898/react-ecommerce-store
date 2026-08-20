import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeConfig = {
    success: {
      icon: <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/40',
    },
    error: {
      icon: <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
      border: 'border-rose-500/40',
      bg: 'bg-rose-950/40',
    },
    warning: {
      icon: <FiAlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/40',
    },
    info: {
      icon: <FiInfo className="w-5 h-5 text-sky-400 shrink-0" />,
      border: 'border-sky-500/40',
      bg: 'bg-sky-950/40',
    },
  };

  const current = typeConfig[type];

  return (
    <div
      className={`glass-panel border p-4 rounded-xl shadow-2xl flex items-start gap-3 min-w-[280px] max-w-md animate-slideInRight ${current.border} ${current.bg}`}
    >
      {current.icon}
      <div className="flex-1 text-sm">
        {title && <h5 className="font-semibold text-slate-100 mb-0.5">{title}</h5>}
        <p className="text-slate-300 leading-snug">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};
