// eslint-disable-next-line import/no-extraneous-dependencies
import { ZRenderType as ZRender, Element, ElementEvent } from 'zrender';
import { getProperty } from 'dot-prop';

// eslint-disable-next-line no-use-before-define
const inspectorMap = new WeakMap<ZRender, Inspector>();

export class Inspector {
  static logPrefix = '[ZRenderInspector] ';

  /**
   * The css style after the mouse hovers the highlighted element.
   */
  static highlightCSS = '';

  /**
   * Generates a new instance of the Inspector class.
   *
   * @param {ConstructorParameters<typeof Inspector>[]} args - The arguments to be passed to the Inspector class constructor.
   * @return {this} A new instance of the Inspector class.
   */
  static inspect(...args: ConstructorParameters<typeof Inspector>) {
    return new this(...args);
  }

  /**
   * Get the inspector by ZRender instance.
   *
   * @param {ZRender} zrIns - The ZRender instance.
   * @returns {Inspector}
   */
  static getInspectorByZrIns(zrIns: ZRender) {
    return inspectorMap.get(zrIns);
  }

  /**
   * Retrieves a list of elements that match the specified CSS-like selector.
   *
   * @param {ZRender} zrIns - ZRender instance.
   * @param {string} selector - The CSS-like selector used to match elements.
   * @return {Element[]} An array of elements that match the selector.
   *
   * @example
   * ```javascript
   * querySelector(zrIns, 'id=1'); // Element<{ id: 1 }>
   * querySelector(zrIns, 'style.fill=#f00'); // Element<{ style: { fill: '#f00 } }>
   * querySelector(zrIns, 'id=1,name=item'); // Element<{ id: 1, name: 'item }>
   * ```
   */
  static querySelectorAll(zrIns: ZRender, selector: string): Element[] {
    const props = selector
      .split(',')
      .filter((item) => item !== '')
      .map((item) => item.split('='));

    const result = [] as Element[];

    if (props.length === 0) {
      return result;
    }

    zrIns.storage.traverse((el) => {
      // eslint-disable-next-line eqeqeq
      if (props.every((prop) => getProperty(el, prop[0]) == prop[1])) {
        result.push(el);
      }
    });

    return result;
  }

  /**
   * Logs the element for debugging purposes.
   *
   * default - [zrIns.id][el.id] el.name (type:el.type) X: Y: x: y: w: h:
   *
   * @param {ZRender} zrIns - ZRender instance.
   * @param {Element} el - The element to be logged.
   */
  static debugLogger(zrIns: ZRender, el: Element) {
    const bBox = el.getBoundingRect();
    const globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);

