import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  {
    // ignores: ["**/*.config.js", "**/.dist/", "./node_modules", ".dist/"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "@typescript-eslint/no-explicit-any": ["off"],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
