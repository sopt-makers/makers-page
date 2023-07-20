const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    colors: {
      black100: '#0F1010',
      white: '#FFFFFF',
      main_makers: '#FF6E1D',
      sub_skyblue: '#5DDBFF',
      sub_blue: '#1F299C',
      sub_pink: '#FDBBF9',
      sub_yellow: '#FFCA00',
    },
    fontFamily: {
      sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [],
};
