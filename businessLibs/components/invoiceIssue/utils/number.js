/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: BWCloudPrepose-catering
 * @FileName: numberUtil
 * @Dependence: --
 * @Description: --
 * @CreatedBy: zhangliao
 * @CreateDate: 2018/3/9 下午4:27
 * @LastModifiedBy: zhangliao
 * @LastModifiedDate: 2018/3/9 下午4:27
 *
 * --------------------------------------------------------------------------- *
 */

const characterString = '零壹贰叁肆伍陆柒捌玖'
const sectionUnits = ['万', '亿', '兆', '京', '垓', '秭', '穣', '沟', '涧', '正', '载', '极'] // 这后面的先不考虑了(没那么有钱), "恒河沙", "阿僧祇", "那由他", "不可思议", "无量大数"];
const digitUnits = ['仟', '佰', '拾']

/**
 * 数字万分位，实现 1234567890 => 12,3456,7890
 * @param num
 * @returns {string}
 */
export const tenThousandSplit = (num) => {
    let value = num + ''
    if (value.indexOf('.') === -1) {
        value += '.00'
    }
    return value.replace(/(\d)(?=(\d{4})+\.)/g, '$1,')
}

/**
 * 数字单位合并，将数字 1234 和单位 ABC[D] 合成为 1A2B3C4[D]
 * @param digits
 * @param units
 */
const mergeUnits = (digits, units) => {
    // 技巧 如果数字总比单位多1，以少的作为循环，然后补上最后一位就行，如果一样多就刚好

    const results = []
    units.forEach((item, index) => {
        results.push(digits[index], item)
    })
    if (digits.length > units.length) {
        results.push(digits[digits.length - 1] || '')
    }
    return results.join('')
}

/**
 * 消除多个零的正则
 * @param units
 */
// const getUnitsTrimReg = (units) => {
//     return new RegExp(['零', '[', units.join(''), ']'].join(''), 'g')
// }

// 万分位的逗号分隔的每一块转成汉字
const sectionToCharacter = (section, isFirst = false) => {
    let resultStr = ''
    let digitList = section.split('').map(item => characterString[item])
    // 位数满的四位
    if (!isFirst) {
        resultStr = mergeUnits(digitList, digitUnits)
    } else {
    // 开头块 不能以0开始
        let validUnits = digitUnits.slice(digitUnits.length - (digitList.length - 1))
        resultStr = mergeUnits(digitList, validUnits)
    }

    let blockTrimReg = new RegExp(['零', '[', digitUnits.join(''), ']'].join(''), 'g')
    // 多个零只需要一个零,每次带单位都可能有多零
    return resultStr.replace(blockTrimReg, '零').replace(/零+/g, '零')
}

export const getValidNumber = (value) => {
    let number = Number(value)
    if (Number.isNaN(number)) {
        number = parseFloat(value)
        if (Number.isNaN(number)) {
            return 0
        }
    }
    return number
}

export const moneyToCharacter = (num) => {
    let number = getValidNumber(num)
    if (number < 0) {
        number = -number
    }
    let numberStr = number.toFixed(2)
    // 万分位
    let splitedStr = tenThousandSplit(numberStr)
    let strEls = splitedStr.split('.')
    let sections = strEls[0].split(',')
    // 块单位始终比块数少一
    let validUnits = sectionUnits.slice(0, sections.length - 1)
    validUnits.reverse()

    let resultStr = [
        mergeUnits(sections.map((item, index) => {
            return sectionToCharacter(item, index === 0)
        }), validUnits),
        '圆',
        characterString[strEls[1][0]],
        '角',
        characterString[strEls[1][1]],
        '分'
    ].join('')

    let sectionTrimReg = new RegExp(['零', '([', validUnits.join(''), '圆', '])'].join(''), 'g')
    if (validUnits.length) {
    // 这里的单位不能丢,去掉多余的带单位的零
        resultStr = resultStr.replace(sectionTrimReg, '$1')
    }

    // 多个连续的单位只保留第一个
    resultStr = resultStr.replace(new RegExp(['[', validUnits.join(''), ']+'].join(''), 'g'), (match) => {
        return match[0]
    })
    resultStr = resultStr.replace(/零角零分$/, '整')
    resultStr = resultStr.replace(/零分$/, '整')
    resultStr = resultStr.replace(/(.+)零元整$/, '$1元整')
    return resultStr
}

export const toMoneyFixedString = (num, fractionDigits = 2) => {
    let number = getValidNumber(num)
    return number.toFixed(fractionDigits)
}

export const toMoneyFixedNumber = (num, fractionDigits = 2) => {
    return toMoneyFixedString(num, fractionDigits)
}

// 科学计数法 转 正常 => 仅 针对 负数
export const convertToNormal = (val) => {
    if (/[eE]/.test(val)) {
        val = (val + '').replace(/^-/, '')
        let matched = val.match(/^(\d{1,})([eE]-{1,})(\d{1,})/)
        let len = Number(matched[3])
        let num = matched[1].replace('.', '')
        num = num.padStart(len, '0')
        return '0.' + num
    } else {
        return val + ''
    }
}

// 盘用户保留位数， 兼容 科学计数法
// const fixed6 = /^-?\d+?\.*\d{0,6}$/
export const toKeepFixed6 = (val) => {
    // 小数点后 0到 6 位, 不够6 位小数，取原来的数， 超过6位，使用 tofixed(6)
    // val = val + ''
    // let nVal = Number(val) + ''
    // // 科学计数法 转 正常
    // if (/[eE]/.test(val)) {
    //   return convertToNormal(val)
    // } else if (/[eE]/.test(nVal)) {
    //   let noLastZero = val.replace(/[0]{1,}$/, '')
    //   return noLastZero
    // } else if (nVal === '0') {
    //   return ''
    // } else {
    //   return fixed6.test(val) ? nVal : ((+toMoneyFixedNumber(val, 6)) + '')
    // }

    // 保存 13 位 数字
    val = (val + '').slice(0, 13)
    let nVal = Number(val) + ''
    // 科学计数法 转 正常
    if (/[eE]/.test(val)) {
        return convertToNormal(val)
    } else if (/[eE]/.test(nVal)) {
        let noLastZero = val.replace(/[0]{1,}$/, '')
        return noLastZero
    } else if (nVal === '0') {
        return ''
    } else {
        return val
    }
}

// 保存 2 位有效数字 ，兼容 科学计数法
export const toKeepFixed2 = (val) => {
    val = val + ''
    let nVal = Number(val) + ''
    // 科学计数法 转 正常
    if (/[eE]/.test(val) || /[eE]/.test(nVal) || nVal === '0') {
        return '0.00'
    } else {
        return val.toFixed(2) + ''
    }
}

// 服务器用户 保留位数, 兼容 科学计数法
export const toKeepFixed13 = (val) => {
    // 保存 13 位 数字
    val = (val + '').slice(0, 13)
    let nVal = Number(val) + ''
    // 科学计数法 转 正常
    if (/[eE]/.test(val)) {
        return convertToNormal(val)
    } else if (/[eE]/.test(nVal)) {
        let noLastZero = val.replace(/[0]{1,}$/, '')
        return noLastZero
    } else if (nVal === '0') {
        return ''
    } else {
        return nVal
    }
}

export default {
    moneyToCharacter,
    toMoneyFixedString,
    toMoneyFixedNumber
}
