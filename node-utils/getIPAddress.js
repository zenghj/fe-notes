var os = require('os');
/**
 * from https://github.com/JacksonTian/anywhere/blob/master/bin/anywhere
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

module.exports = getIPAddress