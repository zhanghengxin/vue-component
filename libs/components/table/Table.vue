<template>
    <div
        :class="wrapCls" :style="styles"
    >
        <div :class="tableCls">
            <div :class="[preCls + '-header']" ref="header">
                <table-head
                    :columns="cloneColumns"
                    :header-style="headerStyle"
                    :pre-cls="preCls"
                    :data="formatData"
                >
                </table-head>
            </div>
            <div :class="[preCls + '-body']" :style="bodyWrapStyle" @scroll="handleScroll">
                <table-body
                    ref="body"
                    :columns="cloneColumns"
                    :data="formatData"
                    :body-style="bodyStyle"
                    :pre-cls="preCls"
                >
                </table-body>
            </div>
            <div
                :class="[preCls + '-tip']" :style="bodyWrapStyle" @scroll="handleScroll"
                v-show="(((!data || data.length === 0)) || ((!formatData || formatData.length === 0)))">
                <table :style="bodyStyle" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                    <tr>
                        <td :style="{'width':bodyStyle.width}">
                            <span v-html="showNoDataText" v-if="!data || data.length === 0"></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <table-fixed
                v-if="leftFixedColumns.length"
                :bodyStyle="fixedBodyStyle"
                :pre-cls="preCls"
                fixed="left"
                ref="leftTable"
                :data="formatData"
                :fixed-columns="leftFixedColumns"
            >
            </table-fixed>
            <table-fixed
                v-if="rightFixedColumns.length"
                :bodyStyle="fixedBodyStyle"
                :pre-cls="preCls"
                ref="rightTable"
                fixed="right"
                :data="formatData"
                :fixed-columns="rightFixedColumns"
            >
            </table-fixed>
        </div>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
import { deepCopy } from '../../utils/assist'
import { getStyle, getScrollBarSize } from '../../utils/dom'
import tableHead from './table-head'
import tableBody from './table-body'
import tableFixed from './table-fixed'
import Emitter from '../../mixins/emitter'

