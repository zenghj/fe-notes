'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSumEqual = findSumEqual;
exports.findSumEqual2 = findSumEqual2;

var _utils = require('../../utils');

var _mergeSort = require('../../utils/sort/merge-sort');

var _binarySearch = require('../utils/binary-search');

/**
 * O(n^2)
 * @param {*} array 
 * @param {*} sum 
 */
function findSumEqual(array, sum) {
  (0, _utils.assession)(array, 'Array');
  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === sum) return true;
    }
  }
  return false;
}
/**
 * O(nlgn)
 * @param {*} array 
 * @param {*} sum 
 */
function findSumEqual2(array, sum) {
  (0, _utils.assession)(array, 'Array');
  array = (0, _mergeSort.mergeSort)(array);
  for (var i = 0; i < array.length - 1; i++) {
    if ((0, _binarySearch.binarySearch)(array, sum - array[i], i + 1, array.length - 1) >= 0) {
      return true;
    }
  }
  return false;
}

/* 继续优化的思路
* 1. 变成非负集合，然后去掉比value大的值，减少查找项
*
*/