/*!
  * @wang1212/zrender-inspector
  * @description zrender element inspector, which can be used to assist the development of debugging.
  * @version 0.1.1
  * @date 2024/1/3 11:36:52
  * @author wang1212
  */
var name = "@wang1212/zrender-inspector";
var version = "0.1.1";
var description = "zrender element inspector, which can be used to assist the development of debugging.";
var keywords = [
	"zrender",
	"inspector",
	"debugging"
];
var homepage = "https://wang1212.github.io/zrender-inspector/";
var repository = {
	type: "git",
	url: "https://github.com/wang1212/zrender-inspector"
};
var license = "MIT";
var engines = {
	node: ">=16"
};
var author = "wang1212";
var exports = {
	"import": "./index.esm.js",
	require: "./index.umd.js",
	browser: "./index.umd.js"
};
var main = "./index.umd.js";
var module = "./index.esm.js";
var browser = "./index.umd.js";
var types = "./types/index.d.ts";
var scripts = {
	prepare: "husky install",
	"build:docs-html": "generate-md --layout github --input ./docs --output ./docs-html",
	serve: "node scripts/serve.cjs",
	"lint:js": "eslint src/ --config=.eslintrc.cjs --ext=.js,.ts --fix --quiet --cache --cache-location=node_modules/.cache/.eslintcache --format=pretty",
	lint: "npm run lint:js",
	test: "jest --passWithNoTests",
	"test-watch": "jest --passWithNoTests --watch",
	"tsc:types:check": "tsc --noEmit",
	"tsc:types:build": "tsc --emitDeclarationOnly",
	"tsc:types:build-watch": "tsc --emitDeclarationOnly --watch",
	"build:types": "node scripts/run-cli.cjs \"npm run tsc:types:build\"",
	"build-watch:types": "node scripts/run-cli.cjs \"npm run tsc:types:build-watch\" --silent",
	build: "npm run test && npm run build:types && cross-env NODE_ENV=production rollup --config",
	"build-watch": "cross-env NODE_ENV=development rollup --config --watch",
	"build-watch-serve": "cross-env NODE_ENV=development rollup --config --watch --serve",
	"esbuild-build-watch": "cross-env NODE_ENV=development node scripts/esbuild-watch.cjs",
	"esbuild-build-watch-serve": "cross-env NODE_ENV=development node scripts/esbuild-watch.cjs --serve",
	dev: "concurrently --raw --kill-others \"npm:build-watch\" \"npm:build-watch:types\"",
	"dev-serve": "concurrently --raw --kill-others \"npm:build-watch-serve\" \"npm:build-watch:types\"",
	"esbuild-dev": "concurrently --raw --kill-others \"npm:esbuild-build-watch\" \"npm:build-watch:types\"",
	"esbuild-dev-serve": "concurrently --raw --kill-others \"npm:esbuild-build-watch-serve\" \"npm:build-watch:types\"",
	commit: "cz",
	prerelease: "npm run test",
	release: "release-it",
	prepublishOnly: "npm run build"
};
var publishConfig = {
	registry: "https://registry.npmjs.org/",
	access: "public"
};
var files = [
	"build/",
	"types/",
	"index.esm.js",
	"index.umd.js"
];
var devDependencies = {
	"@babel/core": "7.23.7",
	"@babel/plugin-proposal-decorators": "7.23.7",
	"@babel/plugin-transform-runtime": "7.23.7",
	"@babel/preset-env": "7.23.7",
	"@babel/preset-typescript": "7.23.3",
	"@commitlint/cli": "17.8.1",
	"@commitlint/config-conventional": "17.8.1",
	"@release-it/conventional-changelog": "7.0.2",
	"@rollup/plugin-babel": "6.0.4",
	"@rollup/plugin-commonjs": "25.0.7",
	"@rollup/plugin-json": "6.1.0",
	"@rollup/plugin-node-resolve": "15.1.0",
	"@rollup/plugin-replace": "5.0.5",
	"@rollup/plugin-strip": "3.0.4",
	"@rollup/plugin-terser": "0.4.4",
	"@rollup/plugin-url": "8.0.2",
	"@rollup/plugin-virtual": "3.0.2",
	"@types/jest": "29.5.11",
	"@types/node": "18.18.9",
	"@typescript-eslint/eslint-plugin": "6.11.0",
	"@typescript-eslint/parser": "6.11.0",
	"@wang1212/eslint-config": "0.3.1",
	"babel-jest": "29.7.0",
	"browser-sync": "2.29.3",
	commitizen: "4.3.0",
	concurrently: "8.2.2",
	"cross-env": "7.0.3",
	"cz-conventional-changelog": "3.3.0",
	esbuild: "0.15.12",
	"esbuild-style-plugin": "1.6.3",
	eslint: "8.56.0",
	"eslint-formatter-pretty": "5.0.0",
	"fs-extra": "11.1.1",
	husky: "8.0.3",
	jest: "29.7.0",
	"jest-environment-jsdom": "29.7.0",
	"lint-staged": "13.2.3",
	"markdown-styles": "3.2.0",
	prettier: "3.1.1",
	"release-it": "16.2.1",
	rollup: "2.79.1",
	"rollup-plugin-esbuild": "5.0.0",
	"rollup-plugin-filesize": "10.0.0",
	"rollup-plugin-progress": "1.1.2",
	"rollup-plugin-styles": "4.0.0",
	"rollup-plugin-visualizer": "5.9.2",
	sass: "1.69.6",
	typescript: "5.1.6",
	zrender: "5.4.4"
};
var dependencies = {
	"@babel/runtime": "^7.22.6",
	"core-js": "^3.32.0",
	"dot-prop": "^8.0.2"
};
var _package = {
	name: name,
	version: version,
	description: description,
	keywords: keywords,
	homepage: homepage,
	repository: repository,
	license: license,
	engines: engines,
	author: author,
	exports: exports,
	main: main,
	module: module,
	browser: browser,
	types: types,
	scripts: scripts,
	publishConfig: publishConfig,
	files: files,
	devDependencies: devDependencies,
	dependencies: dependencies
};

