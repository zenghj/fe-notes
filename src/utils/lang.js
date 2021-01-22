const objProto = Object.prototype
const types = ['Object', 'Array', 'Function', 'String', 'Number', 'Boolean', 'Undefined', 'Null', 'Symbol']
const typeUtils = types.reduce((utilObj, type) => {
  utilObj[`is${type}`] = function(obj) {
    return objProto.toString.call(obj) === `[object ${type}]`
  }
  return utilObj
}, {})

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function isPlainObject(obj) {
  if (!obj || !typeUtils.isObject(obj)) {
    return false
  }

  let proto = Object.getPrototypeOf(obj)
  return proto === Object.prototype || 
    proto === null // Object.create(null)
}

export default {
  ...typeUtils,
  getRandomNum
}