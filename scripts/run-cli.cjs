/**
 * ! 用脚本执行是为了忽略类型检查的错误，方便在 CI 环节串行执行多个任务，而不会因为类型检查导致 CI 任务中断
 */
const process = require('process');
const path = require('path');
const { execSync } = require('child_process');
const fse = require('fs-extra');

// ! 项目目录
const WORKING_DIRECTORY = path.resolve(__dirname, '..');

// ! 脚本必须在项目根目录执行，防止脚本执行错误
if (!fse.pathExistsSync(path.join(WORKING_DIRECTORY, 'package.json'))) {
  throw new Error(
    'The package.json file does not exist in the current working directory.\n'
  );
}

try {
  const args = process.argv.slice(2);
  let isSilent = args.findIndex((item) => item.trim() === '--silent');
  if (isSilent > -1) {
    args.splice(isSilent, 1);
    isSilent = true;
  } else {
    isSilent = false;
  }

  if (isSilent) {
    console.log('[run-cli] silent mode');
  }

  console.log(`[run-cli] run: ${args[0]}`);
  // see https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#optionsstdio
  execSync(`${args[0]}`, {
    cwd: WORKING_DIRECTORY,
    encoding: 'utf8',
    stdio: isSilent ? 'ignore' : 'inherit',
  });
} catch (error) {
  console.error(`[run-cli] ${error.message}`);
}
