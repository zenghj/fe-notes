// 逆序对

import {assession} from '../../utils'
import { mergeSort } from '../../utils/sort/merge-sort';
/**
 * O(n^2)
 * @param {*} array 
 */
export function inversionPair(array) {
  assession(array, 'Array')
  let count = 0
  if (array.length < 2) return count
  
  for(let i = 0; i < array.length - 1; i++) {
    for(let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        count++
      }
    }
  }
  return count
}

/**
 * O(nlgn)
 */
export function inversionPair2(array, left = 0, right = array.length - 1) {
  function merge(array, left, mid, right) {
    let i = left
    let j = mid + 1
    let count = 0
    let tmp = []
    while(i <= mid && j <= right) {
      if (array[i] > array[j]) {
        count += mid - i + 1
        tmp.push(array[j++])
      } else {
        tmp.push(array[i++])
      }
    }
    while (i <= mid) {
      tmp.push(array[i])
      i++
    }
    while (j <= right) {
      tmp.push(array[j])
      j++
    }
    
    for(let k = left; k <= right; k++) { // 将原数组排序
      array[k] = tmp[k - left]
    }
    return count
  }
  assession(array, 'Array')
  let count = 0
 
  if (right - left < 1) return count
  let mid = Math.floor((left + right) / 2)
  
  return inversionPair2(array, left, mid) + inversionPair2(array, mid + 1, right) + merge(array, left, mid, right)
}

