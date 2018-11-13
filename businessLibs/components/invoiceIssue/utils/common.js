/**
 * 公共 工具库
 */

import typeUtil from './typeUtil'

/**
 * 拼接日期 个位数加 0， 双位数 原样返回 ，1 返回 01， 10 返回 10
 * @param {*} num number 类型
 * @return string 类型
 */
function joinDate (num) {
    return (num < 10) ? ('0' + num) : num
}

export default {
    /**
     * 格式化时间
     * @param ms 时间戳
     * @param format 格式 YYYY年MM月DD日HH时mm分ss秒
     * @return time 正常的时间字符串
     **/
    transDate (ms, format) {
        // let formatArray = format.match(/^(YYYY)(.*)(MM)(.*)$/)
        let time = new Date(ms)
        let y = time.getFullYear()
        let m = joinDate(time.getMonth() + 1)
        let d = joinDate(time.getDate())
        let h = joinDate(time.getHours())
        let mm = joinDate(time.getMinutes())
        let s = joinDate(time.getSeconds())

        return format.replace('YYYY', y).replace('MM', m).replace('DD', d).replace('HH', h).replace('mm', mm).replace('ss', s)
    },
    /**
    * 防抖函数
    * @param {*} func 待执行的函数
    * @param {*} wait 时间间隔
    * @param {*} immediate 是否立即调用
    */
    debounce (func, wait, immediate) {
        let timeout, args, context, timestamp, result
        const later = function () {
            // 据上一次触发时间间隔
            const last = +new Date() - timestamp

            // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last)
            } else {
                timeout = null
                // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
                if (!immediate) {
                    result = func.apply(context, args)
                    if (!timeout) context = args = null
                }
            }
        }
        return function (...args) {
            context = this
            timestamp = +new Date()
            const callNow = immediate && !timeout
            // 如果延时不存在，重新设定延时
            if (!timeout) timeout = setTimeout(later, wait)
            if (callNow) {
                result = func.apply(context, args)
                context = args = null
            }

            return result
        }
    },
    /**
    * 去除前后空格
    * @param {*} str 待转换的字符串
    */
    trim (str) {
        if (typeUtil.isString(str) && str) {
            return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
        } else {
            return ''
        }
    }
}
