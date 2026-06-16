'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  ctas?: {
    text: string;
    href: string;
    variant?: 'primary' | 'outline';
  }[];
}

export function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  overlayOpacity = 0.25,
  ctas,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden bg-brown"
    >
      {/* 1. IMMERSIVE LAYERED BACKGROUND */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear"
          style={{ backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'url("/images/hero-render.jpg")' }}
        />
        {/* Cinematic Vignette & Depth Gradients */}
        <div 
          className="absolute inset-0 bg-black/50" 
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-ivory" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
      </motion.div>

      {/* 2. TEXTURE OVERLAY */}
      <div className="noise-overlay" />

      {/* 3. EDITORIAL CONTENT LAYER */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container-gutter text-center max-w-[1600px]"
      >
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <span className="text-label-xs md:text-label-sm text-ivory/80 uppercase font-bold tracking-[1em] ml-[1em]">
              {subtitle}
            </span>
          </motion.div>
        )}

        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-xl md:text-display-2xl font-serif text-ivory leading-[0.75] tracking-tighter text-balance"
          >
            {title}
          </motion.h1>
        </div>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 2.5, delay: 1.5 }}
            className="text-body-xl text-ivory/90 mb-16 md:mb-24 max-w-4xl mx-auto font-light leading-relaxed italic text-balance"
          >
            {description}
          </motion.p>
        )}

        {ctas && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center"
          >
            {ctas.map((cta, index) => (
              <Link key={index} href={cta.href} className="w-full md:w-auto">
                <button 
                  className={`w-full md:min-w-[320px] px-16 py-8 rounded-full text-label-xs uppercase tracking-[0.6em] font-bold transition-all duration-700 active:scale-95 ${
                    cta.variant === 'outline' 
                    ? 'border border-ivory/30 text-ivory hover:bg-ivory hover:text-brown backdrop-blur-md' 
                    : 'bg-ivory text-brown hover:bg-warmBeige shadow-luxury-deep'
                  }`}
                >
                  {cta.text}
                </button>
              </Link>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* 4. CINEMATIC SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-10"
      >
        <div className="flex flex-col items-center gap-6">
           <span className="text-[9px] uppercase tracking-[1.2em] text-ivory/30 font-bold -rotate-90 origin-center translate-y-[-50px]">Breath</span>
           <div className="w-[1px] h-48 bg-gradient-to-b from-ivory/40 via-ivory/5 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
