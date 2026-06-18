'use client';

import { motion } from 'framer-motion';
import NextLink from 'next/link';
import Image from 'next/image';
import { ZONES, JOURNEY_TYPES, BRAND, EXPERIENCE_TYPES } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/imageMap';

export default function HomePage() {
  return (
    <main className="bg-ivory editorial-rhythm bg-noise">
      {/* 1. CINEMATIC HERO */}
      <section className="relative w-full h-[75vh] md:h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <Image 
             src={IMAGE_MAP.hero} 
             fill
             priority
             className="object-cover brightness-[0.65]" 
             alt="Metanoia Sanctuary Waterfront Resort" 
             sizes="100vw"
             quality={80}
          />
        </motion.div>
        
        <div className="relative z-10 text-ivory max-w-4xl px-[var(--gutter)] flex flex-col items-center">
           <motion.span 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="text-[9px] md:text-label-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block font-light"
           >
             Begin the Journey Back to Yourself
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8, duration: 1.2 }}
             className="text-display-lg md:text-display-xl mb-4 md:mb-8"
           >
             {BRAND.name}
           </motion.h1>
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2, duration: 1 }}
             className="text-base md:text-xl font-serif italic mb-8 md:mb-12 opacity-90 px-4"
           >
             A Sanctuary Designed For Human Renewal
           </motion.p>

           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.5, duration: 1 }}
           >
             <NextLink 
                href="/journeys" 
                className="group inline-flex items-center gap-4 md:gap-6 px-8 py-3 md:px-10 md:py-4 border border-ivory/50 rounded-full hover:bg-ivory hover:text-brown transition-all duration-700 ease-out hover:-translate-y-1"
             >
                <span className="text-[9px] md:text-label-xs font-bold uppercase tracking-[0.3em]">Begin Journey</span>
                <span className="transform transition-transform duration-700 group-hover:translate-x-2">→</span>
             </NextLink>
           </motion.div>
        </div>
      </section>

      {/* 2. SANCTUARY PREVIEW (ZONES) */}
      <section className="container-luxury py-12 md:py-24 space-y-16 md:space-y-32">
         {ZONES.slice(0, 2).map((zone, i) => (
           <div key={zone.id} className={`flex flex-col lg:flex-row items-center gap-8 md:gap-[8vw] ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="relative w-full lg:w-1/2 group">
                 <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden image-reveal shadow-luxury">
                    <Image 
                      src={zone.image || IMAGE_MAP.fallback} 
                      alt={zone.name} 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                 </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                 <span className="text-[10px] md:text-label-xs text-olive font-bold uppercase tracking-[0.5em] block">
                   0{i + 1} — {zone.id}
                 </span>
                 <h2 className="text-display-md text-brown leading-none">{zone.name}</h2>
                 <p className="text-body-md md:text-body-lg text-warmBeige font-light italic leading-relaxed">
                   {zone.description}
                 </p>
                 <ul className="grid grid-cols-2 gap-2 pt-4 border-t border-brown/10">
                    {zone.facilities.map(f => (
                      <li key={f} className="text-[8px] md:text-[10px] uppercase tracking-widest text-brown/60 flex items-center gap-2">
                         <span className="w-1 h-1 rounded-full bg-olive/30" />
                         {f}
                      </li>
                    ))}
                 </ul>
                 <div className="pt-2 md:pt-4">
                    <NextLink href="/sanctuary" className="inline-block text-[10px] md:text-label-xs text-brown font-bold uppercase tracking-[0.4em] border-b border-brown/20 pb-1 hover:border-brown transition-all">
                       Explore Architecture
                    </NextLink>
                 </div>
              </div>
           </div>
         ))}
      </section>

      {/* 3. EXPERIENCES */}
      <section className="bg-softBeige py-12 md:py-24">
         <div className="container-luxury">
            <div className="text-center mb-10 md:mb-16">
               <span className="text-[10px] md:text-label-xs text-olive font-bold uppercase tracking-[0.5em] mb-3 block">Immersive Depth</span>
               <h2 className="text-display-md text-brown">Refined Experiences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
               {Object.values(EXPERIENCE_TYPES).map((exp, idx) => (
                 <div key={exp.id} className="p-6 md:p-10 border border-brown/10 flex flex-col items-center text-center space-y-4 hover:bg-ivory/50 transition-colors">
                    <span className="text-brown/30 text-2xl font-serif">0{idx + 1}</span>
                    <h3 className="text-headline-sm text-brown uppercase tracking-widest">{exp.name}</h3>
                    <div className="w-8 h-px bg-olive/30" />
                    <span className="text-[10px] uppercase tracking-widest text-olive font-bold">{exp.duration}</span>
                    <p className="text-body-sm text-warmBeige font-light">{exp.description}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. JOURNEYS */}
      <section className="container-luxury py-12 md:py-24">
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-4">
            <div className="max-w-xl">
               <span className="text-[10px] md:text-label-xs text-olive font-bold uppercase tracking-[0.5em] mb-3 block">Your Path</span>
               <h2 className="text-display-md text-brown leading-none">Curated Journeys</h2>
            </div>
            <p className="max-w-xs text-warmBeige italic text-sm">
              Each path is meticulously choreographed for restoration.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {Object.values(JOURNEY_TYPES).map((journey) => (
              <NextLink key={journey.id} href={`/experiences?journey=${journey.id}`} className="group space-y-4 md:space-y-6 block">
                 <div className="aspect-[3/4] overflow-hidden relative shadow-luxury">
                    <Image 
                      src={IMAGE_MAP.journeys[journey.id as keyof typeof IMAGE_MAP.journeys] || IMAGE_MAP.fallback} 
                      alt={journey.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
                    />
                    <div className="absolute inset-0 bg-brown/10 group-hover:bg-transparent transition-colors duration-700" />
                 </div>
                 <div className="space-y-2 md:space-y-3">
                    <h3 className="text-xl md:text-headline-sm text-brown group-hover:italic transition-all leading-tight">{journey.title}</h3>
                    <p className="text-warmBeige font-light text-xs tracking-wide leading-relaxed">
                       {journey.description}
                    </p>
                    <span className="inline-block text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-olive border-b border-olive/20 pb-1 group-hover:border-olive transition-all">
                       Explore {journey.subtitle}
                    </span>
                 </div>
              </NextLink>
            ))}
         </div>
      </section>

      {/* 5. RESERVATION CTA */}
      <section className="bg-brown py-12 md:py-24 text-center">
         <div className="container-luxury max-w-3xl space-y-6 md:space-y-12">
            <span className="text-[10px] md:text-label-xs text-ivory/60 uppercase tracking-[0.8em]">Finality of Intent</span>
            <h2 className="text-display-lg text-ivory leading-tight">The sanctuary awaits.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-10">
               <NextLink href="/reservation" className="w-full sm:w-auto px-10 py-4 md:px-16 md:py-6 bg-ivory text-brown rounded-full text-[10px] md:text-label-xs font-bold uppercase tracking-[0.5em] hover:bg-softBeige transition-all shadow-xl shadow-black/10">
                  Secure Reservation
               </NextLink>
               <NextLink href="/sanctuary" className="text-[10px] md:text-label-xs text-ivory font-bold uppercase tracking-[0.4em] hover:opacity-60 transition-opacity">
                  View Seasonal Brochure
               </NextLink>
            </div>
         </div>
      </section>
    </main>
  );
}
