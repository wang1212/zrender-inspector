// See https://babeljs.io/docs/en/configuration

module.exports = {
  assumptions: {
    privateFieldsAsProperties: true,
    setPublicClassFields: true
  },
  presets: [
    [
      // Latest stable ECMAScript features
      '@babel/preset-env',
      {
        // https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage
        useBuiltIns: 'usage',
        // Set the corejs version we are using to avoid warnings in console
        corejs: require('core-js/package.json').version,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol']
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allowDeclareFields: true
      }
    ],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      '@babel/plugin-transform-runtime',
      {
        // By default, babel assumes babel/runtime version 7.0.0-beta.0,
        // explicitly resolving to match the provided helper functions.
        // https://github.com/babel/babel/issues/10261
        version: require('@babel/runtime/package.json').version
      }
    ]
  ]
};
