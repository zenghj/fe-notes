'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swap = swap;

var _index = require('../index.js');

function swap(array, i, j) {
  (0, _index.assession)(array, 'Array');
  if (i === j) return array;
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
  return array;
}