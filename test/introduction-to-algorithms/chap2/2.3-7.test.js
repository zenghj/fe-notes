import { findSumEqual, findSumEqual2 } from '../../../lib/introduction-to-algorithms/chap2/2.3-7'
import { lang } from '../../../lib/utils/index'
import { task, getRandomNumArrayPair } from '../../testUtils'
import { expect } from 'chai'

const taskTimes = 1

describe('#findSumEqual', function() {
  describe('#findSumEqual', function() {
    task(function() {
      let array = [0, 3, 7, 8, 10]
      it(`should return true`, function() {
        expect(findSumEqual(array, 13)).to.equal(true)
      })
      it(`should return false`, function() {
        expect(findSumEqual(array, 19)).to.equal(false)
      })
    }, taskTimes)
  })
  describe('#findSumEqual2', function() {
    task(function() {
      let array = [0, 3, 7, 8, 10]
      it(`findSumEqual2(array, 13) should return true`, function() {
        expect(findSumEqual2(array, 13)).to.equal(true)
      })
      it(`findSumEqual2(array, 19) should return false`, function() {
        expect(findSumEqual2(array, 19)).to.equal(false)
      })
    }, taskTimes)
  })
})
