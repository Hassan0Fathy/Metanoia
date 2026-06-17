'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
  containerClassName?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = '/images/123.jpeg', 
  containerClassName = '',
  className = '',
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-stone-100 animate-pulse flex items-center justify-center"
          >
            <div className="w-8 h-8 border-2 border-brown/20 border-t-brown rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        {...props}
      />
      
      {/* Subtle overlay for better text contrast if needed by parent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
