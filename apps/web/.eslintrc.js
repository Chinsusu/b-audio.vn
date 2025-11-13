/**
 * ESLint config for apps/web (Next.js + TypeScript)
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: false },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  plugins: ["@typescript-eslint", "import", "unused-imports", "react-refresh", "simple-import-sort"],
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    // Imports
    "unused-imports/no-unused-imports": "error",
    // Auto-sort imports/exports; replaces import/order with a fixable rule
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/order": "off",

    // Quality & style
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-var": "error",
    "prefer-const": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",

    // Async/promise (typed rules disabled unless we enable type-aware linting)
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",

    // React / Next
    "react/no-unescaped-entities": "off",
    "react-refresh/only-export-components": "off",
  },
};
