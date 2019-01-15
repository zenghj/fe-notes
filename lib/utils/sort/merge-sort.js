'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeSort = mergeSort;

var _index = require('../index.js');

var _sortUtil = require('./sort-util');

function merge(left, right) {
  var result = [];
  var lLen = left.length;
  var rLen = right.length;
  var i = 0;
  var j = 0;
  while (i < lLen && j < rLen) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  if (i < lLen) {
    while (i < lLen) {
      result.push(left[i]);
      i++;
    }
  }
  if (j < rLen) {
    while (j < rLen) {
      result.push(right[j]);
      j++;
    }
  }
  return result;
}

function mergeSort(array) {
  (0, _index.assession)(array, 'Array');
  var len = array.length;
  if (len <= 1) return array;

  var r = Math.floor(len / 2);
  var left = array.slice(0, r);
  var right = array.slice(r, len);
  return merge(mergeSort(left), mergeSort(right));
}