import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-sans transition-all duration-700 ease-[0.16, 1, 0.3, 1] focus-visible:outline-2 focus-visible:outline-offset-2 rounded-full uppercase tracking-[0.5em] font-bold text-label-xs active:scale-95';

  const variants = {
    primary: 'bg-brown text-ivory hover:bg-olive focus-visible:outline-brown shadow-luxury-soft hover:shadow-luxury-deep',
    secondary: 'bg-warmBeige text-brown hover:bg-brown hover:text-ivory focus-visible:outline-warmBeige',
    outline: 'border border-brown/20 text-brown hover:border-brown hover:bg-brown/5 focus-visible:outline-brown',
    ghost: 'text-brown/50 hover:text-brown focus-visible:outline-brown',
  };

  const sizes = {
    sm: 'px-8 py-4',
    md: 'px-14 py-6',
    lg: 'px-20 py-8 text-[12px]',
  };



  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
