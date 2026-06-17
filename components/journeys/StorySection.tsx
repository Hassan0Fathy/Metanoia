'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Journey } from '@/lib/types';

interface StorySectionProps {
  journey: Journey;
  isImageLeft: boolean;
  features: string[];
}

export default function StorySection({ journey, isImageLeft, features }: StorySectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className={`container mx-auto px-6 flex flex-col gap-12 lg:gap-20 items-center ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
            <Image 
              src={journey.image || '/images/123.jpeg'} 
              alt={journey.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <span className="text-olive text-sm font-medium tracking-[0.2em] uppercase">{journey.subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brown">{journey.title}</h2>
          <p className="text-lg text-stone-600 font-light leading-relaxed">{journey.description}</p>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brown/70">Journey Includes:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-stone-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link href={`/reservation?journey=${journey.id}`} className="inline-block bg-brown text-white px-10 py-4 rounded-full text-sm font-medium hover:bg-olive transition-colors">
            Begin Journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
