import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist/', 'node_modules/', 'rollup.config.js', 'eslint.config.js'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (type-checked)
  ...tseslint.configs.recommendedTypeChecked,

  // TypeScript parser options
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Custom rule overrides
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // Prettier must be last to override formatting rules
  eslintConfigPrettier,
  eslintPluginPrettier,
);
