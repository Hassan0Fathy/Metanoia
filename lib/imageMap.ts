/**
 * Centralized image configuration for METANOIA sanctuary
 * Maps logical entities to reliable, high-quality local image paths.
 * All images are sourced from /public/images/
 */

const IMAGES = {
  hero: '/images/123.jpeg',
  card1: '/images/BTPBFkviPt8PjEX_yJFXVYWFehggOAZR12GhDsvm8mRcMXx5Mvme0UHWASo__-hENZUpuEGCpTsxLQRgXFg-JKVi7Ly-62Q5b_DAFCGxHuk-tkTxHkiA9hfo0Km1Pooy4.jpeg',
  card2: '/images/Ezv14wqiR7tFGq0zv77AXr334JC3WIBE40OtpizEVSQjUqJ2AA51qiEj0CdvzqiUPhvntLxdA1DBN6LLxF4Ubs5kLZVlFoDNl-1AFRO5yVvbNoY-9g388Jk19a9s4.jpeg',
  card3: '/images/WhatsApp Image 2026-06-14 at 5.36.02 PM.jpeg',
};

export const IMAGE_MAP = {
  hero: IMAGES.hero,
  fallback: IMAGES.card3,
  
  // Journey Cards
  journeys: {
    solo: IMAGES.card1,
    couple: IMAGES.card2,
    family: IMAGES.card3,
  },
  
  // Accommodation
  accommodation: {
    'ocean-villa': IMAGES.card1,
    'garden-suite': IMAGES.card2,
    'cliff-residence': IMAGES.card3,
  },
  
  // Activities
  activities: {
    default: IMAGES.hero,
    'mineral-pool': IMAGES.card1,
    'family-hydro': IMAGES.card2,
    'private-hydro': IMAGES.card3,
    'infinity-pool': IMAGES.card1,
    'yoga-pavilion': IMAGES.card2,
    counseling: IMAGES.card3,
    'family-therapy': IMAGES.card1,
    'art-therapy': IMAGES.card2,
    'music-therapy': IMAGES.card3,
    library: IMAGES.card1,
    'pottery-workshop': IMAGES.card2,
    'farm-experience': IMAGES.card3,
    'garden-tour': IMAGES.card1,
    'zen-meditation': IMAGES.card2,
  },
};
