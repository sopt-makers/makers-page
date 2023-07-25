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
      'gray1': '#3C3D40',
    },
    fontFamily: {
      sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      '80-bold': ['8rem', { lineHeight: '130%', letterSpacing: '-0.16rem', fontWeight: 700 }],
      '64-bold': ['6.4rem', { lineHeight: '130%', letterSpacing: '-0.128rem', fontWeight: 700 }],
      '64-semibold': ['6.4rem', { lineHeight: '140%', letterSpacing: '-0.128rem', fontWeight: 600 }],
      '60-semibold': ['6rem', { lineHeight: '160%', letterSpacing: '-0.12rem', fontWeight: 600 }],
      '40-semibold': ['4rem', { lineHeight: '160%', letterSpacing: '-0.08rem', fontWeight: 600 }],
      '32-regular': ['3.2rem', { lineHeight: '160%', letterSpacing: '0.064rem', fontWeight: 400 }],
      '24-semibold': ['2.4rem', { lineHeight: '150%', letterSpacing: '-0.048rem', fontWeight: 600 }],
      '18-semibold': ['1.8rem', { lineHeight: '150%', letterSpacing: '-0.036rem', fontWeight: 600 }],
      '18-regular': ['1.8rem', { lineHeight: '150%', letterSpacing: '-0.036rem', fontWeight: 400 }],
      '16-regular': ['1.6rem', { lineHeight: '130%', letterSpacing: '-0.128rem', fontWeight: 400 }],
    },
    backgroundImage: {
      'makers-logo':
        'url(https://github.com/sopt-makers/makers-page/assets/97586683/44229318-2879-4e8a-80f5-4de7bd4115c1)',
    },
    extend: {},
  },
  plugins: [],
};
