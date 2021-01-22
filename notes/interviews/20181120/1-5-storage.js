const localStorage = window.localStorage
const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000
class Data {
  constructor(data, opt) {
    this.time = Date.now()
    this.data = data
    this.expireTime = opt.expireTime
  }
  getData() {
    return this.data
  }
  isExpired() {
    if(!this.expireTime) {
      return false;
    }
    return Data.now() - this.time > this.expireTime
  }
}

const instance
class Storage {
  static getInstance() {
    if(!instance) {
      instance = new Storage();
    } 
    return instance;
  }
  getItem = key => {
    let data = localStorage.getItem(key)
    if(data == null) return null
    if(data.isExpired()) {
      localStorage.removeItem(key)
      return null;
    } else {
      return data.getData()
    }
  }
  setItem = (key, value, opt = {}) => {
    let data = new Data(value, opt)
    return localStorage.setItem(key, JSON.stringify(data))
  }
}