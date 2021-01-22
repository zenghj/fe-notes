'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMaxSubArray = findMaxSubArray;
exports.findMaxSubArray2 = findMaxSubArray2;

var _utils = require('../../utils');

function max(array, getVal) {
  (0, _utils.assession)(array, 'Array');
  if (array.length < 1) return undefined;
  var maxIdx = -1;
  var maxVal = void 0;
  array.forEach(function (item, idx) {
    var val = _utils.lang.isFunction(getVal) ? getVal(item) : item;
    if (!maxVal) {
      maxVal = val;
      maxIdx = idx;
    } else if (val > maxVal) {
      maxVal = val;
      maxIdx = idx;
    }
  });
  return array[maxIdx];
}
/**
 * O(n^2)
 * @param {*} array 
 */
/**
 *  求解最大子数组 p67
 */
function findMaxSubArray(array) {
  (0, _utils.assession)(array, 'Array');
  // let sums = []
  var maxSum = {
    sum: array[0],
    start: 0,
    end: 0
  };
  if (array.length < 1) return undefined;
  var sums = [];

  for (var i = 0; i < array.length - 1; i++) {
    var item = {
      sum: array[i],
      start: i,
      end: i
    };
    sums.push(item);
    if (item.sum > maxSum.sum) {
      maxSum = item;
    }
    var lastSum = item;
    for (var j = i + 1; j < array.length; j++) {
      var _item = {
        sum: lastSum.sum + array[j],
        start: lastSum.start,
        end: j
        // list: array.slice(lastSum.start, j + 1)
      };
      sums.push(_item);
      if (_item.sum > maxSum.sum) {
        maxSum = _item;
      }
      lastSum = _item;
    }
  }
  // console.log(sums)

  return maxSum;
}

/**
 * O(nlgn)
 * 分治
 * @param {*} array 
 */
function findMaxSubArray2(array) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : array.length - 1;

  function findCrossMaxSub(array, start, mid, end) {
    (0, _utils.assession)(array, 'Array');
    var leftSum = -Infinity;
    var rightSum = -Infinity;
    var maxLeftIdx = void 0,
        maxRightIdx = void 0,
        right = void 0,
        left = void 0;
    var sum = 0;
    maxLeftIdx = left = mid;
    maxRightIdx = right = mid + 1;

    while (left >= start) {
      sum += array[left];
      if (sum > leftSum) {
        leftSum = sum;
        maxLeftIdx = left;
      }
      left--;
    }
    sum = 0;
    while (right <= end) {
      sum += array[right];
      if (sum > rightSum) {
        rightSum = sum;
        maxRightIdx = right;
      }
      right++;
    }
    return {
      sum: leftSum + rightSum,
      start: maxLeftIdx,
      end: maxRightIdx
    };
  }
  (0, _utils.assession)(array, 'Array');
  if (start === end) {
    return {
      sum: array[start],
      start: start,
      end: end
    };
  } else {
    var mid = Math.floor((start + end) / 2);
    var leftMaxSub = findMaxSubArray2(array, start, mid);
    var rightMaxSub = findMaxSubArray2(array, mid + 1, end);
    var crossMaxSub = findCrossMaxSub(array, start, mid, end);
    return max([leftMaxSub, rightMaxSub, crossMaxSub], function (item) {
      return item.sum;
    });
  }
}

// export function findMaxSubArray3(array, start = 0, end = array.length - 1) {
//   assession(array, 'Array')
//   if (array.length < 1) return undefined
//   let maxSum = {
//     sum: array[0],
//     start: 0,
//     end: 0,
//   }
//   for(let i = 1; i < array.length; i++) {

//   }
// }