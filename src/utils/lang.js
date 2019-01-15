const objProto = Object.prototype
const types = ['Object', 'Array', 'Function', 'String', 'Number', 'Boolean', 'Undefined', 'Null', 'Symbol']
const typeUtils = types.reduce((utilObj, type) => {
  utilObj[`is${type}`] = function(obj) {
    return objProto.toString.call(obj) === `[object ${type}]`
  }
  return utilObj
}, {})

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export default {
  ...typeUtils,
  getRandomNum
}