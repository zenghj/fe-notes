import {insertSort, insertSort2} from '../../lib/utils/sort/insertSort'
import {lang} from '../../lib/utils/index'
import {task, getRandomNumArrayPair} from '../testUtils'
import {expect} from 'chai'

const taskTimes = 10

describe('insertSort', function() {
  describe('#insertSort()', function() {
    task(function() {
      let pair = getRandomNumArrayPair()
      it(`should return ${pair.sorted}`, function() {
        expect(insertSort([...pair.origin])).to.eql(pair.sorted)
      });
    }, taskTimes)
  });

  describe('#insertSort2()', function() {
    task(function() {
      let pair = getRandomNumArrayPair()
      it(`should return ${pair.sorted}`, function() {
        expect(insertSort2([...pair.origin], true)).to.eql(pair.sorted.reverse())
      });
    }, taskTimes)
  });
});