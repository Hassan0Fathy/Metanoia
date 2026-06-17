'use client';

import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/constants';
import HeroSection from '@/components/journeys/HeroSection';
import StorySection from '@/components/journeys/StorySection';
import BraceletHighlight from '@/components/journeys/BraceletHighlight';
import ExperienceTimeline from '@/components/journeys/ExperienceTimeline';
import FeaturedExperience from '@/components/journeys/FeaturedExperience';
import { Journey } from '@/lib/types';

export default function ExperiencesPage() {
  // Mapping experiences to look like journeys for the StorySection layout
  const mappedExperiences: Journey[] = EXPERIENCES.map((exp, i) => ({
    id: exp.id,
    title: exp.title,
    subtitle: `Signature Experience 0${i + 1}`,
    description: exp.description,
    image: '/images/123.jpeg', // Placeholder
    groupSize: 'Individual',
  }));

  const features: Record<string, string[]> = {
     // Adding some dummy features for the visual layout
     'mineral-pool': ['Mineral Rich Waters', 'Temperature Controlled', 'Mountain Views', 'Private Access'],
     'family-hydro': ['Family Friendly', 'Playful Environment', 'Supervised Safety', 'Warm Waters'],
     'private-hydro': ['Exclusivity', 'Full Privacy', 'Tailored Temperatures', 'Aromatic Infusions'],
     'infinity-pool': ['Panoramic Views', 'Saltwater Based', 'Sunrise Sessions', 'Relaxation Loungers'],
     'yoga-pavilion': ['Expert Instructors', 'Nature Inspired', 'All Levels Welcome', 'Serene Atmosphere'],
     'counseling': ['Holistic Approach', 'Confidential Space', 'Expert Guidance', 'Personal Growth'],
     'family-therapy': ['Family Centric', 'Guided Exercises', 'Conflict Resolution', 'Emotional Support'],
     'art-therapy': ['Creative Expression', 'Professional Tools', 'Guidance', 'Calming Environment'],
     'music-therapy': ['Sound Healing', 'Vibrational Therapy', 'Deep Relaxation', 'Expert Led'],
     'library': ['Curated Collection', 'Quiet Nooks', 'Comfortable Seating', 'Inspirational Literature'],
     'pottery-workshop': ['Hands-on Crafting', 'Artisanal Techniques', 'Creative Outlet', 'Keepsake Creation'],
     'farm-experience': ['Educational', 'Organic Practices', 'Immersive', 'Nature Connected'],
     'garden-tour': ['Botanical Insight', 'Organic Education', 'Scenic Beauty', 'Expert Narration'],
     'zen-meditation': ['Mindfulness Focused', 'Guided Sessions', 'Quiet Setting', 'Inner Peace'],
  };

  return (
    <main className="bg-stone-50 min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-6 py-12 md:py-24 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-serif text-brown italic mb-8">Choreographed for Transformation</h2>
        <p className="text-xl text-stone-600 font-light leading-relaxed">
          Curated experiences designed for rest, connection, healing, and transformation.
        </p>
      </div>

      {mappedExperiences.map((exp, i) => (
        <StorySection 
          key={exp.id} 
          journey={exp} 
          isImageLeft={i % 2 === 0}
          features={features[exp.id] || ['Holistic Wellness', 'Expert Guidance']}
        />
      ))}

      <BraceletHighlight />
      <ExperienceTimeline />
      <FeaturedExperience />
    </main>
  );
}
