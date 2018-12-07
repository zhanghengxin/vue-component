<template>
    <div :class="classes" :style="styles"><slot></slot></div>
</template>
<script>

import Popper from '&/utils/vue-popper.js'
import { prefix } from '&/utils/common'

const prefixCls = prefix + 'drop'

export default {
    name: prefixCls,
    mixins: [ Popper ],
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
                console.log('this.$parent.$refs', this.$parent.$refs)
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
            // set a height for parent is Modal and Select's width is 100%
            // if (this.$parent.$options.name === `${prefix}select`) {
            //     this.width = parseInt(getStyle(this.$parent.$el, 'width'))
            // }
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
            // 不判断，Select 会报错，不知道为什么
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
        // this.$on('on-update-popper', this.update)
        // this.$on('on-destroy-popper', this.destroy)
    },
    beforeDestroy () {
        // if (this.popper) {
        //     this.popper.destroy()
        // }
    }
}
</script>
