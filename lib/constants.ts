/**
 * Constants and static data for METANOIA sanctuary
 */

import { Journey, ExperienceType, Zone, Shop, Activity } from './types';

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
    title: 'Solo Journey',
    subtitle: 'Internal Odyssey',
    description: 'A personal voyage of self-discovery and inner peace.',
    groupSize: '1 Guest',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiIhGT7xd5wBYOt2PNQp6dgxuQR7w_HahWCXFy880EOUm325ty20ixrpOyVCTMSYu-GnsgsStykWovZ7wilrEh3oI52EjgK-WkRDeRxHksqDQ2w3Vb9-2UIeHWWDg0frN6-Rn3HBlZVX2MArz1vsRVupIaMuzHvcT9D8eNH3G8cJdTjxPAp8WXfmm3gmoF7xXm0u-CUk4S5ENPqoiYMioBZXctcCl4NEiFXWPBUCtd_zKzv27gQGcTJCX_fiRpgV7FOdIDofXoSLpE',
  },
  couple: {
    id: 'couple',
    title: 'Couple Journey',
    subtitle: 'Shared Harmony',
    description: 'Deepen your connection through shared healing experiences.',
    groupSize: '2 Guests',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCghPpA7AnlOC304erfqtYwd_OjgnkVlUyxmj6ICxHQVQNMGpvYYEkbTLv8g6SCahV-VAsWBUkrWqMJg65-2sEkNyiCUTVDB5dhwn8EvHtRM891T1PPzq0IB_Gfs1M7IaGgfxJb3bT5u8m42EUI4Vty06saqqsF2P9VUgU5HoMIfOgiWbW5qULTl-kNuIw4zVbK_v_M0tLcuvIKs0qXZPciYIO3GXqcwxLWhio4rlMqY-PSKowNBLgtbsKKmk3ikGZmOV4cR6bizKsN',
  },
  family: {
    id: 'family',
    title: 'Family Journey',
    subtitle: 'Generational Healing',
    description: 'Create lasting bonds in a space designed for all ages.',
    groupSize: '3-6 Guests',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZhd4rKBPdldlNidiaTtC9Fr7KFHyQsCa1GQ1lUHuxPDEoq2SKfoMbBjnhcQSHQHHTO8PMtBstXBwFQ9UOPsJs9kQmG5xsa4n1N9hgXwLtCGeaGDL2ludsnwYSppLKTte_fTFf7ty3NHBDAJZ95rDR9KvHKANJL301c2sSUcs0VAn2XNqLZV-VbO1TsB9k2JwnabNqxF_Iy8oy-yjXEDUMN0bPWnazpNtEJgnw5Epvz7YepZ7tXcnhWrATBkXjfY3gZBsKqzIDNkKP',
  },
};

export const EXPERIENCE_TYPES: Record<string, ExperienceType> = {
  'day-use': {
    id: 'day-use',
    name: 'Day Use',
    duration: '1 Day',
    description: 'A focused day of restoration and clarity.',
  },
  'weekly-plan': {
    id: 'weekly-plan',
    name: 'Weekly Plan',
    duration: '7 Days',
    description: 'A comprehensive week-long immersive transformation.',
  },
  'stay-retreat': {
    id: 'stay-retreat',
    name: 'Stay Retreat',
    duration: 'Flexible',
    description: 'An extended stay for profound life shifts.',
  },
};

