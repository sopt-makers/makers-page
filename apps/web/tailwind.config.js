const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    colors: {
      'black100': '#0F1010',
      'white': '#FFFFFF',
      'main-makers': '#FF6E1D',
      'sub-skyblue': '#5DDBFF',
      'sub-blue': '#1F299C',
      'sub-pink': '#FDBBF9',
      'sub-yellow': '#FFCA00',
      'dark1': '#252629',
    },
    fontFamily: {
      sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      '80-bold': ['5rem', { lineHeight: '130%', letterSpacing: '-0.1rem', fontWeight: 700 }],
      '64-semibold': ['4rem', { lineHeight: '140%', letterSpacing: '-0.08rem', fontWeight: 600 }],
      '60-semibold': ['3.75rem', { lineHeight: '160%', letterSpacing: '-0.075rem', fontWeight: '600' }],
      '40-semibold': ['2.5rem', { lineHeight: '160%', letterSpacing: '-0.05rem', fontWeight: '600' }],
      '32-regular': ['2rem', { lineHeight: '160%', letterSpacing: '0.04rem', fontWeight: '400' }],
      '24-semibold': [
        '1.5rem',
        {
          lineHeight: '150%',
          letterSpacing: '-0.03rem',
          fontWeight: '600',
        },
      ],
      '16-regular': ['1rem', { lineHeight: '1rem', letterSpacing: '-0.02rem', fontWeight: '400' }],
    },
    backgroundImage: {
      'makers-logo':
        'url(https://github.com/sopt-makers/makers-page/assets/97586683/44229318-2879-4e8a-80f5-4de7bd4115c1)',
    },
    extend: {},
  },
  plugins: [],
};
