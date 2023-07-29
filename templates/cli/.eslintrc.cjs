// see docs: https://eslint.org/docs/user-guide/configuring

// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@wang1212/eslint-config/node'],
  ignorePatterns: ['node_modules', '.husky', 'docs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  env: {
    node: true,
    jest: false,
  },
  plugins: [],
  rules: {},
  globals: {},
};
