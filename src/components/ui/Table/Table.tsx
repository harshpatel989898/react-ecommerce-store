import React from 'react';
import { Loader } from '../Loader/Loader';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  rowKey?: (row: T, index: number) => string | number;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyState = 'No data available',
  rowKey,
  className = '',
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto custom-scrollbar border border-slate-800 rounded-2xl glass-panel ${className}`}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider text-xs">
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3.5 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-200">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                <Loader size="lg" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const key = rowKey ? rowKey(row, index) : index;
              return (
                <tr key={key} className="hover:bg-white/5 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 ${col.className || ''}`}>
                      {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
