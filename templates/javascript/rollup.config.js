// more see http://rollupjs.org/guide/en/#configuration-files

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import styles from 'rollup-plugin-styles';
import babel from '@rollup/plugin-babel';
import esbuild from 'rollup-plugin-esbuild';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import eslint from '@rollup/plugin-eslint';
import del from 'rollup-plugin-delete';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';

const isEnvDevelopment = String(process.env.NODE_ENV).trim() === 'development';
const isEnvProduction =
  String(process.env.NODE_ENV).trim() === 'production' || !isEnvDevelopment;
const babelConfig = require('./.babelrc.cjs');

const name = 'myLib';
const banner = () => {
  // see docs: https://github.com/terser/terser#keeping-copyright-notices-or-other-comments
  return `/*!
  * ${pkg.name}
  * @description ${pkg.description}
  * @version ${pkg.version}
  * @date ${new Date().toLocaleString()}
  * @author ${pkg.author}
  */`;
};

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  cache: isEnvDevelopment,
  watch: {
    include: 'src/**',
  },
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    warn(warning);
  },
  treeshake: isEnvProduction,
  input: 'src/index.js',
  output: [
    // * UMD
    {
      file: 'build/bundle.umd.js',
      format: 'umd',
      name,
      banner,
      // globals: { cesium: 'Cesium' },
      sourcemap: true,
      // plugins: [
      //   isEnvProduction &&
      //     visualizer({ sourcemap: true, open: false, gzipSize: false }),
      // ],
    },
    isEnvProduction && {
      file: 'build/bundle.umd.min.js',
      format: 'umd',
      name,
      banner,
      // globals: { cesium: 'Cesium' },
      sourcemap: true,
      plugins: [terser()],
    },
    // * ES module
    isEnvProduction && {
      file: 'build/bundle.esm.js',
      format: 'es',
      banner,
      sourcemap: true,
      plugins: [
        isEnvProduction &&
          visualizer({ sourcemap: true, open: true, gzipSize: false }),
      ],
    },
    isEnvProduction && {
      file: 'build/bundle.esm.min.js',
      format: 'es',
      banner,
      sourcemap: true,
      plugins: [terser()],
    },
  ].filter(Boolean),
  plugins: [
    del({ targets: 'build/*', runOnce: true }),
    // isEnvDevelopment &&
    //   // no V8
    //   eslint({
    //     include: 'src/**/*.js',
    //     throwOnError: true,
    //     fix: true,
    //     formatter: 'pretty',
    //   }),
    commonjs({ sourceMap: isEnvProduction }),
    nodeResolve({ browser: true }),
    json(),
    url({
      limit: 1024 * 1000,
      filename: '[name]-[hash][extname]',
    }),
    styles({
      autoModules: (id) => id.includes('.module.'),
      minimize: isEnvProduction,
      sourceMap: isEnvDevelopment,
      // sourceMap: [true, { content: false }]
    }),
    isEnvDevelopment &&
      esbuild({
        target: 'esnext',
      }),
    isEnvProduction &&
      babel({
        ...babelConfig,
        babelrc: false,
        exclude: [/\/node_modules\//, /\/core-js\//],
        babelHelpers: 'runtime',
      }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
    isEnvProduction && strip(),
    isEnvProduction &&
      progress({
        clearLine: false, // default: true
      }),
    isEnvProduction && filesize(),
  ].filter(Boolean),
  external: [],
};

export default config;
