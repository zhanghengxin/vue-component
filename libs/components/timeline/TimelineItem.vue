<template>
    <li :class="itemCls">
        <div :class="tailCls"></div>
        <div
            :class="headCls"
            :style="customColor"
            ref="dot">
                <slot name="dot"></slot>
        </div>
        <div :class="contentCls">
            <slot></slot>
        </div>
    </li>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}timeline`

export default {
    name: `${prefixCls}-item`,
    props: {
        color: {
            type: String,
            default: 'blue'
        }
    },
    data () {
        return {
            dot: false
        }
    },
    mounted () {
        this.dot = !!this.$refs.dot.innerHTML.length
    },
    computed: {
        itemCls () {
            return `${prefixCls}-item`
        },
        tailCls () {
            return `${prefixCls}-item-tail`
        },
        headCls () {
            return [
                `${prefixCls}-item-head`,
                {
                    [`${prefixCls}-item-head-custom`]: this.dot,
                    [`${prefixCls}-item-head-${this.color}`]: this.headColorShow
                }
            ]
        },
        contentCls () {
            return `${prefixCls}-item-content`
        },
        headColorShow () {
            return this.color === 'blue' ||
            this.color === 'red' ||
            this.color === 'green' ||
            this.color === 'orange'
        },
        customColor () {
            let style = {}
            if (this.color) {
                if (!this.headColorShow) {
                    style = {
                        'color': this.color,
                        'border-color': this.color
                    }
                }
            }
            return style
        }
    }
}
</script>
