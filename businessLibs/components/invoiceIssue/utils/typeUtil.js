/**
 * type 类型判断
 */

const preProcessValue = (value) => {
    value = value + ''
    value = value.trim()
    return value
}

export default {
    isType (obj, type) {
        return Object.prototype.toString.call(obj) === ('[object ' + type + ']')
    },

    isString (obj) {
        return this.isType(obj, 'String')
    },

    isArray (obj) {
        return this.isType(obj, 'Array')
    },

    isObject (obj) {
        return this.isType(obj, 'Object')
    },
    isNumber (obj) {
        return this.isType(obj, 'Number')
    },
    isFormData (obj) {
        return this.isType(obj, 'FormData')
    },

    isFunction (obj) {
        return this.isType(obj, 'Function')
    },
    isPositiveInteger (value) {
        value = value + ''
        value = value.trim()
        return /^\+?[1-9][0-9]*$/.test(value + '')
    },
    isNoneZeroFloat (value) {
        value = preProcessValue(value)
        return Number(value) !== 0 && this.isFloat(value)
    },
    isNegativeInteger (value) {
        value = preProcessValue(value)
        return /^-[1-9][0-9]*$/.test(value + '')
    },
    isInteger (value) {
        value = preProcessValue(value)
        return /^[+-]?(([1-9][0-9]*)|0)$/.test(value + '')
    },
    isPositiveFloat (value) {
        value = preProcessValue(value)
        return this.isPositiveInteger(value) || /^\+?(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
    },
    isNegativeFloat (value) {
        value = preProcessValue(value)
        return this.isNegativeInteger(value) || /^-(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
    },
    isFloat (value) {
        value = preProcessValue(value)
        return this.isInteger(value) || /^[+-]?(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
    },
    isPercent (value) {
        value = preProcessValue(value)

        let numberValue = value
        const flagIndex = value.indexOf('%')
        if (flagIndex !== -1) {
            numberValue = value.substring(0, flagIndex)
        }
        return this.isFloat(numberValue)
    }
}
