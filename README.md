# Create JavaScript Lib Starter

![LICENSE](https://badgen.net/github/license/wang1212/create-lib-starter)
![LAST COMMIT](https://badgen.net/github/last-commit/wang1212/create-lib-starter)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a8f4a088840a4cec88e56a9c11f25e87)](https://www.codacy.com/gh/wang1212/create-lib-starter/dashboard?utm_source=github.com&utm_medium=referral&utm_content=wang1212/create-lib-starter&utm_campaign=Badge_Grade)

English | [简体中文](./README.zh-CN.md)

This is a startup development configuration template used to build the **JavaScript/Node.js** library.

## Templates

The following templates are provided here:

- [JavaScript](./templates/javascript/)
- [TypeScript](./templates/typescript/)
- [CLI(JavaScript)](./templates/cli/)

## Usage

1. There are two ways to use this template:

   - Open [GitHub Repository Website](https://github.com/wang1212/create-lib-starter), then Click **Use this template** Button.

   - Another way, clone to local

     ```bash
     git clone https://github.com/wang1212/create-lib-starter.git
     ```

2. Then, select any template type you want to use, copy the contents of its folder(_./templates/\*_) to the project root directory, and delete the _templates/_ folder.

   - [Choose an open source license](https://choosealicense.com/).

   - Modify `package.json` information, such as `name`, `description`, etc.

   - Set the remote address of the github repository to your own:

     ```bash
     git remote set-url origin 'your own address'
     ```

## Development Guidelines

### Git Commit Message Format

Adopt [community commit format best practices](https://www.conventionalcommits.org/):

```bash
# Before
git commit

# Now
npm run commit
```

_This constraint relies on tools [commitizen](http://commitizen.github.io/cz-cli/) and [commitlint](https://commitlint.js.org/) provided by the community._

## Related

If you want to develop a web application, maybe you can take a look:

> [create-web-app](https://github.com/wang1212/create-web-app)

Or, other similar things:

> [awesome-template](https://github.com/wang1212/awesome-template)

## License

[MIT](./LICENSE).
