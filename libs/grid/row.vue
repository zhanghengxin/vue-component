<template>
    <div :class="rowClass" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
const prefixCls = 'b-row'
export default {
    name: 'row',
    computed: {
        rowClass () {
            return [
                {
                    [`${prefixCls}`]: !this.type,
                    [`${prefixCls}-${this.type}`]: !!this.type
                }
            ]
        },
        rowStyle () {
            let style = {}
            return style
        }
    }
}
</script>
