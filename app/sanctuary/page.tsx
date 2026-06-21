'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ZONES } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/imageMap';

export default function SanctuaryPage() {
  return (
    <main className="bg-[#F8F5F1] text-[#4E3B2E]">
      {/* 1. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <Image 
          src={IMAGE_MAP.architecture.layout}
          fill
          alt="Sanctuary Architecture Masterplan"
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="relative z-10 text-ivory">
          <span className="text-xs uppercase tracking-[0.4em] mb-4 block">Begin the Journey Back to Yourself</span>
          <h1 className="text-display-2xl font-serif italic mb-8">The Sanctuary</h1>
        </div>
      </section>

      {/* 2. PHILOSOPHY */}
      <section className="container-luxury py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-display-md font-serif italic">Architecture of Presence</h2>
          <p className="text-lg leading-relaxed font-light">
            An immersive sanctuary engineered for restoration. Inspired by the raw textures of basalt, 
            the warmth of aged cedar, and the fluidity of thermal waters, our spaces are designed 
            to bring you back to your natural state.
          </p>
        </div>
      </section>

      {/* 3. ZONES */}
      <section className="container-luxury space-y-32">
        {ZONES.map((zone, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:grid-flow-dense' : ''}`}>
            <div className={`aspect-[4/5] relative overflow-hidden ${i % 2 !== 0 ? 'md:col-start-2' : ''}`}>
              <Image src={zone.image} fill alt={zone.name} className="object-cover" />
            </div>
            <div className="space-y-6">
              <span className="text-olive text-sm uppercase tracking-[0.3em]">0{i+1}</span>
              <h3 className="text-display-sm font-serif">{zone.name}</h3>
              <p className="text-lg font-light">{zone.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. CURATED JOURNEYS */}
      <section className="py-24 md:py-32 bg-softBeige mt-32">
        <div className="container-luxury text-center space-y-12">
          <h2 className="text-display-md font-serif italic">Curated Journeys</h2>
          <Link href="/journeys" className="inline-block px-12 py-5 border border-brown rounded-full hover:bg-brown hover:text-ivory transition-all">
            Explore Paths
          </Link>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="container-luxury py-24 text-center">
        <h2 className="text-display-lg font-serif italic mb-12">The Sanctuary Awaits.</h2>
        <Link href="/reservation" className="inline-block px-16 py-6 bg-brown text-ivory rounded-full hover:bg-olive transition-all">
          Secure Reservation
        </Link>
      </section>
    </main>
  );
}