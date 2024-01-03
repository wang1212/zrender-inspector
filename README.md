# zrender-inspector

![LICENSE](https://badgen.net/github/license/wang1212/zrender-inspector)
![MINZIPPED SIZE](https://badgen.net/bundlephobia/minzip/@wang1212/zrender-inspector)
[![NPM VERSION](https://badgen.net/npm/v/@wang1212/zrender-inspector)](https://www.npmjs.com/package/@wang1212/zrender-inspector)
![DOWNLOAD](https://badgen.net/npm/dt/@wang1212/zrender-inspector)
![LAST COMMIT](https://badgen.net/github/last-commit/wang1212/zrender-inspector)
![GITHUB PACKAGE CI](https://img.shields.io/github/workflow/status/wang1212/zrender-inspector/Node.js%20Package?label=ci/package%20publish)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a9b9c06027ba47788617123cf84d3912)](https://www.codacy.com/gh/wang1212/zrender-inspector/dashboard?utm_source=github.com&utm_medium=referral&utm_content=wang1212/zrender-inspector&utm_campaign=Badge_Grade)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

English | [简体中文](./README.zh-CN.md)

🔧 [ZRender](https://github.com/ecomfe/zrender) element inspector, which can be used to assist the development of debugging.

This tool provides a way similar to the DOM structure of the **Element** tag debugging page in ChromeDevtools to inspect ZRender elements, and also provides some similar [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) APIs to query and select ZRender elements globally.

![showcase](https://wang1212.github.io/zrender-inspector/assets/showcase.webp)

[Online example](https://wang1212.github.io/zrender-inspector/examples/index.html)

## Usage

### npm

```bash
npm install -D @wang1212/zrender-inspector
```

Refer to the usage of `esm` format below.

### cdn

```javascript
// umd
<script src="path/to/bundle.umd.min.js"></script>;
const inspectorIns = zrenderInspector.Inspector.inspect(zrIns, config?);
// or
const inspectorIns = new zrenderInspector.Inspector(zrIns, config?);

// esm
import { Inspector } from 'path/to/bundle.esm.min.js';
const inspectorIns = Inspector.inspect(zrIns, config?);
// or
const inspectorIns = new Inspector(zrIns, config?);
```

### `new Inspector()`

- `new Inspector(zrIns, config?)`
- parameter

  | name                | type                         | optional | default | description                       |
  | :------------------ | :--------------------------- | :------- | :------ | :-------------------------------- |
  | zrIns               | `ZRenderType`                |          |         | ZRender instance                  |
  | config              | `{ highlightCSS?: string; }` | true     |         |                                   |
  | config.highlightCSS | `string`                     | true     |         | Element highlight style `cssText` |

For example, to debug the [echarts](https://echarts.apache.org/) chart library:

```javascript
const chartIns = echarts.init(dom);
chartIns.setOption(option);

const inspectorIns = new Inspector(chartIns.getZr(), {
  highlightCSS: 'background-color: yellow; opacity: 0.25;'
});

// Enable mouseover highlighting to inspect elements
inspectorIns.hoverHighlightEnable = true;
```

### inspect element

By default, when the mouse hovers over an element that can respond to an event, some information about the element will be printed in **Console** of ChromeDevtools via `console.debug()`, but the element will not be highlighted.

### `hoverHighlightEnable`

- type `boolean`
- default `false`

Whether to enable the mouse hover highlight element. When set to `true`, when the mouse hovers over an element that can respond to an event, it will be highlighted, and some element information will be displayed in the upper left corner of the screen. Click on the highlighted element to print the element instance in ChromeDevtools **Console** (via `console.dir()`).

```javascript
inspectorIns.hoverHighlightEnable = true;
```

### `debugLogger`

- type `(el: Element) => string`

Set the log content printed by `console.debug()`.

By default it is:

```plain
[zrIns.id][el.id] el.name (type:el.type) X: Y: W: H: x: y: w: h:
```

### `disableAllElementSilent()`

- `disableAllElementSilent()`

When the element is set with the `silent: true` attribute, it will not respond to mouse events. For debugging convenience, you can force the `silent` attribute of all elements to be set to `false`.

```javascript
inspectorIns.disableAllElementSilent();
```

### query element

### `querySelectorAll()`

- `querySelectorAll(selector): Element[]`
- parameter

  | name     | type     | optional | default | description      |
  | :------- | :------- | :------- | :------ | :--------------- |
  | selector | `string` |          |         | element selector |

- return

  | name     | type        | description                             |
  | :------- | :---------- | :-------------------------------------- |
  | elements | `Element[]` | A collection of all elements that match |

Query the collection of all matched elements according to the element attributes.

Among them, `selector` can specify the attribute key-value pair of the query target element, and supports multiple attributes:

```javascript
// Query all rectangle (Rect) type elements
const elements = inspectorIns.querySelectorAll('type=rect');
// Query all rectangle (Rect) type elements with red fill color
const elements = inspectorIns.querySelectorAll('type=rect,style.fill=#f00');
```

### `querySelector()`

- `querySelector(selector): Element`
- parameter

  | name     | type     | optional | default | description      |
  | :------- | :------- | :------- | :------ | :--------------- |
  | selector | `string` |          |         | element selector |

- return

  | name    | type      | description                    |
  | :------ | :-------- | :----------------------------- |
  | element | `Element` | the first element that matches |

Query the first matched element according to the element attribute.

### `getElementById()`

- `getElementById(id): Element`
- parameter

  | name | type     | optional | default | description                  |
  | :--- | :------- | :------- | :------ | :--------------------------- |
  | id   | `string` |          |         | Element `id` attribute value |

- return

  | name    | type      | description                    |
  | :------ | :-------- | :----------------------------- |
  | element | `Element` | the first element that matches |

Query the first matching element based on the element's `id` attribute.

### `getElementsByName()`

- `getElementsByName(name): Element`
- parameter

  | name | type     | optional | default | description                    |
  | :--- | :------- | :------- | :------ | :----------------------------- |
  | name | `string` |          |         | Element `name` attribute value |

- return

  | name     | type        | description                          |
  | :------- | :---------- | :----------------------------------- |
  | elements | `Element[]` | A collection of all matched elements |

Query the set of all matching elements according to the `name` attribute of the element.

## Development

- Development mode

  ```bash
  npm run dev # or $ npm run esbuild-dev
  ```

- Development mode (web server)

  ```bash
  npm run dev-serve # or $ npm run esbuild-dev-serve
  ```

- Run test

  ```bash
  npm run test
  ```

- Build bundle

  ```bash
  npm run build
  ```

- Build Html documents from Markdown documents

  ```bash
  npm run build:docs-html
  ```

_See the `scripts` field in **package.json** for more commands._

## Bundle

Run `npm run build`, the following bundles will eventually be generated.

```plain
types/
build/
├── bundle.esm.js
├── bundle.esm.min.js
├── bundle.umd.js
└── bundle.umd.min.js
```

Will also generate the corresponding **sourcemap** file.

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
npm run release
# Or, preview
npm run release -- --dry-run

# Then publish to npm, if yes is not selected when auto-publishing to npm
npm publish # npm publish --access public
```

_These jobs are done with the help of [release-it](https://github.com/release-it/release-it) tool provided by the community._

## License

[MIT](./LICENSE).
