// apps/cms/eslint.config.mjs
import rootConfig from '../../eslint.config.mjs';
import pluginNext from '@next/eslint-plugin-next';

export default [
  {
    // 獨立 ignores 塊，確保最高優先級
    ignores: [
      '.next/**/*',
      'static/**/*',
      'dist/**/*',
      '**/*.d.ts', // 排除 next-env.d.ts、cache-life.d.ts 等
      'eslint.config.mjs',
    ],
  },
  ...rootConfig,
  {
    files: ['src/**/*.{ts,tsx}', 'middleware.ts', 'next.config.ts'],
    languageOptions: {
      globals: {
        browser: true,
        node: false,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      '@next/next/no-html-link-for-pages': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-undef': 'off', // 額外確保 no-undef 不影響
    },
  },
];