import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'outlined' | 'filled';
  hover?: boolean;
}

export function Card({
  children,
  className = '',
  variant = 'elevated',
  hover = true,
}: CardProps) {
  const variants = {
    elevated: 'bg-white shadow-luxury',
    outlined: 'bg-transparent border border-brown/10',
    filled: 'bg-softBeige shadow-luxury-soft',
    glass: 'luxury-glass shadow-glass',
  };

  const hoverClass = hover ? 'hover:shadow-luxury-deep hover:-translate-y-2 transition-all duration-700 ease-[0.16, 1, 0.3, 1]' : '';

  return (
    <div className={`p-10 rounded-xs ${variants[variant] || variants.elevated} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
