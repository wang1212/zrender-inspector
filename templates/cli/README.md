# create cli app starter

<!-- ![LICENSE](https://badgen.net/github/license/wang1212/create-cli-app-starter) -->
<!-- ![MINZIPPED SIZE](https://badgen.net/bundlephobia/minzip/@wang1212/create-cli-app-starter) -->
<!-- [![NPM VERSION](https://badgen.net/npm/v/@wang1212/create-cli-app-starter)](https://www.npmjs.com/package/@wang1212/create-cli-app-starter) -->
<!-- ![DOWNLOAD](https://badgen.net/npm/dt/@wang1212/create-cli-app-starter) -->
<!-- ![LAST COMMIT](https://badgen.net/github/last-commit/wang1212/create-cli-app-starter) -->
<!-- ![GITHUB PACKAGE CI](https://img.shields.io/github/workflow/status/wang1212/create-cli-app-starter/Node.js%20Package?label=ci/package%20publish) -->
<!-- [![Codacy Badge](https://app.codacy.com/project/badge/Grade/a9b9c06027ba47788617123cf84d3912)](https://www.codacy.com/gh/wang1212/create-cli-app-starter/dashboard?utm_source=github.com&utm_medium=referral&utm_content=wang1212/create-cli-app-starter&utm_campaign=Badge_Grade) -->

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

English | [简体中文](./README.zh-CN.md)

This is a starter development configuration template for building **Node.js command line applications**.

_**This package is now pure ESM, read [this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).**_

## Usage

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

### npm publish

The version management of this module adopts the specifications recommended by the community [Semantic Versioning](https://semver.org/). Follow version changes and maintain a **CHANGELOG.md**([Learn why](https://keepachangelog.com/)).

```bash
# Update version and generate changelog before publishing to npm repository
npm run release # npm run release -- --first-release
# Or, preview
npm run release -- --dry-run

# Then
npm publish # npm publish --access public
```

_These jobs are done with the help of [standard-version](https://github.com/conventional-changelog/standard-version) tool provided by the community._

## License

[MIT](./LICENSE).
