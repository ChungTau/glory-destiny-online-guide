// eslint.config.mjs (根目錄)
import pluginJs from '@eslint/js';
import pluginTs from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  // 基礎 JS 配置
  pluginJs.configs.recommended,

  // TypeScript 配置
  ...pluginTs.configs.recommended,

  // 全局設置
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/generated/**',
    ],
    languageOptions: {
      globals: {
        node: true, // Node.js 環境
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: pluginPrettier, // 只定義 Prettier 插件
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
