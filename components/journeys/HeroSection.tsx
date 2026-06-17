'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] flex flex-col justify-center items-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image 
           src="/images/123.jpeg" 
           fill
           priority
           className="object-cover brightness-75" 
           alt="Experiences at Metanoia" 
           sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 font-serif italic">Experiences at Metanoia</h1>
        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
          Curated journeys designed for rest, connection, healing, and transformation.
        </p>
      </motion.div>
    </section>
  );
}