const isObject = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};

const isEmptyObject = value => isObject(value) && Object.keys(value).length === 0;

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor',
]);

const digits = new Set('0123456789');

function getPathSegments(path) {
	const parts = [];
	let currentSegment = '';
	let currentPart = 'start';
	let isIgnoring = false;

	for (const character of path) {
		switch (character) {
			case '\\': {
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (isIgnoring) {
					currentSegment += character;
				}

				currentPart = 'property';
				isIgnoring = !isIgnoring;
				break;
			}

			case '.': {
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'property';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (disallowedKeys.has(currentSegment)) {
					return [];
				}

				parts.push(currentSegment);
				currentSegment = '';
				currentPart = 'property';
				break;
			}

			case '[': {
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'index';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (currentPart === 'property') {
					if (disallowedKeys.has(currentSegment)) {
						return [];
					}

					parts.push(currentSegment);
					currentSegment = '';
				}

				currentPart = 'index';
				break;
			}

			case ']': {
				if (currentPart === 'index') {
					parts.push(Number.parseInt(currentSegment, 10));
					currentSegment = '';
					currentPart = 'indexEnd';
					break;
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				// Falls through
			}

			default: {
				if (currentPart === 'index' && !digits.has(character)) {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (currentPart === 'start') {
					currentPart = 'property';
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += '\\';
				}

				currentSegment += character;
			}
		}
	}

	if (isIgnoring) {
		currentSegment += '\\';
	}

	switch (currentPart) {
		case 'property': {
			if (disallowedKeys.has(currentSegment)) {
				return [];
			}

			parts.push(currentSegment);

			break;
		}

		case 'index': {
			throw new Error('Index was not closed');
		}

		case 'start': {
			parts.push('');

			break;
		}
		// No default
	}

	return parts;
}

function isStringIndex(object, key) {
	if (typeof key !== 'number' && Array.isArray(object)) {
		const index = Number.parseInt(key, 10);
		return Number.isInteger(index) && object[index] === object[key];
	}

	return false;
}

function assertNotStringIndex(object, key) {
	if (isStringIndex(object, key)) {
		throw new Error('Cannot use string index');
	}
}

function getProperty(object, path, value) {
	if (!isObject(object) || typeof path !== 'string') {
		return value === undefined ? object : value;
	}

	const pathArray = getPathSegments(path);
	if (pathArray.length === 0) {
		return value;
	}

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		if (isStringIndex(object, key)) {
			object = index === pathArray.length - 1 ? undefined : null;
		} else {
			object = object[key];
		}

		if (object === undefined || object === null) {
			// `object` is either `undefined` or `null` so we want to stop the loop, and
			// if this is not the last bit of the path, and
			// if it didn't return `undefined`
			// it would return `null` if `object` is `null`
			// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
			if (index !== pathArray.length - 1) {
				return value;
			}

			break;
		}
	}

	return object === undefined ? value : object;
}

function setProperty(object, path, value) {
	if (!isObject(object) || typeof path !== 'string') {
		return object;
	}

	const root = object;
	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			object[key] = value;
		} else if (!isObject(object[key])) {
			object[key] = typeof pathArray[index + 1] === 'number' ? [] : {};
		}

		object = object[key];
	}

	return root;
}

