import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export function InputField({
  label,
  error,
  required = false,
  className = '',
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] uppercase tracking-[0.2em] text-brown/60 mb-2 font-bold">
          {label}
          {required && <span className="text-olive ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-b border-brown/20 bg-transparent text-brown placeholder-brown/30 focus:outline-none focus:border-olive transition-all duration-500 ${className}`}
        {...props}
      />
      {error && <p className="text-olive text-body-md mt-2 italic">{error}</p>}
    </div>
  );
}
