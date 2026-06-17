'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Navigation({
  navItems,
  scrolled,
  isActive,
}: {
  navItems: { href: string; label: string }[];
  scrolled: boolean;
  isActive: (path: string) => boolean;
}) {
  const pathname = usePathname();
  
  return (
    <nav className="hidden md:flex items-center gap-10">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
            scrolled || isActive(item.href) ? 'text-brown' : 'text-ivory hover:text-brown'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
