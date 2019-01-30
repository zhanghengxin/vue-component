<template>
    <transition name="fade">
        <div :class="wrapperCls" :style="wrapperStyle" v-show="show">
            <div :class="innerCls" :style="innerStyle"></div>
        </div>
    </transition>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}loading-bar`

export default {
    name: prefixCls,
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        failedColor: {
            type: String,
            default: 'error'
        },
        height: {
            type: Number,
            default: 2
        }
    },
    data () {
        return {
            percent: 0,
            status: 'success',
            show: false
        }
    },
    computed: {
        wrapperCls () {
            return `${prefixCls}`
        },
        wrapperStyle () {
            return {
                height: `${this.height}px`
            }
        },
        innerCls () {
            return [
                `${prefixCls}-inner`,
                {
                    [`${prefixCls}-inner-color-primary`]: this.color === 'primary' && this.status === 'success',
                    [`${prefixCls}-inner-failed-color-error`]: this.failedColor === 'error' && this.status === 'error'
                }
            ]
        },
        innerStyle () {
            let style = {
                width: `${this.percent}%`,
                height: `${this.height}px`
            }
            if (this.color !== 'primary' && this.status === 'success') {
                style.backgroundColor = this.color
            }
            if (this.failedColor !== 'error' && this.status === 'error') {
                style.backgroundColor = this.failedColor
            }
            return style
        }
    }
}
</script>
