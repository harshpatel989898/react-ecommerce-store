import React, { useState } from 'react';
import Input, { InputProps } from './Input';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const PasswordInput: React.FC<Omit<InputProps, 'type'>> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="p-1 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
        >
          {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
        </button>
      }
      {...props}
    />
  );
};

export default PasswordInput;
