import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-xs text-slate-400 ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <FiChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-indigo-400 transition-colors font-medium">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-slate-100 font-semibold truncate' : 'font-medium'}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
