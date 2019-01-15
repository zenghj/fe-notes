import {lang} from '../../lib/utils/index'
export function task(fn, time = 1) {
  for(let i = 0; i < time; i++) {
    fn()
  }
}

export function getRandomNumArrayPair(maxLen = 30, maxNumber = 1000) {
  let len = lang.getRandomNum(1, maxLen)
  let arr = []
  for(let i = 0; i < len; i++) {
    arr.push(lang.getRandomNum(1, maxNumber))
  }
  return {
    origin: [...arr],
    sorted: arr.sort((a, b) => a - b),
  }
}