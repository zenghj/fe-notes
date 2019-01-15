import assession from '../../utils/assession'
export function binarySearch(array, value, start = 0, end = array.length - 1) {
  assession(array, 'Array')
  if (array.length === 0 || end - start < 0) return -1
  let midIdx = Math.floor((start + end) / 2)
  
  while(array[midIdx] !== value && start < end) {
    if (value < array[midIdx]) {
      end = midIdx - 1
    } else {
      start = midIdx + 1
    }
    midIdx = Math.floor((start + end) / 2)
  }

  return array[midIdx] !== value ? -1 : midIdx
}