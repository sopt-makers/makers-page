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
      dark1: '#252629',
    },
    fontFamily: {
      sans: ['var(--font-suit)', ...defaultTheme.fontFamily.sans],
      mono: [...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      h0: [
        '70px',
        {
          lineHeight: '140%',
          letterSpacing: '-0.7px',
          fontWeight: '700',
        },
      ],
      h1: [
        '50px',
        {
          lineHeight: '100%',
          letterSpacing: '-0.5px',
          fontWeight: 700,
        },
      ],
      h2: [
        '30px',
        {
          lineHeight: '170%',
          letterSpacing: '-0.3px',
          fontWeight: 600,
        },
      ],
    },
    extend: {},
  },
  plugins: [],
};
