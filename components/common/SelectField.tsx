import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  required?: boolean;
}

export function SelectField({
  label,
  options,
  error,
  required = false,
  className = '',
  ...props
}: SelectFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] uppercase tracking-[0.2em] text-brown/60 mb-2 font-bold">
          {label}
          {required && <span className="text-olive ml-1">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border-b border-brown/20 bg-transparent text-brown focus:outline-none focus:border-olive transition-all duration-500 ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-olive text-body-md mt-2 italic">{error}</p>}
    </div>
  );
}
