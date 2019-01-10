<template>
    <div :class="wrapCls" :style="fixedTableStyle">
        <div>
            <table-head
                :style="fixedTableStyle"
                :columns="fixedColumns"
                :header-style="fixedTableStyle"
                :pre-cls="preCls"
                :data="data"
                :fixed="fixed">
            </table-head>
        </div>
        <div :class="[preCls + '-fixed-body']" :style="bodyStyle">
            <table-body
                :columns="fixedColumns"
                :data="data"
                :body-style="fixedTableStyle"
                :pre-cls="preCls"
            >
            </table-body>
        </div>
    </div>
</template>

<script>
import tableHead from './table-head'
import tableBody from './table-body'

export default {
    name: 'table-fixed',
    props: {
        preCls: String,
        bodyStyle: Object,
        fixedColumns: Array,
        data: Array,
        fixed: String
    },
    components: {
        tableHead, tableBody
    },
    computed: {
        wrapCls () {
            return [
                `${this.preCls}-fixed`,
                `${this.preCls}-fixed-${this.fixed}`
            ]
        },
        fixedTableStyle () {
            let style = {}
            let width = 0
            this.fixedColumns.forEach((col) => {
                if (col.fixed && col.fixed === this.fixed) {
                    width += col._width
                }
            })
            if (this.fixed === 'right') {
                style.right = `${this.$parent.verticalScroll ? this.$parent.scrollBarWidth : 0}px`
            }
            style.width = `${width}px`
            return style
        }
    }
}
</script>
