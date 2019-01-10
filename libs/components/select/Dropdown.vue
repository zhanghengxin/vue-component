<template>
    <div :class="classes" :style="styles"><slot></slot></div>
</template>
<script>

import { prefix } from '&/utils/common'
import Vue from 'vue'
const isServer = Vue.prototype.$isServer
const Popper = isServer ? function () {} : require('popper.js/dist/umd/popper.js')
const prefixCls = prefix + 'drop'

export default {
    name: prefixCls,
    props: {
        placement: {
            type: String,
            default: 'bottom-start'
        },
        className: {
            type: String
        }
    },
    data () {
        return {
            width: ''
        }
    },
    computed: {
        styles () {
            let style = {}
            if (this.width) style.minWidth = `${this.width}px`
            return style
        },
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${this.className}`]: this.className
                }
            ]
        }
    },
    methods: {
        update () {
            if (this.popper) {
                this.$nextTick(() => {
                    this.popper.update()
                    this.popperStatus = true
                })
            } else {
                this.$nextTick(() => {
                    this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                        placement: this.placement,
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            }
                        },
                        onCreate: () => {
                            this.resetTransformOrigin()
                            this.$nextTick(this.popper.update())
                        },
                        onUpdate: () => {
                            this.resetTransformOrigin()
                        }
                    })
                })
            }
            if (this.$parent.$options.name === `${prefix}select`) {
                this.width = this.$parent.$el.querySelector(`.${prefix}select-selection`).clientWidth
            }
        },
        destroy () {
            if (this.popper) {
                setTimeout(() => {
                    if (this.popper && !this.popperStatus) {
                        this.popper.destroy()
                        this.popper = null
                    }
                    this.popperStatus = false
                }, 300)
            }
        },
        resetTransformOrigin () {
            if (!this.popper) return
            let xPlacement = this.popper.popper.getAttribute('x-placement')
            let placementStart = xPlacement.split('-')[0]
            let placementEnd = xPlacement.split('-')[1]
            const leftOrRight = xPlacement === 'left' || xPlacement === 'right'
            if (!leftOrRight) {
                this.popper.popper.style.transformOrigin = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
            }
        }
    },
    created () {
        this.$on('on-update-popper', this.update)
        this.$on('on-destroy-popper', this.destroy)
    },
    beforeDestroy () {
        if (this.popper) {
            this.popper.destroy()
        }
    }
}
</script>
