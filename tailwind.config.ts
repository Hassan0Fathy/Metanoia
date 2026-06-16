import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
      fontFamily: {
        serif: ['Libre Caslon Text', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(5rem, 18vw, 14rem)', { lineHeight: '0.8', letterSpacing: '-0.05em' }],
        'display-xl': ['clamp(4rem, 14vw, 10rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(3.5rem, 11vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(3rem, 9vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'headline-lg': ['clamp(2.25rem, 6vw, 4rem)', { lineHeight: '1.1' }],
        'body-xl': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'label-xs': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.5em' }],
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
