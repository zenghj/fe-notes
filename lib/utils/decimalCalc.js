'use strict';

(function (exports, bigIntCalcUtil) {
  var calcUtil = {};
  exports.calcUtil = calcUtil;
  var forceString = bigIntCalcUtil._forceString;
  var sufixZeroReg = /0*$/;
  var isDecimal = calcUtil.isDecimal = function (x) {
    forceString(x);
    // x = normalize(x)
    return x.indexOf('.') > -1;
  };
  var normalize = calcUtil.normalize = function (x) {
    var parts = parseDecimal(x);
    return concatNum(parts[0], parts[1]);
  };
  /**
   * 
   * @param {*} x 
   * 返回结果带符号
   * -1.1 ---> [-1, -1]
   *  1.1 ---> [1, 1]
   */
  function parseDecimal(x) {
    var sign = '';
    if (bigIntCalcUtil.isNegative(x)) {
      sign = '-';
      x = x.slice(1);
    }
    var parts = x.split('.');
    if (parts.length > 2) {
      throw new Error('illegal number string');
    }
    parts[0] = sign + bigIntCalcUtil.normalize(parts[0]);
    if (parts[1]) {
      parts[1] = parts[1].replace(sufixZeroReg, '');
      parts[1] = parts[1] ? sign + parts[1] : parts[1];
    }
    return parts;
  }
  function concatNum(intPart, decimalPart) {
    if (!decimalPart || bigIntCalcUtil.isZero(decimalPart) || decimalPart === '-') {
      return intPart;
    } else {
      var decimalPartLen = decimalPart.length;
      if (bigIntCalcUtil.isZero(intPart) && bigIntCalcUtil.isZero(decimalPart)) {
        return '0';
      } else if (bigIntCalcUtil.isZero(intPart)) {
        return getSign(decimalPart) + '0.' + bigIntCalcUtil.abs(decimalPart);
      } else if (bigIntCalcUtil.isZero(decimalPart)) {
        return intPart;
      }
      if (bigIntCalcUtil.sameSign(intPart, decimalPart)) {
        return intPart + '.' + bigIntCalcUtil.abs(decimalPart);
      } else if (bigIntCalcUtil.isNegative(intPart)) {
        intPart = bigIntCalcUtil.add(intPart, '1');
        down1 = '1'.padEnd(decimalPart.length + 1, '0');
        decimalPart = bigIntCalcUtil.sub(down1, decimalPart);
        decimalPart = decimalPart.padStart(decimalPartLen, '0');
        if (bigIntCalcUtil.isZero(intPart)) {
          intPart = '-0';
        }
        return intPart + '.' + decimalPart;
      } else if (bigIntCalcUtil.isNegative(decimalPart)) {
        intPart = bigIntCalcUtil.sub(intPart, '1');
        down1 = '1'.padEnd(decimalPart.length + 1, '0');
        decimalPart = bigIntCalcUtil.add(down1, decimalPart);
        decimalPart = decimalPart.padStart(decimalPartLen, '0');
        return intPart + '.' + decimalPart;
      }
    }
  }

  function intMulDecimal(_int, _decimal) {
    if (bigIntCalcUtil.isZero(_int) || bigIntCalcUtil.isZero(_decimal)) return '0';
    var sign = bigIntCalcUtil.sameSign(_int, _decimal) ? '' : '-';
    var intAbs = bigIntCalcUtil.abs(_int);
    var decimalAbs = bigIntCalcUtil.abs(_decimal);
    var decimalLen = bigIntCalcUtil.abs(_decimal).length;
    var mulResult = sign + bigIntCalcUtil.mul(intAbs, decimalAbs);
    var result = getComputedDecimalResult(mulResult, decimalLen);
    return concatNum(result[0], result[1]);
  }

  function decimalMulDecimal(decimal1, decimal2) {
    var sign = bigIntCalcUtil.sameSign(decimal1, decimal2) ? '' : '-';
    var decimal1Abs = bigIntCalcUtil.abs(decimal1);
    var decimal2Abs = bigIntCalcUtil.abs(decimal2);
    var len = Math.max(decimal1Abs.length, decimal2Abs.length);
    decimal1Abs = decimal1Abs.padEnd(len, '0');
    decimal2Abs = decimal2Abs.padEnd(len, '0');
    var mulResult = sign + bigIntCalcUtil.mul(decimal1Abs, decimal2Abs);
    var result = getComputedDecimalResult(mulResult, len * 2);
    return concatNum(result[0], result[1]);
  }

  function getSign(x) {
    return bigIntCalcUtil.isNegative(x) ? '-' : '';
  }
  function getComputedDecimalResult(decimal, originLen) {
    var sign = getSign(decimal);
    var decimalNoSign = bigIntCalcUtil.abs(decimal);
    var result = ['0', '']; // [int, decimal]
    if (decimalNoSign.length > originLen) {
      result[0] = decimalNoSign.slice(0, decimalNoSign.length - originLen);
      result[1] = decimalNoSign.slice(decimalNoSign.length - originLen).replace(sufixZeroReg, '');
    } else {
      result[1] = decimalNoSign.padStart(originLen, '0');
    }
    result[0] = result[0] ? sign + result[0] : result[0];
    result[1] = result[1] ? sign + result[1] : result[1];
    return result;
  }
  // 直接因式分解，分别处理整数和小数部分
  // const add = calcUtil.add = function(x, y) {
  //   forceString(x)
  //   forceString(y)
  //   // x = normalize(x)
  //   // y = normalize(y)
  //   const xParts = parseDecimal(x)
  //   const yParts = parseDecimal(y)
  //   if(!xParts[1] && !yParts[1]) {
  //     return bigIntCalcUtil.add(xParts[0], yParts[0])
  //   } else if (xParts[1] && yParts[1]){
  //     let xDecimalAbs =  bigIntCalcUtil.abs(xParts[1])
  //     let yDecimalAbs =  bigIntCalcUtil.abs(yParts[1])
  //     let maxLen = Math.max(xDecimalAbs.length, yDecimalAbs.length)
  //     let xDecimal = (bigIntCalcUtil.isNegative(xParts[1]) ? '-' : '') + xDecimalAbs.padEnd(maxLen, '0')
  //     let yDecimal = (bigIntCalcUtil.isNegative(yParts[1]) ? '-' : '') + yDecimalAbs.padEnd(maxLen, '0')
  //     let decimalSum = bigIntCalcUtil.add(xDecimal, yDecimal)
  //     let intSum = bigIntCalcUtil.add(xParts[0], yParts[0])
  //     let decimalResult = getComputedDecimalResult(decimalSum, maxLen)
  //     intSum = bigIntCalcUtil.add(intSum, decimalResult[0])
  //     return concatNum(intSum, decimalResult[1])
  //   } else {
  //     let intSum = bigIntCalcUtil.add(xParts[0], yParts[0])
  //     let decimalSum = (xParts[1] || yParts[1] || '').replace(sufixZeroReg, '')
  //     return concatNum(intSum, decimalSum)
  //   }
  // }

  // const sub = calcUtil.sub = function(x, y) {
  //   return calcUtil.add(x, calcUtil.negate(y))
  // }

  // const mul = calcUtil.mul = function(x, y) {
  //   forceString(x)
  //   forceString(y)
  //   const xParts = parseDecimal(x)
  //   const yParts = parseDecimal(y)
  //   let result = ''
  //   if (xParts[1] && yParts[1]) {
  //     result = calcUtil.add(bigIntCalcUtil.mul(xParts[0], yParts[0]), intMulDecimal(xParts[0], yParts[1]))
  //     result = calcUtil.add(result, intMulDecimal(yParts[0], xParts[1]))  
  //     result = calcUtil.add(result, decimalMulDecimal(xParts[1], yParts[1]))
  //   } else if(!xParts[1] && !yParts[1]) {
  //     result = bigIntCalcUtil.mul(xParts[0], yParts[0])
  //   } else if (xParts[1]) {
  //     result = calcUtil.add(bigIntCalcUtil.mul(xParts[0], yParts[0]), intMulDecimal(yParts[0], xParts[1]))
  //   } else {
  //     result = calcUtil.add(bigIntCalcUtil.mul(xParts[0], yParts[0]), intMulDecimal(xParts[0], yParts[1]))
  //   }
  //   return result
  // }

  // 全部转换成整数处理，然后再还原
  var add = calcUtil.add = function (x, y) {
    forceString(x);
    forceString(y);
    x = normalize(x);
    y = normalize(y);
    var xParts = parseDecimal(x);
    var yParts = parseDecimal(y);
    var step = 0;
    if (!xParts[1] && !yParts[1]) {
      return bigIntCalcUtil.add(xParts[0], yParts[0]);
    } else {
      var xDecimalAbs = bigIntCalcUtil.abs(xParts[1] || '');
      var yDecimalAbs = bigIntCalcUtil.abs(yParts[1] || '');
      var stepX = xParts[1] ? xDecimalAbs.length : 0;
      var stepY = yParts[1] ? yDecimalAbs.length : 0;
      step = Math.max(stepX, stepY);
      var cx = xParts[0] + (xDecimalAbs || '').padEnd(step, '0');
      var cy = yParts[0] + (yDecimalAbs || '').padEnd(step, '0');
      var cSum = bigIntCalcUtil.add(cx, cy);
      var sign = getSign(cSum);
      var cSumAbs = bigIntCalcUtil.abs(cSum);
      if (cSumAbs.length > step) {
        return concatNum(sign + cSumAbs.slice(0, cSumAbs.length - step), sign + cSumAbs.slice(cSumAbs.length - step));
      } else {
        cSumAbs = cSumAbs.padStart(step, '0');
        return normalize(sign + '0.' + cSumAbs);
      }
    }
  };

  var sub = calcUtil.sub = function (x, y) {
    return add(x, negate(y));
  };

  var mul = calcUtil.mul = function (x, y) {
    forceString(x);
    forceString(y);
    x = normalize(x);
    y = normalize(y);
    var xParts = parseDecimal(x);
    var yParts = parseDecimal(y);
    var step = 0;
    if (bigIntCalcUtil.isZero(x) || bigIntCalcUtil.isZero(y)) return '0';
    if (!xParts[1] && !yParts[1]) {
      return bigIntCalcUtil.mul(xParts[0], yParts[0]);
    } else {
      var xDecimalAbs = bigIntCalcUtil.abs(xParts[1] || '');
      var yDecimalAbs = bigIntCalcUtil.abs(yParts[1] || '');
      var stepX = xParts[1] ? xDecimalAbs.length : 0;
      var stepY = yParts[1] ? yDecimalAbs.length : 0;
      step = Math.max(stepX, stepY);
      var cx = xParts[0] + (xDecimalAbs || '').padEnd(step, '0');
      var cy = yParts[0] + (yDecimalAbs || '').padEnd(step, '0');

      var cSum = bigIntCalcUtil.mul(cx, cy);
      var sign = getSign(cSum);
      var cSumAbs = bigIntCalcUtil.abs(cSum);
      var mulStep = step * 2;
      if (cSumAbs.length > mulStep) {
        return concatNum(sign + cSumAbs.slice(0, cSumAbs.length - mulStep), sign + cSumAbs.slice(cSumAbs.length - mulStep));
      } else {
        cSumAbs = cSumAbs.padStart(step, '0');
        return normalize(sign + '0.' + cSumAbs);
      }
    }
  };

  // 也是一样
  var div = calcUtil.mul = function (x, y) {};

  function isNegative(x) {
    forceString(x);
    return x.indexOf('-') === 0;
  }

  var negate = calcUtil.negate = function (x) {
    x = calcUtil.normalize(x);
    if (bigIntCalcUtil.isZero(x)) return '0';
    if (x.indexOf('-') === 0) {
      return x.slice(1);
    } else {
      return '-' + x;
    }
  };

  calcUtil._parseDecimal = parseDecimal;
  calcUtil._concatNum = concatNum;
})(window, window.bigIntCalcUtil);