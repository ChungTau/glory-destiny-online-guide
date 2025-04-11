import rootConfig from '../../eslint.config.mjs';
import pluginNestjsTyped from '@darraghor/eslint-plugin-nestjs-typed';

export default [
  ...rootConfig,
  {
    files: ['src/**/*.{ts}'],
    plugins: {
      '@nestjs-typed': pluginNestjsTyped,
    },
    rules: {
      '@nestjs-typed/no-unnecessary-decorators': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
