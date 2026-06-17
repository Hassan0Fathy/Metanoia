'use client';

import { motion } from 'framer-motion';

export default function BraceletHighlight() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto rounded-[32px] overflow-hidden p-8 md:p-12 bg-white/40 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-stone-200 border-4 border-stone-300 flex items-center justify-center">
                 <span className="text-stone-400 font-serif italic">Icon</span>
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-2xl md:text-3xl font-serif text-brown">The Metanoia Sanctuary Bracelet</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Upon arrival, guests receive a Metanoia Sanctuary Bracelet. The bracelet serves as your sanctuary pass and experience identifier throughout your stay.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
