# create lib starter

<!-- ![LICENSE](https://badgen.net/github/license/wang1212/create-cli-app-starter) -->
<!-- ![MINZIPPED SIZE](https://badgen.net/bundlephobia/minzip/@wang1212/create-cli-app-starter) -->
<!-- [![NPM VERSION](https://badgen.net/npm/v/@wang1212/create-cli-app-starter)](https://www.npmjs.com/package/@wang1212/create-cli-app-starter) -->
<!-- ![DOWNLOAD](https://badgen.net/npm/dt/@wang1212/create-cli-app-starter) -->
<!-- ![LAST COMMIT](https://badgen.net/github/last-commit/wang1212/create-cli-app-starter) -->
<!-- ![GITHUB PACKAGE CI](https://img.shields.io/github/workflow/status/wang1212/create-cli-app-starter/Node.js%20Package?label=ci/package%20publish) -->
<!-- [![Codacy Badge](https://app.codacy.com/project/badge/Grade/a9b9c06027ba47788617123cf84d3912)](https://www.codacy.com/gh/wang1212/create-cli-app-starter/dashboard?utm_source=github.com&utm_medium=referral&utm_content=wang1212/create-cli-app-starter&utm_campaign=Badge_Grade) -->

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[English](./README.md) | 简体中文

这是用于构建 **JavaScript/Node.js** 库的启动开发配置模板。

该构建工具基于 [rollup](http://rollupjs.org/) 和 [babel](https://babeljs.io/) 等工具。

## 打包

运行 `npm run build`, 最终将生成以下捆绑包。

```plain
build/
├── bundle.esm.js
├── bundle.esm.min.js
├── bundle.umd.js
└── bundle.umd.min.js
```

还将生成相应的 **sourcemap** 文件。

## 用法

- 开发阶段：

  ```bash
  npm run dev
  ```

## 开发准则

### Git 提交信息格式

采用[社区提交格式最佳实践](https://www.conventionalcommits.org/)：

```bash
# 以前
git commit

# 现在
npm run commit
```

_这种约束依赖于社区提供的工具 [commitizen](http://commitizen.github.io/cz-cli/) 和 [commitlint](https://commitlint.js.org/)。_

### npm 发布

该模块的版本管理采用社区推荐的规范[语义化版本控制](https://semver.org/)。跟随版本变动会维护一个**变更日志(CHANGELOG.md)**（[了解为什么这么做](https://keepachangelog.com/)）。

```bash
# 在发布到 npm 存储库之前更新版本并生成更改日志
npm run release # npm run release -- --first-release
# 或者，进行预览
npm run release -- --dry-run

# 然后发布
npm publish # npm publish --access public
```

_这些工作是在社区提供的 [standard-version](https://github.com/conventional-changelog/standard-version) 工具的帮助下完成的。_

## 许可

[MIT](./LICENSE).
