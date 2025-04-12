// apps/api/eslint.config.mjs
import rootConfig from '../../eslint.config.mjs';
import pluginNestjsTyped from '@darraghor/eslint-plugin-nestjs-typed';
import importPlugin from 'eslint-plugin-import';
import pluginTs from '@typescript-eslint/eslint-plugin'; // 明確導入

export default [
  {
    // 獨立 ignores，確保最高優先級
    ignores: [
      'test/**/*',
      'src/**/*.spec.ts',
      'dist/**/*',
      'eslint.config.mjs',
      '**/*.d.ts',
    ],
  },
  ...rootConfig,
  {
    files: ['src/**/*.{ts}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs, // 明確定義
      '@nestjs-typed': pluginNestjsTyped,
      import: importPlugin,
    },
    rules: {
      '@nestjs-typed/no-unnecessary-decorators': 'error',
      '@nestjs-typed/injectable-should-be-provided': 'error',
      '@nestjs-typed/no-swagger-outside-controller': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_', // 允許未用 catch 變數
          vars: 'all',
          args: 'none', // 放寬 constructor 參數
        },
      ],
      'no-unused-vars': 'off', // 避免重複規則
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