export const ACTIVITIES: Activity[] = [
  // Hydrotherapy Zone
  { id: 'mineral-pool', title: 'Mineral Pool', zoneId: 'hydrotherapy', duration: '60 min', availableTimes: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
  { id: 'family-hydro', title: 'Family Hydrotherapy', zoneId: 'hydrotherapy', duration: '45 min', availableTimes: ['10:00 AM', '01:00 PM', '03:00 PM'] },
  { id: 'private-hydro', title: 'Private Hydrotherapy', zoneId: 'hydrotherapy', duration: '60 min', availableTimes: ['09:00 AM', '12:00 PM', '05:00 PM'] },
  { id: 'infinity-pool', title: 'Infinity Pool', zoneId: 'hydrotherapy', duration: 'Unlimited', availableTimes: ['All Day'] },
  
  // Quiet Zone
  { id: 'yoga-pavilion', title: 'Yoga Pavilion', zoneId: 'quiet', duration: '75 min', availableTimes: ['07:00 AM', '09:00 AM', '05:00 PM'] },
  { id: 'counseling', title: 'Counseling', zoneId: 'quiet', duration: '50 min', availableTimes: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
  { id: 'family-therapy', title: 'Family Therapy', zoneId: 'quiet', duration: '90 min', availableTimes: ['11:00 AM', '03:00 PM'] },
  { id: 'art-therapy', title: 'Art Therapy', zoneId: 'quiet', duration: '120 min', availableTimes: ['10:00 AM', '02:00 PM'] },
  { id: 'music-therapy', title: 'Music Therapy', zoneId: 'quiet', duration: '60 min', availableTimes: ['04:00 PM', '06:00 PM'] },
  { id: 'library', title: 'Library Access', zoneId: 'quiet', duration: 'Unlimited', availableTimes: ['All Day'] },
  
  // Organic Farm
  { id: 'pottery-workshop', title: 'Pottery Workshop', zoneId: 'farm', duration: '120 min', availableTimes: ['10:00 AM', '02:00 PM', '04:00 PM'] },
  { id: 'farm-experience', title: 'Farm Experience', zoneId: 'farm', duration: '90 min', availableTimes: ['08:00 AM', '10:00 AM'] },
  { id: 'garden-tour', title: 'Organic Garden Tour', zoneId: 'farm', duration: '45 min', availableTimes: ['09:00 AM', '11:00 AM', '03:00 PM'] },
  
  // Zen Garden
  { id: 'zen-meditation', title: 'Zen Meditation', zoneId: 'zen', duration: '45 min', availableTimes: ['06:00 AM', '08:00 AM', '06:00 PM'] },
];

export const ZONES: Zone[] = [
  {
    id: 'hydrotherapy',
    name: 'Hydrotherapy Zone',
    description: 'Immerse yourself in therapeutic waters designed for physical and mental renewal.',
    facilities: ['Mineral pools', 'Private chambers', 'Infinity vistas'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjEo1Q2Hal7c7IJjB-4oVuyWHbBSg5MlcViS7G7gSLWXtLJabNR_EGu-uf_WZAMsCn4W9AGF0ow40jhITtm1ofqibcw96VRvVoUYX5rCe2VI3jbzLZPSgyPvCDy4CsIynMReRIwdKupgKTe_xQKDH8dq93ZUtdg-tEWpFMCRah0QM2poTVHdRmJR3ZUseAi6VVNElbOvG7vjrx4Mjyd3blF0xW4XBKGEZf7lJBVo-P-vkeQJcQQY0fDtD0KMImz_nNfOoN2OVu8ULj',
  },
  {
    id: 'quiet',
    name: 'Quiet Zone',
    description: 'A sanctuary of silence and introspection for deep mental clarity.',
    facilities: ['Yoga pavilion', 'Therapy rooms', 'Curated library'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUti3wpVsm0honubi48xNwjZr5Zu7-tUFI4ecZmSQpOhZx0aha2xZa_H9HtuszrnE261mm2EFN2P8nUu8QrIBhFKBnNcutX4dJvfzJFWcWD2Fiu0dziEUDm2DFWNqu-2F_B6C7O0ZU6reMpOjR1z0dYz8PrvLKAORr6ZZHaNb0ICjSLgNqB3czo7D8YWNNxVu3l1wJAJW198-cIYkiZTyeiUhi8imEvkN3M2rJZtq4POyRJUoPBxQXqSg205IOLoqUvvNUrJSzOJeB',
  },
  {
    id: 'farm',
    name: 'Organic Farm',
    description: 'Connect with the earth and your own creativity through nature and craft.',
    facilities: ['Pottery studio', 'Organic gardens', 'Apothecary'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ73x3eJ5UpVYoVFuXlfIvMy2pnBlYPzG5SdSgaznHgNKq_CU1jcM9NvH5W5dkmOk7amZOmNUHehB9EXhioO_1W53dXg0yT50gtqXjqAzRVgMbNhwPnQqEG3fPDwNev-opPcPAk16qPGop5R93chbk926IIaYVDxdtlL6odpGbd4MIb19iiEk3Rz1TP8rSBsL3SMXXTXP22jdXd2zzWPlHBylUYcglNGtQ8v-MzS9uCFp9KCyaf5ApN8VIlso2yIP6KRY4uy804FCL',
  },
  {
    id: 'zen',
    name: 'Zen Garden',
    description: 'Minimalist beauty and tranquility for profound meditation.',
    facilities: ['Stone gardens', 'Water features', 'Meditation platforms'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr6xfTe--1zrUWfVDhbj3sl6dYwZSRyxuSq-9pOTT31F_i9t_RENnuOkvWvjSMpoUb6E5mkvpRprlNig8e7337os3KnD4_wufefBTcyJHma0VZ-vruc_p-CjllwSRz0VOtKF1vjzxZBRYev5NqA3huSrzqVbKmTBSD0f0VhVL67Xc-cw1beuWy3AtjtoEEyc1c3OaIZzS2dOWGG5s4Gjua28SXy0n82FYmHkPewxjSVATeNhQL2VSM687f0xXyIKsWAm7am0uwE4dX',
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

export const CONTACT_INFO = {
  phone: '+1 (800) METANOIA',
  email: 'hello@metanoia.com',
  location: 'Pacific Coast, USA',
};
