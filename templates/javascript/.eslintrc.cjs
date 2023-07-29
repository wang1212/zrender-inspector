// see docs: https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: ['@wang1212/eslint-config'],
  ignorePatterns: [
    'node_modules',
    '.husky',
    '.github',
    'build',
    'types',
    'vendors',
    'docs',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: false,
  },
  plugins: ['@babel'],
  rules: {
    'import/prefer-default-export': 'off',
  },
  globals: {},
};
