import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";

export default [
  // Ignore build artifacts and generated files  
  { 
    ignores: [
      "dist/**", 
      "node_modules/**",
      "src/generated/**", // Ignore Prisma generated files
      "prisma/generated/**"
    ] 
  },

  // Base configs for all files
  js.configs.recommended,
  
  // TypeScript base rules (without type-checking)
  ...tseslint.configs.recommended,

  // TypeScript with type-checking - ONLY for .ts files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true
      }
    },
    // Now we can safely use type-checked rules since parser is configured
    rules: {
      // Core type-checked rules from recommendedTypeChecked
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error", 
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error"
    }
  },

  // Prettier (keep last to override formatting rules)
  prettier
];