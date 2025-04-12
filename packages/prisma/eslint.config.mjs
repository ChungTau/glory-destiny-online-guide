// packages/prisma/eslint.config.mjs
import rootConfig from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    files: ['scripts/**/*.{ts}', 'schema/**/*.{ts}'],
    ignores: ['generated/**/*', 'eslint.config.mjs'],
    languageOptions: {
      globals: {
        browser: false, // 關閉 browser 環境，因為唔係 React
        node: true,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: undefined, // 明確禁用 react 插件
      'react-hooks': undefined, // 禁用 react-hooks
    },
    rules: {
      'no-unused-vars': 'off', // 關閉基礎規則
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // 同步根目錄
      'no-console': 'off', // 允許所有 console
      'react/prop-types': 'off', // 確保無 React 規則
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];