const preCls = prefix + 'table'
export default {
    name: preCls,
    mixins: [Emitter],
    components: {
        tableHead, tableBody, tableFixed
    },
    data () {
        return {
            preCls: preCls,
            formatData: [],
            cloneColumns: [],
            tableWidth: 0,
            bodyHeight: 0,
            horizontalScroll: false,
            verticalScroll: false,
            scrollBarWidth: getScrollBarSize()
        }
    },
    props: {
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        },
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        highlightRow: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        noDataText: String,
        disHover: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.formatData = this.buildData()
        this.cloneColumns = this.buildColumns()
        this.$on('selected-change', this.toggleSelect)
        this.$on('selected-all-change', this.selectAll)
        this.$on('sort-change', this.handleSort)
        this.$on('mouse-in', this.handleMouseIn)
        this.$on('mouse-out', this.handleMouseOut)
        this.$on('row-click', this.handleClick)
        this.$on('row-dbclick', this.handleDbclick)
    },
    mounted () {
        this.handleResize()
    },
    watch: {
        data: {
            handler () {
                this.handleResize()
                this.formatData = this.buildData()
            },
            deep: true
        },
        horizontalScroll () {
            this.handleResize()
        },
        columns: {
            handler () {
                this.cloneColumns = this.buildColumns()
            },
            deep: true
        }
    },
    computed: {
        showNoDataText () {
            if (this.noDataText === undefined) {
                return '暂无数据'
            } else {
                return this.noDataText
            }
        },
        wrapCls () {
            return [
                `${preCls}`,
                {
                    [`${preCls}-border`]: this.border,
                    [`${preCls}-stripe`]: this.stripe
                }
            ]
        },
        styles () {
            let style = {}
            if (this.height) {
                const height = parseInt(this.height)
                style.height = `${height}px`
            }
            if (this.width) style.width = `${this.width}px`
            return style
        },
        tableCls () {
            return [
                `${preCls}-wrapper`
            ]
        },
        headerStyle () {
            let style = {}
            if (this.tableWidth !== 0) {
                let width = ''
                width = this.tableWidth
                style.width = `${width}px`
            }
            return style
        },
        bodyStyle () {
            let style = {}
            if (this.tableWidth !== 0) {
                let width = this.tableWidth - (this.horizontalScroll ? this.scrollBarWidth : 0)
                style.width = `${width}px`
            }
            return style
        },
        bodyWrapStyle () {
            let style = {}
            if (this.bodyHeight !== 0) {
                const height = this.bodyHeight
                style.height = `${height}px`
            }
            return style
        },
        leftFixedColumns () {
            return this.cloneColumns.filter((item) => item.fixed === 'left')
        },
        rightFixedColumns () {
            return this.cloneColumns.filter((item) => item.fixed === 'right')
        },
        fixedBodyStyle () {
            let style = {}
            if (this.bodyHeight !== 0) {
                let height = this.bodyHeight - (this.horizontalScroll ? this.scrollBarWidth : 0)
                style.height = `${height}px`
            }
            return style
        }
    },
    methods: {
        buildData () {
            let data = deepCopy(this.data)
            data.forEach((row, index) => {
                row._index = index
                if (data._checked) {
                    data._checked = data._checked
                } else {
                    data._checked = false
                }
            })
            return data
        },
        buildColumns () {
            let columns = deepCopy(this.columns)
            columns.forEach((row, index) => {
                row._index = index
            })
            return columns
        },
        handleResize () {
            let noWidthList = []
            let hasWidthList = []
            let tableWidth = this.$el.offsetWidth
            this.cloneColumns.forEach((item) => {
                if (item.width) {
                    hasWidthList.push(item)
                } else {
                    noWidthList.push(item)
                }
            })
            let columnWidth = 0
            // 固定宽度
            let fixedWidth = hasWidthList.map(cell => cell.width).reduce((a, b) => a + b, 0)
            let adaptiveWidth = tableWidth - fixedWidth - (this.horizontalScroll ? this.scrollBarWidth : 0)
            let adaptiveLength = noWidthList.length
            // 可用宽度
            if (adaptiveWidth > 0 && adaptiveLength > 0) {
                columnWidth = parseInt(adaptiveWidth / adaptiveLength)
            }
            for (let i = 0; i < this.cloneColumns.length; i++) {
                let column = this.cloneColumns[i]
                if (column.width) {
                    column._width = column.width
                } else {
                    column._width = columnWidth
                }
            }
            // 总宽度
            this.tableWidth = this.cloneColumns.map(cell => cell._width).reduce((a, b) => a + b, 0) + (this.horizontalScroll ? this.scrollBarWidth : 0)
            this.scrollReckon()
        },
        scrollReckon () {
            if (this.height) {
                this.$nextTick(() => {
                    const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0
                    this.bodyHeight = this.height - headerHeight
                    this.$nextTick(() => this.bodyScrollReckon())
                })
            } else {
                this.bodyHeight = 0
                this.$nextTick(() => this.bodyScrollReckon())
            }
        },
        bodyScrollReckon () {
            if (!this.data || this.data.length === 0) {
                this.horizontalScroll = false
                this.verticalScroll = false
            } else {
                let bodyContentEl = this.$refs.body.$el
                let bodyEl = bodyContentEl.parentElement
                let bodyContentHeight = bodyContentEl.offsetHeight
                this.horizontalScroll = bodyEl.offsetWidth < bodyContentEl.offsetWidth
                this.verticalScroll = this.bodyHeight ? bodyContentHeight > this.bodyHeight : false
                if (this.verticalScroll) {
                    bodyEl.classList.add(this.preCls + '-overflowY')
                } else {
                    bodyEl.classList.remove(this.preCls + '-overflowY')
                }
                if (this.horizontalScroll) {
                    bodyEl.classList.add(this.preCls + '-overflowX')
                } else {
                    bodyEl.classList.remove(this.preCls + '-overflowX')
                }
            }
        },
        handleScroll (event) {
            this.$refs.header.scrollLeft = event.target.scrollLeft
            if (this.leftFixedColumns.length) this.$refs.leftTable.$children[1].$el.parentElement.scrollTop = event.target.scrollTop
            if (this.rightFixedColumns.length) this.$refs.rightTable.$children[1].$el.parentElement.scrollTop = event.target.scrollTop
        },
        getSelection () {
            let selectionIndexes = []
            for (let i in this.formatData) {
                if (this.formatData[i]._checked) selectionIndexes.push(this.data[i])
            }
            return deepCopy(selectionIndexes)
        },
        selectAll (status) {
            this.formatData.forEach((item, index) => {
                if (item._disabled) {
                    this.$set(this.formatData[index], '_checked', false)
                } else {
                    this.$set(this.formatData[index], '_checked', status)
                }
            })
            const selection = this.getSelection()
            if (status) {
                this.$emit('on-select-all', selection)
            } else {
                this.$emit('on-select-all-cancel', selection)
            }
            this.$emit('on-selection-change', selection)
        },
        toggleSelect (index) {
            const status = !this.formatData[index]._checked
            this.$set(this.formatData[index], '_checked', status)
            const selection = this.getSelection()
            this.$emit(status ? 'on-select' : 'on-select-cancel', selection, deepCopy(this.data[index]))
            this.$emit('on-selection-change', selection)
        },
        // Todo 原生 Array.sort 方法，当传入的数据存在undefined 时，无法正常排序
        complete (data, key) {
            return data.map(item => {
                if (item[key] === undefined) item[key] = ''
                return item
            })
        },
        sortData (data, type, index) {
            const key = this.cloneColumns[index].key
            const sortData = this.complete(data, key)
            sortData.sort((a, b) => {
                if (this.cloneColumns[index].sortMethod) {
                    return this.cloneColumns[index].sortMethod(a[key], b[key], type)
                } else {
                    if (type === 'asc') {
                        return a[key] > b[key] ? 1 : -1
                    } else if (type === 'desc') {
                        return a[key] < b[key] ? 1 : -1
                    }
                }
            })
            return sortData
        },
        handleSort (options) {
            const column = this.cloneColumns[options.index]
            if (column._sortType === options.type) {
                options.type = 'normal'
            }
            if (column.sortable) {
                if (options.type === 'normal') {
                    this.formatData = this.buildData()
                } else {
                    this.formatData = this.sortData(this.formatData, options.type, options.index)
                }
            }
            this.$set(column, '_sortType', options.type)
            this.$emit('on-sort-change', {
                column: deepCopy(this.columns[options.index]),
                key: options.key,
                order: options.type
            })
        },
        handleMouseIn (_index) {
            if (this.disHover) return
            if (this.formatData[_index]._isHover) return
            this.$set(this.formatData[_index], '_isHover', true)
        },
        handleMouseOut (_index) {
            if (this.disHover) return
            if (!this.formatData[_index]._isHover) return
            this.$set(this.formatData[_index], '_isHover', false)
        },
        handleCurrentRow (_index) {
            this.formatData.forEach((item, index) => {
                this.$set(this.formatData[index], '_isHighlight', false)
            })
            this.$set(this.formatData[_index], '_isHighlight', true)
        },
        handleClick (_index) {
            this.$emit('on-row-click', deepCopy(this.data[_index]))
            if (!this.highlightRow) return
            this.handleCurrentRow(_index)
        },
        handleDbclick (_index) {
            this.$emit('on-row-dbclick', deepCopy(this.data[_index]))
            if (!this.highlightRow) return
            this.handleCurrentRow(_index)
        }
    }
}
</script>
