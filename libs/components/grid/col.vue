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
        order: [Number, String],
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
                    [`${prefixCls}-order-${this.order}`]: this.order,
                    [`${this.className}`]: !!this.className
                }
            ];
            ['xs', 'sm', 'md', 'lg'].forEach(size => {
                if (typeof this[size] === 'number') {
                    classList.push(`${prefixCls}-span-${size}-${this[size]}`)
                } else if (typeof this[size] === 'object') {
                    let props = this[size]
                    Object.keys(props).forEach(prop => {
                        classList.push(
                            prop !== 'span'
                                ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                                : `${prefixCls}-span-${size}-${props[prop]}`
                        )
                    })
                }
            })
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
