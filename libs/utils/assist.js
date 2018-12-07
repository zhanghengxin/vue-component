// Find components upward
let findComponentUpward = function (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}

let findComponentUpwards = function (context, componentName) {
    let parent = context.$parent
    let name = parent.$options.name
    let parents = []
    while (parent && (!name || componentName !== name)) {
        parents.push(parent)
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parents
}

function typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}

// deepCopy
function deepCopy (data) {
    const t = typeOf(data)
    let o
    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }
    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}

export { findComponentUpward, deepCopy, findComponentUpwards, typeOf }
