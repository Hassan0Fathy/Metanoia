'use client';

import { useState, useRef, useEffect } from 'react';
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
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset loading and error states when the src changes
  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // If the image has already loaded (e.g. from browser cache)
    if (img.complete) {
      setLoading(false);
      return;
    }

    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = () => {
      setError(true);
      setLoading(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, error]); // Re-run when src or error state changes to handle fallbacks

  return (
    <div className={`relative overflow-hidden ${props.fill ? 'w-full h-full' : ''} ${containerClassName}`}>
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
        ref={imgRef}
        src={error || !src ? fallbackSrc : src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
      
      {/* Subtle overlay for better text contrast if needed by parent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

