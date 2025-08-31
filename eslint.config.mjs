// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat"; // flat-config export

export default [
  // Ignore build artifacts
  { ignores: ["dist/**", "node_modules/**"] },

  // JS/TS files
  js.configs.recommended,

  // TypeScript: base + typed rules via Project Service
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // enables rules that need types
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // New in typescript-eslint v8 – easier typed linting
        projectService: true
      }
    },
    rules: {
      // put your project-specific TS rules/tweaks here (optional)
    }
  },

  // Keep ESLint’s formatting rules from fighting Prettier
  prettier
];