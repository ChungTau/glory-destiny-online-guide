// packages/ui/eslint.config.mjs
import rootConfig from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['dist/**/*', 'eslint.config.mjs', 'postcss.config.mjs'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // 可選：同根目錄一致
    },
  },
];