// js实现原型链查找，比如查找obj.prop,实现js引擎查找的feel就好了 ////////////////////////////
var hasOwn = Object.prototype.hasOwnProperty;
var getPrototypeOf = Object.getPrototypeOf || function(obj) {
    return obj.__proto__
}

function retrive(obj, key) {
    if (obj === null) return;

    if(hasOwn.call(obj, key)) {
        return obj[key];
    } else {
        retrive(Object.getPrototypeOf(obj), key)
    }
}

////////////////////////////////////////////////////////////////////////////////////


// 用ES实现 Map的set 和 get方法
// 即key可以是任何类型

// 实现一 ，复杂度 O(n)，面试官要求改进一下
function Map() {
    this.keys = [];
    this.values = [];
}

Map.prototype.get = function(key) {
    var index = this.keys.indexOf(key);
    return this.values[key];
}

Map.prototype.set = function(key, value) {
    var index = this.keys.indexOf(key); // 有个bug就是 NaN会出问题
    if (index < 0) {
        this.keys.push(key);
        this.values.push(value);
    } else {
        this.values[index] = value;
    }
}


// 实现一 解决NaN的问题//////////////////////////////////////////////////////////////////
function _isNaN (value) {
    return typeof value === 'number' && isNaN(value)
}

function Map() {
    this.keys = [];
    this.values = [];
    this.$NaN = undefined;
}


Map.prototype.get = function(key) {
    if(_isNaN(key)) {
        return this.$NaN;
    }

    var index = this.keys.indexOf(key);
    return this.values[key];
}

Map.prototype.set = function(key, value) {
    if(_isNaN(key)) {
        this.$NaN = value
        return;
    }

    var index = this.keys.indexOf(key); 
    if (index < 0) {
        this.keys.push(key);
        this.values.push(value);
    } else {
        this.values[index] = value;
    }
}
////////////////////////////////////////////////////////////////////////////////////


// 改进，实现二, 哎我擦，还是想不出来更好的实现
// 

function Map2() {
    this.map = {}
}


Map2.prototype.set = function(key, value) {

}

Map2.prototype.get = function(key) {

    if(typeof key === 'object') {
        Object.defineProperty(key, )
    }
}