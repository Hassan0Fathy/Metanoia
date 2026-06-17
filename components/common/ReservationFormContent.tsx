'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACTIVITIES, ZONES, JOURNEY_TYPES, EXPERIENCE_TYPES } from '@/lib/constants';
import { Check, Clock, Disc as Bracelet, MapPin, Sparkles, Info, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function ReservationFormContent() {
  const searchParams = useSearchParams();
  const initialJourney = searchParams.get('journey') || 'solo';
  const initialType = searchParams.get('type') || 'day-use';

  const [step, setStep] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [activityTimes, setActivityTimes] = useState<Record<string, string>>({});
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    age: '',
    numberOfGuests: '1',
  });

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleTimeSelect = (activityId: string, time: string) => {
    setActivityTimes(prev => ({ ...prev, [activityId]: time }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const canGoToTimes = selectedActivities.length > 0;
  const canGoToDetails = selectedActivities.every(id => activityTimes[id]);
  const canGoToSummary = guestDetails.name && guestDetails.age;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const selectedJourney = JOURNEY_TYPES[initialJourney];
  const selectedExperience = EXPERIENCE_TYPES[initialType];

  return (
    <div className="min-h-screen bg-ivory flex flex-col pt-24 md:pt-40">
      
      {/* PROGRESS & CONCIERGE PANEL */}
      <div className="container-luxury w-full mb-10 md:mb-24 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="lg:col-span-8 space-y-4 md:space-y-10">
               <div className="flex items-center gap-6">
                  <div className="w-12 md:w-16 h-[1px] bg-olive" />
                  <span className="text-[10px] md:text-label-xs text-olive font-bold uppercase tracking-[0.6em] ml-2">Retreat Designer</span>
               </div>
               <h1 className="text-3xl md:text-display-md font-serif text-brown leading-[0.9] max-w-5xl">
                  {step === 1 && <>Curate Your <br/><span className="italic text-olive">Experiences</span></>}
                  {step === 2 && <>Synchronize <br/><span className="italic text-olive">Your Timeline</span></>}
                  {step === 3 && <>Identify <br/><span className="italic text-olive">Your Presence</span></>}
                  {step === 4 && <>Your <br/><span className="italic text-olive">Digital Key</span></>}
               </h1>
            </div>
            <div className="lg:col-span-4 lg:text-right flex lg:block justify-between items-center mt-6 lg:mt-0">
               <div className="flex gap-2 md:gap-4 mb-0 lg:mb-8">
                  {[1, 2, 3, 4].map((n) => (
                    <motion.div 
                      key={n}
                      animate={{ 
                        scale: step === n ? 1.2 : 1,
                        opacity: step >= n ? 1 : 0.1
                      }}
                      className={`w-10 h-1 md:w-20 md:h-2 rounded-full transition-colors duration-700 ${step === n ? 'bg-olive shadow-luxury' : 'bg-brown/20'}`}
                    />
                  ))}
               </div>
               <span className="text-[9px] md:text-label-xs uppercase tracking-[0.5em] font-bold text-brown/30 ml-2 lg:ml-[0.5em]">Phase 0{step} of 04</span>
            </div>
         </div>
         <div className="w-full h-[1px] bg-brown/5 mt-8 md:mt-20" />
      </div>

      {/* INTERACTIVE AREA */}
      <div className="container-luxury w-full flex-1 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-32">
            <div className="lg:col-span-8 pb-24 md:pb-48">
               <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="space-y-16 md:space-y-32">
                      {ZONES.map(zone => {
                        const zoneActivities = ACTIVITIES.filter(a => a.zoneId === zone.id);
                        if (zoneActivities.length === 0) return null;
                        return (
                          <div key={zone.id} className="space-y-8 md:space-y-16">
                            <div className="flex items-center gap-8">
                              <h2 className="text-xl md:text-4xl font-serif text-brown uppercase tracking-[0.2em]">{zone.name}</h2>
                              <div className="flex-1 h-[1px] bg-gold/20" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                              {zoneActivities.map(activity => (
                                <div 
                                  key={activity.id}
                                  onClick={() => toggleActivity(activity.id)}
                                  className={`p-6 md:p-12 border transition-all duration-1000 cursor-pointer flex flex-col justify-between min-h-[250px] md:aspect-square relative group overflow-hidden rounded-xs ${selectedActivities.includes(activity.id) ? 'bg-brown text-ivory border-brown shadow-luxury' : 'bg-white border-brown/5 text-brown hover:bg-softBeige/30 hover:border-olive/20'}`}
                                >
                                  <div className="space-y-4 md:space-y-8 relative z-10">
                                     <div className="flex justify-between items-start">
                                        <span className={`text-[9px] md:text-label-xs font-bold uppercase tracking-[0.5em] transition-all duration-700 ${selectedActivities.includes(activity.id) ? 'text-gold' : 'text-olive'}`}>Experience 0{activity.id.slice(-1)}</span>
                                        {selectedActivities.includes(activity.id) && <div className="w-6 h-6 md:w-8 md:h-8 bg-olive text-ivory rounded-full flex items-center justify-center shadow-luxury"><Check size={18} strokeWidth={3} /></div>}
                                     </div>
                                     <h3 className="text-2xl md:text-4xl font-serif leading-tight">{activity.title}</h3>
                                  </div>
                                  <div className="flex items-center justify-between pt-6 md:pt-12 border-t border-current/10 relative z-10">
                                    <div className="flex items-center gap-2">
                                       <Clock size={14} strokeWidth={1.5} className="opacity-40" />
                                       <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">{activity.duration}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                  {/* ... Steps 2-4 ... */}
               </AnimatePresence>
            </div>
            {/* ... Summary Panel ... */}
         </div>
      </div>
    </div>
  );
}
