import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`flex flex-col divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden glass-panel ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="flex flex-col">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between p-4 text-left text-sm font-semibold text-slate-100 hover:bg-white/5 transition-colors"
            >
              <span>{item.title}</span>
              <FiChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-indigo-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 text-sm text-slate-300 animate-fadeIn">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
