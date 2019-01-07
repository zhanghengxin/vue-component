<template>
    <tr :class="rowCls">
        <slot></slot>
    </tr>
</template>
<script>
export default {
    props: {
        row: Object,
        preCls: String
    },
    computed: {
        rowCls () {
            return [
                {
                    [`${this.row._className}`]: this.row._className,
                    [`${this.preCls}-row-hover`]: this.row._isHover
                }
            ]
        }
    }
}
</script>
