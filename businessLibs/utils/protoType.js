/**
 * Created by gaoguoqing on 2018/11/8.
 * 原型扩展
 */
String.prototype.add = function (arg2) {
    var r1, r2, m
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(this * m + arg2 * m) / m
}

String.prototype.reduce = function (arg2) {
    var r1, r2, m, n
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    n = (r1 >= r2) ? r1 : r2
    m = Math.pow(10, Math.max(r1, r2))
    return ((this * m - arg2 * m) / m).toFixed(n)
}
String.prototype._addZero = function () {
    if (this < 10) {
        return '0' + this
    }
    return this
}
// 获取字符串第一个非传入参数的位数
String.prototype.getIndexOfProp = function (prop) {
    var arr = this.split('')
    if (arr.length) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] !== prop) {
                return i
            }
        }
    }
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) === prefix
    }
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1
    }
}

Number.prototype.add = function (arg2) {
    var r1, r2, m
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(this * m + arg2 * m) / m
}

Number.prototype.reduce = function (arg2) {
    var r1, r2, m, n
    try {
        r1 = this.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    n = (r1 >= r2) ? r1 : r2
    m = Math.pow(10, Math.max(r1, r2))
    return ((this * m - arg2 * m) / m).toFixed(n)
}

function accMul (arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {}
    try {
        m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

function accDiv (arg1, arg2) {
    var c, d, e = 0,
        f = 0
    try {
        e = arg1.toString().split('.')[1].length
    } catch (g) {}
    try {
        f = arg2.toString().split('.')[1].length
    } catch (g) {}
    return c = Number(arg1.toString().replace('.', '')), d = Number(arg2.toString().replace('.', '')), c / d * Math.pow(10, f - e)
}

Number.prototype.div = function (arg) {
    return accDiv(this, arg)
}

String.prototype.div = function (arg) {
    return accDiv(this, arg)
}

Number.prototype.mul = function (arg) {
    return accMul(arg, this)
}

String.prototype.mul = function (arg) {
    return accMul(this, arg)
}

Number.prototype._addZero = function () {
    if (this < 10) {
        return '0' + this
    }
    return this
}


Number.prototype.toFixed = function (s) {
    var that = this,
        changenum, index
    // 负数
    if (this < 0) {
        that = -that
    }
    changenum = (parseInt(that * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString()
    index = changenum.indexOf('.')
    if (index < 0 && s > 0) {
        changenum = changenum + '.'
        for (var i = 0; i < s; i++) {
            changenum = changenum + '0'
        }
        
    } else {
        index = changenum.length - index
        for (var i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + '0'
        }
        
    }
    if (this < 0) {
        return -changenum
    } else {
        return changenum
    }
}

String.prototype.toFixed = function (s) {
    var that = this,
        changenum, index
    // 负数
    if (this < 0) {
        that = -that
    }
    changenum = (parseInt(that * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString()
    index = changenum.indexOf('.')
    if (index < 0 && s > 0) {
        changenum = changenum + '.'
        for (var i = 0; i < s; i++) {
            changenum = changenum + '0'
        }
    } else {
        index = changenum.length - index
        for (var i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + '0'
        }
    }
    if (this < 0) {
        return -changenum
    } else {
        return changenum
    }
}
