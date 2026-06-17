'use client';

import { motion } from 'framer-motion';

const steps = [
  'Arrival',
  'Receive Bracelet',
  'Check-In',
  'Experience Activities',
  'Community Gathering',
  'Departure'
];

export default function ExperienceTimeline() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <h3 className="text-3xl font-serif text-brown text-center mb-16">Your Sanctuary Journey</h3>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-stone-300 transform -translate-x-1/2" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center gap-8 md:gap-0"
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-olive rounded-full transform -translate-x-1/2 z-10" />
                
                {/* Text */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                   <p className="font-serif text-brown text-lg">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
