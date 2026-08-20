import React from 'react';
import Input, { InputProps } from './Input';
import { FiSearch, FiX } from 'react-icons/fi';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onClear, ...props }) => {
  return (
    <Input
      leftIcon={<FiSearch className="w-4 h-4 text-indigo-400" />}
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={onClear}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Clear search"
          >
            <FiX className="w-4 h-4" />
          </button>
        ) : undefined
      }
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default SearchInput;
