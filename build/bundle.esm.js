
/*!
 * @wang1212/zrender-inspector
 * @description zrender element inspector, which can be used to assist the development of debugging.
 * @version 0.1.0
 * @date 2023/9/26 19:31:21
 * @author wang1212
 */

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// package.json
var version = "0.1.0";

// node_modules/dot-prop/index.js
var isObject = (value) => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};
var disallowedKeys = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]);
var digits = new Set("0123456789");
function getPathSegments(path) {
  const parts = [];
  let currentSegment = "";
  let currentPart = "start";
  let isIgnoring = false;
  for (const character of path) {
    switch (character) {
      case "\\": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }
        if (isIgnoring) {
          currentSegment += character;
        }
        currentPart = "property";
        isIgnoring = !isIgnoring;
        break;
      }
      case ".": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          currentPart = "property";
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
        currentSegment = "";
        currentPart = "property";
        break;
      }
      case "[": {
        if (currentPart === "index") {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          currentPart = "index";
          break;
        }
        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += character;
          break;
        }
        if (currentPart === "property") {
          if (disallowedKeys.has(currentSegment)) {
            return [];
          }
          parts.push(currentSegment);
          currentSegment = "";
        }
        currentPart = "index";
        break;
      }
      case "]": {
        if (currentPart === "index") {
          parts.push(Number.parseInt(currentSegment, 10));
          currentSegment = "";
          currentPart = "indexEnd";
          break;
        }
        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }
      }
      default: {
        if (currentPart === "index" && !digits.has(character)) {
          throw new Error("Invalid character in an index");
        }
        if (currentPart === "indexEnd") {
          throw new Error("Invalid character after an index");
        }
        if (currentPart === "start") {
          currentPart = "property";
        }
        if (isIgnoring) {
          isIgnoring = false;
          currentSegment += "\\";
        }
        currentSegment += character;
      }
    }
  }
  if (isIgnoring) {
    currentSegment += "\\";
  }
  switch (currentPart) {
    case "property": {
      if (disallowedKeys.has(currentSegment)) {
        return [];
      }
      parts.push(currentSegment);
      break;
    }
    case "index": {
      throw new Error("Index was not closed");
    }
    case "start": {
      parts.push("");
      break;
    }
  }
  return parts;
}
function isStringIndex(object, key) {
  if (typeof key !== "number" && Array.isArray(object)) {
    const index = Number.parseInt(key, 10);
    return Number.isInteger(index) && object[index] === object[key];
  }
  return false;
}
function getProperty(object, path, value) {
  if (!isObject(object) || typeof path !== "string") {
    return value === void 0 ? object : value;
  }
  const pathArray = getPathSegments(path);
  if (pathArray.length === 0) {
    return value;
  }
  for (let index = 0; index < pathArray.length; index++) {
    const key = pathArray[index];
    if (isStringIndex(object, key)) {
      object = index === pathArray.length - 1 ? void 0 : null;
    } else {
      object = object[key];
    }
    if (object === void 0 || object === null) {
      if (index !== pathArray.length - 1) {
        return value;
      }
      break;
    }
  }
  return object === void 0 ? value : object;
}

// src/Inspector.ts
var inspectorMap = /* @__PURE__ */ new WeakMap();
var _Inspector = class {
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
    const globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);
    return `[${zrIns.id}][${el.id}] ${el.name} (type:${el.type}) 
X:${globalCoord[0].toFixed(2)} Y:${globalCoord[1].toFixed(
      2
    )} 
x:${bBox.x.toFixed(2)} y:${bBox.y.toFixed(2)} w:${bBox.width.toFixed(
      2
    )} h:${bBox.height.toFixed(2)}`;
  }
  static disableAllElementSilent(zrIns) {
    zrIns.storage.traverse((el) => {
      el.silent = false;
    });
    console.warn(
      `${_Inspector.logPrefix}[${zrIns.id}] Disables the silent mode for all elements in the storage, should only be used in development mode.`
    );
  }
  __zrIns;
  __highlightDom;
  __highlightTooltipDom;
  hoverHighlightEnable = false;
  __unbinds = [];
  constructor(zrInstance, config = {}) {
    this.__zrIns = zrInstance;
    this.__highlightDom = document.createElement("div");
    this.__highlightDom.style.cssText = "box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; border: 4px solid #f00;";
    this.__highlightDom.style.cssText += config?.highlightCSS || _Inspector.highlightCSS;
    document.body.appendChild(this.__highlightDom);
    this.__highlightTooltipDom = document.createElement("div");
    this.__highlightTooltipDom.style.cssText = "box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; background-color: rgba(255, 255, 255, .75); font-size: 12px; padding: 8px 12px; box-shadow: 0 0 8px rgba(0, 0, 0, .25);";
    document.body.appendChild(this.__highlightTooltipDom);
    this.__bindEvents();
    inspectorMap.set(this.__zrIns, this);
    console.warn(
      `${_Inspector.logPrefix}ZRender inspector is running, make sure it is only enabled in development mode.`
    );
  }
  debugLogger(el) {
    return _Inspector.debugLogger(this.__zrIns, el);
  }
  __debugLog(el) {
    if (el) {
      console.debug(`${_Inspector.logPrefix}${this.debugLogger(el)}`);
    }
  }
  __dirEl(el) {
    if (!el || !this.hoverHighlightEnable) {
      return;
    }
    console.dir(el);
  }
  disableAllElementSilent() {
    _Inspector.disableAllElementSilent(this.__zrIns);
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
    const globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);
    self.__highlightTooltipDom.style.display = "block";
    self.__highlightTooltipDom.innerHTML = `
      <p style="margin: 0 0 8px 0; font-weight: bold;">[${el.type.slice(0, 1).toUpperCase() + el.type.slice(1)}]</p>
      <p style="margin: 0 0 8px 0;">GlobalCoord</p>
      <p style="margin: 0 0 8px 0;">x: ${(zrInsDomBBox.x + globalCoord[0]).toFixed(2)} y: ${(zrInsDomBBox.y + globalCoord[1]).toFixed(2)}</p>
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
      if (hoverEl === event.target) {
        return;
      }
      hoverEl = event.target;
      self.__debugLog(hoverEl);
      self.highlight(hoverEl, event);
    }
    function handleZrClick(event) {
      hoverEl = event.target;
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
    return _Inspector.querySelectorAll(this.__zrIns, selector);
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
};
var Inspector = _Inspector;
__publicField(Inspector, "logPrefix", "[ZRenderInspector] ");
__publicField(Inspector, "highlightCSS", "");
export {
  Inspector,
  version as VERSION
};
/*!
 * My lib
 */
//# sourceMappingURL=bundle.esm.js.map
