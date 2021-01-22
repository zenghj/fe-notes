(function(exports) {
  function proxyArray(arr, cb) {
    let proxied = arr;
    proxied = new Proxy(arr, {
      set(obj, prop, value) {
        console.log('proxy set', obj, prop, value)
        let ret = Reflect.set(...arguments);
        cb && cb();
        return ret;
      }
    });
    return proxied;
  }

  exports.proxyArray = proxyArray;
})(window);
