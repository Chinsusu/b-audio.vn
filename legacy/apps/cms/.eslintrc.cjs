/**
 * ESLint config for apps/cms (Strapi v4, Node.js CommonJS)
 */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: 2022, sourceType: "script" },
  extends: ["eslint:recommended", "plugin:promise/recommended"],
  plugins: ["promise", "security"],
  globals: {
    strapi: "readonly",
  },
  rules: {
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-var": "error",
    "prefer-const": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "promise/catch-or-return": "error",
    "promise/always-return": "off",
    // Security plugin rules can be tuned as needed
    "security/detect-object-injection": "off",
    "security/detect-non-literal-fs-filename": "warn",
  },
  overrides: [
    {
      files: ["scripts/**/*.js"],
      env: { node: true },
      rules: {
        curly: "warn",
        "no-console": "off",
        "no-empty": "warn",
      },
    },
  ],
};
