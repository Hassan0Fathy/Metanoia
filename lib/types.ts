/**
 * TypeScript type definitions for METANOIA
 */

/**
 * Journey type
 */
export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  groupSize: string;
  image?: string | any; // Allow StaticImageData from Next.js imports
}

/**
 * Experience type (Duration/Plan)
 */
export interface ExperienceType {
  id: string;
  name: string;
  duration: string;
  description: string;
}

/**
 * Program type for luxury retreat
 */
export interface Program {
  id: string;
  name: string;
  duration: string;
  description: string;
  experienceCount: string;
  includesAccommodation: boolean;
  applicableJourneys: string[];
}

/**
 * Activity type
 */
export interface Activity {
  id: string;
  title: string;
  zoneId: string;
  duration: string;
  availableTimes: string[];
  description?: string;
}

/**
 * Shop type
 */
export interface Shop {
  id: string;
  name: string;
  description: string;
  tagline: string;
  image?: string | any;
}

/**
 * Sanctuary zone
 */
export interface Zone {
  id: string;
  name: string;
  description: string;
  facilities: string[];
  image?: string | any;
  activities?: Activity[];
}

/**
 * Booking data
 */
export interface Booking {
  journeyId: string;
  experienceTypeId: string;
  selectedActivities: {
    activityId: string;
    timeSlot: string;
  }[];
  guestDetails: {
    name: string;
    age: string;
    numberOfGuests: string;
  };
}

/**
 * Component props interfaces
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  className?: string;
  children: React.ReactNode;
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
}

/**
 * Page props
 */
export interface PageProps {
  params?: Record<string, string | string[]>;
  searchParams?: Record<string, string | string[] | undefined>;
}
