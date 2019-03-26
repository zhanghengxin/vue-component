import Vue from 'vue'
import Loading from './Loading.vue'
import {
    addClass,
    removeClass,
    getStyle
} from '../../../utils/dom'
import { prefix } from '../../../utils/common'
const prefixCls = prefix + 'loading'
const Mask = Vue.extend(Loading)

const loadingDirective = {}
loadingDirective.install = Vue => {
    if (Vue.prototype.$isServer) return
    const toggleLoading = (el, binding) => {
        if (binding.value) {
            Vue.nextTick(() => {
                if (binding.modifiers.fullscreen) {
                    el.maskStyle.position = 'fixed'
                    insertDom(document.body, el, binding)
                } else {
                    if (binding.modifiers.body) {
                        el.maskStyle.top = '0'
                        el.maskStyle.left = '0'
                        ;['height', 'width'].forEach(property => {
                            el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px'
                        })

                        insertDom(document.body, el, binding)
                    } else {
                        el.originalPosition = getStyle(el, 'position')
                        el.maskStyle.borderRadius = getStyle(el, 'borderRadius')
                        insertDom(el, el, binding)
                    }
                }
            })
        } else {
            setTimeout(_ => {
                el.domVisible = false
                const target = binding.modifiers.fullscreen || binding.modifiers.body
                    ? document.body
                    : el
                removeClass(target, `${prefixCls}-parent-relative`)
                removeClass(target, `${prefixCls}-parent-hidden`)
                el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
                el.domInserted = false
            }, 300)
            el.instance.visible = false
        }
    }
    const insertDom = (parent, el, binding) => {
        if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
            Object.keys(el.maskStyle).forEach(property => {
                el.mask.style[property] = el.maskStyle[property]
            })
            if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(parent, `${prefixCls}-parent-relative`)
            }
            if (binding.modifiers.fullscreen && binding.modifiers.lock) {
                addClass(parent, `${prefixCls}-parent-hidden`)
            }
            el.domVisible = true
            parent.appendChild(el.mask)
            Vue.nextTick(() => {
                el.instance.visible = true
            })
            el.domInserted = true
        }
    }

    Vue.directive('loading', {
        bind: function (el, binding, vnode) {
            const textExr = el.getAttribute('loading-text')
            const spinnerExr = el.getAttribute('loading-spinner')
            const backgroundExr = el.getAttribute('loading-background')
            const customClassExr = el.getAttribute('loading-custom-class')
            const vm = vnode.context
            const mask = new Mask({
                el: document.createElement('div'),
                data: {
                    text: (vm && vm[textExr]) || textExr,
                    spinner: (vm && vm[spinnerExr]) || spinnerExr,
                    background: (vm && vm[backgroundExr]) || backgroundExr,
                    customClass: (vm && vm[customClassExr]) || customClassExr,
                    fullscreen: !!binding.modifiers.fullscreen
                }
            })
            el.instance = mask
            el.mask = mask.$el
            el.maskStyle = {}

            binding.value && toggleLoading(el, binding)
        },

        update: function (el, binding) {
            el.instance.setText(el.getAttribute('loading-text'))
            if (binding.oldValue !== binding.value) {
                toggleLoading(el, binding)
            }
        },

        unbind: function (el, binding) {
            if (el.domInserted) {
                el.mask &&
                el.mask.parentNode &&
                el.mask.parentNode.removeChild(el.mask)
                toggleLoading(el, {
                    value: false,
                    modifiers: binding.modifiers
                })
            }
        }
    })
}

export default loadingDirective
