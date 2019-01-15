/**
 *  求解最大子数组 p67
 */
import {assession, lang} from '../../utils'

function max(array, getVal) {
  assession(array, 'Array')
  if (array.length < 1) return undefined
  let maxIdx = -1
  let maxVal
  array.forEach((item, idx) => {
    let val = lang.isFunction(getVal) ? getVal(item) : item
    if (!maxVal) {
      maxVal = val
      maxIdx = idx
    } else if (val > maxVal) {
      maxVal = val
      maxIdx = idx
    }
  })
  return array[maxIdx]
}
/**
 * O(n^2)
 * @param {*} array 
 */
export function findMaxSubArray(array) {
  assession(array, 'Array')
  // let sums = []
  let maxSum = {
    sum: array[0],
    start: 0,
    end: 0
  }
  if (array.length < 1) return undefined
  let sums = []

  for(let i = 0; i < array.length - 1; i++) {
    let item = {
      sum: array[i],
      start: i,
      end: i
    }
    sums.push(item)
    if (item.sum > maxSum.sum) {
      maxSum = item
    }
    let lastSum = item
    for(let j = i + 1; j < array.length; j++) {
      let item = {
        sum: lastSum.sum + array[j],
        start: lastSum.start,
        end: j,
        // list: array.slice(lastSum.start, j + 1)
      }
      sums.push(item)
      if (item.sum > maxSum.sum) {
        maxSum = item
      }
      lastSum = item
    }
  }
  // console.log(sums)

  return maxSum
}

/**
 * O(nlgn)
 * 分治
 * @param {*} array 
 */
export function findMaxSubArray2(array, start = 0, end = array.length - 1) {
  function findCrossMaxSub(array, start, mid, end) {
    assession(array, 'Array')
    let leftSum = -Infinity
    let rightSum = -Infinity
    let maxLeftIdx, maxRightIdx, right, left
    let sum = 0
    maxLeftIdx = left = mid
    maxRightIdx = right = mid + 1
    
    while(left >= start) {
      sum += array[left]
      if (sum > leftSum) {
        leftSum = sum
        maxLeftIdx = left
      }
      left--
    }
    sum = 0
    while(right <= end) {
      sum += array[right]
      if (sum > rightSum) {
        rightSum = sum
        maxRightIdx = right
      }
      right++
    }
    return {
      sum: leftSum + rightSum,
      start: maxLeftIdx,
      end: maxRightIdx
    }
  }
  assession(array, 'Array')
  if (start === end) {
    return {
      sum: array[start],
      start,
      end,
    }
  } else {
    let mid = Math.floor((start + end) / 2)
    let leftMaxSub = findMaxSubArray2(array, start, mid)
    let rightMaxSub = findMaxSubArray2(array, mid + 1, end)
    let crossMaxSub = findCrossMaxSub(array, start, mid, end)
    return max([leftMaxSub, rightMaxSub, crossMaxSub], item => item.sum)
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