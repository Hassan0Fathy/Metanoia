'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ivory border-t border-brown/10 z-10">
      <div className="noise-overlay opacity-[0.01]" />
      
      <div className="container-gutter py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-16">
          
          {/* 1. BRAND STORY */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-serif text-brown tracking-[0.6em] uppercase block">Metanoia</span>
            </Link>
            <p className="text-body-lg text-brown leading-relaxed italic font-light max-w-sm">
              A curated architectural sanctuary designed for the fundamental transformation of the human spirit.
            </p>
            <div className="flex gap-8">
               {[
                 { icon: Instagram, label: 'Instagram' },
                 { icon: Youtube, label: 'Journal' },
                 { icon: Linkedin, label: 'Connection' }
               ].map((social, i) => (
                 <a key={i} href="#" className="text-brown/50 hover:text-olive transition-all transform hover:scale-110">
                    <social.icon size={20} strokeWidth={1} />
                 </a>
               ))}
            </div>
          </div>

          {/* 2. EXPLORATION */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-label-xs text-olive font-bold uppercase tracking-[0.6em] ml-[0.6em]">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: 'Architecture', href: '/sanctuary' },
                { label: 'Pathways', href: '/journeys' },
                { label: 'Atmosphere', href: '/' },
                { label: 'Reservation', href: '/reservation' }
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="text-body-md text-brown/60 hover:text-brown transition-all font-medium inline-block hover:translate-x-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. THE ESTATE */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-label-xs text-olive font-bold uppercase tracking-[0.6em] ml-[0.6em]">The Estate</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-brown/10 mt-1">
                   <Phone size={12} className="text-gold" />
                </div>
                <span className="text-body-md text-brown/60 font-medium tracking-wide">+1 (800) METANOIA</span>
              </li>
              <li className="flex items-start gap-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-brown/10 mt-1">
                   <Mail size={12} className="text-gold" />
                </div>
                <span className="text-body-md text-brown/60 font-medium tracking-wide">concierge@metanoia.com</span>
              </li>
              <li className="flex items-start gap-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-brown/10 mt-1">
                   <MapPin size={12} className="text-gold" />
                </div>
                <span className="text-body-md text-brown/60 font-medium leading-relaxed max-w-[240px]">
                  Private Coastal Estate,<br />Big Sur, California
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. LEGAL & COPYRIGHT */}
        <div className="pt-12 border-t border-brown/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex gap-16">
               {['Privacy', 'Terms', 'Estates'].map((item) => (
                 <a key={item} href="#" className="text-[10px] text-brown/40 font-bold uppercase tracking-[0.6em] hover:text-brown transition-colors ml-[0.6em]">
                   {item}
                 </a>
               ))}
            </div>
            <p className="text-[10px] text-brown/40 font-bold uppercase tracking-[0.6em] ml-[0.6em]">
              © {currentYear} METANOIA Sanctuary · All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
