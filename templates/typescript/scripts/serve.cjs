/**
 * 静态资源服务
 */
const path = require('path');
const fse = require('fs-extra');
const browserSync = require('browser-sync').create();

// ! 项目目录
const WORKING_DIRECTORY = path.resolve(__dirname, '..');

// ! 脚本必须在项目根目录执行，防止脚本执行错误
if (!fse.pathExistsSync(path.join(WORKING_DIRECTORY, 'package.json'))) {
  throw new Error('The package.json file does not exist in the current working directory.\n');
}

const PUBLIC_DIR = 'example/';

browserSync.watch(
  [`${PUBLIC_DIR}**/*`],
  {
    ignoreInitial: true
  },
  async (event, file) => {
    if (!['add', 'change'].includes(event)) return;

    browserSync.reload();
  }
);

browserSync.init({
  ignore: ['/node_modules/**'],
  server: true,
  serveStatic: ['.'],
  startPath: PUBLIC_DIR,
  // reloadThrottle: 1e3,
  open: true,
  notify: false
});

exports.browserSync = browserSync;
