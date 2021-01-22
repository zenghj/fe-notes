'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // https://www.npmjs.com/package/extend


exports.default = extend;

var _lang = require('./lang');

var objProto = Object.prototype;
var toStr = objProto.toString;
var hasOwn = objProto.hasOwnProperty;

// function isObject(obj) {
//   return toStr.call(obj) === '[object Object]'
// }
// function isPlainObject(obj) {
//   if (!obj || !isObject(obj)) {
//     return false
//   }

//   const hasOwnConstruct = hasOwn.call(obj, 'construct')
//   if (obj.construct && !hasOwnConstruct && obj.construct.prototype && !hasOwn.call(obj.construct.prototype, 'isPrototypeof')) {
//     return false
//   }
//   let key
//   for(key in obj) {}
//   return typeof key === 'undefined' || hasOwn.call(obj, key)
// }

function extend(deep, target) {
  var copies = [];
  if (typeof deep !== 'boolean') {
    target = deep;
    deep = false;
    copies = [].slice.call(arguments, 1);
  } else {
    copies = [].slice.call(arguments, 2);
  }
  if (target == null || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
    target = {};
  }
  for (var i = 0; i < copies.length; i++) {
    var copy = copies[i];
    for (var key in copy) {
      var copyVal = copy[key];
      var srcVal = target[key];
      var valIsArray = false;
      var deepTarget = void 0;
      if (deep && copyVal && ((0, _lang.isPlainObject)(copyVal) || (valIsArray = Array.isArray(copyVal)))) {
        if (valIsArray) {
          valIsArray = false;
          deepTarget = Array.isArray(srcVal) ? srcVal : [];
        } else {
          deepTarget = (0, _lang.isPlainObject)(srcVal) ? srcVal : {};
        }
        target[key] = extend(deep, deepTarget, copyVal);
      } else if (typeof copyVal !== 'undefined') {
        target[key] = copyVal;
      }
    }
  }

  return target;
}