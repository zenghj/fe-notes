'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inversionPair = inversionPair;
exports.inversionPair2 = inversionPair2;

var _utils = require('../../utils');

var _mergeSort = require('../../utils/sort/merge-sort');

/**
 * O(n^2)
 * @param {*} array 
 */
// 逆序对

function inversionPair(array) {
  (0, _utils.assession)(array, 'Array');
  var count = 0;
  if (array.length < 2) return count;

  for (var i = 0; i < array.length - 1; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        count++;
      }
    }
  }
  return count;
}

/**
 * O(nlgn)
 */
function inversionPair2(array) {
  var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : array.length - 1;

  function merge(array, left, mid, right) {
    var i = left;
    var j = mid + 1;
    var count = 0;
    var tmp = [];
    while (i <= mid && j <= right) {
      if (array[i] > array[j]) {
        count += mid - i + 1;
        tmp.push(array[j++]);
      } else {
        tmp.push(array[i++]);
      }
    }
    while (i <= mid) {
      tmp.push(array[i]);
      i++;
    }
    while (j <= right) {
      tmp.push(array[j]);
      j++;
    }

    for (var k = left; k <= right; k++) {
      // 将原数组排序
      array[k] = tmp[k - left];
    }
    return count;
  }
  (0, _utils.assession)(array, 'Array');
  var count = 0;

  if (right - left < 1) return count;
  var mid = Math.floor((left + right) / 2);

  return inversionPair2(array, left, mid) + inversionPair2(array, mid + 1, right) + merge(array, left, mid, right);
}