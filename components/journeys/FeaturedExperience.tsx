'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedExperience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden p-1 bg-stone-200"
        >
          {/* Parallax Image */}
          <motion.div style={{ y }} className="absolute inset-0 z-0">
             <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCghPpA7AnlOC304erfqtYwd_OjgnkVlUyxmj6ICxHQVQNMGpvYYEkbTLv8g6SCahV-VAsWBUkrWqMJg65-2sEkNyiCUTVDB5dhwn8EvHtRM891T1PPzq0IB_Gfs1M7IaGgfxJb3bT5u8m42EUI4Vty06saqqsF2P9VUgU5HoMIfOgiWbW5qULTl-kNuIw4zVbK_v_M0tLcuvIKs0qXZPciYIO3GXqcwxLWhio4rlMqY-PSKowNBLgtbsKKmk3ikGZmOV4cR6bizKsN"
                alt="The Metanoia Journey"
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Card */}
          <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-[30px] p-12 md:p-20 text-center max-w-2xl mx-auto my-12 md:my-20">
             <h3 className="text-4xl md:text-5xl font-serif text-brown mb-6">The Metanoia Journey</h3>
             <p className="text-stone-600 font-light text-lg mb-10 leading-relaxed">
               An immersive 7-day transformative experience designed to recalibrate your mind, body, and spirit in the heart of our sanctuary.
             </p>
             <Link href="/reservation" className="inline-block bg-brown text-white px-12 py-5 rounded-full font-medium hover:bg-olive transition-colors">
               Explore the Metanoia Journey
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
