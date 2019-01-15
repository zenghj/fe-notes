import {task, getRandomNumArrayPair} from '../testUtils'
import {expect} from 'chai'
import {bubbleSort} from '../../lib/utils/sort/bubble-sort'

const taskTimes = 10

describe('bubbleSort', function() {
  describe('#bubbleSort()', function() {
    task(function() {
      let pair = getRandomNumArrayPair()
      it(`\norigin: ${pair.origin} \n return ${pair.sorted}`, function() {
        expect(bubbleSort([...pair.origin])).to.eql(pair.sorted)
      });
    }, taskTimes)
  });

});