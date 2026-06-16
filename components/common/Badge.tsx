interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-olive text-ivory',
    secondary: 'bg-warmBeige text-brown',
    outlined: 'border border-brown/10 text-brown',
  };

  return (
    <span
      className={`inline-block px-5 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
