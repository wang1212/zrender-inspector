const process = require('process');
const path = require('path');
const fse = require('fs-extra');
const esbuild = require('esbuild');
const stylePlugin = require('esbuild-style-plugin');
const pkg = require('../package.json');

// ! 项目目录
const WORKING_DIRECTORY = path.resolve(__dirname, '..');
console.log('current working directory: ' + WORKING_DIRECTORY);

// ! 脚本必须在项目根目录执行，防止脚本执行错误
if (!fse.pathExistsSync(path.join(WORKING_DIRECTORY, 'package.json'))) {
  throw new Error(
    'The package.json file does not exist in the current working directory.\n'
  );
}

// ! 清空构建目录
fse.emptyDirSync(path.join(WORKING_DIRECTORY, 'build/'));

const args = process.argv.slice(2);
let serve = args.findIndex((item) => item.trim() === '--serve');
if (serve > -1) {
  args.splice(serve, 1);
  serve = true;
} else {
  serve = false;
}

// * 开启服务
let browserSync;
if (serve) {
  browserSync = require('./serve.cjs').browserSync;
}

const BUNDLE_FILE = path.join(WORKING_DIRECTORY, 'build/bundle.esm.js');

// 生成类型定义入口文件
fse.writeFileSync(
  BUNDLE_FILE.replace(path.extname(BUNDLE_FILE), '.d.ts'),
  'export * from "../types"',
  { encoding: 'utf-8' }
);

esbuild
  .build({
    define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
    banner: {
      js: `
/*!
 * ${pkg.name}
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @date ${new Date().toLocaleString()}
 * @author ${pkg.author}
 */
`,
    },
    entryPoints: ['src/index.ts'].map((p) => path.join(WORKING_DIRECTORY, p)),
    outfile: BUNDLE_FILE,
    loader: { '.jpg': 'dataurl', '.png': 'dataurl', '.svg': 'dataurl' },
    bundle: true,
    sourcemap: true,
    minify: false,
    target: ['esnext'],
    format: 'esm',
    treeShaking: true,
    color: true,
    // metafile: true,
    logLevel: 'info',
    plugins: [logPlugin(), styleInjectPlugin(), stylePlugin()],
    watch: {
      onRebuild: (error, result) => {
        console.log(`rebuild completed (${Date.now() - startBuild}ms)`);

        if (browserSync) {
          browserSync.reload();
        }

        //
      },
    },
  })
  .then((result) => {
    console.log('watching...');
  })
  .catch(() => process.exit(1));

// -----------------------------------------------------------------------------

let startBuild = Date.now();
/**
 * 日志插件，记录构建时间
 */
function logPlugin() {
  return {
    name: 'log',
    setup({ onStart }) {
      onStart(() => {
        startBuild = Date.now();
        console.log('\nbuild started...');
      });
    },
  };
}

/**
 * 用来将插件处理的 css 文件注入 js 代码
 * （该插件覆盖了 esbuild-style-plugin 插件生成 css 文件的逻辑，同时支持 sourcemap）
 * @see https://github.com/hyrious/esbuild-plugin-style/blob/main/index.ts
 */
function styleInjectPlugin() {
  return {
    name: 'style-inject',
    setup({ initialOptions, onResolve, onLoad, esbuild }) {
      const require_esbuild = () =>
        esbuild || esbuild_shim || require('esbuild');
      const opt = {
        logLevel: 'error',
        charset: 'utf8',
        sourcemap: 'inline',
        minify: initialOptions.minify,
        loader: initialOptions.loader,
        bundle: initialOptions.bundle,
        write: false,
      };

      // see https://github.com/g45t345rt/esbuild-style-plugin/blob/master/src/index.ts#L24
      const LOAD_TEMP_NAMESPACE = 'temp_stylePlugin';
      const LOAD_STYLE_NAMESPACE = 'stylePlugin';
      const SKIP_RESOLVE = 'esbuild-style-plugin-skipResolve';
      const styleFilter = /.\.(css|sass|scss|less|styl)$/;

      const bundleFileDirPath = path.dirname(initialOptions.outfile);
      const originCSSFilePath = [];

      // ! 收集 css 文件的原始路径，修复 sourcemap 对应的源文件路径
      // see https://github.com/g45t345rt/esbuild-style-plugin/blob/master/src/index.ts#L147
      onLoad({ filter: /.*/, namespace: LOAD_STYLE_NAMESPACE }, (args) => {
        originCSSFilePath.push(args.path);
      });

      // ! 覆盖 esbuild-style-plugin 插件生成 css 文件的逻辑
      // see https://github.com/g45t345rt/esbuild-style-plugin/blob/master/src/index.ts#L144
      onLoad({ filter: /.*/, namespace: LOAD_TEMP_NAMESPACE }, async (args) => {
        // ! 转换生成 sourcemap 方便调试
        const { errors, warnings, outputFiles } = await require_esbuild().build(
          {
            ...opt,
            stdin: {
              contents: args.pluginData.contents,
              resolveDir: args.pluginData.resolveDir,
              // ! 修复 sourcemap 对应的源文件路径
              sourcefile: path
                .relative(bundleFileDirPath, originCSSFilePath.shift())
                .replace(/\\/g, '/'),
              loader: 'css',
            },
          }
        );
        const css = outputFiles[0].text.trimEnd();

        return {
          errors,
          warnings,
          resolveDir: args.pluginData.resolveDir,
          contents: `import { inject_style } from "__style_helper__"\nvar css = ${JSON.stringify(
            css
          )}\ninject_style(css)`,
        };
      });

      onResolve({ filter: /^__style_helper__$/ }, (args) => {
        return {
          path: 'index.js',
          namespace: 'style-helper',
          pluginData: { resolveDir: args.resolveDir },
        };
      });

      onLoad({ filter: /.*/, namespace: 'style-helper' }, (args) => ({
        resolveDir: args.pluginData.resolveDir,
        contents:
          `export function inject_style(text) {\n` +
          `  if (typeof document !== 'undefined') {\n` +
          `    var style = document.createElement('style')\n` +
          `    var node = document.createTextNode(text)\n` +
          `    style.appendChild(node)\n` +
          `    document.head.appendChild(style)\n` +
          `  }\n` +
          `}`,
      }));
    },
  };
}
