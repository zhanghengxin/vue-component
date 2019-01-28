<template>
    <div>
        <div
            ref='affix'
            :class="wrapperCls"
            :style="wrapperStyle">
            <slot></slot>
        </div>
        <div v-show="slot" :style="slotStyle"></div>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
import { on, off } from '../../utils//dom'
import { getScroll, getOffset } from './utils'
const prefixCls = `${prefix}affix`

export default {
    name: prefixCls,
    props: {
        offsetTop: {
            type: Number,
            default: 0
        },
        offsetBottom: Number
    },
    data () {
        return {
            affix: false,
            slot: false,
            wrapperStyle: {},
            slotStyle: {}
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-fixed`]: this.affix
                }
            ]
        },
        offsetType () {
            return this.offsetBottom >= 0 ? 'bottom' : 'top'
        }
    },
    mounted () {
        on(window, 'scroll', this.scroll)
        on(window, 'resize', this.scroll)
    },
    beforeDestroy () {
        off(window, 'scroll', this.scroll)
        off(window, 'resize', this.scroll)
    },
    methods: {
        scroll () {
            const scrollTop = getScroll(window, true)
            const elOffset = getOffset(this.$el)
            const windowHeight = window.innerHeight
            const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight

            // Top
            if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType === 'top' && !this.affix) {
                this.affix = true
                this.slotStyle = {
                    width: `${this.$refs.affix.clientWidth}px`,
                    height: `${this.$refs.affix.clientHeight}px`
                }
                this.slot = true
                this.wrapperStyle = {
                    top: `${this.offsetTop}px`,
                    left: `${elOffset.left}px`,
                    width: `${this.$el.offsetWidth}px`
                }
                this.$emit('on-change', true)
            } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType === 'top' && this.affix) {
                this.affix = false
                this.wrapperStyle = null
                this.slot = false
                this.slotStyle = null
                this.$emit('on-change', false)
            }
            // Bottom
            if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType === 'bottom' && !this.affix) {
                this.affix = true
                this.wrapperStyle = {
                    bottom: `${this.offsetBottom}px`,
                    left: `${elOffset.left}px`,
                    width: `${this.$el.offsetWidth}px`
                }
                this.$emit('on-change', true)
            } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType === 'bottom' && this.affix) {
                this.affix = false
                this.wrapperStyle = null
                this.$emit('on-change', false)
            }
        }
    }
}
</script>
