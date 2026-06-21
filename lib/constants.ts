/**
 * Constants and static data for METANOIA sanctuary
 */

import { Journey, ExperienceType, Zone, Shop, Activity, Program } from './types';
import { IMAGE_MAP } from './imageMap';

export const BRAND = {
  name: 'METANOIA',
  tagline: 'Restore, Create, Reconnect',
  description: 'A luxury wellness retreat sanctuary for healing, creativity, and personal transformation.',
};

export const COLORS = {
  beige: '#F5F5DC',
  warmBeige: '#D2B48C',
  oliveGreen: '#556B2F',
  brown: '#8B4513',
  offWhite: '#FAF9F6',
};

export const JOURNEY_TYPES: Record<string, Journey> = {
  solo: {
    id: 'solo',
    title: 'Solo Retreat',
    subtitle: 'Internal Odyssey',
    description: 'A journey of reflection and self-discovery.',
    groupSize: '1 Guest',
    image: IMAGE_MAP.journeys.solo,
  },
  couple: {
    id: 'couple',
    title: 'Couple Retreat',
    subtitle: 'Shared Harmony',
    description: 'A shared experience of connection and renewal.',
    groupSize: '2 Guests',
    image: IMAGE_MAP.journeys.couple,
  },
  family: {
    id: 'family',
    title: 'Family Retreat',
    subtitle: 'Generational Healing',
    description: 'A sanctuary designed for meaningful family bonding.',
    groupSize: '3-6 Guests',
    image: IMAGE_MAP.journeys.family,
  },
};

export const PROGRAMS: Program[] = [
  // Solo Retreats
  {
    id: 'solo-day-use',
    name: 'Day Use',
    duration: '4–8 Hours',
    description: 'A focused day of restoration and clarity.',
    experienceCount: '3 curated experiences',
    includesAccommodation: false,
    applicableJourneys: ['solo'],
  },
  {
    id: 'solo-weekend',
    name: 'Weekend Escape',
    duration: '2 Days',
    description: 'A rejuvenating getaway to reset your rhythm.',
    experienceCount: '6 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['solo'],
  },
  {
    id: 'solo-renewal',
    name: '3-Day Renewal',
    duration: '3 Days',
    description: 'Deepen your practice and find lasting peace.',
    experienceCount: '9 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['solo'],
  },
  {
    id: 'solo-transformation',
    name: '7-Day Transformation',
    duration: '7 Days',
    description: 'A comprehensive journey of total metamorphosis.',
    experienceCount: '15 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['solo'],
  },

  // Couple Retreats
  {
    id: 'couple-day',
    name: 'Couple Day Escape',
    duration: '4–8 Hours',
    description: 'A shared day of aquatic and sensory harmony.',
    experienceCount: '3 curated experiences',
    includesAccommodation: false,
    applicableJourneys: ['couple'],
  },
  {
    id: 'couple-weekend',
    name: 'Romantic Weekend',
    duration: '2 Days',
    description: 'Intimate connection in a secluded sanctuary.',
    experienceCount: '6 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['couple'],
  },
  {
    id: 'couple-reconnection',
    name: '3-Day Reconnection',
    duration: '3 Days',
    description: 'Strengthen bonds through guided shared healing.',
    experienceCount: '9 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['couple'],
  },
  {
    id: 'couple-transformation',
    name: '7-Day Transformation',
    duration: '7 Days',
    description: 'A deep shared evolution of spirit and mind.',
    experienceCount: '15 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['couple'],
  },

  // Family Retreats
  {
    id: 'family-gathering',
    name: 'Family Day Gathering',
    duration: '4–8 Hours',
    description: 'Meaningful connection for all generations.',
    experienceCount: '3 curated experiences',
    includesAccommodation: false,
    applicableJourneys: ['family'],
  },
  {
    id: 'family-weekend',
    name: 'Family Weekend Retreat',
    duration: '2 Days',
    description: 'A playground for reconnection and growth.',
    experienceCount: '6 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['family'],
  },
  {
    id: 'family-wellness',
    name: '5-Day Family Wellness',
    duration: '5 Days',
    description: 'Integrating wellness into the family dynamic.',
    experienceCount: '9 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['family'],
  },
  {
    id: 'family-legacy',
    name: '7-Day Legacy Retreat',
    duration: '7 Days',
    description: 'Creating lasting memories and healthy futures.',
    experienceCount: '15 curated experiences',
    includesAccommodation: true,
    applicableJourneys: ['family'],
  },
];

