// see docs: https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: ['@wang1212/eslint-config/typescript'],
  ignorePatterns: [
    'node_modules',
    '.husky',
    '.github',
    'build',
    'types',
    'vendors',
    'docs',
    'public',
    'example',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: false,
  },
  plugins: [],
  settings: {},
  rules: {
    'import/prefer-default-export': 'off',
  },
  globals: {},
};
