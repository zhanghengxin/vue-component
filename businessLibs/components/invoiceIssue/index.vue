<!-- 发票开具 入口 -->
<template>
    <div :class="wrapCls">
        <point-group :point-num="12"></point-group>
        <div :class="prefixCls"></div>
        <point-group :point-num="12"></point-group>
    </div>
</template>

<script>
import PointGroup from './modules/pointGroup'

const prefixCls = 'invoice'
export default {
    name: 'invoiceIssue',
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    components: {
        PointGroup
    },
    computed: {
        wrapCls () {
            return `${prefixCls}-container`
        }
    }
}
</script>

<style lang="scss" scoped>
// .invoice {
//     &-container {}
// }
</style>
