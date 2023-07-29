# Create JavaScript Lib Starter

![LICENSE](https://badgen.net/github/license/wang1212/create-lib-starter)
![LAST COMMIT](https://badgen.net/github/last-commit/wang1212/create-lib-starter)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a8f4a088840a4cec88e56a9c11f25e87)](https://www.codacy.com/gh/wang1212/create-lib-starter/dashboard?utm_source=github.com&utm_medium=referral&utm_content=wang1212/create-lib-starter&utm_campaign=Badge_Grade)

[English](./README.md) | 简体中文

这是用于构建 **JavaScript/Node.js** 库的启动开发配置模板。

## 模板

这里提供了以下几个模板：

- [JavaScript](./templates/javascript/)
- [TypeScript](./templates/typescript/)
- [CLI(JavaScript)](./templates/cli/)

## 用法

1. 有两种使用此模板的方法：

   - 打开 [GitHub Repository Website](https://github.com/wang1212/create-lib-starter), 然后点击 **Use this template** 按钮。

   - 另一种方式, `clone` 到本地

     ```bash
     git clone https://github.com/wang1212/create-lib-starter.git
     ```

2. 然后，选择你要使用的任何模板类型，将其文件夹（_./templates/\*_）的内容复制到项目根目录，并删除 _templates/_ 文件夹。

   - [选择一个开源许可证](https://choosealicense.com/)；

   - 修改 `package.json` 信息, 例如 `name`, `description` 等；

   - 将仓库远程地址设置为你自己的:

     ```bash
     git remote set-url origin 'your own address'
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

## 相关的

如果你想开发一个 Web 应用，也许你可以看看：

> [create-web-app](https://github.com/wang1212/create-web-app)

或，其它类似的东西：

> [awesome-template](https://github.com/wang1212/awesome-template)

## 许可

[MIT](./LICENSE).