function deleteProperty(object, path) {
	if (!isObject(object) || typeof path !== 'string') {
		return false;
	}

	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			delete object[key];
			return true;
		}

		object = object[key];

		if (!isObject(object)) {
			return false;
		}
	}
}

function hasProperty(object, path) {
	if (!isObject(object) || typeof path !== 'string') {
		return false;
	}

	const pathArray = getPathSegments(path);
	if (pathArray.length === 0) {
		return false;
	}

	for (const key of pathArray) {
		if (!isObject(object) || !(key in object) || isStringIndex(object, key)) {
			return false;
		}

		object = object[key];
	}

	return true;
}

// TODO: Backslashes with no effect should not be escaped
function escapePath(path) {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	return path.replace(/[\\.[]/g, '\\$&');
}

// The keys returned by Object.entries() for arrays are strings
function entries(value) {
	const result = Object.entries(value);
	if (Array.isArray(value)) {
		return result.map(([key, value]) => [Number(key), value]);
	}

	return result;
}

function stringifyPath(pathSegments) {
	let result = '';

	for (let [index, segment] of entries(pathSegments)) {
		if (typeof segment === 'number') {
			result += `[${segment}]`;
		} else {
			segment = escapePath(segment);
			result += index === 0 ? segment : `.${segment}`;
		}
	}

	return result;
}

function * deepKeysIterator(object, currentPath = []) {
	if (!isObject(object) || isEmptyObject(object)) {
		if (currentPath.length > 0) {
			yield stringifyPath(currentPath);
		}

		return;
	}

	for (const [key, value] of entries(object)) {
		yield * deepKeysIterator(value, [...currentPath, key]);
	}
}

function deepKeys(object) {
	return [...deepKeysIterator(object)];
}

const inspectorMap = /* @__PURE__ */ new WeakMap();
class Inspector {
  static logPrefix = "[ZRenderInspector] ";
  static highlightCSS = "";
  static inspect(...args) {
    return new this(...args);
  }
  static getInspectorByZrIns(zrIns) {
    return inspectorMap.get(zrIns);
  }
  static querySelectorAll(zrIns, selector) {
    const props = selector.split(",").filter((item) => item !== "").map((item) => item.split("="));
    const result = [];
    if (props.length === 0) {
      return result;
    }
    zrIns.storage.traverse((el) => {
      if (props.every((prop) => getProperty(el, prop[0]) == prop[1])) {
        result.push(el);
      }
    });
    return result;
  }
  static debugLogger(zrIns, el) {
    const bBox = el.getBoundingRect();
    const bBoxWithTransform = bBox.clone();
    bBoxWithTransform.applyTransform(el.transform);
    return `[${zrIns.id}][${el.id}] ${el.name} (type:${el.type}) 
X:${bBoxWithTransform.x.toFixed(2)} Y:${bBoxWithTransform.y.toFixed(
      2
    )} W:${bBoxWithTransform.width.toFixed(
      2
    )} H:${bBoxWithTransform.height.toFixed(2)} 
x:${bBox.x.toFixed(
      2
    )} y:${bBox.y.toFixed(2)} w:${bBox.width.toFixed(
      2
    )} h:${bBox.height.toFixed(2)}`;
  }
  static disableAllElementSilent(zrIns) {
    zrIns.storage.traverse((el) => {
      el.silent = false;
    });
    console.warn(
      `${Inspector.logPrefix}[${zrIns.id}] Disables the silent mode for all elements in the storage, should only be used in development mode.`
    );
  }
  version = version;
  __zrIns;
  __highlightDom;
  __highlightTooltipDom;
  hoverHighlightEnable = false;
  __unbinds = [];
  constructor(zrInstance, config = {}) {
    this.__zrIns = zrInstance;
    this.__highlightDom = document.createElement("div");
    this.__highlightDom.style.cssText = "box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; border: 4px solid #f00;";
    this.__highlightDom.style.cssText += config?.highlightCSS || Inspector.highlightCSS;
    document.body.appendChild(this.__highlightDom);
    this.__highlightTooltipDom = document.createElement("div");
    this.__highlightTooltipDom.style.cssText = "box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; background-color: rgba(255, 255, 255, .75); font-size: 12px; padding: 8px 12px; box-shadow: 0 0 8px rgba(0, 0, 0, .25);";
    document.body.appendChild(this.__highlightTooltipDom);
    this.__bindEvents();
    inspectorMap.set(this.__zrIns, this);
    console.warn(
      `${Inspector.logPrefix}ZRender inspector is running, make sure it is only enabled in development mode.`
    );
  }
  debugLogger(el) {
    return Inspector.debugLogger(this.__zrIns, el);
  }
  __debugLog(el) {
    if (el) {
      console.debug(`${Inspector.logPrefix}${this.debugLogger(el)}`);
    }
  }
  __dirEl(el) {
    if (!el || !this.hoverHighlightEnable) {
      return;
    }
    console.dir(el);
  }
  disableAllElementSilent() {
    Inspector.disableAllElementSilent(this.__zrIns);
  }
  highlight(el, event) {
    const self = this;
    if (!el || !self.hoverHighlightEnable) {
      self.__highlightDom.style.display = "none";
      self.__highlightTooltipDom.style.display = "none";
      return;
    }
    self.__highlight(el);
    self.__showTooltip(el, event);
  }
  __highlight(el) {
    const self = this;
    const zrIns = self.__zrIns;
    const zrInsDomBBox = zrIns.dom.getBoundingClientRect();
    const bBox = el.getBoundingRect().clone();
    bBox.applyTransform(el.transform);
    self.__highlightDom.style.display = "block";
    self.__highlightDom.style.left = `${(zrInsDomBBox.x + bBox.x).toFixed(
      2
    )}px`;
    self.__highlightDom.style.top = `${(zrInsDomBBox.y + bBox.y).toFixed(
      2
    )}px`;
    self.__highlightDom.style.width = `${bBox.width.toFixed(2)}px`;
    self.__highlightDom.style.height = `${bBox.height.toFixed(2)}px`;
  }
  __showTooltip(el, event) {
    const self = this;
    const zrIns = self.__zrIns;
    const zrInsDomBBox = zrIns.dom.getBoundingClientRect();
    const bBox = el.getBoundingRect();
    const bBoxWithTransform = bBox.clone();
    bBoxWithTransform.applyTransform(el.transform);
    self.__highlightTooltipDom.style.display = "block";
    self.__highlightTooltipDom.innerHTML = `
      <p style="margin: 0 0 8px 0; font-weight: bold;">[${el.type.slice(0, 1).toUpperCase() + el.type.slice(1)}]</p>
      <p style="margin: 0 0 8px 0;">GlobalCoord</p>
      <p style="margin: 0 0 8px 0;">X: ${(zrInsDomBBox.x + bBoxWithTransform.x).toFixed(2)} Y: ${(zrInsDomBBox.y + bBoxWithTransform.y).toFixed(2)}</p>
      <p style="margin: 0 0 8px 0;">W: ${bBox.width.toFixed(
      2
    )} H: ${bBox.height.toFixed(2)}</p>
      <p style="margin: 0 0 8px 0;">BoundingRect</p>
      <p style="margin: 0 0 8px 0;">x: ${bBox.x.toFixed(2)} y: ${bBox.y.toFixed(
      2
    )}</p>
      <p style="margin: 0 0 8px 0;">width: ${bBox.width.toFixed(
      2
    )} height: ${bBox.height.toFixed(2)}</p>
      <p style="margin: 0; opacity: 0.5;">(Click to display object to console.)</p>
    `;
    self.__highlightTooltipDom.style.left = `0px`;
    self.__highlightTooltipDom.style.top = `0px`;
    self.__highlightTooltipDom.style.right = "auto";
    self.__highlightTooltipDom.style.bottom = "auto";
    if (event) {
      const { clientWidth, clientHeight } = document.body;
      const { offsetX, offsetY } = event;
      if (offsetX < clientWidth / 2) {
        self.__highlightTooltipDom.style.left = "auto";
        self.__highlightTooltipDom.style.right = "0px";
      }
      if (offsetY < clientHeight / 2) {
        self.__highlightTooltipDom.style.top = "auto";
        self.__highlightTooltipDom.style.bottom = "0px";
      }
    }
  }
  __bindEvents() {
    const self = this;
    const zrIns = self.__zrIns;
    let hoverEl;
    function handleMouseLeave() {
      hoverEl = null;
      self.highlight(hoverEl);
    }
    function handleZrMouseMove(event) {
      if (!event.target) {
        return;
      }
      const el = event.target.type === "tspan" ? event.target.parent : event.target;
      if (hoverEl === el) {
        return;
      }
      hoverEl = el;
      self.__debugLog(hoverEl);
      self.highlight(hoverEl, event);
    }
    function handleZrClick(event) {
      hoverEl = event.target.type === "tspan" ? event.target.parent : event.target;
      self.highlight(hoverEl, event);
      self.__dirEl(hoverEl);
    }
    zrIns.dom.addEventListener("mouseleave", handleMouseLeave);
    self.__unbinds.push(() => {
      zrIns.dom.removeEventListener("mouseleave", handleMouseLeave);
    });
    zrIns.on("mousemove", handleZrMouseMove);
    self.__unbinds.push(() => {
      zrIns.off("mousemove", handleZrMouseMove);
    });
    zrIns.on("click", handleZrClick);
    self.__unbinds.push(() => {
      zrIns.off("click", handleZrClick);
    });
  }
  querySelectorAll(selector) {
    return Inspector.querySelectorAll(this.__zrIns, selector);
  }
  querySelector(selector) {
    return this.querySelectorAll(selector)[0];
  }
  getElementById(id) {
    return this.querySelectorAll(`id=${id}`)[0];
  }
  getElementsByName(name) {
    return this.querySelectorAll(`name=${name}`);
  }
  destroy() {
    this.__unbinds.forEach((unbind) => unbind());
    this.__unbinds = [];
    this.__highlightDom?.remove();
    this.__highlightDom = null;
    this.__highlightTooltipDom?.remove();
    this.__highlightTooltipDom = null;
    inspectorMap.delete(this.__zrIns);
  }
}

/*!
 * My lib
 */

export { Inspector, version as VERSION };
//# sourceMappingURL=bundle.esm.js.map
