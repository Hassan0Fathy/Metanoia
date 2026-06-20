'use client';

import { useState, useEffect } from 'react';
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
  fill,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset loading and error states when the src changes
  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src]);

  const currentSrc = error || !src ? fallbackSrc : src;

  // When fill is used, next/image must be a direct child of the positioned container.
  // We must NOT wrap it in another relative/overflow-hidden div.
  if (fill) {
    return (
      <>
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-stone-900 flex items-center justify-center"
            >
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Image
          src={currentSrc}
          alt={alt}
          fill={fill}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          className={`${className} transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
          {...props}
        />
      </>
    );
  }

  // Non-fill mode: use a wrapper div for sizing control
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
        src={currentSrc}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`${className} transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
}
