<template>
    <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>

<script>
const prefixCls = 'b-col'

export default {
    name: 'col',
    computed: {
        classes () {
            let classList = [
                `${prefixCls}`,
                {
                    [`${prefixCls}-span-${this.span}`]: this.span
                }
            ]
            return classList
        },
        styles () {
            let style = {}
            return style
        }
    }
}
</script>
