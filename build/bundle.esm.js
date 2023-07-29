/*!
  * @wang1212/zrender-inspector
  * @description zrender element inspector, which can be used to assist the development of debugging.
  * @version 0.0.0
  * @date 2023/7/30 00:42:09
  * @author 
  */
var version$1 = "0.0.0";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$v =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || commonjsGlobal || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$D = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$C = fails$D;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$C(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$B = fails$D;

var functionBindNative = !fails$B(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$4 = functionBindNative;

var call$m = Function.prototype.call;

var functionCall = NATIVE_BIND$4 ? call$m.bind(call$m) : function () {
  return call$m.apply(call$m, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$4(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$2;

var createPropertyDescriptor$6 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$3 = functionBindNative;

var FunctionPrototype$3 = Function.prototype;
var call$l = FunctionPrototype$3.call;
var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$l, call$l);

var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$l.apply(fn, arguments);
  };
};

var uncurryThis$C = functionUncurryThis;

var toString$f = uncurryThis$C({}.toString);
var stringSlice$8 = uncurryThis$C(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$8(toString$f(it), 8, -1);
};

var uncurryThis$B = functionUncurryThis;
var fails$A = fails$D;
var classof$b = classofRaw$2;

var $Object$5 = Object;
var split = uncurryThis$B(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$A(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$5('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$b(it) == 'String' ? split(it, '') : $Object$5(it);
} : $Object$5;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$8 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$7 = isNullOrUndefined$8;

var $TypeError$g = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$7 = function (it) {
  if (isNullOrUndefined$7(it)) throw $TypeError$g("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$6 = requireObjectCoercible$7;

var toIndexedObject$9 = function (it) {
  return IndexedObject$1(requireObjectCoercible$6(it));
};

var documentAll$2 = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$s = $documentAll$1.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll$1;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$r = isCallable$s;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$n = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$r(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$r(it);
};

var global$u = global$v;
var isCallable$q = isCallable$s;

var aFunction = function (argument) {
  return isCallable$q(argument) ? argument : undefined;
};

var getBuiltIn$d = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$u[namespace]) : global$u[namespace] && global$u[namespace][method];
};

var uncurryThis$A = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$A({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$t = global$v;
var userAgent$3 = engineUserAgent;

var process$4 = global$t.process;
var Deno$1 = global$t.Deno;
var versions = process$4 && process$4.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$3 = engineV8Version;
var fails$z = fails$D;
var global$s = global$v;

var $String$7 = global$s.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$z(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$7(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$6 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$6
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$c = getBuiltIn$d;
var isCallable$p = isCallable$s;
var isPrototypeOf$7 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$4 = Object;

var isSymbol$5 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$c('Symbol');
  return isCallable$p($Symbol) && isPrototypeOf$7($Symbol.prototype, $Object$4(it));
};

var $String$6 = String;

var tryToString$5 = function (argument) {
  try {
    return $String$6(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$o = isCallable$s;
var tryToString$4 = tryToString$5;

var $TypeError$f = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$9 = function (argument) {
  if (isCallable$o(argument)) return argument;
  throw $TypeError$f(tryToString$4(argument) + ' is not a function');
};

var aCallable$8 = aCallable$9;
var isNullOrUndefined$6 = isNullOrUndefined$8;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$6(func) ? undefined : aCallable$8(func);
};

var call$k = functionCall;
var isCallable$n = isCallable$s;
var isObject$m = isObject$n;

var $TypeError$e = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$2 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$n(fn = input.toString) && !isObject$m(val = call$k(fn, input))) return val;
  if (isCallable$n(fn = input.valueOf) && !isObject$m(val = call$k(fn, input))) return val;
  if (pref !== 'string' && isCallable$n(fn = input.toString) && !isObject$m(val = call$k(fn, input))) return val;
  throw $TypeError$e("Can't convert object to primitive value");
};

var shared$7 = {exports: {}};

var isPure = false;

var global$r = global$v;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$a = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$a(global$r, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$r[key] = value;
  } return value;
};

var global$q = global$v;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$q[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$7.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.32.0',
  mode: 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.32.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var sharedExports = shared$7.exports;

var requireObjectCoercible$5 = requireObjectCoercible$7;

var $Object$3 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$b = function (argument) {
  return $Object$3(requireObjectCoercible$5(argument));
};

var uncurryThis$z = functionUncurryThis;
var toObject$a = toObject$b;

var hasOwnProperty = uncurryThis$z({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$a(it), key);
};

var uncurryThis$y = functionUncurryThis;

var id$2 = 0;
var postfix = Math.random();
var toString$e = uncurryThis$y(1.0.toString);

var uid$4 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$e(++id$2 + postfix, 36);
};

var global$p = global$v;
var shared$6 = sharedExports;
var hasOwn$l = hasOwnProperty_1;
var uid$3 = uid$4;
var NATIVE_SYMBOL$5 = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$2 = global$p.Symbol;
var WellKnownSymbolsStore$1 = shared$6('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2['for'] || Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$3;

var wellKnownSymbol$o = function (name) {
  if (!hasOwn$l(WellKnownSymbolsStore$1, name)) {
    WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$5 && hasOwn$l(Symbol$2, name)
      ? Symbol$2[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore$1[name];
};

var call$j = functionCall;
var isObject$l = isObject$n;
var isSymbol$4 = isSymbol$5;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive$1 = ordinaryToPrimitive$2;
var wellKnownSymbol$n = wellKnownSymbol$o;

var $TypeError$d = TypeError;
var TO_PRIMITIVE$1 = wellKnownSymbol$n('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$2 = function (input, pref) {
  if (!isObject$l(input) || isSymbol$4(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE$1);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$j(exoticToPrim, input, pref);
    if (!isObject$l(result) || isSymbol$4(result)) return result;
    throw $TypeError$d("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive$1(input, pref);
};

var toPrimitive$1 = toPrimitive$2;
var isSymbol$3 = isSymbol$5;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$4 = function (argument) {
  var key = toPrimitive$1(argument, 'string');
  return isSymbol$3(key) ? key : key + '';
};

var global$o = global$v;
var isObject$k = isObject$n;

var document$3 = global$o.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$k(document$3) && isObject$k(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$l = descriptors;
var fails$y = fails$D;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$l && !fails$y(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$k = descriptors;
var call$i = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$5 = createPropertyDescriptor$6;
var toIndexedObject$8 = toIndexedObject$9;
var toPropertyKey$3 = toPropertyKey$4;
var hasOwn$k = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$k ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$8(O);
  P = toPropertyKey$3(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$2(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$k(O, P)) return createPropertyDescriptor$5(!call$i(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$j = descriptors;
var fails$x = fails$D;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$j && fails$x(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$j = isObject$n;

var $String$5 = String;
var $TypeError$c = TypeError;

// `Assert: Type(argument) is Object`
var anObject$l = function (argument) {
  if (isObject$j(argument)) return argument;
  throw $TypeError$c($String$5(argument) + ' is not an object');
};

var DESCRIPTORS$i = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$k = anObject$l;
var toPropertyKey$2 = toPropertyKey$4;

var $TypeError$b = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$i ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$k(O);
  P = toPropertyKey$2(P);
  anObject$k(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty$1(O, P, Attributes);
} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$k(O);
  P = toPropertyKey$2(P);
  anObject$k(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$b('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$h = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$4 = createPropertyDescriptor$6;

var createNonEnumerableProperty$9 = DESCRIPTORS$h ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$4(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$3 = {exports: {}};

var DESCRIPTORS$g = descriptors;
var hasOwn$j = hasOwnProperty_1;

var FunctionPrototype$2 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$g && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$j(FunctionPrototype$2, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$g || (DESCRIPTORS$g && getDescriptor(FunctionPrototype$2, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$x = functionUncurryThis;
var isCallable$m = isCallable$s;
var store$1 = sharedStore;

var functionToString$1 = uncurryThis$x(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$m(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString$1(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$n = global$v;
var isCallable$l = isCallable$s;

var WeakMap$2 = global$n.WeakMap;

var weakMapBasicDetection = isCallable$l(WeakMap$2) && /native code/.test(String(WeakMap$2));

var shared$5 = sharedExports;
var uid$2 = uid$4;

var keys = shared$5('keys');

var sharedKey$4 = function (key) {
  return keys[key] || (keys[key] = uid$2(key));
};

var hiddenKeys$6 = {};

var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
var global$m = global$v;
var isObject$i = isObject$n;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;
var hasOwn$i = hasOwnProperty_1;
var shared$4 = sharedStore;
var sharedKey$3 = sharedKey$4;
var hiddenKeys$5 = hiddenKeys$6;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$4 = global$m.TypeError;
var WeakMap$1 = global$m.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$i(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$4('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP$1 || shared$4.state) {
  var store = shared$4.state || (shared$4.state = new WeakMap$1());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$1 = function (it, metadata) {
    if (store.has(it)) throw TypeError$4(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$3('state');
  hiddenKeys$5[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$i(it, STATE)) throw TypeError$4(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$8(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$i(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$i(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$w = functionUncurryThis;
var fails$w = fails$D;
var isCallable$k = isCallable$s;
var hasOwn$h = hasOwnProperty_1;
var DESCRIPTORS$f = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$6 = internalState;

var enforceInternalState$1 = InternalStateModule$6.enforce;
var getInternalState$4 = InternalStateModule$6.get;
var $String$4 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$9 = Object.defineProperty;
var stringSlice$7 = uncurryThis$w(''.slice);
var replace$6 = uncurryThis$w(''.replace);
var join$1 = uncurryThis$w([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$f && !fails$w(function () {
  return defineProperty$9(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
  if (stringSlice$7($String$4(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$6($String$4(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$h(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$f) defineProperty$9(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$h(options, 'arity') && value.length !== options.arity) {
    defineProperty$9(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$h(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$f) defineProperty$9(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState$1(value);
  if (!hasOwn$h(state, 'source')) {
    state.source = join$1(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$2(function toString() {
  return isCallable$k(this) && getInternalState$4(this).source || inspectSource$2(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$3.exports;

var isCallable$j = isCallable$s;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn$1 = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$f = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$j(value)) makeBuiltIn$1(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$4.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$3 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$3 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$6 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$5 = toIntegerOrInfinity$6;

var max$3 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$3 = function (index, length) {
  var integer = toIntegerOrInfinity$5(index);
  return integer < 0 ? max$3(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$4 = toIntegerOrInfinity$6;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$8 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$7 = toIndexedObject$9;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;
var lengthOfArrayLike$7 = lengthOfArrayLike$8;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$4 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$7($this);
    var length = lengthOfArrayLike$7(O);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$4(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$4(false)
};

var uncurryThis$v = functionUncurryThis;
var hasOwn$g = hasOwnProperty_1;
var toIndexedObject$6 = toIndexedObject$9;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$4 = hiddenKeys$6;

var push$6 = uncurryThis$v([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$6(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$g(hiddenKeys$4, key) && hasOwn$g(O, key) && push$6(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$g(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$6(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$3);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$b = getBuiltIn$d;
var uncurryThis$u = functionUncurryThis;
var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
var anObject$j = anObject$l;

var concat$2 = uncurryThis$u([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$b('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$2.f(anObject$j(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$f = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;

var copyConstructorProperties$4 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$3.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$f(target, key) && !(exceptions && hasOwn$f(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$v = fails$D;
var isCallable$i = isCallable$s;

var replacement = /#|\.prototype\./;

var isForced$4 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$i(detection) ? fails$v(detection)
    : !!detection;
};

var normalize = isForced$4.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$4.data = {};
var NATIVE = isForced$4.NATIVE = 'N';
var POLYFILL = isForced$4.POLYFILL = 'P';

var isForced_1 = isForced$4;

var global$l = global$v;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
var defineBuiltIn$e = defineBuiltIn$f;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$3 = copyConstructorProperties$4;
var isForced$3 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$l;
  } else if (STATIC) {
    target = global$l[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$l[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$3(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$3(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$7(sourceProperty, 'sham', true);
    }
    defineBuiltIn$e(target, key, sourceProperty, options);
  }
};

var uncurryThis$t = functionUncurryThis;

var arraySlice$4 = uncurryThis$t([].slice);

var uncurryThis$s = functionUncurryThis;
var aCallable$7 = aCallable$9;
var isObject$h = isObject$n;
var hasOwn$e = hasOwnProperty_1;
var arraySlice$3 = arraySlice$4;
var NATIVE_BIND$2 = functionBindNative;

var $Function = Function;
var concat$1 = uncurryThis$s([].concat);
var join = uncurryThis$s([].join);
var factories = {};

var construct$1 = function (C, argsLength, args) {
  if (!hasOwn$e(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
// eslint-disable-next-line es/no-function-prototype-bind -- detection
var functionBind = NATIVE_BIND$2 ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable$7(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice$3(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat$1(partArgs, arraySlice$3(arguments));
    return this instanceof boundFunction ? construct$1(F, args.length, args) : F.apply(that, args);
  };
  if (isObject$h(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};

// TODO: Remove from `core-js@4`
var $$E = _export;
var bind$9 = functionBind;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
// eslint-disable-next-line es/no-function-prototype-bind -- detection
$$E({ target: 'Function', proto: true, forced: Function.bind !== bind$9 }, {
  bind: bind$9
});

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$1 = Function.prototype;
var apply$5 = FunctionPrototype$1.apply;
var call$h = FunctionPrototype$1.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$h.bind(apply$5) : function () {
  return call$h.apply(apply$5, arguments);
});

var wellKnownSymbol$m = wellKnownSymbol$o;

var TO_STRING_TAG$3 = wellKnownSymbol$m('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$h = isCallable$s;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$l = wellKnownSymbol$o;

var TO_STRING_TAG$2 = wellKnownSymbol$l('toStringTag');
var $Object$2 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$a = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw$1(O)
    // ES3 arguments fallback
    : (result = classofRaw$1(O)) == 'Object' && isCallable$h(O.callee) ? 'Arguments' : result;
};

var uncurryThis$r = functionUncurryThis;
var fails$u = fails$D;
var isCallable$g = isCallable$s;
var classof$9 = classof$a;
var getBuiltIn$a = getBuiltIn$d;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$a('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$3 = uncurryThis$r(constructorRegExp.exec);
var INCORRECT_TO_STRING$1 = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$g(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$g(argument)) return false;
  switch (classof$9(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING$1 || !!exec$3(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$4 = !construct || fails$u(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor$3 = isConstructor$4;
var tryToString$3 = tryToString$5;

var $TypeError$a = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$2 = function (argument) {
  if (isConstructor$3(argument)) return argument;
  throw $TypeError$a(tryToString$3(argument) + ' is not a constructor');
};

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$3 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$e = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$i = anObject$l;
var toIndexedObject$5 = toIndexedObject$9;
var objectKeys$2 = objectKeys$3;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$e && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$i(O);
  var props = toIndexedObject$5(Properties);
  var keys = objectKeys$2(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$9 = getBuiltIn$d;

var html$2 = getBuiltIn$9('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$h = anObject$l;
var definePropertiesModule$1 = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$6;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$2 = sharedKey$4;

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$2[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$h(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
};

var $$D = _export;
var getBuiltIn$8 = getBuiltIn$d;
var apply$4 = functionApply;
var bind$8 = functionBind;
var aConstructor$1 = aConstructor$2;
var anObject$g = anObject$l;
var isObject$g = isObject$n;
var create$6 = objectCreate;
var fails$t = fails$D;

var nativeConstruct = getBuiltIn$8('Reflect', 'construct');
var ObjectPrototype$3 = Object.prototype;
var push$5 = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails$t(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails$t(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED$7 = NEW_TARGET_BUG || ARGS_BUG;

$$D({ target: 'Reflect', stat: true, forced: FORCED$7, sham: FORCED$7 }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor$1(Target);
    anObject$g(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor$1(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply$4(push$5, $args, args);
      return new (apply$4(bind$8, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create$6(isObject$g(proto) ? proto : ObjectPrototype$3);
    var result = apply$4(Target, instance, args);
    return isObject$g(result) ? result : instance;
  }
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$8 = classof$a;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$8(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn$d = defineBuiltIn$f;
var toString$d = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn$d(Object.prototype, 'toString', toString$d, { unsafe: true });
}

var defineProperty$8 = objectDefineProperty.f;
var hasOwn$d = hasOwnProperty_1;
var wellKnownSymbol$k = wellKnownSymbol$o;

var TO_STRING_TAG$1 = wellKnownSymbol$k('toStringTag');

var setToStringTag$9 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$d(target, TO_STRING_TAG$1)) {
    defineProperty$8(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
  }
};

var $$C = _export;
var global$k = global$v;
var setToStringTag$8 = setToStringTag$9;

$$C({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag$8(global$k.Reflect, 'Reflect', true);

var classof$7 = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$8 = Array.isArray || function isArray(argument) {
  return classof$7(argument) == 'Array';
};

var DESCRIPTORS$d = descriptors;
var isArray$7 = isArray$8;

var $TypeError$9 = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$d && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray$7(O) && !getOwnPropertyDescriptor$2(O, 'length').writable) {
    throw $TypeError$9('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

var $TypeError$8 = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$2 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$8('Maximum allowed index exceeded');
  return it;
};

var $$B = _export;
var toObject$9 = toObject$b;
var lengthOfArrayLike$6 = lengthOfArrayLike$8;
var setArrayLength = arraySetLength;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
var fails$s = fails$D;

var INCORRECT_TO_LENGTH = fails$s(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED$6 = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$$B({ target: 'Array', proto: true, arity: 1, forced: FORCED$6 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$9(this);
    var len = lengthOfArrayLike$6(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger$1(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});

var uncurryThis$q = functionUncurryThis;
var aCallable$6 = aCallable$9;

var functionUncurryThisAccessor = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis$q(aCallable$6(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

var isCallable$f = isCallable$s;

var $String$3 = String;
var $TypeError$7 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$f(argument)) return argument;
  throw $TypeError$7("Can't set " + $String$3(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = functionUncurryThisAccessor;
var anObject$f = anObject$l;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$f(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$A = _export;
var setPrototypeOf$5 = objectSetPrototypeOf;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$$A({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf$5
});

var makeBuiltIn = makeBuiltInExports;
var defineProperty$7 = objectDefineProperty;

var defineBuiltInAccessor$6 = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty$7.f(target, name, descriptor);
};

var DESCRIPTORS$c = descriptors;
var defineBuiltInAccessor$5 = defineBuiltInAccessor$6;
var isObject$f = isObject$n;
var toObject$8 = toObject$b;
var requireObjectCoercible$4 = requireObjectCoercible$7;

// eslint-disable-next-line es/no-object-getprototypeof -- safe
var getPrototypeOf$2 = Object.getPrototypeOf;
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var setPrototypeOf$4 = Object.setPrototypeOf;
var ObjectPrototype$2 = Object.prototype;
var PROTO = '__proto__';

// `Object.prototype.__proto__` accessor
// https://tc39.es/ecma262/#sec-object.prototype.__proto__
if (DESCRIPTORS$c && getPrototypeOf$2 && setPrototypeOf$4 && !(PROTO in ObjectPrototype$2)) try {
  defineBuiltInAccessor$5(ObjectPrototype$2, PROTO, {
    configurable: true,
    get: function __proto__() {
      return getPrototypeOf$2(toObject$8(this));
    },
    set: function __proto__(proto) {
      var O = requireObjectCoercible$4(this);
      if (!isObject$f(proto) && proto !== null || !isObject$f(O)) return;
      setPrototypeOf$4(O, proto);
    }
  });
} catch (error) { /* empty */ }

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

var defineProperty$6 = objectDefineProperty.f;

var proxyAccessor$1 = function (Target, Source, key) {
  key in Target || defineProperty$6(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$e = isCallable$s;
var isObject$e = isObject$n;
var setPrototypeOf$3 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$3 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$e(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$e(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$3($this, NewTargetPrototype);
  return $this;
};

var classof$6 = classof$a;

var $String$2 = String;

var toString$c = function (argument) {
  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String$2(argument);
};

var toString$b = toString$c;

var normalizeStringArgument$2 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$b(argument);
};

var isObject$d = isObject$n;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$d(options) && 'cause' in options) {
    createNonEnumerableProperty$6(O, 'cause', options.cause);
  }
};

var uncurryThis$p = functionUncurryThis;

var $Error = Error;
var replace$5 = uncurryThis$p(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var errorStackClear = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace$5(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$r = fails$D;
var createPropertyDescriptor$3 = createPropertyDescriptor$6;

var errorStackInstallable = !fails$r(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$3(1, 7));
  return error.stack !== 7;
});

var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
var clearErrorStack = errorStackClear;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

var errorStackInstall = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty$5(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};

var getBuiltIn$7 = getBuiltIn$d;
var hasOwn$c = hasOwnProperty_1;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
var isPrototypeOf$6 = objectIsPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var copyConstructorProperties$2 = copyConstructorProperties$4;
var proxyAccessor = proxyAccessor$1;
var inheritIfRequired$2 = inheritIfRequired$3;
var normalizeStringArgument$1 = normalizeStringArgument$2;
var installErrorCause = installErrorCause$1;
var installErrorStack = errorStackInstall;
var DESCRIPTORS$b = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$7.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$c(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$7('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument$1(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$4(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf$6(OriginalErrorPrototype, this)) inheritIfRequired$2(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$2) setPrototypeOf$2(WrappedError, BaseError);
    else copyConstructorProperties$2(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$b && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties$2(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$4(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $$z = _export;
var global$j = global$v;
var apply$3 = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global$j[WEB_ASSEMBLY];

var FORCED$5 = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$5);
  $$z({ global: true, constructor: true, arity: 1, forced: FORCED$5 }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$5);
    $$z({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$5 }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply$3(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply$3(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply$3(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply$3(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply$3(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply$3(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply$3(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply$3(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply$3(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply$3(init, this, arguments); };
});

var DESCRIPTORS$a = descriptors;
var fails$q = fails$D;
var anObject$e = anObject$l;
var create$5 = objectCreate;
var normalizeStringArgument = normalizeStringArgument$2;

var nativeErrorToString = Error.prototype.toString;

var INCORRECT_TO_STRING = fails$q(function () {
  if (DESCRIPTORS$a) {
    // Chrome 32- incorrectly call accessor
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var object = create$5(Object.defineProperty({}, 'name', { get: function () {
      return this === object;
    } }));
    if (nativeErrorToString.call(object) !== 'true') return true;
  }
  // FF10- does not properly handle non-strings
  return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1'
    // IE8 does not properly handle defaults
    || nativeErrorToString.call({}) !== 'Error';
});

var errorToString$1 = INCORRECT_TO_STRING ? function toString() {
  var O = anObject$e(this);
  var name = normalizeStringArgument(O.name, 'Error');
  var message = normalizeStringArgument(O.message);
  return !name ? message : !message ? name : name + ': ' + message;
} : nativeErrorToString;

var defineBuiltIn$c = defineBuiltIn$f;
var errorToString = errorToString$1;

var ErrorPrototype = Error.prototype;

// `Error.prototype.toString` method fix
// https://tc39.es/ecma262/#sec-error.prototype.tostring
if (ErrorPrototype.toString !== errorToString) {
  defineBuiltIn$c(ErrorPrototype, 'toString', errorToString);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var $$y = _export;
var DESCRIPTORS$9 = descriptors;
var defineProperty$5 = objectDefineProperty.f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$$y({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$5, sham: !DESCRIPTORS$9 }, {
  defineProperty: defineProperty$5
});

var objectGetOwnPropertyNamesExternal = {};

var toPropertyKey$1 = toPropertyKey$4;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$6;

var createProperty$4 = function (object, key, value) {
  var propertyKey = toPropertyKey$1(key);
  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$2(0, value));
  else object[propertyKey] = value;
};

var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var lengthOfArrayLike$5 = lengthOfArrayLike$8;
var createProperty$3 = createProperty$4;

var $Array$3 = Array;
var max$2 = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$5(O);
  var k = toAbsoluteIndex$1(start, length);
  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
  var result = $Array$3(max$2(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty$3(result, n, O[k]);
  result.length = n;
  return result;
};

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof$5 = classofRaw$2;
var toIndexedObject$4 = toIndexedObject$9;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var arraySlice$2 = arraySliceSimple;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return arraySlice$2(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof$5(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject$4(it));
};

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$j = wellKnownSymbol$o;

wellKnownSymbolWrapped.f = wellKnownSymbol$j;

var global$i = global$v;

var path$2 = global$i;

var path$1 = path$2;
var hasOwn$b = hasOwnProperty_1;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$4 = objectDefineProperty.f;

var wellKnownSymbolDefine = function (NAME) {
  var Symbol = path$1.Symbol || (path$1.Symbol = {});
  if (!hasOwn$b(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var call$g = functionCall;
var getBuiltIn$6 = getBuiltIn$d;
var wellKnownSymbol$i = wellKnownSymbol$o;
var defineBuiltIn$b = defineBuiltIn$f;

var symbolDefineToPrimitive = function () {
  var Symbol = getBuiltIn$6('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol$i('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn$b(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call$g(valueOf, this);
    }, { arity: 1 });
  }
};

var classofRaw = classofRaw$2;
var uncurryThis$o = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis$o(fn);
};

var uncurryThis$n = functionUncurryThisClause;
var aCallable$5 = aCallable$9;
var NATIVE_BIND = functionBindNative;

var bind$7 = uncurryThis$n(uncurryThis$n.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$5(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$7(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var isArray$6 = isArray$8;
var isConstructor$2 = isConstructor$4;
var isObject$c = isObject$n;
var wellKnownSymbol$h = wellKnownSymbol$o;

var SPECIES$6 = wellKnownSymbol$h('species');
var $Array$2 = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$6(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor$2(C) && (C === $Array$2 || isArray$6(C.prototype))) C = undefined;
    else if (isObject$c(C)) {
      C = C[SPECIES$6];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array$2 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$6 = functionBindContext;
var uncurryThis$m = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject$7 = toObject$b;
var lengthOfArrayLike$4 = lengthOfArrayLike$8;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;

var push$4 = uncurryThis$m([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$3 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$7($this);
    var self = IndexedObject(O);
    var boundFunction = bind$6(callbackfn, that);
    var length = lengthOfArrayLike$4(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$1;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$4(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$4(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$3(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$3(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$3(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$3(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$3(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$3(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$3(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$3(7)
};

var $$x = _export;
var global$h = global$v;
var call$f = functionCall;
var uncurryThis$l = functionUncurryThis;
var DESCRIPTORS$8 = descriptors;
var NATIVE_SYMBOL$4 = symbolConstructorDetection;
var fails$p = fails$D;
var hasOwn$a = hasOwnProperty_1;
var isPrototypeOf$5 = objectIsPrototypeOf;
var anObject$d = anObject$l;
var toIndexedObject$3 = toIndexedObject$9;
var toPropertyKey = toPropertyKey$4;
var $toString$1 = toString$c;
var createPropertyDescriptor$1 = createPropertyDescriptor$6;
var nativeObjectCreate = objectCreate;
var objectKeys$1 = objectKeys$3;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;
var definePropertiesModule = objectDefineProperties;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var defineBuiltIn$a = defineBuiltIn$f;
var defineBuiltInAccessor$4 = defineBuiltInAccessor$6;
var shared$3 = sharedExports;
var sharedKey$1 = sharedKey$4;
var hiddenKeys$1 = hiddenKeys$6;
var uid$1 = uid$4;
var wellKnownSymbol$g = wellKnownSymbol$o;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$4 = wellKnownSymbolDefine;
var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
var setToStringTag$7 = setToStringTag$9;
var InternalStateModule$5 = internalState;
var $forEach$1 = arrayIteration.forEach;

var HIDDEN = sharedKey$1('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState$5 = InternalStateModule$5.set;
var getInternalState$3 = InternalStateModule$5.getterFor(SYMBOL);

var ObjectPrototype$1 = Object[PROTOTYPE];
var $Symbol = global$h.Symbol;
var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
var TypeError$3 = global$h.TypeError;
var QObject = global$h.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push$3 = uncurryThis$l([].push);

var AllSymbols = shared$3('symbols');
var ObjectPrototypeSymbols = shared$3('op-symbols');
var WellKnownSymbolsStore = shared$3('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS$8 && fails$p(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
  setInternalState$5(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$8) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject$d(O);
  var key = toPropertyKey(P);
  anObject$d(Attributes);
  if (hasOwn$a(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn$a(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn$a(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject$d(O);
  var properties = toIndexedObject$3(Properties);
  var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
  $forEach$1(keys, function (key) {
    if (!DESCRIPTORS$8 || call$f($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call$f(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype$1 && hasOwn$a(AllSymbols, P) && !hasOwn$a(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn$a(this, P) || !hasOwn$a(AllSymbols, P) || hasOwn$a(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$3(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype$1 && hasOwn$a(AllSymbols, key) && !hasOwn$a(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn$a(AllSymbols, key) && !(hasOwn$a(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (!hasOwn$a(AllSymbols, key) && !hasOwn$a(hiddenKeys$1, key)) push$3(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
  var result = [];
  $forEach$1(names, function (key) {
    if (hasOwn$a(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$a(ObjectPrototype$1, key))) {
      push$3(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL$4) {
  $Symbol = function Symbol() {
    if (isPrototypeOf$5(SymbolPrototype$1, this)) throw TypeError$3('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString$1(arguments[0]);
    var tag = uid$1(description);
    var setter = function (value) {
      if (this === ObjectPrototype$1) call$f(setter, ObjectPrototypeSymbols, value);
      if (hasOwn$a(this, HIDDEN) && hasOwn$a(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
    };
    if (DESCRIPTORS$8 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype$1 = $Symbol[PROTOTYPE];

  defineBuiltIn$a(SymbolPrototype$1, 'toString', function toString() {
    return getInternalState$3(this).tag;
  });

  defineBuiltIn$a($Symbol, 'withoutSetter', function (description) {
    return wrap(uid$1(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable$1;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol$g(name), name);
  };

  if (DESCRIPTORS$8) {
    // https://github.com/tc39/proposal-Symbol-description
    defineBuiltInAccessor$4(SymbolPrototype$1, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$3(this).description;
      }
    });
    {
      defineBuiltIn$a(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable$1, { unsafe: true });
    }
  }
}

$$x({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$4, sham: !NATIVE_SYMBOL$4 }, {
  Symbol: $Symbol
});

$forEach$1(objectKeys$1(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol$4(name);
});

$$x({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$4 }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$$x({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4, sham: !DESCRIPTORS$8 }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$$x({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4 }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive$1();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$7($Symbol, SYMBOL);

hiddenKeys$1[HIDDEN] = true;

var NATIVE_SYMBOL$3 = symbolConstructorDetection;

/* eslint-disable es/no-symbol -- safe */
var symbolRegistryDetection = NATIVE_SYMBOL$3 && !!Symbol['for'] && !!Symbol.keyFor;

var $$w = _export;
var getBuiltIn$5 = getBuiltIn$d;
var hasOwn$9 = hasOwnProperty_1;
var toString$a = toString$c;
var shared$2 = sharedExports;
var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;

var StringToSymbolRegistry = shared$2('string-to-symbol-registry');
var SymbolToStringRegistry$1 = shared$2('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$$w({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
  'for': function (key) {
    var string = toString$a(key);
    if (hasOwn$9(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn$5('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry$1[symbol] = string;
    return symbol;
  }
});

var $$v = _export;
var hasOwn$8 = hasOwnProperty_1;
var isSymbol$2 = isSymbol$5;
var tryToString$2 = tryToString$5;
var shared$1 = sharedExports;
var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;

var SymbolToStringRegistry = shared$1('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$$v({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol$2(sym)) throw TypeError(tryToString$2(sym) + ' is not a symbol');
    if (hasOwn$8(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});

var uncurryThis$k = functionUncurryThis;
var isArray$5 = isArray$8;
var isCallable$d = isCallable$s;
var classof$4 = classofRaw$2;
var toString$9 = toString$c;

var push$2 = uncurryThis$k([].push);

var getJsonReplacerFunction = function (replacer) {
  if (isCallable$d(replacer)) return replacer;
  if (!isArray$5(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push$2(keys, element);
    else if (typeof element == 'number' || classof$4(element) == 'Number' || classof$4(element) == 'String') push$2(keys, toString$9(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray$5(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};

var $$u = _export;
var getBuiltIn$4 = getBuiltIn$d;
var apply$2 = functionApply;
var call$e = functionCall;
var uncurryThis$j = functionUncurryThis;
var fails$o = fails$D;
var isCallable$c = isCallable$s;
var isSymbol$1 = isSymbol$5;
var arraySlice$1 = arraySlice$4;
var getReplacerFunction = getJsonReplacerFunction;
var NATIVE_SYMBOL$2 = symbolConstructorDetection;

var $String$1 = String;
var $stringify = getBuiltIn$4('JSON', 'stringify');
var exec$2 = uncurryThis$j(/./.exec);
var charAt$5 = uncurryThis$j(''.charAt);
var charCodeAt$2 = uncurryThis$j(''.charCodeAt);
var replace$4 = uncurryThis$j(''.replace);
var numberToString = uncurryThis$j(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$2 || fails$o(function () {
  var symbol = getBuiltIn$4('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails$o(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice$1(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable$c($replacer) && (it === undefined || isSymbol$1(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable$c($replacer)) value = call$e($replacer, this, $String$1(key), value);
    if (!isSymbol$1(value)) return value;
  };
  return apply$2($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt$5(string, offset - 1);
  var next = charAt$5(string, offset + 1);
  if ((exec$2(low, match) && !exec$2(hi, next)) || (exec$2(hi, match) && !exec$2(low, prev))) {
    return '\\u' + numberToString(charCodeAt$2(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $$u({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice$1(arguments);
      var result = apply$2(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$4(result, tester, fixIllFormed) : result;
    }
  });
}

var $$t = _export;
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var fails$n = fails$D;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var toObject$6 = toObject$b;

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED$4 = !NATIVE_SYMBOL$1 || fails$n(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$$t({ target: 'Object', stat: true, forced: FORCED$4 }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$6(it)) : [];
  }
});

var $$s = _export;
var DESCRIPTORS$7 = descriptors;
var global$g = global$v;
var uncurryThis$i = functionUncurryThis;
var hasOwn$7 = hasOwnProperty_1;
var isCallable$b = isCallable$s;
var isPrototypeOf$4 = objectIsPrototypeOf;
var toString$8 = toString$c;
var defineBuiltInAccessor$3 = defineBuiltInAccessor$6;
var copyConstructorProperties$1 = copyConstructorProperties$4;

var NativeSymbol = global$g.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS$7 && isCallable$b(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$8(arguments[0]);
    var result = isPrototypeOf$4(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties$1(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var thisSymbolValue = uncurryThis$i(SymbolPrototype.valueOf);
  var symbolDescriptiveString = uncurryThis$i(SymbolPrototype.toString);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace$3 = uncurryThis$i(''.replace);
  var stringSlice$6 = uncurryThis$i(''.slice);

  defineBuiltInAccessor$3(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = thisSymbolValue(this);
      if (hasOwn$7(EmptyStringDescriptionStore, symbol)) return '';
      var string = symbolDescriptiveString(symbol);
      var desc = NATIVE_SYMBOL ? stringSlice$6(string, 7, -1) : replace$3(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $$s({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

var defineWellKnownSymbol$3 = wellKnownSymbolDefine;

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol$3('iterator');

var wellKnownSymbol$f = wellKnownSymbol$o;
var create$4 = objectCreate;
var defineProperty$3 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$f('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$3(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$4(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$m = fails$D;

var correctPrototypeGetter = !fails$m(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$6 = hasOwnProperty_1;
var isCallable$a = isCallable$s;
var toObject$5 = toObject$b;
var sharedKey = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$1 ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$5(O);
  if (hasOwn$6(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$a(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype : null;
};

var fails$l = fails$D;
var isCallable$9 = isCallable$s;
var isObject$b = isObject$n;
var getPrototypeOf$1 = objectGetPrototypeOf$1;
var defineBuiltIn$9 = defineBuiltIn$f;
var wellKnownSymbol$e = wellKnownSymbol$o;

var ITERATOR$6 = wellKnownSymbol$e('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$b(IteratorPrototype$2) || fails$l(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$6].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$9(IteratorPrototype$2[ITERATOR$6])) {
  defineBuiltIn$9(IteratorPrototype$2, ITERATOR$6, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$3 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$6;
var setToStringTag$6 = setToStringTag$9;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$3(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag$6(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$r = _export;
var call$d = functionCall;
var FunctionName = functionName;
var isCallable$8 = isCallable$s;
var createIteratorConstructor = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf$1;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$5 = setToStringTag$9;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
var defineBuiltIn$8 = defineBuiltIn$f;
var wellKnownSymbol$d = wellKnownSymbol$o;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$5 = wellKnownSymbol$d('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$5]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$8(CurrentIteratorPrototype[ITERATOR$5])) {
          defineBuiltIn$8(CurrentIteratorPrototype, ITERATOR$5, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$5(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$3(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$d(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$8(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$r({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$5] !== defaultIterator) {
    defineBuiltIn$8(IterablePrototype, ITERATOR$5, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$3 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject$2 = toIndexedObject$9;
var addToUnscopables = addToUnscopables$1;
var Iterators$2 = iterators;
var InternalStateModule$4 = internalState;
var defineProperty$2 = objectDefineProperty.f;
var defineIterator$2 = iteratorDefine;
var createIterResultObject$2 = createIterResultObject$3;
var DESCRIPTORS$6 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$4 = InternalStateModule$4.set;
var getInternalState$2 = InternalStateModule$4.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
  setInternalState$4(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$2(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject$2(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject$2(index, false);
  if (kind == 'values') return createIterResultObject$2(target[index], false);
  return createIterResultObject$2([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$6 && values.name !== 'values') try {
  defineProperty$2(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var uncurryThis$h = functionUncurryThis;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$6;
var toString$7 = toString$c;
var requireObjectCoercible$3 = requireObjectCoercible$7;

var charAt$4 = uncurryThis$h(''.charAt);
var charCodeAt$1 = uncurryThis$h(''.charCodeAt);
var stringSlice$5 = uncurryThis$h(''.slice);

var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$7(requireObjectCoercible$3($this));
    var position = toIntegerOrInfinity$3(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$4(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$5(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt$3 = stringMultibyte.charAt;
var toString$6 = toString$c;
var InternalStateModule$3 = internalState;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$1 = createIterResultObject$3;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$3 = InternalStateModule$3.set;
var getInternalState$1 = InternalStateModule$3.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator$1(String, 'String', function (iterated) {
  setInternalState$3(this, {
    type: STRING_ITERATOR,
    string: toString$6(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject$1(undefined, true);
  point = charAt$3(string, index);
  state.index += point.length;
  return createIterResultObject$1(point, false);
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

var global$f = global$v;
var DOMIterables$1 = domIterables;
var DOMTokenListPrototype$1 = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
var wellKnownSymbol$c = wellKnownSymbol$o;

var ITERATOR$4 = wellKnownSymbol$c('iterator');
var TO_STRING_TAG = wellKnownSymbol$c('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$4] !== ArrayValues) try {
      createNonEnumerableProperty$2(CollectionPrototype, ITERATOR$4, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$4] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty$2(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables$1[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$2(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME$1 in DOMIterables$1) {
  handlePrototype$1(global$f[COLLECTION_NAME$1] && global$f[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
}

handlePrototype$1(DOMTokenListPrototype$1, 'DOMTokenList');

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var defineWellKnownSymbol$2 = wellKnownSymbolDefine;
var defineSymbolToPrimitive = symbolDefineToPrimitive;

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol$2('toPrimitive');

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

var anObject$c = anObject$l;
var ordinaryToPrimitive = ordinaryToPrimitive$2;

var $TypeError$6 = TypeError;

// `Date.prototype[@@toPrimitive](hint)` method implementation
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
var dateToPrimitive$1 = function (hint) {
  anObject$c(this);
  if (hint === 'string' || hint === 'default') hint = 'string';
  else if (hint !== 'number') throw $TypeError$6('Incorrect hint');
  return ordinaryToPrimitive(this, hint);
};

var hasOwn$5 = hasOwnProperty_1;
var defineBuiltIn$7 = defineBuiltIn$f;
var dateToPrimitive = dateToPrimitive$1;
var wellKnownSymbol$b = wellKnownSymbol$o;

var TO_PRIMITIVE = wellKnownSymbol$b('toPrimitive');
var DatePrototype$1 = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
if (!hasOwn$5(DatePrototype$1, TO_PRIMITIVE)) {
  defineBuiltIn$7(DatePrototype$1, TO_PRIMITIVE, dateToPrimitive);
}

var uncurryThis$g = functionUncurryThis;

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
var thisNumberValue$2 = uncurryThis$g(1.0.valueOf);

// a string of all valid unicode whitespaces
var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$f = functionUncurryThis;
var requireObjectCoercible$2 = requireObjectCoercible$7;
var toString$5 = toString$c;
var whitespaces$1 = whitespaces$2;

var replace$2 = uncurryThis$f(''.replace);
var ltrim = RegExp('^[' + whitespaces$1 + ']+');
var rtrim = RegExp('(^|[^' + whitespaces$1 + '])[' + whitespaces$1 + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$1 = function (TYPE) {
  return function ($this) {
    var string = toString$5(requireObjectCoercible$2($this));
    if (TYPE & 1) string = replace$2(string, ltrim, '');
    if (TYPE & 2) string = replace$2(string, rtrim, '$1');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};

var $$q = _export;
var IS_PURE = isPure;
var DESCRIPTORS$5 = descriptors;
var global$e = global$v;
var path = path$2;
var uncurryThis$e = functionUncurryThis;
var isForced$2 = isForced_1;
var hasOwn$4 = hasOwnProperty_1;
var inheritIfRequired$1 = inheritIfRequired$3;
var isPrototypeOf$3 = objectIsPrototypeOf;
var isSymbol = isSymbol$5;
var toPrimitive = toPrimitive$2;
var fails$k = fails$D;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var defineProperty$1 = objectDefineProperty.f;
var thisNumberValue$1 = thisNumberValue$2;
var trim$1 = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global$e[NUMBER];
path[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError$2 = global$e.TypeError;
var stringSlice$4 = uncurryThis$e(''.slice);
var charCodeAt = uncurryThis$e(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim$1(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = stringSlice$4(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

var FORCED$3 = isForced$2(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

var calledWithNew = function (dummy) {
  // includes check on 1..constructor(foo) case
  return isPrototypeOf$3(NumberPrototype, dummy) && fails$k(function () { thisNumberValue$1(dummy); });
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
var NumberWrapper = function Number(value) {
  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
  return calledWithNew(this) ? inheritIfRequired$1(Object(n), this, NumberWrapper) : n;
};

NumberWrapper.prototype = NumberPrototype;
if (FORCED$3 && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

$$q({ global: true, constructor: true, wrap: true, forced: FORCED$3 }, {
  Number: NumberWrapper
});

// Use `internal/copy-constructor-properties` helper in `core-js@4`
var copyConstructorProperties = function (target, source) {
  for (var keys = DESCRIPTORS$5 ? getOwnPropertyNames(source) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn$4(source, key = keys[j]) && !hasOwn$4(target, key)) {
      defineProperty$1(target, key, getOwnPropertyDescriptor$1(source, key));
    }
  }
};
if (FORCED$3 || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var fails$j = fails$D;

var freezing = !fails$j(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var defineBuiltIn$6 = defineBuiltIn$f;

var defineBuiltIns$3 = function (target, src, options) {
  for (var key in src) defineBuiltIn$6(target, key, src[key], options);
  return target;
};

var internalMetadata = {exports: {}};

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails$i = fails$D;

var arrayBufferNonExtensible = fails$i(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

var fails$h = fails$D;
var isObject$a = isObject$n;
var classof$3 = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES$2 = fails$h(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
var objectIsExtensible = (FAILS_ON_PRIMITIVES$2 || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject$a(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$3(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

var $$p = _export;
var uncurryThis$d = functionUncurryThis;
var hiddenKeys = hiddenKeys$6;
var isObject$9 = isObject$n;
var hasOwn$3 = hasOwnProperty_1;
var defineProperty = objectDefineProperty.f;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
var isExtensible$1 = objectIsExtensible;
var uid = uid$4;
var FREEZING$1 = freezing;

var REQUIRED = false;
var METADATA = uid('meta');
var id$1 = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id$1++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey$1 = function (it, create) {
  // return a primitive with prefix
  if (!isObject$9(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn$3(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible$1(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData$1 = function (it, create) {
  if (!hasOwn$3(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible$1(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING$1 && REQUIRED && isExtensible$1(it) && !hasOwn$3(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis$d([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $$p({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = internalMetadata.exports = {
  enable: enable,
  fastKey: fastKey$1,
  getWeakData: getWeakData$1,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

var internalMetadataExports = internalMetadata.exports;

var wellKnownSymbol$a = wellKnownSymbol$o;
var Iterators$1 = iterators;

var ITERATOR$3 = wellKnownSymbol$a('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$2 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it);
};

var classof$2 = classof$a;
var getMethod$2 = getMethod$4;
var isNullOrUndefined$5 = isNullOrUndefined$8;
var Iterators = iterators;
var wellKnownSymbol$9 = wellKnownSymbol$o;

var ITERATOR$2 = wellKnownSymbol$9('iterator');

var getIteratorMethod$3 = function (it) {
  if (!isNullOrUndefined$5(it)) return getMethod$2(it, ITERATOR$2)
    || getMethod$2(it, '@@iterator')
    || Iterators[classof$2(it)];
};

var call$c = functionCall;
var aCallable$4 = aCallable$9;
var anObject$b = anObject$l;
var tryToString$1 = tryToString$5;
var getIteratorMethod$2 = getIteratorMethod$3;

var $TypeError$5 = TypeError;

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
  if (aCallable$4(iteratorMethod)) return anObject$b(call$c(iteratorMethod, argument));
  throw $TypeError$5(tryToString$1(argument) + ' is not iterable');
};

var call$b = functionCall;
var anObject$a = anObject$l;
var getMethod$1 = getMethod$4;

var iteratorClose$2 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$a(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$b(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$a(innerResult);
  return value;
};

var bind$5 = functionBindContext;
var call$a = functionCall;
var anObject$9 = anObject$l;
var tryToString = tryToString$5;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
var lengthOfArrayLike$3 = lengthOfArrayLike$8;
var isPrototypeOf$2 = objectIsPrototypeOf;
var getIterator$1 = getIterator$2;
var getIteratorMethod$1 = getIteratorMethod$3;
var iteratorClose$1 = iteratorClose$2;

var $TypeError$4 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$5 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$5(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$1(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$9(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$1(iterable);
    if (!iterFn) throw $TypeError$4(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$1(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$3(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$2(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator$1(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$a(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf$2(ResultPrototype, result)) return result;
  } return new Result(false);
};

var isPrototypeOf$1 = objectIsPrototypeOf;

var $TypeError$3 = TypeError;

var anInstance$4 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it;
  throw $TypeError$3('Incorrect invocation');
};

var wellKnownSymbol$8 = wellKnownSymbol$o;

var ITERATOR$1 = wellKnownSymbol$8('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$1] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$1] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var $$o = _export;
var global$d = global$v;
var uncurryThis$c = functionUncurryThis;
var isForced$1 = isForced_1;
var defineBuiltIn$5 = defineBuiltIn$f;
var InternalMetadataModule$1 = internalMetadataExports;
var iterate$4 = iterate$5;
var anInstance$3 = anInstance$4;
var isCallable$7 = isCallable$s;
var isNullOrUndefined$4 = isNullOrUndefined$8;
var isObject$8 = isObject$n;
var fails$g = fails$D;
var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;
var setToStringTag$4 = setToStringTag$9;
var inheritIfRequired = inheritIfRequired$3;

var collection$2 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global$d[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis$c(NativePrototype[KEY]);
    defineBuiltIn$5(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject$8(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject$8(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject$8(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced$1(
    CONSTRUCTOR_NAME,
    !isCallable$7(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$g(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule$1.enable();
  } else if (isForced$1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails$g(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration$2(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails$g(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$3(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (!isNullOrUndefined$4(iterable)) iterate$4(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $$o({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag$4(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var uncurryThis$b = functionUncurryThis;
var defineBuiltIns$2 = defineBuiltIns$3;
var getWeakData = internalMetadataExports.getWeakData;
var anInstance$2 = anInstance$4;
var anObject$8 = anObject$l;
var isNullOrUndefined$3 = isNullOrUndefined$8;
var isObject$7 = isObject$n;
var iterate$3 = iterate$5;
var ArrayIterationModule = arrayIteration;
var hasOwn$2 = hasOwnProperty_1;
var InternalStateModule$2 = internalState;

var setInternalState$2 = InternalStateModule$2.set;
var internalStateGetterFor$1 = InternalStateModule$2.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice = uncurryThis$b([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (state) {
  return state.frozen || (state.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

var collectionWeak$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance$2(that, Prototype);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (!isNullOrUndefined$3(iterable)) iterate$3(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject$8(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    defineBuiltIns$2(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject$7(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn$2(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject$7(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn$2(data, state.id);
      }
    });

    defineBuiltIns$2(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject$7(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};

var FREEZING = freezing;
var global$c = global$v;
var uncurryThis$a = functionUncurryThis;
var defineBuiltIns$1 = defineBuiltIns$3;
var InternalMetadataModule = internalMetadataExports;
var collection$1 = collection$2;
var collectionWeak = collectionWeak$1;
var isObject$6 = isObject$n;
var enforceInternalState = internalState.enforce;
var fails$f = fails$D;
var NATIVE_WEAK_MAP = weakMapBasicDetection;

var $Object = Object;
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$4 = Array.isArray;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = $Object.isExtensible;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = $Object.isFrozen;
// eslint-disable-next-line es/no-object-issealed -- safe
var isSealed = $Object.isSealed;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = $Object.freeze;
// eslint-disable-next-line es/no-object-seal -- safe
var seal = $Object.seal;

var FROZEN = {};
var SEALED = {};
var IS_IE11 = !global$c.ActiveXObject && 'ActiveXObject' in global$c;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection$1('WeakMap', wrapper, collectionWeak);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis$a(WeakMapPrototype.set);

// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
var hasMSEdgeFreezingBug = function () {
  return FREEZING && fails$f(function () {
    var frozenArray = freeze([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen(frozenArray);
  });
};

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP) if (IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var nativeDelete = uncurryThis$a(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis$a(WeakMapPrototype.has);
  var nativeGet = uncurryThis$a(WeakMapPrototype.get);
  defineBuiltIns$1(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject$6(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      } return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject$6(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      } return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject$6(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      } return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject$6(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
// Chakra Edge frozen keys fix
} else if (hasMSEdgeFreezingBug()) {
  defineBuiltIns$1(WeakMapPrototype, {
    set: function set(key, value) {
      var arrayIntegrityLevel;
      if (isArray$4(key)) {
        if (isFrozen(key)) arrayIntegrityLevel = FROZEN;
        else if (isSealed(key)) arrayIntegrityLevel = SEALED;
      }
      nativeSet(this, key, value);
      if (arrayIntegrityLevel == FROZEN) freeze(key);
      if (arrayIntegrityLevel == SEALED) seal(key);
      return this;
    }
  });
}

var fails$e = fails$D;
var wellKnownSymbol$7 = wellKnownSymbol$o;
var V8_VERSION$2 = engineV8Version;

var SPECIES$5 = wellKnownSymbol$7('species');

var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$2 >= 51 || !fails$e(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$5] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$n = _export;
var fails$d = fails$D;
var isArray$3 = isArray$8;
var isObject$5 = isObject$n;
var toObject$4 = toObject$b;
var lengthOfArrayLike$2 = lengthOfArrayLike$8;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;
var createProperty$2 = createProperty$4;
var arraySpeciesCreate = arraySpeciesCreate$2;
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
var wellKnownSymbol$6 = wellKnownSymbol$o;
var V8_VERSION$1 = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol$6('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$d(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject$5(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$3(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$3('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$n({ target: 'Array', proto: true, arity: 1, forced: FORCED$2 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$4(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike$2(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty$2(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var toIntegerOrInfinity$2 = toIntegerOrInfinity$6;
var toString$4 = toString$c;
var requireObjectCoercible$1 = requireObjectCoercible$7;

var $RangeError$1 = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
var stringRepeat = function repeat(count) {
  var str = toString$4(requireObjectCoercible$1(this));
  var result = '';
  var n = toIntegerOrInfinity$2(count);
  if (n < 0 || n == Infinity) throw $RangeError$1('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

var $$m = _export;
var uncurryThis$9 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$6;
var thisNumberValue = thisNumberValue$2;
var $repeat = stringRepeat;
var fails$c = fails$D;

var $RangeError = RangeError;
var $String = String;
var floor$2 = Math.floor;
var repeat = uncurryThis$9($repeat);
var stringSlice$3 = uncurryThis$9(''.slice);
var nativeToFixed = uncurryThis$9(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor$2(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor$2(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = $String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED$1 = fails$c(function () {
  return nativeToFixed(0.00008, 3) !== '0.000' ||
    nativeToFixed(0.9, 0) !== '1' ||
    nativeToFixed(1.255, 2) !== '1.25' ||
    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails$c(function () {
  // V8 ~ Android 4.3-
  nativeToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$$m({ target: 'Number', proto: true, forced: FORCED$1 }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity$1(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw $RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return $String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice$3(result, 0, k - fractDigits) + '.' + stringSlice$3(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

var $$l = _export;
var isArray$2 = isArray$8;
var isConstructor$1 = isConstructor$4;
var isObject$4 = isObject$n;
var toAbsoluteIndex = toAbsoluteIndex$3;
var lengthOfArrayLike$1 = lengthOfArrayLike$8;
var toIndexedObject$1 = toIndexedObject$9;
var createProperty$1 = createProperty$4;
var wellKnownSymbol$5 = wellKnownSymbol$o;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
var nativeSlice = arraySlice$4;

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('slice');

var SPECIES$4 = wellKnownSymbol$5('species');
var $Array$1 = Array;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$l({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject$1(this);
    var length = lengthOfArrayLike$1(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray$2(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$2(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$4(Constructor)) {
        Constructor = Constructor[SPECIES$4];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array$1 || Constructor === undefined) {
        return nativeSlice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array$1 : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var fails$b = fails$D;

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$b(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var $forEach = arrayIteration.forEach;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var $$k = _export;
var forEach$1 = arrayForEach;

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$$k({ target: 'Array', proto: true, forced: [].forEach != forEach$1 }, {
  forEach: forEach$1
});

var global$b = global$v;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var forEach = arrayForEach;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global$b[COLLECTION_NAME] && global$b[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);

var $$j = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$j({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$i = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$i({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$h = _export;
var $every = arrayIteration.every;
var arrayMethodIsStrict = arrayMethodIsStrict$2;

var STRICT_METHOD = arrayMethodIsStrict('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$$h({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var DESCRIPTORS$4 = descriptors;
var FUNCTION_NAME_EXISTS = functionName.EXISTS;
var uncurryThis$8 = functionUncurryThis;
var defineBuiltInAccessor$2 = defineBuiltInAccessor$6;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis$8(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec$1 = uncurryThis$8(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS$4 && !FUNCTION_NAME_EXISTS) {
  defineBuiltInAccessor$2(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec$1(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var defineWellKnownSymbol$1 = wellKnownSymbolDefine;

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol$1('asyncIterator');

var getBuiltIn$3 = getBuiltIn$d;
var defineWellKnownSymbol = wellKnownSymbolDefine;
var setToStringTag$3 = setToStringTag$9;

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$3(getBuiltIn$3('Symbol'), 'Symbol');

var global$a = global$v;
var setToStringTag$2 = setToStringTag$9;

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag$2(global$a.JSON, 'JSON', true);

var setToStringTag$1 = setToStringTag$9;

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag$1(Math, 'Math', true);

// TODO: Remove from `core-js@4`
var $$g = _export;
var DESCRIPTORS$3 = descriptors;
var create$2 = objectCreate;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$$g({ target: 'Object', stat: true, sham: !DESCRIPTORS$3 }, {
  create: create$2
});

var $$f = _export;
var fails$a = fails$D;
var toObject$3 = toObject$b;
var nativeGetPrototypeOf = objectGetPrototypeOf$1;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var FAILS_ON_PRIMITIVES$1 = fails$a(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$$f({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject$3(it));
  }
});

var classof$1 = classofRaw$2;

var engineIsNode = typeof process != 'undefined' && classof$1(process) == 'process';

var getBuiltIn$2 = getBuiltIn$d;
var defineBuiltInAccessor$1 = defineBuiltInAccessor$6;
var wellKnownSymbol$4 = wellKnownSymbol$o;
var DESCRIPTORS$2 = descriptors;

var SPECIES$3 = wellKnownSymbol$4('species');

var setSpecies$2 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);

  if (DESCRIPTORS$2 && Constructor && !Constructor[SPECIES$3]) {
    defineBuiltInAccessor$1(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var anObject$7 = anObject$l;
var aConstructor = aConstructor$2;
var isNullOrUndefined$2 = isNullOrUndefined$8;
var wellKnownSymbol$3 = wellKnownSymbol$o;

var SPECIES$2 = wellKnownSymbol$3('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$7(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined$2(S = anObject$7(C)[SPECIES$2]) ? defaultConstructor : aConstructor(S);
};

var $TypeError$2 = TypeError;

var validateArgumentsLength$1 = function (passed, required) {
  if (passed < required) throw $TypeError$2('Not enough arguments');
  return passed;
};

var userAgent$2 = engineUserAgent;

// eslint-disable-next-line redos/no-vulnerable -- safe
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$9 = global$v;
var apply$1 = functionApply;
var bind$4 = functionBindContext;
var isCallable$6 = isCallable$s;
var hasOwn$1 = hasOwnProperty_1;
var fails$9 = fails$D;
var html = html$2;
var arraySlice = arraySlice$4;
var createElement = documentCreateElement$2;
var validateArgumentsLength = validateArgumentsLength$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var set = global$9.setImmediate;
var clear = global$9.clearImmediate;
var process$3 = global$9.process;
var Dispatch = global$9.Dispatch;
var Function$1 = global$9.Function;
var MessageChannel = global$9.MessageChannel;
var String$1 = global$9.String;
var counter = 0;
var queue$2 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails$9(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global$9.location;
});

var run = function (id) {
  if (hasOwn$1(queue$2, id)) {
    var fn = queue$2[id];
    delete queue$2[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var eventListener = function (event) {
  run(event.data);
};

var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  global$9.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable$6(handler) ? handler : Function$1(handler);
    var args = arraySlice(arguments, 1);
    queue$2[++counter] = function () {
      apply$1(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$2[id];
  };
  // Node.js 0.8-
  if (IS_NODE$3) {
    defer = function (id) {
      process$3.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind$4(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$9.addEventListener &&
    isCallable$6(global$9.postMessage) &&
    !global$9.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$9(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    global$9.addEventListener('message', eventListener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var Queue$2 = function () {
  this.head = null;
  this.tail = null;
};

Queue$2.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    var tail = this.tail;
    if (tail) tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

var queue$1 = Queue$2;

var userAgent$1 = engineUserAgent;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$8 = global$v;
var bind$3 = functionBindContext;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var Queue$1 = queue$1;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver = global$8.MutationObserver || global$8.WebKitMutationObserver;
var document$2 = global$8.document;
var process$2 = global$8.process;
var Promise$1 = global$8.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$8, 'queueMicrotask');
var microtask$1 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask$1) {
  var queue = new Queue$1();

  var flush = function () {
    var parent, fn;
    if (IS_NODE$2 && (parent = process$2.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify$1();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$3(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE$2) {
    notify$1 = function () {
      process$2.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind$3(macrotask, global$8);
    notify$1 = function () {
      macrotask(flush);
    };
  }

  microtask$1 = function (fn) {
    if (!queue.head) notify$1();
    queue.add(fn);
  };
}

var microtask_1 = microtask$1;

var hostReportErrors$1 = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var global$7 = global$v;

var promiseNativeConstructor = global$7.Promise;

/* global Deno -- Deno case */
var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

var IS_DENO$1 = engineIsDeno;
var IS_NODE$1 = engineIsNode;

var engineIsBrowser = !IS_DENO$1 && !IS_NODE$1
  && typeof window == 'object'
  && typeof document == 'object';

var global$6 = global$v;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$5 = isCallable$s;
var isForced = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$2 = wellKnownSymbol$o;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$2('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$5(global$6.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$1] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$3 = aCallable$9;

var $TypeError$1 = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw $TypeError$1('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$3(resolve);
  this.reject = aCallable$3(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$e = _export;
var IS_NODE = engineIsNode;
var global$5 = global$v;
var call$9 = functionCall;
var defineBuiltIn$4 = defineBuiltIn$f;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$9;
var setSpecies$1 = setSpecies$2;
var aCallable$2 = aCallable$9;
var isCallable$4 = isCallable$s;
var isObject$3 = isObject$n;
var anInstance$1 = anInstance$4;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask_1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue$1;
var InternalStateModule$1 = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
var setInternalState$1 = InternalStateModule$1.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$1 = global$5.TypeError;
var document$1 = global$5.document;
var process$1 = global$5.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$5.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$3(it) && isCallable$4(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$1('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$9(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$5.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$5['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$9(task, global$5, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE) {
          process$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$9(task, global$5, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$2 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$9(then, value,
            bind$2(internalResolve, wrapper, state),
            bind$2(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$1(this, PromisePrototype);
    aCallable$2(executor);
    call$9(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$2(internalResolve, state), bind$2(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$1(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$4(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$4(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$4(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process$1.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$2(internalResolve, state);
    this.reject = bind$2(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (isCallable$4(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$4(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$9(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$e({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies$1(PROMISE);

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
});

var $$d = _export;
var call$8 = functionCall;
var aCallable$1 = aCallable$9;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$2 = iterate$5;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$d({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$2(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$8($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$c = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$d;
var isCallable$3 = isCallable$s;
var defineBuiltIn$3 = defineBuiltIn$f;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$c({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$3(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$3(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$b = _export;
var call$7 = functionCall;
var aCallable = aCallable$9;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate$1 = iterate$5;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$b({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate$1(iterable, function (promise) {
        call$7($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$a = _export;
var call$6 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$a({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call$6(capability.reject, undefined, r);
    return capability.promise;
  }
});

var anObject$6 = anObject$l;
var isObject$2 = isObject$n;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$6(C);
  if (isObject$2(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$9 = _export;
var getBuiltIn = getBuiltIn$d;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$9({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

var $$8 = _export;
var uncurryThis$7 = functionUncurryThis;
var isArray$1 = isArray$8;

var nativeReverse = uncurryThis$7([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$$8({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray$1(this)) this.length = this.length;
    return nativeReverse(this);
  }
});

var $$7 = _export;
var isArray = isArray$8;

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$$7({ target: 'Array', stat: true }, {
  isArray: isArray
});

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

var anObject$5 = anObject$l;
var iteratorClose = iteratorClose$2;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$5(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var bind$1 = functionBindContext;
var call$5 = functionCall;
var toObject$2 = toObject$b;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$2;
var isConstructor = isConstructor$4;
var lengthOfArrayLike = lengthOfArrayLike$8;
var createProperty = createProperty$4;
var getIterator = getIterator$2;
var getIteratorMethod = getIteratorMethod$3;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject$2(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call$5(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var $$6 = _export;
var from = arrayFrom;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$$6({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

// TODO: Remove from `core-js@4`
var uncurryThis$6 = functionUncurryThis;
var defineBuiltIn$2 = defineBuiltIn$f;

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING$1 = 'toString';
var nativeDateToString = uncurryThis$6(DatePrototype[TO_STRING$1]);
var thisTimeValue = uncurryThis$6(DatePrototype.getTime);

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  defineBuiltIn$2(DatePrototype, TO_STRING$1, function toString() {
    var value = thisTimeValue(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString(this) : INVALID_DATE;
  });
}

var anObject$4 = anObject$l;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$4(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var call$4 = functionCall;
var hasOwn = hasOwnProperty_1;
var isPrototypeOf = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$2, R)
    ? call$4(regExpFlags, R) : flags;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn$1 = defineBuiltIn$f;
var anObject$3 = anObject$l;
var $toString = toString$c;
var fails$8 = fails$D;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$8(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$1(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject$3(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

var fails$7 = fails$D;
var global$4 = global$v;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$4.RegExp;

var UNSUPPORTED_Y$1 = fails$7(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$7(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$7(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var fails$6 = fails$D;
var global$3 = global$v;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$3.RegExp;

var regexpUnsupportedDotAll = fails$6(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$5 = fails$D;
var global$2 = global$v;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$2.RegExp;

var regexpUnsupportedNcg = fails$5(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$3 = functionCall;
var uncurryThis$5 = functionUncurryThis;
var toString$3 = toString$c;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = sharedExports;
var create$1 = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$2 = uncurryThis$5(''.charAt);
var indexOf = uncurryThis$5(''.indexOf);
var replace$1 = uncurryThis$5(''.replace);
var stringSlice$2 = uncurryThis$5(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$3(nativeExec, re1, 'a');
  call$3(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$3(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$3(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$3(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$1(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$2(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$3(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$2(match.input, charsAdded);
        match[0] = stringSlice$2(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$3(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$1(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$5 = _export;
var exec$1 = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$5({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
  exec: exec$1
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var $$4 = _export;
var call$2 = functionCall;
var isCallable$2 = isCallable$s;
var anObject$2 = anObject$l;
var toString$2 = toString$c;

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var nativeTest = /./.test;

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$$4({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (S) {
    var R = anObject$2(this);
    var string = toString$2(S);
    var exec = R.exec;
    if (!isCallable$2(exec)) return call$2(nativeTest, R, string);
    var result = call$2(exec, R, string);
    if (result === null) return false;
    anObject$2(result);
    return true;
  }
});

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var $$3 = _export;
var toObject$1 = toObject$b;
var nativeKeys = objectKeys$3;
var fails$4 = fails$D;

var FAILS_ON_PRIMITIVES = fails$4(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$$3({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject$1(it));
  }
});

var create = objectCreate;
var defineBuiltInAccessor = defineBuiltInAccessor$6;
var defineBuiltIns = defineBuiltIns$3;
var bind = functionBindContext;
var anInstance = anInstance$4;
var isNullOrUndefined$1 = isNullOrUndefined$8;
var iterate = iterate$5;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$3;
var setSpecies = setSpecies$2;
var DESCRIPTORS$1 = descriptors;
var fastKey = internalMetadataExports.fastKey;
var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

var collectionStrong$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS$1) that.size = 0;
      if (!isNullOrUndefined$1(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS$1) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS$1) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS$1) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS$1) defineBuiltInAccessor(Prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return createIterResultObject(undefined, true);
      }
      // return step by kind
      if (kind == 'keys') return createIterResultObject(entry.key, false);
      if (kind == 'values') return createIterResultObject(entry.value, false);
      return createIterResultObject([entry.key, entry.value], false);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};

var collection = collection$2;
var collectionStrong = collectionStrong$1;

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var global$1 = global$v;
var fails$3 = fails$D;
var uncurryThis$4 = functionUncurryThis;
var toString$1 = toString$c;
var trim = stringTrim.trim;
var whitespaces = whitespaces$2;

var $parseInt = global$1.parseInt;
var Symbol$1 = global$1.Symbol;
var ITERATOR = Symbol$1 && Symbol$1.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis$4(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails$3(function () { $parseInt(Object(ITERATOR)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED ? function parseInt(string, radix) {
  var S = trim(toString$1(string));
  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
} : $parseInt;

var $$2 = _export;
var parseInt$1 = numberParseInt;

// `Number.parseInt` method
// https://tc39.es/ecma262/#sec-number.parseint
// eslint-disable-next-line es/no-number-parseint -- required for testing
$$2({ target: 'Number', stat: true, forced: Number.parseInt != parseInt$1 }, {
  parseInt: parseInt$1
});

var isObject$1 = isObject$n;

var floor$1 = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
  return !isObject$1(it) && isFinite(it) && floor$1(it) === it;
};

var $$1 = _export;
var isIntegralNumber = isIntegralNumber$1;

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$$1({ target: 'Number', stat: true }, {
  isInteger: isIntegralNumber
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$3 = functionUncurryThisClause;
var defineBuiltIn = defineBuiltIn$f;
var regexpExec$1 = regexpExec$2;
var fails$2 = fails$D;
var wellKnownSymbol$1 = wellKnownSymbol$o;
var createNonEnumerableProperty = createNonEnumerableProperty$9;

var SPECIES = wellKnownSymbol$1('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);

  var DELEGATES_TO_SYMBOL = !fails$2(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$3(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var uncurryThis$2 = functionUncurryThis;
var toObject = toObject$b;

var floor = Math.floor;
var charAt = uncurryThis$2(''.charAt);
var replace = uncurryThis$2(''.replace);
var stringSlice$1 = uncurryThis$2(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$1(str, 0, position);
      case "'": return stringSlice$1(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var call$1 = functionCall;
var anObject$1 = anObject$l;
var isCallable$1 = isCallable$s;
var classof = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$1(exec)) {
    var result = call$1(exec, R, S);
    if (result !== null) anObject$1(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call$1(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};

var apply = functionApply;
var call = functionCall;
var uncurryThis$1 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails$1 = fails$D;
var anObject = anObject$l;
var isCallable = isCallable$s;
var isNullOrUndefined = isNullOrUndefined$8;
var toIntegerOrInfinity = toIntegerOrInfinity$6;
var toLength = toLength$2;
var toString = toString$c;
var requireObjectCoercible = requireObjectCoercible$7;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$4;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$o;

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis$1([].concat);
var push$1 = uncurryThis$1([].push);
var stringIndexOf = uncurryThis$1(''.indexOf);
var stringSlice = uncurryThis$1(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$1(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push$1(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var DESCRIPTORS = descriptors;
var fails = fails$D;
var uncurryThis = functionUncurryThis;
var objectGetPrototypeOf = objectGetPrototypeOf$1;
var objectKeys = objectKeys$3;
var toIndexedObject = toIndexedObject$9;
var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
// of `null` prototype objects
var IE_BUG = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-create -- safe
  var O = Object.create(null);
  O[2] = 2;
  return !propertyIsEnumerable(O, 2);
});

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

var $ = _export;
var $entries = objectToArray.entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

var isObject = function isObject(value) {
  var type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};
var disallowedKeys = new Set(['__proto__', 'prototype', 'constructor']);
var digits = new Set('0123456789');
function getPathSegments(path) {
  var parts = [];
  var currentSegment = '';
  var currentPart = 'start';
  var isIgnoring = false;
  var _iterator = _createForOfIteratorHelper(path),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var character = _step.value;
      switch (character) {
        case '\\':
          {
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
        case '.':
          {
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
        case '[':
          {
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
        case ']':
          {
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

        default:
          {
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
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (isIgnoring) {
    currentSegment += '\\';
  }
  switch (currentPart) {
    case 'property':
      {
        if (disallowedKeys.has(currentSegment)) {
          return [];
        }
        parts.push(currentSegment);
        break;
      }
    case 'index':
      {
        throw new Error('Index was not closed');
      }
    case 'start':
      {
        parts.push('');
        break;
      }
    // No default
  }

  return parts;
}
function isStringIndex(object, key) {
  if (typeof key !== 'number' && Array.isArray(object)) {
    var index = Number.parseInt(key, 10);
    return Number.isInteger(index) && object[index] === object[key];
  }
  return false;
}
function getProperty(object, path, value) {
  if (!isObject(object) || typeof path !== 'string') {
    return value === undefined ? object : value;
  }
  var pathArray = getPathSegments(path);
  if (pathArray.length === 0) {
    return value;
  }
  for (var index = 0; index < pathArray.length; index++) {
    var key = pathArray[index];
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

// eslint-disable-next-line no-use-before-define
var inspectorMap = new WeakMap();
var Inspector = /*#__PURE__*/function () {
  function Inspector(zrInstance) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Inspector);
    this.__zrIns = void 0;
    this.__highlightDom = void 0;
    this.__highlightTooltipDom = void 0;
    /**
     * Whether to enable the mouse hover highlight element.
     *
     * - When enabled, relevant log information will be printed via `console.debug` when the mouse hovers over the element.
     * - When enabled, when the mouse hovers over an element and clicks, the element instance will be printed through `console.info`.
     */
    this.hoverHighlightEnable = false;
    /**
     * unbind event function.
     */
    this.__unbinds = [];
    this.__zrIns = zrInstance;
    this.__highlightDom = document.createElement('div');
    this.__highlightDom.style.cssText = 'box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; border: 4px solid #f00;';
    this.__highlightDom.style.cssText += (config === null || config === void 0 ? void 0 : config.highlightCSS) || Inspector.highlightCSS;
    document.body.appendChild(this.__highlightDom);
    this.__highlightTooltipDom = document.createElement('div');
    this.__highlightTooltipDom.style.cssText = 'box-sizing: border-box; position: fixed; pointer-events: none; z-index: 9999; background-color: rgba(255, 255, 255, .5); font-size: 12px; padding: 8px 12px; box-shadow: 0 0 8px rgba(0, 0, 0, .05);';
    document.body.appendChild(this.__highlightTooltipDom);
    this.__bindEvents();

    // this.__zrIns.dom!.addEventListener('mousemove', e => {
    //   console.log(e);
    // });

    inspectorMap.set(this.__zrIns, this);
    console.warn("".concat(Inspector.logPrefix, "ZRender inspector is running, make sure it is only enabled in development mode."));
  }

  /**
   * Logs the element for debugging purposes.
   *
   * default - [zrIns.id][el.id] el.name (type:el.type) X: Y: x: y: w: h:
   *
   * @param {Element} el - The element to be logged.
   */
  _createClass(Inspector, [{
    key: "debugLogger",
    value: function debugLogger(el) {
      return Inspector.debugLogger(this.__zrIns, el);
    }
  }, {
    key: "__debugLog",
    value: function __debugLog(el) {
      if (el) {
        // eslint-disable-next-line no-console
        console.debug("".concat(Inspector.logPrefix).concat(this.debugLogger(el)));
      }
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "__dirEl",
    value: function __dirEl(el) {
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
  }, {
    key: "disableAllElementSilent",
    value: function disableAllElementSilent() {
      Inspector.disableAllElementSilent(this.__zrIns);
    }

    /**
     * Highlights the given element and shows tooltip if hover highlight is enabled.
     *
     * @param {Element | null} el - The element to highlight or null if no highlighting is required.
     */
  }, {
    key: "highlight",
    value: function highlight(el, event) {
      var self = this;
      if (!el || !self.hoverHighlightEnable) {
        self.__highlightDom.style.display = 'none';
        self.__highlightTooltipDom.style.display = 'none';
        return;
      }
      self.__highlight(el);
      self.__showTooltip(el, event);
    }
  }, {
    key: "__highlight",
    value: function __highlight(el) {
      var self = this;
      var zrIns = self.__zrIns;
      var zrInsDomBBox = zrIns.dom.getBoundingClientRect();
      var bBox = el.getBoundingRect();
      var globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);
      self.__highlightDom.style.display = 'block';
      self.__highlightDom.style.left = "".concat((zrInsDomBBox.x + globalCoord[0]).toFixed(2), "px");
      self.__highlightDom.style.top = "".concat((zrInsDomBBox.y + globalCoord[1]).toFixed(2), "px");
      // TODO 未考虑缩放
      self.__highlightDom.style.width = "".concat(bBox.width.toFixed(2), "px");
      self.__highlightDom.style.height = "".concat(bBox.height.toFixed(2), "px");
    }
  }, {
    key: "__showTooltip",
    value: function __showTooltip(el, event) {
      var self = this;
      var zrIns = self.__zrIns;
      var zrInsDomBBox = zrIns.dom.getBoundingClientRect();
      var bBox = el.getBoundingRect();
      var globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);
      self.__highlightTooltipDom.style.display = 'block';
      // TODO 未考虑缩放
      self.__highlightTooltipDom.innerHTML = "\n      <p style=\"margin: 0 0 8px 0; font-weight: bold;\">[".concat(el.type.slice(0, 1).toUpperCase() + el.type.slice(1), "]</p>\n      <p style=\"margin: 0 0 8px 0;\">GlobalCoord</p>\n      <p style=\"margin: 0 0 8px 0;\">x: ").concat((zrInsDomBBox.x + globalCoord[0]).toFixed(2), " y: ").concat((zrInsDomBBox.y + globalCoord[1]).toFixed(2), "</p>\n      <p style=\"margin: 0 0 8px 0;\">BoundingRect</p>\n      <p style=\"margin: 0 0 8px 0;\">x: ").concat(bBox.x.toFixed(2), " y: ").concat(bBox.y.toFixed(2), "</p>\n      <p style=\"margin: 0 0 8px 0;\">width: ").concat(bBox.width.toFixed(2), " height: ").concat(bBox.height.toFixed(2), "</p>\n      <p style=\"margin: 0; opacity: 0.5;\">(Click to display object to console.)</p>\n    ");
      self.__highlightTooltipDom.style.left = "0px";
      self.__highlightTooltipDom.style.top = "0px";
      self.__highlightTooltipDom.style.right = 'auto';
      self.__highlightTooltipDom.style.bottom = 'auto';
      if (event) {
        var _document$body = document.body,
          clientWidth = _document$body.clientWidth,
          clientHeight = _document$body.clientHeight;
        var offsetX = event.offsetX,
          offsetY = event.offsetY;
        if (offsetX < clientWidth / 2) {
          self.__highlightTooltipDom.style.left = 'auto';
          self.__highlightTooltipDom.style.right = '0px';
        }
        if (offsetY < clientHeight / 2) {
          self.__highlightTooltipDom.style.top = 'auto';
          self.__highlightTooltipDom.style.bottom = '0px';
        }
      }
    }
  }, {
    key: "__bindEvents",
    value: function __bindEvents() {
      var self = this;
      var zrIns = self.__zrIns;
      var hoverEl;
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
      zrIns.dom.addEventListener('mouseleave', handleMouseLeave);
      self.__unbinds.push(function () {
        zrIns.dom.removeEventListener('mouseleave', handleMouseLeave);
      });
      zrIns.on('mousemove', handleZrMouseMove);
      self.__unbinds.push(function () {
        zrIns.off('mousemove', handleZrMouseMove);
      });
      zrIns.on('click', handleZrClick);
      self.__unbinds.push(function () {
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
  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(selector) {
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
  }, {
    key: "querySelector",
    value: function querySelector(selector) {
      return this.querySelectorAll(selector)[0];
    }
  }, {
    key: "getElementById",
    value: function getElementById(id) {
      return this.querySelectorAll("id=".concat(id))[0];
    }
  }, {
    key: "getElementsByName",
    value: function getElementsByName(name) {
      return this.querySelectorAll("name=".concat(name));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this$__highlightDom, _this$__highlightTool;
      this.__unbinds.forEach(function (unbind) {
        return unbind();
      });
      this.__unbinds = [];
      (_this$__highlightDom = this.__highlightDom) === null || _this$__highlightDom === void 0 ? void 0 : _this$__highlightDom.remove();
      this.__highlightDom = null;
      (_this$__highlightTool = this.__highlightTooltipDom) === null || _this$__highlightTool === void 0 ? void 0 : _this$__highlightTool.remove();
      this.__highlightTooltipDom = null;
      inspectorMap["delete"](this.__zrIns);
    }
  }], [{
    key: "inspect",
    value:
    /**
     * Generates a new instance of the Inspector class.
     *
     * @param {ConstructorParameters<typeof Inspector>[]} args - The arguments to be passed to the Inspector class constructor.
     * @return {this} A new instance of the Inspector class.
     */
    function inspect() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _construct(this, args);
    }

    /**
     * Get the inspector by ZRender instance.
     *
     * @param {ZRender} zrIns - The ZRender instance.
     * @returns {Inspector}
     */
  }, {
    key: "getInspectorByZrIns",
    value: function getInspectorByZrIns(zrIns) {
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
  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(zrIns, selector) {
      var props = selector.split(',').filter(function (item) {
        return item !== '';
      }).map(function (item) {
        return item.split('=');
      });
      var result = [];
      if (props.length === 0) {
        return result;
      }
      zrIns.storage.traverse(function (el) {
        // eslint-disable-next-line eqeqeq
        if (props.every(function (prop) {
          return getProperty(el, prop[0]) == prop[1];
        })) {
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
  }, {
    key: "debugLogger",
    value: function debugLogger(zrIns, el) {
      var bBox = el.getBoundingRect();
      var globalCoord = el.transformCoordToGlobal(bBox.x, bBox.y);
      return "[".concat(zrIns.id, "][").concat(el.id, "] ").concat(el.name, " (type:").concat(el.type, ") \nX:").concat(globalCoord[0].toFixed(2), " Y:").concat(globalCoord[1].toFixed(2), " \nx:").concat(bBox.x.toFixed(2), " y:").concat(bBox.y.toFixed(2), " w:").concat(bBox.width.toFixed(2), " h:").concat(bBox.height.toFixed(2));
    }

    /**
     * Disables the silent mode for all elements in the storage.
     *
     * ! Should only be used in development mode.
     *
     * @param {ZRender} zrIns - ZRender instance.
     */
  }, {
    key: "disableAllElementSilent",
    value: function disableAllElementSilent(zrIns) {
      zrIns.storage.traverse(function (el) {
        // eslint-disable-next-line no-param-reassign
        el.silent = false;
      });
      console.warn("".concat(Inspector.logPrefix, "[").concat(zrIns.id, "] Disables the silent mode for all elements in the storage, should only be used in development mode."));
    }
  }]);
  return Inspector;
}();
Inspector.logPrefix = '[ZRenderInspector] ';
/**
 * The css style after the mouse hovers the highlighted element.
 */
Inspector.highlightCSS = '';

export { Inspector, version$1 as VERSION };
//# sourceMappingURL=bundle.esm.js.map
