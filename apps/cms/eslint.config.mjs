// apps/cms/eslint.config.mjs
import rootConfig from '../../eslint.config.mjs';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginNext from '@next/eslint-plugin-next';

export default [
  ...rootConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        browser: true,
        node: false,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      '@next/next': pluginNext,
    },
    settings: {
      react: {
        version: 'detect', // 自動檢測 React 版本
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      'react/prop-types': 'off', // 用 TS 替代 prop-types
      'react/react-in-jsx-scope': 'off', // 關閉 React 引入要求
      '@next/next/no-html-link-for-pages': 'error',
    },
  },
];
