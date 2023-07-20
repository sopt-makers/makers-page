/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
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
