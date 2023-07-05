module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["simple-import-sort"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/no-anonymous-default-export": "off",
  },
};
