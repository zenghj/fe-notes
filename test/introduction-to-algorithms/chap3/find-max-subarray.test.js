import { findMaxSubArray, findMaxSubArray2 } from '../../../lib/introduction-to-algorithms/chap3/find-max-subarray'
import { lang } from '../../../lib/utils/index'
import { task, getRandomNumArrayPair } from '../../testUtils'
import { expect } from 'chai'

const testCases = [
  {
    list: [-2, 11, -4, 13, -5, -2],
    maxSubList: [11, -4, 13],
    start: 1,
    end: 3,
    sum: 20
  },
  {
    list: [-10, 1, 2, 3, 4, -5, -23, 3, 7, -21],
    maxSubList: [1, 2, 3, 4],
    start: 1,
    end: 4,
    sum: 10
  },
]
describe('#findMaxSubArray', function() {
  describe('#findMaxSubArray', function() {
    testCases.forEach(item => {
      it(`origin ${item.list} should return ${item.maxSubList}`, function() {
        expect(findMaxSubArray(item.list)).to.include({
          start: item.start,
          end: item.end,
          sum: item.sum
        })
      })
    })
  })

  describe('#findMaxSubArray2', function() {
    testCases.forEach(item => {
      it(`origin ${item.list} should return ${item.maxSubList}`, function() {
        expect(findMaxSubArray2(item.list)).to.include({
          start: item.start,
          end: item.end,
          sum: item.sum
        })
      })
    })
  })
})