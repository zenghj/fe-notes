'use strict';

/* 
* JS中实现超出安全范围的大整数的加减乘除运算
*/
(function (exports) {
  var util = {};
  var isNegative = util.isNegative = function (x) {
    forceString(x);
    return x.indexOf('-') === 0 && !isZero(x);
  };
  var isPositive = util.isPositive = function (x) {
    return !isNegative(x) && !isZero(x);
  };
  var isZero = util.isZero = function (x) {
    forceString(x);
    return (/^(-?)0+$/.test(x)
    );
  };
  var abs = util.abs = function (x) {
    forceString(x);
    if (isNegative(x)) {
      return x.slice(1);
    }
    if (isZero(x)) {
      return '0';
    }
    return x;
  };
  var negate = util.negate = function (x) {
    x = normalize(x);
    if (isNegative(x)) {
      return abs(x);
    }
    if (isZero(x)) {
      return '0';
    }
    return '-' + x;
  };

  function addPositive(x, y) {
    var maxLen = Math.max(x.length, y.length);
    var xDigits = x.padStart(maxLen, '0').split('');
    var yDigits = y.padStart(maxLen, '0').split('');
    var upDigit = 0;
    var result = xDigits.reduceRight(function (digits, digit, i) {
      var sum = Number(xDigits[i]) + Number(yDigits[i]);
      if (upDigit > 0) {
        sum += upDigit;
      }
      var digitI = 0;
      if (sum >= 10) {
        digitI = sum % 10;
        upDigit = Math.floor(sum / 10);
      } else {
        digitI = sum;
        upDigit = 0;
      }
      digits.unshift(digitI);
      return digits;
    }, []);
    if (upDigit > 0) {
      result.unshift(upDigit);
      upDigit = 0;
    }
    // console.log(Number(x) + Number(y), xDigits, yDigits)
    return result.join('');
  }

  function subPositive(x, y) {
    var sign = '';
    if (lt(x, y)) {
      sign = '-';var _ref = [y, x];
      x = _ref[0];
      y = _ref[1];
    }
    var maxLen = Math.max(x.length, y.length);
    var xDigits = x.padStart(maxLen, '0').split('');
    var yDigits = y.padStart(maxLen, '0').split('');
    var borrow = 0;
    var result = xDigits.reduceRight(function (digits, digit, i) {
      var xDigit = Number(digit);
      var yDigit = Number(yDigits[i]);
      var dightI = void 0;
      if (borrow > 0) {
        xDigit -= borrow;
      }
      if (xDigit < yDigit) {
        borrow = 1;
        dightI = 10 + xDigit - yDigit;
      } else {
        borrow = 0;
        dightI = xDigit - yDigit;
      }
      digits.unshift(dightI);
      return digits;
    }, []);
    if (borrow > 0) {
      result[0] -= borrow;
    }
    return sign + normalize(result.join(''));
  }

  function _mulDigit(x, mulBaseDigit) {
    if (isZero(mulBaseDigit)) return '0';
    mulBaseDigit = Number(mulBaseDigit);
    var xDigits = normalize(x).split('');
    var upDigit = 0;
    var result = xDigits.reduceRight(function (digits, digit, i) {
      var digitI = 0;
      sum = Number(digit) * mulBaseDigit;
      if (upDigit > 0) {
        sum += upDigit;
      }
      if (sum >= 10) {
        digitI = sum % 10;
        upDigit = Math.floor(sum / 10);
      } else {
        digitI = sum;
        upDigit = 0;
      }
      digits.unshift(digitI);
      return digits;
    }, []);
    if (upDigit > 0) {
      result.unshift(upDigit);
      upDigit = 0;
    }
    return result.join('');
  }
  function _mulTen(x, times) {
    if (times <= 0) return x;
    while (times-- > 0) {
      x += '0';
    }
    return x;
  }
  function mulPositive(x, y) {
    x = normalize(x);
    y = normalize(y);
    var yDigits = y.split('');
    var yLen = yDigits.length;
    var result = yDigits.reduce(function (sum, yDigit, i) {
      sum.push(_mulTen(_mulDigit(x, yDigit), yLen - i - 1));
      return sum;
    }, []);
    return result.reduce(function (sum, item) {
      if (isZero(sum)) {
        sum = item;
        return sum;
      }
      if (isZero(item)) return sum;
      return addPositive(sum, item);
    }, '0');
  }

  /* ========calculation======= */
  var add = util.add = function (x, y) {
    if (isPositive(x) && isPositive(y)) {
      return addPositive(x, y);
    } else if (isNegative(x) && isNegative(y)) {
      return negate(addPositive(abs(x), abs(y)));
    } else if (isNegative(x) && isPositive(y)) {
      return subPositive(y, abs(x));
    } else if (isPositive(x) && isNegative(y)) {
      return subPositive(x, abs(y));
    } else if (isZero(x)) {
      return y;
    } else if (isZero(y)) {
      return x;
    }
  };
  var sub = util.sub = function (x, y) {
    if (isPositive(x) && isPositive(y)) {
      return subPositive(x, y);
    } else if (isNegative(x) && isNegative(y)) {
      return negate(addPositive(abs(x), abs(y)));
    } else if (isNegative(x) && isPositive(y)) {
      return subPositive(y, abs(x));
    } else if (isPositive(x), isNegative(y)) {
      return addPositive(x, abs(y));
    } else if (isZero(x)) {
      return negate(y);
    } else if (isZero(y)) {
      return x;
    }
  };
  var mul = util.mul = function (x, y) {
    forceString(x);
    forceString(y);
    if (isZero(x) || isZero(y)) return '0';
    var result = mulPositive(abs(x), abs(y));
    return sameSign(x, y) ? result : negate(result);
  };
  /**
   * 仅返回整除数，丢弃余数
   */
  var div = util.div = function (x, y) {
    forceString(x);
    forceString(y);
    x = normalize(x);
    y = normalize(y);
    if (isZero(x)) return '0';
    if (isZero(y)) return Infinity;
    if (lt(x, y)) return '0';
    if (eq(x, y)) return '1';
    // const xDigits = x.split('')
    // const yDigits = y.split('')
    var result = '0';
    var remainder = void 0;
    var remainLen = x.length - y.length;
    var count = 0;

    while (true) {
      count++;
      if (count > 100) {
        throw new Error('too many times');
      }
      var xPiece = x.slice(0, x.length - remainLen);
      while (ge(xPiece, y)) {
        xPiece = sub(xPiece, y);
        result = add(result, '1');
      }
      if (remainLen <= 0) return result;
      x = xPiece + x.slice(x.length - remainLen);
      if (gt(y, x)) {
        remainder = x;
        return _mulTen(result, remainLen);
      }
      remainLen--;
      result = _mulTen(result, 1);
    }
    return result;
  };

  function ltPositive(x, y) {
    x = isZero(x) ? '0' : x;
    y = isZero(y) ? '0' : y;
    var maxLen = Math.max(x.length, y.length);
    var xDigits = x.padStart(maxLen, '0');
    var yDigits = y.padStart(maxLen, '0');
    return xDigits < yDigits;
  }
  /* ========comparition======= */
  // less than
  var lt = util.lt = function (x, y) {
    if (isNegative(x) && (isPositive(y) || isZero(y))) return true;
    if (isPositive(x) && (isNegative(y) || isZero(y))) return false;
    if (isNegative(x) && isNegative(y)) {
      return ltPositive(abs(y), abs(x));
    }
    return ltPositive(x, y);
  };
  // less or equal
  var le = util.le = function (x, y) {
    return lt(x, y) || eq(x, y);
  };
  // greater than
  var gt = util.gt = function (x, y) {
    return !le(x, y);
  };
  // greater or equal
  var ge = util.ge = function (x, y) {
    return !lt(x, y);
  };
  // equal
  var eq = util.eq = function (x, y) {
    return normalize(x) === normalize(y);
  };

  function normalize(x) {
    forceString(x);
    if (isZero(x)) return '0';
    var match = x.match(/^(-?)0*([1-9][0-9]*)$/);
    if (match) {
      return match[1] + match[2];
    } else {
      throw new Error('illegal number string');
    }
  }

  function sameSign(x, y) {
    return isZero(x) && isZero(y) || isPositive(x) && isPositive(y) || isNegative(x) && isNegative(y);
  }

  function forceString(x) {
    if (!isString(x)) throw new Error('x must be string');
  }
  function isString(x) {
    return typeof x === 'string';
  }

  util._forceString = forceString;
  util.isString = isString;
  util.normalize = normalize;
  util.sameSign = sameSign;

  exports.bigIntCalcUtil = util;
})(window);