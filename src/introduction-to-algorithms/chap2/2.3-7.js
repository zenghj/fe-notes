import {assession} from '../../utils'
import {mergeSort} from '../../utils/sort/merge-sort'
import {binarySearch} from '../utils/binary-search'
/**
 * O(n^2)
 * @param {*} array 
 * @param {*} sum 
 */
export function findSumEqual (array, sum) {
  assession(array, 'Array')
  for(let i = 0; i < array.length; i++) {
    for(let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === sum) return true
    }
  }
  return false
}
/**
 * O(nlgn)
 * @param {*} array 
 * @param {*} sum 
 */
export function findSumEqual2(array, sum) {
  assession(array, 'Array')
  array = mergeSort(array)
  for(let i = 0; i < array.length - 1; i++) {
    if (binarySearch(array, sum - array[i], i + 1, array.length - 1) >= 0) {
      return true
    }
  }
  return false
}

/* 继续优化的思路
* 1. 变成非负集合，然后去掉比value大的值，减少查找项
*
*/