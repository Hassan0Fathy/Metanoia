'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ACTIVITIES, ZONES, JOURNEY_TYPES } from '@/lib/constants';
import { 
  Check, 
  Clock, 
  ArrowRight, 
  User, 
  Users, 
  Heart, 
  Sparkles, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Download, 
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { generatePassPDF } from '@/lib/pdf';
import QRCode from 'qrcode';

type GuestType = 'solo' | 'couple' | 'family';

const GUEST_OPTIONS = [
  { 
    id: 'solo' as GuestType, 
    title: 'Solo Retreat', 
    subtitle: 'Internal Odyssey',
    desc: 'A personal voyage of self-discovery and inner peace.', 
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    guests: '1 Guest' 
  },
  { 
    id: 'couple' as GuestType, 
    title: 'Couple Retreat', 
    subtitle: 'Shared Harmony',
    desc: 'Deepen your connection through shared healing experiences.', 
    image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6ca8b8?auto=format&fit=crop&q=80',
    guests: '2 Guests' 
  },
  { 
    id: 'family' as GuestType, 
    title: 'Family Retreat', 
    subtitle: 'Generational Healing',
    desc: 'Create lasting bonds in a space designed for all ages.', 
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80',
    guests: '3-6 Guests' 
  },
];

const ACCOMMODATIONS = [
  { id: 'sanctuary-suite', name: 'Sanctuary Suite', price: 'Included' },
  { id: 'zen-villa', name: 'Zen Villa', price: '+$200/night' },
  { id: 'forest-lodge', name: 'Forest Lodge', price: '+$150/night' },
];

export function ReservationFormContent() {
  const [step, setStep] = useState(1);
  const [guestType, setGuestType] = useState<GuestType | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [stayDetails, setStayDetails] = useState({
    arrivalDate: '',
    departureDate: '',
    arrivalTime: '',
    accommodation: 'sanctuary-suite',
    intentions: '',
    guestName: ''
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const reservationId = 'META-Z6KVOXSBG';

  useEffect(() => {
    if (step === 5) {
      QRCode.toDataURL(reservationId).then(setQrCodeUrl);
    }
  }, [step]);

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const selectedDetails = ACTIVITIES.filter(a => selectedActivities.includes(a.id));
  const totalDuration = selectedDetails.reduce((sum, a) => sum + (parseInt(a.duration) || 0), 0);
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleDownloadPDF = () => {
    generatePassPDF(
      stayDetails.guestName || 'Valued Guest',
      guestType || 'Solo',
      'Luxury Retreat',
      selectedDetails.map(a => a.title),
      reservationId,
      stayDetails.arrivalDate
    );
  };

  const renderSidebar = () => (
    <aside className="w-full lg:w-96 bg-white border border-stone-100 rounded-[32px] p-8 shadow-xl lg:sticky lg:top-32 h-fit space-y-8">
      <div className="space-y-2">
        <h3 className="text-xl font-serif text-brown uppercase tracking-widest">Your Itinerary</h3>
        <p className="text-xs text-olive font-bold uppercase tracking-widest">Step 0{step} of 05</p>
      </div>

      <div className="space-y-6">
        {guestType && (
          <div className="pb-4 border-b border-stone-100 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Journey</p>
              <p className="font-serif text-brown italic capitalize">{guestType} Retreat</p>
            </div>
            <div className="text-olive"><Check size={16}/></div>
          </div>
        )}

        {selectedDetails.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Curated Experiences</p>
            <div className="space-y-3">
              {selectedDetails.map((act) => (
                <div key={act.id} className="flex justify-between items-start gap-4 text-sm group">
                  <span className="text-brown font-light">{act.title}</span>
                  <button onClick={() => toggleActivity(act.id)} className="text-[10px] text-stone-300 hover:text-brown uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-stone-100 space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Est. Duration</p>
              <p className="text-2xl font-serif text-brown">{totalDuration} <span className="text-sm italic opacity-50">min</span></p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Status</p>
              <p className="text-sm font-serif text-olive italic">{step === 5 ? 'Confirmed' : 'Drafting'}</p>
            </div>
          </div>
        </div>
      </div>

      {step < 4 && (
        <button 
          onClick={nextStep}
          disabled={(step === 1 && !guestType) || (step === 2 && selectedActivities.length === 0)}
          className="w-full bg-brown text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-olive hover:shadow-luxury disabled:opacity-20"
        >
          {step === 3 ? 'Finalize Journey' : 'Continue Journey'}
        </button>
      )}
    </aside>
  );

  return (
    <div className="min-h-screen bg-offWhite py-24 md:py-40">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: JOURNEY SELECTION */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <span className="text-olive uppercase tracking-[0.4em] text-xs font-bold">Step 01</span>
                <h1 className="text-5xl md:text-7xl font-serif text-brown italic leading-tight">Choose Your Journey</h1>
                <p className="text-stone-500 font-light text-lg max-w-2xl mx-auto">Define the foundation of your sanctuary experience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {GUEST_OPTIONS.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => { setGuestType(opt.id); nextStep(); }}
                    className="group relative h-[500px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl transition-transform hover:-translate-y-2 duration-500"
                  >
                    <Image src={opt.image} alt={opt.title} fill className="object-cover brightness-75 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">{opt.subtitle}</span>
                      <h3 className="text-3xl font-serif italic">{opt.title}</h3>
                      <p className="text-sm font-light opacity-80 leading-relaxed">{opt.desc}</p>
                      <div className="pt-4 flex items-center justify-between border-t border-white/20">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{opt.guests}</span>
                        <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 & 3: GRID + SIDEBAR */}
          {(step === 2 || step === 3) && (
            <motion.div key="steps-split" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col lg:flex-row gap-12 max-w-[1400px] mx-auto">
              <div className="flex-1 space-y-16">
                
                {step === 2 && (
                  <div className="space-y-16">
                    <header className="space-y-4">
                      <span className="text-olive uppercase tracking-[0.4em] text-xs font-bold">Step 02</span>
                      <h2 className="text-4xl md:text-6xl font-serif text-brown italic">Curate Experiences</h2>
                    </header>
                    
                    {ZONES.map((zone) => (
                      <div key={zone.id} className="space-y-8">
                        <h3 className="text-xl font-serif text-brown uppercase tracking-widest border-b border-brown/10 pb-4">{zone.name}</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {ACTIVITIES.filter(a => a.zoneId === zone.id).map((act) => (
                            <div 
                              key={act.id}
                              onClick={() => toggleActivity(act.id)}
                              className={`p-8 rounded-[24px] border transition-all duration-500 cursor-pointer flex flex-col justify-between aspect-video ${selectedActivities.includes(act.id) ? 'bg-brown text-ivory border-brown' : 'bg-white border-stone-100 hover:border-olive hover:shadow-luxury'}`}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="text-xl font-serif">{act.title}</h4>
                                {selectedActivities.includes(act.id) && <Check size={20} />}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-60">
                                <Clock size={12} /> {act.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-16">
                    <header className="space-y-4">
                      <span className="text-olive uppercase tracking-[0.4em] text-xs font-bold">Step 03</span>
                      <h2 className="text-4xl md:text-6xl font-serif text-brown italic">Design Your Stay</h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-brown/20 py-4 focus:outline-none focus:border-olive transition-colors font-light" 
                            placeholder="Guest Name"
                            onChange={(e) => setStayDetails({...stayDetails, guestName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Arrival Date</label>
                          <input 
                            type="date" 
                            className="w-full bg-transparent border-b border-brown/20 py-4 focus:outline-none focus:border-olive transition-colors font-light" 
                            onChange={(e) => setStayDetails({...stayDetails, arrivalDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Arrival Time</label>
                          <select 
                            className="w-full bg-transparent border-b border-brown/20 py-4 focus:outline-none focus:border-olive transition-colors font-light"
                            onChange={(e) => setStayDetails({...stayDetails, arrivalTime: e.target.value})}
                          >
                            <option value="">Preferred Time</option>
                            <option value="morning">Morning (09:00 - 12:00)</option>
                            <option value="afternoon">Afternoon (14:00 - 17:00)</option>
                            <option value="evening">Evening (18:00 - 21:00)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Accommodation</label>
                          <div className="space-y-4 pt-4">
                            {ACCOMMODATIONS.map(acc => (
                              <label key={acc.id} className="flex items-center justify-between p-4 border border-stone-100 rounded-xl cursor-pointer hover:border-olive transition-colors group">
                                <div className="flex items-center gap-3">
                                  <input 
                                    type="radio" 
                                    name="acc" 
                                    className="accent-olive" 
                                    checked={stayDetails.accommodation === acc.id}
                                    onChange={() => setStayDetails({...stayDetails, accommodation: acc.id})}
                                  />
                                  <span className="text-sm font-light text-brown">{acc.name}</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-olive">{acc.price}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Special Intentions</label>
                          <textarea 
                            rows={4} 
                            className="w-full bg-transparent border border-brown/10 p-4 rounded-xl focus:outline-none focus:border-olive transition-colors font-light text-sm" 
                            placeholder="How can we best support your journey?"
                            onChange={(e) => setStayDetails({...stayDetails, intentions: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
              {renderSidebar()}
            </motion.div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto text-center space-y-12">
              <div className="relative h-96 rounded-[40px] overflow-hidden flex items-center justify-center shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1544161515-4ae6ce6ca8b8?auto=format&fit=crop&q=80" 
                  alt="Sanctuary" 
                  fill 
                  className="object-cover brightness-50" 
                />
                <div className="relative z-10 space-y-6">
                  <span className="text-olive uppercase tracking-[0.6em] text-sm font-bold block">Sanctuary Reserved</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-white italic">Your Sanctuary Awaits</h2>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-8">
                <p className="text-stone-600 font-light text-lg leading-relaxed">
                  We have successfully choreographed your journey. A specialized Metanoia Sanctuary Pass is being prepared for your arrival on <span className="font-serif italic text-brown">{stayDetails.arrivalDate || 'your arrival date'}</span>.
                </p>
                <div className="py-8 border-y border-brown/10 flex flex-col md:flex-row justify-center gap-12 text-sm uppercase tracking-[0.2em] font-bold text-stone-400">
                  <div className="space-y-1">
                    <p className="text-[10px]">Reference</p>
                    <p className="text-brown">{reservationId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px]">Journey Type</p>
                    <p className="text-brown">{guestType}</p>
                  </div>
                </div>
                <button 
                  onClick={nextStep}
                  className="inline-flex items-center gap-4 bg-brown text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-olive transition-all shadow-luxury"
                >
                  Access Digital Key <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: DIGITAL KEY */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif text-brown italic">Your Digital Key</h2>
                <p className="text-sm text-stone-500 font-light">Present this pass upon arrival at the sanctuary gates.</p>
              </div>

              {/* META-PASS CARD */}
              <div className="relative aspect-[1.58/1] w-full bg-stone-900 rounded-[32px] overflow-hidden p-8 flex flex-col justify-between text-white shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-olive/20 blur-[100px] -mr-32 -mt-32" />
                 <div className="relative z-10 flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-olive">Metanoia Pass</p>
                      <h4 className="text-xl font-serif tracking-widest italic">META-PASS</h4>
                    </div>
                    <CreditCard className="text-olive/40" size={32} />
                 </div>

                 <div className="relative z-10 flex justify-between items-end">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-40">Guest</p>
                        <p className="text-lg font-serif italic">{stayDetails.guestName || 'Valued Guest'}</p>
                      </div>
                      <div className="flex gap-8">
                         <div>
                            <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-40">Journey</p>
                            <p className="text-xs uppercase tracking-widest">{guestType}</p>
                         </div>
                         <div>
                            <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-40">Valid From</p>
                            <p className="text-xs uppercase tracking-widest">{stayDetails.arrivalDate || 'TBD'}</p>
                         </div>
                      </div>
                    </div>
                    
                    {qrCodeUrl && (
                      <div className="bg-white p-2 rounded-xl">
                        <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
                      </div>
                    )}
                 </div>
              </div>

              <div className="space-y-6">
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-between p-6 bg-white border border-stone-100 rounded-2xl hover:border-olive transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-4 text-left">
                    <Download className="text-olive" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brown">Download Pass</p>
                      <p className="text-[10px] text-stone-400 font-light uppercase tracking-widest">Portable PDF Version</p>
                    </div>
                  </div>
                  <ChevronRight className="text-stone-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 p-5 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">
                    <Smartphone size={16} /> Apple Wallet
                  </button>
                  <button className="flex items-center justify-center gap-3 p-5 bg-stone-100 text-brown rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-all">
                    <Smartphone size={16} /> Google Pay
                  </button>
                </div>
              </div>

              <div className="pt-8 text-center border-t border-brown/10">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Concierge Assistance</p>
                <p className="text-sm font-serif italic text-brown mt-2 underline cursor-pointer">Live Chat with Sanctuary Staff</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
