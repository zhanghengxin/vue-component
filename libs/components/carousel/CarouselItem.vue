/**
* 走马灯组件 b-carousel-item
* Created by hanshuai on 2018/9/10.
*/

<template>
    <div :class="[prefixCls + '-slide']" :style="style">
        <slot></slot>
    </div>
</template>

<script>
const prefixCls = 'b-carousel'

export default {
    name: 'b-carousel-item',
    data () {
        return {
            prefixCls
        }
    },
    computed: {
        style () {
            let { animation, height, speed, conWidth } = this.$parent
            if (animation === 'fade') {
                return {
                    position: 'absolute',
                    opacity: 0,
                    width: '100%',
                    height: `${height}px`,
                    transition: `opacity ${speed / 500}s `
                }
            } else if (animation === 'slide') {
                return {
                    width: conWidth + 'px',
                    height: `${height}px`,
                    float: 'left'
                }
            }
        }
    }
}
</script>
