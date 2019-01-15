import { mergeSort } from '../../lib/utils/sort/merge-sort'
import { lang } from '../../lib/utils/index'
import { task, getRandomNumArrayPair } from '../testUtils'
import { expect } from 'chai'

const taskTimes = 10

describe('#mergeSort', function() {
  describe('#mergeSort', function() {
    task(function() {
      let pair = getRandomNumArrayPair()
      it(`\norigin: ${pair.origin} \n return ${pair.sorted}`, function() {
        expect(mergeSort([...pair.origin])).to.eql(pair.sorted)
      })
    }, taskTimes)
  })
})
