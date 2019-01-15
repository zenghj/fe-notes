import {selectSort} from '../../lib/utils/sort/select-sort'
import {lang} from '../../lib/utils/index'
import {task, getRandomNumArrayPair} from '../testUtils'
import {expect} from 'chai'

const taskTimes = 10

describe('#selectSort', function() {
  describe('#insertSort()', function() {
    task(function() {
      let pair = getRandomNumArrayPair()
      it(`\norigin: ${pair.origin} \n return ${pair.sorted}`, function() {
        expect(selectSort([...pair.origin])).to.eql(pair.sorted)
      });
    }, taskTimes)
  });
})