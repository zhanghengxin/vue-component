<template>
    <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>
<script>

import { prefix } from '../../utils/common'
import Vue from 'vue'
import { existenceIndex, existenceIncrease } from '../../utils/existence-queue'

const isServer = Vue.prototype.$isServer
const Popper = isServer ? function () {} : require('popper.js/dist/umd/popper.js')
const prefixCls = prefix + 'drop'

export default {
    name: prefixCls,
    props: {
        placement: {
            validator (value) {
                return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(value) !== -1
            },
            default: 'bottom-start'
        },
        labelWidth: {
            type: [String, Number],
            default: 0
        },
        width: {
            type: [String, Number],
            default: 0
        },
        className: {
            type: String
        },
        transfer: {
            type: Boolean
        }
    },
    computed: {
        styles () {
            let style = {}
            if (this.width) {
                style.minWidth = `${this.width}px`
                // style.maxWidth = `${100 + +this.width}px`
            }
            if (this.transfer) style['z-index'] = 1060 + this.tIndex
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
    data () {
        return {
            popper: null,
            popperStatus: false,
            tIndex: this.handleGetIndex()
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
                    // console.log('this.$parent.$refs.reference', this.$parent.$refs.reference)
                    if (!this.$parent.$refs.reference) return
                    this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                        placement: this.placement,
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            },
                            offset: {
                                offset: this.labelWidth
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
            this.tIndex = this.handleGetIndex()
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
        },
        handleGetIndex () {
            existenceIncrease()
            return existenceIndex
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
