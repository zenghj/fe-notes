import {assession} from '../index.js'
import {swap} from './sort-util';

export function selectSort(array) {
  assession(array, 'Array', 'arr should be an array')
  let len = array.length
  let smallestIdx
  for(let i = 0; i < len - 1; i++) {
    smallestIdx = i
    for(let j = i + 1; j < len; j++) {
      if (array[j] < array[smallestIdx]) {
        smallestIdx = j
      }
    }
    swap(array, i, smallestIdx)
  }
  return array
}