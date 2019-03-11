<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styles">
        <colgroup>
            <col v-for="(column, index) in visibleColumns" :key="index" :width="setCellWidth(column)">
        </colgroup>
        <tbody :class="[preCls + '-tbody']">
        <template v-for="(row, index) in data">
            <table-tr
                :row="row"
                :pre-cls="preCls"
                @mouseenter.native.stop="handleMouseIn(index)"
                @mouseleave.native.stop="handleMouseOut(index)"
                @click.native="clickCurrentRow(index)"
                @dblclick.native.stop="dblclickCurrentRow(index)"
                :key="index">
                <td
                    v-for="(column,_index) in cellColumns(visibleColumns,row,index)"
                    :key="_index"
                    :colspan="cellColspan(row,column)"
                    :rowspan="cellRowspan(row,column)"
                    :class="alignCls(column, row)">
                    <table-cell
                        :pre-cls="preCls"
                        :row="row"
                        :checked="row._checked"
                        :index="index"
                        :disabled="row._disabled"
                        :column="column"
                    ></table-cell>
                </td>
            </table-tr>
        </template>
        </tbody>
    </table>
</template>
<script>
import tableMixin from './tableMixin'
import TableTr from './table-tr'
import TableCell from './table-cell'
import Emitter from '../../mixins/emitter'
import { deepCopy } from '../../utils/assist'

export default {
    name: 'TableHead',
    mixins: [tableMixin, Emitter],
    components: {TableTr, TableCell},
    props: {
        columns: Array,
        data: Array,
        preCls: String,
        bodyStyle: Object
    },
    computed: {
        styles () {
            const style = deepCopy(this.bodyStyle)
            const width = parseInt(this.bodyStyle.width)
            style.width = `${width}px`
            return style
        },
        visibleColumns () {
            return this.columns.filter((item) => item._visible)
        }
    },
    methods: {
        cellColumns (columns, row, rowIndex) {
            let columnData = deepCopy(columns)
            let data = this.data
            for (let i in row) {
                if (i === '_colspan') {
                    for (let j in row[i]) {
                        columnData.forEach((column, index) => {
                            if (column.key === j) {
                                columnData.splice(index + 1, row[i][j] - 1)
                            }
                        })
                    }
                }
            }
            data.forEach(function (item, index) {
                if (index < rowIndex) {
                    for (let i in item) {
                        if (i === '_rowspan') {
                            for (let j in item[i]) {
                                if (rowIndex < index + item[i][j]) {
                                    columnData.forEach((column, z) => {
                                        if (column.key === j) {
                                            columnData.splice(z, 1)
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            })
            return columnData
        },
        handleMouseIn (_index) {
            this.dispatch(this.preCls, 'mouse-in', _index)
        },
        handleMouseOut (_index) {
            this.dispatch(this.preCls, 'mouse-out', _index)
        },
        clickCurrentRow (_index) {
            this.dispatch(this.preCls, 'row-click', _index)
        },
        dblclickCurrentRow (_index) {
            this.dispatch(this.preCls, 'row-dbclick', _index)
        }
    }
}
</script>
