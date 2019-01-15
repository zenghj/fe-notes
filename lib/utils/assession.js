'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assession;

var _index = require('./index.js');

/**
 * @param {*} obj 
 * @param {*} type 
 * @param {*} msg 
 */
function assession(obj, type) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Error';

  var typeFn = _index.lang['is' + type];
  if (_index.lang.isFunction(typeFn)) {
    if (!typeFn(obj, type)) {
      throw new Error(msg);
    }
  } else if (_index.lang.isFunction(type)) {
    if (!type(obj)) {
      throw new Error(msg);
    }
  } else {
    throw new Error('assession argument illegal');
  }
}