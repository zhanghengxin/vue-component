/*
 * --------------------------------------------------------------------------- *
 *
 * @Author: yanghao
 * @Date: 2018-09-27 14:40:39
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-12-03 10:41:56
 *
 * --------------------------------------------------------------------------- *
 */
let padTop
let padBot
let overFlow
const move = 'height 0.3s  ease-in-out,padding-top 0.3s  ease-in-out, padding-bottom  0.3s ease-in-out'
const transition = {
    beforeEnter (el) {
        // console.log('beforeEnter')
        padTop = padTop || window.getComputedStyle(el).getPropertyValue('padding-top')
        padBot = padBot || window.getComputedStyle(el).getPropertyValue('padding-bottom')
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
        el.style.transition = move
    },
    enter (el) {
        // console.log('enter')
        overFlow = window.getComputedStyle(el).getPropertyValue('overflow')
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + parseInt(padTop) + parseInt(padBot) + 'px'
        }
        el.style.paddingTop = padTop
        el.style.paddingBottom = padBot
        el.style.overflow = 'hidden'
    },
    afterEnter (el) {
        // console.log('afterEnter')
        el.style.transition = ''
        el.style.height = ''
        el.style.overflow = overFlow
    },
    beforeLeave (el) {
        // console.log('beforeLeave')
        if (el.scrollHeight !== 0) {
            padTop = el.style.paddingTop
            padBot = el.style.paddingBottom
            overFlow = el.style.overflow
            el.style.height = el.scrollHeight + 'px'
            el.style.overflow = 'hidden'
        }
    },
    leave (el) {
        // console.log('leave')
        el.style.transition = move
        el.style.height = '0'
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
    },
    afterLeave (el) {
        // console.log('afterLeave')
        el.style.height = ''
        el.style.paddingTop = padTop
        el.style.paddingBottom = padBot
        el.style.transition = ''
        el.style.overflow = overFlow
    }
}

export default {
    name: 'bCollapseTransition',
    functional: true,
    render (h, {children}) {
        const data = {
        // 事件监听器基于 `on`
        // 所以不再支持如 `v-on:keyup.enter` 修饰器
        // 需要手动匹配 keyCode。
            on: transition
        }
        return h('transition', data, children)
    }
}
