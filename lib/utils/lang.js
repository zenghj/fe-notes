'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getRandomNum = getRandomNum;
exports.isPlainObject = isPlainObject;
var objProto = Object.prototype;
var types = ['Object', 'Array', 'Function', 'String', 'Number', 'Boolean', 'Undefined', 'Null', 'Symbol'];
var typeUtils = types.reduce(function (utilObj, type) {
  utilObj['is' + type] = function (obj) {
    return objProto.toString.call(obj) === '[object ' + type + ']';
  };
  return utilObj;
}, {});

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isPlainObject(obj) {
  if (!obj || !typeUtils.isObject(obj)) {
    return false;
  }

  var proto = Object.getPrototypeOf(obj);
  return proto === Object.prototype || proto === null; // Object.create(null)
}

exports.default = _extends({}, typeUtils, {
  getRandomNum: getRandomNum
});