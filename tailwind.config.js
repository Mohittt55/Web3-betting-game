/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        freckle: ['var(--font-freckle)'],
        outfit: ['var(--font-outfit)'],
        press: ['var(--font-pressstart)'],
        urbanist: ['var(--font-urbanist)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
