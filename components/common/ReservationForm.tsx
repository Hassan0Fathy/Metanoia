'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACTIVITIES, ZONES, JOURNEY_TYPES, EXPERIENCE_TYPES } from '@/lib/constants';
import { ChevronRight, ChevronLeft, Check, Clock, Disc as Bracelet, MapPin, Sparkles, Info, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function ReservationForm() {
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
      
      {/* 1. DYNAMIC PROGRESS & CONCIERGE PANEL */}
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

      {/* 2. MAIN INTERACTIVE AREA */}
      <div className="container-luxury w-full flex-1 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-32">
            
            {/* CONTENT COLUMN */}
            <div className="lg:col-span-8 pb-24 md:pb-48">
               <AnimatePresence mode="wait">
                  
                  {/* STEP 1: ACTIVITIES */}
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="space-y-16 md:space-y-32"
                    >
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
                                  className={`p-6 md:p-12 border transition-all duration-1000 cursor-pointer flex flex-col justify-between min-h-[250px] md:aspect-square relative group overflow-hidden rounded-xs ${
                                    selectedActivities.includes(activity.id)
                                    ? 'bg-brown text-ivory border-brown shadow-luxury'
                                    : 'bg-white border-brown/5 text-brown hover:bg-softBeige/30 hover:border-olive/20'
                                  }`}
                                >
                                  <div className={`absolute inset-0 bg-olive transition-opacity duration-1000 ${selectedActivities.includes(activity.id) ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`} />
                                  
                                  <div className="space-y-4 md:space-y-8 relative z-10">
                                     <div className="flex justify-between items-start">
                                        <span className={`text-[9px] md:text-label-xs font-bold uppercase tracking-[0.5em] transition-all duration-700 ${selectedActivities.includes(activity.id) ? 'text-gold' : 'text-olive'}`}>
                                          Experience 0{activity.id.slice(-1)}
                                        </span>
                                        {selectedActivities.includes(activity.id) && (
                                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 md:w-8 md:h-8 bg-olive text-ivory rounded-full flex items-center justify-center shadow-luxury">
                                             <Check size={18} strokeWidth={3} />
                                          </motion.div>
                                        )}
                                     </div>
                                     <h3 className="text-2xl md:text-4xl font-serif leading-tight">{activity.title}</h3>
                                     <p className={`text-xs md:text-body-sm font-light italic leading-relaxed transition-opacity duration-1000 ${selectedActivities.includes(activity.id) ? 'opacity-80' : 'opacity-50'}`}>
                                       Bespoke session architected to synchronize your presence.
                                     </p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between pt-6 md:pt-12 border-t border-current/10 relative z-10">
                                    <div className="flex items-center gap-2">
                                       <Clock size={14} strokeWidth={1.5} className="opacity-40" />
                                       <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">{activity.duration}</span>
                                    </div>
                                    <div className={`px-4 py-1.5 md:px-8 md:py-3 rounded-full border text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 ${
                                      selectedActivities.includes(activity.id) 
                                      ? 'bg-ivory text-brown border-ivory' 
                                      : 'border-brown/10 group-hover:bg-brown group-hover:text-ivory group-hover:border-brown'
                                    }`}>
                                      {selectedActivities.includes(activity.id) ? 'Selected' : 'Include'}
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

                  {/* STEP 2: TIMELINE */}
                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8 md:space-y-20"
                    >
                      <div className="grid grid-cols-1 gap-6 md:gap-12">
                        {selectedActivities.map(id => {
                          const activity = ACTIVITIES.find(a => a.id === id);
                          if (!activity) return null;
                          return (
                            <div key={id} className="bg-white border border-brown/5 p-6 md:p-20 shadow-luxury rounded-xs relative overflow-hidden group hover:shadow-active transition-all duration-1000">
                               <div className="absolute top-0 left-0 w-[4px] md:w-[6px] h-0 bg-gold opacity-30 group-hover:h-full transition-all duration-1000 ease-out" />
                               
                               <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16 mb-12 md:mb-20 relative z-10">
                                 <div className="space-y-3 md:space-y-6">
                                   <div className="flex items-center gap-3">
                                      <MapPin size={12} className="text-olive" strokeWidth={1.5} />
                                      <span className="text-[10px] md:text-label-xs text-olive font-bold uppercase tracking-[0.4em]">{ZONES.find(z => z.id === activity.zoneId)?.name}</span>
                                   </div>
                                   <h3 className="text-3xl md:text-6xl font-serif text-brown leading-tight">{activity.title}</h3>
                                 </div>
                                 <div className="flex items-center gap-3 py-3 px-6 bg-softBeige rounded-full border border-brown/5 w-fit">
                                   <Clock size={16} className="text-gold" strokeWidth={1.5} />
                                   <span className="text-[10px] md:text-label-xs font-bold uppercase tracking-[0.4em] text-brown/70">{activity.duration}</span>
                                 </div>
                               </div>

                               <div className="flex flex-wrap gap-3 md:gap-6 relative z-10">
                                 {activity.availableTimes.map(time => (
                                   <button
                                     key={time}
                                     onClick={() => handleTimeSelect(id, time)}
                                     className={`px-6 py-3 md:px-10 md:py-6 text-[9px] md:text-[11px] uppercase tracking-[0.3em] transition-all duration-700 rounded-full border ${
                                       activityTimes[id] === time
                                       ? 'bg-olive text-ivory border-olive scale-105'
                                       : 'bg-transparent text-brown border-brown/10 hover:border-olive hover:text-olive'
                                     }`}
                                   >
                                     {time}
                                   </button>
                                 ))}
                               </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: IDENTITY */}
                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-4xl space-y-12 md:space-y-24"
                    >
                      <div className="bg-white border border-brown/5 p-8 md:p-24 shadow-luxury relative overflow-hidden rounded-xs">
                         <div className="space-y-12 md:space-y-20 relative z-10">
                            <div className="space-y-10 md:space-y-16">
                               <div className="space-y-4 md:space-y-6">
                                  <label className="text-[10px] md:text-label-xs uppercase tracking-[0.6em] font-bold text-brown/30 ml-2">Guest Identification</label>
                                  <input 
                                    type="text"
                                    placeholder="Full Legal Name"
                                    value={guestDetails.name}
                                    onChange={e => setGuestDetails({...guestDetails, name: e.target.value})}
                                    className="w-full bg-transparent border-b border-brown/10 py-4 md:py-8 text-2xl md:text-7xl font-serif text-brown focus:outline-none focus:border-olive transition-all duration-1000 placeholder:text-brown/10"
                                  />
                               </div>
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32">
                                  <div className="space-y-4 md:space-y-6">
                                     <label className="text-[10px] md:text-label-xs uppercase tracking-[0.6em] font-bold text-brown/30 ml-2">Age Presence</label>
                                     <input 
                                       type="number"
                                       placeholder="Years"
                                       value={guestDetails.age}
                                       onChange={e => setGuestDetails({...guestDetails, age: e.target.value})}
                                       className="w-full bg-transparent border-b border-brown/10 py-4 md:py-8 text-xl md:text-5xl font-serif text-brown focus:outline-none focus:border-olive transition-all duration-1000 placeholder:text-brown/10"
                                     />
                                  </div>
                                  <div className="space-y-4 md:space-y-6">
                                     <label className="text-[10px] md:text-label-xs uppercase tracking-[0.6em] font-bold text-brown/30 ml-2">Party Size</label>
                                     <div className="relative border-b border-brown/10">
                                        <select 
                                          className="w-full bg-transparent py-4 md:py-8 text-xl md:text-5xl font-serif text-brown focus:outline-none appearance-none cursor-pointer pr-12"
                                          value={guestDetails.numberOfGuests}
                                          onChange={e => setGuestDetails({...guestDetails, numberOfGuests: e.target.value})}
                                        >
                                          {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-ivory text-xl">{n} Unit{n > 1 ? 's' : ''}</option>)}
                                        </select>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                                           <ChevronRight className="rotate-90" size={24} strokeWidth={1} />
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 md:p-12 bg-softBeige border border-brown/5 rounded-xs flex items-start gap-6 md:gap-10 shadow-luxury-soft">
                         <div className="w-10 h-10 rounded-full border border-olive/20 flex items-center justify-center shrink-0">
                            <Info size={14} className="text-olive" strokeWidth={1.5} />
                         </div>
                         <p className="text-xs md:text-body-sm text-brown/60 italic leading-relaxed">
                            Your identification is used to personalize the sensory protocols of your retreat rooms.
                         </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: DIGITAL KEY */}
                  {step === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="space-y-12 md:space-y-32"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
                        
                        {/* Visual Digital Pass */}
                        <div className="lg:col-span-5 relative max-w-sm mx-auto w-full">
                           <div className="bg-brown aspect-[3.5/5.5] rounded-xs p-8 md:p-16 flex flex-col justify-between shadow-active relative overflow-hidden">
                              <div className="absolute inset-0 opacity-10 bg-noise pointer-events-none" />
                              
                              <div className="relative z-10 flex justify-between items-start border-b border-ivory/10 pb-6 md:pb-12">
                                 <div className="space-y-1">
                                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] text-ivory/40 block">Digital Presence Active</span>
                                    <span className="text-[10px] text-gold font-serif tracking-[0.3em] uppercase">Protocol 001</span>
                                 </div>
                                 <div className="w-8 h-8 md:w-12 md:h-12 border border-ivory/20 rounded-full flex items-center justify-center">
                                    <Bracelet size={14} className="text-gold animate-spin-slow" strokeWidth={1} />
                                 </div>
                              </div>

                              <div className="relative z-10 space-y-6 md:space-y-12">
                                 <div className="space-y-3">
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold/60 font-bold block ml-2">Lead Presence</span>
                                    <h3 className="text-3xl md:text-6xl font-serif text-ivory tracking-widest uppercase truncate leading-none">{guestDetails.name || "Anonymous"}</h3>
                                 </div>
                                 <div className="flex justify-between items-center pt-4 md:pt-8 border-t border-ivory/5">
                                    <div className="space-y-2">
                                       <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-ivory/30">Atmosphere</span>
                                       <span className="text-xs md:text-sm text-ivory font-serif tracking-widest uppercase">{JOURNEY_TYPES[initialJourney]?.title.split(' ')[0]}</span>
                                    </div>
                                    <div className="space-y-2 text-right">
                                       <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-ivory/30">Immersion</span>
                                       <span className="text-xs md:text-sm text-ivory font-serif tracking-widest uppercase">{EXPERIENCE_TYPES[initialType]?.name}</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="relative z-10 luxury-glass p-6 md:p-10 border border-white/5 rounded-xs space-y-4 md:space-y-8 shadow-glass">
                                 <div className="flex items-center gap-3">
                                    <Sparkles size={10} className="text-gold" strokeWidth={1.5} />
                                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] text-ivory/60">Timeline Synchronized</span>
                                 </div>
                                 <div className="space-y-3 md:space-y-6">
                                    {selectedActivities.slice(0, 3).map((id) => (
                                      <div key={id} className="flex justify-between items-center opacity-90 border-b border-white/5 pb-2">
                                         <span className="text-[10px] text-ivory font-light italic truncate pr-4">{ACTIVITIES.find(a => a.id === id)?.title}</span>
                                         <span className="text-[8px] text-gold font-bold tracking-widest uppercase">{activityTimes[id]}</span>
                                      </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Guide Content */}
                        <div className="lg:col-span-7 space-y-12 md:space-y-20 py-8">
                           <div className="space-y-8 md:space-y-12">
                              <h2 className="text-display-sm md:text-headline-lg font-serif text-brown leading-[0.9]">Your Digital Foundation is <br/><span className="italic text-olive">Active</span>.</h2>
                              <p className="text-body-lg md:text-body-xl text-brown/70 font-light leading-relaxed italic">
                                Your digital identity has been architected. Upon arrival at the estate, your physical key will synchronize.
                              </p>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 py-8 md:py-16 border-y border-brown/10">
                              <div className="space-y-4">
                                 <span className="text-[10px] md:text-label-xs text-brown/40 font-bold uppercase tracking-[0.6em] ml-2">Reservation Index</span>
                                 <p className="text-2xl md:text-3xl font-serif text-brown tracking-[0.2em] uppercase">META-PASS</p>
                              </div>
                              <div className="space-y-4">
                                 <span className="text-[10px] md:text-label-xs text-brown/40 font-bold uppercase tracking-[0.6em] ml-2">Shared Presence</span>
                                 <p className="text-2xl md:text-3xl font-serif text-brown">{guestDetails.numberOfGuests} Identity Units</p>
                              </div>
                           </div>

                           <div className="flex flex-col sm:flex-row gap-6 md:gap-8 pt-8 md:pt-12">
                              <button 
                                 onClick={async () => {
                                    const { generatePassPDF } = await import('@/lib/pdf');
                                    await generatePassPDF(
                                       guestDetails.name,
                                       JOURNEY_TYPES[initialJourney]?.title || 'Standard',
                                       EXPERIENCE_TYPES[initialType]?.name || 'Standard',
                                       selectedActivities,
                                       `META-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                                       "2026-06-20" // Placeholder for check-in date
                                    );
                                 }}
                                 className="w-full sm:flex-1 px-12 py-5 md:px-16 md:py-8 bg-brown text-ivory text-[10px] md:text-label-xs font-bold uppercase tracking-[0.6em] rounded-full hover:bg-olive transition-all shadow-luxury">
                                Download Digital Pass
                              </button>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

               </AnimatePresence>

               {/* 3. NAVIGATION CONTROLS */}
               <div className="mt-16 md:mt-32 pt-8 md:pt-20 border-t border-brown/10 flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-16">
                  {step > 1 ? (
                    <button 
                      onClick={prevStep} 
                      className="group flex items-center gap-4 text-[10px] md:text-label-xs font-bold uppercase tracking-[0.6em] text-brown/40 hover:text-brown transition-all duration-700"
                    >
                      <ChevronLeft size={16} strokeWidth={2} className="group-hover:-translate-x-2 transition-transform" />
                      Back
                    </button>
                  ) : (
                    <Link href="/experiences" className="flex items-center gap-4 text-[10px] md:text-label-xs font-bold uppercase tracking-[0.6em] text-brown/40 hover:text-brown transition-all">
                       <ChevronLeft size={16} strokeWidth={2} />
                       Abort Designer
                    </Link>
                  )}

                  {step < 4 && (
                    <button 
                      disabled={
                        (step === 1 && !canGoToTimes) || 
                        (step === 2 && !canGoToDetails) || 
                        (step === 3 && !canGoToSummary)
                      }
                      onClick={nextStep}
                      className={`w-full sm:w-auto px-12 py-5 md:px-24 md:py-8 rounded-full text-[10px] md:text-label-xs font-bold uppercase tracking-[0.8em] transition-all duration-700 flex items-center justify-center gap-4 shadow-luxury ${
                        ((step === 1 && canGoToTimes) || (step === 2 && canGoToDetails) || (step === 3 && canGoToSummary))
                        ? 'bg-brown text-ivory hover:bg-olive'
                        : 'bg-brown/5 text-brown/20 cursor-not-allowed'
                      }`}
                    >
                      {step === 1 ? 'Configure Timeline' : step === 2 ? 'Define Presence' : 'Finalize Blueprint'}
                      <ArrowRight size={16} strokeWidth={1} />
                    </button>
                  )}
               </div>
            </div>

            {/* SUMMARY PANEL COLUMN - STICKY ON DESKTOP */}
            <div className="lg:col-span-4 hidden lg:block">
               <div className="sticky top-48 space-y-12">
                  <div className="bg-white border border-brown/5 p-12 md:p-16 shadow-luxury rounded-xs relative overflow-hidden">
                     <div className="relative z-10 space-y-12">
                        <div className="flex justify-between items-center border-b border-brown/5 pb-8">
                           <span className="text-[10px] text-brown/30 font-bold uppercase tracking-[0.6em] ml-2">Retreat Context</span>
                           <Sparkles size={16} className="text-gold/40" strokeWidth={1.5} />
                        </div>

                        <div className="space-y-10">
                           <div className="space-y-3">
                              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-olive ml-2">Foundation</span>
                              <p className="text-2xl font-serif text-brown italic leading-tight">{selectedJourney?.title}</p>
                           </div>
                           <div className="space-y-3">
                              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-olive ml-2">Retreat Depth</span>
                              <p className="text-2xl font-serif text-brown italic leading-tight">{selectedExperience?.name}</p>
                           </div>
                           
                           {selectedActivities.length > 0 && (
                             <div className="space-y-6 pt-8 border-t border-brown/5">
                                <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-olive ml-2">Experience Stack</span>
                                <div className="space-y-4">
                                   {selectedActivities.map(id => (
                                     <div key={id} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                           <div className="w-1 h-1 rounded-full bg-olive/30" />
                                           <span className="text-sm font-medium text-brown/70 truncate max-w-[150px]">{ACTIVITIES.find(a => a.id === id)?.title}</span>
                                        </div>
                                        {activityTimes[id] && (
                                          <span className="text-[9px] font-bold text-gold uppercase tracking-[0.1em]">{activityTimes[id]}</span>
                                        )}
                                     </div>
                                   ))}
                                </div>
                             </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}