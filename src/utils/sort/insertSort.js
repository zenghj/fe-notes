import {assession} from '../index.js'
import {swap} from './sort-util'
export function insertSort(array) {
  assession(array, 'Array', 'arr should be an array')
  let len = array.length
  if(len < 2) return array
  for(let i = 1; i < len; i++) {
    let j = i - 1
    while(j >= 0 && array[j] > array[j+1]) {
      swap(array, j, j+1)
      j--
    }
  }
  return array
}

export function insertSort2(array, descend = false) {
  assession(array, 'Array', 'arr should be an array')
  let len = array.length
  if(len < 2) return array

  for(let i = 1; i < len; i++) {
    let j = i - 1
    let shouldSwap = function() {
      return descend ? (array[j+1] > array[j]) : (array[j] > array[j+1])
    }
    while(j >= 0 && shouldSwap()) {
      swap(array, j, j+1)
      j--
    }
  }
  return array
}