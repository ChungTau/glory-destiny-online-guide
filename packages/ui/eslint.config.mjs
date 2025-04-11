import rootConfig from '../../eslint.config.mjs';
import pluginReact from 'eslint-plugin-react';

export default [
  ...rootConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        browser: true,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
];
