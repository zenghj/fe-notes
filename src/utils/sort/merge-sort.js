import {assession} from '../index.js'
import {swap} from './sort-util';

function merge(left, right) {
  let result = []
  let lLen = left.length
  let rLen = right.length
  let i = 0
  let j = 0
  while (i < lLen && j < rLen) {
    if (left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }
  if (i < lLen) {
    while(i < lLen) {
      result.push(left[i])
      i++
    }
  }
  if (j < rLen) {
    while(j < rLen) {
      result.push(right[j])
      j++
    }
  }
  return result
}

export function mergeSort(array) {
  assession(array, 'Array')
  let len = array.length
  if (len <= 1) return array

  let r = Math.floor(len / 2)
  let left = array.slice(0, r)
  let right = array.slice(r, len)
  return merge(mergeSort(left), mergeSort(right))
} 