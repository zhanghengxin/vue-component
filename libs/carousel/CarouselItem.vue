/**
* 走马灯组件 b-carousel-item
* Created by hanshuai on 2018/9/10.
*/

<template>
    <div class="b-carousel-slide" :style="style">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'b-carousel-item',
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