export const ACTIVITIES: Activity[] = [
  // Hydrotherapy Zone
  { 
    id: 'mineral-pool', 
    title: 'Mineral Pool', 
    zoneId: 'hydrotherapy', 
    duration: '60 min', 
    availableTimes: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    description: 'Therapeutic soak in mineral-rich waters for cellular renewal.'
  },
  { 
    id: 'family-hydro', 
    title: 'Family Hydrotherapy', 
    zoneId: 'hydrotherapy', 
    duration: '45 min', 
    availableTimes: ['10:00 AM', '01:00 PM', '03:00 PM'],
    description: 'A shared aquatic experience designed for all generations.'
  },
  { 
    id: 'private-hydro', 
    title: 'Private Hydrotherapy', 
    zoneId: 'hydrotherapy', 
    duration: '60 min', 
    availableTimes: ['09:00 AM', '12:00 PM', '05:00 PM'],
    description: 'Secluded water therapy for ultimate privacy and peace.'
  },
  { 
    id: 'infinity-pool', 
    title: 'Infinity Pool', 
    zoneId: 'hydrotherapy', 
    duration: 'Unlimited', 
    availableTimes: ['All Day'],
    description: 'Boundless vistas meeting the horizon in calm waters.'
  },
  
  // Quiet Zone
  { 
    id: 'yoga-pavilion', 
    title: 'Yoga Pavilion', 
    zoneId: 'quiet', 
    duration: '75 min', 
    availableTimes: ['07:00 AM', '09:00 AM', '05:00 PM'],
    description: 'Mindful movement in an open-air sanctuary.'
  },
  { 
    id: 'counseling', 
    title: 'Counseling', 
    zoneId: 'quiet', 
    duration: '50 min', 
    availableTimes: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    description: 'Professional guidance on your personal path of healing.'
  },
  { 
    id: 'family-therapy', 
    title: 'Family Therapy', 
    zoneId: 'quiet', 
    duration: '90 min', 
    availableTimes: ['11:00 AM', '03:00 PM'],
    description: 'Strengthening bonds through facilitated communication.'
  },
  { 
    id: 'art-therapy', 
    title: 'Art Therapy', 
    zoneId: 'quiet', 
    duration: '120 min', 
    availableTimes: ['10:00 AM', '02:00 PM'],
    description: 'Creative expression as a tool for emotional release.'
  },
  { 
    id: 'music-therapy', 
    title: 'Music Therapy', 
    zoneId: 'quiet', 
    duration: '60 min', 
    availableTimes: ['04:00 PM', '06:00 PM'],
    description: 'Harmonizing the spirit through vibrational healing.'
  },
  { 
    id: 'library', 
    title: 'Library Access', 
    zoneId: 'quiet', 
    duration: 'Unlimited', 
    availableTimes: ['All Day'],
    description: 'A curated collection of wisdom and literature.'
  },
  
  // Organic Farm
  { 
    id: 'pottery-workshop', 
    title: 'Pottery Workshop', 
    zoneId: 'farm', 
    duration: '120 min', 
    availableTimes: ['10:00 AM', '02:00 PM', '04:00 PM'],
    description: 'Tactile creation using earth-born materials.'
  },
  { 
    id: 'farm-experience', 
    title: 'Farm Experience', 
    zoneId: 'farm', 
    duration: '90 min', 
    availableTimes: ['08:00 AM', '10:00 AM'],
    description: 'Reconnect with the rhythm of the land through immersive, hands-on cultivation practices.'
  },
  { 
    id: 'garden-tour', 
    title: 'Organic Garden Tour', 
    zoneId: 'farm', 
    duration: '45 min', 
    availableTimes: ['09:00 AM', '11:00 AM', '03:00 PM'],
    description: 'A mindful exploration of our lush, sustainable gardens, celebrating the interconnectedness of all living things.'
  },
  { 
    id: 'harvest-ritual', 
    title: 'Harvest Ritual', 
    zoneId: 'farm', 
    duration: '60 min', 
    availableTimes: ['07:00 AM', '05:00 PM'],
    description: 'Participate in a sacred gathering, honoring the cycle of growth and the abundance of our earth.'
  },
  { 
    id: 'farm-to-table', 
    title: 'Farm-to-Table Workshop', 
    zoneId: 'farm', 
    duration: '180 min', 
    availableTimes: ['11:00 AM'],
    description: 'Transform seasonal, organic yields into nourishing culinary creations that honor the gifts of nature.'
  },
  { 
    id: 'herbal-tea-ceremony', 
    title: 'Herbal Tea Ceremony', 
    zoneId: 'farm', 
    duration: '60 min', 
    availableTimes: ['02:00 PM', '04:00 PM'],
    description: 'A serene ritual involving the mindful preparation and consumption of organic, farm-grown herbal infusions to harmonize mind and body.'
  },
  
  // Zen Garden
  { 
    id: 'zen-meditation', 
    title: 'Zen Meditation', 
    zoneId: 'quiet', 
    duration: '45 min', 
    availableTimes: ['06:00 AM', '08:00 AM', '06:00 PM'],
    description: 'Silent contemplation amidst minimalist beauty.'
  },
];

