var JsBattle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractView2 = __webpack_require__(22);

var _AbstractView3 = _interopRequireDefault(_AbstractView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractPixiView = function (_AbstractView) {
  _inherits(AbstractPixiView, _AbstractView);

  function AbstractPixiView(model) {
    _classCallCheck(this, AbstractPixiView);

    var _this = _possibleConstructorReturn(this, (AbstractPixiView.__proto__ || Object.getPrototypeOf(AbstractPixiView)).call(this, model));

    _this._model = model;
    _this._view = new PIXI.Container();
    _this._create(_this._view);
    return _this;
  }

  _createClass(AbstractPixiView, [{
    key: "update",
    value: function update(events) {
      _get(AbstractPixiView.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiView.prototype), "update", this).call(this, events);
      if (this._model.x !== undefined) {
        this._view.x = this._model.x;
      }
      if (this._model.y !== undefined) {
        this._view.y = this._model.y;
      }
      if (this._model.angle !== undefined) {
        this._view.rotation = this._model.angle * (Math.PI / 180);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(AbstractPixiView.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiView.prototype), "destroy", this).call(this);
      if (this.view.parent) {
        this.view.parent.removeChild(this.view);
      }
    }
  }, {
    key: "_create",
    value: function _create(container) {}
  }]);

  return AbstractPixiView;
}(_AbstractView3.default);

exports.default = AbstractPixiView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  copy: copy,
  checkDataType: checkDataType,
  checkDataTypes: checkDataTypes,
  coerceToTypes: coerceToTypes,
  toHash: toHash,
  getProperty: getProperty,
  escapeQuotes: escapeQuotes,
  equal: __webpack_require__(8),
  ucs2length: __webpack_require__(47),
  varOccurences: varOccurences,
  varReplace: varReplace,
  cleanUpCode: cleanUpCode,
  finalCleanUpCode: finalCleanUpCode,
  schemaHasRules: schemaHasRules,
  schemaHasRulesExcept: schemaHasRulesExcept,
  toQuotedString: toQuotedString,
  getPathExpr: getPathExpr,
  getPath: getPath,
  getData: getData,
  unescapeFragment: unescapeFragment,
  unescapeJsonPointer: unescapeJsonPointer,
  escapeFragment: escapeFragment,
  escapeJsonPointer: escapeJsonPointer
};

function copy(o, to) {
  to = to || {};
  for (var key in o) {
    to[key] = o[key];
  }return to;
}

function checkDataType(dataType, data, negate) {
  var EQUAL = negate ? ' !== ' : ' === ',
      AND = negate ? ' || ' : ' && ',
      OK = negate ? '!' : '',
      NOT = negate ? '' : '!';
  switch (dataType) {
    case 'null':
      return data + EQUAL + 'null';
    case 'array':
      return OK + 'Array.isArray(' + data + ')';
    case 'object':
      return '(' + OK + data + AND + 'typeof ' + data + EQUAL + '"object"' + AND + NOT + 'Array.isArray(' + data + '))';
    case 'integer':
      return '(typeof ' + data + EQUAL + '"number"' + AND + NOT + '(' + data + ' % 1)' + AND + data + EQUAL + data + ')';
    default:
      return 'typeof ' + data + EQUAL + '"' + dataType + '"';
  }
}

function checkDataTypes(dataTypes, data) {
  switch (dataTypes.length) {
    case 1:
      return checkDataType(dataTypes[0], data, true);
    default:
      var code = '';
      var types = toHash(dataTypes);
      if (types.array && types.object) {
        code = types.null ? '(' : '(!' + data + ' || ';
        code += 'typeof ' + data + ' !== "object")';
        delete types.null;
        delete types.array;
        delete types.object;
      }
      if (types.number) delete types.integer;
      for (var t in types) {
        code += (code ? ' && ' : '') + checkDataType(t, data, true);
      }return code;
  }
}

var COERCE_TO_TYPES = toHash(['string', 'number', 'integer', 'boolean', 'null']);
function coerceToTypes(optionCoerceTypes, dataTypes) {
  if (Array.isArray(dataTypes)) {
    var types = [];
    for (var i = 0; i < dataTypes.length; i++) {
      var t = dataTypes[i];
      if (COERCE_TO_TYPES[t]) types[types.length] = t;else if (optionCoerceTypes === 'array' && t === 'array') types[types.length] = t;
    }
    if (types.length) return types;
  } else if (COERCE_TO_TYPES[dataTypes]) {
    return [dataTypes];
  } else if (optionCoerceTypes === 'array' && dataTypes === 'array') {
    return ['array'];
  }
}

function toHash(arr) {
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    hash[arr[i]] = true;
  }return hash;
}

var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
var SINGLE_QUOTE = /'|\\/g;
function getProperty(key) {
  return typeof key == 'number' ? '[' + key + ']' : IDENTIFIER.test(key) ? '.' + key : "['" + escapeQuotes(key) + "']";
}

function escapeQuotes(str) {
  return str.replace(SINGLE_QUOTE, '\\$&').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\f/g, '\\f').replace(/\t/g, '\\t');
}

function varOccurences(str, dataVar) {
  dataVar += '[^0-9]';
  var matches = str.match(new RegExp(dataVar, 'g'));
  return matches ? matches.length : 0;
}

function varReplace(str, dataVar, expr) {
  dataVar += '([^0-9])';
  expr = expr.replace(/\$/g, '$$$$');
  return str.replace(new RegExp(dataVar, 'g'), expr + '$1');
}

var EMPTY_ELSE = /else\s*{\s*}/g,
    EMPTY_IF_NO_ELSE = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g,
    EMPTY_IF_WITH_ELSE = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g;
function cleanUpCode(out) {
  return out.replace(EMPTY_ELSE, '').replace(EMPTY_IF_NO_ELSE, '').replace(EMPTY_IF_WITH_ELSE, 'if (!($1))');
}

var ERRORS_REGEXP = /[^v.]errors/g,
    REMOVE_ERRORS = /var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g,
    REMOVE_ERRORS_ASYNC = /var errors = 0;|var vErrors = null;/g,
    RETURN_VALID = 'return errors === 0;',
    RETURN_TRUE = 'validate.errors = null; return true;',
    RETURN_ASYNC = /if \(errors === 0\) return data;\s*else throw new ValidationError\(vErrors\);/,
    RETURN_DATA_ASYNC = 'return data;',
    ROOTDATA_REGEXP = /[^A-Za-z_$]rootData[^A-Za-z0-9_$]/g,
    REMOVE_ROOTDATA = /if \(rootData === undefined\) rootData = data;/;

function finalCleanUpCode(out, async) {
  var matches = out.match(ERRORS_REGEXP);
  if (matches && matches.length == 2) {
    out = async ? out.replace(REMOVE_ERRORS_ASYNC, '').replace(RETURN_ASYNC, RETURN_DATA_ASYNC) : out.replace(REMOVE_ERRORS, '').replace(RETURN_VALID, RETURN_TRUE);
  }

  matches = out.match(ROOTDATA_REGEXP);
  if (!matches || matches.length !== 3) return out;
  return out.replace(REMOVE_ROOTDATA, '');
}

function schemaHasRules(schema, rules) {
  if (typeof schema == 'boolean') return !schema;
  for (var key in schema) {
    if (rules[key]) return true;
  }
}

function schemaHasRulesExcept(schema, rules, exceptKeyword) {
  if (typeof schema == 'boolean') return !schema && exceptKeyword != 'not';
  for (var key in schema) {
    if (key != exceptKeyword && rules[key]) return true;
  }
}

function toQuotedString(str) {
  return '\'' + escapeQuotes(str) + '\'';
}

function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
  var path = jsonPointers // false by default
  ? '\'/\' + ' + expr + (isNumber ? '' : '.replace(/~/g, \'~0\').replace(/\\//g, \'~1\')') : isNumber ? '\'[\' + ' + expr + ' + \']\'' : '\'[\\\'\' + ' + expr + ' + \'\\\']\'';
  return joinPaths(currentPath, path);
}

function getPath(currentPath, prop, jsonPointers) {
  var path = jsonPointers // false by default
  ? toQuotedString('/' + escapeJsonPointer(prop)) : toQuotedString(getProperty(prop));
  return joinPaths(currentPath, path);
}

var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, lvl, paths) {
  var up, jsonPointer, data, matches;
  if ($data === '') return 'rootData';
  if ($data[0] == '/') {
    if (!JSON_POINTER.test($data)) throw new Error('Invalid JSON-pointer: ' + $data);
    jsonPointer = $data;
    data = 'rootData';
  } else {
    matches = $data.match(RELATIVE_JSON_POINTER);
    if (!matches) throw new Error('Invalid JSON-pointer: ' + $data);
    up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer == '#') {
      if (up >= lvl) throw new Error('Cannot access property/index ' + up + ' levels up, current level is ' + lvl);
      return paths[lvl - up];
    }

    if (up > lvl) throw new Error('Cannot access data ' + up + ' levels up, current level is ' + lvl);
    data = 'data' + (lvl - up || '');
    if (!jsonPointer) return data;
  }

  var expr = data;
  var segments = jsonPointer.split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment) {
      data += getProperty(unescapeJsonPointer(segment));
      expr += ' && ' + data;
    }
  }
  return expr;
}

function joinPaths(a, b) {
  if (a == '""') return b;
  return (a + ' + ' + b).replace(/' \+ '/g, '');
}

function unescapeFragment(str) {
  return unescapeJsonPointer(decodeURIComponent(str));
}

function escapeFragment(str) {
  return encodeURIComponent(escapeJsonPointer(str));
}

function escapeJsonPointer(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

function unescapeJsonPointer(str) {
  return str.replace(/~1/g, '/').replace(/~0/g, '~');
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractPixiTankView = function (_AbstractPixiView) {
  _inherits(AbstractPixiTankView, _AbstractPixiView);

  function AbstractPixiTankView(model) {
    _classCallCheck(this, AbstractPixiTankView);

    var _this = _possibleConstructorReturn(this, (AbstractPixiTankView.__proto__ || Object.getPrototypeOf(AbstractPixiTankView)).call(this, model));

    _this._hudView = new PIXI.Container();
    _this._createHud(_this._hudView);
    return _this;
  }

  _createClass(AbstractPixiTankView, [{
    key: 'update',
    value: function update(events) {
      _get(AbstractPixiTankView.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiTankView.prototype), 'update', this).call(this, events);
      this.view.rotation = 0;
      this.body.rotation = this.model.angle * (Math.PI / 180);
      this.gun.rotation = (this.model.angle + this.model.gunAngle) * (Math.PI / 180);
      this.radar.rotation = (this.model.angle + this.model.radarAngle) * (Math.PI / 180);
      this.energyBar.scale.x = this.model.energy / this.model.maxEnergy;
      this.label.text = this.model.fullName;

      this.hudView.x = this.view.x;
      this.hudView.y = this.view.y;

      for (var i = 0; i < events.length; i++) {
        this._onEvent(events[i]);
      }
    }
  }, {
    key: '_onEvent',
    value: function _onEvent(event) {
      switch (event.type) {
        case 'shoot':
          this._onShoot(event);
          break;
        case 'destroy':
          this._onDestroy(event);
          break;
      }
    }
  }, {
    key: '_onShoot',
    value: function _onShoot(event) {}
  }, {
    key: '_onDestroy',
    value: function _onDestroy(event) {
      this.destroy();
    }
  }, {
    key: '_create',
    value: function _create(container) {
      _get(AbstractPixiTankView.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiTankView.prototype), '_create', this).call(this, container);
      this._body = this._createBody();
      this._gun = this._createGun();
      this._radar = this._createRadar();
      container.addChild(this._body);
      container.addChild(this._gun);
      container.addChild(this._radar);
    }
  }, {
    key: '_createHud',
    value: function _createHud(container) {
      this._label = this._createLabel();
      this._energyBar = this._createEnergyBar();
      container.addChild(this._createHudBackground());
      container.addChild(this._energyBar);
      container.addChild(this._label);
    }
  }, {
    key: '_createBody',
    value: function _createBody() {
      return new PIXI.Sprite();
    }
  }, {
    key: '_createGun',
    value: function _createGun() {
      return new PIXI.Sprite();
    }
  }, {
    key: '_createRadar',
    value: function _createRadar() {
      return new PIXI.Sprite();
    }
  }, {
    key: '_createHudBackground',
    value: function _createHudBackground() {
      return new PIXI.Sprite();
    }
  }, {
    key: '_createEnergyBar',
    value: function _createEnergyBar() {
      return new PIXI.Sprite();
    }
  }, {
    key: '_createLabel',
    value: function _createLabel() {
      return new PIXI.Text();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(AbstractPixiTankView.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiTankView.prototype), 'destroy', this).call(this);
      if (this.hudView.parent) {
        this.hudView.parent.removeChild(this.hudView);
      }
    }
  }, {
    key: 'body',
    get: function get() {
      return this._body;
    }
  }, {
    key: 'hudView',
    get: function get() {
      return this._hudView;
    }
  }, {
    key: 'gun',
    get: function get() {
      return this._gun;
    }
  }, {
    key: 'radar',
    get: function get() {
      return this._radar;
    }
  }, {
    key: 'label',
    get: function get() {
      return this._label;
    }
  }, {
    key: 'energyBar',
    get: function get() {
      return this._energyBar;
    }
  }]);

  return AbstractPixiTankView;
}(_AbstractPixiView3.default);

exports.default = AbstractPixiTankView;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(26);

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(27);

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(28);

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(29);

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(30);

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(31);

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(32);

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var URI = __webpack_require__(46),
    equal = __webpack_require__(8),
    util = __webpack_require__(4),
    SchemaObject = __webpack_require__(15),
    traverse = __webpack_require__(48);

module.exports = resolve;

resolve.normalizeId = normalizeId;
resolve.fullPath = getFullPath;
resolve.url = resolveUrl;
resolve.ids = resolveIds;
resolve.inlineRef = inlineRef;
resolve.schema = resolveSchema;

/**
 * [resolve and compile the references ($ref)]
 * @this   Ajv
 * @param  {Function} compile reference to schema compilation funciton (localCompile)
 * @param  {Object} root object with information about the root schema for the current schema
 * @param  {String} ref reference to resolve
 * @return {Object|Function} schema object (if the schema can be inlined) or validation function
 */
function resolve(compile, root, ref) {
  /* jshint validthis: true */
  var refVal = this._refs[ref];
  if (typeof refVal == 'string') {
    if (this._refs[refVal]) refVal = this._refs[refVal];else return resolve.call(this, compile, root, refVal);
  }

  refVal = refVal || this._schemas[ref];
  if (refVal instanceof SchemaObject) {
    return inlineRef(refVal.schema, this._opts.inlineRefs) ? refVal.schema : refVal.validate || this._compile(refVal);
  }

  var res = resolveSchema.call(this, root, ref);
  var schema, v, baseId;
  if (res) {
    schema = res.schema;
    root = res.root;
    baseId = res.baseId;
  }

  if (schema instanceof SchemaObject) {
    v = schema.validate || compile.call(this, schema.schema, root, undefined, baseId);
  } else if (schema !== undefined) {
    v = inlineRef(schema, this._opts.inlineRefs) ? schema : compile.call(this, schema, root, undefined, baseId);
  }

  return v;
}

/**
 * Resolve schema, its root and baseId
 * @this Ajv
 * @param  {Object} root root object with properties schema, refVal, refs
 * @param  {String} ref  reference to resolve
 * @return {Object} object with properties schema, root, baseId
 */
function resolveSchema(root, ref) {
  /* jshint validthis: true */
  var p = URI.parse(ref),
      refPath = _getFullPath(p),
      baseId = getFullPath(this._getId(root.schema));
  if (Object.keys(root.schema).length === 0 || refPath !== baseId) {
    var id = normalizeId(refPath);
    var refVal = this._refs[id];
    if (typeof refVal == 'string') {
      return resolveRecursive.call(this, root, refVal, p);
    } else if (refVal instanceof SchemaObject) {
      if (!refVal.validate) this._compile(refVal);
      root = refVal;
    } else {
      refVal = this._schemas[id];
      if (refVal instanceof SchemaObject) {
        if (!refVal.validate) this._compile(refVal);
        if (id == normalizeId(ref)) return { schema: refVal, root: root, baseId: baseId };
        root = refVal;
      } else {
        return;
      }
    }
    if (!root.schema) return;
    baseId = getFullPath(this._getId(root.schema));
  }
  return getJsonPointer.call(this, p, baseId, root.schema, root);
}

/* @this Ajv */
function resolveRecursive(root, ref, parsedRef) {
  /* jshint validthis: true */
  var res = resolveSchema.call(this, root, ref);
  if (res) {
    var schema = res.schema;
    var baseId = res.baseId;
    root = res.root;
    var id = this._getId(schema);
    if (id) baseId = resolveUrl(baseId, id);
    return getJsonPointer.call(this, parsedRef, baseId, schema, root);
  }
}

var PREVENT_SCOPE_CHANGE = util.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']);
/* @this Ajv */
function getJsonPointer(parsedRef, baseId, schema, root) {
  /* jshint validthis: true */
  parsedRef.fragment = parsedRef.fragment || '';
  if (parsedRef.fragment.slice(0, 1) != '/') return;
  var parts = parsedRef.fragment.split('/');

  for (var i = 1; i < parts.length; i++) {
    var part = parts[i];
    if (part) {
      part = util.unescapeFragment(part);
      schema = schema[part];
      if (schema === undefined) break;
      var id;
      if (!PREVENT_SCOPE_CHANGE[part]) {
        id = this._getId(schema);
        if (id) baseId = resolveUrl(baseId, id);
        if (schema.$ref) {
          var $ref = resolveUrl(baseId, schema.$ref);
          var res = resolveSchema.call(this, root, $ref);
          if (res) {
            schema = res.schema;
            root = res.root;
            baseId = res.baseId;
          }
        }
      }
    }
  }
  if (schema !== undefined && schema !== root.schema) return { schema: schema, root: root, baseId: baseId };
}

var SIMPLE_INLINED = util.toHash(['type', 'format', 'pattern', 'maxLength', 'minLength', 'maxProperties', 'minProperties', 'maxItems', 'minItems', 'maximum', 'minimum', 'uniqueItems', 'multipleOf', 'required', 'enum']);
function inlineRef(schema, limit) {
  if (limit === false) return false;
  if (limit === undefined || limit === true) return checkNoRef(schema);else if (limit) return countKeys(schema) <= limit;
}

function checkNoRef(schema) {
  var item;
  if (Array.isArray(schema)) {
    for (var i = 0; i < schema.length; i++) {
      item = schema[i];
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object' && !checkNoRef(item)) return false;
    }
  } else {
    for (var key in schema) {
      if (key == '$ref') return false;
      item = schema[key];
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object' && !checkNoRef(item)) return false;
    }
  }
  return true;
}

function countKeys(schema) {
  var count = 0,
      item;
  if (Array.isArray(schema)) {
    for (var i = 0; i < schema.length; i++) {
      item = schema[i];
      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') count += countKeys(item);
      if (count == Infinity) return Infinity;
    }
  } else {
    for (var key in schema) {
      if (key == '$ref') return Infinity;
      if (SIMPLE_INLINED[key]) {
        count++;
      } else {
        item = schema[key];
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') count += countKeys(item) + 1;
        if (count == Infinity) return Infinity;
      }
    }
  }
  return count;
}

function getFullPath(id, normalize) {
  if (normalize !== false) id = normalizeId(id);
  var p = URI.parse(id);
  return _getFullPath(p);
}

function _getFullPath(p) {
  return URI.serialize(p).split('#')[0] + '#';
}

var TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
  return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
}

function resolveUrl(baseId, id) {
  id = normalizeId(id);
  return URI.resolve(baseId, id);
}

/* @this Ajv */
function resolveIds(schema) {
  var schemaId = normalizeId(this._getId(schema));
  var baseIds = { '': schemaId };
  var fullPaths = { '': getFullPath(schemaId, false) };
  var localRefs = {};
  var self = this;

  traverse(schema, { allKeys: true }, function (sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (jsonPtr === '') return;
    var id = self._getId(sch);
    var baseId = baseIds[parentJsonPtr];
    var fullPath = fullPaths[parentJsonPtr] + '/' + parentKeyword;
    if (keyIndex !== undefined) fullPath += '/' + (typeof keyIndex == 'number' ? keyIndex : util.escapeFragment(keyIndex));

    if (typeof id == 'string') {
      id = baseId = normalizeId(baseId ? URI.resolve(baseId, id) : id);

      var refVal = self._refs[id];
      if (typeof refVal == 'string') refVal = self._refs[refVal];
      if (refVal && refVal.schema) {
        if (!equal(sch, refVal.schema)) throw new Error('id "' + id + '" resolves to more than one schema');
      } else if (id != normalizeId(fullPath)) {
        if (id[0] == '#') {
          if (localRefs[id] && !equal(sch, localRefs[id])) throw new Error('id "' + id + '" resolves to more than one schema');
          localRefs[id] = sch;
        } else {
          self._refs[id] = fullPath;
        }
      }
    }
    baseIds[jsonPtr] = baseId;
    fullPaths[jsonPtr] = fullPath;
  });

  return localRefs;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) == 'object') {
    var arrA = isArray(a),
        arrB = isArray(b),
        i,
        length,
        key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) return false;
    }for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resolve = __webpack_require__(7);

module.exports = {
  Validation: errorSubclass(ValidationError),
  MissingRef: errorSubclass(MissingRefError)
};

function ValidationError(errors) {
  this.message = 'validation failed';
  this.errors = errors;
  this.ajv = this.validation = true;
}

MissingRefError.message = function (baseId, ref) {
  return 'can\'t resolve reference ' + ref + ' from id ' + baseId;
};

function MissingRefError(baseId, ref, message) {
  this.message = message || MissingRefError.message(baseId, ref);
  this.missingRef = resolve.url(baseId, ref);
  this.missingSchema = resolve.normalizeId(resolve.fullPath(this.missingRef));
}

function errorSubclass(Subclass) {
  Subclass.prototype = Object.create(Error.prototype);
  Subclass.prototype.constructor = Subclass;
  return Subclass;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Renders simulation of the battle. The object must be passed to
 * constructor of Simulation object
 * @see Simulation
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer() {
    _classCallCheck(this, Renderer);
  }

  /**
   * Renders the battlefield. Called only at the beginning. Used usually to render
   * background of the Simulation
   * @param {Battlefield} - battlefield object
   */


  _createClass(Renderer, [{
    key: 'initBatlefield',
    value: function initBatlefield(battlefield) {}

    /**
     * @return value from 0 to 1 that represents the current quality of the renderer. This parameter is controlled by Simulation object
     * @see Simulation.setRendererQuality()
     */

  }, {
    key: 'preRender',


    /**
     * Called before rendering of each frame
     */
    value: function preRender() {}

    /**
     * Called after rendering of each frame
     */

  }, {
    key: 'postRender',
    value: function postRender() {}

    /**
     * Render a tank
     * @param {Tank} tank - a tank to be rendered
     * @param {Array} events - list of events related to the tank that occurred since the last call of this method
     */

  }, {
    key: 'renderTank',
    value: function renderTank(tank, events) {}

    /**
     * Renders clock of the battle
     * @param {Number} msElapsed - time that has elapsed (in milliseconds)
     * @param {Number} msLimit - maximum battle duration (in milliseconds)
     */

  }, {
    key: 'renderClock',
    value: function renderClock(msElapsed, msLimit) {}

    /**
     * Renders statistics of all tanks. Called once per frame
     * @param {Array} tankList - list of all tanks that are involved in the battle
     */

  }, {
    key: 'renderTankStats',
    value: function renderTankStats(tankList) {}

    /**
     * Render a bullet
     * @param {Bullet} bullet - a bullet to be rendered
     * @param {Array} events - list of events related to the bullet that occurred since the last call of this method
     */

  }, {
    key: 'renderBullet',
    value: function renderBullet(bullet, events) {}
    /**
     * Sets speed of the simulation. Could be used to time-scale animations so they match simulation speed
     * @pram {Number} multiplier - simulation speed multiplier
     */

  }, {
    key: 'setSpeed',
    value: function setSpeed(v) {}
  }, {
    key: 'stop',
    value: function stop() {}
  }, {
    key: 'quality',
    get: function get() {
      return 1;
    },
    set: function set(v) {}
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractRenderer2 = __webpack_require__(80);

var _AbstractRenderer3 = _interopRequireDefault(_AbstractRenderer2);

var _AbstractPixiView = __webpack_require__(1);

var _AbstractPixiView2 = _interopRequireDefault(_AbstractPixiView);

var _AbstractPixiTankView = __webpack_require__(5);

var _AbstractPixiTankView2 = _interopRequireDefault(_AbstractPixiTankView);

var _PixiRendererClockModel = __webpack_require__(81);

var _PixiRendererClockModel2 = _interopRequireDefault(_PixiRendererClockModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractPixiRenderer = function (_AbstractRenderer) {
  _inherits(AbstractPixiRenderer, _AbstractRenderer);

  function AbstractPixiRenderer(name) {
    _classCallCheck(this, AbstractPixiRenderer);

    var _this = _possibleConstructorReturn(this, (AbstractPixiRenderer.__proto__ || Object.getPrototypeOf(AbstractPixiRenderer)).call(this));

    _this._name = name;

    if (typeof PIXI === 'undefined') {
      throw "Pixi.js is required!";
    }
    _this._masterContainer = new PIXI.Container();
    _this._tankContainer = new PIXI.Container();
    _this._bulletContainer = new PIXI.Container();
    _this._hudContainer = new PIXI.Container();
    _this._masterContainer.addChild(_this._tankContainer);
    _this._masterContainer.addChild(_this._bulletContainer);
    _this._masterContainer.addChild(_this._hudContainer);
    _this._renderer = null;
    _this._stage = null;
    _this._clockModel = new _PixiRendererClockModel2.default();
    _this._clockView = null;
    _this._battlefieldView = null;
    if (window.devicePixelRatio >= 2) {
      _this._rendererScale = 2;
    } else {
      _this._rendererScale = 1;
    }
    return _this;
  }

  _createClass(AbstractPixiRenderer, [{
    key: "initBatlefield",
    value: function initBatlefield(battlefield) {
      _get(AbstractPixiRenderer.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiRenderer.prototype), "initBatlefield", this).call(this, battlefield);
      this._masterContainer.x = -this.offsetX;
      this._masterContainer.y = -this.offsetY;

      var rendererSettings = {
        view: this._canvas,
        antialias: false,
        backgroundColor: 0xffffff,
        resolution: this._rendererScale
      };

      this._renderer = new PIXI.autoDetectRenderer(battlefield.width + 2 * battlefield.margin, battlefield.height + 2 * battlefield.margin, rendererSettings);
      this._stage = new PIXI.Container();

      this._battlefieldView = this._createBattlefieldView(battlefield);
      this._clockView = this._createClockView(this._clockModel);

      this._stage.addChild(this._battlefieldView.view);
      this._stage.addChild(this._masterContainer);
      this._stage.addChild(this._clockView.view);

      this._renderer.render(this._stage);
    }
  }, {
    key: "init",
    value: function init(canvas) {
      this._canvas = canvas;
    }
  }, {
    key: "loadAssets",
    value: function loadAssets(done) {
      var _this2 = this;

      if (!this._name) {
        done();
        return;
      }
      var loader = PIXI.loader;
      var loadedResources = [];
      for (var res in loader.resources) {
        loadedResources.push(res);
      }

      this._getSpritesheetUrls(this._name, this._rendererScale).filter(function (url) {
        return loadedResources.indexOf(url) == -1;
      }).forEach(function (url) {
        loader.add(url);
      });
      loader.load(function (loader, resources) {
        _this2.onAssetsLoaded();
        done();
      });
    }
  }, {
    key: "onAssetsLoaded",
    value: function onAssetsLoaded() {}
  }, {
    key: "preRender",
    value: function preRender() {
      this._battlefieldView.update();
    }
  }, {
    key: "renderTank",
    value: function renderTank(tank, events) {
      _get(AbstractPixiRenderer.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiRenderer.prototype), "renderTank", this).call(this, tank, events);
      var view = this.getTankView(tank.id);
      if (!view.parent && view.isAlive) {
        this._tankContainer.addChild(view.view);
        this._hudContainer.addChild(view.hudView);
      }
    }
  }, {
    key: "renderBullet",
    value: function renderBullet(bullet, events) {
      _get(AbstractPixiRenderer.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiRenderer.prototype), "renderBullet", this).call(this, bullet, events);
      var view = this.getBulletView(bullet.id);
      if (!view.parent && view.isAlive) {
        this._bulletContainer.addChild(view.view);
      }
    }
  }, {
    key: "renderClock",
    value: function renderClock(msElapsed, msLimit) {
      this._clockModel.update(msElapsed, msLimit);
      this._clockView.update();
    }
  }, {
    key: "postRender",
    value: function postRender() {
      _get(AbstractPixiRenderer.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiRenderer.prototype), "postRender", this).call(this);
      this._renderer.render(this._stage);
    }
  }, {
    key: "_getSpritesheetUrls",
    value: function _getSpritesheetUrls(rendererName, rendererScale) {
      var resolution = rendererScale == 2 ? "retina@2x" : "web";
      return ["img/spritesheets/" + rendererName + "/" + resolution + "/jsbattle.json"];
    }
  }, {
    key: "_createTankView",
    value: function _createTankView(tank) {
      return new _AbstractPixiTankView2.default(tank);
    }
  }, {
    key: "_createBulletView",
    value: function _createBulletView(bullet) {
      return new _AbstractPixiView2.default(bullet);
    }
  }, {
    key: "_createBattlefieldView",
    value: function _createBattlefieldView(battlefield) {
      return new _AbstractPixiView2.default(battlefield);
    }
  }, {
    key: "_createClockView",
    value: function _createClockView(clock) {
      return new _AbstractPixiView2.default(clock);
    }
  }, {
    key: "stage",
    get: function get() {
      return this._stage;
    }
  }, {
    key: "battlefieldView",
    get: function get() {
      return this._battlefieldView;
    }
  }, {
    key: "masterContainer",
    get: function get() {
      return this._masterContainer;
    }
  }]);

  return AbstractPixiRenderer;
}(_AbstractRenderer3.default);

exports.default = AbstractPixiRenderer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractPixiBulletView = function (_AbstractPixiView) {
  _inherits(AbstractPixiBulletView, _AbstractPixiView);

  function AbstractPixiBulletView(model) {
    _classCallCheck(this, AbstractPixiBulletView);

    return _possibleConstructorReturn(this, (AbstractPixiBulletView.__proto__ || Object.getPrototypeOf(AbstractPixiBulletView)).call(this, model));
  }

  _createClass(AbstractPixiBulletView, [{
    key: "update",
    value: function update(events) {
      _get(AbstractPixiBulletView.prototype.__proto__ || Object.getPrototypeOf(AbstractPixiBulletView.prototype), "update", this).call(this, events);
      this.view.scale.x = this.view.scale.y = this.model.power * 0.7 + 0.3;
      if (this.model.exploded) {
        this.destroy();
      }
    }
  }]);

  return AbstractPixiBulletView;
}(_AbstractPixiView3.default);

exports.default = AbstractPixiBulletView;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AiDefinition = __webpack_require__(14);

var _AiDefinition2 = _interopRequireDefault(_AiDefinition);

var _ajv = __webpack_require__(44);

var _ajv2 = _interopRequireDefault(_ajv);

var _ubdSchemaV = __webpack_require__(78);

var _ubdSchemaV2 = _interopRequireDefault(_ubdSchemaV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UltimateBattleDescriptor = function () {
  function UltimateBattleDescriptor() {
    _classCallCheck(this, UltimateBattleDescriptor);

    this._version = 2;
    this._aiList = [];
    this._rngSeed = new Date().getTime();
    this._teamMode = false;
  }

  _createClass(UltimateBattleDescriptor, [{
    key: 'addAiDefinition',
    value: function addAiDefinition(ai) {
      this._aiList.push(ai);
    }
  }, {
    key: 'setTeamMode',
    value: function setTeamMode(v) {
      this._teamMode = v;
    }
  }, {
    key: 'getTeamMode',
    value: function getTeamMode() {
      return this._teamMode;
    }
  }, {
    key: 'setRngSeed',
    value: function setRngSeed(seed) {
      this._rngSeed = seed;
    }
  }, {
    key: 'getVersion',
    value: function getVersion() {
      return this._version;
    }
  }, {
    key: 'getAiList',
    value: function getAiList() {
      return this._aiList;
    }
  }, {
    key: 'getRngSeed',
    value: function getRngSeed() {
      return this._rngSeed;
    }
  }, {
    key: 'encode',
    value: function encode() {
      var json = {
        version: this._version,
        rngSeed: this._rngSeed,
        teamMode: this._teamMode,
        aiList: []
      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._aiList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ai = _step.value;

          json.aiList.push(ai.toJSON());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var raw = JSON.stringify(json);
      return raw;
    }
  }, {
    key: 'decode',
    value: function decode(data, unsecureMode) {
      var json = void 0;
      try {
        json = JSON.parse(data);
      } catch (err) {
        throw new Error('Cannot parse UBD file! ' + err);
      }
      if (this._version != json.version) {
        throw new Error('Version of UBD does not match. Version ' + json.version + ' is not supported. Please convert to version ' + this._version);
      }
      this.validateJsonData(json);
      this._rngSeed = json.rngSeed;
      this._teamMode = json.teamMode;

      var ai = void 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = json.aiList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var aiJson = _step2.value;

          ai = new _AiDefinition2.default();
          if (!unsecureMode) {
            aiJson.useSandbox = true;
            aiJson.executionLimit = 100;
            aiJson.initData = null;
          }
          ai.fromJSON(aiJson);
          this._aiList.push(ai);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'validateJsonData',
    value: function validateJsonData(json) {
      var ajv = new _ajv2.default();
      var validate = ajv.compile(_ubdSchemaV2.default);
      var valid = validate(json);
      if (!valid) {
        throw new Error("UBD validation failed - " + validate.errors[0].message);
      }
    }
  }, {
    key: 'clone',
    value: function clone() {
      var result = new UltimateBattleDescriptor();
      result.setRngSeed(this.getRngSeed());
      result.setTeamMode(this.getTeamMode());
      var aiList = this.getAiList();
      var aiClone = void 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = aiList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var ai = _step3.value;

          aiClone = ai.clone();
          result.addAiDefinition(ai);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return result;
    }
  }]);

  return UltimateBattleDescriptor;
}();

exports.default = UltimateBattleDescriptor;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SUSSPEND_AI_SANDBOX_WARNING = false;

/**
 * Describes AI algorithm of the tank. There could be two sources of AI scripts:
 * files or string variable. Depending on source of scripts `fromFile()` or `fromCode()`
 * methods should be used to initialize the object
 */

var AiDefinition = function () {

  /**
   * Creates AiDefinition. Constructor is not available outside of
   * `JsBattle.min.js` library. To create AiDefinition object use
   * `JsBattle.createAiDefinition()` instead
   */
  function AiDefinition() {
    _classCallCheck(this, AiDefinition);

    var uid = new Date().getTime().toString();
    uid = uid.substr(uid.length - 6, 6) + "" + Math.round(10000000 * Math.random());
    uid = Number(uid);
    uid = uid.toString(35);
    this._name = "";
    this._team = uid;
    this._code = null;
    this._initData = null;
    this._useSandbox = true;
    this._executionLimit = 100;
  }

  /**
   * @return JSON representation of AiDefiniton
   */


  _createClass(AiDefinition, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this._name,
        team: this._team,
        code: this._code,
        initData: this._initData,
        useSandbox: this._useSandbox,
        executionLimit: this.executionLimit
      };
    }

    /**
     * @param {object} data - JSON data to be parsed
     */

  }, {
    key: "fromJSON",
    value: function fromJSON(data) {
      this._name = data.name;
      this._team = data.team;
      this._code = data.code;
      this._initData = data.initData;
      this._useSandbox = data.useSandbox;
      this._executionLimit = data.executionLimit;
    }

    /**
     * @return copy of the object
     */

  }, {
    key: "clone",
    value: function clone() {
      var result = new AiDefinition();
      result.fromJSON(this.toJSON());
      return result;
    }

    /**
     * @return name of the AI. The same name will be assigned to the tank
     */

  }, {
    key: "fromFile",


    /**
     * Creates AI definition that has source codes in a file. All AI scripts
     * are kept in `/tanks/[tankName].tank.js` files
     * @param {String} tankName - name of the tank. Its source code is kept in `/tanks/[tankName].tank.js`
     * @param {object} initData - optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)
     */
    value: function fromFile(tankName, initData) {
      if (!tankName) throw "TankName is required";
      this._name = tankName;
      this._code = null;
      this._initData = initData !== undefined ? initData : null;
    }

    /**
     * Creates AI definition that has the algorithm codded in provided in string parameter.
     * @param {String} tankName - name of the tank.
     * @param {String} code - JavaScript code of AI script.
     * @param {object} initData - optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)
     */

  }, {
    key: "fromCode",
    value: function fromCode(tankName, code, initData) {
      if (!tankName) throw "TankName is required";
      if (!code) throw "Code is required";
      code = code.replace(/importScripts\w*\([^\)]*\)/g, '');
      this._name = tankName;
      this._code = code;
      this._initData = initData !== undefined ? initData : null;
    }

    /**
     * Set name of the team. Tanks from the same team can coomunicate with eachother and cooperate
     * @param {string} name - unique name of the team
     */

  }, {
    key: "assignToTeam",
    value: function assignToTeam(teamName) {
      this._team = teamName;
    }

    /**
     * Allows to running code of AI in the same sandbox as the core of JsBattle game. It is
     * potentially dangerous since code of AI Script can access code of JS Battle and
     * influence it. However disabling sandbox can significantly increase performance
     * (especially if you run several simulations in concurrent). Use this approach
     * only for trusted AI code.
     */

  }, {
    key: "disableSandbox",
    value: function disableSandbox() {
      if (!this._code) {
        throw "Sandbox can be disabled for AI created from code only.";
      }
      if (!SUSSPEND_AI_SANDBOX_WARNING) {
        console.warn("Disabling sandbox for AI! It could be dangerous.");
        SUSSPEND_AI_SANDBOX_WARNING = true;
      }
      this._useSandbox = false;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }

    /**
     * @return name of the team
     */

  }, {
    key: "teamName",
    get: function get() {
      return this._team;
    }

    /**
     * @return Maximum time for execution of AI script (in milliseconds)
     */

  }, {
    key: "executionLimit",
    get: function get() {
      return this._executionLimit;
    }

    /**
     * @param {Number} limit -  Maximum time for execution of AI script (in milliseconds)
     */
    ,
    set: function set(v) {
      this._executionLimit = v;
    }

    /**
     * @return path to file with code of Web Worker where the AI will be ran.
     */

  }, {
    key: "filePath",
    get: function get() {
      if (!this._useSandbox) return null;
      if (this._code) {
        return "tanks/lib/codeWorker.js";
      } else {
        return "tanks/" + this._name + ".tank.js";
      }
    }

    /**
     * @return source code of AI algorithm as a string. This property is not empty only for AIs created by `fromCode()` call
     * @see AiDefinition.fromCode()
     */

  }, {
    key: "code",
    get: function get() {
      return this._code;
    }

    /**
     * @return optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)
     */

  }, {
    key: "initData",
    get: function get() {
      return this._initData;
    }

    /**
     * @return true if AI should be sandboxed. Otherwise false. By default, all AIs are sandboxed.
     */

  }, {
    key: "useSandbox",
    get: function get() {
      return this._useSandbox;
    }
  }]);

  return AiDefinition;
}();

exports.default = AiDefinition;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(4);

module.exports = SchemaObject;

function SchemaObject(obj) {
  util.copy(obj, this);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;

    var cmp = opts.cmp && function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    }(opts.cmp);

    var seen = [];
    return function stringify(node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    }(data);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_validate(it, $keyword, $ruleType) {
  var out = '';
  var $async = it.schema.$async === true,
      $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, '$ref'),
      $id = it.self._getId(it.schema);
  if (it.isTop) {
    out += ' var validate = ';
    if ($async) {
      it.async = true;
      out += 'async ';
    }
    out += 'function(data, dataPath, parentData, parentDataProperty, rootData) { \'use strict\'; ';
    if ($id && (it.opts.sourceCode || it.opts.processCode)) {
      out += ' ' + ('/\*# sourceURL=' + $id + ' */') + ' ';
    }
  }
  if (typeof it.schema == 'boolean' || !($refKeywords || it.schema.$ref)) {
    var $keyword = 'false schema';
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = 'data' + ($dataLvl || '');
    var $valid = 'valid' + $lvl;
    if (it.schema === false) {
      if (it.isTop) {
        $breakOnError = true;
      } else {
        out += ' var ' + $valid + ' = false; ';
      }
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || 'false schema') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';
        if (it.opts.messages !== false) {
          out += ' , message: \'boolean schema is false\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: false , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + __err + ']); ';
        } else {
          out += ' validate.errors = [' + __err + ']; return false; ';
        }
      } else {
        out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
    } else {
      if (it.isTop) {
        if ($async) {
          out += ' return data; ';
        } else {
          out += ' validate.errors = null; return true; ';
        }
      } else {
        out += ' var ' + $valid + ' = true; ';
      }
    }
    if (it.isTop) {
      out += ' }; return validate; ';
    }
    return out;
  }
  if (it.isTop) {
    var $top = it.isTop,
        $lvl = it.level = 0,
        $dataLvl = it.dataLevel = 0,
        $data = 'data';
    it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
    it.baseId = it.baseId || it.rootId;
    delete it.isTop;
    it.dataPathArr = [undefined];
    out += ' var vErrors = null; ';
    out += ' var errors = 0;     ';
    out += ' if (rootData === undefined) rootData = data; ';
  } else {
    var $lvl = it.level,
        $dataLvl = it.dataLevel,
        $data = 'data' + ($dataLvl || '');
    if ($id) it.baseId = it.resolve.url(it.baseId, $id);
    if ($async && !it.async) throw new Error('async schema in sync schema');
    out += ' var errs_' + $lvl + ' = errors;';
  }
  var $valid = 'valid' + $lvl,
      $breakOnError = !it.opts.allErrors,
      $closingBraces1 = '',
      $closingBraces2 = '';
  var $errorKeyword;
  var $typeSchema = it.schema.type,
      $typeIsArray = Array.isArray($typeSchema);
  if ($typeIsArray && $typeSchema.length == 1) {
    $typeSchema = $typeSchema[0];
    $typeIsArray = false;
  }
  if (it.schema.$ref && $refKeywords) {
    if (it.opts.extendRefs == 'fail') {
      throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
    } else if (it.opts.extendRefs !== true) {
      $refKeywords = false;
      it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
    }
  }
  if (it.schema.$comment && it.opts.$comment) {
    out += ' ' + it.RULES.all.$comment.code(it, '$comment');
  }
  if ($typeSchema) {
    if (it.opts.coerceTypes) {
      var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
    }
    var $rulesGroup = it.RULES.types[$typeSchema];
    if ($coerceToTypes || $typeIsArray || $rulesGroup === true || $rulesGroup && !$shouldUseGroup($rulesGroup)) {
      var $schemaPath = it.schemaPath + '.type',
          $errSchemaPath = it.errSchemaPath + '/type';
      var $schemaPath = it.schemaPath + '.type',
          $errSchemaPath = it.errSchemaPath + '/type',
          $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
      out += ' if (' + it.util[$method]($typeSchema, $data, true) + ') { ';
      if ($coerceToTypes) {
        var $dataType = 'dataType' + $lvl,
            $coerced = 'coerced' + $lvl;
        out += ' var ' + $dataType + ' = typeof ' + $data + '; ';
        if (it.opts.coerceTypes == 'array') {
          out += ' if (' + $dataType + ' == \'object\' && Array.isArray(' + $data + ')) ' + $dataType + ' = \'array\'; ';
        }
        out += ' var ' + $coerced + ' = undefined; ';
        var $bracesCoercion = '';
        var arr1 = $coerceToTypes;
        if (arr1) {
          var $type,
              $i = -1,
              l1 = arr1.length - 1;
          while ($i < l1) {
            $type = arr1[$i += 1];
            if ($i) {
              out += ' if (' + $coerced + ' === undefined) { ';
              $bracesCoercion += '}';
            }
            if (it.opts.coerceTypes == 'array' && $type != 'array') {
              out += ' if (' + $dataType + ' == \'array\' && ' + $data + '.length == 1) { ' + $coerced + ' = ' + $data + ' = ' + $data + '[0]; ' + $dataType + ' = typeof ' + $data + ';  } ';
            }
            if ($type == 'string') {
              out += ' if (' + $dataType + ' == \'number\' || ' + $dataType + ' == \'boolean\') ' + $coerced + ' = \'\' + ' + $data + '; else if (' + $data + ' === null) ' + $coerced + ' = \'\'; ';
            } else if ($type == 'number' || $type == 'integer') {
              out += ' if (' + $dataType + ' == \'boolean\' || ' + $data + ' === null || (' + $dataType + ' == \'string\' && ' + $data + ' && ' + $data + ' == +' + $data + ' ';
              if ($type == 'integer') {
                out += ' && !(' + $data + ' % 1)';
              }
              out += ')) ' + $coerced + ' = +' + $data + '; ';
            } else if ($type == 'boolean') {
              out += ' if (' + $data + ' === \'false\' || ' + $data + ' === 0 || ' + $data + ' === null) ' + $coerced + ' = false; else if (' + $data + ' === \'true\' || ' + $data + ' === 1) ' + $coerced + ' = true; ';
            } else if ($type == 'null') {
              out += ' if (' + $data + ' === \'\' || ' + $data + ' === 0 || ' + $data + ' === false) ' + $coerced + ' = null; ';
            } else if (it.opts.coerceTypes == 'array' && $type == 'array') {
              out += ' if (' + $dataType + ' == \'string\' || ' + $dataType + ' == \'number\' || ' + $dataType + ' == \'boolean\' || ' + $data + ' == null) ' + $coerced + ' = [' + $data + ']; ';
            }
          }
        }
        out += ' ' + $bracesCoercion + ' if (' + $coerced + ' === undefined) {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { type: \'';
          if ($typeIsArray) {
            out += '' + $typeSchema.join(",");
          } else {
            out += '' + $typeSchema;
          }
          out += '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should be ';
            if ($typeIsArray) {
              out += '' + $typeSchema.join(",");
            } else {
              out += '' + $typeSchema;
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + __err + ']); ';
          } else {
            out += ' validate.errors = [' + __err + ']; return false; ';
          }
        } else {
          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else {  ';
        var $parentData = $dataLvl ? 'data' + ($dataLvl - 1 || '') : 'parentData',
            $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
        out += ' ' + $data + ' = ' + $coerced + '; ';
        if (!$dataLvl) {
          out += 'if (' + $parentData + ' !== undefined)';
        }
        out += ' ' + $parentData + '[' + $parentDataProperty + '] = ' + $coerced + '; } ';
      } else {
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { type: \'';
          if ($typeIsArray) {
            out += '' + $typeSchema.join(",");
          } else {
            out += '' + $typeSchema;
          }
          out += '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should be ';
            if ($typeIsArray) {
              out += '' + $typeSchema.join(",");
            } else {
              out += '' + $typeSchema;
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + __err + ']); ';
          } else {
            out += ' validate.errors = [' + __err + ']; return false; ';
          }
        } else {
          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
      }
      out += ' } ';
    }
  }
  if (it.schema.$ref && !$refKeywords) {
    out += ' ' + it.RULES.all.$ref.code(it, '$ref') + ' ';
    if ($breakOnError) {
      out += ' } if (errors === ';
      if ($top) {
        out += '0';
      } else {
        out += 'errs_' + $lvl;
      }
      out += ') { ';
      $closingBraces2 += '}';
    }
  } else {
    var arr2 = it.RULES;
    if (arr2) {
      var $rulesGroup,
          i2 = -1,
          l2 = arr2.length - 1;
      while (i2 < l2) {
        $rulesGroup = arr2[i2 += 1];
        if ($shouldUseGroup($rulesGroup)) {
          if ($rulesGroup.type) {
            out += ' if (' + it.util.checkDataType($rulesGroup.type, $data) + ') { ';
          }
          if (it.opts.useDefaults && !it.compositeRule) {
            if ($rulesGroup.type == 'object' && it.schema.properties) {
              var $schema = it.schema.properties,
                  $schemaKeys = Object.keys($schema);
              var arr3 = $schemaKeys;
              if (arr3) {
                var $propertyKey,
                    i3 = -1,
                    l3 = arr3.length - 1;
                while (i3 < l3) {
                  $propertyKey = arr3[i3 += 1];
                  var $sch = $schema[$propertyKey];
                  if ($sch.default !== undefined) {
                    var $passData = $data + it.util.getProperty($propertyKey);
                    out += '  if (' + $passData + ' === undefined) ' + $passData + ' = ';
                    if (it.opts.useDefaults == 'shared') {
                      out += ' ' + it.useDefault($sch.default) + ' ';
                    } else {
                      out += ' ' + JSON.stringify($sch.default) + ' ';
                    }
                    out += '; ';
                  }
                }
              }
            } else if ($rulesGroup.type == 'array' && Array.isArray(it.schema.items)) {
              var arr4 = it.schema.items;
              if (arr4) {
                var $sch,
                    $i = -1,
                    l4 = arr4.length - 1;
                while ($i < l4) {
                  $sch = arr4[$i += 1];
                  if ($sch.default !== undefined) {
                    var $passData = $data + '[' + $i + ']';
                    out += '  if (' + $passData + ' === undefined) ' + $passData + ' = ';
                    if (it.opts.useDefaults == 'shared') {
                      out += ' ' + it.useDefault($sch.default) + ' ';
                    } else {
                      out += ' ' + JSON.stringify($sch.default) + ' ';
                    }
                    out += '; ';
                  }
                }
              }
            }
          }
          var arr5 = $rulesGroup.rules;
          if (arr5) {
            var $rule,
                i5 = -1,
                l5 = arr5.length - 1;
            while (i5 < l5) {
              $rule = arr5[i5 += 1];
              if ($shouldUseRule($rule)) {
                var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);
                if ($code) {
                  out += ' ' + $code + ' ';
                  if ($breakOnError) {
                    $closingBraces1 += '}';
                  }
                }
              }
            }
          }
          if ($breakOnError) {
            out += ' ' + $closingBraces1 + ' ';
            $closingBraces1 = '';
          }
          if ($rulesGroup.type) {
            out += ' } ';
            if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
              out += ' else { ';
              var $schemaPath = it.schemaPath + '.type',
                  $errSchemaPath = it.errSchemaPath + '/type';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { type: \'';
                if ($typeIsArray) {
                  out += '' + $typeSchema.join(",");
                } else {
                  out += '' + $typeSchema;
                }
                out += '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'should be ';
                  if ($typeIsArray) {
                    out += '' + $typeSchema.join(",");
                  } else {
                    out += '' + $typeSchema;
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) {
                /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + __err + ']); ';
                } else {
                  out += ' validate.errors = [' + __err + ']; return false; ';
                }
              } else {
                out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              out += ' } ';
            }
          }
          if ($breakOnError) {
            out += ' if (errors === ';
            if ($top) {
              out += '0';
            } else {
              out += 'errs_' + $lvl;
            }
            out += ') { ';
            $closingBraces2 += '}';
          }
        }
      }
    }
  }
  if ($breakOnError) {
    out += ' ' + $closingBraces2 + ' ';
  }
  if ($top) {
    if ($async) {
      out += ' if (errors === 0) return data;           ';
      out += ' else throw new ValidationError(vErrors); ';
    } else {
      out += ' validate.errors = vErrors; ';
      out += ' return errors === 0;       ';
    }
    out += ' }; return validate;';
  } else {
    out += ' var ' + $valid + ' = errors === errs_' + $lvl + ';';
  }
  out = it.util.cleanUpCode(out);
  if ($top) {
    out = it.util.finalCleanUpCode(out, $async);
  }

  function $shouldUseGroup($rulesGroup) {
    var rules = $rulesGroup.rules;
    for (var i = 0; i < rules.length; i++) {
      if ($shouldUseRule(rules[i])) return true;
    }
  }

  function $shouldUseRule($rule) {
    return it.schema[$rule.keyword] !== undefined || $rule.implements && $ruleImplementsSomeKeyword($rule);
  }

  function $ruleImplementsSomeKeyword($rule) {
    var impl = $rule.implements;
    for (var i = 0; i < impl.length; i++) {
      if (it.schema[impl[i]] !== undefined) return true;
    }
  }
  return out;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate__limit(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $isMax = $keyword == 'maximum',
      $exclusiveKeyword = $isMax ? 'exclusiveMaximum' : 'exclusiveMinimum',
      $schemaExcl = it.schema[$exclusiveKeyword],
      $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data,
      $op = $isMax ? '<' : '>',
      $notOp = $isMax ? '>' : '<',
      $errorKeyword = undefined;
  if ($isDataExcl) {
    var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
        $exclusive = 'exclusive' + $lvl,
        $exclType = 'exclType' + $lvl,
        $exclIsNumber = 'exclIsNumber' + $lvl,
        $opExpr = 'op' + $lvl,
        $opStr = '\' + ' + $opExpr + ' + \'';
    out += ' var schemaExcl' + $lvl + ' = ' + $schemaValueExcl + '; ';
    $schemaValueExcl = 'schemaExcl' + $lvl;
    out += ' var ' + $exclusive + '; var ' + $exclType + ' = typeof ' + $schemaValueExcl + '; if (' + $exclType + ' != \'boolean\' && ' + $exclType + ' != \'undefined\' && ' + $exclType + ' != \'number\') { ';
    var $errorKeyword = $exclusiveKeyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || '_exclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'' + $exclusiveKeyword + ' should be boolean\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + __err + ']); ';
      } else {
        out += ' validate.errors = [' + __err + ']; return false; ';
      }
    } else {
      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } else if ( ';
    if ($isData) {
      out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
    }
    out += ' ' + $exclType + ' == \'number\' ? ( (' + $exclusive + ' = ' + $schemaValue + ' === undefined || ' + $schemaValueExcl + ' ' + $op + '= ' + $schemaValue + ') ? ' + $data + ' ' + $notOp + '= ' + $schemaValueExcl + ' : ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' ) : ( (' + $exclusive + ' = ' + $schemaValueExcl + ' === true) ? ' + $data + ' ' + $notOp + '= ' + $schemaValue + ' : ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' ) || ' + $data + ' !== ' + $data + ') { var op' + $lvl + ' = ' + $exclusive + ' ? \'' + $op + '\' : \'' + $op + '=\'; ';
    if ($schema === undefined) {
      $errorKeyword = $exclusiveKeyword;
      $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
      $schemaValue = $schemaValueExcl;
      $isData = $isDataExcl;
    }
  } else {
    var $exclIsNumber = typeof $schemaExcl == 'number',
        $opStr = $op;
    if ($exclIsNumber && $isData) {
      var $opExpr = '\'' + $opStr + '\'';
      out += ' if ( ';
      if ($isData) {
        out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
      }
      out += ' ( ' + $schemaValue + ' === undefined || ' + $schemaExcl + ' ' + $op + '= ' + $schemaValue + ' ? ' + $data + ' ' + $notOp + '= ' + $schemaExcl + ' : ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' ) || ' + $data + ' !== ' + $data + ') { ';
    } else {
      if ($exclIsNumber && $schema === undefined) {
        $exclusive = true;
        $errorKeyword = $exclusiveKeyword;
        $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
        $schemaValue = $schemaExcl;
        $notOp += '=';
      } else {
        if ($exclIsNumber) $schemaValue = Math[$isMax ? 'min' : 'max']($schemaExcl, $schema);
        if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
          $exclusive = true;
          $errorKeyword = $exclusiveKeyword;
          $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
          $notOp += '=';
        } else {
          $exclusive = false;
          $opStr += '=';
        }
      }
      var $opExpr = '\'' + $opStr + '\'';
      out += ' if ( ';
      if ($isData) {
        out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
      }
      out += ' ' + $data + ' ' + $notOp + ' ' + $schemaValue + ' || ' + $data + ' !== ' + $data + ') { ';
    }
  }
  $errorKeyword = $errorKeyword || $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limit') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { comparison: ' + $opExpr + ', limit: ' + $schemaValue + ', exclusive: ' + $exclusive + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be ' + $opStr + ' ';
      if ($isData) {
        out += '\' + ' + $schemaValue;
      } else {
        out += '' + $schemaValue + '\'';
      }
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + $schema;
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate__limitItems(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxItems' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
  }
  out += ' ' + $data + '.length ' + $op + ' ' + $schemaValue + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitItems') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schemaValue + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT have ';
      if ($keyword == 'maxItems') {
        out += 'more';
      } else {
        out += 'fewer';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + $schemaValue + ' + \'';
      } else {
        out += '' + $schema;
      }
      out += ' items\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + $schema;
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate__limitLength(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxLength' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
  }
  if (it.opts.unicode === false) {
    out += ' ' + $data + '.length ';
  } else {
    out += ' ucs2length(' + $data + ') ';
  }
  out += ' ' + $op + ' ' + $schemaValue + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitLength') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schemaValue + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT be ';
      if ($keyword == 'maxLength') {
        out += 'longer';
      } else {
        out += 'shorter';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + $schemaValue + ' + \'';
      } else {
        out += '' + $schema;
      }
      out += ' characters\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + $schema;
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate__limitProperties(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $op = $keyword == 'maxProperties' ? '>' : '<';
  out += 'if ( ';
  if ($isData) {
    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'number\') || ';
  }
  out += ' Object.keys(' + $data + ').length ' + $op + ' ' + $schemaValue + ') { ';
  var $errorKeyword = $keyword;
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + ($errorKeyword || '_limitProperties') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schemaValue + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should NOT have ';
      if ($keyword == 'maxProperties') {
        out += 'more';
      } else {
        out += 'fewer';
      }
      out += ' than ';
      if ($isData) {
        out += '\' + ' + $schemaValue + ' + \'';
      } else {
        out += '' + $schema;
      }
      out += ' properties\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + $schema;
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractView = function () {
  function AbstractView(model) {
    _classCallCheck(this, AbstractView);

    this._model = model;
    this._view = null;
    this._isAlive = true;
  }

  _createClass(AbstractView, [{
    key: 'destroy',
    value: function destroy() {
      this._isAlive = false;
    }
  }, {
    key: 'update',
    value: function update(events) {}
  }, {
    key: 'isAlive',
    get: function get() {
      return this._isAlive;
    }
  }, {
    key: 'model',
    get: function get() {
      return this._model;
    }
  }, {
    key: 'view',
    get: function get() {
      return this._view;
    }
  }]);

  return AbstractView;
}();

exports.default = AbstractView;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Simulation = __webpack_require__(24);

var _Simulation2 = _interopRequireDefault(_Simulation);

var _Renderer = __webpack_require__(10);

var _Renderer2 = _interopRequireDefault(_Renderer);

var _DebugRenderer = __webpack_require__(79);

var _DebugRenderer2 = _interopRequireDefault(_DebugRenderer);

var _BWRenderer = __webpack_require__(86);

var _BWRenderer2 = _interopRequireDefault(_BWRenderer);

var _BrodyRenderer = __webpack_require__(91);

var _BrodyRenderer2 = _interopRequireDefault(_BrodyRenderer);

var _VoidRenderer = __webpack_require__(97);

var _VoidRenderer2 = _interopRequireDefault(_VoidRenderer);

var _AiDefinition = __webpack_require__(14);

var _AiDefinition2 = _interopRequireDefault(_AiDefinition);

var _UltimateBattleDescriptor = __webpack_require__(13);

var _UltimateBattleDescriptor2 = _interopRequireDefault(_UltimateBattleDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  createSimulation: function createSimulation(renderer) {
    renderer = renderer ? renderer : new _Renderer2.default();
    var sim = new _Simulation2.default(renderer);
    return sim;
  },

  createAiDefinition: function createAiDefinition() {
    return new _AiDefinition2.default();
  },

  createUBD: function createUBD() {
    return new _UltimateBattleDescriptor2.default();
  },

  createRenderer: function createRenderer(name) {
    switch (name) {
      case 'debug':
        return new _DebugRenderer2.default();
      case 'bw':
        return new _BWRenderer2.default();
      case 'brody':
        return new _BrodyRenderer2.default();
      case 'void':
        return new _VoidRenderer2.default();
      default:
        throw "Unknown rederer " + name;
    }
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tank = __webpack_require__(25);

var _Tank2 = _interopRequireDefault(_Tank);

var _Team = __webpack_require__(34);

var _Team2 = _interopRequireDefault(_Team);

var _Bullet = __webpack_require__(35);

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Battlefield = __webpack_require__(36);

var _Battlefield2 = _interopRequireDefault(_Battlefield);

var _EventStore = __webpack_require__(37);

var _EventStore2 = _interopRequireDefault(_EventStore);

var _CollisionResolver = __webpack_require__(38);

var _CollisionResolver2 = _interopRequireDefault(_CollisionResolver);

var _AiWrapper = __webpack_require__(40);

var _AiWrapper2 = _interopRequireDefault(_AiWrapper);

var _PerformanceMonitor = __webpack_require__(43);

var _PerformanceMonitor2 = _interopRequireDefault(_PerformanceMonitor);

var _UltimateBattleDescriptor = __webpack_require__(13);

var _UltimateBattleDescriptor2 = _interopRequireDefault(_UltimateBattleDescriptor);

var _seedrandom = __webpack_require__(6);

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Battle simulation component. Process the simulation updating all related objects
 * and refreshing the renderer.
 */
var Simulation = function () {
  /**
   * Create Simulation object. Constructor is not available outside of
   * `JsBattle.min.js` library. To create Simulation object use
   * `JsBattle.createSimulation(renderer)` instead
   * @param {Renderer} renderer - Renderer used to present results of the simulation
   */
  function Simulation(renderer) {
    _classCallCheck(this, Simulation);

    this._aiList = [];
    this._allTankList = [];
    this._tankList = [];
    this._bulletList = [];
    this._explodedTankList = [];
    this._explodedBulletList = [];
    this._battlefield = null;
    this._simulationTimeout = null;
    this._renderInterval = null;
    this._simulationStepDuration = 17;
    this._renderStepDuration = 30;
    this._renderer = renderer;
    this._isRunning = false;
    this._collisionResolver = new _CollisionResolver2.default();
    this._rngSeed = new Date().getTime() + Math.round(Math.random() * 1000000);
    this._rng = (0, _seedrandom2.default)(this._rngSeed);
    this._speedMultiplier = 1;
    this._onSimulationStepCallback = [];
    this._onRenderStepCallback = [];
    this._onFinishCallback = [];
    this._onErrorCallback = [];
    this._onStartCallback = [];
    this._timeElapsed = 0;
    this._timeLimit = 30000;
    this._eventStore = new _EventStore2.default();
    this._nextTankId = 1;
    this._nextBulletId = 1;
    this._rendererQuality = 'auto';
    this._perfMon = new _PerformanceMonitor2.default();
    this._perfMon.setSimulationStepDuration(this._simulationStepDuration / this._speedMultiplier);
    this._callStackLimit = Number.MAX_VALUE;
    this._callStackCount = 0;
    this._teamMap = [];
    this._teamList = [];
    this._ultimateBattleDescriptor = new _UltimateBattleDescriptor2.default();
  }

  /**
    * Seed random number generator. Each time when you seed rng with the same data
    * it will return the same sequence of numbers. That feature can be used
    * to reconstruct exactly the same, "randomized" simulation condidtions.
    *
    * IMPORTANT! set it just after calling constructor of the calss. Otherwise
    * some RNG calls could be unseeded.
    *
    * @param {Number} seed - rng seed data
    */


  _createClass(Simulation, [{
    key: "setRngSeed",
    value: function setRngSeed(seed) {
      this._rngSeed = seed;
      this._ultimateBattleDescriptor.setRngSeed(seed);
      this._rng = (0, _seedrandom2.default)(this._rngSeed);
    }

    /**
     * @return seed of random number generator
     */

  }, {
    key: "getRngSeed",
    value: function getRngSeed() {
      return this._rngSeed;
    }

    /**
     * @return random number from seeded rng
     */

  }, {
    key: "getRandom",
    value: function getRandom() {
      return this._rng();
    }

    /**
     * Initialize the battle field. Must be called before any other calls
     * to simulation object
     * @param {Number} width - width of the battlefield
     * @param {Number} height - height of the battlefield
     */

  }, {
    key: "init",
    value: function init(width, height) {
      this._battlefield = new _Battlefield2.default();
      this._battlefield.setSize(width, height);
      this._battlefield.randomize(this._rng());
      this._renderer.initBatlefield(this._battlefield);
      this._collisionResolver.updateBattlefield(this._battlefield);
    }

    /**
     * @return all tanks that were added to the battle
     */

  }, {
    key: "start",


    /**
     * Starts simulation of the battle. It will initialize all AI scripts, trigger `onStart` event
     * and launch rendering and simulation processing loops. Remember to call `Simulation.init()` and
     * `Simulation.addTank()` before executing this method.
     * @see Simulation.onStart()
     */
    value: function start() {
      this._isRunning = true;
      var i = void 0;
      var self = this;

      if (this._renderInterval) {
        clearInterval(this._renderInterval);
        this._renderInterval = null;
      }

      this._activateAi(function () {
        self._renderInterval = setInterval(function () {
          self._updateView();
        }, self._renderStepDuration);

        if (self._simulationTimeout) {
          clearTimeout(self._simulationTimeout);
        }
        self._perfMon.start();
        for (i = 0; i < self._onStartCallback.length; i++) {
          self._onStartCallback[i]();
        }self._simulationStep();
      }, function (err) {
        console.error(err);
        for (i = 0; i < self._onErrorCallback.length; i++) {
          self._onErrorCallback[i](err.message ? err.message : "Error during simulation");
        }
      });
    }
  }, {
    key: "_simulationStep",
    value: function _simulationStep() {
      this._perfMon.onSimulationStep();
      var startTime = new Date().getTime();
      var self = this;
      var i = void 0;
      this._updateModel();
      this._updateAi(function () {
        if (self._simulationTimeout) {
          clearTimeout(self._simulationTimeout);
          self._simulationTimeout = null;
        }
        if (self._getTeamsLeft() <= 1 || self._timeElapsed == self._timeLimit) {
          self.stop();
          self._updateModel();
          self._updateView();
          for (i = 0; i < self._onFinishCallback.length; i++) {
            self._onFinishCallback[i]();
          }
        }
        if (self._isRunning) {
          var processingTime = new Date().getTime() - startTime;
          var dt = self._simulationStepDuration / self._speedMultiplier - processingTime;
          dt = Math.round(dt);
          for (i = 0; i < self._onSimulationStepCallback.length; i++) {
            self._onSimulationStepCallback[i]();
          }self._timeElapsed = Math.min(self._timeElapsed + self._simulationStepDuration, self._timeLimit);
          if (dt > 0) {
            self._callStackCount = 0;
            self._simulationTimeout = setTimeout(self._simulationStep.bind(self), dt);
          } else if (self._callStackCount >= self._callStackLimit) {
            self._simulationTimeout = setTimeout(self._simulationStep.bind(self), 1);
          } else {
            self._callStackCount++;
            self._simulationStep();
          }
        }
      }, function (err) {
        console.error(err);
        for (i = 0; i < self._onErrorCallback.length; i++) {
          self._onErrorCallback[i](err.message ? err.message : "Error during simulation");
        }
      });
    }

    /**
     * Create a tank according to provided `AiDefinition`. Remember to add at
     * least two tanks to the battle. Otherwise, it will stop immediately and
     * the winner will be recognized
     * @param {AiDefinition} - defintion of tank AI script
     */

  }, {
    key: "addTank",
    value: function addTank(aiDefinition) {
      if ((typeof aiDefinition === "undefined" ? "undefined" : _typeof(aiDefinition)) != 'object') {
        throw "AI definition must be an object";
      }
      if (!this._battlefield) {
        throw "Simulation not initialized";
      }
      if (!aiDefinition.teamName) {
        throw "Team name cannot be empty!";
      }
      var startSlot = this._battlefield.getStartSlot();
      if (!startSlot) {
        throw "No free space in the battlefield";
      }
      this._ultimateBattleDescriptor.addAiDefinition(aiDefinition);
      this._ultimateBattleDescriptor.setTeamMode(this.hasTeams());
      var tank = this._createTank(aiDefinition);
      tank.randomize(this.getRandom());
      tank.moveTo(startSlot.x, startSlot.y);
      this._tankList.push(tank);
      this._allTankList.push(tank);
      if (this._allTankList.length > 2) {
        this._timeLimit += 2000;
      }

      if (!this._teamMap[aiDefinition.teamName]) {
        this._teamMap[aiDefinition.teamName] = new _Team2.default(aiDefinition.teamName);
        this._teamList.push(this._teamMap[aiDefinition.teamName]);
      }
      this._teamMap[aiDefinition.teamName].addTank(tank);

      var ai = this._createAiWrapper(tank, aiDefinition);
      this._aiList.push(ai);

      return ai;
    }

    /**
     * Set speed multiplier of the simulation. Setting to `2`means that everything will be
     * two times faster than usual. Setting to `0.5` will simulate the battle 2 times slower
     * than usual
     * @param {Number} multiplier - simulation speed multiplier
     */

  }, {
    key: "setSpeed",
    value: function setSpeed(v) {
      this._speedMultiplier = Math.max(0.01, Number(v));
      this._perfMon.setSimulationStepDuration(this._simulationStepDuration / this._speedMultiplier);
      this._renderer.setSpeed(v);
    }

    /**
     * Sets quality of renderer controlled by simulation object.
     * You can specify a value between 0 (lowest quality) and 1 (highest quality)
     * or allow the simulation to adjust it automatically by passing 'auto' string
     * Automatic quality adjustment try to keep the speed of the animation at proper level.
     * If simulation is lagging, quality will be reduced to ensure that the simulation
     * does not take longer than it should
     * @param {Number|String} qualityLevel - number between 0 and 1 or 'auto' string
     */

  }, {
    key: "setRendererQuality",
    value: function setRendererQuality(v) {
      if (isNaN(v) && v != 'auto') return;
      if (!isNaN(v)) {
        v = Math.min(1, Math.max(0, v));
      }
      this._rendererQuality = v;
    }

    /**
     * Stops battle simulation. It also stops rendering loop.
     * After calling this method you should not try to call
     * start to resume the battle but rather create a new
     * Simulation object and initialize it from the beginning
     */

  }, {
    key: "stop",
    value: function stop() {
      this._isRunning = false;
      this._perfMon.stop();
      this._renderer.stop();
      if (this._simulationTimeout) {
        clearTimeout(this._simulationTimeout);
        this._simulationTimeout = null;
      }
      if (this._renderInterval) {
        clearInterval(this._renderInterval);
        this._renderInterval = null;
      }
      var ai = void 0,
          i = void 0;
      for (i = 0; i < this._aiList.length; i++) {
        ai = this._aiList[i];
        if (!ai) continue;
        ai.deactivate();
      }
      this._aiList = [];
    }

    /**
     * Allow adding a callback that will be called after each step of simulation
     * processing loop. The callback takes no arguments. The frequency of this event
     * depends on simulation speed.
     * @param {Function} callback - callback that will be called on each event occurence.
     * @see `Simulation.setSpeed()`
     */

  }, {
    key: "onStep",
    value: function onStep(callback) {
      this._onSimulationStepCallback.push(callback);
    }

    /**
     * Allow adding a callback that will be called after each refresh of the renderer.
     * The callback takes no arguments. `onRender` and `onStep` event are not synchronized
     * and may be called at different intervals. Increasing of animation speed will not
     * increase rendering frequency. Rendering frequency is affected by quality of
     * rendering parameter
     * @param {Function} callback - callback that will be called on each event occurence.
     * @see `Simulation.setSpeed()`
     * @see `Simulation.setRendererQuality()`
     */

  }, {
    key: "onRender",
    value: function onRender(callback) {
      this._onRenderStepCallback.push(callback);
    }

    /**
     * Allow adding a callback that will be called when the battle is started.
     * It is executed after initialization of all AI Scripts, just before
     * first step of simulation processing loop. The callback takes no arguments.
     * @param {Function} callback - callback that will be called on each event occurence.
     */

  }, {
    key: "onStart",
    value: function onStart(callback) {
      this._onStartCallback.push(callback);
    }

    /**
     * Allow adding a callback that will be called when the battle is over.
     * The callback takes no arguments.
     * @param {Function} callback - callback that will be called on each event occurence.
     */

  }, {
    key: "onFinish",
    value: function onFinish(callback) {
      this._onFinishCallback.push(callback);
    }

    /**
     * Allow adding a callback that will be called when an error occur.
     * The callback takes one arguments: error message
     * @param {Function} callback - callback that will be called on each event occurence.
     */

  }, {
    key: "onError",
    value: function onError(callback) {
      this._onErrorCallback.push(callback);
    }

    /**
     * Create Ultimate Battle Descriptor that contains all data requied to replay
     * the battle and reflect its exact course.
     * @return UltimateBattleDescriptor object
     */

  }, {
    key: "createUltimateBattleDescriptor",
    value: function createUltimateBattleDescriptor() {
      return this._ultimateBattleDescriptor.clone();
    }

    /**
     * @return true if at least two tanks are cooperating within one team
     */

  }, {
    key: "hasTeams",
    value: function hasTeams() {
      return this._teamList.length != this._tankList.length;
    }
  }, {
    key: "_activateAi",
    value: function _activateAi(done, error) {
      this._runInSequence(this._aiList, 'activate', this._rng(), done, error);
    }
  }, {
    key: "_updateAi",
    value: function _updateAi(done, error) {
      this._runInSequence(this._aiList, 'simulationStep', null, done, error);
    }
  }, {
    key: "_runInSequence",
    value: function _runInSequence(objectList, methodName, argument, done, error) {
      if (objectList.length == 0) {
        return done();
      }
      function wrapCallback() {
        var args = [];
        var callback = arguments[1];
        var self = arguments[0];
        for (var i = 2; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        return function (args2) {
          callback.apply(self, args.concat(args2));
        };
      }

      var self = null;
      var doneWrapper = wrapCallback(self, done);
      var errorWrapper = wrapCallback(self, error);

      var c = void 0;
      if (argument) {
        c = wrapCallback(objectList[objectList.length - 1], objectList[objectList.length - 1][methodName], argument, doneWrapper, errorWrapper);
      } else {
        c = wrapCallback(objectList[objectList.length - 1], objectList[objectList.length - 1][methodName], doneWrapper, errorWrapper);
      }
      for (var i = objectList.length - 2; i >= 0; i--) {
        if (argument) {
          c = wrapCallback(objectList[i], objectList[i][methodName], argument, c, errorWrapper);
        } else {
          c = wrapCallback(objectList[i], objectList[i][methodName], c, errorWrapper);
        }
      }
      c();
    }
  }, {
    key: "_updateModel",
    value: function _updateModel() {
      var i = void 0,
          tank = void 0,
          bullet = void 0,
          ai = void 0;

      for (i = 0; i < this._tankList.length; i++) {
        tank = this._tankList[i];
        if (!tank) continue;
        tank.simulationStep(this._collisionResolver);
      }

      var killCount = 0;
      for (i = 0; i < this._tankList.length; i++) {
        tank = this._tankList[i];
        if (!tank) continue;
        if (tank.energy <= 0) {
          killCount++;
          this._tankList[i] = null;
          this._explodedTankList.push(tank);
          this._collisionResolver.removeTank(tank);
          this._eventStore.add("tank_" + tank.id, {
            type: "destroy",
            tank: tank
          });
        }
      }
      var newAiList = [];
      for (i = 0; i < this._aiList.length; i++) {
        ai = this._aiList[i];
        if (!ai) continue;
        if (ai.tank.energy <= 0) {
          this._aiList[i] = null;
          ai.deactivate();
          continue;
        }
        newAiList.push(ai);
      }
      this._aiList = newAiList;

      for (i = 0; i < this._tankList.length; i++) {
        tank = this._tankList[i];
        if (!tank) continue;
        if (tank.isShooting) {
          var power = tank.handleShoot();
          bullet = this._createBullet(tank, power);
          this._bulletList.push(bullet);
          this._eventStore.add("tank_" + tank.id, {
            type: "shoot",
            tank: tank,
            bullet: bullet
          });
        }
      }
      for (i = 0; i < this._tankList.length; i++) {
        tank = this._tankList[i];
        if (!tank) continue;
        for (var j = 0; j < killCount; j++) {
          tank.onSurviveScore();
        }
      }
      var hitTest = void 0;
      for (i = 0; i < this._bulletList.length; i++) {
        bullet = this._bulletList[i];
        if (!bullet) continue;
        bullet.simulationStep();
        hitTest = this._collisionResolver.hitTestBullet(bullet);
        if (hitTest) {
          this._bulletList[i] = null;
          this._explodedBulletList.push(bullet);
          this._collisionResolver.removeBullet(bullet);
          this._eventStore.add("bullet_" + bullet.id, {
            type: "explode",
            bullet: bullet
          });
        }
      }
      for (i in this._teamMap) {
        this._teamMap[i].processMessages();
      }
    }
  }, {
    key: "_updateView",
    value: function _updateView() {
      if (this._rendererQuality == 'auto') {
        this._renderer.quality = this._perfMon.qualityLevel;
      } else {
        this._renderer.quality = this._rendererQuality;
      }
      var i = void 0,
          tank = void 0,
          bullet = void 0;
      this._renderer.preRender();
      this._renderer.renderClock(this._timeElapsed, this._timeLimit);
      for (i = 0; i < this._tankList.length; i++) {
        tank = this._tankList[i];
        if (!tank) continue;
        this._renderer.renderTank(tank, this._eventStore.get("tank_" + tank.id));
      }
      for (i = 0; i < this._bulletList.length; i++) {
        bullet = this._bulletList[i];
        if (!bullet) continue;
        this._renderer.renderBullet(bullet, this._eventStore.get("bullet_" + bullet.id));
      }
      while (this._explodedTankList.length) {
        tank = this._explodedTankList.pop();
        this._renderer.renderTank(tank, this._eventStore.get("tank_" + tank.id));
      }
      while (this._explodedBulletList.length) {
        bullet = this._explodedBulletList.pop();
        this._renderer.renderBullet(bullet, this._eventStore.get("bullet_" + bullet.id));
      }
      this._renderer.renderTankStats(this._allTankList);
      this._renderer.postRender();
      for (i = 0; i < this._onRenderStepCallback.length; i++) {
        this._onRenderStepCallback[i]();
      }this._eventStore.clear();
    }
  }, {
    key: "_getTeamsLeft",
    value: function _getTeamsLeft() {
      var teamsLeft = 0;
      for (var i in this._teamMap) {
        if (!this._teamMap[i].isAlive) continue;
        teamsLeft++;
      }
      return teamsLeft;
    }
  }, {
    key: "_createAiWrapper",
    value: function _createAiWrapper(tank, aiDefinition) {
      return new _AiWrapper2.default(tank, aiDefinition);
    }
  }, {
    key: "_createTank",
    value: function _createTank(aiDefinition) {
      var tank = new _Tank2.default(aiDefinition, this._nextTankId++);
      return tank;
    }
  }, {
    key: "_createBullet",
    value: function _createBullet(owner, power) {
      var bullet = new _Bullet2.default(owner, this._nextBulletId++, power);
      return bullet;
    }
  }, {
    key: "tankList",
    get: function get() {
      return this._allTankList;
    }

    /**
     * @return list of teams
     */

  }, {
    key: "teamList",
    get: function get() {
      return this._teamList;
    }

    /**
     * @return renderer attached to the simulation
     */

  }, {
    key: "renderer",
    get: function get() {
      return this._renderer;
    }
  }, {
    key: "battlefield",
    get: function get() {
      return this._battlefield;
    }

    /**
     * @return amount of time that has elapsed from the beginning of the battle (in milliseconds)
     */

  }, {
    key: "timeElapsed",
    get: function get() {
      return this._timeElapsed;
    }

    /**
     * @return maximum duration of the battle (in milliseconds). The battle will be over after that time.
     */

  }, {
    key: "timeLimit",
    get: function get() {
      return this._timeLimit;
    },
    set: function set(v) {
      this._timeLimit = v;
    }
  }]);

  return Simulation;
}();

exports.default = Simulation;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _seedrandom = __webpack_require__(6);

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function normalizeAngle(a) {
  while (a > 180) {
    a -= 360;
  }while (a < -180) {
    a += 360;
  }return a;
}

/**
 * Object represents a tank that is involved in the battle during simulation
 */

var Tank = function () {

  /**
   * Constructor should not be called directly but through
   * `Simulation.addTank()` method
   * @param {AiDefinition} aiDefinition - definition of tank's AI Script
   * @param {Number} id - unique id of the tank
   * @param {Team} team - reference to team object where the tank belongs
   */
  function Tank(aiDefinition, id) {
    _classCallCheck(this, Tank);

    if ((typeof aiDefinition === 'undefined' ? 'undefined' : _typeof(aiDefinition)) != 'object') {
      throw "AI definition must be an object";
    }
    this._id = id;
    this._name = aiDefinition.name;
    this._team = null;
    this._maxEnergy = 100;
    this._energy = this._maxEnergy;
    this._x = 0;
    this._y = 0;
    this._lastX = 0;
    this._lastY = 0;
    this._angle = 0;
    this._gunAngle = 0;
    this._radarAngle = 0;
    this._throttle = 0;
    this._actualThrottle = 0;
    this._speed = 0;
    this._turn = 0;
    this._gunTurn = 0;
    this._radarTurn = 0;
    this._wallHit = false;
    this._enemyHit = false;
    this._allyHit = false;
    this._beingRammed = false;
    this._radarRange = 300;
    this._radarFocal = 6;
    this._enemySpot = null;
    this._allySpot = null;
    this._bulletsSpot = [];
    this._gunReloadTime = 70;
    this._gunTimer = 0;
    this._shootingPower = 0;
    this._targetingAlarmTimer = 0;
    this._debugData = {};
    this._score = 0;
    this._state = null;
    this._hasBoost = false;
    this._maxBoost = 400;
    this._boost = this._maxBoost;
    this._wallDistance = null;
    this._skin = 'zebra';
  }

  /**
   * @return unique id of the tank
   */


  _createClass(Tank, [{
    key: 'onEnemyHitScore',
    value: function onEnemyHitScore(damage) {
      this._score += damage;
    }
  }, {
    key: 'onEnemyKillScore',
    value: function onEnemyKillScore() {
      this._score += 20;
    }
  }, {
    key: 'onSurviveScore',
    value: function onSurviveScore() {
      this._score += 10;
    }

    /**
     * @return initial amount of the energy
     */

  }, {
    key: 'setThrottle',
    value: function setThrottle(v) {
      this._throttle = Math.min(1, Math.max(-1, v));
    }
  }, {
    key: 'setTurn',
    value: function setTurn(v) {
      this._turn = Math.min(1, Math.max(-1, v));
    }
  }, {
    key: 'setGunTurn',
    value: function setGunTurn(v) {
      this._gunTurn = Math.min(1, Math.max(-1, v));
    }
  }, {
    key: 'setRadarTurn',
    value: function setRadarTurn(v) {
      this._radarTurn = Math.min(1, Math.max(-1, v));
    }
  }, {
    key: 'setBoost',
    value: function setBoost(v) {
      this._hasBoost = v ? true : false;
    }
  }, {
    key: 'setDebugData',
    value: function setDebugData(v) {
      this._debugData = v;
    }
  }, {
    key: 'onWallHit',
    value: function onWallHit() {
      this._wallHit = true;
      this.onDamage(0.2);
    }
  }, {
    key: 'onEnemyHit',
    value: function onEnemyHit() {
      this._enemyHit = true;
      this.onDamage(0.2);
    }
  }, {
    key: 'onAllyHit',
    value: function onAllyHit() {
      this._allyHit = true;
      this.onDamage(0.2);
    }
  }, {
    key: 'onBeingRam',
    value: function onBeingRam(speed) {
      this._beingRammed = true;
      this.onDamage(0.1 + Math.round(speed * 8) * 0.1);
    }
  }, {
    key: 'onEnemySpot',
    value: function onEnemySpot(enemy) {
      this._enemySpot = enemy;
    }
  }, {
    key: 'onAllySpot',
    value: function onAllySpot(ally) {
      this._allySpot = ally;
    }
  }, {
    key: 'onBulletSpot',
    value: function onBulletSpot(bullet) {
      this._bulletsSpot.push(bullet);
    }
  }, {
    key: 'onWallSpot',
    value: function onWallSpot(distance) {
      this._wallDistance = distance;
    }
  }, {
    key: 'onTargetingAlarm',
    value: function onTargetingAlarm() {
      this._targetingAlarmTimer = 3;
    }
  }, {
    key: 'isAlly',
    value: function isAlly(tank) {
      if (!this._team) return false;
      if (!tank.team) return false;
      return this._team.name == tank.team.name;
    }

    /**
     * @return true if tank is on the radar of an enemy. Otherwise false
     */

  }, {
    key: 'onDamage',
    value: function onDamage(damage) {
      this._energy = Math.max(0, this._energy - damage);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(xPosition, yPosition) {
      this._x = xPosition;
      this._y = yPosition;
      this._lastX = xPosition;
      this._lastY = yPosition;
    }

    /**
     * @return debug data set by AI script via `control.DEBUG`
     */

  }, {
    key: 'handleShoot',
    value: function handleShoot() {
      var value = this._shootingPower;
      this._shootingPower = 0;
      return value;
    }
  }, {
    key: 'shoot',
    value: function shoot(value) {
      value = Math.max(0.1, Math.min(1, value));
      if (!this.isReloading) {
        this._gunTimer = Math.round(value * this._gunReloadTime);
        this._shootingPower = value;
      }
    }
  }, {
    key: 'randomize',
    value: function randomize(seed) {
      if (seed === undefined) {
        seed = new Date().getTime() + Math.round(Math.random() * 1000000);
      }
      var rng = (0, _seedrandom2.default)(seed);
      this._angle = Math.round(360 * rng()) - 180;
    }
  }, {
    key: 'init',
    value: function init(settings) {
      if (settings && settings.SKIN) {
        this._skin = settings.SKIN;
      }
    }
  }, {
    key: 'simulationStep',
    value: function simulationStep(collisionResolver) {
      var self = this;

      if (self._energy == 0) {
        return;
      }

      if (self._hasBoost && self._boost > 0) {
        self._boost--;
      }

      var oldX = self._x;
      var oldY = self._y;

      var maxSpeed = self._throttle * (self.hasBoost ? 4 : 2);
      var accelerationFactor = self.hasBoost ? 10 : 20;
      self._actualThrottle += (maxSpeed - self._actualThrottle) / accelerationFactor;

      var v = self._actualThrottle;
      var rotation = self._angle * (Math.PI / 180);
      self._x += v * Math.cos(rotation);
      self._y += v * Math.sin(rotation);
      self._wallHit = false;
      self._enemyHit = false;
      self._allyHit = false;
      var hitTest = !collisionResolver.checkTank(self);
      if (hitTest) {
        self._x = oldX;
        self._y = oldY;
        self._actualThrottle = 0;
      }
      if (this._beingRammed) {
        // must be done later because ramming is
        // reported after collisionResolver.checkTank(self)
        // it is detected when collisionResolver.checkTank
        // is called for attacing tank
        self._enemyHit = true;
        this._beingRammed = false;
      }

      self._angle += 2 * self._turn;
      self._radarAngle += 6 * self._radarTurn;
      self._gunAngle += 3 * self._gunTurn;

      self._angle = normalizeAngle(self._angle);
      self._radarAngle = normalizeAngle(self._radarAngle);
      self._gunAngle = normalizeAngle(self._gunAngle);
      collisionResolver.updateTank(self);

      self._enemySpot = null;
      self._allySpot = null;
      self._wallDistance = null;
      self._targetingAlarmTimer = Math.max(0, self._targetingAlarmTimer - 1);
      collisionResolver.scanTanks(self);
      collisionResolver.scanBullets(self);
      collisionResolver.scanWalls(self);

      if (self._gunTimer > 0) {
        self._gunTimer--;
      }

      var enemyData = null;
      var allyData = null;
      var bulletsData = [];
      while (self._bulletsSpot.length) {
        var bullet = self._bulletsSpot.shift();
        bulletsData.push({
          id: bullet.id,
          x: bullet.x,
          y: bullet.y,
          angle: bullet.angle,
          speed: bullet.speed,
          damage: bullet.damage
        });
      }

      if (self._enemySpot) {
        enemyData = {
          id: self._enemySpot.id,
          x: self._enemySpot.x,
          y: self._enemySpot.y,
          angle: self._enemySpot.angle,
          speed: self._enemySpot.speed,
          energy: self._enemySpot.energy
        };
      }
      if (self._allySpot) {
        allyData = {
          id: self._allySpot.id,
          x: self._allySpot.x,
          y: self._allySpot.y,
          angle: self._allySpot.angle,
          speed: self._allySpot.speed,
          energy: self._allySpot.energy
        };
      }

      var dx = self._x - self._lastX;
      var dy = self._y - self._lastY;
      self._speed = Math.sqrt(dx * dx + dy * dy);

      self._lastX = self._x;
      self._lastY = self._y;

      self._state = {
        x: self._x,
        y: self._y,
        angle: self._angle,
        energy: self._energy,
        boost: self._boost,
        collisions: {
          wall: self._wallHit,
          enemy: self._enemyHit,
          ally: self._allyHit
        },
        radar: {
          angle: self._radarAngle,
          targetingAlarm: self.targetingAlarm,
          wallDistance: self._wallDistance,
          enemy: enemyData,
          ally: allyData,
          bullets: bulletsData
        },
        gun: {
          angle: self._gunAngle,
          reloading: self.isReloading
        },
        radio: {
          inbox: self.team ? self.team.getMessages(self.id) : []
        }
      };
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
    /**
     * @return skin name applied to the tank
     */

  }, {
    key: 'skin',
    get: function get() {
      return this._skin;
    }

    /**
     * @return an object that represents current state of the tank
     */

  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }

    /**
     * @return amount of energy that the tank has
     */

  }, {
    key: 'energy',
    get: function get() {
      return this._energy;
    }

    /**
     * @return current score of the tank
     */

  }, {
    key: 'score',
    get: function get() {
      return this._score;
    }
  }, {
    key: 'maxEnergy',
    get: function get() {
      return this._maxEnergy;
    }

    /**
     * @return range of tank's radar
     */

  }, {
    key: 'radarRange',
    get: function get() {
      return this._radarRange;
    }

    /**
     * @return angle that radar field covers
     */

  }, {
    key: 'radarFocal',
    get: function get() {
      return this._radarFocal;
    }

    /**
     * @return name of the tank
     */

  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }

    /**
     * @return full name contains name of the tank and its unique ID
     */

  }, {
    key: 'fullName',
    get: function get() {
      return this._name + " #" + this._id;
    }

    /**
     * @return name of the team
     */

  }, {
    key: 'team',
    get: function get() {
      return this._team;
    }

    /**
     * @return x position of the tank
     */

  }, {
    key: 'x',
    get: function get() {
      return this._x;
    }

    /**
     * @return y position of the tank
     */

  }, {
    key: 'y',
    get: function get() {
      return this._y;
    }

    /**
     * @return linear speed of the tank
     */

  }, {
    key: 'speed',
    get: function get() {
      return this._speed;
    }
  }, {
    key: 'gunLength',
    get: function get() {
      return 25;
    }

    /**
     * @return rotation of tank's body
     */

  }, {
    key: 'angle',
    get: function get() {
      return this._angle;
    }

    /**
     * @return current throttle of the tank
     */

  }, {
    key: 'throttle',
    get: function get() {
      return this._throttle;
    }
    /**
     * @return true if tank has boost turned on. Otherwise false
     */

  }, {
    key: 'hasBoost',
    get: function get() {
      return this._hasBoost && this._boost > 0;
    }

    /**
     * @return amount of boost that has left
     */

  }, {
    key: 'boost',
    get: function get() {
      return this._boost;
    }

    /**
     * @return initial amount of boost
     */

  }, {
    key: 'maxBoost',
    get: function get() {
      return this._maxBoost;
    }

    /**
     * @return rotation of tank's gun (relative to tank's body)
     */

  }, {
    key: 'gunAngle',
    get: function get() {
      return this._gunAngle;
    }

    /**
     * @return rotation of tank's radar (relative to tank's body)
     */

  }, {
    key: 'radarAngle',
    get: function get() {
      return this._radarAngle;
    }
  }, {
    key: 'enemySpot',
    get: function get() {
      return this._enemySpot;
    }
  }, {
    key: 'allySpot',
    get: function get() {
      return this._allySpot;
    }
  }, {
    key: 'targetingAlarm',
    get: function get() {
      return this._targetingAlarmTimer > 0;
    }
  }, {
    key: 'debugData',
    get: function get() {
      return this._debugData;
    }
  }, {
    key: 'isShooting',
    get: function get() {
      return this._shootingPower > 0;
    }
  }, {
    key: 'shootingPower',
    get: function get() {
      return this._shootingPower;
    }
  }, {
    key: 'isReloading',
    get: function get() {
      return this._gunTimer > 0;
    }
  }]);

  return Tank;
}();

exports.default = Tank;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


(function (global, module, define) {

  function Alea(seed) {
    var me = this,
        mash = Mash();

    me.next = function () {
      var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
      me.s0 = me.s1;
      me.s1 = me.s2;
      return me.s2 = t - (me.c = t | 0);
    };

    // Apply the seeding algorithm from Baagoe.
    me.c = 1;
    me.s0 = mash(' ');
    me.s1 = mash(' ');
    me.s2 = mash(' ');
    me.s0 -= mash(seed);
    if (me.s0 < 0) {
      me.s0 += 1;
    }
    me.s1 -= mash(seed);
    if (me.s1 < 0) {
      me.s1 += 1;
    }
    me.s2 -= mash(seed);
    if (me.s2 < 0) {
      me.s2 += 1;
    }
    mash = null;
  }

  function copy(f, t) {
    t.c = f.c;
    t.s0 = f.s0;
    t.s1 = f.s1;
    t.s2 = f.s2;
    return t;
  }

  function impl(seed, opts) {
    var xg = new Alea(seed),
        state = opts && opts.state,
        prng = xg.next;
    prng.int32 = function () {
      return xg.next() * 0x100000000 | 0;
    };
    prng.double = function () {
      return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  function Mash() {
    var n = 0xefc8249d;

    var mash = function mash(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };

    return mash;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(3)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return impl;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.alea = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function (global, module, define) {

  function XorGen(seed) {
    var me = this,
        strseed = '';

    me.x = 0;
    me.y = 0;
    me.z = 0;
    me.w = 0;

    // Set up generator function.
    me.next = function () {
      var t = me.x ^ me.x << 11;
      me.x = me.y;
      me.y = me.z;
      me.z = me.w;
      return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
    };

    if (seed === (seed | 0)) {
      // Integer seed.
      me.x = seed;
    } else {
      // String seed.
      strseed += seed;
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (var k = 0; k < strseed.length + 64; k++) {
      me.x ^= strseed.charCodeAt(k) | 0;
      me.next();
    }
  }

  function copy(f, t) {
    t.x = f.x;
    t.y = f.y;
    t.z = f.z;
    t.w = f.w;
    return t;
  }

  function impl(seed, opts) {
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(3)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return impl;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xor128 = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function (global, module, define) {

  function XorGen(seed) {
    var me = this,
        strseed = '';

    // Set up generator function.
    me.next = function () {
      var t = me.x ^ me.x >>> 2;
      me.x = me.y;me.y = me.z;me.z = me.w;me.w = me.v;
      return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
    };

    me.x = 0;
    me.y = 0;
    me.z = 0;
    me.w = 0;
    me.v = 0;

    if (seed === (seed | 0)) {
      // Integer seed.
      me.x = seed;
    } else {
      // String seed.
      strseed += seed;
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (var k = 0; k < strseed.length + 64; k++) {
      me.x ^= strseed.charCodeAt(k) | 0;
      if (k == strseed.length) {
        me.d = me.x << 10 ^ me.x >>> 4;
      }
      me.next();
    }
  }

  function copy(f, t) {
    t.x = f.x;
    t.y = f.y;
    t.z = f.z;
    t.w = f.w;
    t.v = f.v;
    t.d = f.d;
    return t;
  }

  function impl(seed, opts) {
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(3)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return impl;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xorwow = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function (global, module, define) {

  function XorGen(seed) {
    var me = this;

    // Set up generator function.
    me.next = function () {
      // Update xor generator.
      var X = me.x,
          i = me.i,
          t,
          v,
          w;
      t = X[i];t ^= t >>> 7;v = t ^ t << 24;
      t = X[i + 1 & 7];v ^= t ^ t >>> 10;
      t = X[i + 3 & 7];v ^= t ^ t >>> 3;
      t = X[i + 4 & 7];v ^= t ^ t << 7;
      t = X[i + 7 & 7];t = t ^ t << 13;v ^= t ^ t << 9;
      X[i] = v;
      me.i = i + 1 & 7;
      return v;
    };

    function init(me, seed) {
      var j,
          w,
          X = [];

      if (seed === (seed | 0)) {
        // Seed state array using a 32-bit integer.
        w = X[0] = seed;
      } else {
        // Seed state using a string.
        seed = '' + seed;
        for (j = 0; j < seed.length; ++j) {
          X[j & 7] = X[j & 7] << 15 ^ seed.charCodeAt(j) + X[j + 1 & 7] << 13;
        }
      }
      // Enforce an array length of 8, not all zeroes.
      while (X.length < 8) {
        X.push(0);
      }for (j = 0; j < 8 && X[j] === 0; ++j) {}
      if (j == 8) w = X[7] = -1;else w = X[j];

      me.x = X;
      me.i = 0;

      // Discard an initial 256 values.
      for (j = 256; j > 0; --j) {
        me.next();
      }
    }

    init(me, seed);
  }

  function copy(f, t) {
    t.x = f.x.slice();
    t.i = f.i;
    return t;
  }

  function impl(seed, opts) {
    if (seed == null) seed = +new Date();
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if (state.x) copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(3)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return impl;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xorshift7 = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function (global, module, define) {

  function XorGen(seed) {
    var me = this;

    // Set up generator function.
    me.next = function () {
      var w = me.w,
          X = me.X,
          i = me.i,
          t,
          v;
      // Update Weyl generator.
      me.w = w = w + 0x61c88647 | 0;
      // Update xor generator.
      v = X[i + 34 & 127];
      t = X[i = i + 1 & 127];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      // Update Xor generator array state.
      v = X[i] = v ^ t;
      me.i = i;
      // Result is the combination.
      return v + (w ^ w >>> 16) | 0;
    };

    function init(me, seed) {
      var t,
          v,
          i,
          j,
          w,
          X = [],
          limit = 128;
      if (seed === (seed | 0)) {
        // Numeric seeds initialize v, which is used to generates X.
        v = seed;
        seed = null;
      } else {
        // String seeds are mixed into v and X one character at a time.
        seed = seed + '\0';
        v = 0;
        limit = Math.max(limit, seed.length);
      }
      // Initialize circular array and weyl value.
      for (i = 0, j = -32; j < limit; ++j) {
        // Put the unicode characters into the array, and shuffle them.
        if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
        // After 32 shuffles, take v as the starting w value.
        if (j === 0) w = v;
        v ^= v << 10;
        v ^= v >>> 15;
        v ^= v << 4;
        v ^= v >>> 13;
        if (j >= 0) {
          w = w + 0x61c88647 | 0; // Weyl.
          t = X[j & 127] ^= v + w; // Combine xor and weyl to init array.
          i = 0 == t ? i + 1 : 0; // Count zeroes.
        }
      }
      // We have detected all zeroes; make the key nonzero.
      if (i >= 128) {
        X[(seed && seed.length || 0) & 127] = -1;
      }
      // Run the generator 512 times to further mix the state before using it.
      // Factoring this as a function slows the main generator, so it is just
      // unrolled here.  The weyl generator is not advanced while warming up.
      i = 127;
      for (j = 4 * 128; j > 0; --j) {
        v = X[i + 34 & 127];
        t = X[i = i + 1 & 127];
        v ^= v << 13;
        t ^= t << 17;
        v ^= v >>> 15;
        t ^= t >>> 12;
        X[i] = v ^ t;
      }
      // Storing state as object members is faster than using closure variables.
      me.w = w;
      me.X = X;
      me.i = i;
    }

    init(me, seed);
  }

  function copy(f, t) {
    t.i = f.i;
    t.w = f.w;
    t.X = f.X.slice();
    return t;
  };

  function impl(seed, opts) {
    if (seed == null) seed = +new Date();
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if (state.X) copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(3)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return impl;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xor4096 = impl;
  }
})(undefined, // window object or global
( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function (global, module, define) {

  function XorGen(seed) {
    var me = this,
        strseed = '';

    // Set up generator function.
    me.next = function () {
      var b = me.b,
          c = me.c,
          d = me.d,
          a = me.a;
      b = b << 25 ^ b >>> 7 ^ c;
      c = c - d | 0;
      d = d << 24 ^ d >>> 8 ^ a;
      a = a - b | 0;
      me.b = b = b << 20 ^ b >>> 12 ^ c;
      me.c = c = c - d | 0;
      me.d = d << 16 ^ c >>> 16 ^ a;
      return me.a = a - b | 0;
    };

    /* The following is non-inverted tyche, which has better internal
     * bit diffusion, but which is about 25% slower than tyche-i in JS.
    me.next = function() {
      var a = me.a, b = me.b, c = me.c, d = me.d;
      a = (me.a + me.b | 0) >>> 0;
      d = me.d ^ a; d = d << 16 ^ d >>> 16;
      c = me.c + d | 0;
      b = me.b ^ c; b = b << 12 ^ d >>> 20;
      me.a = a = a + b | 0;
      d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
      me.c = c = c + d | 0;
      b = b ^ c;
      return me.b = (b << 7 ^ b >>> 25);
    }
    */

    me.a = 0;
    me.b = 0;
    me.c = 2654435769 | 0;
    me.d = 1367130551;

    if (seed === Math.floor(seed)) {
      // Integer seed.
      me.a = seed / 0x100000000 | 0;
      me.b = seed | 0;
    } else {
      // String seed.
      strseed += seed;
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (var k = 0; k < strseed.length + 20; k++) {
      me.b ^= strseed.charCodeAt(k) | 0;
      me.next();
    }
  }

  function copy(f, t) {
    t.a = f.a;
    t.b = f.b;
    t.c = f.c;
    t.d = f.d;
    return t;
  };

  function impl(seed, opts) {
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(3)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return impl;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.tychei = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
  //
  // The following constants are related to IEEE 754 limits.
  //

  // Detect the global object, even if operating in strict mode.
  // http://stackoverflow.com/a/14387057/265298
  var global = (0, eval)('this'),
      width = 256,
      // each RC4 output is 0 <= x < 256
  chunks = 6,
      // at least six RC4 outputs for each double
  digits = 52,
      // there are 52 significant digits in a double
  rngname = 'random',
      // rngname: name for Math.random and Math.seedrandom
  startdenom = math.pow(width, chunks),
      significance = math.pow(2, digits),
      overflow = significance * 2,
      mask = width - 1,
      nodecrypto; // node.js crypto module, initialized at the bottom.

  //
  // seedrandom()
  // This is the seedrandom function described above.
  //
  function seedrandom(seed, options, callback) {
    var key = [];
    options = options == true ? { entropy: true } : options || {};

    // Flatten the seed string or build one from local entropy if needed.
    var shortseed = mixkey(flatten(options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed, 3), key);

    // Use the seed to initialize an ARC4 generator.
    var arc4 = new ARC4(key);

    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.
    var prng = function prng() {
      var n = arc4.g(chunks),
          // Start with a numerator n < 2 ^ 48
      d = startdenom,
          //   and denominator d = 2 ^ 48.
      x = 0; //   and no 'extra last byte'.
      while (n < significance) {
        // Fill up all significant digits by
        n = (n + x) * width; //   shifting numerator and
        d *= width; //   denominator and generating a
        x = arc4.g(1); //   new least-significant-byte.
      }
      while (n >= overflow) {
        // To avoid rounding up, before adding
        n /= 2; //   last byte, shift everything
        d /= 2; //   right using integer math until
        x >>>= 1; //   we have exactly the desired bits.
      }
      return (n + x) / d; // Form the number within [0, 1).
    };

    prng.int32 = function () {
      return arc4.g(4) | 0;
    };
    prng.quick = function () {
      return arc4.g(4) / 0x100000000;
    };
    prng.double = prng;

    // Mix the randomness into accumulated entropy.
    mixkey(tostring(arc4.S), pool);

    // Calling convention: what to return as a function of prng, seed, is_math.
    return (options.pass || callback || function (prng, seed, is_math_call, state) {
      if (state) {
        // Load the arc4 state from the given state if it has an S array.
        if (state.S) {
          copy(state, arc4);
        }
        // Only provide the .state method if requested via options.state.
        prng.state = function () {
          return copy(arc4, {});
        };
      }

      // If called as a method of Math (Math.seedrandom()), mutate
      // Math.random because that is how seedrandom.js has worked since v1.0.
      if (is_math_call) {
        math[rngname] = prng;return seed;
      }

      // Otherwise, it is a newer calling convention, so return the
      // prng directly.
      else return prng;
    })(prng, shortseed, 'global' in options ? options.global : this == math, options.state);
  }
  math['seed' + rngname] = seedrandom;

  //
  // ARC4
  //
  // An ARC4 implementation.  The constructor takes a key in the form of
  // an array of at most (width) integers that should be 0 <= x < (width).
  //
  // The g(count) method returns a pseudorandom integer that concatenates
  // the next (count) outputs from ARC4.  Its return value is a number x
  // that is in the range 0 <= x < (width ^ count).
  //
  function ARC4(key) {
    var t,
        keylen = key.length,
        me = this,
        i = 0,
        j = me.i = me.j = 0,
        s = me.S = [];

    // The empty key [] is treated as [0].
    if (!keylen) {
      key = [keylen++];
    }

    // Set up S using the standard key scheduling algorithm.
    while (i < width) {
      s[i] = i++;
    }
    for (i = 0; i < width; i++) {
      s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
      s[j] = t;
    }

    // The "g" method returns the next (count) outputs as one number.
    (me.g = function (count) {
      // Using instance members instead of closure state nearly doubles speed.
      var t,
          r = 0,
          i = me.i,
          j = me.j,
          s = me.S;
      while (count--) {
        t = s[i = mask & i + 1];
        r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
      }
      me.i = i;me.j = j;
      return r;
      // For robust unpredictability, the function call below automatically
      // discards an initial batch of values.  This is called RC4-drop[256].
      // See http://google.com/search?q=rsa+fluhrer+response&btnI
    })(width);
  }

  //
  // copy()
  // Copies internal state of ARC4 to or from a plain object.
  //
  function copy(f, t) {
    t.i = f.i;
    t.j = f.j;
    t.S = f.S.slice();
    return t;
  };

  //
  // flatten()
  // Converts an object tree to nested arrays of strings.
  //
  function flatten(obj, depth) {
    var result = [],
        typ = typeof obj === 'undefined' ? 'undefined' : _typeof(obj),
        prop;
    if (depth && typ == 'object') {
      for (prop in obj) {
        try {
          result.push(flatten(obj[prop], depth - 1));
        } catch (e) {}
      }
    }
    return result.length ? result : typ == 'string' ? obj : obj + '\0';
  }

  //
  // mixkey()
  // Mixes a string seed into a key that is an array of integers, and
  // returns a shortened string seed that is equivalent to the result key.
  //
  function mixkey(seed, key) {
    var stringseed = seed + '',
        smear,
        j = 0;
    while (j < stringseed.length) {
      key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
    }
    return tostring(key);
  }

  //
  // autoseed()
  // Returns an object for autoseeding, using window.crypto and Node crypto
  // module if available.
  //
  function autoseed() {
    try {
      var out;
      if (nodecrypto && (out = nodecrypto.randomBytes)) {
        // The use of 'out' to remember randomBytes makes tight minified code.
        out = out(width);
      } else {
        out = new Uint8Array(width);
        (global.crypto || global.msCrypto).getRandomValues(out);
      }
      return tostring(out);
    } catch (e) {
      var browser = global.navigator,
          plugins = browser && browser.plugins;
      return [+new Date(), global, plugins, global.screen, tostring(pool)];
    }
  }

  //
  // tostring()
  // Converts an array of charcodes to a string
  //
  function tostring(a) {
    return String.fromCharCode.apply(0, a);
  }

  //
  // When seedrandom.js is loaded, we immediately mix a few bits
  // from the built-in RNG into the entropy pool.  Because we do
  // not want to interfere with deterministic PRNG state later,
  // seedrandom will not call math.random on its own again after
  // initialization.
  //
  mixkey(math.random(), pool);

  //
  // Nodejs and AMD support: export the implementation as a module using
  // either convention.
  //
  if (( false ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    module.exports = seedrandom;
    // When in node.js, try using crypto package for autoseeding.
    try {
      nodecrypto = __webpack_require__(33);
    } catch (ex) {}
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return seedrandom;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  // End anonymous scope, and pass initial values.
})([], // pool: entropy pool starts empty
Math // math: package containing random, pow, and seedrandom
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Team = function () {
  function Team(name) {
    _classCallCheck(this, Team);

    this._name = name;
    this._members = [];
    this._inboxMap = [];
    this._outboxMap = [];
  }

  _createClass(Team, [{
    key: "addTank",
    value: function addTank(tank) {
      if (tank.team) throw "Tank " + tank.fullName + " is already assigned to team " + tank.team.name;
      for (var i in this._members) {
        if (this._members[i].id == tank.id) return;
      }
      this._members.push(tank);
      tank._team = this;
      this._inboxMap[tank.id] = [];
      this._outboxMap[tank.id] = [];
    }
  }, {
    key: "getMessages",
    value: function getMessages(receiverId) {
      return this._outboxMap[receiverId];
    }
  }, {
    key: "sendMessages",
    value: function sendMessages(senderId, messages) {
      for (var i in this._inboxMap) {
        if (i == senderId) continue;
        this._inboxMap[i] = this._inboxMap[i].concat(messages);
      }
    }
  }, {
    key: "processMessages",
    value: function processMessages() {
      var i = void 0;
      for (i in this._inboxMap) {
        this._outboxMap[i] = this._inboxMap[i];
        this._inboxMap[i] = [];
      }
    }
  }, {
    key: "size",
    get: function get() {
      return this._members.length;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "aliveCount",
    get: function get() {
      var count = 0;
      for (var i = 0; i < this._members.length; i++) {
        if (this._members[i].energy > 0) {
          count++;
        }
      }
      return count;
    }
  }, {
    key: "score",
    get: function get() {
      var sum = 0;
      for (var i = 0; i < this._members.length; i++) {
        sum += this._members[i].score;
      }
      return sum;
    }
  }, {
    key: "energy",
    get: function get() {
      var sum = 0;
      for (var i = 0; i < this._members.length; i++) {
        sum += this._members[i].energy;
      }
      return sum;
    }
  }, {
    key: "maxEnergy",
    get: function get() {
      var sum = 0;
      for (var i = 0; i < this._members.length; i++) {
        sum += this._members[i].maxEnergy;
      }
      return sum;
    }
  }, {
    key: "isAlive",
    get: function get() {
      return this.aliveCount > 0;
    }
  }, {
    key: "members",
    get: function get() {
      return this._members;
    }
  }]);

  return Team;
}();

exports.default = Team;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(owner, id, power) {
    _classCallCheck(this, Bullet);

    this._id = id;
    this._owner = owner;
    this._angle = owner.angle + owner.gunAngle;
    while (this._angle > 180) {
      this._angle -= 360;
    }while (this._angle < -180) {
      this._angle += 360;
    }this._x = owner.x + owner.gunLength * Math.cos(this._angle * (Math.PI / 180));
    this._y = owner.y + owner.gunLength * Math.sin(this._angle * (Math.PI / 180));
    this._speed = 4;
    this._power = power;
    this._damage = Math.round(1000 * power + 300 * power * power) * 0.01;
    this._exploded = false;
  }

  _createClass(Bullet, [{
    key: 'onWallHit',
    value: function onWallHit() {
      this._exploded = true;
    }
  }, {
    key: 'onEnemyHit',
    value: function onEnemyHit(enemy) {
      this._exploded = true;
      enemy.onDamage(this._damage);
    }
  }, {
    key: 'simulationStep',
    value: function simulationStep() {
      this._x += this._speed * Math.cos(this._angle * (Math.PI / 180));
      this._y += this._speed * Math.sin(this._angle * (Math.PI / 180));
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'x',
    get: function get() {
      return this._x;
    }
  }, {
    key: 'y',
    get: function get() {
      return this._y;
    }
  }, {
    key: 'angle',
    get: function get() {
      return this._angle;
    }
  }, {
    key: 'speed',
    get: function get() {
      return this._speed;
    }
  }, {
    key: 'damage',
    get: function get() {
      return this._damage;
    }
  }, {
    key: 'power',
    get: function get() {
      return this._power;
    }
  }, {
    key: 'owner',
    get: function get() {
      return this._owner;
    }
  }, {
    key: 'exploded',
    get: function get() {
      return this._exploded;
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _seedrandom = __webpack_require__(6);

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Battlefield = function () {
  function Battlefield(width, height) {
    _classCallCheck(this, Battlefield);

    this._width = null;
    this._height = null;
    this._startSlotList = [];
    this._offsetX = 0;
    this._offsetY = 0;
  }

  _createClass(Battlefield, [{
    key: "setSize",
    value: function setSize(width, height) {
      this._width = width - this.margin * 2;
      this._height = height - this.margin * 2;
    }
  }, {
    key: "randomize",
    value: function randomize(seed) {
      // remember to call it after setSize !!!
      if (seed === undefined) {
        seed = new Date().getTime() + Math.round(Math.random() * 1000000);
      }
      var rng = (0, _seedrandom2.default)(seed);

      this._offsetX = Math.round(rng() * 10000 - 5000);
      this._offsetY = Math.round(rng() * 10000 - 5000);

      // generate list of start slots
      this._startSlotList = [];
      var slotSize = 90;
      for (var x = this.minX + slotSize; x < this.maxX - slotSize; x += slotSize) {
        for (var y = this.minY + slotSize; y < this.maxY - slotSize; y += slotSize) {
          this._startSlotList.push({ x: x, y: y });
        }
      }
      // shuffle start slots
      var currentIndex = this._startSlotList.length,
          temporaryValue = void 0,
          randomIndex = void 0;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(rng() * currentIndex);
        currentIndex -= 1;
        temporaryValue = this._startSlotList[currentIndex];
        this._startSlotList[currentIndex] = this._startSlotList[randomIndex];
        this._startSlotList[randomIndex] = temporaryValue;
      }
    }
  }, {
    key: "getStartSlot",
    value: function getStartSlot() {
      if (this._startSlotList.length) {
        return this._startSlotList.pop();
      }
      return null;
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
  }, {
    key: "margin",
    get: function get() {
      return 25;
    }
  }, {
    key: "minX",
    get: function get() {
      return this._offsetX + this.margin;
    }
  }, {
    key: "minY",
    get: function get() {
      return this._offsetY + this.margin;
    }
  }, {
    key: "maxX",
    get: function get() {
      return this._offsetX + this._width + this.margin;
    }
  }, {
    key: "maxY",
    get: function get() {
      return this._offsetY + this._height + this.margin;
    }
  }, {
    key: "offsetX",
    get: function get() {
      return this._offsetX;
    }
  }, {
    key: "offsetY",
    get: function get() {
      return this._offsetY;
    }
  }]);

  return Battlefield;
}();

exports.default = Battlefield;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventStore = function () {
  function EventStore() {
    _classCallCheck(this, EventStore);

    this._data = [];
  }

  _createClass(EventStore, [{
    key: 'add',
    value: function add(index, event) {
      if (!this._data[index]) {
        this._data[index] = [];
      }
      this._data[index].push(event);
    }
  }, {
    key: 'get',
    value: function get(index) {
      if (!this._data[index]) {
        this._data[index] = [];
      }
      return this._data[index];
    }
  }, {
    key: 'clear',
    value: function clear(index) {
      this._data = [];
    }
  }]);

  return EventStore;
}();

exports.default = EventStore;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sat = __webpack_require__(39);

var _sat2 = _interopRequireDefault(_sat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollisionResolver = function () {
  function CollisionResolver() {
    _classCallCheck(this, CollisionResolver);

    this._wallList = [];
    this._tankMap = [];
    this._bulletMap = [];
    this._radarBeamMap = [];
    this._battlefield = null;
  }

  _createClass(CollisionResolver, [{
    key: 'updateBattlefield',
    value: function updateBattlefield(battlefield) {
      this._battlefield = {
        minX: battlefield.minX,
        minY: battlefield.minY,
        maxX: battlefield.maxX,
        maxY: battlefield.maxY
      };
      var wall = void 0;
      wall = new _sat2.default.Box(new _sat2.default.Vector(battlefield.minX - 10, battlefield.minY), 10, battlefield.height).toPolygon();
      this._wallList.push(wall);
      wall = new _sat2.default.Box(new _sat2.default.Vector(battlefield.minX, battlefield.minY - 10), battlefield.width, 10).toPolygon();
      this._wallList.push(wall);
      wall = new _sat2.default.Box(new _sat2.default.Vector(battlefield.maxX, battlefield.minY), 10, battlefield.height).toPolygon();
      this._wallList.push(wall);
      wall = new _sat2.default.Box(new _sat2.default.Vector(battlefield.minX, battlefield.maxY), battlefield.width, 10).toPolygon();
      this._wallList.push(wall);
    }
  }, {
    key: 'updateTank',
    value: function updateTank(tank) {
      var tankShape = this._getTankShape(tank);
      tankShape.pos.x = tank.x;
      tankShape.pos.y = tank.y;
    }
  }, {
    key: 'removeBullet',
    value: function removeBullet(bullet) {
      this._bulletMap[bullet.id] = null;
    }
  }, {
    key: 'removeTank',
    value: function removeTank(tank) {
      this._tankMap[tank.id] = null;
      this._radarBeamMap[tank.id] = null;
    }
  }, {
    key: 'hitTestBullet',
    value: function hitTestBullet(bullet) {
      var bulletShape = this._getBulletShape(bullet);
      var tankShape = bullet.owner.energy ? this._getTankShape(bullet.owner) : null;

      bulletShape.pos.x = bullet.x;
      bulletShape.pos.y = bullet.y;

      var i = void 0;
      var hitTest = void 0;
      var wall = void 0;
      for (i in this._wallList) {
        wall = this._wallList[i];
        hitTest = _sat2.default.testCirclePolygon(bulletShape, wall);
        if (hitTest) {
          bullet.onWallHit();
          return true;
        }
      }
      var enemyShape = void 0;
      for (i in this._tankMap) {
        enemyShape = this._tankMap[i];
        if (!enemyShape) continue;
        if (enemyShape == tankShape) {
          continue;
        }
        hitTest = _sat2.default.testCircleCircle(bulletShape, enemyShape);
        if (hitTest) {
          var energyBefore = enemyShape.tank.energy;
          bullet.onEnemyHit(enemyShape.tank);
          var areAllies = bullet.owner.isAlly(enemyShape.tank);
          if (!areAllies) {
            bullet.owner.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
          }
          if (enemyShape.tank.energy == 0) {
            bullet.owner.onEnemyKillScore();
          }
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'checkTank',
    value: function checkTank(tank) {
      var tankShape = this._getTankShape(tank);

      tankShape.pos.x = tank.x;
      tankShape.pos.y = tank.y;

      var i = void 0;
      var hitTest = void 0;
      var wall = void 0;
      for (i in this._wallList) {
        wall = this._wallList[i];
        hitTest = _sat2.default.testCirclePolygon(tankShape, wall);
        if (hitTest) {
          tank.onWallHit();
          return false;
        }
      }
      var enemyShape = void 0;
      for (i in this._tankMap) {
        enemyShape = this._tankMap[i];
        if (!enemyShape) continue;
        if (enemyShape == tankShape) {
          continue;
        }
        hitTest = _sat2.default.testCircleCircle(tankShape, enemyShape);
        var areAllies = tank.isAlly(enemyShape.tank);
        if (hitTest) {
          if (!areAllies) {
            var energyBefore = enemyShape.tank.energy;
            tank.onEnemyHit();
            enemyShape.tank.onBeingRam(tank.speed);
            tank.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
            return false;
          } else {
            tank.onAllyHit();
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'scanTanks',
    value: function scanTanks(tank) {
      var radarBeamShape = this._getRadarBeamShape(tank);
      var tankShape = this._getTankShape(tank);
      radarBeamShape.setAngle((tank.angle + tank.radarAngle) * Math.PI / 180);
      radarBeamShape.pos.x = tank.x;
      radarBeamShape.pos.y = tank.y;

      var i = void 0;
      var enemyShape = void 0;
      var hitTest = void 0;
      var enemies = [];

      for (i in this._tankMap) {
        enemyShape = this._tankMap[i];
        if (!enemyShape) continue;
        if (enemyShape == tankShape) {
          continue;
        }
        hitTest = _sat2.default.testPolygonCircle(radarBeamShape, enemyShape);
        if (hitTest) {
          enemies.push(enemyShape.tank);
        }
      }
      if (enemies.length == 0) {
        return false;
      }
      var closestEnemy = null;
      var closestEnemyDistance = tank.radarRange;
      var closestAlly = null;
      var closestAllyDistance = tank.radarRange;
      var d = void 0,
          dx = void 0,
          dy = void 0,
          ally = void 0;
      for (i in enemies) {
        dx = enemies[i].x - tank.x;
        dy = enemies[i].y - tank.y;
        d = Math.sqrt(dx * dx + dy * dy);
        ally = enemies[i].isAlly(tank);
        if (!ally && (!closestEnemy || d < closestEnemyDistance)) {
          closestEnemy = enemies[i];
          closestEnemyDistance = d;
        } else if (ally && (!closestAlly || d < closestAllyDistance)) {
          closestAlly = enemies[i];
          closestAllyDistance = d;
        }
      }
      if (closestAlly) {
        tank.onAllySpot(closestAlly);
      }
      if (closestEnemy) {
        tank.onEnemySpot(closestEnemy);
        closestEnemy.onTargetingAlarm();
      }

      return true;
    }
  }, {
    key: 'scanBullets',
    value: function scanBullets(tank) {
      var radarBeamShape = this._getRadarBeamShape(tank);
      radarBeamShape.setAngle((tank.angle + tank.radarAngle) * Math.PI / 180);
      radarBeamShape.pos.x = tank.x;
      radarBeamShape.pos.y = tank.y;

      var i = void 0;
      var hitTest = void 0;
      var bulletShape = void 0;
      var spottedBullets = false;

      for (i in this._bulletMap) {
        bulletShape = this._bulletMap[i];
        if (!bulletShape) continue;
        if (bulletShape.bullet.owner == tank) continue;
        hitTest = _sat2.default.testCirclePolygon(bulletShape, radarBeamShape);
        if (hitTest) {
          tank.onBulletSpot(bulletShape.bullet);
          spottedBullets = true;
        }
      }

      return spottedBullets;
    }
  }, {
    key: 'scanWalls',
    value: function scanWalls(tank) {
      var distance = this._getWallDistance(tank);
      if (distance < tank.radarRange) {
        tank.onWallSpot(distance);
        return true;
      }
      return false;
    }
  }, {
    key: '_getWallDistance',
    value: function _getWallDistance(tank) {
      var angle = tank.angle + tank.radarAngle;
      while (angle > 180) {
        angle -= 360;
      }while (angle < -180) {
        angle += 360;
      }var distanceNorth = tank.y - this._battlefield.minY;
      var distanceSouth = this._battlefield.maxY - tank.y;
      var distanceWest = tank.x - this._battlefield.minX;
      var distanceEast = this._battlefield.maxX - tank.x;

      if (angle == -180 || angle == 180) {
        // W
        return distanceWest;
      } else if (angle == 0) {
        // E
        return distanceEast;
      } else if (angle == -90) {
        // N
        return distanceNorth;
      } else if (angle == 90) {
        // S
        return distanceSouth;
      }

      var d1 = void 0,
          d2 = void 0;

      if (angle > -180 && angle < -90) {
        // NW
        d1 = distanceWest / Math.cos((angle + 180) * (Math.PI / 180));
        d2 = distanceNorth / Math.sin((angle + 180) * (Math.PI / 180));
      } else if (angle > -90 && angle < 0) {
        // NE
        d1 = distanceEast / Math.cos(-angle * (Math.PI / 180));
        d2 = distanceNorth / Math.sin(-angle * (Math.PI / 180));
      } else if (angle > 0 && angle < 90) {
        // SE
        d1 = distanceEast / Math.cos(angle * (Math.PI / 180));
        d2 = distanceSouth / Math.sin(angle * (Math.PI / 180));
      } else {
        // SW
        d1 = distanceWest / Math.cos((180 - angle) * (Math.PI / 180));
        d2 = distanceSouth / Math.sin((180 - angle) * (Math.PI / 180));
      }

      return Math.min(d1, d2);
    }
  }, {
    key: '_getTankShape',
    value: function _getTankShape(tank) {
      if (!this._tankMap[tank.id]) {
        if (tank.energy == 0) {
          throw "Cannot create shape for destroyed tank";
        }
        var shape = new _sat2.default.Circle(new _sat2.default.Vector(tank.x, tank.y), 18);
        this._tankMap[tank.id] = shape;
        shape.tank = tank;
      }
      return this._tankMap[tank.id];
    }
  }, {
    key: '_getBulletShape',
    value: function _getBulletShape(bullet) {
      if (!this._bulletMap[bullet.id]) {
        if (bullet.exploded) {
          throw "Cannot create shape for exploded bullet";
        }
        var shape = new _sat2.default.Circle(new _sat2.default.Vector(bullet.x, bullet.y), 3);
        this._bulletMap[bullet.id] = shape;
        shape.bullet = bullet;
      }
      return this._bulletMap[bullet.id];
    }
  }, {
    key: '_getRadarBeamShape',
    value: function _getRadarBeamShape(tank) {
      if (!this._radarBeamMap[tank.id]) {
        if (tank.energy == 0) {
          throw "Cannot create radar beam shape for destroyed tank";
        }
        var width = tank.radarRange * Math.tan(tank.radarFocal * (Math.PI / 180)) / 2;
        var shape = new _sat2.default.Polygon(new _sat2.default.Vector(tank.x, tank.y), [new _sat2.default.Vector(0, 3), new _sat2.default.Vector(0, -3), new _sat2.default.Vector(tank.radarRange, -width), new _sat2.default.Vector(tank.radarRange, width)]);

        this._radarBeamMap[tank.id] = shape;
        shape.tank = tank;
      }
      return this._radarBeamMap[tank.id];
    }
  }]);

  return CollisionResolver;
}();

exports.default = CollisionResolver;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Version 0.7.1 - Copyright 2012 - 2018 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.7.1 - Copyright 2012 - 2018 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

/*global define: false, module: false*/
/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true,
  eqeqeq:true, bitwise:true, strict:true, undef:true,
  curly:true, browser:true */

// Create a UMD wrapper for SAT. Works in:
//
//  - Plain browser via global SAT variable
//  - AMD loader (like require.js)
//  - Node.js
//
// The quoted properties all over the place are used so that the Closure Compiler
// does not mangle the exposed API in advanced mode.
/**
 * @param {*} root - The global scope
 * @param {Function} factory - Factory that creates SAT module
 */
(function (root, factory) {
  "use strict";

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module['exports'] = factory();
  } else {
    root['SAT'] = factory();
  }
})(undefined, function () {
  "use strict";

  var SAT = {};

  //
  // ## Vector
  //
  // Represents a vector in two dimensions with `x` and `y` properties.


  // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
  // a coordinate is not specified, it will be set to `0`
  /**
   * @param {?number=} x The x position.
   * @param {?number=} y The y position.
   * @constructor
   */
  function Vector(x, y) {
    this['x'] = x || 0;
    this['y'] = y || 0;
  }
  SAT['Vector'] = Vector;
  // Alias `Vector` as `V`
  SAT['V'] = Vector;

  // Copy the values of another Vector into this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['copy'] = Vector.prototype.copy = function (other) {
    this['x'] = other['x'];
    this['y'] = other['y'];
    return this;
  };

  // Create a new vector with the same coordinates as this on.
  /**
   * @return {Vector} The new cloned vector
   */
  Vector.prototype['clone'] = Vector.prototype.clone = function () {
    return new Vector(this['x'], this['y']);
  };

  // Change this vector to be perpendicular to what it was before. (Effectively
  // roatates it 90 degrees in a clockwise direction)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['perp'] = Vector.prototype.perp = function () {
    var x = this['x'];
    this['x'] = this['y'];
    this['y'] = -x;
    return this;
  };

  // Rotate this vector (counter-clockwise) by the specified angle (in radians).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Vector} This for chaining.
   */
  Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
    var x = this['x'];
    var y = this['y'];
    this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
    this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
    return this;
  };

  // Reverse this vector.
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reverse'] = Vector.prototype.reverse = function () {
    this['x'] = -this['x'];
    this['y'] = -this['y'];
    return this;
  };

  // Normalize this vector.  (make it have length of `1`)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['normalize'] = Vector.prototype.normalize = function () {
    var d = this.len();
    if (d > 0) {
      this['x'] = this['x'] / d;
      this['y'] = this['y'] / d;
    }
    return this;
  };

  // Add another vector to this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['add'] = Vector.prototype.add = function (other) {
    this['x'] += other['x'];
    this['y'] += other['y'];
    return this;
  };

  // Subtract another vector from this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaiing.
   */
  Vector.prototype['sub'] = Vector.prototype.sub = function (other) {
    this['x'] -= other['x'];
    this['y'] -= other['y'];
    return this;
  };

  // Scale this vector. An independant scaling factor can be provided
  // for each axis, or a single scaling factor that will scale both `x` and `y`.
  /**
   * @param {number} x The scaling factor in the x direction.
   * @param {?number=} y The scaling factor in the y direction.  If this
   *   is not specified, the x scaling factor will be used.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['scale'] = Vector.prototype.scale = function (x, y) {
    this['x'] *= x;
    this['y'] *= typeof y != 'undefined' ? y : x;
    return this;
  };

  // Project this vector on to another vector.
  /**
   * @param {Vector} other The vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['project'] = Vector.prototype.project = function (other) {
    var amt = this.dot(other) / other.len2();
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };

  // Project this vector onto a vector of unit length. This is slightly more efficient
  // than `project` when dealing with unit vectors.
  /**
   * @param {Vector} other The unit vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['projectN'] = Vector.prototype.projectN = function (other) {
    var amt = this.dot(other);
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };

  // Reflect this vector on an arbitrary axis.
  /**
   * @param {Vector} axis The vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflect'] = Vector.prototype.reflect = function (axis) {
    var x = this['x'];
    var y = this['y'];
    this.project(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };

  // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
  // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
  /**
   * @param {Vector} axis The unit vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflectN'] = Vector.prototype.reflectN = function (axis) {
    var x = this['x'];
    var y = this['y'];
    this.projectN(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };

  // Get the dot product of this vector and another.
  /**
   * @param {Vector}  other The vector to dot this one against.
   * @return {number} The dot product.
   */
  Vector.prototype['dot'] = Vector.prototype.dot = function (other) {
    return this['x'] * other['x'] + this['y'] * other['y'];
  };

  // Get the squared length of this vector.
  /**
   * @return {number} The length^2 of this vector.
   */
  Vector.prototype['len2'] = Vector.prototype.len2 = function () {
    return this.dot(this);
  };

  // Get the length of this vector.
  /**
   * @return {number} The length of this vector.
   */
  Vector.prototype['len'] = Vector.prototype.len = function () {
    return Math.sqrt(this.len2());
  };

  // ## Circle
  //
  // Represents a circle with a position and a radius.

  // Create a new circle, optionally passing in a position and/or radius. If no position
  // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
  // have a radius of `0`.
  /**
   * @param {Vector=} pos A vector representing the position of the center of the circle
   * @param {?number=} r The radius of the circle
   * @constructor
   */
  function Circle(pos, r) {
    this['pos'] = pos || new Vector();
    this['r'] = r || 0;
  }
  SAT['Circle'] = Circle;

  // Compute the axis-aligned bounding box (AABB) of this Circle.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Circle.prototype['getAABB'] = Circle.prototype.getAABB = function () {
    var r = this['r'];
    var corner = this["pos"].clone().sub(new Vector(r, r));
    return new Box(corner, r * 2, r * 2).toPolygon();
  };

  // ## Polygon
  //
  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
  //
  // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
  // provided setters. Otherwise the calculated properties will not be updated correctly.
  //
  // `pos` can be changed directly.

  // Create a new polygon, passing in a position vector, and an array of points (represented
  // by vectors relative to the position vector). If no position is passed in, the position
  // of the polygon will be `(0,0)`.
  /**
   * @param {Vector=} pos A vector representing the origin of the polygon. (all other
   *   points are relative to this one)
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @constructor
   */
  function Polygon(pos, points) {
    this['pos'] = pos || new Vector();
    this['angle'] = 0;
    this['offset'] = new Vector();
    this.setPoints(points || []);
  }
  SAT['Polygon'] = Polygon;

  // Set the points of the polygon.
  //
  // Note: The points are counter-clockwise *with respect to the coordinate system*.
  // If you directly draw the points on a screen that has the origin at the top-left corner
  // it will _appear_ visually that the points are being specified clockwise. This is just
  // because of the inversion of the Y-axis when being displayed.
  /**
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setPoints'] = Polygon.prototype.setPoints = function (points) {
    // Only re-allocate if this is a new polygon or the number of points has changed.
    var lengthChanged = !this['points'] || this['points'].length !== points.length;
    if (lengthChanged) {
      var i;
      var calcPoints = this['calcPoints'] = [];
      var edges = this['edges'] = [];
      var normals = this['normals'] = [];
      // Allocate the vector arrays for the calculated properties
      for (i = 0; i < points.length; i++) {
        calcPoints.push(new Vector());
        edges.push(new Vector());
        normals.push(new Vector());
      }
    }
    this['points'] = points;
    this._recalc();
    return this;
  };

  // Set the current rotation angle of the polygon.
  /**
   * @param {number} angle The current rotation angle (in radians).
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setAngle'] = Polygon.prototype.setAngle = function (angle) {
    this['angle'] = angle;
    this._recalc();
    return this;
  };

  // Set the current offset to apply to the `points` before applying the `angle` rotation.
  /**
   * @param {Vector} offset The new offset vector.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setOffset'] = Polygon.prototype.setOffset = function (offset) {
    this['offset'] = offset;
    this._recalc();
    return this;
  };

  // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
  //
  // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['rotate'] = Polygon.prototype.rotate = function (angle) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].rotate(angle);
    }
    this._recalc();
    return this;
  };

  // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
  // system* (i.e. `pos`).
  //
  // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
  // the coordinates of `pos`.
  //
  // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
  /**
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i]["x"] += x;
      points[i]["y"] += y;
    }
    this._recalc();
    return this;
  };

  // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
  // edges and normals of the collision polygon.
  /**
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype._recalc = function () {
    // Calculated points - this is what is used for underlying collisions and takes into account
    // the angle/offset set on the polygon.
    var calcPoints = this['calcPoints'];
    // The edges here are the direction of the `n`th edge of the polygon, relative to
    // the `n`th point. If you want to draw a given edge from the edge value, you must
    // first translate to the position of the starting point.
    var edges = this['edges'];
    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
    // to the position of the `n`th point. If you want to draw an edge normal, you must first
    // translate to the position of the starting point.
    var normals = this['normals'];
    // Copy the original points array and apply the offset/angle
    var points = this['points'];
    var offset = this['offset'];
    var angle = this['angle'];
    var len = points.length;
    var i;
    for (i = 0; i < len; i++) {
      var calcPoint = calcPoints[i].copy(points[i]);
      calcPoint["x"] += offset["x"];
      calcPoint["y"] += offset["y"];
      if (angle !== 0) {
        calcPoint.rotate(angle);
      }
    }
    // Calculate the edges/normals
    for (i = 0; i < len; i++) {
      var p1 = calcPoints[i];
      var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
      var e = edges[i].copy(p2).sub(p1);
      normals[i].copy(e).perp().normalize();
    }
    return this;
  };

  // Compute the axis-aligned bounding box. Any current state
  // (translations/rotations) will be applied before constructing the AABB.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function () {
    var points = this["calcPoints"];
    var len = points.length;
    var xMin = points[0]["x"];
    var yMin = points[0]["y"];
    var xMax = points[0]["x"];
    var yMax = points[0]["y"];
    for (var i = 1; i < len; i++) {
      var point = points[i];
      if (point["x"] < xMin) {
        xMin = point["x"];
      } else if (point["x"] > xMax) {
        xMax = point["x"];
      }
      if (point["y"] < yMin) {
        yMin = point["y"];
      } else if (point["y"] > yMax) {
        yMax = point["y"];
      }
    }
    return new Box(this["pos"].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
  };

  // Compute the centroid (geometric center) of the polygon. Any current state
  // (translations/rotations) will be applied before computing the centroid.
  //
  // See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
  //
  // Note: Returns a _new_ `Vector` each time you call this.
  /**
   * @return {Vector} A Vector that contains the coordinates of the Centroid.
   */
  Polygon.prototype["getCentroid"] = Polygon.prototype.getCentroid = function () {
    var points = this["calcPoints"];
    var len = points.length;
    var cx = 0;
    var cy = 0;
    var ar = 0;
    for (var i = 0; i < len; i++) {
      var p1 = points[i];
      var p2 = i === len - 1 ? points[0] : points[i + 1]; // Loop around if last point
      var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
      cx += (p1["x"] + p2["x"]) * a;
      cy += (p1["y"] + p2["y"]) * a;
      ar += a;
    }
    ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area
    cx = cx / ar;
    cy = cy / ar;
    return new Vector(cx, cy);
  };

  // ## Box
  //
  // Represents an axis-aligned box, with a width and height.


  // Create a new box, with the specified position, width, and height. If no position
  // is given, the position will be `(0,0)`. If no width or height are given, they will
  // be set to `0`.
  /**
   * @param {Vector=} pos A vector representing the bottom-left of the box (i.e. the smallest x and smallest y value).
   * @param {?number=} w The width of the box.
   * @param {?number=} h The height of the box.
   * @constructor
   */
  function Box(pos, w, h) {
    this['pos'] = pos || new Vector();
    this['w'] = w || 0;
    this['h'] = h || 0;
  }
  SAT['Box'] = Box;

  // Returns a polygon whose edges are the same as this box.
  /**
   * @return {Polygon} A new Polygon that represents this box.
   */
  Box.prototype['toPolygon'] = Box.prototype.toPolygon = function () {
    var pos = this['pos'];
    var w = this['w'];
    var h = this['h'];
    return new Polygon(new Vector(pos['x'], pos['y']), [new Vector(), new Vector(w, 0), new Vector(w, h), new Vector(0, h)]);
  };

  // ## Response
  //
  // An object representing the result of an intersection. Contains:
  //  - The two objects participating in the intersection
  //  - The vector representing the minimum change necessary to extract the first object
  //    from the second one (as well as a unit vector in that direction and the magnitude
  //    of the overlap)
  //  - Whether the first object is entirely inside the second, and vice versa.
  /**
   * @constructor
   */
  function Response() {
    this['a'] = null;
    this['b'] = null;
    this['overlapN'] = new Vector();
    this['overlapV'] = new Vector();
    this.clear();
  }
  SAT['Response'] = Response;

  // Set some values of the response back to their defaults.  Call this between tests if
  // you are going to reuse a single Response object for multiple intersection tests (recommented
  // as it will avoid allcating extra memory)
  /**
   * @return {Response} This for chaining
   */
  Response.prototype['clear'] = Response.prototype.clear = function () {
    this['aInB'] = true;
    this['bInA'] = true;
    this['overlap'] = Number.MAX_VALUE;
    return this;
  };

  // ## Object Pools

  // A pool of `Vector` objects that are used in calculations to avoid
  // allocating memory.
  /**
   * @type {Array.<Vector>}
   */
  var T_VECTORS = [];
  for (var i = 0; i < 10; i++) {
    T_VECTORS.push(new Vector());
  }

  // A pool of arrays of numbers used in calculations to avoid allocating
  // memory.
  /**
   * @type {Array.<Array.<number>>}
   */
  var T_ARRAYS = [];
  for (var i = 0; i < 5; i++) {
    T_ARRAYS.push([]);
  }

  // Temporary response used for polygon hit detection.
  /**
   * @type {Response}
   */
  var T_RESPONSE = new Response();

  // Tiny "point" polygon used for polygon hit detection.
  /**
   * @type {Polygon}
   */
  var TEST_POINT = new Box(new Vector(), 0.000001, 0.000001).toPolygon();

  // ## Helper Functions

  // Flattens the specified array of points onto a unit vector axis,
  // resulting in a one dimensional range of the minimum and
  // maximum value on that axis.
  /**
   * @param {Array.<Vector>} points The points to flatten.
   * @param {Vector} normal The unit vector axis to flatten on.
   * @param {Array.<number>} result An array.  After calling this function,
   *   result[0] will be the minimum value,
   *   result[1] will be the maximum value.
   */
  function flattenPointsOn(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++) {
      // The magnitude of the projection of the point onto the normal
      var dot = points[i].dot(normal);
      if (dot < min) {
        min = dot;
      }
      if (dot > max) {
        max = dot;
      }
    }
    result[0] = min;result[1] = max;
  }

  // Check whether two convex polygons are separated by the specified
  // axis (must be a unit vector).
  /**
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array.<Vector>} aPoints The points in the first polygon.
   * @param {Array.<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
   *   will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated
   *   if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false,
   *   and a response is passed in, information about how much overlap and
   *   the direction of the overlap will be populated.
   */
  function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    var rangeA = T_ARRAYS.pop();
    var rangeB = T_ARRAYS.pop();
    // The magnitude of the offset between the two polygons
    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    var projectedOffset = offsetV.dot(axis);
    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV);
      T_ARRAYS.push(rangeA);
      T_ARRAYS.push(rangeB);
      return true;
    }
    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if (response) {
      var overlap = 0;
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response['aInB'] = false;
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
          response['bInA'] = false;
          // B is fully inside A.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
        // B starts further left than A
      } else {
        response['bInA'] = false;
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
          response['aInB'] = false;
          // A is fully inside B.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      var absOverlap = Math.abs(overlap);
      if (absOverlap < response['overlap']) {
        response['overlap'] = absOverlap;
        response['overlapN'].copy(axis);
        if (overlap < 0) {
          response['overlapN'].reverse();
        }
      }
    }
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
  }
  SAT['isSeparatingAxis'] = isSeparatingAxis;

  // Calculates which Voronoi region a point is on a line segment.
  // It is assumed that both the line and the point are relative to `(0,0)`
  //
  //            |       (0)      |
  //     (-1)  [S]--------------[E]  (1)
  //            |       (0)      |
  /**
   * @param {Vector} line The line segment.
   * @param {Vector} point The point.
   * @return  {number} LEFT_VORONOI_REGION (-1) if it is the left region,
   *          MIDDLE_VORONOI_REGION (0) if it is the middle region,
   *          RIGHT_VORONOI_REGION (1) if it is the right region.
   */
  function voronoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left voronoi region.
    if (dp < 0) {
      return LEFT_VORONOI_REGION;
    }
    // If the point is beyond the end of the line, it is in the
    // right voronoi region.
    else if (dp > len2) {
        return RIGHT_VORONOI_REGION;
      }
      // Otherwise, it's in the middle one.
      else {
          return MIDDLE_VORONOI_REGION;
        }
  }
  // Constants for Voronoi regions
  /**
   * @const
   */
  var LEFT_VORONOI_REGION = -1;
  /**
   * @const
   */
  var MIDDLE_VORONOI_REGION = 0;
  /**
   * @const
   */
  var RIGHT_VORONOI_REGION = 1;

  // ## Collision Tests

  // Check if a point is inside a circle.
  /**
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * @return {boolean} true if the point is inside the circle, false if it is not.
   */
  function pointInCircle(p, c) {
    var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']);
    var radiusSq = c['r'] * c['r'];
    var distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    // If the distance between is smaller than the radius then the point is inside the circle.
    return distanceSq <= radiusSq;
  }
  SAT['pointInCircle'] = pointInCircle;

  // Check if a point is inside a convex polygon.
  /**
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * @return {boolean} true if the point is inside the polygon, false if it is not.
   */
  function pointInPolygon(p, poly) {
    TEST_POINT['pos'].copy(p);
    T_RESPONSE.clear();
    var result = testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
    if (result) {
      result = T_RESPONSE['aInB'];
    }
    return result;
  }
  SAT['pointInPolygon'] = pointInPolygon;

  // Check if two circles collide.
  /**
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   the circles intersect.
   * @return {boolean} true if the circles intersect, false if they don't.
   */
  function testCircleCircle(a, b, response) {
    // Check if the distance between the centers of the two
    // circles is greater than their combined radius.
    var differenceV = T_VECTORS.pop().copy(b['pos']).sub(a['pos']);
    var totalRadius = a['r'] + b['r'];
    var totalRadiusSq = totalRadius * totalRadius;
    var distanceSq = differenceV.len2();
    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) {
      var dist = Math.sqrt(distanceSq);
      response['a'] = a;
      response['b'] = b;
      response['overlap'] = totalRadius - dist;
      response['overlapN'].copy(differenceV.normalize());
      response['overlapV'].copy(differenceV).scale(response['overlap']);
      response['aInB'] = a['r'] <= b['r'] && dist <= b['r'] - a['r'];
      response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
    }
    T_VECTORS.push(differenceV);
    return true;
  }
  SAT['testCircleCircle'] = testCircleCircle;

  // Check if a polygon and a circle collide.
  /**
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonCircle(polygon, circle, response) {
    // Get the position of the circle relative to the polygon.
    var circlePos = T_VECTORS.pop().copy(circle['pos']).sub(polygon['pos']);
    var radius = circle['r'];
    var radius2 = radius * radius;
    var points = polygon['calcPoints'];
    var len = points.length;
    var edge = T_VECTORS.pop();
    var point = T_VECTORS.pop();

    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      var next = i === len - 1 ? 0 : i + 1;
      var prev = i === 0 ? len - 1 : i - 1;
      var overlap = 0;
      var overlapN = null;

      // Get the edge.
      edge.copy(polygon['edges'][i]);
      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);

      // If the distance between the center of the circle and the point
      // is bigger than the radius, the polygon is definitely not fully in
      // the circle.
      if (response && point.len2() > radius2) {
        response['aInB'] = false;
      }

      // Calculate which Voronoi region the center of the circle is in.
      var region = voronoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORONOI_REGION) {
        // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge.copy(polygon['edges'][prev]);
        // Calculate the center of the circle relative the starting point of the previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = voronoiRegion(edge, point2);
        if (region === RIGHT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
        // If it's the right region:
      } else if (region === RIGHT_VORONOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon['edges'][next]);
        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);
        region = voronoiRegion(edge, point);
        if (region === LEFT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        var normal = edge.perp().normalize();
        // Find the perpendicular distance between the center of the
        // circle and the edge.
        var dist = point.dot(normal);
        var distAbs = Math.abs(dist);
        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;
          // If the center of the circle is on the outside of the edge, or part of the
          // circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) {
            response['bInA'] = false;
          }
        }
      }

      // If this is the smallest overlap we've seen, keep it.
      // (overlapN may be null if the circle was in the wrong Voronoi region).
      if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
        response['overlap'] = overlap;
        response['overlapN'].copy(overlapN);
      }
    }

    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response['a'] = polygon;
      response['b'] = circle;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    T_VECTORS.push(circlePos);
    T_VECTORS.push(edge);
    T_VECTORS.push(point);
    return true;
  }
  SAT['testPolygonCircle'] = testPolygonCircle;

  // Check if a circle and a polygon collide.
  //
  // **NOTE:** This is slightly less efficient than polygonCircle as it just
  // runs polygonCircle and reverses everything at the end.
  /**
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testCirclePolygon(circle, polygon, response) {
    // Test the polygon against the circle.
    var result = testPolygonCircle(polygon, circle, response);
    if (result && response) {
      // Swap A and B in the response.
      var a = response['a'];
      var aInB = response['aInB'];
      response['overlapN'].reverse();
      response['overlapV'].reverse();
      response['a'] = response['b'];
      response['b'] = a;
      response['aInB'] = response['bInA'];
      response['bInA'] = aInB;
    }
    return result;
  }
  SAT['testCirclePolygon'] = testCirclePolygon;

  // Checks whether polygons collide.
  /**
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonPolygon(a, b, response) {
    var aPoints = a['calcPoints'];
    var aLen = aPoints.length;
    var bPoints = b['calcPoints'];
    var bLen = bPoints.length;
    // If any of the edge normals of A is a separating axis, no intersection.
    for (var i = 0; i < aLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
        return false;
      }
    }
    // If any of the edge normals of B is a separating axis, no intersection.
    for (var i = 0; i < bLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
        return false;
      }
    }
    // Since none of the edge normals of A or B are a separating axis, there is an intersection
    // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
    // final overlap vector.
    if (response) {
      response['a'] = a;
      response['b'] = b;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    return true;
  }
  SAT['testPolygonPolygon'] = testPolygonPolygon;

  return SAT;
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EvalWorker = __webpack_require__(41);

var _EvalWorker2 = _interopRequireDefault(_EvalWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AiWrapper = function () {
  function AiWrapper(tank, aiDefinition) {
    _classCallCheck(this, AiWrapper);

    if (!tank) throw "Tank is required";
    if (!aiDefinition) throw "AiDefinition is required";
    this._tank = tank;
    this._aiWorker = null;
    this._aiProcessingStart = 0;
    this._aiProcessingCheckInterval = null;
    this._aiProcessingResolveCallback = null;
    this._aiProcessingRejectCallback = null;
    this._slowAiChances = 10;
    this._onActivationCallback = [];
    this._onDectivationCallback = [];
    this._aiProcessingTimeLimit = 3000;
    this._aiDefinition = aiDefinition;
    this._isReady = false;
    this._controlData = {
      THROTTLE: 0,
      BOOST: 0,
      TURN: 0,
      RADAR_TURN: 0,
      GUN_TURN: 0,
      SHOOT: 0,
      OUTBOX: [],
      DEBUG: {}
    };
  }

  _createClass(AiWrapper, [{
    key: 'setProcessingLimit',
    value: function setProcessingLimit(v) {
      this._aiProcessingTimeLimit = v;
    }
  }, {
    key: 'onActivation',
    value: function onActivation(callback) {
      this._onActivationCallback.push(callback);
    }
  }, {
    key: 'onDectivation',
    value: function onDectivation(callback) {
      this._onDeactivationCallback.push(callback);
    }
  }, {
    key: '_formatError',
    value: function _formatError(err) {
      if (!err.message) return 'unknown';
      var msg = err.message;
      if (err.lineno) {
        msg = "Line #" + err.lineno + ": " + msg;
      }
      return msg;
    }
  }, {
    key: 'activate',
    value: function activate(seed, resolve, reject) {
      if (typeof seed != 'number') throw "seed must be a number, '" + (typeof seed === 'undefined' ? 'undefined' : _typeof(seed)) + "' given";
      if (typeof resolve != 'function') throw "resolve callback must be a function, '" + (typeof resolve === 'undefined' ? 'undefined' : _typeof(resolve)) + "' given";
      if (typeof reject != 'function') throw "reject callback must be a function, '" + (typeof reject === 'undefined' ? 'undefined' : _typeof(reject)) + "' given";
      var self = this;
      self._aiWorker = self._createWorker(this._aiDefinition);
      self._aiWorker.onerror = function (err) {
        console.error(err);
        if (self._aiProcessingRejectCallback) {
          self._aiProcessingRejectCallback({
            message: "Web Worker of '" + self._tank.fullName + "' returned an error: " + self._formatError(err),
            performanceIssues: false,
            tankName: self._tank.name,
            tankId: self._tank.id
          });
          self._aiProcessingResolveCallback = null;
          self._aiProcessingRejectCallback = null;
        }
      };

      if (self._aiProcessingCheckInterval) {
        clearInterval(self._aiProcessingCheckInterval);
        self._aiProcessingCheckInterval = null;
      }

      self._aiProcessingCheckInterval = setInterval(function () {
        if (self._aiProcessingRejectCallback) {
          var now = new Date().getTime();
          var dt = now - self._aiProcessingStart;
          if (dt > self._aiProcessingTimeLimit) {
            clearInterval(self._aiProcessingCheckInterval);
            self._aiProcessingCheckInterval = null;
            self._aiProcessingRejectCallback({
              message: "Simulation cannot be continued because " + self._tank.name + " #" + self._tank.id + " does not respond",
              performanceIssues: true,
              tankName: self._tank.name,
              tankId: self._tank.id
            });
          }
        }
      }, Math.max(self._aiDefinition.executionLimit, Math.round(self._aiProcessingTimeLimit / 2)));

      self._aiWorker.onmessage = function (commandEvent) {
        var value = commandEvent.data;
        if (self._aiProcessingResolveCallback) {
          if (value.type == 'init') {
            self._configureTank(value.settings ? value.settings : {});
            self._isReady = true;
            for (var i = 0; i < self._onActivationCallback.length; i++) {
              self._onActivationCallback[i].bind(self)();
            }
          } else {
            self._controlTank(value);
          }

          var callback = void 0;
          var now = new Date().getTime();
          var dt = now - self._aiProcessingStart;
          if (dt > self._aiDefinition.executionLimit && value.type != 'init') {
            self._slowAiChances--;
            console.warn("Execution of AI for tank " + self._tank.name + " #" + self._tank.id + " takes too long (" + dt + "ms). If problem repeats, AI will be terminated.");
            if (self._slowAiChances <= 0) {
              callback = self._aiProcessingRejectCallback;
              self._aiProcessingResolveCallback = null;
              self._aiProcessingRejectCallback = null;
              callback({
                message: "Simulation cannot be continued because " + self._tank.name + " #" + self._tank.id + " has performance issues",
                performanceIssues: true,
                tankName: self._tank.name,
                tankId: self._tank.id
              });
              return;
            }
          }
          callback = self._aiProcessingResolveCallback;
          self._aiProcessingResolveCallback = null;
          self._aiProcessingRejectCallback = null;
          callback();
        }
      };

      var teamInfo = null;
      if (self._tank.team && self._tank.team.size > 1) {
        teamInfo = {
          name: self._tank.team.name,
          mates: self._tank.team.members.map(function (t) {
            return t.id;
          })
        };
      } else {
        teamInfo = {
          name: self._tank.fullName,
          mates: [self._tank.id]
        };
      }
      var infoData = {
        id: self._tank.id,
        team: teamInfo
      };
      if (self._aiDefinition.initData) {
        infoData.initData = self._aiDefinition.initData;
      }
      self._aiProcessingStart = new Date().getTime();
      self._aiProcessingResolveCallback = resolve;
      self._aiProcessingRejectCallback = reject;
      self._aiWorker.postMessage({
        command: 'init',
        seed: seed + ":" + self._tank.id,
        settings: {
          SKIN: 'zebra'
        },
        info: infoData,
        code: self._aiDefinition.code
      });
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      if (this._aiWorker) {
        this._aiWorker.terminate();
        this._aiWorker = null;
      }

      if (this._aiProcessingCheckInterval) {
        clearInterval(this._aiProcessingCheckInterval);
        this._aiProcessingCheckInterval = null;
      }
      for (var i = 0; i < this._onDectivationCallback.length; i++) {
        this._onDectivationCallback[i].bind(this)();
      }
    }
  }, {
    key: 'simulationStep',
    value: function simulationStep(resolve, reject) {
      if (typeof resolve != 'function') throw "resolve callback must be a function, '" + (typeof resolve === 'undefined' ? 'undefined' : _typeof(resolve)) + "' given";
      if (typeof reject != 'function') throw "reject callback must be a function, '" + (typeof reject === 'undefined' ? 'undefined' : _typeof(reject)) + "' given";
      if (!this._isReady) {
        throw "AI of " + this._tank.fullName + " not initliazed";
      }
      var self = this;
      if (self._aiWorker && self._tank.energy == 0) {
        self._aiWorker.terminate();
        self._aiWorker = null;
        resolve();
        return;
      }

      self._aiProcessingStart = new Date().getTime();
      self._aiProcessingResolveCallback = resolve;
      self._aiProcessingRejectCallback = reject;
      self._aiWorker.postMessage({
        command: 'update',
        state: self._tank.state,
        control: self._controlData
      });
    }
  }, {
    key: '_configureTank',
    value: function _configureTank(input) {
      var settings = {};

      var skinList = ['zebra', 'forest', 'black', 'tiger', 'desert', 'lava', 'ocean'];
      if (skinList.indexOf(input.SKIN) != -1) {
        settings.SKIN = input.SKIN;
      }
      this._tank.init(settings);
    }
  }, {
    key: '_controlTank',
    value: function _controlTank(value) {
      var self = this;
      self._controlData.THROTTLE = Number(value.THROTTLE);
      self._controlData.TURN = Number(value.TURN);
      self._controlData.GUN_TURN = Number(value.GUN_TURN);
      self._controlData.RADAR_TURN = Number(value.RADAR_TURN);
      self._controlData.SHOOT = Number(value.SHOOT);
      self._controlData.DEBUG = value.DEBUG;
      self._controlData.BOOST = value.BOOST ? 1 : 0;

      self._controlData.THROTTLE = isNaN(self._controlData.THROTTLE) ? 0 : self._controlData.THROTTLE;
      self._controlData.TURN = isNaN(self._controlData.TURN) ? 0 : self._controlData.TURN;
      self._controlData.GUN_TURN = isNaN(self._controlData.GUN_TURN) ? 0 : self._controlData.GUN_TURN;
      self._controlData.RADAR_TURN = isNaN(self._controlData.RADAR_TURN) ? 0 : self._controlData.RADAR_TURN;
      self._controlData.SHOOT = isNaN(self._controlData.SHOOT) ? 0 : self._controlData.SHOOT;

      self._controlData.THROTTLE = Math.min(1, Math.max(-1, Number(self._controlData.THROTTLE)));
      self._controlData.TURN = Math.min(1, Math.max(-1, Number(self._controlData.TURN)));
      self._controlData.GUN_TURN = Math.min(1, Math.max(-1, Number(self._controlData.GUN_TURN)));
      self._controlData.RADAR_TURN = Math.min(1, Math.max(-1, Number(self._controlData.RADAR_TURN)));
      self._controlData.SHOOT = Math.min(1, Math.max(0, Number(self._controlData.SHOOT)));

      self._tank.setThrottle(self._controlData.THROTTLE);
      self._tank.setBoost(self._controlData.BOOST);
      self._tank.setTurn(self._controlData.TURN);
      self._tank.setRadarTurn(self._controlData.RADAR_TURN);
      self._tank.setGunTurn(self._controlData.GUN_TURN);
      self._tank.setDebugData(self._controlData.DEBUG);
      if (self._controlData.SHOOT) {
        self._tank.shoot(self._controlData.SHOOT);
      }
      self._controlData.SHOOT = 0;

      var messages = [];
      for (var i in value.OUTBOX) {
        messages.push(JSON.parse(JSON.stringify(value.OUTBOX[i])));
      }

      if (self._tank.team) {
        self._tank.team.sendMessages(self._tank.id, messages);
      }

      self._controlData.OUTBOX = [];
    }
  }, {
    key: '_createWorker',
    value: function _createWorker(def) {
      if (def.useSandbox) {
        return new Worker(def.filePath);
      } else {
        return new _EvalWorker2.default();
      }
    }
  }, {
    key: 'tank',
    get: function get() {
      return this._tank;
    }
  }, {
    key: 'worker',
    get: function get() {
      return this._aiWorker;
    }
  }]);

  return AiWrapper;
}();

exports.default = AiWrapper;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extendedMath = __webpack_require__(42);

var TankController = function () {
  function TankController() {
    _classCallCheck(this, TankController);

    this._initCallback = function () {};
    this._loopCallback = function () {};
  }

  _createClass(TankController, [{
    key: 'loop',
    value: function loop(callback) {
      this._loopCallback = callback;
    }
  }, {
    key: 'init',
    value: function init(callback) {
      this._initCallback = callback;
    }
  }]);

  return TankController;
}();

var EvalWorker = function () {
  function EvalWorker() {
    _classCallCheck(this, EvalWorker);

    this.onmessage = function (msg) {};
    this._callStackLimit = 100;
    this._callStackCount = 0;
    this._tankController = new TankController();
  }

  _createClass(EvalWorker, [{
    key: 'postMessage',
    value: function postMessage(inputData) {
      var _this = this;

      var response = null;
      if (inputData.command == 'init') {
        if (!inputData.code) throw "The code is required!";
        var settings = inputData.settings;
        var info = inputData.info;
        var Math = extendedMath();

        var tank = this._tankController;
        eval(inputData.code); // jshint ignore:line
        tank._initCallback(settings, info);
        response = { data: { type: 'init', settings: settings } };
      } else if (inputData.command == 'update') {
        var state = inputData.state;
        var control = inputData.control;
        if (this._tankController._loopCallback) {
          this._tankController._loopCallback(state, control);
          response = { data: control };
        } else {
          response = { data: control };
        }
      }
      if (this._callStackCount < this._callStackLimit) {
        this._callStackCount++;
        this.onmessage(response);
      } else {
        this._callStackCount = 0;
        setTimeout(function () {
          _this.onmessage(response);
        }, 1);
      }
    }
  }, {
    key: 'terminate',
    value: function terminate() {}
  }]);

  return EvalWorker;
}();

exports.default = EvalWorker;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var result = {};
  var items = ["LN10", "PI", "E", "LOG10E", "SQRT2", "LOG2E", "SQRT1_2", "LN2", "cos", "pow", "log", "tan", "sqrt", "ceil", "asin", "abs", "max", "exp", "atan2", "random", "round", "floor", "acos", "atan", "min", "sin"];
  for (var i in items) {
    result[items[i]] = Math[items[i]];
  }

  result.deg = {};

  result.rad = {};

  result.deg.normalize = function (a) {
    a = Number(a);
    while (a > 180) {
      a -= 360;
    }while (a <= -180) {
      a += 360;
    }return a;
  };

  result.rad.normalize = function (a) {
    a = Number(a);
    while (a > result.PI) {
      a -= result.PI * 2;
    }while (a <= -result.PI) {
      a += result.PI * 2;
    }return a;
  };

  result.deg2rad = function (v) {
    return result.rad.normalize(v * (result.PI / 180));
  };

  result.rad2deg = function (v) {
    return result.deg.normalize(v * (180 / result.PI));
  };

  result.rad.atan2 = result.atan2;

  result.deg.atan2 = function (y, x) {
    return result.rad2deg(result.rad.atan2(y, x));
  };

  result.distance = function (x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return result.sqrt(dx * dx + dy * dy);
  };

  result.randomRange = function (a, b) {
    if (a > b) throw "The range is incorrect. First number must be lower than second";
    return a + result.random() * (b - a);
  };
  return result;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PerformanceMonitor = function () {
  function PerformanceMonitor() {
    _classCallCheck(this, PerformanceMonitor);

    this._simulationStepDuration = 30;
    this._stepCounter = 0;
    this._checkLoop = 0;
    this._started = false;
    this._desiredPerfomance = Math.floor(1000 / this._simulationStepDuration);
    this._actualPerfomance = this._desiredPerfomance;
    this._perfomanceIndex = 1;
    this._desiredQuality = 1;
    this._quality = this._desiredQuality;
    this._checkInterval = 500;
  }

  _createClass(PerformanceMonitor, [{
    key: 'start',
    value: function start() {
      this._started = true;
      var self = this;
      this._checkLoop = setInterval(function () {
        self._check();
      }, this._checkInterval);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._started = false;
      if (this._checkLoop) {
        clearInterval(this._checkLoop);
        this._checkLoop = null;
      }
    }
  }, {
    key: 'setSimulationStepDuration',
    value: function setSimulationStepDuration(v) {
      if (v != this._simulationStepDuration) {
        this._quality = this._desiredQuality;
      }
      this._simulationStepDuration = v;
      this._desiredPerfomance = Math.floor(1000 / v);
    }
  }, {
    key: 'onSimulationStep',
    value: function onSimulationStep() {
      if (this._started) {
        this._stepCounter++;
      }
    }
  }, {
    key: '_check',
    value: function _check() {
      this._actualPerfomance = Math.ceil(this._stepCounter * (1000 / this._checkInterval));
      this._stepCounter = 0;
      var index = this._desiredPerfomance ? this._actualPerfomance / this._desiredPerfomance : 1;
      this._perfomanceIndex = (this._perfomanceIndex + index) / 2;
      this._updateQuality();
    }
  }, {
    key: '_updateQuality',
    value: function _updateQuality() {
      var lowestQuality = 2.5 * this._perfomanceIndex - 1.25;
      lowestQuality = Math.max(0, Math.min(1, lowestQuality));
      var decreaseStep = -0.5 * this._perfomanceIndex + 0.45;

      if (this._perfomanceIndex > 1) {
        this._desiredQuality += 0.1;
      } else {
        this._desiredQuality -= decreaseStep;
      }

      this._desiredQuality = Math.max(0, Math.min(1, this._desiredQuality));

      var targetQuality = Math.max(lowestQuality, this._desiredQuality);

      this._desiredQuality = (this._desiredQuality + targetQuality) / 2;
      if (this._desiredQuality < this._quality) {
        this._quality = this._desiredQuality;
      } else {
        this._quality = (this._desiredQuality + 9 * this._quality) / 10;
      }
    }
  }, {
    key: 'started',
    get: function get() {
      return this._started;
    }
  }, {
    key: 'desiredPerfomance',
    get: function get() {
      return this._desiredPerfomance;
    }
  }, {
    key: 'actualPerfomance',
    get: function get() {
      return this._actualPerfomance;
    }
  }, {
    key: 'qualityLevel',
    get: function get() {
      return this._quality;
    }
  }]);

  return PerformanceMonitor;
}();

exports.default = PerformanceMonitor;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var compileSchema = __webpack_require__(45),
    resolve = __webpack_require__(7),
    Cache = __webpack_require__(49),
    SchemaObject = __webpack_require__(15),
    stableStringify = __webpack_require__(16),
    formats = __webpack_require__(50),
    rules = __webpack_require__(51),
    $dataMetaSchema = __webpack_require__(72),
    util = __webpack_require__(4);

module.exports = Ajv;

Ajv.prototype.validate = validate;
Ajv.prototype.compile = compile;
Ajv.prototype.addSchema = addSchema;
Ajv.prototype.addMetaSchema = addMetaSchema;
Ajv.prototype.validateSchema = validateSchema;
Ajv.prototype.getSchema = getSchema;
Ajv.prototype.removeSchema = removeSchema;
Ajv.prototype.addFormat = addFormat;
Ajv.prototype.errorsText = errorsText;

Ajv.prototype._addSchema = _addSchema;
Ajv.prototype._compile = _compile;

Ajv.prototype.compileAsync = __webpack_require__(73);
var customKeyword = __webpack_require__(74);
Ajv.prototype.addKeyword = customKeyword.add;
Ajv.prototype.getKeyword = customKeyword.get;
Ajv.prototype.removeKeyword = customKeyword.remove;

var errorClasses = __webpack_require__(9);
Ajv.ValidationError = errorClasses.Validation;
Ajv.MissingRefError = errorClasses.MissingRef;
Ajv.$dataMetaSchema = $dataMetaSchema;

var META_SCHEMA_ID = 'http://json-schema.org/draft-07/schema';

var META_IGNORE_OPTIONS = ['removeAdditional', 'useDefaults', 'coerceTypes'];
var META_SUPPORT_DATA = ['/properties'];

/**
 * Creates validator instance.
 * Usage: `Ajv(opts)`
 * @param {Object} opts optional options
 * @return {Object} ajv instance
 */
function Ajv(opts) {
  if (!(this instanceof Ajv)) return new Ajv(opts);
  opts = this._opts = util.copy(opts) || {};
  setLogger(this);
  this._schemas = {};
  this._refs = {};
  this._fragments = {};
  this._formats = formats(opts.format);
  var schemaUriFormat = this._schemaUriFormat = this._formats['uri-reference'];
  this._schemaUriFormatFunc = function (str) {
    return schemaUriFormat.test(str);
  };

  this._cache = opts.cache || new Cache();
  this._loadingSchemas = {};
  this._compilations = [];
  this.RULES = rules();
  this._getId = chooseGetId(opts);

  opts.loopRequired = opts.loopRequired || Infinity;
  if (opts.errorDataPath == 'property') opts._errorDataPathProperty = true;
  if (opts.serialize === undefined) opts.serialize = stableStringify;
  this._metaOpts = getMetaSchemaOptions(this);

  if (opts.formats) addInitialFormats(this);
  addDraft6MetaSchema(this);
  if (_typeof(opts.meta) == 'object') this.addMetaSchema(opts.meta);
  addInitialSchemas(this);
}

/**
 * Validate data using schema
 * Schema will be compiled and cached (using serialized JSON as key. [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize.
 * @this   Ajv
 * @param  {String|Object} schemaKeyRef key, ref or schema object
 * @param  {Any} data to be validated
 * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
 */
function validate(schemaKeyRef, data) {
  var v;
  if (typeof schemaKeyRef == 'string') {
    v = this.getSchema(schemaKeyRef);
    if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
  } else {
    var schemaObj = this._addSchema(schemaKeyRef);
    v = schemaObj.validate || this._compile(schemaObj);
  }

  var valid = v(data);
  if (v.$async !== true) this.errors = v.errors;
  return valid;
}

/**
 * Create validating function for passed schema.
 * @this   Ajv
 * @param  {Object} schema schema object
 * @param  {Boolean} _meta true if schema is a meta-schema. Used internally to compile meta schemas of custom keywords.
 * @return {Function} validating function
 */
function compile(schema, _meta) {
  var schemaObj = this._addSchema(schema, undefined, _meta);
  return schemaObj.validate || this._compile(schemaObj);
}

/**
 * Adds schema to the instance.
 * @this   Ajv
 * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
 * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
 * @param {Boolean} _skipValidation true to skip schema validation. Used internally, option validateSchema should be used instead.
 * @param {Boolean} _meta true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
 * @return {Ajv} this for method chaining
 */
function addSchema(schema, key, _skipValidation, _meta) {
  if (Array.isArray(schema)) {
    for (var i = 0; i < schema.length; i++) {
      this.addSchema(schema[i], undefined, _skipValidation, _meta);
    }return this;
  }
  var id = this._getId(schema);
  if (id !== undefined && typeof id != 'string') throw new Error('schema id must be string');
  key = resolve.normalizeId(key || id);
  checkUnique(this, key);
  this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
  return this;
}

/**
 * Add schema that will be used to validate other schemas
 * options in META_IGNORE_OPTIONS are alway set to false
 * @this   Ajv
 * @param {Object} schema schema object
 * @param {String} key optional schema key
 * @param {Boolean} skipValidation true to skip schema validation, can be used to override validateSchema option for meta-schema
 * @return {Ajv} this for method chaining
 */
function addMetaSchema(schema, key, skipValidation) {
  this.addSchema(schema, key, skipValidation, true);
  return this;
}

/**
 * Validate schema
 * @this   Ajv
 * @param {Object} schema schema to validate
 * @param {Boolean} throwOrLogError pass true to throw (or log) an error if invalid
 * @return {Boolean} true if schema is valid
 */
function validateSchema(schema, throwOrLogError) {
  var $schema = schema.$schema;
  if ($schema !== undefined && typeof $schema != 'string') throw new Error('$schema must be a string');
  $schema = $schema || this._opts.defaultMeta || defaultMeta(this);
  if (!$schema) {
    this.logger.warn('meta-schema not available');
    this.errors = null;
    return true;
  }
  var currentUriFormat = this._formats.uri;
  this._formats.uri = typeof currentUriFormat == 'function' ? this._schemaUriFormatFunc : this._schemaUriFormat;
  var valid;
  try {
    valid = this.validate($schema, schema);
  } finally {
    this._formats.uri = currentUriFormat;
  }
  if (!valid && throwOrLogError) {
    var message = 'schema is invalid: ' + this.errorsText();
    if (this._opts.validateSchema == 'log') this.logger.error(message);else throw new Error(message);
  }
  return valid;
}

function defaultMeta(self) {
  var meta = self._opts.meta;
  self._opts.defaultMeta = (typeof meta === 'undefined' ? 'undefined' : _typeof(meta)) == 'object' ? self._getId(meta) || meta : self.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined;
  return self._opts.defaultMeta;
}

/**
 * Get compiled schema from the instance by `key` or `ref`.
 * @this   Ajv
 * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
 * @return {Function} schema validating function (with property `schema`).
 */
function getSchema(keyRef) {
  var schemaObj = _getSchemaObj(this, keyRef);
  switch (typeof schemaObj === 'undefined' ? 'undefined' : _typeof(schemaObj)) {
    case 'object':
      return schemaObj.validate || this._compile(schemaObj);
    case 'string':
      return this.getSchema(schemaObj);
    case 'undefined':
      return _getSchemaFragment(this, keyRef);
  }
}

function _getSchemaFragment(self, ref) {
  var res = resolve.schema.call(self, { schema: {} }, ref);
  if (res) {
    var schema = res.schema,
        root = res.root,
        baseId = res.baseId;
    var v = compileSchema.call(self, schema, root, undefined, baseId);
    self._fragments[ref] = new SchemaObject({
      ref: ref,
      fragment: true,
      schema: schema,
      root: root,
      baseId: baseId,
      validate: v
    });
    return v;
  }
}

function _getSchemaObj(self, keyRef) {
  keyRef = resolve.normalizeId(keyRef);
  return self._schemas[keyRef] || self._refs[keyRef] || self._fragments[keyRef];
}

/**
 * Remove cached schema(s).
 * If no parameter is passed all schemas but meta-schemas are removed.
 * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
 * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
 * @this   Ajv
 * @param  {String|Object|RegExp} schemaKeyRef key, ref, pattern to match key/ref or schema object
 * @return {Ajv} this for method chaining
 */
function removeSchema(schemaKeyRef) {
  if (schemaKeyRef instanceof RegExp) {
    _removeAllSchemas(this, this._schemas, schemaKeyRef);
    _removeAllSchemas(this, this._refs, schemaKeyRef);
    return this;
  }
  switch (typeof schemaKeyRef === 'undefined' ? 'undefined' : _typeof(schemaKeyRef)) {
    case 'undefined':
      _removeAllSchemas(this, this._schemas);
      _removeAllSchemas(this, this._refs);
      this._cache.clear();
      return this;
    case 'string':
      var schemaObj = _getSchemaObj(this, schemaKeyRef);
      if (schemaObj) this._cache.del(schemaObj.cacheKey);
      delete this._schemas[schemaKeyRef];
      delete this._refs[schemaKeyRef];
      return this;
    case 'object':
      var serialize = this._opts.serialize;
      var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;
      this._cache.del(cacheKey);
      var id = this._getId(schemaKeyRef);
      if (id) {
        id = resolve.normalizeId(id);
        delete this._schemas[id];
        delete this._refs[id];
      }
  }
  return this;
}

function _removeAllSchemas(self, schemas, regex) {
  for (var keyRef in schemas) {
    var schemaObj = schemas[keyRef];
    if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
      self._cache.del(schemaObj.cacheKey);
      delete schemas[keyRef];
    }
  }
}

/* @this   Ajv */
function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
  if ((typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) != 'object' && typeof schema != 'boolean') throw new Error('schema should be object or boolean');
  var serialize = this._opts.serialize;
  var cacheKey = serialize ? serialize(schema) : schema;
  var cached = this._cache.get(cacheKey);
  if (cached) return cached;

  shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;

  var id = resolve.normalizeId(this._getId(schema));
  if (id && shouldAddSchema) checkUnique(this, id);

  var willValidate = this._opts.validateSchema !== false && !skipValidation;
  var recursiveMeta;
  if (willValidate && !(recursiveMeta = id && id == resolve.normalizeId(schema.$schema))) this.validateSchema(schema, true);

  var localRefs = resolve.ids.call(this, schema);

  var schemaObj = new SchemaObject({
    id: id,
    schema: schema,
    localRefs: localRefs,
    cacheKey: cacheKey,
    meta: meta
  });

  if (id[0] != '#' && shouldAddSchema) this._refs[id] = schemaObj;
  this._cache.put(cacheKey, schemaObj);

  if (willValidate && recursiveMeta) this.validateSchema(schema, true);

  return schemaObj;
}

/* @this   Ajv */
function _compile(schemaObj, root) {
  if (schemaObj.compiling) {
    schemaObj.validate = callValidate;
    callValidate.schema = schemaObj.schema;
    callValidate.errors = null;
    callValidate.root = root ? root : callValidate;
    if (schemaObj.schema.$async === true) callValidate.$async = true;
    return callValidate;
  }
  schemaObj.compiling = true;

  var currentOpts;
  if (schemaObj.meta) {
    currentOpts = this._opts;
    this._opts = this._metaOpts;
  }

  var v;
  try {
    v = compileSchema.call(this, schemaObj.schema, root, schemaObj.localRefs);
  } catch (e) {
    delete schemaObj.validate;
    throw e;
  } finally {
    schemaObj.compiling = false;
    if (schemaObj.meta) this._opts = currentOpts;
  }

  schemaObj.validate = v;
  schemaObj.refs = v.refs;
  schemaObj.refVal = v.refVal;
  schemaObj.root = v.root;
  return v;

  /* @this   {*} - custom context, see passContext option */
  function callValidate() {
    /* jshint validthis: true */
    var _validate = schemaObj.validate;
    var result = _validate.apply(this, arguments);
    callValidate.errors = _validate.errors;
    return result;
  }
}

function chooseGetId(opts) {
  switch (opts.schemaId) {
    case 'auto':
      return _get$IdOrId;
    case 'id':
      return _getId;
    default:
      return _get$Id;
  }
}

/* @this   Ajv */
function _getId(schema) {
  if (schema.$id) this.logger.warn('schema $id ignored', schema.$id);
  return schema.id;
}

/* @this   Ajv */
function _get$Id(schema) {
  if (schema.id) this.logger.warn('schema id ignored', schema.id);
  return schema.$id;
}

function _get$IdOrId(schema) {
  if (schema.$id && schema.id && schema.$id != schema.id) throw new Error('schema $id is different from id');
  return schema.$id || schema.id;
}

/**
 * Convert array of error message objects to string
 * @this   Ajv
 * @param  {Array<Object>} errors optional array of validation errors, if not passed errors from the instance are used.
 * @param  {Object} options optional options with properties `separator` and `dataVar`.
 * @return {String} human readable string with all errors descriptions
 */
function errorsText(errors, options) {
  errors = errors || this.errors;
  if (!errors) return 'No errors';
  options = options || {};
  var separator = options.separator === undefined ? ', ' : options.separator;
  var dataVar = options.dataVar === undefined ? 'data' : options.dataVar;

  var text = '';
  for (var i = 0; i < errors.length; i++) {
    var e = errors[i];
    if (e) text += dataVar + e.dataPath + ' ' + e.message + separator;
  }
  return text.slice(0, -separator.length);
}

/**
 * Add custom format
 * @this   Ajv
 * @param {String} name format name
 * @param {String|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
 * @return {Ajv} this for method chaining
 */
function addFormat(name, format) {
  if (typeof format == 'string') format = new RegExp(format);
  this._formats[name] = format;
  return this;
}

function addDraft6MetaSchema(self) {
  var $dataSchema;
  if (self._opts.$data) {
    $dataSchema = __webpack_require__(76);
    self.addMetaSchema($dataSchema, $dataSchema.$id, true);
  }
  if (self._opts.meta === false) return;
  var metaSchema = __webpack_require__(77);
  if (self._opts.$data) metaSchema = $dataMetaSchema(metaSchema, META_SUPPORT_DATA);
  self.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
  self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
}

function addInitialSchemas(self) {
  var optsSchemas = self._opts.schemas;
  if (!optsSchemas) return;
  if (Array.isArray(optsSchemas)) self.addSchema(optsSchemas);else for (var key in optsSchemas) {
    self.addSchema(optsSchemas[key], key);
  }
}

function addInitialFormats(self) {
  for (var name in self._opts.formats) {
    var format = self._opts.formats[name];
    self.addFormat(name, format);
  }
}

function checkUnique(self, id) {
  if (self._schemas[id] || self._refs[id]) throw new Error('schema with key or id "' + id + '" already exists');
}

function getMetaSchemaOptions(self) {
  var metaOpts = util.copy(self._opts);
  for (var i = 0; i < META_IGNORE_OPTIONS.length; i++) {
    delete metaOpts[META_IGNORE_OPTIONS[i]];
  }return metaOpts;
}

function setLogger(self) {
  var logger = self._opts.logger;
  if (logger === false) {
    self.logger = { log: noop, warn: noop, error: noop };
  } else {
    if (logger === undefined) logger = console;
    if (!((typeof logger === 'undefined' ? 'undefined' : _typeof(logger)) == 'object' && logger.log && logger.warn && logger.error)) throw new Error('logger must implement log, warn and error methods');
    self.logger = logger;
  }
}

function noop() {}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var resolve = __webpack_require__(7),
    util = __webpack_require__(4),
    errorClasses = __webpack_require__(9),
    stableStringify = __webpack_require__(16);

var validateGenerator = __webpack_require__(17);

/**
 * Functions below are used inside compiled validations function
 */

var ucs2length = util.ucs2length;
var equal = __webpack_require__(8);

// this error is thrown by async schemas to return validation errors via exception
var ValidationError = errorClasses.Validation;

module.exports = compile;

/**
 * Compiles schema to validation function
 * @this   Ajv
 * @param  {Object} schema schema object
 * @param  {Object} root object with information about the root schema for this schema
 * @param  {Object} localRefs the hash of local references inside the schema (created by resolve.id), used for inline resolution
 * @param  {String} baseId base ID for IDs in the schema
 * @return {Function} validation function
 */
function compile(schema, root, localRefs, baseId) {
  /* jshint validthis: true, evil: true */
  /* eslint no-shadow: 0 */
  var self = this,
      opts = this._opts,
      refVal = [undefined],
      refs = {},
      patterns = [],
      patternsHash = {},
      defaults = [],
      defaultsHash = {},
      customRules = [];

  root = root || { schema: schema, refVal: refVal, refs: refs };

  var c = checkCompiling.call(this, schema, root, baseId);
  var compilation = this._compilations[c.index];
  if (c.compiling) return compilation.callValidate = callValidate;

  var formats = this._formats;
  var RULES = this.RULES;

  try {
    var v = localCompile(schema, root, localRefs, baseId);
    compilation.validate = v;
    var cv = compilation.callValidate;
    if (cv) {
      cv.schema = v.schema;
      cv.errors = null;
      cv.refs = v.refs;
      cv.refVal = v.refVal;
      cv.root = v.root;
      cv.$async = v.$async;
      if (opts.sourceCode) cv.source = v.source;
    }
    return v;
  } finally {
    endCompiling.call(this, schema, root, baseId);
  }

  /* @this   {*} - custom context, see passContext option */
  function callValidate() {
    /* jshint validthis: true */
    var validate = compilation.validate;
    var result = validate.apply(this, arguments);
    callValidate.errors = validate.errors;
    return result;
  }

  function localCompile(_schema, _root, localRefs, baseId) {
    var isRoot = !_root || _root && _root.schema == _schema;
    if (_root.schema != root.schema) return compile.call(self, _schema, _root, localRefs, baseId);

    var $async = _schema.$async === true;

    var sourceCode = validateGenerator({
      isTop: true,
      schema: _schema,
      isRoot: isRoot,
      baseId: baseId,
      root: _root,
      schemaPath: '',
      errSchemaPath: '#',
      errorPath: '""',
      MissingRefError: errorClasses.MissingRef,
      RULES: RULES,
      validate: validateGenerator,
      util: util,
      resolve: resolve,
      resolveRef: resolveRef,
      usePattern: usePattern,
      useDefault: useDefault,
      useCustomRule: useCustomRule,
      opts: opts,
      formats: formats,
      logger: self.logger,
      self: self
    });

    sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode) + vars(defaults, defaultCode) + vars(customRules, customRuleCode) + sourceCode;

    if (opts.processCode) sourceCode = opts.processCode(sourceCode);
    // console.log('\n\n\n *** \n', JSON.stringify(sourceCode));
    var validate;
    try {
      var makeValidate = new Function('self', 'RULES', 'formats', 'root', 'refVal', 'defaults', 'customRules', 'equal', 'ucs2length', 'ValidationError', sourceCode);

      validate = makeValidate(self, RULES, formats, root, refVal, defaults, customRules, equal, ucs2length, ValidationError);

      refVal[0] = validate;
    } catch (e) {
      self.logger.error('Error compiling schema, function code:', sourceCode);
      throw e;
    }

    validate.schema = _schema;
    validate.errors = null;
    validate.refs = refs;
    validate.refVal = refVal;
    validate.root = isRoot ? validate : _root;
    if ($async) validate.$async = true;
    if (opts.sourceCode === true) {
      validate.source = {
        code: sourceCode,
        patterns: patterns,
        defaults: defaults
      };
    }

    return validate;
  }

  function resolveRef(baseId, ref, isRoot) {
    ref = resolve.url(baseId, ref);
    var refIndex = refs[ref];
    var _refVal, refCode;
    if (refIndex !== undefined) {
      _refVal = refVal[refIndex];
      refCode = 'refVal[' + refIndex + ']';
      return resolvedRef(_refVal, refCode);
    }
    if (!isRoot && root.refs) {
      var rootRefId = root.refs[ref];
      if (rootRefId !== undefined) {
        _refVal = root.refVal[rootRefId];
        refCode = addLocalRef(ref, _refVal);
        return resolvedRef(_refVal, refCode);
      }
    }

    refCode = addLocalRef(ref);
    var v = resolve.call(self, localCompile, root, ref);
    if (v === undefined) {
      var localSchema = localRefs && localRefs[ref];
      if (localSchema) {
        v = resolve.inlineRef(localSchema, opts.inlineRefs) ? localSchema : compile.call(self, localSchema, root, localRefs, baseId);
      }
    }

    if (v === undefined) {
      removeLocalRef(ref);
    } else {
      replaceLocalRef(ref, v);
      return resolvedRef(v, refCode);
    }
  }

  function addLocalRef(ref, v) {
    var refId = refVal.length;
    refVal[refId] = v;
    refs[ref] = refId;
    return 'refVal' + refId;
  }

  function removeLocalRef(ref) {
    delete refs[ref];
  }

  function replaceLocalRef(ref, v) {
    var refId = refs[ref];
    refVal[refId] = v;
  }

  function resolvedRef(refVal, code) {
    return (typeof refVal === 'undefined' ? 'undefined' : _typeof(refVal)) == 'object' || typeof refVal == 'boolean' ? { code: code, schema: refVal, inline: true } : { code: code, $async: refVal && !!refVal.$async };
  }

  function usePattern(regexStr) {
    var index = patternsHash[regexStr];
    if (index === undefined) {
      index = patternsHash[regexStr] = patterns.length;
      patterns[index] = regexStr;
    }
    return 'pattern' + index;
  }

  function useDefault(value) {
    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
      case 'boolean':
      case 'number':
        return '' + value;
      case 'string':
        return util.toQuotedString(value);
      case 'object':
        if (value === null) return 'null';
        var valueStr = stableStringify(value);
        var index = defaultsHash[valueStr];
        if (index === undefined) {
          index = defaultsHash[valueStr] = defaults.length;
          defaults[index] = value;
        }
        return 'default' + index;
    }
  }

  function useCustomRule(rule, schema, parentSchema, it) {
    var validateSchema = rule.definition.validateSchema;
    if (validateSchema && self._opts.validateSchema !== false) {
      var valid = validateSchema(schema);
      if (!valid) {
        var message = 'keyword schema is invalid: ' + self.errorsText(validateSchema.errors);
        if (self._opts.validateSchema == 'log') self.logger.error(message);else throw new Error(message);
      }
    }

    var compile = rule.definition.compile,
        inline = rule.definition.inline,
        macro = rule.definition.macro;

    var validate;
    if (compile) {
      validate = compile.call(self, schema, parentSchema, it);
    } else if (macro) {
      validate = macro.call(self, schema, parentSchema, it);
      if (opts.validateSchema !== false) self.validateSchema(validate, true);
    } else if (inline) {
      validate = inline.call(self, it, rule.keyword, schema, parentSchema);
    } else {
      validate = rule.definition.validate;
      if (!validate) return;
    }

    if (validate === undefined) throw new Error('custom keyword "' + rule.keyword + '"failed to compile');

    var index = customRules.length;
    customRules[index] = validate;

    return {
      code: 'customRule' + index,
      validate: validate
    };
  }
}

/**
 * Checks if the schema is currently compiled
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 * @return {Object} object with properties "index" (compilation index) and "compiling" (boolean)
 */
function checkCompiling(schema, root, baseId) {
  /* jshint validthis: true */
  var index = compIndex.call(this, schema, root, baseId);
  if (index >= 0) return { index: index, compiling: true };
  index = this._compilations.length;
  this._compilations[index] = {
    schema: schema,
    root: root,
    baseId: baseId
  };
  return { index: index, compiling: false };
}

/**
 * Removes the schema from the currently compiled list
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 */
function endCompiling(schema, root, baseId) {
  /* jshint validthis: true */
  var i = compIndex.call(this, schema, root, baseId);
  if (i >= 0) this._compilations.splice(i, 1);
}

/**
 * Index of schema compilation in the currently compiled list
 * @this   Ajv
 * @param  {Object} schema schema to compile
 * @param  {Object} root root object
 * @param  {String} baseId base schema ID
 * @return {Integer} compilation index
 */
function compIndex(schema, root, baseId) {
  /* jshint validthis: true */
  for (var i = 0; i < this._compilations.length; i++) {
    var c = this._compilations[i];
    if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
  }
  return -1;
}

function patternCode(i, patterns) {
  return 'var pattern' + i + ' = new RegExp(' + util.toQuotedString(patterns[i]) + ');';
}

function defaultCode(i) {
  return 'var default' + i + ' = defaults[' + i + '];';
}

function refValCode(i, refVal) {
  return refVal[i] === undefined ? '' : 'var refVal' + i + ' = refVal[' + i + '];';
}

function customRuleCode(i) {
  return 'var customRule' + i + ' = customRules[' + i + '];';
}

function vars(arr, statement) {
  if (!arr.length) return '';
  var code = '';
  for (var i = 0; i < arr.length; i++) {
    code += statement(i, arr);
  }return code;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** @license URI.js v4.2.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.URI = global.URI || {});
})(undefined, function (exports) {
    'use strict';

    function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
            sets[_key] = arguments[_key];
        }

        if (sets.length > 1) {
            sets[0] = sets[0].slice(0, -1);
            var xl = sets.length - 1;
            for (var x = 1; x < xl; ++x) {
                sets[x] = sets[x].slice(1, -1);
            }
            sets[xl] = sets[xl].slice(1);
            return sets.join('');
        } else {
            return sets[0];
        }
    }
    function subexp(str) {
        return "(?:" + str + ")";
    }
    function typeOf(o) {
        return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
    }
    function toUpperCase(str) {
        return str.toUpperCase();
    }
    function toArray(obj) {
        return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
    }
    function assign(target, source) {
        var obj = target;
        if (source) {
            for (var key in source) {
                obj[key] = source[key];
            }
        }
        return obj;
    }

    function buildExps(isIRI) {
        var ALPHA$$ = "[A-Za-z]",
            CR$ = "[\\x0D]",
            DIGIT$$ = "[0-9]",
            DQUOTE$$ = "[\\x22]",
            HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),

        //case-insensitive
        LF$$ = "[\\x0A]",
            SP$$ = "[\\x20]",
            PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),

        //expanded
        GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
            SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
            RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
            UCSCHAR$$ = isIRI ? '[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]' : "[]",

        //subset, excludes bidi control characters
        IPRIVATE$$ = isIRI ? '[\\uE000-\\uF8FF]' : "[]",

        //subset
        UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
            SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
            USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
            DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
            DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),

        //relaxed parsing rules
        IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
            H16$ = subexp(HEXDIG$$ + "{1,4}"),
            LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
            IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),

        //                           6( h16 ":" ) ls32
        IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),

        //                      "::" 5( h16 ":" ) ls32
        IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),

        //[               h16 ] "::" 4( h16 ":" ) ls32
        IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),

        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
        IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),

        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
        IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),

        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
        IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),

        //[ *4( h16 ":" ) h16 ] "::"              ls32
        IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),

        //[ *5( h16 ":" ) h16 ] "::"              h16
        IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),

        //[ *6( h16 ":" ) h16 ] "::"
        IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
            ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),

        //RFC 6874
        IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),

        //RFC 6874
        IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),

        //RFC 6874, with relaxed parsing rules
        IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
            IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),

        //RFC 6874
        REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
            HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
            PORT$ = subexp(DIGIT$$ + "*"),
            AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
            PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
            SEGMENT$ = subexp(PCHAR$ + "*"),
            SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
            SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
            PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
            PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),

        //simplified
        PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),

        //simplified
        PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),

        //simplified
        PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
            PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
            QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
            FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
            HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
            URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
            RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
            RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
            URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
            ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
            GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
            RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
            ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
            SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
            AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
            NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
            NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
            NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
            ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            UNRESERVED: new RegExp(UNRESERVED$$, "g"),
            OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
            PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
            IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
            IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
        };
    }
    var URI_PROTOCOL = buildExps(false);

    var IRI_PROTOCOL = buildExps(true);

    var slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var toConsumableArray = function toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }return arr2;
        } else {
            return Array.from(arr);
        }
    };

    /** Highest positive signed 32-bit float value */

    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128; // 0x80
    var delimiter = '-'; // '\x2D'

    /** Regular expressions */
    var regexPunycode = /^xn--/;
    var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

    /** Error messages */
    var errors = {
        'overflow': 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
    };

    /** Convenience shortcuts */
    var baseMinusTMin = base - tMin;
    var floor = Math.floor;
    var stringFromCharCode = String.fromCharCode;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error$1(type) {
        throw new RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
            result[length] = fn(array[length]);
        }
        return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
        var parts = string.split('@');
        var result = '';
        if (parts.length > 1) {
            // In email addresses, only the domain name should be punycoded. Leave
            // the local part (i.e. everything up to `@`) intact.
            result = parts[0] + '@';
            string = parts[1];
        }
        // Avoid `split(regex)` for IE8 compatibility. See #17.
        string = string.replace(regexSeparators, '\x2E');
        var labels = string.split('.');
        var encoded = map(labels, fn).join('.');
        return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
            var value = string.charCodeAt(counter++);
            if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                // It's a high surrogate, and there is a next character.
                var extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) {
                    // Low surrogate.
                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                    // It's an unmatched surrogate; only append this code unit, in case the
                    // next code unit is the high surrogate of a surrogate pair.
                    output.push(value);
                    counter--;
                }
            } else {
                output.push(value);
            }
        }
        return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    var ucs2encode = function ucs2encode(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
    };

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    var basicToDigit = function basicToDigit(codePoint) {
        if (codePoint - 0x30 < 0x0A) {
            return codePoint - 0x16;
        }
        if (codePoint - 0x41 < 0x1A) {
            return codePoint - 0x41;
        }
        if (codePoint - 0x61 < 0x1A) {
            return codePoint - 0x61;
        }
        return base;
    };

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    var digitToBasic = function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    var adapt = function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    var decode = function decode(input) {
        // Don't use UCS-2.
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;

        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.

        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
            basic = 0;
        }

        for (var j = 0; j < basic; ++j) {
            // if it's not a basic code point
            if (input.charCodeAt(j) >= 0x80) {
                error$1('not-basic');
            }
            output.push(input.charCodeAt(j));
        }

        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.

        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

            // `index` is the index of the next character to be consumed.
            // Decode a generalized variable-length integer into `delta`,
            // which gets added to `i`. The overflow checking is easier
            // if we increase `i` as we go, then subtract off its starting
            // value at the end to obtain `delta`.
            var oldi = i;
            for (var w = 1, k = base;; /* no condition */k += base) {

                if (index >= inputLength) {
                    error$1('invalid-input');
                }

                var digit = basicToDigit(input.charCodeAt(index++));

                if (digit >= base || digit > floor((maxInt - i) / w)) {
                    error$1('overflow');
                }

                i += digit * w;
                var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

                if (digit < t) {
                    break;
                }

                var baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                    error$1('overflow');
                }

                w *= baseMinusT;
            }

            var out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);

            // `i` was supposed to wrap around from `out` to `0`,
            // incrementing `n` each time, so we'll fix that now:
            if (floor(i / out) > maxInt - n) {
                error$1('overflow');
            }

            n += floor(i / out);
            i %= out;

            // Insert `n` at position `i` of the output.
            output.splice(i++, 0, n);
        }

        return String.fromCodePoint.apply(String, output);
    };

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    var encode = function encode(input) {
        var output = [];

        // Convert the input in UCS-2 to an array of Unicode code points.
        input = ucs2decode(input);

        // Cache the length.
        var inputLength = input.length;

        // Initialize the state.
        var n = initialN;
        var delta = 0;
        var bias = initialBias;

        // Handle the basic code points.
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _currentValue2 = _step.value;

                if (_currentValue2 < 0x80) {
                    output.push(stringFromCharCode(_currentValue2));
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var basicLength = output.length;
        var handledCPCount = basicLength;

        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.

        // Finish the basic string with a delimiter unless it's empty.
        if (basicLength) {
            output.push(delimiter);
        }

        // Main encoding loop:
        while (handledCPCount < inputLength) {

            // All non-basic code points < n have been handled already. Find the next
            // larger one:
            var m = maxInt;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var currentValue = _step2.value;

                    if (currentValue >= n && currentValue < m) {
                        m = currentValue;
                    }
                }

                // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                // but guard against overflow.
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error$1('overflow');
            }

            delta += (m - n) * handledCPCountPlusOne;
            n = m;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _currentValue = _step3.value;

                    if (_currentValue < n && ++delta > maxInt) {
                        error$1('overflow');
                    }
                    if (_currentValue == n) {
                        // Represent delta as a generalized variable-length integer.
                        var q = delta;
                        for (var k = base;; /* no condition */k += base) {
                            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                            if (q < t) {
                                break;
                            }
                            var qMinusT = q - t;
                            var baseMinusT = base - t;
                            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                            q = floor(qMinusT / baseMinusT);
                        }

                        output.push(stringFromCharCode(digitToBasic(q, 0)));
                        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                        delta = 0;
                        ++handledCPCount;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            ++delta;
            ++n;
        }
        return output.join('');
    };

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    var toUnicode = function toUnicode(input) {
        return mapDomain(input, function (string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
    };

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    var toASCII = function toASCII(input) {
        return mapDomain(input, function (string) {
            return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
        });
    };

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        'version': '2.1.0',
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        'ucs2': {
            'decode': ucs2decode,
            'encode': ucs2encode
        },
        'decode': decode,
        'encode': encode,
        'toASCII': toASCII,
        'toUnicode': toUnicode
    };

    /**
     * URI.js
     *
     * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/uri-js
     */
    /**
     * Copyright 2011 Gary Court. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification, are
     * permitted provided that the following conditions are met:
     *
     *    1. Redistributions of source code must retain the above copyright notice, this list of
     *       conditions and the following disclaimer.
     *
     *    2. Redistributions in binary form must reproduce the above copyright notice, this list
     *       of conditions and the following disclaimer in the documentation and/or other materials
     *       provided with the distribution.
     *
     * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
     * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
     * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
     * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     * The views and conclusions contained in the software and documentation are those of the
     * authors and should not be interpreted as representing official policies, either expressed
     * or implied, of Gary Court.
     */
    var SCHEMES = {};
    function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
    }
    function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
            var c = parseInt(str.substr(i + 1, 2), 16);
            if (c < 128) {
                newStr += String.fromCharCode(c);
                i += 3;
            } else if (c >= 194 && c < 224) {
                if (il - i >= 6) {
                    var c2 = parseInt(str.substr(i + 4, 2), 16);
                    newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
                } else {
                    newStr += str.substr(i, 6);
                }
                i += 6;
            } else if (c >= 224) {
                if (il - i >= 9) {
                    var _c = parseInt(str.substr(i + 4, 2), 16);
                    var c3 = parseInt(str.substr(i + 7, 2), 16);
                    newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
                } else {
                    newStr += str.substr(i, 9);
                }
                i += 9;
            } else {
                newStr += str.substr(i, 3);
                i += 3;
            }
        }
        return newStr;
    }
    function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved(str) {
            var decStr = pctDecChars(str);
            return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
    }

    function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
    }
    function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];

        var _matches = slicedToArray(matches, 2),
            address = _matches[1];

        if (address) {
            return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
            return host;
        }
    }
    function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];

        var _matches2 = slicedToArray(matches, 3),
            address = _matches2[1],
            zone = _matches2[2];

        if (address) {
            var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
                _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
                last = _address$toLowerCase$2[0],
                first = _address$toLowerCase$2[1];

            var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
            var lastFields = last.split(":").map(_stripLeadingZeros);
            var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
            var fieldCount = isLastFieldIPv4Address ? 7 : 8;
            var lastFieldsStart = lastFields.length - fieldCount;
            var fields = Array(fieldCount);
            for (var x = 0; x < fieldCount; ++x) {
                fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
            }
            if (isLastFieldIPv4Address) {
                fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
            }
            var allZeroFields = fields.reduce(function (acc, field, index) {
                if (!field || field === "0") {
                    var lastLongest = acc[acc.length - 1];
                    if (lastLongest && lastLongest.index + lastLongest.length === index) {
                        lastLongest.length++;
                    } else {
                        acc.push({ index: index, length: 1 });
                    }
                }
                return acc;
            }, []);
            var longestZeroFields = allZeroFields.sort(function (a, b) {
                return b.length - a.length;
            })[0];
            var newHost = void 0;
            if (longestZeroFields && longestZeroFields.length > 1) {
                var newFirst = fields.slice(0, longestZeroFields.index);
                var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
                newHost = newFirst.join(":") + "::" + newLast.join(":");
            } else {
                newHost = fields.join(":");
            }
            if (zone) {
                newHost += "%" + zone;
            }
            return newHost;
        } else {
            return host;
        }
    }
    var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
    var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
    function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
            if (NO_MATCH_IS_UNDEFINED) {
                //store each component
                components.scheme = matches[1];
                components.userinfo = matches[3];
                components.host = matches[4];
                components.port = parseInt(matches[5], 10);
                components.path = matches[6] || "";
                components.query = matches[7];
                components.fragment = matches[8];
                //fix port number
                if (isNaN(components.port)) {
                    components.port = matches[5];
                }
            } else {
                //IE FIX for improper RegExp matching
                //store each component
                components.scheme = matches[1] || undefined;
                components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
                components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
                components.port = parseInt(matches[5], 10);
                components.path = matches[6] || "";
                components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
                components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
                //fix port number
                if (isNaN(components.port)) {
                    components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
                }
            }
            if (components.host) {
                //normalize IP hosts
                components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
            }
            //determine reference type
            if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
                components.reference = "same-document";
            } else if (components.scheme === undefined) {
                components.reference = "relative";
            } else if (components.fragment === undefined) {
                components.reference = "absolute";
            } else {
                components.reference = "uri";
            }
            //check for reference errors
            if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
                components.error = components.error || "URI is not a " + options.reference + " reference.";
            }
            //find scheme handler
            var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
            //check if scheme can't handle IRIs
            if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
                //if host component is a domain name
                if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                    //convert Unicode IDN -> ASCII IDN
                    try {
                        components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                    } catch (e) {
                        components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                    }
                }
                //convert IRI -> URI
                _normalizeComponentEncoding(components, URI_PROTOCOL);
            } else {
                //normalize encodings
                _normalizeComponentEncoding(components, protocol);
            }
            //perform scheme specific parsing
            if (schemeHandler && schemeHandler.parse) {
                schemeHandler.parse(components, options);
            }
        } else {
            components.error = components.error || "URI can not be parsed.";
        }
        return components;
    }

    function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== undefined) {
            uriTokens.push(components.userinfo);
            uriTokens.push("@");
        }
        if (components.host !== undefined) {
            //normalize IP hosts, add brackets and escape zone separator for IPv6
            uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
                return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
            }));
        }
        if (typeof components.port === "number") {
            uriTokens.push(":");
            uriTokens.push(components.port.toString(10));
        }
        return uriTokens.length ? uriTokens.join("") : undefined;
    }

    var RDS1 = /^\.\.?\//;
    var RDS2 = /^\/\.(\/|$)/;
    var RDS3 = /^\/\.\.(\/|$)/;
    var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
    function removeDotSegments(input) {
        var output = [];
        while (input.length) {
            if (input.match(RDS1)) {
                input = input.replace(RDS1, "");
            } else if (input.match(RDS2)) {
                input = input.replace(RDS2, "/");
            } else if (input.match(RDS3)) {
                input = input.replace(RDS3, "/");
                output.pop();
            } else if (input === "." || input === "..") {
                input = "";
            } else {
                var im = input.match(RDS5);
                if (im) {
                    var s = im[0];
                    input = input.slice(s.length);
                    output.push(s);
                } else {
                    throw new Error("Unexpected dot segment condition");
                }
            }
        }
        return output.join("");
    }

    function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //perform scheme specific serialization
        if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
        if (components.host) {
            //if host component is an IPv6 address
            if (protocol.IPV6ADDRESS.test(components.host)) {}
            //TODO: normalize IPv6 address as per RFC 5952

            //if host component is a domain name
            else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                    //convert IDN via punycode
                    try {
                        components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                    } catch (e) {
                        components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                    }
                }
        }
        //normalize encoding
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
            uriTokens.push(components.scheme);
            uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== undefined) {
            if (options.reference !== "suffix") {
                uriTokens.push("//");
            }
            uriTokens.push(authority);
            if (components.path && components.path.charAt(0) !== "/") {
                uriTokens.push("/");
            }
        }
        if (components.path !== undefined) {
            var s = components.path;
            if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
                s = removeDotSegments(s);
            }
            if (authority === undefined) {
                s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
            }
            uriTokens.push(s);
        }
        if (components.query !== undefined) {
            uriTokens.push("?");
            uriTokens.push(components.query);
        }
        if (components.fragment !== undefined) {
            uriTokens.push("#");
            uriTokens.push(components.fragment);
        }
        return uriTokens.join(""); //merge tokens into a string
    }

    function resolveComponents(base, relative) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var skipNormalization = arguments[3];

        var target = {};
        if (!skipNormalization) {
            base = parse(serialize(base, options), options); //normalize base components
            relative = parse(serialize(relative, options), options); //normalize relative components
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
            target.scheme = relative.scheme;
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
                //target.authority = relative.authority;
                target.userinfo = relative.userinfo;
                target.host = relative.host;
                target.port = relative.port;
                target.path = removeDotSegments(relative.path || "");
                target.query = relative.query;
            } else {
                if (!relative.path) {
                    target.path = base.path;
                    if (relative.query !== undefined) {
                        target.query = relative.query;
                    } else {
                        target.query = base.query;
                    }
                } else {
                    if (relative.path.charAt(0) === "/") {
                        target.path = removeDotSegments(relative.path);
                    } else {
                        if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                            target.path = "/" + relative.path;
                        } else if (!base.path) {
                            target.path = relative.path;
                        } else {
                            target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                        }
                        target.path = removeDotSegments(target.path);
                    }
                    target.query = relative.query;
                }
                //target.authority = base.authority;
                target.userinfo = base.userinfo;
                target.host = base.host;
                target.port = base.port;
            }
            target.scheme = base.scheme;
        }
        target.fragment = relative.fragment;
        return target;
    }

    function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: 'null' }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
    }

    function normalize(uri, options) {
        if (typeof uri === "string") {
            uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
            uri = parse(serialize(uri, options), options);
        }
        return uri;
    }

    function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
            uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
            uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
            uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
            uriB = serialize(uriB, options);
        }
        return uriA === uriB;
    }

    function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
    }

    function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
    }

    var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse(components, options) {
            //report missing host
            if (!components.host) {
                components.error = components.error || "HTTP URIs must have a host.";
            }
            return components;
        },
        serialize: function serialize(components, options) {
            //normalize the default port
            if (components.port === (String(components.scheme).toLowerCase() !== "https" ? 80 : 443) || components.port === "") {
                components.port = undefined;
            }
            //normalize the empty path
            if (!components.path) {
                components.path = "/";
            }
            //NOTE: We do not parse query strings for HTTP URIs
            //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
            //and not the HTTP spec.
            return components;
        }
    };

    var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
    };

    var O = {};
    var isIRI = true;
    //RFC 3986
    var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? '\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF' : "") + "]";
    var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
    var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
    //RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
    //const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
    //const WSP$$ = "[\\x20\\x09]";
    //const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
    //const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
    //const VCHAR$$ = "[\\x21-\\x7E]";
    //const WSP$$ = "[\\x20\\x09]";
    //const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
    //const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
    //const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
    //const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
    var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
    var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
    var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
    var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
    var UNRESERVED = new RegExp(UNRESERVED$$, "g");
    var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
    var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
    var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
    var NOT_HFVALUE = NOT_HFNAME;
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
    }
    var handler$2 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
            var mailtoComponents = components;
            var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
            mailtoComponents.path = undefined;
            if (mailtoComponents.query) {
                var unknownHeaders = false;
                var headers = {};
                var hfields = mailtoComponents.query.split("&");
                for (var x = 0, xl = hfields.length; x < xl; ++x) {
                    var hfield = hfields[x].split("=");
                    switch (hfield[0]) {
                        case "to":
                            var toAddrs = hfield[1].split(",");
                            for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                                to.push(toAddrs[_x]);
                            }
                            break;
                        case "subject":
                            mailtoComponents.subject = unescapeComponent(hfield[1], options);
                            break;
                        case "body":
                            mailtoComponents.body = unescapeComponent(hfield[1], options);
                            break;
                        default:
                            unknownHeaders = true;
                            headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                            break;
                    }
                }
                if (unknownHeaders) mailtoComponents.headers = headers;
            }
            mailtoComponents.query = undefined;
            for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
                var addr = to[_x2].split("@");
                addr[0] = unescapeComponent(addr[0]);
                if (!options.unicodeSupport) {
                    //convert Unicode IDN -> ASCII IDN
                    try {
                        addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                    } catch (e) {
                        mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                    }
                } else {
                    addr[1] = unescapeComponent(addr[1], options).toLowerCase();
                }
                to[_x2] = addr.join("@");
            }
            return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
            var components = mailtoComponents;
            var to = toArray(mailtoComponents.to);
            if (to) {
                for (var x = 0, xl = to.length; x < xl; ++x) {
                    var toAddr = String(to[x]);
                    var atIdx = toAddr.lastIndexOf("@");
                    var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                    var domain = toAddr.slice(atIdx + 1);
                    //convert IDN via punycode
                    try {
                        domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                    } catch (e) {
                        components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                    }
                    to[x] = localPart + "@" + domain;
                }
                components.path = to.join(",");
            }
            var headers = mailtoComponents.headers = mailtoComponents.headers || {};
            if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
            if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
            var fields = [];
            for (var name in headers) {
                if (headers[name] !== O[name]) {
                    fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
                }
            }
            if (fields.length) {
                components.query = fields.join("&");
            }
            return components;
        }
    };

    var URN_PARSE = /^([^\:]+)\:(.*)/;
    //RFC 2141
    var handler$3 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
            var matches = components.path && components.path.match(URN_PARSE);
            var urnComponents = components;
            if (matches) {
                var scheme = options.scheme || urnComponents.scheme || "urn";
                var nid = matches[1].toLowerCase();
                var nss = matches[2];
                var urnScheme = scheme + ":" + (options.nid || nid);
                var schemeHandler = SCHEMES[urnScheme];
                urnComponents.nid = nid;
                urnComponents.nss = nss;
                urnComponents.path = undefined;
                if (schemeHandler) {
                    urnComponents = schemeHandler.parse(urnComponents, options);
                }
            } else {
                urnComponents.error = urnComponents.error || "URN can not be parsed.";
            }
            return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = urnComponents.nid;
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            if (schemeHandler) {
                urnComponents = schemeHandler.serialize(urnComponents, options);
            }
            var uriComponents = urnComponents;
            var nss = urnComponents.nss;
            uriComponents.path = (nid || options.nid) + ":" + nss;
            return uriComponents;
        }
    };

    var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
    //RFC 4122
    var handler$4 = {
        scheme: "urn:uuid",
        parse: function parse(urnComponents, options) {
            var uuidComponents = urnComponents;
            uuidComponents.uuid = uuidComponents.nss;
            uuidComponents.nss = undefined;
            if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
                uuidComponents.error = uuidComponents.error || "UUID is not valid.";
            }
            return uuidComponents;
        },
        serialize: function serialize(uuidComponents, options) {
            var urnComponents = uuidComponents;
            //normalize UUID
            urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
            return urnComponents;
        }
    };

    SCHEMES[handler.scheme] = handler;
    SCHEMES[handler$1.scheme] = handler$1;
    SCHEMES[handler$2.scheme] = handler$2;
    SCHEMES[handler$3.scheme] = handler$3;
    SCHEMES[handler$4.scheme] = handler$4;

    exports.SCHEMES = SCHEMES;
    exports.pctEncChar = pctEncChar;
    exports.pctDecChars = pctDecChars;
    exports.parse = parse;
    exports.removeDotSegments = removeDotSegments;
    exports.serialize = serialize;
    exports.resolveComponents = resolveComponents;
    exports.resolve = resolve;
    exports.normalize = normalize;
    exports.equal = equal;
    exports.escapeComponent = escapeComponent;
    exports.unescapeComponent = unescapeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=uri.all.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode

module.exports = function ucs2length(str) {
  var length = 0,
      len = str.length,
      pos = 0,
      value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
      // high surrogate, and there is a next character
      value = str.charCodeAt(pos);
      if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
    }
  }
  return length;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = typeof cb == 'function' ? cb : cb.pre || function () {};
  var post = cb.post || function () {};

  _traverse(opts, pre, post, schema, '', schema);
};

traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};

function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && (typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i = 0; i < sch.length; i++) {
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
          }
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && (typeof sch === 'undefined' ? 'undefined' : _typeof(sch)) == 'object') {
          for (var prop in sch) {
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
          }
        }
      } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}

function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cache = module.exports = function Cache() {
  this._cache = {};
};

Cache.prototype.put = function Cache_put(key, value) {
  this._cache[key] = value;
};

Cache.prototype.get = function Cache_get(key) {
  return this._cache[key];
};

Cache.prototype.del = function Cache_del(key) {
  delete this._cache[key];
};

Cache.prototype.clear = function Cache_clear() {
  this._cache = {};
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(4);

var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i;
var HOSTNAME = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
// uri-template: https://tools.ietf.org/html/rfc6570
var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
// For the source: https://gist.github.com/dperini/729294
// For test cases: https://mathiasbynens.be/demo/url-regex
// @todo Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
// var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
var URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;

module.exports = formats;

function formats(mode) {
  mode = mode == 'full' ? 'full' : 'fast';
  return util.copy(formats[mode]);
}

formats.fast = {
  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,
  'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,
  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
  uri: /^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i,
  'uri-reference': /^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
  'uri-template': URITEMPLATE,
  url: URL,
  // email (sources from jsen validator):
  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
  email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  hostname: HOSTNAME,
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
  regex: regex,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: UUID,
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  'json-pointer': JSON_POINTER,
  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  'relative-json-pointer': RELATIVE_JSON_POINTER
};

formats.full = {
  date: date,
  time: time,
  'date-time': date_time,
  uri: uri,
  'uri-reference': URIREF,
  'uri-template': URITEMPLATE,
  url: URL,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: hostname,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
  regex: regex,
  uuid: UUID,
  'json-pointer': JSON_POINTER,
  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
  'relative-json-pointer': RELATIVE_JSON_POINTER
};

function isLeapYear(year) {
  // https://tools.ietf.org/html/rfc3339#appendix-C
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function date(str) {
  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
  var matches = str.match(DATE);
  if (!matches) return false;

  var year = +matches[1];
  var month = +matches[2];
  var day = +matches[3];

  return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
}

function time(str, full) {
  var matches = str.match(TIME);
  if (!matches) return false;

  var hour = matches[1];
  var minute = matches[2];
  var second = matches[3];
  var timeZone = matches[5];
  return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
}

var DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
  // http://tools.ietf.org/html/rfc3339#section-5.6
  var dateTime = str.split(DATE_TIME_SEPARATOR);
  return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
}

function hostname(str) {
  // https://tools.ietf.org/html/rfc1034#section-3.5
  // https://tools.ietf.org/html/rfc1123#section-2
  return str.length <= 255 && HOSTNAME.test(str);
}

var NOT_URI_FRAGMENT = /\/|:/;
function uri(str) {
  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}

var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str)) return false;
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ruleModules = __webpack_require__(52),
    toHash = __webpack_require__(4).toHash;

module.exports = function rules() {
  var RULES = [{ type: 'number',
    rules: [{ 'maximum': ['exclusiveMaximum'] }, { 'minimum': ['exclusiveMinimum'] }, 'multipleOf', 'format'] }, { type: 'string',
    rules: ['maxLength', 'minLength', 'pattern', 'format'] }, { type: 'array',
    rules: ['maxItems', 'minItems', 'items', 'contains', 'uniqueItems'] }, { type: 'object',
    rules: ['maxProperties', 'minProperties', 'required', 'dependencies', 'propertyNames', { 'properties': ['additionalProperties', 'patternProperties'] }] }, { rules: ['$ref', 'const', 'enum', 'not', 'anyOf', 'oneOf', 'allOf', 'if'] }];

  var ALL = ['type', '$comment'];
  var KEYWORDS = ['$schema', '$id', 'id', '$data', 'title', 'description', 'default', 'definitions', 'examples', 'readOnly', 'writeOnly', 'contentMediaType', 'contentEncoding', 'additionalItems', 'then', 'else'];
  var TYPES = ['number', 'integer', 'string', 'array', 'object', 'boolean', 'null'];
  RULES.all = toHash(ALL);
  RULES.types = toHash(TYPES);

  RULES.forEach(function (group) {
    group.rules = group.rules.map(function (keyword) {
      var implKeywords;
      if ((typeof keyword === 'undefined' ? 'undefined' : _typeof(keyword)) == 'object') {
        var key = Object.keys(keyword)[0];
        implKeywords = keyword[key];
        keyword = key;
        implKeywords.forEach(function (k) {
          ALL.push(k);
          RULES.all[k] = true;
        });
      }
      ALL.push(keyword);
      var rule = RULES.all[keyword] = {
        keyword: keyword,
        code: ruleModules[keyword],
        implements: implKeywords
      };
      return rule;
    });

    RULES.all.$comment = {
      keyword: '$comment',
      code: ruleModules.$comment
    };

    if (group.type) RULES.types[group.type] = group;
  });

  RULES.keywords = toHash(ALL.concat(KEYWORDS));
  RULES.custom = {};

  return RULES;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//all requires must be explicit because browserify won't work with dynamic requires

module.exports = {
  '$ref': __webpack_require__(53),
  allOf: __webpack_require__(54),
  anyOf: __webpack_require__(55),
  '$comment': __webpack_require__(56),
  const: __webpack_require__(57),
  contains: __webpack_require__(58),
  dependencies: __webpack_require__(59),
  'enum': __webpack_require__(60),
  format: __webpack_require__(61),
  'if': __webpack_require__(62),
  items: __webpack_require__(63),
  maximum: __webpack_require__(18),
  minimum: __webpack_require__(18),
  maxItems: __webpack_require__(19),
  minItems: __webpack_require__(19),
  maxLength: __webpack_require__(20),
  minLength: __webpack_require__(20),
  maxProperties: __webpack_require__(21),
  minProperties: __webpack_require__(21),
  multipleOf: __webpack_require__(64),
  not: __webpack_require__(65),
  oneOf: __webpack_require__(66),
  pattern: __webpack_require__(67),
  properties: __webpack_require__(68),
  propertyNames: __webpack_require__(69),
  required: __webpack_require__(70),
  uniqueItems: __webpack_require__(71),
  validate: __webpack_require__(17)
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_ref(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $async, $refCode;
  if ($schema == '#' || $schema == '#/') {
    if (it.isRoot) {
      $async = it.async;
      $refCode = 'validate';
    } else {
      $async = it.root.schema.$async === true;
      $refCode = 'root.refVal[0]';
    }
  } else {
    var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);
    if ($refVal === undefined) {
      var $message = it.MissingRefError.message(it.baseId, $schema);
      if (it.opts.missingRefs == 'fail') {
        it.logger.error($message);
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + '$ref' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { ref: \'' + it.util.escapeQuotes($schema) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'can\\\'t resolve reference ' + it.util.escapeQuotes($schema) + '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: ' + it.util.toQuotedString($schema) + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + __err + ']); ';
          } else {
            out += ' validate.errors = [' + __err + ']; return false; ';
          }
        } else {
          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        if ($breakOnError) {
          out += ' if (false) { ';
        }
      } else if (it.opts.missingRefs == 'ignore') {
        it.logger.warn($message);
        if ($breakOnError) {
          out += ' if (true) { ';
        }
      } else {
        throw new it.MissingRefError(it.baseId, $schema, $message);
      }
    } else if ($refVal.inline) {
      var $it = it.util.copy(it);
      $it.level++;
      var $nextValid = 'valid' + $it.level;
      $it.schema = $refVal.schema;
      $it.schemaPath = '';
      $it.errSchemaPath = $schema;
      var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
      out += ' ' + $code + ' ';
      if ($breakOnError) {
        out += ' if (' + $nextValid + ') { ';
      }
    } else {
      $async = $refVal.$async === true || it.async && $refVal.$async !== false;
      $refCode = $refVal.code;
    }
  }
  if ($refCode) {
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    if (it.opts.passContext) {
      out += ' ' + $refCode + '.call(this, ';
    } else {
      out += ' ' + $refCode + '( ';
    }
    out += ' ' + $data + ', (dataPath || \'\')';
    if (it.errorPath != '""') {
      out += ' + ' + it.errorPath;
    }
    var $parentData = $dataLvl ? 'data' + ($dataLvl - 1 || '') : 'parentData',
        $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
    out += ' , ' + $parentData + ' , ' + $parentDataProperty + ', rootData)  ';
    var __callValidate = out;
    out = $$outStack.pop();
    if ($async) {
      if (!it.async) throw new Error('async schema referenced by sync schema');
      if ($breakOnError) {
        out += ' var ' + $valid + '; ';
      }
      out += ' try { await ' + __callValidate + '; ';
      if ($breakOnError) {
        out += ' ' + $valid + ' = true; ';
      }
      out += ' } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ';
      if ($breakOnError) {
        out += ' ' + $valid + ' = false; ';
      }
      out += ' } ';
      if ($breakOnError) {
        out += ' if (' + $valid + ') { ';
      }
    } else {
      out += ' if (!' + __callValidate + ') { if (vErrors === null) vErrors = ' + $refCode + '.errors; else vErrors = vErrors.concat(' + $refCode + '.errors); errors = vErrors.length; } ';
      if ($breakOnError) {
        out += ' else { ';
      }
    }
  }
  return out;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_allOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $currentBaseId = $it.baseId,
      $allSchemasEmpty = true;
  var arr1 = $schema;
  if (arr1) {
    var $sch,
        $i = -1,
        l1 = arr1.length - 1;
    while ($i < l1) {
      $sch = arr1[$i += 1];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $allSchemasEmpty = false;
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + it.validate($it) + ' ';
        $it.baseId = $currentBaseId;
        if ($breakOnError) {
          out += ' if (' + $nextValid + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  if ($breakOnError) {
    if ($allSchemasEmpty) {
      out += ' if (true) { ';
    } else {
      out += ' ' + $closingBraces.slice(0, -1) + ' ';
    }
  }
  out = it.util.cleanUpCode(out);
  return out;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_anyOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $noEmptySchema = $schema.every(function ($sch) {
    return it.util.schemaHasRules($sch, it.RULES.all);
  });
  if ($noEmptySchema) {
    var $currentBaseId = $it.baseId;
    out += ' var ' + $errs + ' = errors; var ' + $valid + ' = false;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var arr1 = $schema;
    if (arr1) {
      var $sch,
          $i = -1,
          l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + it.validate($it) + ' ';
        $it.baseId = $currentBaseId;
        out += ' ' + $valid + ' = ' + $valid + ' || ' + $nextValid + '; if (!' + $valid + ') { ';
        $closingBraces += '}';
      }
    }
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + $closingBraces + ' if (!' + $valid + ') {   var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + 'anyOf' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should match some schema in anyOf\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError(vErrors); ';
      } else {
        out += ' validate.errors = vErrors; return false; ';
      }
    }
    out += ' } else {  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; } ';
    if (it.opts.allErrors) {
      out += ' } ';
    }
    out = it.util.cleanUpCode(out);
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_comment(it, $keyword, $ruleType) {
  var out = ' ';
  var $schema = it.schema[$keyword];
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $comment = it.util.toQuotedString($schema);
  if (it.opts.$comment === true) {
    out += ' console.log(' + $comment + ');';
  } else if (typeof it.opts.$comment == 'function') {
    out += ' self._opts.$comment(' + $comment + ', ' + it.util.toQuotedString($errSchemaPath) + ', validate.root.schema);';
  }
  return out;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_const(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if (!$isData) {
    out += ' var schema' + $lvl + ' = validate.schema' + $schemaPath + ';';
  }
  out += 'var ' + $valid + ' = equal(' + $data + ', schema' + $lvl + '); if (!' + $valid + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'const' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { allowedValue: schema' + $lvl + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be equal to constant\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' }';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_contains(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $idx = 'i' + $lvl,
      $dataNxt = $it.dataLevel = it.dataLevel + 1,
      $nextData = 'data' + $dataNxt,
      $currentBaseId = it.baseId,
      $nonEmptySchema = it.util.schemaHasRules($schema, it.RULES.all);
  out += 'var ' + $errs + ' = errors;var ' + $valid + ';';
  if ($nonEmptySchema) {
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + $nextValid + ' = false; for (var ' + $idx + ' = 0; ' + $idx + ' < ' + $data + '.length; ' + $idx + '++) { ';
    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
    var $passData = $data + '[' + $idx + ']';
    $it.dataPathArr[$dataNxt] = $idx;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
    } else {
      out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
    }
    out += ' if (' + $nextValid + ') break; }  ';
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + $closingBraces + ' if (!' + $nextValid + ') {';
  } else {
    out += ' if (' + $data + '.length == 0) {';
  }
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'contains' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should contain a valid item\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } else { ';
  if ($nonEmptySchema) {
    out += '  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; } ';
  }
  if (it.opts.allErrors) {
    out += ' } ';
  }
  out = it.util.cleanUpCode(out);
  return out;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_dependencies(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $schemaDeps = {},
      $propertyDeps = {},
      $ownProperties = it.opts.ownProperties;
  for ($property in $schema) {
    var $sch = $schema[$property];
    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
    $deps[$property] = $sch;
  }
  out += 'var ' + $errs + ' = errors;';
  var $currentErrorPath = it.errorPath;
  out += 'var missing' + $lvl + ';';
  for (var $property in $propertyDeps) {
    $deps = $propertyDeps[$property];
    if ($deps.length) {
      out += ' if ( ' + $data + it.util.getProperty($property) + ' !== undefined ';
      if ($ownProperties) {
        out += ' && Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($property) + '\') ';
      }
      if ($breakOnError) {
        out += ' && ( ';
        var arr1 = $deps;
        if (arr1) {
          var $propertyKey,
              $i = -1,
              l1 = arr1.length - 1;
          while ($i < l1) {
            $propertyKey = arr1[$i += 1];
            if ($i) {
              out += ' || ';
            }
            var $prop = it.util.getProperty($propertyKey),
                $useData = $data + $prop;
            out += ' ( ( ' + $useData + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
            }
            out += ') && (missing' + $lvl + ' = ' + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ') ) ';
          }
        }
        out += ')) {  ';
        var $propertyPath = 'missing' + $lvl,
            $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
        }
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + 'dependencies' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { property: \'' + it.util.escapeQuotes($property) + '\', missingProperty: \'' + $missingProperty + '\', depsCount: ' + $deps.length + ', deps: \'' + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'should have ';
            if ($deps.length == 1) {
              out += 'property ' + it.util.escapeQuotes($deps[0]);
            } else {
              out += 'properties ' + it.util.escapeQuotes($deps.join(", "));
            }
            out += ' when property ' + it.util.escapeQuotes($property) + ' is present\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + __err + ']); ';
          } else {
            out += ' validate.errors = [' + __err + ']; return false; ';
          }
        } else {
          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
      } else {
        out += ' ) { ';
        var arr2 = $deps;
        if (arr2) {
          var $propertyKey,
              i2 = -1,
              l2 = arr2.length - 1;
          while (i2 < l2) {
            $propertyKey = arr2[i2 += 1];
            var $prop = it.util.getProperty($propertyKey),
                $missingProperty = it.util.escapeQuotes($propertyKey),
                $useData = $data + $prop;
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
            }
            out += ' if ( ' + $useData + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
            }
            out += ') {  var err =   '; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + 'dependencies' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { property: \'' + it.util.escapeQuotes($property) + '\', missingProperty: \'' + $missingProperty + '\', depsCount: ' + $deps.length + ', deps: \'' + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'should have ';
                if ($deps.length == 1) {
                  out += 'property ' + it.util.escapeQuotes($deps[0]);
                } else {
                  out += 'properties ' + it.util.escapeQuotes($deps.join(", "));
                }
                out += ' when property ' + it.util.escapeQuotes($property) + ' is present\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
          }
        }
      }
      out += ' }   ';
      if ($breakOnError) {
        $closingBraces += '}';
        out += ' else { ';
      }
    }
  }
  it.errorPath = $currentErrorPath;
  var $currentBaseId = $it.baseId;
  for (var $property in $schemaDeps) {
    var $sch = $schemaDeps[$property];
    if (it.util.schemaHasRules($sch, it.RULES.all)) {
      out += ' ' + $nextValid + ' = true; if ( ' + $data + it.util.getProperty($property) + ' !== undefined ';
      if ($ownProperties) {
        out += ' && Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($property) + '\') ';
      }
      out += ') { ';
      $it.schema = $sch;
      $it.schemaPath = $schemaPath + it.util.getProperty($property);
      $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
      out += '  ' + it.validate($it) + ' ';
      $it.baseId = $currentBaseId;
      out += ' }  ';
      if ($breakOnError) {
        out += ' if (' + $nextValid + ') { ';
        $closingBraces += '}';
      }
    }
  }
  if ($breakOnError) {
    out += '   ' + $closingBraces + ' if (' + $errs + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_enum(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $i = 'i' + $lvl,
      $vSchema = 'schema' + $lvl;
  if (!$isData) {
    out += ' var ' + $vSchema + ' = validate.schema' + $schemaPath + ';';
  }
  out += 'var ' + $valid + ';';
  if ($isData) {
    out += ' if (schema' + $lvl + ' === undefined) ' + $valid + ' = true; else if (!Array.isArray(schema' + $lvl + ')) ' + $valid + ' = false; else {';
  }
  out += '' + $valid + ' = false;for (var ' + $i + '=0; ' + $i + '<' + $vSchema + '.length; ' + $i + '++) if (equal(' + $data + ', ' + $vSchema + '[' + $i + '])) { ' + $valid + ' = true; break; }';
  if ($isData) {
    out += '  }  ';
  }
  out += ' if (!' + $valid + ') {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'enum' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { allowedValues: schema' + $lvl + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be equal to one of the allowed values\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' }';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function generate_format(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  if (it.opts.format === false) {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
    return out;
  }
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $unknownFormats = it.opts.unknownFormats,
      $allowUnknown = Array.isArray($unknownFormats);
  if ($isData) {
    var $format = 'format' + $lvl,
        $isObject = 'isObject' + $lvl,
        $formatType = 'formatType' + $lvl;
    out += ' var ' + $format + ' = formats[' + $schemaValue + ']; var ' + $isObject + ' = typeof ' + $format + ' == \'object\' && !(' + $format + ' instanceof RegExp) && ' + $format + '.validate; var ' + $formatType + ' = ' + $isObject + ' && ' + $format + '.type || \'string\'; if (' + $isObject + ') { ';
    if (it.async) {
      out += ' var async' + $lvl + ' = ' + $format + '.async; ';
    }
    out += ' ' + $format + ' = ' + $format + '.validate; } if (  ';
    if ($isData) {
      out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'string\') || ';
    }
    out += ' (';
    if ($unknownFormats != 'ignore') {
      out += ' (' + $schemaValue + ' && !' + $format + ' ';
      if ($allowUnknown) {
        out += ' && self._opts.unknownFormats.indexOf(' + $schemaValue + ') == -1 ';
      }
      out += ') || ';
    }
    out += ' (' + $format + ' && ' + $formatType + ' == \'' + $ruleType + '\' && !(typeof ' + $format + ' == \'function\' ? ';
    if (it.async) {
      out += ' (async' + $lvl + ' ? await ' + $format + '(' + $data + ') : ' + $format + '(' + $data + ')) ';
    } else {
      out += ' ' + $format + '(' + $data + ') ';
    }
    out += ' : ' + $format + '.test(' + $data + '))))) {';
  } else {
    var $format = it.formats[$schema];
    if (!$format) {
      if ($unknownFormats == 'ignore') {
        it.logger.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"');
        if ($breakOnError) {
          out += ' if (true) { ';
        }
        return out;
      } else if ($allowUnknown && $unknownFormats.indexOf($schema) >= 0) {
        if ($breakOnError) {
          out += ' if (true) { ';
        }
        return out;
      } else {
        throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"');
      }
    }
    var $isObject = (typeof $format === 'undefined' ? 'undefined' : _typeof($format)) == 'object' && !($format instanceof RegExp) && $format.validate;
    var $formatType = $isObject && $format.type || 'string';
    if ($isObject) {
      var $async = $format.async === true;
      $format = $format.validate;
    }
    if ($formatType != $ruleType) {
      if ($breakOnError) {
        out += ' if (true) { ';
      }
      return out;
    }
    if ($async) {
      if (!it.async) throw new Error('async format in sync schema');
      var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
      out += ' if (!(await ' + $formatRef + '(' + $data + '))) { ';
    } else {
      out += ' if (! ';
      var $formatRef = 'formats' + it.util.getProperty($schema);
      if ($isObject) $formatRef += '.validate';
      if (typeof $format == 'function') {
        out += ' ' + $formatRef + '(' + $data + ') ';
      } else {
        out += ' ' + $formatRef + '.test(' + $data + ') ';
      }
      out += ') { ';
    }
  }
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'format' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { format:  ';
    if ($isData) {
      out += '' + $schemaValue;
    } else {
      out += '' + it.util.toQuotedString($schema);
    }
    out += '  } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match format "';
      if ($isData) {
        out += '\' + ' + $schemaValue + ' + \'';
      } else {
        out += '' + it.util.escapeQuotes($schema);
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + it.util.toQuotedString($schema);
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += ' } ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_if(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $thenSch = it.schema['then'],
      $elseSch = it.schema['else'],
      $thenPresent = $thenSch !== undefined && it.util.schemaHasRules($thenSch, it.RULES.all),
      $elsePresent = $elseSch !== undefined && it.util.schemaHasRules($elseSch, it.RULES.all),
      $currentBaseId = $it.baseId;
  if ($thenPresent || $elsePresent) {
    var $ifClause;
    $it.createErrors = false;
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + $errs + ' = errors; var ' + $valid + ' = true;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    out += '  ' + it.validate($it) + ' ';
    $it.baseId = $currentBaseId;
    $it.createErrors = true;
    out += '  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; }  ';
    it.compositeRule = $it.compositeRule = $wasComposite;
    if ($thenPresent) {
      out += ' if (' + $nextValid + ') {  ';
      $it.schema = it.schema['then'];
      $it.schemaPath = it.schemaPath + '.then';
      $it.errSchemaPath = it.errSchemaPath + '/then';
      out += '  ' + it.validate($it) + ' ';
      $it.baseId = $currentBaseId;
      out += ' ' + $valid + ' = ' + $nextValid + '; ';
      if ($thenPresent && $elsePresent) {
        $ifClause = 'ifClause' + $lvl;
        out += ' var ' + $ifClause + ' = \'then\'; ';
      } else {
        $ifClause = '\'then\'';
      }
      out += ' } ';
      if ($elsePresent) {
        out += ' else { ';
      }
    } else {
      out += ' if (!' + $nextValid + ') { ';
    }
    if ($elsePresent) {
      $it.schema = it.schema['else'];
      $it.schemaPath = it.schemaPath + '.else';
      $it.errSchemaPath = it.errSchemaPath + '/else';
      out += '  ' + it.validate($it) + ' ';
      $it.baseId = $currentBaseId;
      out += ' ' + $valid + ' = ' + $nextValid + '; ';
      if ($thenPresent && $elsePresent) {
        $ifClause = 'ifClause' + $lvl;
        out += ' var ' + $ifClause + ' = \'else\'; ';
      } else {
        $ifClause = '\'else\'';
      }
      out += ' } ';
    }
    out += ' if (!' + $valid + ') {   var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + 'if' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { failingKeyword: ' + $ifClause + ' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should match "\' + ' + $ifClause + ' + \'" schema\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError(vErrors); ';
      } else {
        out += ' validate.errors = vErrors; return false; ';
      }
    }
    out += ' }   ';
    if ($breakOnError) {
      out += ' else { ';
    }
    out = it.util.cleanUpCode(out);
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function generate_items(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $idx = 'i' + $lvl,
      $dataNxt = $it.dataLevel = it.dataLevel + 1,
      $nextData = 'data' + $dataNxt,
      $currentBaseId = it.baseId;
  out += 'var ' + $errs + ' = errors;var ' + $valid + ';';
  if (Array.isArray($schema)) {
    var $additionalItems = it.schema.additionalItems;
    if ($additionalItems === false) {
      out += ' ' + $valid + ' = ' + $data + '.length <= ' + $schema.length + '; ';
      var $currErrSchemaPath = $errSchemaPath;
      $errSchemaPath = it.errSchemaPath + '/additionalItems';
      out += '  if (!' + $valid + ') {   ';
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = ''; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + 'additionalItems' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { limit: ' + $schema.length + ' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should NOT have more than ' + $schema.length + ' items\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: false , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError([' + __err + ']); ';
        } else {
          out += ' validate.errors = [' + __err + ']; return false; ';
        }
      } else {
        out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      }
      out += ' } ';
      $errSchemaPath = $currErrSchemaPath;
      if ($breakOnError) {
        $closingBraces += '}';
        out += ' else { ';
      }
    }
    var arr1 = $schema;
    if (arr1) {
      var $sch,
          $i = -1,
          l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          out += ' ' + $nextValid + ' = true; if (' + $data + '.length > ' + $i + ') { ';
          var $passData = $data + '[' + $i + ']';
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + '[' + $i + ']';
          $it.errSchemaPath = $errSchemaPath + '/' + $i;
          $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
          $it.dataPathArr[$dataNxt] = $i;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
          } else {
            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
          }
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + $nextValid + ') { ';
            $closingBraces += '}';
          }
        }
      }
    }
    if ((typeof $additionalItems === 'undefined' ? 'undefined' : _typeof($additionalItems)) == 'object' && it.util.schemaHasRules($additionalItems, it.RULES.all)) {
      $it.schema = $additionalItems;
      $it.schemaPath = it.schemaPath + '.additionalItems';
      $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
      out += ' ' + $nextValid + ' = true; if (' + $data + '.length > ' + $schema.length + ') {  for (var ' + $idx + ' = ' + $schema.length + '; ' + $idx + ' < ' + $data + '.length; ' + $idx + '++) { ';
      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
      var $passData = $data + '[' + $idx + ']';
      $it.dataPathArr[$dataNxt] = $idx;
      var $code = it.validate($it);
      $it.baseId = $currentBaseId;
      if (it.util.varOccurences($code, $nextData) < 2) {
        out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
      } else {
        out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
      }
      if ($breakOnError) {
        out += ' if (!' + $nextValid + ') break; ';
      }
      out += ' } }  ';
      if ($breakOnError) {
        out += ' if (' + $nextValid + ') { ';
        $closingBraces += '}';
      }
    }
  } else if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += '  for (var ' + $idx + ' = ' + 0 + '; ' + $idx + ' < ' + $data + '.length; ' + $idx + '++) { ';
    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
    var $passData = $data + '[' + $idx + ']';
    $it.dataPathArr[$dataNxt] = $idx;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
    } else {
      out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
    }
    if ($breakOnError) {
      out += ' if (!' + $nextValid + ') break; ';
    }
    out += ' }';
  }
  if ($breakOnError) {
    out += ' ' + $closingBraces + ' if (' + $errs + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_multipleOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  out += 'var division' + $lvl + ';if (';
  if ($isData) {
    out += ' ' + $schemaValue + ' !== undefined && ( typeof ' + $schemaValue + ' != \'number\' || ';
  }
  out += ' (division' + $lvl + ' = ' + $data + ' / ' + $schemaValue + ', ';
  if (it.opts.multipleOfPrecision) {
    out += ' Math.abs(Math.round(division' + $lvl + ') - division' + $lvl + ') > 1e-' + it.opts.multipleOfPrecision + ' ';
  } else {
    out += ' division' + $lvl + ' !== parseInt(division' + $lvl + ') ';
  }
  out += ' ) ';
  if ($isData) {
    out += '  )  ';
  }
  out += ' ) {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'multipleOf' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { multipleOf: ' + $schemaValue + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should be multiple of ';
      if ($isData) {
        out += '\' + ' + $schemaValue;
      } else {
        out += '' + $schemaValue + '\'';
      }
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + $schema;
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_not(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    out += ' var ' + $errs + ' = errors;  ';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    $it.createErrors = false;
    var $allErrorsOption;
    if ($it.opts.allErrors) {
      $allErrorsOption = $it.opts.allErrors;
      $it.opts.allErrors = false;
    }
    out += ' ' + it.validate($it) + ' ';
    $it.createErrors = true;
    if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' if (' + $nextValid + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + 'not' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT be valid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + __err + ']); ';
      } else {
        out += ' validate.errors = [' + __err + ']; return false; ';
      }
    } else {
      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } else {  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; } ';
    if (it.opts.allErrors) {
      out += ' } ';
    }
  } else {
    out += '  var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + 'not' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: {} ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT be valid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if ($breakOnError) {
      out += ' if (false) { ';
    }
  }
  return out;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_oneOf(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $currentBaseId = $it.baseId,
      $prevValid = 'prevValid' + $lvl,
      $passingSchemas = 'passingSchemas' + $lvl;
  out += 'var ' + $errs + ' = errors , ' + $prevValid + ' = false , ' + $valid + ' = false , ' + $passingSchemas + ' = null; ';
  var $wasComposite = it.compositeRule;
  it.compositeRule = $it.compositeRule = true;
  var arr1 = $schema;
  if (arr1) {
    var $sch,
        $i = -1,
        l1 = arr1.length - 1;
    while ($i < l1) {
      $sch = arr1[$i += 1];
      if (it.util.schemaHasRules($sch, it.RULES.all)) {
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + '[' + $i + ']';
        $it.errSchemaPath = $errSchemaPath + '/' + $i;
        out += '  ' + it.validate($it) + ' ';
        $it.baseId = $currentBaseId;
      } else {
        out += ' var ' + $nextValid + ' = true; ';
      }
      if ($i) {
        out += ' if (' + $nextValid + ' && ' + $prevValid + ') { ' + $valid + ' = false; ' + $passingSchemas + ' = [' + $passingSchemas + ', ' + $i + ']; } else { ';
        $closingBraces += '}';
      }
      out += ' if (' + $nextValid + ') { ' + $valid + ' = ' + $prevValid + ' = true; ' + $passingSchemas + ' = ' + $i + '; }';
    }
  }
  it.compositeRule = $it.compositeRule = $wasComposite;
  out += '' + $closingBraces + 'if (!' + $valid + ') {   var err =   '; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'oneOf' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { passingSchemas: ' + $passingSchemas + ' } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match exactly one schema in oneOf\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError(vErrors); ';
    } else {
      out += ' validate.errors = vErrors; return false; ';
    }
  }
  out += '} else {  errors = ' + $errs + '; if (vErrors !== null) { if (' + $errs + ') vErrors.length = ' + $errs + '; else vErrors = null; }';
  if (it.opts.allErrors) {
    out += ' } ';
  }
  return out;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_pattern(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $regexp = $isData ? '(new RegExp(' + $schemaValue + '))' : it.usePattern($schema);
  out += 'if ( ';
  if ($isData) {
    out += ' (' + $schemaValue + ' !== undefined && typeof ' + $schemaValue + ' != \'string\') || ';
  }
  out += ' !' + $regexp + '.test(' + $data + ') ) {   ';
  var $$outStack = $$outStack || [];
  $$outStack.push(out);
  out = ''; /* istanbul ignore else */
  if (it.createErrors !== false) {
    out += ' { keyword: \'' + 'pattern' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { pattern:  ';
    if ($isData) {
      out += '' + $schemaValue;
    } else {
      out += '' + it.util.toQuotedString($schema);
    }
    out += '  } ';
    if (it.opts.messages !== false) {
      out += ' , message: \'should match pattern "';
      if ($isData) {
        out += '\' + ' + $schemaValue + ' + \'';
      } else {
        out += '' + it.util.escapeQuotes($schema);
      }
      out += '"\' ';
    }
    if (it.opts.verbose) {
      out += ' , schema:  ';
      if ($isData) {
        out += 'validate.schema' + $schemaPath;
      } else {
        out += '' + it.util.toQuotedString($schema);
      }
      out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
    }
    out += ' } ';
  } else {
    out += ' {} ';
  }
  var __err = out;
  out = $$outStack.pop();
  if (!it.compositeRule && $breakOnError) {
    /* istanbul ignore if */
    if (it.async) {
      out += ' throw new ValidationError([' + __err + ']); ';
    } else {
      out += ' validate.errors = [' + __err + ']; return false; ';
    }
  } else {
    out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
  }
  out += '} ';
  if ($breakOnError) {
    out += ' else { ';
  }
  return out;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function generate_properties(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  var $key = 'key' + $lvl,
      $idx = 'idx' + $lvl,
      $dataNxt = $it.dataLevel = it.dataLevel + 1,
      $nextData = 'data' + $dataNxt,
      $dataProperties = 'dataProperties' + $lvl;
  var $schemaKeys = Object.keys($schema || {}),
      $pProperties = it.schema.patternProperties || {},
      $pPropertyKeys = Object.keys($pProperties),
      $aProperties = it.schema.additionalProperties,
      $someProperties = $schemaKeys.length || $pPropertyKeys.length,
      $noAdditional = $aProperties === false,
      $additionalIsSchema = (typeof $aProperties === 'undefined' ? 'undefined' : _typeof($aProperties)) == 'object' && Object.keys($aProperties).length,
      $removeAdditional = it.opts.removeAdditional,
      $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional,
      $ownProperties = it.opts.ownProperties,
      $currentBaseId = it.baseId;
  var $required = it.schema.required;
  if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) var $requiredHash = it.util.toHash($required);
  out += 'var ' + $errs + ' = errors;var ' + $nextValid + ' = true;';
  if ($ownProperties) {
    out += ' var ' + $dataProperties + ' = undefined;';
  }
  if ($checkAdditional) {
    if ($ownProperties) {
      out += ' ' + $dataProperties + ' = ' + $dataProperties + ' || Object.keys(' + $data + '); for (var ' + $idx + '=0; ' + $idx + '<' + $dataProperties + '.length; ' + $idx + '++) { var ' + $key + ' = ' + $dataProperties + '[' + $idx + ']; ';
    } else {
      out += ' for (var ' + $key + ' in ' + $data + ') { ';
    }
    if ($someProperties) {
      out += ' var isAdditional' + $lvl + ' = !(false ';
      if ($schemaKeys.length) {
        if ($schemaKeys.length > 8) {
          out += ' || validate.schema' + $schemaPath + '.hasOwnProperty(' + $key + ') ';
        } else {
          var arr1 = $schemaKeys;
          if (arr1) {
            var $propertyKey,
                i1 = -1,
                l1 = arr1.length - 1;
            while (i1 < l1) {
              $propertyKey = arr1[i1 += 1];
              out += ' || ' + $key + ' == ' + it.util.toQuotedString($propertyKey) + ' ';
            }
          }
        }
      }
      if ($pPropertyKeys.length) {
        var arr2 = $pPropertyKeys;
        if (arr2) {
          var $pProperty,
              $i = -1,
              l2 = arr2.length - 1;
          while ($i < l2) {
            $pProperty = arr2[$i += 1];
            out += ' || ' + it.usePattern($pProperty) + '.test(' + $key + ') ';
          }
        }
      }
      out += ' ); if (isAdditional' + $lvl + ') { ';
    }
    if ($removeAdditional == 'all') {
      out += ' delete ' + $data + '[' + $key + ']; ';
    } else {
      var $currentErrorPath = it.errorPath;
      var $additionalProperty = '\' + ' + $key + ' + \'';
      if (it.opts._errorDataPathProperty) {
        it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
      }
      if ($noAdditional) {
        if ($removeAdditional) {
          out += ' delete ' + $data + '[' + $key + ']; ';
        } else {
          out += ' ' + $nextValid + ' = false; ';
          var $currErrSchemaPath = $errSchemaPath;
          $errSchemaPath = it.errSchemaPath + '/additionalProperties';
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = ''; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + 'additionalProperties' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { additionalProperty: \'' + $additionalProperty + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'';
              if (it.opts._errorDataPathProperty) {
                out += 'is an invalid additional property';
              } else {
                out += 'should NOT have additional properties';
              }
              out += '\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: false , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            /* istanbul ignore if */
            if (it.async) {
              out += ' throw new ValidationError([' + __err + ']); ';
            } else {
              out += ' validate.errors = [' + __err + ']; return false; ';
            }
          } else {
            out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
          }
          $errSchemaPath = $currErrSchemaPath;
          if ($breakOnError) {
            out += ' break; ';
          }
        }
      } else if ($additionalIsSchema) {
        if ($removeAdditional == 'failing') {
          out += ' var ' + $errs + ' = errors;  ';
          var $wasComposite = it.compositeRule;
          it.compositeRule = $it.compositeRule = true;
          $it.schema = $aProperties;
          $it.schemaPath = it.schemaPath + '.additionalProperties';
          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
          } else {
            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
          }
          out += ' if (!' + $nextValid + ') { errors = ' + $errs + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + $data + '[' + $key + ']; }  ';
          it.compositeRule = $it.compositeRule = $wasComposite;
        } else {
          $it.schema = $aProperties;
          $it.schemaPath = it.schemaPath + '.additionalProperties';
          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
          } else {
            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + $nextValid + ') break; ';
          }
        }
      }
      it.errorPath = $currentErrorPath;
    }
    if ($someProperties) {
      out += ' } ';
    }
    out += ' }  ';
    if ($breakOnError) {
      out += ' if (' + $nextValid + ') { ';
      $closingBraces += '}';
    }
  }
  var $useDefaults = it.opts.useDefaults && !it.compositeRule;
  if ($schemaKeys.length) {
    var arr3 = $schemaKeys;
    if (arr3) {
      var $propertyKey,
          i3 = -1,
          l3 = arr3.length - 1;
      while (i3 < l3) {
        $propertyKey = arr3[i3 += 1];
        var $sch = $schema[$propertyKey];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          var $prop = it.util.getProperty($propertyKey),
              $passData = $data + $prop,
              $hasDefault = $useDefaults && $sch.default !== undefined;
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + $prop;
          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($propertyKey);
          $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
          $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            $code = it.util.varReplace($code, $nextData, $passData);
            var $useData = $passData;
          } else {
            var $useData = $nextData;
            out += ' var ' + $nextData + ' = ' + $passData + '; ';
          }
          if ($hasDefault) {
            out += ' ' + $code + ' ';
          } else {
            if ($requiredHash && $requiredHash[$propertyKey]) {
              out += ' if ( ' + $useData + ' === undefined ';
              if ($ownProperties) {
                out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
              }
              out += ') { ' + $nextValid + ' = false; ';
              var $currentErrorPath = it.errorPath,
                  $currErrSchemaPath = $errSchemaPath,
                  $missingProperty = it.util.escapeQuotes($propertyKey);
              if (it.opts._errorDataPathProperty) {
                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
              }
              $errSchemaPath = it.errSchemaPath + '/required';
              var $$outStack = $$outStack || [];
              $$outStack.push(out);
              out = ''; /* istanbul ignore else */
              if (it.createErrors !== false) {
                out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';
                if (it.opts.messages !== false) {
                  out += ' , message: \'';
                  if (it.opts._errorDataPathProperty) {
                    out += 'is a required property';
                  } else {
                    out += 'should have required property \\\'' + $missingProperty + '\\\'';
                  }
                  out += '\' ';
                }
                if (it.opts.verbose) {
                  out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
                }
                out += ' } ';
              } else {
                out += ' {} ';
              }
              var __err = out;
              out = $$outStack.pop();
              if (!it.compositeRule && $breakOnError) {
                /* istanbul ignore if */
                if (it.async) {
                  out += ' throw new ValidationError([' + __err + ']); ';
                } else {
                  out += ' validate.errors = [' + __err + ']; return false; ';
                }
              } else {
                out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
              }
              $errSchemaPath = $currErrSchemaPath;
              it.errorPath = $currentErrorPath;
              out += ' } else { ';
            } else {
              if ($breakOnError) {
                out += ' if ( ' + $useData + ' === undefined ';
                if ($ownProperties) {
                  out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
                }
                out += ') { ' + $nextValid + ' = true; } else { ';
              } else {
                out += ' if (' + $useData + ' !== undefined ';
                if ($ownProperties) {
                  out += ' &&   Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
                }
                out += ' ) { ';
              }
            }
            out += ' ' + $code + ' } ';
          }
        }
        if ($breakOnError) {
          out += ' if (' + $nextValid + ') { ';
          $closingBraces += '}';
        }
      }
    }
  }
  if ($pPropertyKeys.length) {
    var arr4 = $pPropertyKeys;
    if (arr4) {
      var $pProperty,
          i4 = -1,
          l4 = arr4.length - 1;
      while (i4 < l4) {
        $pProperty = arr4[i4 += 1];
        var $sch = $pProperties[$pProperty];
        if (it.util.schemaHasRules($sch, it.RULES.all)) {
          $it.schema = $sch;
          $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
          $it.errSchemaPath = it.errSchemaPath + '/patternProperties/' + it.util.escapeFragment($pProperty);
          if ($ownProperties) {
            out += ' ' + $dataProperties + ' = ' + $dataProperties + ' || Object.keys(' + $data + '); for (var ' + $idx + '=0; ' + $idx + '<' + $dataProperties + '.length; ' + $idx + '++) { var ' + $key + ' = ' + $dataProperties + '[' + $idx + ']; ';
          } else {
            out += ' for (var ' + $key + ' in ' + $data + ') { ';
          }
          out += ' if (' + it.usePattern($pProperty) + '.test(' + $key + ')) { ';
          $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
          var $passData = $data + '[' + $key + ']';
          $it.dataPathArr[$dataNxt] = $key;
          var $code = it.validate($it);
          $it.baseId = $currentBaseId;
          if (it.util.varOccurences($code, $nextData) < 2) {
            out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
          } else {
            out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
          }
          if ($breakOnError) {
            out += ' if (!' + $nextValid + ') break; ';
          }
          out += ' } ';
          if ($breakOnError) {
            out += ' else ' + $nextValid + ' = true; ';
          }
          out += ' }  ';
          if ($breakOnError) {
            out += ' if (' + $nextValid + ') { ';
            $closingBraces += '}';
          }
        }
      }
    }
  }
  if ($breakOnError) {
    out += ' ' + $closingBraces + ' if (' + $errs + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_propertyNames(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $errs = 'errs__' + $lvl;
  var $it = it.util.copy(it);
  var $closingBraces = '';
  $it.level++;
  var $nextValid = 'valid' + $it.level;
  out += 'var ' + $errs + ' = errors;';
  if (it.util.schemaHasRules($schema, it.RULES.all)) {
    $it.schema = $schema;
    $it.schemaPath = $schemaPath;
    $it.errSchemaPath = $errSchemaPath;
    var $key = 'key' + $lvl,
        $idx = 'idx' + $lvl,
        $i = 'i' + $lvl,
        $invalidName = '\' + ' + $key + ' + \'',
        $dataNxt = $it.dataLevel = it.dataLevel + 1,
        $nextData = 'data' + $dataNxt,
        $dataProperties = 'dataProperties' + $lvl,
        $ownProperties = it.opts.ownProperties,
        $currentBaseId = it.baseId;
    if ($ownProperties) {
      out += ' var ' + $dataProperties + ' = undefined; ';
    }
    if ($ownProperties) {
      out += ' ' + $dataProperties + ' = ' + $dataProperties + ' || Object.keys(' + $data + '); for (var ' + $idx + '=0; ' + $idx + '<' + $dataProperties + '.length; ' + $idx + '++) { var ' + $key + ' = ' + $dataProperties + '[' + $idx + ']; ';
    } else {
      out += ' for (var ' + $key + ' in ' + $data + ') { ';
    }
    out += ' var startErrs' + $lvl + ' = errors; ';
    var $passData = $key;
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var $code = it.validate($it);
    $it.baseId = $currentBaseId;
    if (it.util.varOccurences($code, $nextData) < 2) {
      out += ' ' + it.util.varReplace($code, $nextData, $passData) + ' ';
    } else {
      out += ' var ' + $nextData + ' = ' + $passData + '; ' + $code + ' ';
    }
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' if (!' + $nextValid + ') { for (var ' + $i + '=startErrs' + $lvl + '; ' + $i + '<errors; ' + $i + '++) { vErrors[' + $i + '].propertyName = ' + $key + '; }   var err =   '; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + 'propertyNames' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { propertyName: \'' + $invalidName + '\' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'property name \\\'' + $invalidName + '\\\' is invalid\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError(vErrors); ';
      } else {
        out += ' validate.errors = vErrors; return false; ';
      }
    }
    if ($breakOnError) {
      out += ' break; ';
    }
    out += ' } }';
  }
  if ($breakOnError) {
    out += ' ' + $closingBraces + ' if (' + $errs + ' == errors) {';
  }
  out = it.util.cleanUpCode(out);
  return out;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_required(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $vSchema = 'schema' + $lvl;
  if (!$isData) {
    if ($schema.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
      var $required = [];
      var arr1 = $schema;
      if (arr1) {
        var $property,
            i1 = -1,
            l1 = arr1.length - 1;
        while (i1 < l1) {
          $property = arr1[i1 += 1];
          var $propertySch = it.schema.properties[$property];
          if (!($propertySch && it.util.schemaHasRules($propertySch, it.RULES.all))) {
            $required[$required.length] = $property;
          }
        }
      }
    } else {
      var $required = $schema;
    }
  }
  if ($isData || $required.length) {
    var $currentErrorPath = it.errorPath,
        $loopRequired = $isData || $required.length >= it.opts.loopRequired,
        $ownProperties = it.opts.ownProperties;
    if ($breakOnError) {
      out += ' var missing' + $lvl + '; ';
      if ($loopRequired) {
        if (!$isData) {
          out += ' var ' + $vSchema + ' = validate.schema' + $schemaPath + '; ';
        }
        var $i = 'i' + $lvl,
            $propertyPath = 'schema' + $lvl + '[' + $i + ']',
            $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
        }
        out += ' var ' + $valid + ' = true; ';
        if ($isData) {
          out += ' if (schema' + $lvl + ' === undefined) ' + $valid + ' = true; else if (!Array.isArray(schema' + $lvl + ')) ' + $valid + ' = false; else {';
        }
        out += ' for (var ' + $i + ' = 0; ' + $i + ' < ' + $vSchema + '.length; ' + $i + '++) { ' + $valid + ' = ' + $data + '[' + $vSchema + '[' + $i + ']] !== undefined ';
        if ($ownProperties) {
          out += ' &&   Object.prototype.hasOwnProperty.call(' + $data + ', ' + $vSchema + '[' + $i + ']) ';
        }
        out += '; if (!' + $valid + ') break; } ';
        if ($isData) {
          out += '  }  ';
        }
        out += '  if (!' + $valid + ') {   ';
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + $missingProperty + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + __err + ']); ';
          } else {
            out += ' validate.errors = [' + __err + ']; return false; ';
          }
        } else {
          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else { ';
      } else {
        out += ' if ( ';
        var arr2 = $required;
        if (arr2) {
          var $propertyKey,
              $i = -1,
              l2 = arr2.length - 1;
          while ($i < l2) {
            $propertyKey = arr2[$i += 1];
            if ($i) {
              out += ' || ';
            }
            var $prop = it.util.getProperty($propertyKey),
                $useData = $data + $prop;
            out += ' ( ( ' + $useData + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
            }
            out += ') && (missing' + $lvl + ' = ' + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ') ) ';
          }
        }
        out += ') {  ';
        var $propertyPath = 'missing' + $lvl,
            $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
        }
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = ''; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + $missingProperty + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          /* istanbul ignore if */
          if (it.async) {
            out += ' throw new ValidationError([' + __err + ']); ';
          } else {
            out += ' validate.errors = [' + __err + ']; return false; ';
          }
        } else {
          out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
        }
        out += ' } else { ';
      }
    } else {
      if ($loopRequired) {
        if (!$isData) {
          out += ' var ' + $vSchema + ' = validate.schema' + $schemaPath + '; ';
        }
        var $i = 'i' + $lvl,
            $propertyPath = 'schema' + $lvl + '[' + $i + ']',
            $missingProperty = '\' + ' + $propertyPath + ' + \'';
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
        }
        if ($isData) {
          out += ' if (' + $vSchema + ' && !Array.isArray(' + $vSchema + ')) {  var err =   '; /* istanbul ignore else */
          if (it.createErrors !== false) {
            out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';
            if (it.opts.messages !== false) {
              out += ' , message: \'';
              if (it.opts._errorDataPathProperty) {
                out += 'is a required property';
              } else {
                out += 'should have required property \\\'' + $missingProperty + '\\\'';
              }
              out += '\' ';
            }
            if (it.opts.verbose) {
              out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
            }
            out += ' } ';
          } else {
            out += ' {} ';
          }
          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (' + $vSchema + ' !== undefined) { ';
        }
        out += ' for (var ' + $i + ' = 0; ' + $i + ' < ' + $vSchema + '.length; ' + $i + '++) { if (' + $data + '[' + $vSchema + '[' + $i + ']] === undefined ';
        if ($ownProperties) {
          out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', ' + $vSchema + '[' + $i + ']) ';
        }
        out += ') {  var err =   '; /* istanbul ignore else */
        if (it.createErrors !== false) {
          out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';
          if (it.opts.messages !== false) {
            out += ' , message: \'';
            if (it.opts._errorDataPathProperty) {
              out += 'is a required property';
            } else {
              out += 'should have required property \\\'' + $missingProperty + '\\\'';
            }
            out += '\' ';
          }
          if (it.opts.verbose) {
            out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
          }
          out += ' } ';
        } else {
          out += ' {} ';
        }
        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ';
        if ($isData) {
          out += '  }  ';
        }
      } else {
        var arr3 = $required;
        if (arr3) {
          var $propertyKey,
              i3 = -1,
              l3 = arr3.length - 1;
          while (i3 < l3) {
            $propertyKey = arr3[i3 += 1];
            var $prop = it.util.getProperty($propertyKey),
                $missingProperty = it.util.escapeQuotes($propertyKey),
                $useData = $data + $prop;
            if (it.opts._errorDataPathProperty) {
              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
            }
            out += ' if ( ' + $useData + ' === undefined ';
            if ($ownProperties) {
              out += ' || ! Object.prototype.hasOwnProperty.call(' + $data + ', \'' + it.util.escapeQuotes($propertyKey) + '\') ';
            }
            out += ') {  var err =   '; /* istanbul ignore else */
            if (it.createErrors !== false) {
              out += ' { keyword: \'' + 'required' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { missingProperty: \'' + $missingProperty + '\' } ';
              if (it.opts.messages !== false) {
                out += ' , message: \'';
                if (it.opts._errorDataPathProperty) {
                  out += 'is a required property';
                } else {
                  out += 'should have required property \\\'' + $missingProperty + '\\\'';
                }
                out += '\' ';
              }
              if (it.opts.verbose) {
                out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
              }
              out += ' } ';
            } else {
              out += ' {} ';
            }
            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
          }
        }
      }
    }
    it.errorPath = $currentErrorPath;
  } else if ($breakOnError) {
    out += ' if (true) {';
  }
  return out;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_uniqueItems(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  if (($schema || $isData) && it.opts.uniqueItems !== false) {
    if ($isData) {
      out += ' var ' + $valid + '; if (' + $schemaValue + ' === false || ' + $schemaValue + ' === undefined) ' + $valid + ' = true; else if (typeof ' + $schemaValue + ' != \'boolean\') ' + $valid + ' = false; else { ';
    }
    out += ' var i = ' + $data + '.length , ' + $valid + ' = true , j; if (i > 1) { ';
    var $itemType = it.schema.items && it.schema.items.type,
        $typeIsArray = Array.isArray($itemType);
    if (!$itemType || $itemType == 'object' || $itemType == 'array' || $typeIsArray && ($itemType.indexOf('object') >= 0 || $itemType.indexOf('array') >= 0)) {
      out += ' outer: for (;i--;) { for (j = i; j--;) { if (equal(' + $data + '[i], ' + $data + '[j])) { ' + $valid + ' = false; break outer; } } } ';
    } else {
      out += ' var itemIndices = {}, item; for (;i--;) { var item = ' + $data + '[i]; ';
      var $method = 'checkDataType' + ($typeIsArray ? 's' : '');
      out += ' if (' + it.util[$method]($itemType, 'item', true) + ') continue; ';
      if ($typeIsArray) {
        out += ' if (typeof item == \'string\') item = \'"\' + item; ';
      }
      out += ' if (typeof itemIndices[item] == \'number\') { ' + $valid + ' = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ';
    }
    out += ' } ';
    if ($isData) {
      out += '  }  ';
    }
    out += ' if (!' + $valid + ') {   ';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + 'uniqueItems' + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { i: i, j: j } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should NOT have duplicate items (items ## \' + j + \' and \' + i + \' are identical)\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema:  ';
        if ($isData) {
          out += 'validate.schema' + $schemaPath;
        } else {
          out += '' + $schema;
        }
        out += '         , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + __err + ']); ';
      } else {
        out += ' validate.errors = [' + __err + ']; return false; ';
      }
    } else {
      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    out += ' } ';
    if ($breakOnError) {
      out += ' else { ';
    }
  } else {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  }
  return out;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var KEYWORDS = ['multipleOf', 'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum', 'maxLength', 'minLength', 'pattern', 'additionalItems', 'maxItems', 'minItems', 'uniqueItems', 'maxProperties', 'minProperties', 'required', 'additionalProperties', 'enum', 'format', 'const'];

module.exports = function (metaSchema, keywordsJsonPointers) {
  for (var i = 0; i < keywordsJsonPointers.length; i++) {
    metaSchema = JSON.parse(JSON.stringify(metaSchema));
    var segments = keywordsJsonPointers[i].split('/');
    var keywords = metaSchema;
    var j;
    for (j = 1; j < segments.length; j++) {
      keywords = keywords[segments[j]];
    }for (j = 0; j < KEYWORDS.length; j++) {
      var key = KEYWORDS[j];
      var schema = keywords[key];
      if (schema) {
        keywords[key] = {
          anyOf: [schema, { $ref: 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#' }]
        };
      }
    }
  }

  return metaSchema;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MissingRefError = __webpack_require__(9).MissingRef;

module.exports = compileAsync;

/**
 * Creates validating function for passed schema with asynchronous loading of missing schemas.
 * `loadSchema` option should be a function that accepts schema uri and returns promise that resolves with the schema.
 * @this  Ajv
 * @param {Object}   schema schema object
 * @param {Boolean}  meta optional true to compile meta-schema; this parameter can be skipped
 * @param {Function} callback an optional node-style callback, it is called with 2 parameters: error (or null) and validating function.
 * @return {Promise} promise that resolves with a validating function.
 */
function compileAsync(schema, meta, callback) {
  /* eslint no-shadow: 0 */
  /* global Promise */
  /* jshint validthis: true */
  var self = this;
  if (typeof this._opts.loadSchema != 'function') throw new Error('options.loadSchema should be a function');

  if (typeof meta == 'function') {
    callback = meta;
    meta = undefined;
  }

  var p = loadMetaSchemaOf(schema).then(function () {
    var schemaObj = self._addSchema(schema, undefined, meta);
    return schemaObj.validate || _compileAsync(schemaObj);
  });

  if (callback) {
    p.then(function (v) {
      callback(null, v);
    }, callback);
  }

  return p;

  function loadMetaSchemaOf(sch) {
    var $schema = sch.$schema;
    return $schema && !self.getSchema($schema) ? compileAsync.call(self, { $ref: $schema }, true) : Promise.resolve();
  }

  function _compileAsync(schemaObj) {
    try {
      return self._compile(schemaObj);
    } catch (e) {
      if (e instanceof MissingRefError) return loadMissingSchema(e);
      throw e;
    }

    function loadMissingSchema(e) {
      var ref = e.missingSchema;
      if (added(ref)) throw new Error('Schema ' + ref + ' is loaded but ' + e.missingRef + ' cannot be resolved');

      var schemaPromise = self._loadingSchemas[ref];
      if (!schemaPromise) {
        schemaPromise = self._loadingSchemas[ref] = self._opts.loadSchema(ref);
        schemaPromise.then(removePromise, removePromise);
      }

      return schemaPromise.then(function (sch) {
        if (!added(ref)) {
          return loadMetaSchemaOf(sch).then(function () {
            if (!added(ref)) self.addSchema(sch, ref, undefined, meta);
          });
        }
      }).then(function () {
        return _compileAsync(schemaObj);
      });

      function removePromise() {
        delete self._loadingSchemas[ref];
      }

      function added(ref) {
        return self._refs[ref] || self._schemas[ref];
      }
    }
  }
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IDENTIFIER = /^[a-z_$][a-z0-9_$-]*$/i;
var customRuleCode = __webpack_require__(75);

module.exports = {
  add: addKeyword,
  get: getKeyword,
  remove: removeKeyword
};

/**
 * Define custom keyword
 * @this  Ajv
 * @param {String} keyword custom keyword, should be unique (including different from all standard, custom and macro keywords).
 * @param {Object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
 * @return {Ajv} this for method chaining
 */
function addKeyword(keyword, definition) {
  /* jshint validthis: true */
  /* eslint no-shadow: 0 */
  var RULES = this.RULES;

  if (RULES.keywords[keyword]) throw new Error('Keyword ' + keyword + ' is already defined');

  if (!IDENTIFIER.test(keyword)) throw new Error('Keyword ' + keyword + ' is not a valid identifier');

  if (definition) {
    if (definition.macro && definition.valid !== undefined) throw new Error('"valid" option cannot be used with macro keywords');

    var dataType = definition.type;
    if (Array.isArray(dataType)) {
      var i,
          len = dataType.length;
      for (i = 0; i < len; i++) {
        checkDataType(dataType[i]);
      }for (i = 0; i < len; i++) {
        _addRule(keyword, dataType[i], definition);
      }
    } else {
      if (dataType) checkDataType(dataType);
      _addRule(keyword, dataType, definition);
    }

    var $data = definition.$data === true && this._opts.$data;
    if ($data && !definition.validate) throw new Error('$data support: "validate" function is not defined');

    var metaSchema = definition.metaSchema;
    if (metaSchema) {
      if ($data) {
        metaSchema = {
          anyOf: [metaSchema, { '$ref': 'https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#' }]
        };
      }
      definition.validateSchema = this.compile(metaSchema, true);
    }
  }

  RULES.keywords[keyword] = RULES.all[keyword] = true;

  function _addRule(keyword, dataType, definition) {
    var ruleGroup;
    for (var i = 0; i < RULES.length; i++) {
      var rg = RULES[i];
      if (rg.type == dataType) {
        ruleGroup = rg;
        break;
      }
    }

    if (!ruleGroup) {
      ruleGroup = { type: dataType, rules: [] };
      RULES.push(ruleGroup);
    }

    var rule = {
      keyword: keyword,
      definition: definition,
      custom: true,
      code: customRuleCode,
      implements: definition.implements
    };
    ruleGroup.rules.push(rule);
    RULES.custom[keyword] = rule;
  }

  function checkDataType(dataType) {
    if (!RULES.types[dataType]) throw new Error('Unknown type ' + dataType);
  }

  return this;
}

/**
 * Get keyword
 * @this  Ajv
 * @param {String} keyword pre-defined or custom keyword.
 * @return {Object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
 */
function getKeyword(keyword) {
  /* jshint validthis: true */
  var rule = this.RULES.custom[keyword];
  return rule ? rule.definition : this.RULES.keywords[keyword] || false;
}

/**
 * Remove keyword
 * @this  Ajv
 * @param {String} keyword pre-defined or custom keyword.
 * @return {Ajv} this for method chaining
 */
function removeKeyword(keyword) {
  /* jshint validthis: true */
  var RULES = this.RULES;
  delete RULES.keywords[keyword];
  delete RULES.all[keyword];
  delete RULES.custom[keyword];
  for (var i = 0; i < RULES.length; i++) {
    var rules = RULES[i].rules;
    for (var j = 0; j < rules.length; j++) {
      if (rules[j].keyword == keyword) {
        rules.splice(j, 1);
        break;
      }
    }
  }
  return this;
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function generate_custom(it, $keyword, $ruleType) {
  var out = ' ';
  var $lvl = it.level;
  var $dataLvl = it.dataLevel;
  var $schema = it.schema[$keyword];
  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
  var $breakOnError = !it.opts.allErrors;
  var $errorKeyword;
  var $data = 'data' + ($dataLvl || '');
  var $valid = 'valid' + $lvl;
  var $errs = 'errs__' + $lvl;
  var $isData = it.opts.$data && $schema && $schema.$data,
      $schemaValue;
  if ($isData) {
    out += ' var schema' + $lvl + ' = ' + it.util.getData($schema.$data, $dataLvl, it.dataPathArr) + '; ';
    $schemaValue = 'schema' + $lvl;
  } else {
    $schemaValue = $schema;
  }
  var $rule = this,
      $definition = 'definition' + $lvl,
      $rDef = $rule.definition,
      $closingBraces = '';
  var $compile, $inline, $macro, $ruleValidate, $validateCode;
  if ($isData && $rDef.$data) {
    $validateCode = 'keywordValidate' + $lvl;
    var $validateSchema = $rDef.validateSchema;
    out += ' var ' + $definition + ' = RULES.custom[\'' + $keyword + '\'].definition; var ' + $validateCode + ' = ' + $definition + '.validate;';
  } else {
    $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
    if (!$ruleValidate) return;
    $schemaValue = 'validate.schema' + $schemaPath;
    $validateCode = $ruleValidate.code;
    $compile = $rDef.compile;
    $inline = $rDef.inline;
    $macro = $rDef.macro;
  }
  var $ruleErrs = $validateCode + '.errors',
      $i = 'i' + $lvl,
      $ruleErr = 'ruleErr' + $lvl,
      $asyncKeyword = $rDef.async;
  if ($asyncKeyword && !it.async) throw new Error('async keyword in sync schema');
  if (!($inline || $macro)) {
    out += '' + $ruleErrs + ' = null;';
  }
  out += 'var ' + $errs + ' = errors;var ' + $valid + ';';
  if ($isData && $rDef.$data) {
    $closingBraces += '}';
    out += ' if (' + $schemaValue + ' === undefined) { ' + $valid + ' = true; } else { ';
    if ($validateSchema) {
      $closingBraces += '}';
      out += ' ' + $valid + ' = ' + $definition + '.validateSchema(' + $schemaValue + '); if (' + $valid + ') { ';
    }
  }
  if ($inline) {
    if ($rDef.statements) {
      out += ' ' + $ruleValidate.validate + ' ';
    } else {
      out += ' ' + $valid + ' = ' + $ruleValidate.validate + '; ';
    }
  } else if ($macro) {
    var $it = it.util.copy(it);
    var $closingBraces = '';
    $it.level++;
    var $nextValid = 'valid' + $it.level;
    $it.schema = $ruleValidate.validate;
    $it.schemaPath = '';
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += ' ' + $code;
  } else {
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    out += '  ' + $validateCode + '.call( ';
    if (it.opts.passContext) {
      out += 'this';
    } else {
      out += 'self';
    }
    if ($compile || $rDef.schema === false) {
      out += ' , ' + $data + ' ';
    } else {
      out += ' , ' + $schemaValue + ' , ' + $data + ' , validate.schema' + it.schemaPath + ' ';
    }
    out += ' , (dataPath || \'\')';
    if (it.errorPath != '""') {
      out += ' + ' + it.errorPath;
    }
    var $parentData = $dataLvl ? 'data' + ($dataLvl - 1 || '') : 'parentData',
        $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
    out += ' , ' + $parentData + ' , ' + $parentDataProperty + ' , rootData )  ';
    var def_callRuleValidate = out;
    out = $$outStack.pop();
    if ($rDef.errors === false) {
      out += ' ' + $valid + ' = ';
      if ($asyncKeyword) {
        out += 'await ';
      }
      out += '' + def_callRuleValidate + '; ';
    } else {
      if ($asyncKeyword) {
        $ruleErrs = 'customErrors' + $lvl;
        out += ' var ' + $ruleErrs + ' = null; try { ' + $valid + ' = await ' + def_callRuleValidate + '; } catch (e) { ' + $valid + ' = false; if (e instanceof ValidationError) ' + $ruleErrs + ' = e.errors; else throw e; } ';
      } else {
        out += ' ' + $ruleErrs + ' = null; ' + $valid + ' = ' + def_callRuleValidate + '; ';
      }
    }
  }
  if ($rDef.modifying) {
    out += ' if (' + $parentData + ') ' + $data + ' = ' + $parentData + '[' + $parentDataProperty + '];';
  }
  out += '' + $closingBraces;
  if ($rDef.valid) {
    if ($breakOnError) {
      out += ' if (true) { ';
    }
  } else {
    out += ' if ( ';
    if ($rDef.valid === undefined) {
      out += ' !';
      if ($macro) {
        out += '' + $nextValid;
      } else {
        out += '' + $valid;
      }
    } else {
      out += ' ' + !$rDef.valid + ' ';
    }
    out += ') { ';
    $errorKeyword = $rule.keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = '';
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = ''; /* istanbul ignore else */
    if (it.createErrors !== false) {
      out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { keyword: \'' + $rule.keyword + '\' } ';
      if (it.opts.messages !== false) {
        out += ' , message: \'should pass "' + $rule.keyword + '" keyword validation\' ';
      }
      if (it.opts.verbose) {
        out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
      }
      out += ' } ';
    } else {
      out += ' {} ';
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      /* istanbul ignore if */
      if (it.async) {
        out += ' throw new ValidationError([' + __err + ']); ';
      } else {
        out += ' validate.errors = [' + __err + ']; return false; ';
      }
    } else {
      out += ' var err = ' + __err + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
    }
    var def_customError = out;
    out = $$outStack.pop();
    if ($inline) {
      if ($rDef.errors) {
        if ($rDef.errors != 'full') {
          out += '  for (var ' + $i + '=' + $errs + '; ' + $i + '<errors; ' + $i + '++) { var ' + $ruleErr + ' = vErrors[' + $i + ']; if (' + $ruleErr + '.dataPath === undefined) ' + $ruleErr + '.dataPath = (dataPath || \'\') + ' + it.errorPath + '; if (' + $ruleErr + '.schemaPath === undefined) { ' + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';
          if (it.opts.verbose) {
            out += ' ' + $ruleErr + '.schema = ' + $schemaValue + '; ' + $ruleErr + '.data = ' + $data + '; ';
          }
          out += ' } ';
        }
      } else {
        if ($rDef.errors === false) {
          out += ' ' + def_customError + ' ';
        } else {
          out += ' if (' + $errs + ' == errors) { ' + def_customError + ' } else {  for (var ' + $i + '=' + $errs + '; ' + $i + '<errors; ' + $i + '++) { var ' + $ruleErr + ' = vErrors[' + $i + ']; if (' + $ruleErr + '.dataPath === undefined) ' + $ruleErr + '.dataPath = (dataPath || \'\') + ' + it.errorPath + '; if (' + $ruleErr + '.schemaPath === undefined) { ' + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';
          if (it.opts.verbose) {
            out += ' ' + $ruleErr + '.schema = ' + $schemaValue + '; ' + $ruleErr + '.data = ' + $data + '; ';
          }
          out += ' } } ';
        }
      }
    } else if ($macro) {
      out += '   var err =   '; /* istanbul ignore else */
      if (it.createErrors !== false) {
        out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + it.errorPath + ' , schemaPath: ' + it.util.toQuotedString($errSchemaPath) + ' , params: { keyword: \'' + $rule.keyword + '\' } ';
        if (it.opts.messages !== false) {
          out += ' , message: \'should pass "' + $rule.keyword + '" keyword validation\' ';
        }
        if (it.opts.verbose) {
          out += ' , schema: validate.schema' + $schemaPath + ' , parentSchema: validate.schema' + it.schemaPath + ' , data: ' + $data + ' ';
        }
        out += ' } ';
      } else {
        out += ' {} ';
      }
      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
      if (!it.compositeRule && $breakOnError) {
        /* istanbul ignore if */
        if (it.async) {
          out += ' throw new ValidationError(vErrors); ';
        } else {
          out += ' validate.errors = vErrors; return false; ';
        }
      }
    } else {
      if ($rDef.errors === false) {
        out += ' ' + def_customError + ' ';
      } else {
        out += ' if (Array.isArray(' + $ruleErrs + ')) { if (vErrors === null) vErrors = ' + $ruleErrs + '; else vErrors = vErrors.concat(' + $ruleErrs + '); errors = vErrors.length;  for (var ' + $i + '=' + $errs + '; ' + $i + '<errors; ' + $i + '++) { var ' + $ruleErr + ' = vErrors[' + $i + ']; if (' + $ruleErr + '.dataPath === undefined) ' + $ruleErr + '.dataPath = (dataPath || \'\') + ' + it.errorPath + ';  ' + $ruleErr + '.schemaPath = "' + $errSchemaPath + '";  ';
        if (it.opts.verbose) {
          out += ' ' + $ruleErr + '.schema = ' + $schemaValue + '; ' + $ruleErr + '.data = ' + $data + '; ';
        }
        out += ' } } else { ' + def_customError + ' } ';
      }
    }
    out += ' } ';
    if ($breakOnError) {
      out += ' else { ';
    }
  }
  return out;
};

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = {"$schema":"http://json-schema.org/draft-07/schema#","$id":"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON Schema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = {"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = {"definitions":{},"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://jsbattle.jmrlab.com/schema/ubd-schema-v2.json","type":"object","title":"The Ultimate Battle Descriptor Schema","version":2,"required":["version","rngSeed","teamMode","aiList"],"properties":{"version":{"$id":"#/properties/version","enum":[2],"title":"Version of the schema"},"rngSeed":{"$id":"#/properties/rngSeed","type":"number","title":"Battle RNG seed","default":0,"examples":[0.850067584253805]},"teamMode":{"$id":"#/properties/teamMode","type":"boolean","title":"Team death match","default":false,"examples":[false]},"aiList":{"$id":"#/properties/aiList","type":"array","title":"List of AIs that joins the battle","items":{"$id":"#/properties/aiList/items","type":"object","title":"Tank AI","required":["name","team","code","initData","useSandbox","executionLimit"],"properties":{"name":{"$id":"#/properties/aiList/items/properties/name","type":"string","title":"Name of tank","default":"","examples":["User Created Tank"],"pattern":"^(.*)$"},"team":{"$id":"#/properties/aiList/items/properties/team","type":"string","title":"Team of the tank","default":"","examples":["10i42s2ca"],"pattern":"^(.*)$"},"code":{"$id":"#/properties/aiList/items/properties/code","anyOf":[{"type":"string"},{"type":"null"}],"title":"Code of the AI","default":"","examples":["var a = 1;"]},"initData":{"$id":"#/properties/aiList/items/properties/initData","default":null,"title":"Initial data of AI","anyOf":[{"type":"object"},{"type":"null"}],"examples":[null]},"useSandbox":{"$id":"#/properties/aiList/items/properties/useSandbox","type":"boolean","title":"Use sandbox for AI execution","default":true,"examples":[true]},"executionLimit":{"$id":"#/properties/aiList/items/properties/executionLimit","type":"integer","title":"AI code execution time limit in ms","default":100,"examples":[100]}}}}}}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiRenderer2 = __webpack_require__(11);

var _AbstractPixiRenderer3 = _interopRequireDefault(_AbstractPixiRenderer2);

var _DebugBattlefieldView = __webpack_require__(82);

var _DebugBattlefieldView2 = _interopRequireDefault(_DebugBattlefieldView);

var _DebugClockView = __webpack_require__(83);

var _DebugClockView2 = _interopRequireDefault(_DebugClockView);

var _DebugBulletView = __webpack_require__(84);

var _DebugBulletView2 = _interopRequireDefault(_DebugBulletView);

var _DebugTankView = __webpack_require__(85);

var _DebugTankView2 = _interopRequireDefault(_DebugTankView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugRenderer = function (_AbstractPixiRenderer) {
  _inherits(DebugRenderer, _AbstractPixiRenderer);

  function DebugRenderer() {
    _classCallCheck(this, DebugRenderer);

    var _this = _possibleConstructorReturn(this, (DebugRenderer.__proto__ || Object.getPrototypeOf(DebugRenderer)).call(this));

    _this._frameCounter = 0;
    _this._fpsLabel = null;
    _this._scoreBoard = null;
    return _this;
  }

  _createClass(DebugRenderer, [{
    key: "initBatlefield",
    value: function initBatlefield(battlefield) {
      _get(DebugRenderer.prototype.__proto__ || Object.getPrototypeOf(DebugRenderer.prototype), "initBatlefield", this).call(this, battlefield);

      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: '#00ff00'
      });

      this._fpsLabel = new PIXI.Text("FPS", labelStyle);
      this._fpsLabel.x = 100;
      this._fpsLabel.y = 5;
      this.stage.addChild(this._fpsLabel);

      var self = this;
      setInterval(function () {
        self._fpsLabel.text = "FPS: " + self._frameCounter;
        self._frameCounter = 0;
      }, 1000);

      labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: '#00ff00'
      });

      this._scoreBoard = new PIXI.Text("scores", labelStyle);
      this._scoreBoard.x = battlefield.margin + 2;
      this._scoreBoard.y = battlefield.margin + 2;
      this._scoreBoard.alpha = 0.5;
      this.stage.addChild(this._scoreBoard);
    }
  }, {
    key: "renderTankStats",
    value: function renderTankStats(tankList) {
      _get(DebugRenderer.prototype.__proto__ || Object.getPrototypeOf(DebugRenderer.prototype), "renderTankStats", this).call(this, tankList);
      var scores = [];
      var i = void 0;
      for (i = 0; i < tankList.length; i++) {
        scores.push({
          name: tankList[i].fullName,
          energy: tankList[i].energy,
          value: tankList[i].score
        });
      }
      scores.sort(function (a, b) {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
        return 0;
      });
      var msg = "";
      for (i = 0; i < scores.length; i++) {
        msg += scores[i].value.toFixed(3) + " - " + scores[i].name + (scores[i].energy == 0 ? " [X]" : "") + "\n";
      }
      this._scoreBoard.text = msg;
    }
  }, {
    key: "postRender",
    value: function postRender() {
      _get(DebugRenderer.prototype.__proto__ || Object.getPrototypeOf(DebugRenderer.prototype), "postRender", this).call(this);
      this._frameCounter++;
    }
  }, {
    key: "_createBattlefieldView",
    value: function _createBattlefieldView(battlefield) {
      return new _DebugBattlefieldView2.default(battlefield);
    }
  }, {
    key: "_createClockView",
    value: function _createClockView(clock) {
      return new _DebugClockView2.default(clock);
    }
  }, {
    key: "_createBulletView",
    value: function _createBulletView(bullet) {
      return new _DebugBulletView2.default(bullet);
    }
  }, {
    key: "_createTankView",
    value: function _createTankView(tank) {
      return new _DebugTankView2.default(tank);
    }
  }]);

  return DebugRenderer;
}(_AbstractPixiRenderer3.default);

exports.default = DebugRenderer;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(10);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _AbstractView = __webpack_require__(22);

var _AbstractView2 = _interopRequireDefault(_AbstractView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractRenderer = function (_Renderer) {
  _inherits(AbstractRenderer, _Renderer);

  function AbstractRenderer() {
    _classCallCheck(this, AbstractRenderer);

    var _this = _possibleConstructorReturn(this, (AbstractRenderer.__proto__ || Object.getPrototypeOf(AbstractRenderer)).call(this));

    _this._tankMap = [];
    _this._bulletMap = [];
    _this._offsetX = 0;
    _this._offsetY = 0;
    _this._speedMultiplier = 1;
    return _this;
  }

  _createClass(AbstractRenderer, [{
    key: "initBatlefield",
    value: function initBatlefield(battlefield) {
      this._offsetX = battlefield.offsetX;
      this._offsetY = battlefield.offsetY;
    }
  }, {
    key: "renderTank",
    value: function renderTank(tank, events) {
      this._renderModel(tank, events, this._tankMap, this._createTankView);
    }
  }, {
    key: "renderBullet",
    value: function renderBullet(bullet, events) {
      this._renderModel(bullet, events, this._bulletMap, this._createBulletView);
    }
  }, {
    key: "getBulletView",
    value: function getBulletView(id) {
      return this._bulletMap[id];
    }
  }, {
    key: "getTankView",
    value: function getTankView(id) {
      return this._tankMap[id];
    }
  }, {
    key: "setSpeed",
    value: function setSpeed(v) {
      this._speedMultiplier = v;
    }
  }, {
    key: "_renderModel",
    value: function _renderModel(model, events, map, factory) {
      var view = null;
      if (map[model.id]) {
        view = map[model.id];
      } else {
        view = factory(model);
        map[model.id] = view;
      }
      view.update(events);
      return view;
    }
  }, {
    key: "_createTankView",
    value: function _createTankView(tank) {
      return new _AbstractView2.default(tank);
    }
  }, {
    key: "_createBulletView",
    value: function _createBulletView(bullet) {
      return new _AbstractView2.default(bullet);
    }
  }, {
    key: "offsetX",
    get: function get() {
      return this._offsetX;
    }
  }, {
    key: "offsetY",
    get: function get() {
      return this._offsetY;
    }
  }, {
    key: "speedMultiplier",
    get: function get() {
      return this._speedMultiplier;
    }
  }]);

  return AbstractRenderer;
}(_Renderer3.default);

exports.default = AbstractRenderer;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PixiRendererClockModel = function () {
  function PixiRendererClockModel() {
    _classCallCheck(this, PixiRendererClockModel);
  }

  _createClass(PixiRendererClockModel, [{
    key: "construct",
    value: function construct() {
      this._msElapsed = 0;
      this._msLimit = 0;
    }
  }, {
    key: "update",
    value: function update(msElapsed, msLimit) {
      this._msElapsed = msElapsed;
      this._msLimit = msLimit;
    }
  }, {
    key: "msElapsed",
    get: function get() {
      return this._msElapsed;
    }
  }, {
    key: "msLimit",
    get: function get() {
      return this._msLimit;
    }
  }, {
    key: "text",
    get: function get() {
      var msTotal = Math.max(0, this._msLimit - this._msElapsed);
      var s = Math.floor(msTotal / 1000);
      var ms = msTotal % 1000;
      s = s.toString();
      while (s.length < 2) {
        s = "0" + s;
      }ms = ms.toString();
      while (ms.length < 3) {
        ms = "0" + ms;
      }return "0:" + s + "." + ms;
    }
  }]);

  return PixiRendererClockModel;
}();

exports.default = PixiRendererClockModel;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugBattlefieldView = function (_AbstractPixiView) {
  _inherits(DebugBattlefieldView, _AbstractPixiView);

  function DebugBattlefieldView() {
    _classCallCheck(this, DebugBattlefieldView);

    return _possibleConstructorReturn(this, (DebugBattlefieldView.__proto__ || Object.getPrototypeOf(DebugBattlefieldView)).apply(this, arguments));
  }

  _createClass(DebugBattlefieldView, [{
    key: "_create",
    value: function _create(container) {
      var background = new PIXI.Graphics();
      background.beginFill(0x000000);
      background.lineStyle(1, 0xffff00, 0.8);
      background.drawRect(0, 0, this.model.width + 2 * this.model.margin, this.model.height + 2 * this.model.margin);
      background.endFill();
      container.addChild(background);
      background = new PIXI.Graphics();
      background.beginFill(0x000000);
      background.lineStyle(1, 0xffff00, 0.8);
      background.drawRect(this.model.margin, this.model.margin, this.model.width, this.model.height);
      background.endFill();
      container.addChild(background);
    }
  }, {
    key: "update",
    value: function update(events) {}
  }]);

  return DebugBattlefieldView;
}(_AbstractPixiView3.default);

exports.default = DebugBattlefieldView;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugClockView = function (_AbstractPixiView) {
  _inherits(DebugClockView, _AbstractPixiView);

  function DebugClockView(model) {
    _classCallCheck(this, DebugClockView);

    return _possibleConstructorReturn(this, (DebugClockView.__proto__ || Object.getPrototypeOf(DebugClockView)).call(this, model));
  }

  _createClass(DebugClockView, [{
    key: '_create',
    value: function _create(container) {
      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: '#00ff00'
      });

      this._label = new PIXI.Text("clock", labelStyle);
      this._label.x = 5;
      this._label.y = 5;
      container.addChild(this._label);
    }
  }, {
    key: 'update',
    value: function update(events) {
      this._label.text = this.model.text;
    }
  }]);

  return DebugClockView;
}(_AbstractPixiView3.default);

exports.default = DebugClockView;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiBulletView = __webpack_require__(12);

var _AbstractPixiBulletView2 = _interopRequireDefault(_AbstractPixiBulletView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugBulletView = function (_AbstractPixiBulletVi) {
  _inherits(DebugBulletView, _AbstractPixiBulletVi);

  function DebugBulletView(model) {
    _classCallCheck(this, DebugBulletView);

    return _possibleConstructorReturn(this, (DebugBulletView.__proto__ || Object.getPrototypeOf(DebugBulletView)).call(this, model));
  }

  _createClass(DebugBulletView, [{
    key: "_create",
    value: function _create(container) {
      var bullet = new PIXI.Graphics();
      bullet.beginFill(0x00ff00, 0.5);
      bullet.drawCircle(0, 0, 5);
      bullet.endFill();
      container.addChild(bullet);
    }
  }]);

  return DebugBulletView;
}(_AbstractPixiBulletView2.default);

exports.default = DebugBulletView;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiTankView2 = __webpack_require__(5);

var _AbstractPixiTankView3 = _interopRequireDefault(_AbstractPixiTankView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugTankView = function (_AbstractPixiTankView) {
  _inherits(DebugTankView, _AbstractPixiTankView);

  function DebugTankView(model) {
    _classCallCheck(this, DebugTankView);

    return _possibleConstructorReturn(this, (DebugTankView.__proto__ || Object.getPrototypeOf(DebugTankView)).call(this, model));
  }

  _createClass(DebugTankView, [{
    key: '_createBody',
    value: function _createBody() {
      var body = new PIXI.Graphics();
      body.lineStyle(1, 0xffff00, 0.8);
      body.beginFill(0x00ff00, 0.5);
      body.drawRect(-15, -15, 30, 30);
      body.endFill();
      return body;
    }
  }, {
    key: '_createGun',
    value: function _createGun() {
      var body = new PIXI.Graphics();
      body.beginFill(0x00ff00, 0.5);
      body.lineStyle(1, 0xffff00, 0.8);
      body.drawCircle(0, 0, 10);
      body.drawRect(0, -3, 30, 6);
      body.endFill();
      return body;
    }
  }, {
    key: '_createRadar',
    value: function _createRadar() {
      var body = new PIXI.Graphics();
      body.beginFill(0x00ff00, 0.5);
      body.lineStyle(1, 0xffff00, 0.8);
      body.drawRect(-3, -10, 6, 20);
      body.endFill();
      body.lineStyle();
      body.beginFill(0xaaffaa, 0.1);
      body.moveTo(0, -3);
      var radarRange = 300;
      var radarFocal = 6;
      var width = radarRange * Math.tan(radarFocal * (Math.PI / 180)) / 2;
      body.lineTo(radarRange, -width);
      body.lineTo(radarRange, width);
      body.lineTo(0, 3);
      return body;
    }
  }, {
    key: '_createLabel',
    value: function _createLabel() {
      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0x00ff00
      });
      var label = new PIXI.Text("", labelStyle);
      label.anchor.set(0.5, 0.5);
      label.x = 0;
      label.y = -40;
      return label;
    }
  }, {
    key: '_createHudBackground',
    value: function _createHudBackground() {
      var statusBarBg = new PIXI.Graphics();
      statusBarBg.beginFill(0x000000, 1);
      statusBarBg.lineStyle(1, 0xffff00, 0.8);
      statusBarBg.drawRect(-26, -3, 52, 6);
      statusBarBg.y = -30;
      return statusBarBg;
    }
  }, {
    key: '_createEnergyBar',
    value: function _createEnergyBar() {
      var energyBar = new PIXI.Graphics();
      energyBar.beginFill(0x00ff00, 1);
      energyBar.drawRect(0, -2, 50, 4);
      energyBar.x = -25;
      energyBar.y = -30;
      return energyBar;
    }
  }]);

  return DebugTankView;
}(_AbstractPixiTankView3.default);

exports.default = DebugTankView;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiRenderer2 = __webpack_require__(11);

var _AbstractPixiRenderer3 = _interopRequireDefault(_AbstractPixiRenderer2);

var _BWBattlefieldView = __webpack_require__(87);

var _BWBattlefieldView2 = _interopRequireDefault(_BWBattlefieldView);

var _BWClockView = __webpack_require__(88);

var _BWClockView2 = _interopRequireDefault(_BWClockView);

var _BWBulletView = __webpack_require__(89);

var _BWBulletView2 = _interopRequireDefault(_BWBulletView);

var _BWTankView = __webpack_require__(90);

var _BWTankView2 = _interopRequireDefault(_BWTankView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BWRenderer = function (_AbstractPixiRenderer) {
  _inherits(BWRenderer, _AbstractPixiRenderer);

  function BWRenderer() {
    _classCallCheck(this, BWRenderer);

    var _this = _possibleConstructorReturn(this, (BWRenderer.__proto__ || Object.getPrototypeOf(BWRenderer)).call(this, 'bw'));

    _this._bigBoomAnim = [];
    _this._smallBoomAnim = [];
    _this._shakeTimer = 0;
    return _this;
  }

  _createClass(BWRenderer, [{
    key: "onAssetsLoaded",
    value: function onAssetsLoaded() {
      for (var i = 0; i <= 9; i++) {
        this._bigBoomAnim.push(PIXI.Texture.fromFrame('big_boom_00' + i));
        this._smallBoomAnim.push(PIXI.Texture.fromFrame('small_boom_00' + i));
      }
    }
  }, {
    key: "initBatlefield",
    value: function initBatlefield(battlefield) {
      _get(BWRenderer.prototype.__proto__ || Object.getPrototypeOf(BWRenderer.prototype), "initBatlefield", this).call(this, battlefield);
    }
  }, {
    key: "renderTank",
    value: function renderTank(tank, events) {
      _get(BWRenderer.prototype.__proto__ || Object.getPrototypeOf(BWRenderer.prototype), "renderTank", this).call(this, tank, events);
      if (tank.energy == 0) {
        this._shakeTimer = 10;
        this._addExplosion(tank.x, tank.y, this._bigBoomAnim);
      }
    }
  }, {
    key: "renderBullet",
    value: function renderBullet(bullet, events) {
      _get(BWRenderer.prototype.__proto__ || Object.getPrototypeOf(BWRenderer.prototype), "renderBullet", this).call(this, bullet, events);
      if (bullet.exploded) {
        this._addExplosion(bullet.x, bullet.y, this._smallBoomAnim);
      }
    }
  }, {
    key: "postRender",
    value: function postRender() {
      _get(BWRenderer.prototype.__proto__ || Object.getPrototypeOf(BWRenderer.prototype), "postRender", this).call(this);
      if (this._shakeTimer > 0) {
        this._shakeTimer--;
        this.masterContainer.x = Math.random() * 10 - 5 - this.offsetX;
        this.masterContainer.y = Math.random() * 10 - 5 - this.offsetY;
      } else {
        this.masterContainer.x = -this.offsetX;
        this.masterContainer.y = -this.offsetY;
      }
    }
  }, {
    key: "_createBattlefieldView",
    value: function _createBattlefieldView(battlefield) {
      return new _BWBattlefieldView2.default(battlefield);
    }
  }, {
    key: "_createClockView",
    value: function _createClockView(clock) {
      return new _BWClockView2.default(clock);
    }
  }, {
    key: "_createBulletView",
    value: function _createBulletView(bullet) {
      return new _BWBulletView2.default(bullet);
    }
  }, {
    key: "_createTankView",
    value: function _createTankView(tank) {
      return new _BWTankView2.default(tank);
    }
  }, {
    key: "_addExplosion",
    value: function _addExplosion(x, y, type) {
      var anim = new PIXI.extras.AnimatedSprite(type);
      anim.anchor.set(0.5);
      this.masterContainer.addChild(anim);
      anim.x = x;
      anim.y = y;
      anim.loop = false;
      anim.onComplete = function () {
        this.stop();
        this.parent.removeChild(this);
      };
      anim.play();
    }
  }]);

  return BWRenderer;
}(_AbstractPixiRenderer3.default);

exports.default = BWRenderer;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BWBattlefieldView = function (_AbstractPixiView) {
  _inherits(BWBattlefieldView, _AbstractPixiView);

  function BWBattlefieldView() {
    _classCallCheck(this, BWBattlefieldView);

    return _possibleConstructorReturn(this, (BWBattlefieldView.__proto__ || Object.getPrototypeOf(BWBattlefieldView)).apply(this, arguments));
  }

  _createClass(BWBattlefieldView, [{
    key: '_create',
    value: function _create(container) {
      var background = PIXI.Sprite.fromFrame('battlefield');
      container.addChild(background);
    }
  }, {
    key: 'update',
    value: function update(events) {}
  }]);

  return BWBattlefieldView;
}(_AbstractPixiView3.default);

exports.default = BWBattlefieldView;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BWClockView = function (_AbstractPixiView) {
  _inherits(BWClockView, _AbstractPixiView);

  function BWClockView(model) {
    _classCallCheck(this, BWClockView);

    return _possibleConstructorReturn(this, (BWClockView.__proto__ || Object.getPrototypeOf(BWClockView)).call(this, model));
  }

  _createClass(BWClockView, [{
    key: '_create',
    value: function _create(container) {
      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 15,
        fill: '#000000'
      });

      this._label = new PIXI.Text("clock", labelStyle);
      this._label.x = 10;
      this._label.y = 600 - 20;
      container.addChild(this._label);
    }
  }, {
    key: 'update',
    value: function update(events) {
      this._label.text = this.model.text;
    }
  }]);

  return BWClockView;
}(_AbstractPixiView3.default);

exports.default = BWClockView;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiBulletView = __webpack_require__(12);

var _AbstractPixiBulletView2 = _interopRequireDefault(_AbstractPixiBulletView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BWBulletView = function (_AbstractPixiBulletVi) {
  _inherits(BWBulletView, _AbstractPixiBulletVi);

  function BWBulletView(model) {
    _classCallCheck(this, BWBulletView);

    return _possibleConstructorReturn(this, (BWBulletView.__proto__ || Object.getPrototypeOf(BWBulletView)).call(this, model));
  }

  _createClass(BWBulletView, [{
    key: '_create',
    value: function _create(container) {
      var bullet = PIXI.Sprite.fromFrame('bullet');
      bullet.anchor.set(0.5);
      container.addChild(bullet);
    }
  }]);

  return BWBulletView;
}(_AbstractPixiBulletView2.default);

exports.default = BWBulletView;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiTankView2 = __webpack_require__(5);

var _AbstractPixiTankView3 = _interopRequireDefault(_AbstractPixiTankView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BWTankView = function (_AbstractPixiTankView) {
  _inherits(BWTankView, _AbstractPixiTankView);

  function BWTankView(model) {
    _classCallCheck(this, BWTankView);

    return _possibleConstructorReturn(this, (BWTankView.__proto__ || Object.getPrototypeOf(BWTankView)).call(this, model));
  }

  _createClass(BWTankView, [{
    key: 'update',
    value: function update(events) {
      _get(BWTankView.prototype.__proto__ || Object.getPrototypeOf(BWTankView.prototype), 'update', this).call(this, events);
      this._shoot.alpha = this.model.isShooting ? 1 : this._shoot.alpha * 0.7;
    }
  }, {
    key: '_createBody',
    value: function _createBody() {
      var body = PIXI.Sprite.fromFrame('tank_body');
      body.anchor.set(0.5);
      return body;
    }
  }, {
    key: '_createGun',
    value: function _createGun() {
      var gunContainer = new PIXI.Container();

      var tankGun = PIXI.Sprite.fromFrame('tank_gun');
      tankGun.anchor.set(0.3, 0.5);
      gunContainer.addChild(tankGun);

      this._shoot = PIXI.Sprite.fromFrame('tank_shoot');
      this._shoot.anchor.set(-1.2, 0.5);
      this._shoot.alpha = 0;
      gunContainer.addChild(this._shoot);

      return gunContainer;
    }
  }, {
    key: '_createRadar',
    value: function _createRadar() {
      var tankRadar = PIXI.Sprite.fromFrame('tank_radar');
      tankRadar.anchor.set(0.5);
      return tankRadar;
    }
  }, {
    key: '_createLabel',
    value: function _createLabel() {
      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0x000000
      });
      var label = new PIXI.Text("", labelStyle);
      label.anchor.set(0.5, 0.5);
      label.x = 0;
      label.y = -40;
      return label;
    }
  }, {
    key: '_createHudBackground',
    value: function _createHudBackground() {
      var statusBarBg = new PIXI.Graphics();
      statusBarBg.beginFill(0x000000, 1);
      statusBarBg.drawRect(-26, -3, 52, 6);
      statusBarBg.y = -30;
      return statusBarBg;
    }
  }, {
    key: '_createEnergyBar',
    value: function _createEnergyBar() {
      var energyBar = new PIXI.Graphics();
      energyBar.beginFill(0xff0000, 1);
      energyBar.drawRect(0, -2, 50, 4);
      energyBar.x = -25;
      energyBar.y = -30;
      return energyBar;
    }
  }]);

  return BWTankView;
}(_AbstractPixiTankView3.default);

exports.default = BWTankView;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiRenderer2 = __webpack_require__(11);

var _AbstractPixiRenderer3 = _interopRequireDefault(_AbstractPixiRenderer2);

var _BrodyBattlefieldView = __webpack_require__(92);

var _BrodyBattlefieldView2 = _interopRequireDefault(_BrodyBattlefieldView);

var _BrodyClockView = __webpack_require__(93);

var _BrodyClockView2 = _interopRequireDefault(_BrodyClockView);

var _BrodyBulletView = __webpack_require__(94);

var _BrodyBulletView2 = _interopRequireDefault(_BrodyBulletView);

var _BrodyTankView = __webpack_require__(95);

var _BrodyTankView2 = _interopRequireDefault(_BrodyTankView);

var _BrodySettings = __webpack_require__(96);

var _BrodySettings2 = _interopRequireDefault(_BrodySettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrodyRenderer = function (_AbstractPixiRenderer) {
  _inherits(BrodyRenderer, _AbstractPixiRenderer);

  function BrodyRenderer() {
    _classCallCheck(this, BrodyRenderer);

    var _this = _possibleConstructorReturn(this, (BrodyRenderer.__proto__ || Object.getPrototypeOf(BrodyRenderer)).call(this, 'brody'));

    _this._bigBoomAnim = [];
    _this._shakeTimer = 0;
    _this._particleContainer = null;
    _this._particleList = [];
    _this._explosionList = [];
    _this._settings = new _BrodySettings2.default();
    _this._masterContainer.addChild(_this._bulletContainer);
    _this._frameTimer = 0;
    _this._frameCounter = 0;
    _this._fpsInterval = null;
    _this._fps = 30;
    return _this;
  }

  _createClass(BrodyRenderer, [{
    key: "onAssetsLoaded",
    value: function onAssetsLoaded() {
      var i = void 0;
      for (i = 0; i <= 22; i++) {
        this._bigBoomAnim.push(PIXI.Texture.fromFrame('big_boom_0' + (i < 10 ? "0" + i : i)));
      }
    }
  }, {
    key: "initBatlefield",
    value: function initBatlefield(battlefield) {
      _get(BrodyRenderer.prototype.__proto__ || Object.getPrototypeOf(BrodyRenderer.prototype), "initBatlefield", this).call(this, battlefield);
      this.battlefieldView.configure(this._settings);
      this._particleContainer = new PIXI.particles.ParticleContainer(1000, {
        position: true,
        rotation: true,
        alpha: true
      });
      this._masterContainer.addChild(this._particleContainer);
      this._masterContainer.addChild(this._hudContainer);

      var self = this;
      this._fpsInterval = setInterval(function () {
        self._fps = self._frameCounter;
        self._frameCounter = 0;
      }, 1000);
    }
  }, {
    key: "renderTank",
    value: function renderTank(tank, events) {
      _get(BrodyRenderer.prototype.__proto__ || Object.getPrototypeOf(BrodyRenderer.prototype), "renderTank", this).call(this, tank, events);

      var i = void 0;
      for (i in events) {
        if (events[i].type == 'destroy') {
          this._shakeTimer = 10;
          this._addTankExplosion(tank);
          break;
        }
      }

      var directionCorrection = tank.throttle > 0 ? 180 : 0;
      var dirtAngle = (tank.angle + directionCorrection) * (Math.PI / 180);
      if (tank.speed > 1) {
        var corner1X = tank.x + 20 * Math.cos(dirtAngle - Math.PI / 4) + 7 * Math.cos(dirtAngle);
        var corner1Y = tank.y + 20 * Math.sin(dirtAngle - Math.PI / 4) + 7 * Math.sin(dirtAngle);
        var corner2X = tank.x + 20 * Math.cos(dirtAngle + Math.PI / 4) + 7 * Math.cos(dirtAngle);
        var corner2Y = tank.y + 20 * Math.sin(dirtAngle + Math.PI / 4) + 7 * Math.sin(dirtAngle);

        if (Math.random() < this.speedMultiplier) {
          this._addDirt(corner1X, corner1Y);
          this._addDirt(corner2X, corner2Y);
        }
      }
    }
  }, {
    key: "renderBullet",
    value: function renderBullet(bullet, events) {
      _get(BrodyRenderer.prototype.__proto__ || Object.getPrototypeOf(BrodyRenderer.prototype), "renderBullet", this).call(this, bullet, events);
      var view = this.getBulletView(bullet.id);
      view.configure(this._settings);
      if (bullet.exploded) {
        this._addBulletExplosion(bullet);
        this.battlefieldView.addBulletHole(bullet.x, bullet.y, bullet.power);
      }
    }
  }, {
    key: "preRender",
    value: function preRender() {
      _get(BrodyRenderer.prototype.__proto__ || Object.getPrototypeOf(BrodyRenderer.prototype), "preRender", this).call(this);
      var particle = void 0;
      var particleCount = 0;
      var i = void 0;
      for (i = this._particleList.length - 1; i >= 0; i--) {
        particle = this._particleList[i];
        if (!particle) {
          continue;
        }

        particle.x += this.speedMultiplier * particle.speed * particle.rotation * Math.cos(particle.rotation);
        particle.y += this.speedMultiplier * particle.speed * particle.rotation * Math.sin(particle.rotation);
        particle.alpha = Math.max(0, particle.alpha - this.speedMultiplier * particle.alphaSpeed);

        particle.lifetime -= this.speedMultiplier;
        if (particle.lifetime <= 0 || particleCount > this._settings.particleLimit) {
          particle.parent.removeChild(particle);
          this._particleList[i] = null;
        } else {
          particleCount++;
        }
      }
      for (i = 0; i < this._explosionList.length; i++) {
        if (!this._explosionList[i]) continue;
        this._explosionList[i].alpha = this._explosionList[i].alpha - 0.12 * this.speedMultiplier;
        if (this._explosionList[i].alpha < 0.01) {
          this._explosionList[i].parent.removeChild(this._explosionList[i]);
          this._explosionList[i] = null;
        }
      }
    }
  }, {
    key: "postRender",
    value: function postRender() {
      this._frameTimer++;
      this._frameCounter++;
      if (this._frameTimer % this._settings.dropFrames == 0) {
        _get(BrodyRenderer.prototype.__proto__ || Object.getPrototypeOf(BrodyRenderer.prototype), "postRender", this).call(this);
      }
      if (this._shakeTimer > 0) {
        this._shakeTimer--;
        this.masterContainer.x = Math.random() * 10 - 5 - this.offsetX;
        this.masterContainer.y = Math.random() * 10 - 5 - this.offsetY;
        this._battlefieldView.view.x = Math.random() * 10 - 5;
        this._battlefieldView.view.y = Math.random() * 10 - 5;
      } else {
        this.masterContainer.x = -this.offsetX;
        this.masterContainer.y = -this.offsetY;
        this._battlefieldView.view.x = 0;
        this._battlefieldView.view.y = 0;
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._fpsInterval) {
        clearInterval(this._fpsInterval);
      }
    }
  }, {
    key: "_getSpritesheetUrls",
    value: function _getSpritesheetUrls(rendererName, rendererScale) {
      var resolution = rendererScale == 2 ? "retina@2x" : "web";
      if (rendererScale >= 2) {
        return ["img/spritesheets/" + rendererName + "/retina@2x/jsbattle_0.json", "img/spritesheets/" + rendererName + "/retina@2x/jsbattle_1.json"];
      } else {
        return ["img/spritesheets/" + rendererName + "/web/jsbattle.json"];
      }
    }
  }, {
    key: "_addTankExplosion",
    value: function _addTankExplosion(tank) {
      this._addExplosion(tank.x, tank.y, this._bigBoomAnim);
      this.battlefieldView.addCrater(tank.x, tank.y);
      this._addSparks(tank.x, tank.y, 300);
    }
  }, {
    key: "_addBulletExplosion",
    value: function _addBulletExplosion(bullet) {
      this._addGlow(bullet.x, bullet.y, 0.3 + 0.6 * bullet.power);
      var sparks = 5 + 40 * bullet.power;
      this._addSparks(bullet.x, bullet.y, sparks);
    }
  }, {
    key: "_createBattlefieldView",
    value: function _createBattlefieldView(battlefield) {
      return new _BrodyBattlefieldView2.default(battlefield);
    }
  }, {
    key: "_createClockView",
    value: function _createClockView(clock) {
      return new _BrodyClockView2.default(clock);
    }
  }, {
    key: "_createBulletView",
    value: function _createBulletView(bullet) {
      return new _BrodyBulletView2.default(bullet);
    }
  }, {
    key: "_createTankView",
    value: function _createTankView(tank) {
      return new _BrodyTankView2.default(tank);
    }
  }, {
    key: "_addExplosion",
    value: function _addExplosion(x, y, type) {
      this._addGlow(x, y, 5);

      var anim = new PIXI.extras.AnimatedSprite(type);
      anim.animationSpeed = this.speedMultiplier;
      anim.anchor.set(0.5);
      this.masterContainer.addChild(anim);
      anim.x = x;
      anim.y = y;
      anim.loop = false;
      anim.blendMode = PIXI.BLEND_MODES.ADD;
      anim.onComplete = function () {
        this.stop();
        this.parent.removeChild(this);
      };
      anim.play();
    }
  }, {
    key: "_addGlow",
    value: function _addGlow(x, y, scale) {
      if (!this._settings.showGlow) return;
      var glow = PIXI.Sprite.fromFrame('glow');
      glow.anchor.set(0.5);
      glow.scale.x = glow.scale.y = scale;
      glow.alpha = 0.4;
      glow.blendMode = PIXI.BLEND_MODES.ADD;
      glow.x = x;
      glow.y = y;
      this.masterContainer.addChild(glow);
      this._explosionList.push(glow);
    }
  }, {
    key: "_addSparks",
    value: function _addSparks(x, y, amount) {
      amount = Math.ceil(amount * this._settings.quality);
      for (var i = 0; i < amount; i++) {
        var particle = PIXI.Sprite.fromFrame('spark');
        particle.x = x;
        particle.y = y;
        particle.alphaSpeed = 0;
        particle.anchor.set(0.5);
        particle.speed = 1 + Math.random() * 2;
        particle.rotation = Math.random() * 2 * Math.PI;
        particle.lifetime = 5 + Math.random() * 5;
        this._particleContainer.addChild(particle);
        this._particleList.push(particle);
      }
    }
  }, {
    key: "_addDirt",
    value: function _addDirt(x, y) {
      if (!this._settings.showDirt) return;
      for (var i = 0; i < 5; i++) {
        var index = Math.floor(Math.random() * 3);
        var particle = PIXI.Sprite.fromFrame('dirt_' + index);
        particle.x = x + Math.random() * 4 - 2;
        particle.y = y + Math.random() * 4 - 2;
        particle.anchor.set(0.5);
        particle.speed = 0;
        particle.alphaSpeed = 0.02 + Math.random() * 0.02;
        particle.rotation = 0;
        particle.alpha = 0.1 + 0.4 * Math.random();
        particle.lifetime = 25;
        particle.scale.x = particle.scale.y = 0.5 + 2 * Math.random();
        this._particleContainer.addChild(particle);
        this._particleList.push(particle);
      }
    }
  }, {
    key: "quality",
    get: function get() {
      return this._settings.quality;
    },
    set: function set(v) {
      this._settings.quality = v;
    }
  }]);

  return BrodyRenderer;
}(_AbstractPixiRenderer3.default);

exports.default = BrodyRenderer;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrodyBattlefieldView = function (_AbstractPixiView) {
  _inherits(BrodyBattlefieldView, _AbstractPixiView);

  function BrodyBattlefieldView(model) {
    _classCallCheck(this, BrodyBattlefieldView);

    var _this = _possibleConstructorReturn(this, (BrodyBattlefieldView.__proto__ || Object.getPrototypeOf(BrodyBattlefieldView)).call(this, model));

    _this._holeList = [];
    _this._settings = null;
    return _this;
  }

  _createClass(BrodyBattlefieldView, [{
    key: 'configure',
    value: function configure(settings) {
      this._settings = settings;
    }
  }, {
    key: '_create',
    value: function _create(container) {
      var background = PIXI.Sprite.fromFrame('battlefield');
      container.addChild(background);

      var groundMask = new PIXI.Graphics();
      groundMask.beginFill(0x0000ff, 1);
      groundMask.moveTo(25, 25);
      groundMask.lineTo(900 - 25, 25);
      groundMask.lineTo(900 - 25, 600 - 25);
      groundMask.lineTo(90, 600 - 25);
      groundMask.lineTo(90, 600 - 35);
      groundMask.lineTo(25, 600 - 35);
      groundMask.lineTo(25, 25);
      groundMask.endFill();

      this._craterContainer = new PIXI.Container();
      this._craterContainer.mask = groundMask;
      container.addChild(this._craterContainer);
      container.addChild(groundMask);

      var wallMask = new PIXI.Graphics();
      wallMask.beginFill(0x0000ff, 0.4);
      wallMask.moveTo(15, 15);
      wallMask.lineTo(900 - 15, 15);
      wallMask.lineTo(900 - 15, 600 - 15);
      wallMask.lineTo(80, 600 - 15);
      wallMask.lineTo(80, 600 - 25);
      wallMask.lineTo(15, 600 - 25);
      wallMask.lineTo(15, 15);
      wallMask.lineTo(25, 25);
      wallMask.lineTo(25, 600 - 25);
      wallMask.lineTo(80, 600 - 25);
      wallMask.lineTo(80, 600 - 25);
      wallMask.lineTo(900 - 25, 600 - 25);
      wallMask.lineTo(900 - 25, 25);
      wallMask.lineTo(25, 25);
      wallMask.endFill();
      this._holesContainer = new PIXI.Container();
      this._holesContainer.mask = wallMask;
      container.addChild(this._holesContainer);
      container.addChild(wallMask);
    }
  }, {
    key: 'addCrater',
    value: function addCrater(x, y) {
      var crater = PIXI.Sprite.fromFrame('crater');
      crater.anchor.set(0.5);
      crater.x = x - this.model.offsetX;
      crater.y = y - this.model.offsetY;
      crater.blendMode = PIXI.BLEND_MODES.MULTIPLY;
      crater.alpha = 0.8;
      this._craterContainer.addChild(crater);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(BrodyBattlefieldView.prototype.__proto__ || Object.getPrototypeOf(BrodyBattlefieldView.prototype), 'update', this).call(this);
      this._holesContainer.visible = this._settings.skratchLimit > 0;
      this._craterContainer.visible = this._settings.showCraters;
    }
  }, {
    key: 'addBulletHole',
    value: function addBulletHole(x, y, power) {
      var rotation = 0;
      if (Math.abs(y - this.model.maxY) < 10) {
        y = this.model.maxY + 3 + Math.random() * 3;
      } else if (Math.abs(y - this.model.minY) < 10) {
        y = this.model.minY - 3 - Math.random() * 3;
      } else if (Math.abs(x - this.model.maxX) < 10) {
        x = this.model.maxX + 3 + Math.random() * 3;
        rotation = Math.PI / 2;
      } else if (Math.abs(x - this.model.minX) < 10) {
        x = this.model.minX - 3 - Math.random() * 3;
        rotation = Math.PI / 2;
      } else {
        return;
      }

      var hole = PIXI.Sprite.fromFrame('hole');
      hole.anchor.set(0.5);
      hole.x = x - this.model.offsetX;
      hole.y = y - this.model.offsetY;
      hole.rotation = rotation;
      hole.scale.x = hole.scale.y = 0.7 + 0.5 * power;
      this._holesContainer.addChild(hole);
      this._holeList.push(hole);
      var limit = this._settings ? this._settings.skratchLimit : 20;
      while (this._holeList.length > limit) {
        hole = this._holeList.shift();
        hole.parent.removeChild(hole);
      }
    }
  }]);

  return BrodyBattlefieldView;
}(_AbstractPixiView3.default);

exports.default = BrodyBattlefieldView;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPixiView2 = __webpack_require__(1);

var _AbstractPixiView3 = _interopRequireDefault(_AbstractPixiView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrodyClockView = function (_AbstractPixiView) {
  _inherits(BrodyClockView, _AbstractPixiView);

  function BrodyClockView(model) {
    _classCallCheck(this, BrodyClockView);

    return _possibleConstructorReturn(this, (BrodyClockView.__proto__ || Object.getPrototypeOf(BrodyClockView)).call(this, model));
  }

  _createClass(BrodyClockView, [{
    key: '_create',
    value: function _create(container) {
      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 15,
        fill: '#000000'
      });

      this._label = new PIXI.Text("clock", labelStyle);
      this._label.x = 10;
      this._label.y = 600 - 20;
      container.addChild(this._label);
    }
  }, {
    key: 'update',
    value: function update(events) {
      this._label.text = this.model.text;
    }
  }]);

  return BrodyClockView;
}(_AbstractPixiView3.default);

exports.default = BrodyClockView;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiBulletView = __webpack_require__(12);

var _AbstractPixiBulletView2 = _interopRequireDefault(_AbstractPixiBulletView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrodyBulletView = function (_AbstractPixiBulletVi) {
  _inherits(BrodyBulletView, _AbstractPixiBulletVi);

  function BrodyBulletView(model, settings) {
    _classCallCheck(this, BrodyBulletView);

    return _possibleConstructorReturn(this, (BrodyBulletView.__proto__ || Object.getPrototypeOf(BrodyBulletView)).call(this, model));
  }

  _createClass(BrodyBulletView, [{
    key: 'configure',
    value: function configure(settings) {
      this._settings = settings;
    }
  }, {
    key: 'update',
    value: function update(events) {
      _get(BrodyBulletView.prototype.__proto__ || Object.getPrototypeOf(BrodyBulletView.prototype), 'update', this).call(this, events);
      this._glow.visible = this._settings && this._settings.showGlow;
    }
  }, {
    key: '_create',
    value: function _create(container) {
      var bullet = PIXI.Sprite.fromFrame('bullet');
      bullet.anchor.set(0.5);
      var glow = PIXI.Sprite.fromFrame('glow');
      glow.anchor.set(0.5);
      glow.blendMode = PIXI.BLEND_MODES.ADD;
      glow.alpha = 0.1;
      this._glow = glow;
      container.addChild(glow);
      container.addChild(bullet);
    }
  }]);

  return BrodyBulletView;
}(_AbstractPixiBulletView2.default);

exports.default = BrodyBulletView;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals PIXI */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractPixiTankView2 = __webpack_require__(5);

var _AbstractPixiTankView3 = _interopRequireDefault(_AbstractPixiTankView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrodyTankView = function (_AbstractPixiTankView) {
  _inherits(BrodyTankView, _AbstractPixiTankView);

  function BrodyTankView(model) {
    _classCallCheck(this, BrodyTankView);

    var _this = _possibleConstructorReturn(this, (BrodyTankView.__proto__ || Object.getPrototypeOf(BrodyTankView)).call(this, model));

    _this._lightTimer = 0;
    return _this;
  }

  _createClass(BrodyTankView, [{
    key: 'update',
    value: function update(events) {
      _get(BrodyTankView.prototype.__proto__ || Object.getPrototypeOf(BrodyTankView.prototype), 'update', this).call(this, events);
      this._shoot.alpha = this._shoot.alpha * 0.8;
      this._tankGun.x = this._tankGun.x * 0.8;
      this.radar.rotation = (-this.model.gunAngle + this._model.radarAngle) * (Math.PI / 180);

      this._lightTimer = this.model.enemySpot ? this._lightTimer + 1 : 0;

      this._light.alpha = -Math.cos(this._lightTimer * 0.25) * 0.5 + 0.5;
    }
  }, {
    key: '_onShoot',
    value: function _onShoot(event) {
      _get(BrodyTankView.prototype.__proto__ || Object.getPrototypeOf(BrodyTankView.prototype), '_onShoot', this).call(this, event);
      this._tankGun.x = -1 - 3 * event.bullet.power;
      this._shoot.alpha = 1;
    }
  }, {
    key: '_create',
    value: function _create(container) {
      _get(BrodyTankView.prototype.__proto__ || Object.getPrototypeOf(BrodyTankView.prototype), '_create', this).call(this, container);
      this._tankGun.addChild(this.radar);
    }
  }, {
    key: '_createBody',
    value: function _createBody() {
      var body = PIXI.Sprite.fromFrame('tank_body_' + this.model.skin);
      body.anchor.set(0.3, 0.5);
      return body;
    }
  }, {
    key: '_createGun',
    value: function _createGun() {
      var gunContainer = new PIXI.Container();

      var tankGun = PIXI.Sprite.fromFrame('tank_gun_' + this.model.skin);
      tankGun.anchor.set(0.3, 0.5);
      gunContainer.addChild(tankGun);
      this._tankGun = tankGun;

      this._shoot = PIXI.Sprite.fromFrame('tank_shoot');
      this._shoot.anchor.set(0.3, 0.5);
      this._shoot.alpha = 0;

      this._light = PIXI.Sprite.fromFrame('tank_light');
      this._light.anchor.set(0.3, 0.5);
      this._light.alpha = 0;

      gunContainer.addChild(this._shoot);
      gunContainer.addChild(this._light);

      return gunContainer;
    }
  }, {
    key: '_createRadar',
    value: function _createRadar() {
      var tankRadar = PIXI.Sprite.fromFrame('tank_radar_' + this.model.skin);
      tankRadar.anchor.set(0.2, 0.5);
      tankRadar.x = -5;
      return tankRadar;
    }
  }, {
    key: '_createLabel',
    value: function _createLabel() {
      var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 10,
        stroke: 0x000000,
        strokeThickness: 2,
        fill: 0xffffbb
      });
      var label = new PIXI.Text("", labelStyle);
      label.anchor.set(0.5, 0.5);
      label.x = 0;
      label.y = -40;
      return label;
    }
  }, {
    key: '_createHudBackground',
    value: function _createHudBackground() {
      var statusBarBg = new PIXI.Graphics();
      statusBarBg.beginFill(0x000000, 1);
      statusBarBg.drawRect(-26, -3, 52, 6);
      statusBarBg.y = -30;
      return statusBarBg;
    }
  }, {
    key: '_createEnergyBar',
    value: function _createEnergyBar() {
      var energyBar = new PIXI.Graphics();
      energyBar.beginFill(0xffff99, 1);
      energyBar.drawRect(0, -2, 50, 4);
      energyBar.x = -25;
      energyBar.y = -30;
      return energyBar;
    }
  }]);

  return BrodyTankView;
}(_AbstractPixiTankView3.default);

exports.default = BrodyTankView;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrodySettings = function () {
  function BrodySettings(model) {
    _classCallCheck(this, BrodySettings);

    this._particleLimit = 1000;
    this._skratchLimit = 100;
    this._showDirt = true;
    this._showGlow = true;
    this._showCraters = true;
    this._dropFrames = 1;
    this._quality = 1;
    this.quality = this._quality;
  }

  _createClass(BrodySettings, [{
    key: 'dropFrames',
    get: function get() {
      return this._dropFrames;
    }
  }, {
    key: 'particleLimit',
    get: function get() {
      return this._particleLimit;
    }
  }, {
    key: 'skratchLimit',
    get: function get() {
      return this._skratchLimit;
    }
  }, {
    key: 'showDirt',
    get: function get() {
      return this._showDirt;
    }
  }, {
    key: 'showGlow',
    get: function get() {
      return this._showGlow;
    }
  }, {
    key: 'showCraters',
    get: function get() {
      return this._showCraters;
    }
  }, {
    key: 'quality',
    get: function get() {
      return this._quality;
    },
    set: function set(v) {
      v = Math.min(1, Math.max(0, v));
      this._quality = v;
      this._particleLimit = Math.round(1000 * v * v);
      this._skratchLimit = Math.round(100 * v);
      this._showDirt = v > 0.2;
      this._showGlow = v > 0.5;
      this._showCraters = v > 0.1;
      if (v > 0.3) {
        this._dropFrames = 1;
      } else if (v > 0.2) {
        this._dropFrames = 2;
      } else if (v > 0.1) {
        this._dropFrames = 3;
      } else {
        this._dropFrames = 4;
      }
      this._quality = v;
    }
  }]);

  return BrodySettings;
}();

exports.default = BrodySettings;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(10);

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoidRenderer = function (_Renderer) {
  _inherits(VoidRenderer, _Renderer);

  function VoidRenderer() {
    _classCallCheck(this, VoidRenderer);

    return _possibleConstructorReturn(this, (VoidRenderer.__proto__ || Object.getPrototypeOf(VoidRenderer)).apply(this, arguments));
  }

  _createClass(VoidRenderer, [{
    key: "renderTank",
    value: function renderTank(tank, events) {}
  }, {
    key: "renderBullet",
    value: function renderBullet(bullet, events) {}
  }, {
    key: "loadAssets",
    value: function loadAssets(done) {
      done();
    }
  }, {
    key: "init",
    value: function init() {}
  }]);

  return VoidRenderer;
}(_Renderer3.default);

exports.default = VoidRenderer;

/***/ })
/******/ ]);
//# sourceMappingURL=jsbattle.js.map