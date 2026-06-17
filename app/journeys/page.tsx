'use client';

import { JOURNEY_TYPES } from '@/lib/constants';
import HeroSection from '@/components/journeys/HeroSection';
import StorySection from '@/components/journeys/StorySection';
import BraceletHighlight from '@/components/journeys/BraceletHighlight';
import ExperienceTimeline from '@/components/journeys/ExperienceTimeline';
import FeaturedExperience from '@/components/journeys/FeaturedExperience';

export default function JourneysPage() {
  // Mock features for each journey type for the redesign
  const journeyFeatures: Record<string, string[]> = {
    solo: ['Private Sanctuary Suite', 'Guided Meditation', 'Organic Nourishment', 'Daily Spa Access'],
    couple: ['Double Therapy Room', 'Couples Yoga', 'Shared Farm-to-Table Meals', 'Private Hydrotherapy'],
    family: ['Family Suite', 'Guided Nature Walks', 'Creative Workshops', 'Child-Friendly Wellness'],
  };

  return (
    <main className="bg-stone-50 min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-6 py-12 md:py-24 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-serif text-brown italic mb-8">Choreographed for Transformation</h2>
        <p className="text-xl text-stone-600 font-light leading-relaxed">
          Whether seeking solitude or shared restoration, each path is a meticulously designed vessel. 
          Choose the foundation that resonates with your current state of being.
        </p>
      </div>

      {Object.values(JOURNEY_TYPES).map((journey, i) => (
        <StorySection 
          key={journey.id} 
          journey={journey} 
          isImageLeft={i % 2 === 0}
          features={journeyFeatures[journey.id] || []}
        />
      ))}

      <BraceletHighlight />
      <ExperienceTimeline />
      <FeaturedExperience />
    </main>
  );
}