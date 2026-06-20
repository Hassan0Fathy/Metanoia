'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const journeyParam = searchParams ? searchParams.get('journey') : null;
  const initialJourney = journeyParam ? JOURNEY_TYPES[journeyParam] || null : null;

  const [step, setStep] = useState(initialJourney ? 2 : 1);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(initialJourney);
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
    <aside className="w-full lg:w-[400px] bg-white border border-stone-200 rounded-[32px] p-10 shadow-2xl lg:sticky lg:top-32 h-fit space-y-10">
      <div className="space-y-2">
        <h3 className="text-2xl font-serif text-brown uppercase tracking-widest">Your Itinerary</h3>
        <div className="h-px bg-stone-200 w-full" />
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
                    className={`p-10 rounded-[32px] border cursor-pointer transition-all duration-500 flex flex-col justify-between h-[350px] ${selectedProgram?.id === p.id ? 'bg-brown text-ivory border-brown shadow-luxury' : 'bg-white border-stone-200 hover:border-olive hover:shadow-lg'}`}
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
                            className="w-full bg-transparent border-b border-brown/20 py-6 focus:outline-none focus:border-olive transition-colors font-serif text-3xl italic text-brown placeholder:text-stone-400" 
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
                                   className="w-full bg-transparent border-b border-brown/20 py-4 pl-8 focus:outline-none focus:border-olive transition-colors font-light text-brown" 
                                   onChange={(e) => setStayDetails({...stayDetails, arrivalDate: e.target.value})}
                                 />
                              </div>
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Preferred Time</label>
                              <div className="relative">
                                 <Sun size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-olive" />
                                 <select 
                                   className="w-full bg-transparent border-b border-brown/20 py-4 pl-8 focus:outline-none focus:border-olive transition-colors font-light appearance-none text-brown"
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
                                <label key={acc.id} className={`flex items-center gap-6 p-6 rounded-[24px] border cursor-pointer transition-all duration-500 group ${stayDetails.accommodation === acc.id ? 'bg-brown text-ivory border-brown shadow-luxury' : 'bg-white border-stone-200 hover:border-olive hover:shadow-md'}`}>
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
                                  className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${stayDetails.intentions.includes(intention) ? 'bg-olive text-white shadow-sm' : 'bg-white text-stone-500 border border-stone-200/80 hover:border-stone-400 hover:bg-stone-50'}`}
                                >
                                  {intention}
                                </button>
                              ))}
                           </div>
                        </div>
                        
                        <div className="space-y-6 p-10 bg-[#FBF9F6] rounded-[40px] border border-brown/15 shadow-sm">
                           <h4 className="font-serif text-2xl text-brown italic">Concierge Note</h4>
                           <p className="text-brown/80 font-light text-sm leading-relaxed italic">
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
              {/* Full-bleed cinematic hero card */}
              <div className="relative h-[70vh] md:h-[90vh] min-h-[600px] rounded-[48px] overflow-hidden shadow-luxury">
                {/* Background image — direct Image, no wrapper */}
                <Image 
                  src="/images/sanctuary-landscape.jpeg" 
                  alt="Metanoia Sanctuary" 
                  fill 
                  className="object-cover" 
                  priority
                />
                {/* Multi-layer overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/40 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                {/* Subtle vignette edges */}
                <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)'}} />

                {/* Content — full height flex layout */}
                <div className="absolute inset-0 flex flex-col justify-between px-12 md:px-20 py-14 md:py-20">
                  
                  {/* Top: Eyebrow label */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-[1px] bg-olive" />
                    <span className="text-olive uppercase tracking-[0.5em] text-[10px] font-bold">Establishing Your Sanctuary</span>
                  </motion.div>

                  {/* Middle: Hero headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
                    className="space-y-6"
                  >
                    <h2 className="text-[clamp(72px,14vw,180px)] font-serif text-white italic leading-[0.85] tracking-tighter">
                      Established
                    </h2>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '160px' }}
                      transition={{ delay: 1.2, duration: 1.8 }}
                      className="h-[1px] bg-olive"
                    />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1.2 }}
                      className="text-white/60 font-serif text-xl md:text-2xl italic max-w-xl"
                    >
                      Your unique frequency has been acknowledged.<br />The gates are preparing for your return.
                    </motion.p>
                  </motion.div>

                  {/* Bottom: Info bar + CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 1.2 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-10"
                  >
                    {/* Reservation metadata */}
                    <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/10">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-olive/80">Reference</p>
                        <p className="text-lg font-serif text-white italic">{reservationId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-olive/80">Journey</p>
                        <p className="text-lg font-serif text-white italic">{selectedJourney?.title}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-olive/80">Arrival</p>
                        <p className="text-lg font-serif text-white italic">{stayDetails.arrivalDate || 'June 2026'}</p>
                      </div>
                    </div>

                    {/* CTA button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.4, duration: 0.8 }}
                      onClick={nextStep}
                      className="shrink-0 bg-white text-brown px-10 md:px-14 py-5 md:py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-olive hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-6 group"
                    >
                      Collect Your Key <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              {/* Storytelling footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="mt-14 text-center space-y-6 max-w-3xl mx-auto px-6"
              >
                <p className="text-brown/40 font-serif text-base md:text-lg italic leading-relaxed">
                  &quot;Within the next 24 hours, your personal guide will finalize the choreography of your stay. Every scent, every sound, every moment is being aligned with your intentions.&quot;
                </p>
                <div className="flex justify-center items-center gap-5">
                  <div className="h-px w-10 bg-brown/10" />
                  <Sparkles size={14} className="text-olive/30" />
                  <div className="h-px w-10 bg-brown/10" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 6: DIGITAL KEY EXPERIENCE (THE MEMBERSHIP CARD) */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-12 flex flex-col items-center">
              <header className="text-center space-y-6 mb-20">
                 <span className="text-olive uppercase tracking-[1em] text-[10px] font-bold">The Digital Key</span>
                 <h2 className="text-6xl md:text-8xl font-serif text-brown italic">Your Invitation</h2>
              </header>

              {/* THE LUXURY CARD — full width, landscape, hotel-key inspired */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                className="w-full group"
              >
                {/* Card shell — dark gradient, no broken image */}
                <div className="relative w-full rounded-[36px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(30,20,10,0.5)]"
                  style={{ background: 'linear-gradient(135deg, #1a1208 0%, #2d1f0e 40%, #1a1208 70%, #0f0a04 100%)' }}
                >
                  {/* Subtle texture overlays */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)'}} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-olive/5 via-transparent to-transparent" />
                  
                  {/* Horizontal accent line */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-olive/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                  {/* Card interior grid */}
                  <div className="relative z-10 p-10 md:p-14 grid grid-cols-[1fr_auto] gap-10 items-stretch min-h-[280px]">
                    
                    {/* Left: All text content */}
                    <div className="flex flex-col justify-between gap-10">
                      
                      {/* Top row: Brand + pass type */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-olive">Metanoia</p>
                          <p className="text-[10px] uppercase tracking-[0.3em] font-light text-white/30">Wellness Sanctuary</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/20">Secured</p>
                          <div className="flex items-center gap-2 justify-end">
                            <div className="w-4 h-4 rounded-full bg-olive/20 flex items-center justify-center">
                              <Sparkles size={8} className="text-olive" />
                            </div>
                            <span className="text-[8px] text-white/20 uppercase tracking-widest">Metanoia-X</span>
                          </div>
                        </div>
                      </div>

                      {/* Center: Guest name — the star */}
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/25">Sanctuary Resident</p>
                        <h3 className="text-4xl md:text-6xl font-serif italic text-white tracking-wide leading-none">
                          {stayDetails.guestName || 'Valued Guest'}
                        </h3>
                      </div>

                      {/* Bottom row: Pass metadata */}
                      <div className="flex items-end gap-x-10 gap-y-4 flex-wrap pt-6 border-t border-white/[0.06]">
                        <div className="space-y-1.5">
                          <p className="text-[8px] uppercase tracking-[0.5em] font-bold text-white/20">Foundation</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{selectedJourney?.title}</p>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="space-y-1.5">
                          <p className="text-[8px] uppercase tracking-[0.5em] font-bold text-white/20">Program</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{selectedProgram?.name}</p>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="space-y-1.5">
                          <p className="text-[8px] uppercase tracking-[0.5em] font-bold text-white/20">Arrival</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{stayDetails.arrivalDate || 'June 2026'}</p>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <div className="space-y-1.5">
                          <p className="text-[8px] uppercase tracking-[0.5em] font-bold text-white/20">Reference</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-olive">{reservationId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: QR Code — clean, contained */}
                    <div className="flex flex-col items-center justify-center gap-4 pl-10 border-l border-white/[0.06]">
                      {qrCodeUrl ? (
                        <>
                          <div className="bg-white p-4 rounded-2xl shadow-2xl">
                            <Image src={qrCodeUrl} alt="QR Key" width={100} height={100} unoptimized className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] block" />
                          </div>
                          <p className="text-[7px] uppercase tracking-[0.4em] font-bold text-white/20 text-center">Scan to Access</p>
                        </>
                      ) : (
                        <div className="w-[110px] h-[110px] rounded-2xl bg-white/5 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Pass type badge — bottom-right corner */}
                  <div className="absolute bottom-6 right-8">
                    <p className="text-[8px] uppercase tracking-[0.6em] font-bold text-white/10">META — PASS</p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="w-full space-y-4"
              >
                {/* Primary: Download */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-between px-10 py-8 bg-brown text-ivory rounded-2xl hover:bg-brown/90 transition-all duration-500 group shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Download size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold uppercase tracking-[0.3em]">Download Personal Dossier</p>
                      <p className="text-[10px] text-ivory/50 font-light uppercase tracking-[0.2em] mt-0.5">A complete ritual guide for your arrival</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-ivory/30 group-hover:translate-x-2 transition-transform duration-500" />
                </button>

                {/* Secondary row: Wallet passes */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-6 px-6 bg-[#0a0a0a] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#1a1a1a] transition-all shadow-md group">
                    <Smartphone size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span>Apple Wallet</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 py-6 px-6 bg-white text-brown rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-50 transition-all shadow-md border border-stone-100 group">
                    <Smartphone size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span>Google Wallet</span>
                  </button>
                </div>
              </motion.div>

              {/* Footer links */}
              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="w-full pt-10 border-t border-brown/5 flex justify-center items-center gap-8 text-[9px] uppercase tracking-[0.5em] font-bold text-brown/25"
              >
                <button className="hover:text-olive transition-colors">Concierge</button>
                <div className="w-1 h-1 rounded-full bg-brown/15" />
                <button className="hover:text-olive transition-colors">Coordinates</button>
                <div className="w-1 h-1 rounded-full bg-brown/15" />
                <button className="hover:text-olive transition-colors">Security</button>
              </motion.footer>
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
