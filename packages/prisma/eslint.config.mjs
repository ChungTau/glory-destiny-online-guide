import rootConfig from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    files: ['scripts/**/*.{ts}', 'schema/**/*.{ts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
];
