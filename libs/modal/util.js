/**
 * 默认 的 modal props
 * author by @zhengshuai
 */
import Vue from 'vue'
const isServer = Vue.prototype.$isServer

export const prefixCls = 'bw-modal'

/* istanbul ignore next */
export const on = (() => {
    if (!isServer && document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/* istanbul ignore next */
export const off = (() => {
    if (!isServer && document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()
