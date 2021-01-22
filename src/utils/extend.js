import {isPlainObject} from './lang'
const objProto = Object.prototype
const toStr = objProto.toString
const hasOwn = objProto.hasOwnProperty


// function isObject(obj) {
//   return toStr.call(obj) === '[object Object]'
// }
// function isPlainObject(obj) {
//   if (!obj || !isObject(obj)) {
//     return false
//   }

//   const hasOwnConstruct = hasOwn.call(obj, 'construct')
//   if (obj.construct && !hasOwnConstruct && obj.construct.prototype && !hasOwn.call(obj.construct.prototype, 'isPrototypeof')) {
//     return false
//   }
//   let key
//   for(key in obj) {}
//   return typeof key === 'undefined' || hasOwn.call(obj, key)
// }

export default function extend(deep, target) {
  let copies = []
  if (typeof deep !== 'boolean') {
    target = deep
    deep = false
    copies = [].slice.call(arguments, 1)
  } else {
    copies = [].slice.call(arguments, 2)
  }
  if (target == null || typeof target !== 'object') {
    target = {}
  }
  for (let i = 0; i < copies.length; i++) {
    let copy = copies[i]
    for(let key in copy) {
      let copyVal = copy[key]
      let srcVal = target[key]
      let valIsArray = false
      let deepTarget
      if (deep && copyVal && (isPlainObject(copyVal) || (valIsArray = Array.isArray(copyVal)))) {
        if (valIsArray) {
          valIsArray = false
          deepTarget = Array.isArray(srcVal) ? srcVal : []
        } else {
          deepTarget = isPlainObject(srcVal) ? srcVal : {}
        }
        target[key] = extend(deep, deepTarget, copyVal)
      } else if (typeof copyVal !== 'undefined'){
        target[key] = copyVal
      }
    } 
  }

  return target
}