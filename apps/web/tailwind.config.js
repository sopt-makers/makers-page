const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    colors: {
      'black100': '#0F1010',
      'white': '#FFFFFF',

      'brand-orange': '#FF6E1D',
      'brand-skyblue': '#5DDBFF',
      'brand-blue': '#1F299C',
      'brand-pink': '#FDBBF9',
      'brand-yellow': '#FFCA00',

      'orange-sub': '#5A2507',
      'skyblue-sub': '#005A74',
      'blue-sub': '#A5ACFF',
      'pink-sub': '#8F388A',
      'yellow-sub': '#816600',
      'dark1': '#252629',
      'gray0': '#808388',
      'gray1': '#3C3D40',
      'gray2': '#1C1D1E',
    },
    fontFamily: {
      sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
      emoji: [
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'NotoColorEmoji',
        'Noto Color Emoji',
        'Segoe UI Symbol',
        'Android Emoji',
        'EmojiSymbols',
      ],
    },
    fontSize: {
      '80-bold': ['8rem', { lineHeight: '130%', letterSpacing: '-0.16rem', fontWeight: 700 }],
      '64-bold': ['6.4rem', { lineHeight: '130%', letterSpacing: '-0.128rem', fontWeight: 700 }],
      '64-semibold': ['6.4rem', { lineHeight: '140%', letterSpacing: '-0.128rem', fontWeight: 600 }],
      '60-semibold': ['6rem', { lineHeight: '160%', letterSpacing: '-0.12rem', fontWeight: 600 }],
      '40-semibold': ['4rem', { lineHeight: '160%', letterSpacing: '-0.08rem', fontWeight: 600 }],
      '32-regular': ['3.2rem', { lineHeight: '160%', letterSpacing: '-0.064rem', fontWeight: 400 }],
      '28-regular': ['2.8rem', { lineHeight: '160%', letterSpacing: '-0.064rem', fontWeight: 400 }],
      '24-semibold': ['2.4rem', { lineHeight: '150%', letterSpacing: '-0.048rem', fontWeight: 600 }],
      '18-bold': ['1.8rem', { lineHeight: '140%', letterSpacing: '-0.036rem', fontWeight: 700 }],
      '18-semibold': ['1.8rem', { lineHeight: '150%', letterSpacing: '-0.036rem', fontWeight: 600 }],
      '18-regular': ['1.8rem', { lineHeight: '150%', letterSpacing: '-0.036rem', fontWeight: 400 }],
      '16-bold': ['1.6rem', { lineHeight: '140%', letterSpacing: '-0.036rem', fontWeight: 700 }],
      '16-regular': ['1.6rem', { lineHeight: '130%', letterSpacing: '-0.036rem', fontWeight: 400 }],
      '16-regular-desc': ['1.6rem', { lineHeight: '160%', letterSpacing: '-0.128rem', fontWeight: 400 }],
    },
    backgroundImage: {
      'makers-logo':
        'url(https://github.com/sopt-makers/makers-page/assets/97586683/44229318-2879-4e8a-80f5-4de7bd4115c1)',
    },
    extend: {},
  },
  plugins: [],
};
