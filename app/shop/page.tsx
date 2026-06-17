'use client';

import Image from 'next/image';
import Link from 'next/link';

// Using unique images based on list
const IMAGES = {
  hero: '/images/Ezv14wqiR7tFGq0zv77AXr334JC3WIBE40OtpizEVSQjUqJ2AA51qiEj0CdvzqiUPhvntLxdA1DBN6LLxF4Ubs5kLZVlFoDNl-1AFRO5yVvbNoY-9g388Jk19a9s4.jpeg',
  cat1: '/images/BTPBFkviPt8PjEX_yJFXVYWFehggOAZR12GhDsvm8mRcMXx5Mvme0UHWASo__-hENZUpuEGCpTsxLQRgXFg-JKVi7Ly-62Q5b_DAFCGxHuk-tkTxHkiA9hfo0Km1Pooy4.jpeg',
  cat2: '/images/123.jpeg',
  cat3: '/images/sanctuary-landscape.jpeg',
  banner: '/images/Ezv14wqiR7tFGq0zv77AXr334JC3WIBE40OtpizEVSQjUqJ2AA51qiEj0CdvzqiUPhvntLxdA1DBN6LLxF4Ubs5kLZVlFoDNl-1AFRO5yVvbNoY-9g388Jk19a9s4.jpeg'
};

const PRODUCTS = [
  { name: 'Cedarwood Botanical Oil', story: 'Hand-pressed oils derived from ancient cedar groves.', image: IMAGES.cat1 },
  { name: 'Ritual Tea Blend', story: 'Herbal infusions for mindful transition.', image: IMAGES.cat2 },
  { name: 'Basalt Skincare', story: 'Mineral-rich formulas sourced from our thermal springs.', image: IMAGES.cat3 },
  { name: 'Meditation Bowl', story: 'A vessel for sonic clarity.', image: IMAGES.cat1 },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#4E3B2E]">
      {/* HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center">
        <Image src={IMAGES.hero} fill alt="Shop Hero" className="object-cover brightness-[0.7]" priority />
        <div className="relative z-10 text-ivory max-w-4xl px-4">
          <h1 className="text-display-lg font-serif italic mb-8">Curated Essentials For A Life Of Return</h1>
          <p className="text-xl font-light tracking-[0.2em] uppercase">Natural extensions of our sanctuary experience.</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-luxury py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {['Herbal Remedies', 'Essential Oils', 'Ritual Candles', 'Organic Teas', 'Meditation Tools', 'Natural Skincare'].map((cat, i) => (
            <div key={cat} className="group relative aspect-[3/4] overflow-hidden">
               <Image src={i % 2 === 0 ? IMAGES.cat1 : IMAGES.cat2} fill alt={cat} className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 text-ivory">
                  <h3 className="text-xl md:text-2xl font-serif">{cat}</h3>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-white py-16 md:py-32">
        <div className="container-luxury">
          <h2 className="text-display-sm md:text-display-md font-serif italic text-center mb-12 md:mb-20">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRODUCTS.map(p => (
              <div key={p.name} className="space-y-4">
                <div className="aspect-[3/4] relative overflow-hidden bg-softBeige">
                  <Image src={p.image} fill alt={p.name} className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <h4 className="font-serif text-lg md:text-xl">{p.name}</h4>
                <p className="text-xs md:text-sm text-brown/60 italic">{p.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="container-luxury py-32 text-center max-w-3xl">
        <h2 className="text-display-sm font-serif italic mb-10">&quot;Every object in Metanoia is chosen with intention.&quot;</h2>
        <p className="text-lg font-light leading-relaxed">
          From sustainable sourcing to handcrafted production, our collection is an extension of our wellness ethos, 
          designed to carry the sanctuary&apos;s restoration into your daily life.
        </p>
      </section>

      {/* IMMERSIVE BANNER */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image src={IMAGES.banner} fill alt="Sanctuary Home" className="object-cover brightness-[0.6]" />
        <h2 className="relative z-10 text-display-lg text-ivory italic font-serif">Take The Sanctuary Home</h2>
      </section>

      {/* CTA */}
      <section className="py-32 container-luxury text-center space-y-12">
        <h2 className="text-display-md font-serif italic">Bring The Sanctuary Into Everyday Life</h2>
        <div className="flex justify-center gap-8">
            <Link href="/shop" className="px-12 py-5 bg-brown text-ivory rounded-full">Explore Collection</Link>
            <Link href="/reservation" className="px-12 py-5 border border-brown text-brown rounded-full">Reserve Sanctuary</Link>
        </div>
      </section>
    </main>
  );
}
