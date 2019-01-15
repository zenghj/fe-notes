import {binarySearch} from '../../../lib/introduction-to-algorithms/utils/binary-search'
import { task, getRandomNumArrayPair } from '../../testUtils'
import { expect } from 'chai'

const taskTimes = 1

describe('#binarySearch', function() {
  describe('#binarySearch', function() {
    task(function() {
      let array = [0, 3, 7, 8, 10]
      it(`should return true`, function() {
        expect(binarySearch(array, 8)).to.equal(array.findIndex(item => item === 8))
      })
      it(`should return false`, function() {
        expect(binarySearch(array, 19)).to.equal(-1)
      })
    }, taskTimes)
  })
})
