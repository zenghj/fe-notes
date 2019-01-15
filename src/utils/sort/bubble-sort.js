import {assession} from '../index.js'
import {swap} from './sort-util'

export function bubbleSort(array) {
  assession(array, 'Array')
  for(let i = 0; i < array.length - 1; i++) { // n
    for(let j = 1; j < array.length - i; j++) { // n - i
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j)
      }
    }
  }
  return array
}