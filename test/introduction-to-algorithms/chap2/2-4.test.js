import { inversionPair, inversionPair2 } from '../../../lib/introduction-to-algorithms/chap2/2-4'
import { lang } from '../../../lib/utils/index'
import { task, getRandomNumArrayPair } from '../../testUtils'
import { expect } from 'chai'

const taskTimes = 1
const cases = [
  {
    list: [0, 3, 7, 8, 10],
    count: 0,
    reverseCount: 5 * 4 / 2
  }, 
  {
    list: [2, 3, 8, 6, 1],
    count: 5,
    reverseCount: 5
  }, 
  {
    list: [],
    count: 0,
    reverseCount: 0
  }, 
  {
    list: [1],
    count: 0,
    reverseCount: 0
  }
]
describe('#inversionPair', function() {
  describe('#inversionPair', function() {
    cases.forEach(function(item) {
      it(`should return ${item.count}`, function() {
        expect(inversionPair([...item.list])).to.equal(item.count)
      })
      it(`reverseCount should return ${item.reverseCount}`, function() {
        expect(inversionPair([...item.list].reverse())).to.equal(item.reverseCount)
      })
    })
  })
  describe('#inversionPair2', function() {
    cases.forEach(function(item) {
      it(`should return ${item.count}`, function() {
        expect(inversionPair2([...item.list])).to.equal(item.count)
      })

      it(`reverseCount ${item.list} should return ${item.reverseCount}`, function() {
        expect(inversionPair2([...item.list].reverse())).to.equal(item.reverseCount)
      })
    })
  })
})
