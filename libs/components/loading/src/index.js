import Vue from 'vue'
import loadingVue from './Loading.vue'
import { addClass, removeClass, getStyle } from '../../../utils/dom'
import { merge } from '../../../utils/assist'
import { prefix } from '../../../utils/common'

const prefixCls = prefix + 'loading'

const LoadingConstructor = Vue.extend(loadingVue)

const defaults = {
    text: null,
    fullscreen: true,
    body: false,
    lock: false,
    customClass: ''
}

let fullscreenLoading

LoadingConstructor.prototype.originalPosition = ''

LoadingConstructor.prototype.close = function () {
    if (this.fullscreen) {
        fullscreenLoading = undefined
    }
    setTimeout(_ => {
        const target = this.fullscreen || this.body
            ? document.body
            : this.target
        removeClass(target, `${prefixCls}-parent-relative`)
        removeClass(target, `${prefixCls}-parent-hidden`)
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$destroy()
    }, 300)
    this.visible = false
}

const addStyle = (options, parent, instance) => {
    let maskStyle = {}
    if (options.fullscreen || options.body) {
        instance.originalPosition = getStyle(document.body, 'position')
        maskStyle.position = 'fixed'
        maskStyle.top = '0'
        maskStyle.left = '0'
        ;['height', 'width'].forEach(property => {
            maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px'
        })
    } else {
        instance.originalPosition = getStyle(parent, 'position')
        maskStyle.borderRadius = getStyle(parent, 'borderRadius')
    }
    Object.keys(maskStyle).forEach(property => {
        instance.$el.style[property] = maskStyle[property]
    })
}

const Loading = (options = {}) => {
    if (Vue.prototype.$isServer) return
    options = merge({}, defaults, options)
    if (typeof options.target === 'string') {
        options.target = document.querySelector(options.target)
    }
    options.target = options.target || document.body
    if (options.target !== document.body) {
        options.fullscreen = false
    } else {
        options.body = true
    }
    if (options.fullscreen && fullscreenLoading) {
        return fullscreenLoading
    }
    let parent = options.body ? document.body : options.target
    let instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options
    })
    addStyle(options, parent, instance)
    if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
        addClass(parent, `${prefixCls}-parent-relative`)
    }
    if (options.fullscreen && options.lock) {
        addClass(parent, `${prefixCls}-parent-hidden`)
    }
    parent.appendChild(instance.$el)
    Vue.nextTick(() => {
        instance.visible = true
    })
    if (options.fullscreen) {
        fullscreenLoading = instance
    }
    return instance
}

export default Loading
