'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;

var _assession = require('../../utils/assession');

var _assession2 = _interopRequireDefault(_assession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function binarySearch(array, value) {
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : array.length - 1;

  (0, _assession2.default)(array, 'Array');
  if (array.length === 0 || end - start < 0) return -1;
  var midIdx = Math.floor((start + end) / 2);

  while (array[midIdx] !== value && start < end) {
    if (value < array[midIdx]) {
      end = midIdx - 1;
    } else {
      start = midIdx + 1;
    }
    midIdx = Math.floor((start + end) / 2);
  }

  return array[midIdx] !== value ? -1 : midIdx;
}