'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSort = selectSort;

var _index = require('../index.js');

var _sortUtil = require('./sort-util');

function selectSort(array) {
  (0, _index.assession)(array, 'Array', 'arr should be an array');
  var len = array.length;
  var smallestIdx = void 0;
  for (var i = 0; i < len - 1; i++) {
    smallestIdx = i;
    for (var j = i + 1; j < len; j++) {
      if (array[j] < array[smallestIdx]) {
        smallestIdx = j;
      }
    }
    (0, _sortUtil.swap)(array, i, smallestIdx);
  }
  return array;
}