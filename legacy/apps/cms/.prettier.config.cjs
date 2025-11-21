/**
 * Prettier config for apps/cms
 * Works without plugins; Tailwind plugin is web-only.
 */
/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 120,
  trailingComma: "all",
  tabWidth: 2,
  endOfLine: "lf",
};
