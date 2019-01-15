'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertSort = insertSort;
exports.insertSort2 = insertSort2;

var _index = require('../index.js');

var _sortUtil = require('./sort-util');

function insertSort(array) {
  (0, _index.assession)(array, 'Array', 'arr should be an array');
  var len = array.length;
  if (len < 2) return array;
  for (var i = 1; i < len; i++) {
    var j = i - 1;
    while (j >= 0 && array[j] > array[j + 1]) {
      (0, _sortUtil.swap)(array, j, j + 1);
      j--;
    }
  }
  return array;
}

function insertSort2(array) {
  var descend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  (0, _index.assession)(array, 'Array', 'arr should be an array');
  var len = array.length;
  if (len < 2) return array;

  var _loop = function _loop(i) {
    var j = i - 1;
    var shouldSwap = function shouldSwap() {
      return descend ? array[j + 1] > array[j] : array[j] > array[j + 1];
    };
    while (j >= 0 && shouldSwap()) {
      (0, _sortUtil.swap)(array, j, j + 1);
      j--;
    }
  };

  for (var i = 1; i < len; i++) {
    _loop(i);
  }
  return array;
}