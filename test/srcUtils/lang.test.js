import {expect} from 'chai'
import {isPlainObject} from '../../lib/utils/lang'

function Foo() {}
const plainObjects = [
  {},
  Object.create(null)
]
const notPlainObject = [
  null,
  undefined,
  1,
  new Foo()
]
describe('lang.js', function () {
  describe('isPlainObject', function() {
    plainObjects.forEach(obj => {
      expect(isPlainObject(obj)).to.equal(true)
    })
    notPlainObject.forEach(obj => {
      expect(isPlainObject(obj)).to.equal(false)
    })
  })
})