export const ZONES: Zone[] = [
  {
    id: 'hydrotherapy',
    name: 'Hydrotherapy Zone',
    description: 'Therapeutic thermal pools, hydro-circuits, steam rituals, and water-based restoration experiences designed for physical and mental renewal.',
    facilities: ['Mineral pools', 'Private chambers', 'Infinity vistas'],
    image: IMAGE_MAP.zones.hydrotherapy,
  },
  {
    id: 'farm',
    name: 'Organic Farm & Workshops Zone',
    description: 'A living organic farm featuring seasonal harvesting, artisan workshops, wellness education, sustainable cooking experiences, and hands-on creativity.',
    facilities: ['Pottery studio', 'Organic gardens', 'Apothecary'],
    image: IMAGE_MAP.zones.farm,
  },
  {
    id: 'quiet',
    name: 'Therapy & Quiet Zone',
    description: 'Private therapy rooms, meditation spaces, mindfulness pavilions, silent gardens, and reflection areas designed for deep inner balance.',
    facilities: ['Yoga pavilion', 'Therapy rooms', 'Curated library'],
    image: IMAGE_MAP.zones.quiet,
  },
  {
    id: 'hotel',
    name: 'Hotel & Suites',
    description: 'Luxury accommodations blending contemporary comfort with nature-inspired architecture, offering immersive wellness hospitality.',
    facilities: ['Luxury rooms', 'Nature architecture', 'Wellness hospitality', 'Deep rest'],
    image: IMAGE_MAP.zones.hotel,
  },
  {
    id: 'shops',
    name: 'Metanoia Shops',
    description: 'Curated retail experiences featuring wellness products, organic goods, artisan crafts, exclusive collections, and lifestyle essentials.',
    facilities: ['Wellness products', 'Organic goods', 'Artisan crafts', 'Lifestyle essentials'],
    image: IMAGE_MAP.zones.shops,
  },
  {
    id: 'amphitheater',
    name: 'Nile Amphitheater',
    description: 'A landmark open-air venue overlooking the Nile, designed for performances, cultural gatherings, ceremonies, concerts, and community experiences.',
    facilities: ['Open-air venue', 'Cultural gatherings', 'Ceremonies', 'Nile vistas'],
    image: IMAGE_MAP.zones.amphitheater,
  },
];

export const SHOPS: Shop[] = [
  {
    id: 'nectar',
    name: 'Nectar',
    tagline: 'Fresh Juice',
    description: 'Revitalizing blends from our organic harvest.',
  },
  {
    id: 'pure-harvest',
    name: 'Pure Harvest',
    tagline: 'Organic Produce',
    description: 'The finest seasonal yields from our sanctuary farm.',
  },
  {
    id: 'aura',
    name: 'Aura',
    tagline: 'Natural Scents',
    description: 'Botanical fragrances to soothe the spirit.',
  },
  {
    id: 'clayed',
    name: 'Clayed',
    tagline: 'Handmade Clay',
    description: 'Artisanal pottery crafted within the sanctuary.',
  },
];

export const EXPERIENCES = ACTIVITIES.map(activity => ({
  id: activity.id,
  title: activity.title,
  description: activity.description || `Experience ${activity.title} in our ${activity.zoneId} zone. Duration: ${activity.duration}.`
}));

export const EXPERIENCE_TYPES: Record<string, ExperienceType> = {
  immersion: {
    id: 'immersion',
    name: 'Deep Immersion',
    duration: '6-8 Hours',
    description: 'A complete day of sensory exploration and internal recalibration.'
  },
  renewal: {
    id: 'renewal',
    name: 'Clinical Renewal',
    duration: '2-3 Days',
    description: 'Science-led therapeutic paths combined with holistic ancient wisdom.'
  },
  transformation: {
    id: 'transformation',
    name: 'Total Transformation',
    duration: '7+ Days',
    description: 'The ultimate evolutionary journey for mind, body, and spiritual essence.'
  }
};

export const CONTACT_INFO = {
  phone: '+1 (800) METANOIA',
  email: 'hello@metanoia.com',
  location: 'Pacific Coast, USA',
};
