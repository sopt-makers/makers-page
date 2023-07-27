/** @type {import("prettier").Options} */
const config = {
  arrowParens: 'always',
  endOfLine: 'lf',
  jsxSingleQuote: true,
  printWidth: 120,
  quoteProps: 'consistent',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindAttributes: ['.*Styles', '.*Style'],
};

module.exports = config;