    return `[${zrIns.id}][${el.id}] ${el.name} (type:${
      el.type
    }) \nX:${globalCoord[0].toFixed(2)} Y:${globalCoord[1].toFixed(
      2,
    )} \nx:${bBox.x.toFixed(2)} y:${bBox.y.toFixed(2)} w:${bBox.width.toFixed(
      2,
    )} h:${bBox.height.toFixed(2)}`;
  }

  /**
   * Disables the silent mode for all elements in the storage.
   *
   * ! Should only be used in development mode.
   *
   * @param {ZRender} zrIns - ZRender instance.
   */
  static disableAllElementSilent(zrIns: ZRender) {
    zrIns.storage.traverse((el) => {
      // eslint-disable-next-line no-param-reassign
      el.silent = false;
    });

    console.warn(
      `${Inspector.logPrefix}[${zrIns.id}] Disables the silent mode for all elements in the storage, should only be used in development mode.`,
    );
  }

  private __zrIns: ZRender;

  private __highlightDom: HTMLElement | null;

  private __highlightTooltipDom: HTMLElement | null;

  /**
   * Whether to enable the mouse hover highlight element.
   *
   * - When enabled, relevant log information will be printed via `console.debug` when the mouse hovers over the element.
   * - When enabled, when the mouse hovers over an element and clicks, the element instance will be printed through `console.info`.
   */
  hoverHighlightEnable = false;

  /**
   * unbind event function.
   */
  private __unbinds: (() => void)[] = [];

  constructor(zrInstance: ZRender, config: { highlightCSS?: string } = {}) {
    this.__zrIns = zrInstance;

    this.__highlightDom = document.createElement('div');
    this.__highlightDom.style.cssText =
      'box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; border: 4px solid #f00;';
    this.__highlightDom.style.cssText +=
      config?.highlightCSS || Inspector.highlightCSS;
    document.body.appendChild(this.__highlightDom);

    this.__highlightTooltipDom = document.createElement('div');
    this.__highlightTooltipDom.style.cssText =
      'box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; background-color: rgba(255, 255, 255, .5); font-size: 12px; padding: 8px 12px; box-shadow: 0 0 8px rgba(0, 0, 0, .05);';
    document.body.appendChild(this.__highlightTooltipDom);

    this.__bindEvents();

    // this.__zrIns.dom!.addEventListener('mousemove', e => {
    //   console.log(e);
    // });

    inspectorMap.set(this.__zrIns, this);

    console.warn(
      `${Inspector.logPrefix}ZRender inspector is running, make sure it is only enabled in development mode.`,
    );
  }

  /**
   * Logs the element for debugging purposes.
   *
   * default - [zrIns.id][el.id] el.name (type:el.type) X: Y: x: y: w: h:
   *
   * @param {Element} el - The element to be logged.
   */
  debugLogger(el: Element) {
    return Inspector.debugLogger(this.__zrIns, el);
  }

  private __debugLog(el: Element | null) {
    if (el) {
      // eslint-disable-next-line no-console
      console.debug(`${Inspector.logPrefix}${this.debugLogger(el)}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private __dirEl(el: Element | null) {
    if (!el || !this.hoverHighlightEnable) {
      return;
    }

    // eslint-disable-next-line no-console
    console.dir(el);
  }

  /**
   * Disables the silent mode for all elements in the storage.
   *
   * ! Should only be used in development mode.
   */
  disableAllElementSilent() {
    Inspector.disableAllElementSilent(this.__zrIns);
  }

  /**
   * Highlights the given element and shows tooltip if hover highlight is enabled.
   *
   * @param {Element | null} el - The element to highlight or null if no highlighting is required.
   */
  private highlight(el: Element | null, event?: ElementEvent) {
    const self = this;
    if (!el || !self.hoverHighlightEnable) {
      self.__highlightDom!.style.display = 'none';
      self.__highlightTooltipDom!.style.display = 'none';
      return;
    }

    self.__highlight(el);
    self.__showTooltip(el, event);
  }

  private __highlight(el: Element) {
    const self = this;
    const zrIns = self.__zrIns;
    const zrInsDomBBox = zrIns.dom!.getBoundingClientRect();
    const bBox = el.getBoundingRect();
    const globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);

    self.__highlightDom!.style.display = 'block';
    self.__highlightDom!.style.left = `${(
      zrInsDomBBox.x + globalCoord[0]
    ).toFixed(2)}px`;
    self.__highlightDom!.style.top = `${(
      zrInsDomBBox.y + globalCoord[1]
    ).toFixed(2)}px`;
    // TODO 未考虑缩放
    self.__highlightDom!.style.width = `${bBox.width.toFixed(2)}px`;
    self.__highlightDom!.style.height = `${bBox.height.toFixed(2)}px`;
  }

  private __showTooltip(el: Element, event?: ElementEvent) {
    const self = this;
    const zrIns = self.__zrIns;
    const zrInsDomBBox = zrIns.dom!.getBoundingClientRect();
    const bBox = el.getBoundingRect();
    const globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);

    self.__highlightTooltipDom!.style.display = 'block';
    // TODO 未考虑缩放
    self.__highlightTooltipDom!.innerHTML = `
      <p style="margin: 0 0 8px 0; font-weight: bold;">[${
        el.type.slice(0, 1).toUpperCase() + el.type.slice(1)
      }]</p>
      <p style="margin: 0 0 8px 0;">GlobalCoord</p>
      <p style="margin: 0 0 8px 0;">x: ${(
        zrInsDomBBox.x + globalCoord[0]
      ).toFixed(2)} y: ${(zrInsDomBBox.y + globalCoord[1]).toFixed(2)}</p>
      <p style="margin: 0 0 8px 0;">BoundingRect</p>
      <p style="margin: 0 0 8px 0;">x: ${bBox.x.toFixed(2)} y: ${bBox.y.toFixed(
        2,
      )}</p>
      <p style="margin: 0 0 8px 0;">width: ${bBox.width.toFixed(
        2,
      )} height: ${bBox.height.toFixed(2)}</p>
      <p style="margin: 0; opacity: 0.5;">(Click to display object to console.)</p>
    `;

    self.__highlightTooltipDom!.style.left = `0px`;
    self.__highlightTooltipDom!.style.top = `0px`;
    self.__highlightTooltipDom!.style.right = 'auto';
    self.__highlightTooltipDom!.style.bottom = 'auto';

    if (event) {
      const { clientWidth, clientHeight } = document.body;
      const { offsetX, offsetY } = event;

      if (offsetX < clientWidth / 2) {
        self.__highlightTooltipDom!.style.left = 'auto';
        self.__highlightTooltipDom!.style.right = '0px';
      }
      if (offsetY < clientHeight / 2) {
        self.__highlightTooltipDom!.style.top = 'auto';
        self.__highlightTooltipDom!.style.bottom = '0px';
      }
    }
  }

  private __bindEvents() {
    const self = this;
    const zrIns = self.__zrIns;
    let hoverEl: Element | null;

    function handleMouseLeave() {
      hoverEl = null;
      self.highlight(hoverEl);
    }

    function handleZrMouseMove(event: ElementEvent) {
      if (hoverEl === event.target) {
        return;
      }
      hoverEl = event.target;

      self.__debugLog(hoverEl);
      self.highlight(hoverEl, event);
    }

    function handleZrClick(event: ElementEvent) {
      hoverEl = event.target;

      self.highlight(hoverEl, event);
      self.__dirEl(hoverEl);
    }

    zrIns.dom!.addEventListener('mouseleave', handleMouseLeave);
    self.__unbinds.push(() => {
      zrIns.dom!.removeEventListener('mouseleave', handleMouseLeave);
    });

    zrIns.on('mousemove', handleZrMouseMove);
    self.__unbinds.push(() => {
      zrIns.off('mousemove', handleZrMouseMove);
    });

    zrIns.on('click', handleZrClick);
    self.__unbinds.push(() => {
      zrIns.off('click', handleZrClick);
    });
  }

  /**
   * Retrieves a list of elements that match the specified CSS-like selector.
   *
   * @param {string} selector - The CSS-like selector used to match elements.
   * @return {Element[]} An array of elements that match the selector.
   *
   * @example
   * ```javascript
   * querySelector('id=1'); // Element<{ id: 1 }>
   * querySelector('style.fill=#f00'); // Element<{ style: { fill: '#f00 } }>
   * querySelector('id=1,name=item'); // Element<{ id: 1, name: 'item }>
   * ```
   */
  querySelectorAll(selector: string): Element[] {
    return Inspector.querySelectorAll(this.__zrIns, selector);
  }

  /**
   * Retrieves the first element that matches the specified selector.
   *
   * @param {string} selector - The CSS-like selector to match against.
   * @return {Element | undefined} The first element that matches the selector, or undefined if no matches were found.
   *
   * @example
   * ```javascript
   * querySelector('id=1'); // Element<{ id: 1 }>
   * querySelector('style.fill=#f00'); // Element<{ style: { fill: '#f00 } }>
   * querySelector('id=1,name=item'); // Element<{ id: 1, name: 'item }>
   * ```
   */
  querySelector(selector: string): Element | undefined {
    return this.querySelectorAll(selector)[0];
  }

  getElementById(id: string): Element | undefined {
    return this.querySelectorAll(`id=${id}`)[0];
  }

  getElementsByName(name: string): Element[] {
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
