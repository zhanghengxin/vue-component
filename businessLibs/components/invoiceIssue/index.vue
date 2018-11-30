<!-- 发票开具 入口 -->
<template>
    <div :class="wrapCls">
        <div :class="`${prefixCls}-toolbar`">
            <toolbar :prefixCls="prefixCls"></toolbar>
        </div>
        <div :class="`${prefixCls}-main`">
            <invoice :prefixCls="prefixCls"></invoice>
        </div>
    </div>
</template>

<script>
import Toolbar from './toolbar'
import Invoice from './modules/invoice'

const prefixCls = 'invoice'

export default {
    name: 'invoiceIssue',
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    components: {
        Toolbar,
        Invoice
    },
    computed: {
        wrapCls () {
            return `${prefixCls}-container`
        }
    }
}
</script>

<style lang="scss">
@import './index.scss'
</style>
