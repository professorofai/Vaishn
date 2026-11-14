import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: '#F6F0E8', deep: '#EDE3D5' },
        burgundy: { DEFAULT: '#5A2536', dark: '#3E1624', light: '#7A3348' },
        gold: { DEFAULT: '#B89558', light: '#D8BC85', dark: '#8F6F38' },
        charcoal: '#24211F',
      },
      fontFamily: { display: ['var(--font-serif)'], sans: ['var(--font-sans)'] },
    },
  },
  plugins: [],
};
export default config;
