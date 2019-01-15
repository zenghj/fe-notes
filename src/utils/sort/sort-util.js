import {assession} from '../index.js'
export function swap(array, i, j) {
  assession(array, 'Array')
  if (i === j) return array
  let tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
  return array
}