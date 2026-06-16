'use client';

import { motion } from 'framer-motion';
import { JOURNEY_TYPES } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';

export default function JourneysPage() {
  const searchParams = useSearchParams();
  const currentJourney = searchParams.get('journey');

  return (
    <main className="bg-ivory bg-noise editorial-rhythm">
      {/* 1. CINEMATIC HERO */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiIhGT7xd5wBYOt2PNQp6dgxuQR7w_HahWCXFy880EOUm325ty20ixrpOyVCTMSYu-GnsgsStykWovZ7wilrEh3oI52EjgK-WkRDeRxHksqDQ2w3Vb9-2UIeHWWDg0frN6-Rn3HBlZVX2MArz1vsRVupIaMuzHvcT9D8eNH3G8cJdTjxPAp8WXfmm3gmoF7xXm0u-CUk4S5ENPqoiYMioBZXctcCl4NEiFXWPBUCtd_zKzv27gQGcTJCX_fiRpgV7FOdIDofXoSLpE" 
             fill
             priority
             className="object-cover brightness-75 grayscale-[0.1]" 
             alt="The Path" 
             sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brown/30 via-transparent to-ivory" />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl px-[var(--gutter)]">
           <span className="text-[10px] md:text-label-xs uppercase tracking-[0.8em] text-ivory mb-6 md:mb-8 block font-light">The Foundation</span>
           <h1 className="text-display-xl text-ivory mb-8 md:mb-12 italic">Pathways to <br/>Presence</h1>
           <div className="w-12 md:w-16 h-px bg-ivory/50 mx-auto" />
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="container-luxury py-12 md:py-24 text-center">
         <div className="max-w-3xl mx-auto space-y-6 md:space-y-12">
            <h2 className="text-display-md text-brown">Choreographed for <span className="italic">Transformation</span></h2>
            <p className="text-body-lg md:text-body-xl text-warmBeige font-light leading-relaxed italic">
               Whether seeking solitude or shared restoration, each path is a meticulously designed vessel. 
               Choose the foundation that resonates with your current state of being.
            </p>
         </div>
      </section>

      {/* 3. JOURNEY CARDS - EDITORIAL LAYOUT */}
      <section className="container-luxury space-y-24 md:space-y-[20vh] pb-16 md:pb-[20vh]">
         {Object.values(JOURNEY_TYPES).map((journey, i) => {
           const isSelected = currentJourney === journey.id;
           return (
             <div key={journey.id} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-32 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="relative w-full lg:w-3/5 group">
                   <Link href={`/experiences?journey=${journey.id}`}>
                      <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden image-reveal shadow-luxury">
                         <Image 
                           src={journey.image || '/images/123.jpeg'} 
                           alt={journey.title} 
                           fill
                           className={`object-cover transition-all duration-[2s] ${isSelected ? 'grayscale-0' : 'grayscale-[0.4] group-hover:grayscale-0'}`} 
                           sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 60vw, 800px"
                         />
                      </div>
                      {isSelected && (
                         <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 w-12 h-12 md:w-16 md:h-16 bg-olive text-ivory rounded-full flex items-center justify-center shadow-luxury">
                            <Check size={32} strokeWidth={3} />
                         </div>
                      )}
                   </Link>
                   <div className={`absolute -bottom-6 -right-6 md:-bottom-10 ${i % 2 === 1 ? 'md:-left-10' : 'md:-right-10'} w-24 h-32 md:w-40 md:h-56 bg-beige/20 -z-10 hidden md:block`} />
                </div>
                
                <div className="w-full lg:w-2/5 space-y-6 md:space-y-10">
                   <span className="text-[10px] md:text-label-xs text-olive font-bold uppercase tracking-[0.5em] block">
                     Option 0{i + 1} — {journey.subtitle}
                   </span>
                   <h2 className={`text-display-lg leading-none ${isSelected ? 'text-olive italic' : 'text-brown'}`}>{journey.title}</h2>
                   <p className="text-body-lg md:text-body-xl text-warmBeige font-light italic leading-relaxed">
                      {journey.description}
                   </p>
                   
                   <div className="grid grid-cols-2 gap-6 md:gap-8 py-6 md:py-8 border-y border-brown/10">
                      <div>
                         <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-brown/40 font-bold">Capacity</span>
                         <p className="text-xs md:text-sm text-brown/70 mt-1 md:mt-2">{journey.groupSize}</p>
                      </div>
                      <div>
                         <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-brown/40 font-bold">Atmosphere</span>
                         <p className="text-xs md:text-sm text-brown/70 mt-1 md:mt-2 italic">{journey.subtitle}</p>
                      </div>
                   </div>

                   <div className="pt-4 md:pt-8">
                      <Link href={`/experiences?journey=${journey.id}`} className={`inline-block w-full sm:w-auto text-center px-12 py-5 rounded-full text-[10px] md:text-label-xs font-bold uppercase tracking-[0.4em] transition-all ${isSelected ? 'bg-olive text-ivory' : 'bg-brown text-ivory hover:bg-olive'}`}>
                         {isSelected ? 'Selected' : 'Select Foundation'}
                      </Link>
                   </div>
                </div>
             </div>
           );
         })}
      </section>

      {/* 4. PHILOSOPHY BREAK */}
      <section className="bg-softBeige py-12 md:py-24">
         <div className="container-luxury max-w-4xl text-center space-y-8 md:space-y-12">
            <h2 className="text-display-md italic text-brown">&quot;The path is as significant as the destination.&quot;</h2>
            <div className="w-px h-16 md:h-24 bg-brown/20 mx-auto" />
         </div>
      </section>
    </main>
  );
}