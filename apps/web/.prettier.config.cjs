/**
 * Prettier config for apps/web
 * Tries to include Tailwind plugin if available, but works without it.
 */
const plugins = [];
try {
  // Optional: prettier-plugin-tailwindcss
  plugins.push(require("prettier-plugin-tailwindcss"));
} catch {}

/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 120,
  trailingComma: "all",
  tabWidth: 2,
  endOfLine: "lf",
  plugins,
};
