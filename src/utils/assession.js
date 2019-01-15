import {lang} from './index.js'
/**
 * @param {*} obj 
 * @param {*} type 
 * @param {*} msg 
 */
export default function assession(obj, type, msg = 'Error') {
  let typeFn = lang[`is${type}`]
  if (lang.isFunction(typeFn)) {
    if (!typeFn(obj, type)) {
      throw new Error(msg)
    }
  } else if(lang.isFunction(type)){
    if (!type(obj)) {
      throw new Error(msg)
    }
  } else {
    throw new Error('assession argument illegal')
  }
}