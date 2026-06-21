import heroImage from '../public/images/123.jpeg';

/**
 * Centralized image configuration for METANOIA sanctuary
 * Maps logical entities to reliable, high-quality local image paths.
 * All images are sourced from /public/images/
 */

const IMAGES = {
  hero: heroImage,
  // Sanctuary Zones
  hydrotherapyZone: '/images/Hydrotherapy pools.jpeg',
  organicFarmZone: '/images/Organic farm.jpeg',
  therapyZone: '/images/Zen garden.png',
  hotelZone: '/images/Hotel rooms.jpeg',
  shopsZone: '/images/Shops.jpeg',
  amphitheaterZone: '/images/Nile amphitheater.jpeg',
  // Experiences
  familyHydro: '/images/Family hydrotherapy room.jpeg',
  artTherapy: '/images/Art therapy studio.jpeg',
  massageRoom: '/images/Massage room.jpeg',
  infinityPool: '/images/Infinity pool.jpeg',
  outdoorCafe: '/images/Outdoor cafe.jpeg',
  // Architecture
  layout: '/images/layout.jpeg',
  elevation: '/images/Elevation.png',
};

export const IMAGE_MAP = {
  hero: IMAGES.hero,
  fallback: IMAGES.hotelZone,
  
  // Journey Cards
  journeys: {
    solo: IMAGES.infinityPool,
    couple: IMAGES.outdoorCafe,
    family: IMAGES.familyHydro,
  },
  
  // Accommodation
  accommodation: {
    'ocean-villa': IMAGES.hotelZone,
    'garden-suite': IMAGES.hotelZone,
    'cliff-residence': IMAGES.hotelZone,
  },
  
  // Activities
  activities: {
    default: IMAGES.hero,
    'mineral-pool': IMAGES.infinityPool,
    'family-hydro': IMAGES.familyHydro,
    'private-hydro': IMAGES.massageRoom,
    'infinity-pool': IMAGES.infinityPool,
    'yoga-pavilion': IMAGES.therapyZone,
    counseling: IMAGES.massageRoom,
    'family-therapy': IMAGES.massageRoom,
    'art-therapy': IMAGES.artTherapy,
    'music-therapy': IMAGES.massageRoom,
    library: IMAGES.therapyZone,
    'pottery-workshop': IMAGES.artTherapy,
    'farm-experience': IMAGES.organicFarmZone,
    'garden-tour': IMAGES.organicFarmZone,
    'harvest-ritual': IMAGES.organicFarmZone,
    'farm-to-table': IMAGES.outdoorCafe,
    'herbal-tea-ceremony': IMAGES.outdoorCafe,
    'zen-meditation': IMAGES.therapyZone,
  },
  
  // Sanctuary Zones
  zones: {
    hydrotherapy: IMAGES.hydrotherapyZone,
    farm: IMAGES.organicFarmZone,
    quiet: IMAGES.therapyZone,
    hotel: IMAGES.hotelZone,
    shops: IMAGES.shopsZone,
    amphitheater: IMAGES.amphitheaterZone,
  },

  // Architecture
  architecture: {
    layout: IMAGES.layout,
    elevation: IMAGES.elevation,
  }
};
