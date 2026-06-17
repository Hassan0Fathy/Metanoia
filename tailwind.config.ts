import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#F8F5F1',
        'warmBeige': '#D7C7B8',
        'softBeige': '#EFE7DE',
        'olive': '#6E7650',
        'brown': '#4E3B2E',
        'gold': '#C5A059',
        // Aliases for component compatibility
        'primary-olive': '#6E7650',
        'earth-brown': '#4E3B2E',
        'on-surface': '#3C2F27',
        'on-surface-variant': 'rgba(60, 47, 39, 0.7)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.5rem, 8vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'display-xl': ['clamp(2rem, 6vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(1.6rem, 4vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.3rem, 3vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.1rem, 2.5vw, 2.5rem)', { lineHeight: '1.2' }],
        'headline-lg': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.2' }],
        'headline-md': ['clamp(1.25rem, 3vw, 2rem)', { lineHeight: '1.2' }],
        'headline-sm': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.2' }],
        'body-xl': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'label-sm': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'label-xs': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.5em' }],
        'label-caps': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.2em', fontWeight: '700' }],
      },
      spacing: {
        'section': 'clamp(6rem, 15vw, 12rem)',
        'gutter': 'clamp(2rem, 8vw, 8rem)',
      },
    },
  },
  plugins: [],
};

export default config;
