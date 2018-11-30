/**
* 走马灯组件 b-carousel-item
* Created by hanshuai on 2018/9/10.
*/

<template>
    <div
        :class="[wrapperCls, { 'is-active': translate === 0 && $parent.animation === 'slide' }]"
        :style="style"
        :current="$parent.active">
        <slot></slot>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}carousel`

export default {
    name: `${prefixCls}-item`,
    data () {
        return {
            prefixCls,
            translate: 0
        }
    },
    computed: {
        wrapperCls () {
            if (this.$parent.animation === 'slide') return `${prefixCls}-slide`
            return `${prefixCls}-fade`
        },
        style () {
            let { animation, speed } = this.$parent
            if (animation === 'fade') {
                return {
                    opacity: 0,
                    transition: `opacity ${speed / 500}s `
                }
            } else if (animation === 'slide') {
                return {
                    transform: `translateX(${this.translate}px)`,
                    transition: `transform ${speed / 1000}s ease`
                }
            }
        }
    }
}
</script>
