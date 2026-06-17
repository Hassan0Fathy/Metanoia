'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Navigation } from './Navigation';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/sanctuary', label: 'Sanctuary' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/journeys', label: 'Journeys' },
    { href: '/shop', label: 'Organic Shop' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-6">
      <div 
        className={`mx-auto max-w-[1800px] h-[80px] flex items-center justify-between px-8 rounded-full border border-ivory/20 transition-all duration-700 ${
          scrolled 
            ? 'bg-ivory/80 backdrop-blur-xl shadow-lg' 
            : 'bg-transparent backdrop-blur-none border-transparent'
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="font-serif text-2xl tracking-[0.2em] text-brown uppercase">
          Metanoia
        </Link>

        {/* Center: Nav */}
        <Suspense fallback={<div className="hidden md:flex items-center gap-10" />}>
           <Navigation navItems={navItems} scrolled={scrolled} isActive={isActive} />
        </Suspense>

        {/* Right: Reserve */}
        <Link
          href="/reservation"
          className={`hidden md:flex items-center px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            scrolled ? 'bg-brown text-ivory hover:bg-olive' : 'bg-ivory/20 text-ivory backdrop-blur-sm hover:bg-ivory/40 hover:text-brown'
          }`}
        >
          Reserve
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`md:hidden p-2 ${scrolled ? 'text-brown' : 'text-ivory'}`}
          aria-label="Toggle Navigation"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-ivory flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-4 text-brown"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-4xl font-serif text-brown uppercase tracking-[0.1em]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/reservation"
                className="mt-8 px-12 py-4 bg-brown text-ivory rounded-full text-sm font-bold uppercase tracking-[0.2em]"
                onClick={() => setIsMenuOpen(false)}
              >
                Reserve
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
