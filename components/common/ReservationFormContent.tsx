'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ACTIVITIES, ZONES, JOURNEY_TYPES, PROGRAMS } from '@/lib/constants';
import { Journey, Program } from '@/lib/types';
import { 
  Check, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Download, 
  Smartphone,
  ChevronRight,
  Users,
  Moon,
  Sun,
  Sparkles,
  Compass,
  Layers
} from 'lucide-react';
import { generatePassPDF } from '@/lib/pdf';
import QRCode from 'qrcode';
import { ImageWithFallback } from './ImageWithFallback';
import { IMAGE_MAP } from '@/lib/imageMap';

const ACCOMMODATIONS = [
  { id: 'ocean-villa', name: 'Ocean Villa', price: 'Included', image: IMAGE_MAP.accommodation['ocean-villa'] },
  { id: 'garden-suite', name: 'Garden Suite', price: 'Included', image: IMAGE_MAP.accommodation['garden-suite'] },
  { id: 'cliff-residence', name: 'Cliff Residence', price: '+$500/night', image: IMAGE_MAP.accommodation['cliff-residence'] },
];

const INTENTIONS = [
  'Relaxation', 'Healing', 'Family Bonding', 'Personal Growth', 'Creativity', 'Spirituality'
];

export function ReservationFormContent() {
  const [step, setStep] = useState(1);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [stayDetails, setStayDetails] = useState({
    arrivalDate: '',
    departureDate: '',
    arrivalTime: '',
    accommodation: 'ocean-villa',
    intentions: [] as string[],
    guestName: ''
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const reservationId = 'META-Z6KVOXSBG';

  useEffect(() => {
    if (step === 6) {
      QRCode.toDataURL(reservationId).then(setQrCodeUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleActivity = (id: string) => {
    const activity = ACTIVITIES.find(a => a.id === id);
    if (!activity) return;

    setSelectedActivities(prev => {
      if (prev.includes(id)) {
        return prev.filter(a => a !== id);
      } else {
        const max = selectedProgram ? parseInt(selectedProgram.experienceCount) : 10;
        if (prev.length < max) {
          return [...prev, id];
        }
        return prev;
      }
    });
  };

  const toggleIntention = (intention: string) => {
    setStayDetails(prev => ({
      ...prev,
      intentions: prev.intentions.includes(intention)
        ? prev.intentions.filter(i => i !== intention)
        : [...prev.intentions, intention]
    }));
  };

  const selectedDetails = ACTIVITIES.filter(a => selectedActivities.includes(a.id));
  const totalDuration = selectedDetails.reduce((sum, a) => {
    const dur = parseInt(a.duration) || 0;
    return sum + dur;
  }, 0);
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleDownloadPDF = () => {
    generatePassPDF(
      stayDetails.guestName || 'Valued Guest',
      selectedJourney?.title || 'Solo',
      selectedProgram?.name || 'Luxury Retreat',
      selectedDetails.map(a => a.title),
      reservationId,
      stayDetails.arrivalDate
    );
  };

  const renderItineraryPanel = () => (
    <aside className="w-full lg:w-[400px] bg-white border border-stone-100 rounded-[32px] p-10 shadow-luxury lg:sticky lg:top-32 h-fit space-y-10">
      <div className="space-y-2">
        <h3 className="text-2xl font-serif text-brown uppercase tracking-widest">Your Itinerary</h3>
        <div className="h-px bg-stone-100 w-full" />
      </div>

      <div className="space-y-8">
        {selectedJourney && (
          <div className="space-y-2 group">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold group-hover:text-olive transition-colors">Journey Path</p>
            <div className="p-4 bg-offWhite rounded-2xl border border-stone-50 flex items-center gap-4">
               <Compass size={20} className="text-olive/40" />
               <p className="font-serif text-lg text-brown italic">{selectedJourney.title}</p>
            </div>
          </div>
        )}

        {selectedProgram && (
          <div className="space-y-2 group">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold group-hover:text-olive transition-colors">Selected Program</p>
            <div className="p-4 bg-offWhite rounded-2xl border border-stone-50 flex items-center gap-4">
               <Layers size={20} className="text-olive/40" />
               <p className="font-serif text-lg text-brown italic">{selectedProgram.name}</p>
            </div>
          </div>
        )}

        {selectedDetails.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Curated Experiences ({selectedDetails.length})</p>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {selectedDetails.map((act, idx) => (
                <div key={act.id} className="flex justify-between items-center gap-4 text-sm group p-3 hover:bg-ivory rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-olive font-bold opacity-30">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-brown font-light">{act.title}</span>
                  </div>
                  <button onClick={() => toggleActivity(act.id)} className="text-[8px] text-stone-300 hover:text-red-400 uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-stone-100 space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Total Duration</p>
              <p className="text-3xl font-serif text-brown">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</p>
            </div>
            {selectedProgram && (
              <div className="text-right space-y-1">
                <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Capacity</p>
                <p className="text-sm font-serif text-olive italic">{selectedDetails.length} of {selectedProgram.experienceCount.split(' ')[0]}</p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-brown text-ivory rounded-[24px] shadow-lg space-y-1">
             <p className="text-[10px] text-ivory/60 uppercase tracking-[0.2em] font-bold">Estimated Investment</p>
             <p className="text-2xl font-serif">$2,450 <span className="text-[10px] opacity-40 uppercase font-sans tracking-normal font-bold ml-2">USD</span></p>
          </div>
        </div>
      </div>

      <button 
        onClick={nextStep}
        disabled={
          (step === 1 && !selectedJourney) || 
          (step === 2 && !selectedProgram) || 
          (step === 3 && selectedActivities.length === 0) ||
          (step === 4 && (!stayDetails.guestName || !stayDetails.arrivalDate))
        }
        className="w-full bg-brown text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-olive hover:shadow-luxury disabled:opacity-20 flex items-center justify-center gap-3"
      >
        Continue Journey <ArrowRight size={14} />
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-offWhite py-24 md:py-40">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CHOOSE YOUR JOURNEY */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-6">
                <span className="text-olive uppercase tracking-[0.5em] text-xs font-bold">The Beginning</span>
                <h1 className="text-5xl md:text-8xl font-serif text-brown italic leading-tight">Choose Your Journey</h1>
                <p className="text-stone-500 font-light text-xl max-w-2xl mx-auto">Define the foundation of your personalized sanctuary experience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {Object.values(JOURNEY_TYPES).map((opt) => (
                  <motion.div 
                    key={opt.id}
                    whileHover={{ y: -10 }}
                    onClick={() => { setSelectedJourney(opt); nextStep(); }}
                    className="group relative h-[600px] rounded-[40px] overflow-hidden cursor-pointer shadow-luxury transition-all duration-700"
                  >
                    <ImageWithFallback 
                      src={IMAGE_MAP.journeys[opt.id as keyof typeof IMAGE_MAP.journeys] || IMAGE_MAP.fallback}
                      alt={opt.title} 
                      fill 
                      className="object-cover brightness-[0.6] group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-12 flex flex-col justify-end text-white space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-px bg-olive" />
                         <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-olive">{opt.subtitle}</span>
                      </div>
                      <h3 className="text-4xl font-serif italic">{opt.title}</h3>
                      <p className="text-sm font-light opacity-80 leading-relaxed max-w-xs">{opt.description}</p>
                      <div className="pt-6 flex items-center justify-between border-t border-white/10">
                        <div className="flex items-center gap-2">
                           <Users size={14} className="text-olive" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{opt.groupSize}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brown transition-all">
                           <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: CHOOSE YOUR PROGRAM */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="max-w-6xl mx-auto">
              <div className="text-center mb-20 space-y-6">
                <button onClick={prevStep} className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-brown transition-colors">← Back to Journeys</button>
                <h2 className="text-5xl md:text-7xl font-serif text-brown italic">Select Your Program</h2>
                <p className="text-stone-500 font-light text-lg">Choose a duration that aligns with your intention.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROGRAMS.filter(p => p.applicableJourneys.includes(selectedJourney?.id || '')).map((p) => (
                  <motion.div 
                    key={p.id}
                    whileHover={{ y: -5 }}
                    onClick={() => { setSelectedProgram(p); nextStep(); }}
                    className={`p-10 rounded-[32px] border cursor-pointer transition-all duration-500 flex flex-col justify-between h-[350px] ${selectedProgram?.id === p.id ? 'bg-brown text-ivory border-brown shadow-luxury' : 'bg-white border-stone-100 hover:border-olive hover:shadow-md'}`}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${selectedProgram?.id === p.id ? 'text-olive' : 'text-stone-400'}`}>{p.duration}</span>
                        {p.includesAccommodation && <Moon size={16} className="opacity-40" />}
                      </div>
                      <h3 className="text-3xl font-serif italic">{p.name}</h3>
                      <p className={`text-sm font-light leading-relaxed ${selectedProgram?.id === p.id ? 'opacity-80' : 'text-stone-500'}`}>{p.description}</p>
                    </div>
                    <div className="pt-6 border-t border-current opacity-20 flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-widest">{p.experienceCount}</span>
                       <ArrowRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3 & 4: CURATION + STAY DESIGN */}
          {(step === 3 || step === 4) && (
            <motion.div key="steps-split" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col lg:flex-row gap-16 max-w-[1500px] mx-auto">
              <div className="flex-1 space-y-24">
                
                {step === 3 && (
                  <div className="space-y-24">
                    <header className="space-y-6">
                       <div className="flex items-center gap-4">
                         <button onClick={prevStep} className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-brown">← Programs</button>
                         <div className="h-px w-12 bg-stone-200" />
                         <span className="text-olive uppercase tracking-[0.4em] text-xs font-bold">Step 03</span>
                       </div>
                       <h2 className="text-5xl md:text-8xl font-serif text-brown italic">Curate Experiences</h2>
                       <p className="text-stone-500 font-light text-xl">Select up to {selectedProgram?.experienceCount.split(' ')[0]} experiences to weave into your sanctuary itinerary.</p>
                    </header>
                    
                    {ZONES.map((zone) => (
                      <div key={zone.id} className="space-y-12">
                        <div className="flex items-center gap-6">
                           <h3 className="text-2xl font-serif text-brown uppercase tracking-widest italic">{zone.name}</h3>
                           <div className="h-px flex-1 bg-brown/10" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8">
                          {ACTIVITIES.filter(a => a.zoneId === zone.id).map((act) => (
                            <motion.div 
                              key={act.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => toggleActivity(act.id)}
                              className={`group relative rounded-[32px] overflow-hidden cursor-pointer aspect-[4/3] shadow-lg transition-all duration-700 ${selectedActivities.includes(act.id) ? 'ring-4 ring-olive ring-offset-4 ring-offset-offWhite' : ''}`}
                            >
                              <ImageWithFallback 
                                src={IMAGE_MAP.activities[act.id as keyof typeof IMAGE_MAP.activities] || IMAGE_MAP.activities.default}
                                alt={act.title} 
                                fill 
                                className="object-cover brightness-75 group-hover:scale-110 transition-transform duration-1000" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-3">
                                 <div className="flex justify-between items-start">
                                    <h4 className="text-2xl font-serif italic">{act.title}</h4>
                                    {selectedActivities.includes(act.id) && (
                                       <div className="bg-olive p-2 rounded-full">
                                          <Check size={16} />
                                       </div>
                                    )}
                                 </div>
                                 <p className="text-xs font-light opacity-70 line-clamp-2">{act.description}</p>
                                 <div className="pt-4 flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold opacity-60">
                                    <div className="flex items-center gap-1"><Clock size={12} /> {act.duration}</div>
                                    <div className="flex items-center gap-1"><Sparkles size={12} /> {zone.name.split(' ')[0]}</div>
                                 </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-24">
                    <header className="space-y-6">
                       <div className="flex items-center gap-4">
                         <button onClick={prevStep} className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-brown">← Experiences</button>
                         <div className="h-px w-12 bg-stone-200" />
                         <span className="text-olive uppercase tracking-[0.4em] text-xs font-bold">Step 04</span>
                       </div>
                       <h2 className="text-5xl md:text-8xl font-serif text-brown italic">Design Your Stay</h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div className="space-y-12">
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-brown/20 py-6 focus:outline-none focus:border-olive transition-colors font-serif text-3xl italic text-brown placeholder:text-stone-200" 
                            placeholder="Guest Name"
                            value={stayDetails.guestName}
                            onChange={(e) => setStayDetails({...stayDetails, guestName: e.target.value})}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Arrival Date</label>
                              <div className="relative">
                                 <Calendar size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-olive" />
                                 <input 
                                   type="date" 
                                   className="w-full bg-transparent border-b border-brown/20 py-4 pl-8 focus:outline-none focus:border-olive transition-colors font-light" 
                                   onChange={(e) => setStayDetails({...stayDetails, arrivalDate: e.target.value})}
                                 />
                              </div>
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Preferred Time</label>
                              <div className="relative">
                                 <Sun size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-olive" />
                                 <select 
                                   className="w-full bg-transparent border-b border-brown/20 py-4 pl-8 focus:outline-none focus:border-olive transition-colors font-light appearance-none"
                                   onChange={(e) => setStayDetails({...stayDetails, arrivalTime: e.target.value})}
                                 >
                                   <option value="">Select Time</option>
                                   <option value="morning">Morning (09:00 - 12:00)</option>
                                   <option value="afternoon">Afternoon (14:00 - 17:00)</option>
                                   <option value="evening">Evening (18:00 - 21:00)</option>
                                 </select>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Accommodation Type</label>
                           <div className="grid grid-cols-1 gap-6">
                              {ACCOMMODATIONS.map(acc => (
                                <label key={acc.id} className={`flex items-center gap-6 p-6 rounded-[24px] border cursor-pointer transition-all duration-500 group ${stayDetails.accommodation === acc.id ? 'bg-brown text-ivory border-brown shadow-luxury' : 'bg-white border-stone-100 hover:border-olive'}`}>
                                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                     <ImageWithFallback src={acc.image} alt={acc.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1">
                                     <h4 className="font-serif text-xl italic">{acc.name}</h4>
                                     <p className={`text-xs font-light ${stayDetails.accommodation === acc.id ? 'opacity-60' : 'text-stone-400'}`}>Luxury dwelling with premium amenities.</p>
                                  </div>
                                  <div className="text-right">
                                     <input 
                                       type="radio" 
                                       name="acc" 
                                       className="accent-olive hidden" 
                                       checked={stayDetails.accommodation === acc.id}
                                       onChange={() => setStayDetails({...stayDetails, accommodation: acc.id})}
                                     />
                                     <span className="text-[10px] uppercase tracking-widest font-bold">{acc.price}</span>
                                  </div>
                                </label>
                              ))}
                           </div>
                        </div>
                      </div>

                      <div className="space-y-12">
                        <div className="space-y-8 p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm">
                           <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Special Intentions</label>
                           <p className="text-sm text-stone-500 font-light italic">What is the focus of your sanctuary journey?</p>
                           <div className="flex flex-wrap gap-3">
                              {INTENTIONS.map(intention => (
                                <button
                                  key={intention}
                                  onClick={() => toggleIntention(intention)}
                                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${stayDetails.intentions.includes(intention) ? 'bg-olive text-white' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}
                                >
                                  {intention}
                                </button>
                              ))}
                           </div>
                        </div>
                        
                        <div className="space-y-6 p-10 bg-brown/5 rounded-[40px] border border-brown/10">
                           <h4 className="font-serif text-2xl text-brown italic">Concierge Note</h4>
                           <p className="text-stone-600 font-light text-sm leading-relaxed italic">
                             &quot;Your selection of the {selectedProgram?.name} for your {selectedJourney?.title} suggests a focus on {stayDetails.intentions.length > 0 ? stayDetails.intentions.join(' & ') : 'comprehensive renewal'}. Our artisans are already preparing your {stayDetails.accommodation.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} for your arrival.&quot;
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
              {renderItineraryPanel()}
            </motion.div>
          )}

          {/* STEP 5: RESERVATION ESTABLISHED (THE ARRIVAL MOMENT) */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto py-6 md:py-12">
              <div className="relative h-[650px] md:h-[850px] rounded-[80px] overflow-hidden shadow-luxury flex items-center justify-center">
                <ImageWithFallback 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr6xfTe--1zrUWfVDhbj3sl6dYwZSRyxuSq-9pOTT31F_i9t_RENnuOkvWvjSMpoUb6E5mkvpRprlNig8e7337os3KnD4_wufefBTcyJHma0VZ-vruc_p-CjllwSRz0VOtKF1vjzxZBRYev5NqA3huSrzqVbKmTBSD0f0VhVL67Xc-cw1beuWy3AtjtoEEyc1c3OaIZzS2dOWGG5s4Gjua28SXy0n82FYmHkPewxjSVATeNhQL2VSM687f0xXyIKsWAm7am0uwE4dX" 
                  alt="Zen Sanctuary" 
                  fill 
                  className="object-cover brightness-[0.3] scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                
                <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col items-center text-center space-y-16">
                   <motion.div 
                     initial={{ opacity: 0, y: 50 }} 
                     animate={{ opacity: 1, y: 0 }} 
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="space-y-6"
                   >
                      <span className="text-olive uppercase tracking-[1.5em] text-[10px] font-bold block opacity-80 mb-12">Establishing Your Sanctuary</span>
                      <h2 className="text-6xl md:text-[140px] font-serif text-white italic leading-[0.85] tracking-tighter">Established</h2>
                   </motion.div>
                   
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: "200px" }} 
                     transition={{ delay: 1, duration: 2 }} 
                     className="h-[0.5px] bg-olive" 
                   />
                   
                   <motion.div
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     transition={{ delay: 1.8, duration: 1.5 }}
                     className="space-y-10"
                   >
                     <p className="text-ivory/80 font-serif text-2xl md:text-4xl italic max-w-3xl mx-auto leading-tight">
                       Your unique frequency has been acknowledged. The gates are preparing for your return.
                     </p>
                     
                     {/* Elegant horizontal info bar instead of grid */}
                     <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 pt-12 border-t border-white/10">
                        <div className="text-left space-y-1">
                           <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-olive">Reference</p>
                           <p className="text-xl font-serif text-white italic">{reservationId}</p>
                        </div>
                        <div className="text-left space-y-1">
                           <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-olive">Foundation</p>
                           <p className="text-xl font-serif text-white italic">{selectedJourney?.title}</p>
                        </div>
                        <div className="text-left space-y-1">
                           <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-olive">Check-in</p>
                           <p className="text-xl font-serif text-white italic">{stayDetails.arrivalDate || 'June 2026'}</p>
                        </div>
                     </div>
                   </motion.div>

                   <motion.button 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 2.5, duration: 1 }}
                     onClick={nextStep}
                     className="bg-white text-brown px-20 py-8 rounded-full font-bold uppercase tracking-[0.8em] text-[10px] hover:bg-olive hover:text-white transition-all shadow-3xl flex items-center gap-8 group"
                   >
                     Collect Your Key <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-700" />
                   </motion.button>
                </div>
              </div>

              {/* Storytelling Footer */}
              <div className="mt-16 text-center space-y-8 max-w-4xl mx-auto px-6">
                 <p className="text-brown/40 font-serif text-lg italic leading-relaxed">
                   &quot;Within the next 24 hours, your personal guide will finalize the choreography of your stay. Every scent, every sound, every moment is being aligned with your intentions.&quot;
                 </p>
                 <div className="flex justify-center items-center gap-6">
                    <div className="h-px w-12 bg-brown/10" />
                    <Sparkles size={16} className="text-olive/30" />
                    <div className="h-px w-12 bg-brown/10" />
                 </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: DIGITAL KEY EXPERIENCE (THE MEMBERSHIP CARD) */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-12 flex flex-col items-center">
              <header className="text-center space-y-6 mb-20">
                 <span className="text-olive uppercase tracking-[1em] text-[10px] font-bold">The Digital Key</span>
                 <h2 className="text-6xl md:text-8xl font-serif text-brown italic">Your Invitation</h2>
              </header>

              {/* THE LUXURY PHYSICAL CARD FEEL */}
              <div className="relative w-full aspect-[1.58/1] max-w-2xl rounded-[60px] overflow-hidden shadow-[0_80px_150px_-30px_rgba(78,59,46,0.35)] group border border-brown/5">
                 <ImageWithFallback 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjEo1Q2Hal7c7IJjB-4oVuyWHbBSg5MlcViS7G7gSLWXtLJabNR_EGu-uf_WZAMsCn4W9AGF0ow40jhITtm1ofqibcw96VRvVoUYX5rCe2VI3jbzLZPSgyPvCDy4CsIynMReRIwdKupgKTe_xQKDH8dq93ZUtdg-tEWpFMCRah0QM2poTVHdRmJR3ZUseAi6VVNElbOvG7vjrx4Mjyd3blF0xW4XBKGEZf7lJBVo-P-vkeQJcQQY0fDtD0KMImz_nNfOoN2OVu8ULj" 
                    alt="Sanctuary Pass Background" 
                    fill 
                    className="object-cover brightness-[0.1] contrast-125 scale-105 group-hover:scale-110 transition-transform duration-[5s]" 
                 />
                 
                 {/* Card Content with enhanced hierarchy */}
                 <div className="absolute inset-0 p-16 flex flex-col justify-between text-white border-[0.5px] border-white/10 m-6 rounded-[54px] bg-white/[0.02] backdrop-blur-[12px]">
                    <div className="flex justify-between items-start">
                       <div className="space-y-2">
                          <p className="text-[12px] uppercase tracking-[1em] font-bold text-olive">METANOIA</p>
                          <h4 className="text-5xl font-serif tracking-[0.15em] italic opacity-80">META-PASS</h4>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-3xl bg-white/5">
                             <Sparkles className="text-olive" size={32} />
                          </div>
                          <span className="text-[7px] uppercase tracking-[0.4em] font-bold text-white/40">Secured via Metanoia-X</span>
                       </div>
                    </div>

                    <div className="flex justify-between items-end">
                       <div className="space-y-10 flex-1">
                          <div className="space-y-2">
                             <p className="text-[9px] uppercase tracking-[0.6em] font-bold opacity-30">Sanctuary Resident</p>
                             <p className="text-5xl font-serif italic text-white tracking-widest">{stayDetails.guestName || 'Valued Guest'}</p>
                          </div>
                          
                          <div className="flex gap-16 pt-10 border-t border-white/5">
                             <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-30">Foundation</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{selectedJourney?.id}</p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-30">Program</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{selectedProgram?.name.split(' ')[0]}</p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-30">Reference</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{reservationId}</p>
                             </div>
                          </div>
                       </div>
                       
                       {qrCodeUrl && (
                         <div className="bg-white p-5 rounded-[40px] shadow-2xl group-hover:scale-105 transition-transform duration-700 relative">
                           <Image src={qrCodeUrl} alt="QR Key" width={112} height={112} unoptimized className="w-28 h-28" />
                           <div className="absolute inset-0 rounded-[40px] border border-brown/10 pointer-events-none" />
                         </div>
                       )}
                    </div>
                 </div>
                 
                 {/* High-tech sensory markers */}
                 <div className="absolute top-12 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-olive/40 to-transparent" />
                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-olive/40 to-transparent" />
              </div>

              {/* Interactive Suite */}
              <div className="w-full max-w-2xl mt-20 space-y-10">
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-between p-12 bg-white border border-stone-100 rounded-[50px] hover:border-brown transition-all group shadow-sm hover:shadow-luxury"
                >
                  <div className="flex items-center gap-10">
                    <div className="w-20 h-20 rounded-[30px] bg-offWhite flex items-center justify-center text-brown group-hover:bg-brown group-hover:text-white transition-all duration-700">
                       <Download size={28} />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-bold uppercase tracking-[0.4em] text-brown">Download Personal Dossier</p>
                      <p className="text-[11px] text-stone-400 font-light uppercase tracking-[0.3em] mt-2">A complete ritual guide for your arrival</p>
                    </div>
                  </div>
                  <ChevronRight size={28} className="text-stone-200 group-hover:translate-x-4 transition-transform duration-700" />
                </button>

                <div className="grid grid-cols-2 gap-8">
                  <button className="flex items-center justify-center gap-6 p-10 bg-black text-white rounded-[40px] text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-stone-900 transition-all shadow-2xl group">
                    <Smartphone size={24} className="group-hover:translate-y-[-4px] transition-transform" /> Add to Apple Wallet
                  </button>
                  <button className="flex items-center justify-center gap-6 p-10 bg-stone-50 text-brown rounded-[40px] text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-stone-100 transition-all border border-stone-200 group">
                    <Smartphone size={24} className="group-hover:translate-y-[-4px] transition-transform" /> Google Pay Pass
                  </button>
                </div>
              </div>

              <footer className="mt-24 w-full pt-16 border-t border-brown/5 flex justify-between items-center text-[10px] uppercase tracking-[0.5em] font-bold text-brown/30">
                 <button className="hover:text-olive transition-colors">Concierge Assistance</button>
                 <div className="h-1 w-1 rounded-full bg-brown/20" />
                 <button className="hover:text-olive transition-colors">Sanctuary Coordinates</button>
                 <div className="h-1 w-1 rounded-full bg-brown/20" />
                 <button className="hover:text-olive transition-colors">Security Handover</button>
              </footer>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d2b48c;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8b4513;
        }
      `}</style>
    </div>
  );
}
