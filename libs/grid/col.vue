<template>
    <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
const prefixCls = 'b-col'

export default {
    name: prefixCls,
    props: {
        span: [Number, String],
        forward: [Number, String],
        back: [Number, String],
        offset: [Number, String],
        className: String
    },
    data () {
        return {
            interval: 0
        }
    },
    computed: {
        classes () {
            let classList = [
                `${prefixCls}`,
                {
                    [`${prefixCls}-span-${this.span}`]: this.span,
                    [`${prefixCls}-forward-${this.forward}`]: this.forward,
                    [`${prefixCls}-back-${this.back}`]: this.back,
                    [`${prefixCls}-offset-${this.offset}`]: this.offset,
                    [`${this.className}`]: !!this.className
                }
            ]
            return classList
        },
        styles () {
            let style = {}
            if (this.interval) {
                style = {
                    paddingLeft: this.interval / 2 + 'px',
                    paddingRight: this.interval / 2 + 'px'
                }
            }
            return style
        }
    }
}
</script>
