// see docs: https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: ['@wang1212/eslint-config/typescript'],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'coverage',
    'assets',
    'public',
    'docs',
    'examples',
    'scripts',
    'types',
    'vendors',
    '.babelrc.cjs',
    '.commitlintrc.cjs',
    '.eslintrc.cjs',
    '.lintstagedrc.mjs',
    'jest.config.mjs',
    'rollup.config.js',
    'index.esm.js',
    'index.umd.js',
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
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['self'], // Allow `const self = this`; `[]` by default
      },
    ],
  },
  globals: {},
};
