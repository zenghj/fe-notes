'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bubbleSort = bubbleSort;

var _index = require('../index.js');

var _sortUtil = require('./sort-util');

function bubbleSort(array) {
  (0, _index.assession)(array, 'Array');
  for (var i = 0; i < array.length - 1; i++) {
    // n
    for (var j = 1; j < array.length - i; j++) {
      // n - i
      if (array[j - 1] > array[j]) {
        (0, _sortUtil.swap)(array, j - 1, j);
      }
    }
  }
  return array;
}