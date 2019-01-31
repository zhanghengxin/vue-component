<template>
    <div :class="wrapClasses" :style="styles">
        <div :class="classes">
            <div :class="[prefixCls + '-title']" v-if="showSlotHeader" ref="title">
                <slot name="header"></slot>
            </div>
            <div :class="[prefixCls + '-header']" v-if="showHeader" ref="header" @mousewheel="handleMouseWheel">
                <table-head
                    :prefix-cls="prefixCls"
                    :styleObject="tableHeaderStyle"
                    :columns="cloneColumns"
                    :resizeable="resizeable"
                    :column-rows="columnRows"
                    :obj-data="objData"
                    :draggable="draggable"
                    :dynamicable="dynamicable"
                    :columns-width="columnsWidth"
                    :data="rebuildData"></table-head>
            </div>
            <div :class="[prefixCls + '-body']" :style="bodyStyle" ref="body" @scroll="handleBodyScroll"
                 v-show="!((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))">
                <table-body
                    ref="tbody"
                    :prefix-cls="prefixCls"
                    :styleObject="tableStyle"
                    :columns="cloneColumns"
                    :data="rebuildData"
                    :columns-width="columnsWidth"
                    :obj-data="objData"></table-body>
            </div>
            <div
                :class="[prefixCls + '-tip']" :style="bodyStyle" @scroll="handleBodyScroll"
                v-show="((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))">
                <table cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                    <tr>
                        <td :style="{'height':bodyStyle.height,'width':`${this.headerWidth}px`}">
                            <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
                            <span v-html="localeNoFilteredDataText" v-else></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
                <div :class="fixedHeaderClasses" v-if="showHeader">
                    <table-head
                        fixed="left"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedTableStyle"
                        :columns="leftFixedColumns"
                        :column-rows="columnRows"
                        :fixed-column-rows="leftFixedColumnRows"
                        :obj-data="objData"
                        :resizeable="resizeable"
                        :draggable="draggable"
                        :columns-width="columnsWidth"
                        :data="rebuildData"></table-head>
                </div>
                <div :class="[prefixCls + '-fixed-body']" :style="fixedBodyStyle" ref="fixedBody"
                     @mousewheel="handleFixedMousewheel" @DOMMouseScroll="handleFixedMousewheel">
                    <table-body
                        fixed="left"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedTableStyle"
                        :columns="leftFixedColumns"
                        :data="rebuildData"
                        :columns-width="columnsWidth"
                        :obj-data="objData"></table-body>
                </div>
            </div>
            <div :class="[prefixCls + '-fixed-right']" :style="fixedRightTableStyle" v-if="isRightFixed">
                <div :class="fixedHeaderClasses" v-if="showHeader">
                    <table-head
                        fixed="right"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedRightTableStyle"
                        :columns="rightFixedColumns"
                        :column-rows="columnRows"
                        :resizeable="resizeable"
                        :draggable="draggable"
                        :fixed-column-rows="rightFixedColumnRows"
                        :obj-data="objData"
                        :columns-width="columnsWidth"
                        :data="rebuildData"></table-head>
                </div>
                <div :class="[prefixCls + '-fixed-body']" :style="fixedBodyStyle" ref="fixedRightBody"
                     @mousewheel="handleFixedMousewheel" @DOMMouseScroll="handleFixedMousewheel">
                    <table-body
                        fixed="right"
                        :prefix-cls="prefixCls"
                        :styleObject="fixedRightTableStyle"
                        :columns="rightFixedColumns"
                        :data="rebuildData"
                        :columns-width="columnsWidth"
                        :obj-data="objData"></table-body>
                </div>
            </div>
            <div :class="[prefixCls + '-fixed-right-header']" :style="fixedRightHeaderStyle" v-if="isRightFixed"></div>
            <div :class="[prefixCls + '-footer']" v-if="showSlotFooter" ref="footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <Spin fix size="large" v-if="loading">
            <slot name="loading"></slot>
        </Spin>
        <div
            :class="[prefixCls + '-resize-border']"
            v-show="showResizeBorder"
            :style="dragBorderHeight"
            ref="resizeBorder">
        </div>
        <dynamic-column
            :pre-cls="prefixCls"
            v-show="dynamicColumnBoxShow"
            :dynamicallocation="dynamicallocation"
            :show="dynamicColumnBoxShow"
            :columns="normalColumns"
            ref="dynamic">
        </dynamic-column>
        <Icon
            v-if="dynamicallocation"
            :class="[prefixCls + '-dynamic-icon']"
            @click.native="showDynamicModal"
            type="ios-options"/>
        <Modal
            v-model="modalShow"
            title="自定义列表"
            @on-ok="dynamicSave"
        >
            <ul :class="[prefixCls + '-dynamic-modal-column']">
                <li :class="[prefixCls + '-dynamic-modal-column-item']" v-for="(column,index) in normalColumns"
                    :key="index">
                    <Checkbox
                        :value="column._visible"
                        @click.native.prevent="dynamicOrder(column._index,column._visible)"
                    >
                    </Checkbox>
                    <span>{{column.title}}</span>
                </li>
            </ul>

        </Modal>
    </div>
</template>
<script>
import tableHead from './table-head.vue'
import tableBody from './table-body.vue'
import dynamicColumn from './dynamic-column'
import Spin from 'iview/src/components/spin/spin.vue'
import Icon from 'iview/src/components/icon'
import Modal from 'iview/src/components/modal'
import Button from 'iview/src/components/button'
import Checkbox from 'iview/src/components/checkbox'
import { oneOf, getStyle, deepCopy, getScrollBarSize } from 'iview/src/utils/assist'
import { on, off } from 'iview/src/utils/dom'
import Csv from 'iview/src/utils/csv'
import ExportCsv from 'iview/src/components/table/export-csv'
import Locale from 'iview/src/mixins/locale'
import elementResizeDetectorMaker from 'element-resize-detector'
import { getAllColumns, convertToRows, convertColumnOrder, getRandomStr } from 'iview/src/components/table/util'

const prefixCls = 'ivu-table'

let rowKey = 1
let columnKey = 1

export default {
    name: 'Table',
    mixins: [Locale],
    components: {tableHead, tableBody, Spin, dynamicColumn, Icon, Modal, Checkbox, Button},
    provide () {
        return {
            tableRoot: this
        }
    },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        size: {
            validator (value) {
                return oneOf(value, ['small', 'large', 'default'])
            },
            default () {
                return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size
            }
        },
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String]
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightRow: {
            type: Boolean,
            default: false
        },
        rowClassName: {
            type: Function,
            default () {
                return ''
            }
        },
        context: {
            type: Object
        },
        noDataText: {
            type: String
        },
        noFilteredDataText: {
            type: String
        },
        disabledHover: {
            type: Boolean
        },
        resizeable: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: false
        },
        dynamicable: {
            type: Boolean,
            default: false
        },
        dynamicallocation: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const colsWithId = this.makeColumnsId(this.columns)
        return {
            ready: false,
            tableWidth: 0,
            columnsWidth: {},
            prefixCls: prefixCls,
            compiledUids: [],
            objData: this.makeObjData(),     // checkbox or highlight-row
            rebuildData: [],    // for sort or filter
            cloneColumns: this.makeColumns(colsWithId),
            columnRows: this.makeColumnRows(false, colsWithId),
            leftFixedColumnRows: this.makeColumnRows('left', colsWithId),
            rightFixedColumnRows: this.makeColumnRows('right', colsWithId),
            allColumns: getAllColumns(colsWithId),  // for multiple table-head, get columns that have no children
            showSlotHeader: true,
            showSlotFooter: true,
            bodyHeight: 0,
            scrollBarWidth: getScrollBarSize(),
            currentContext: this.context,
            cloneData: deepCopy(this.data),    // when Cell has a button to delete row data, clickCurrentRow will throw an error, so clone a data
            showVerticalScrollBar: false,
            showHorizontalScrollBar: false,
            headerWidth: 0,
            headerHeight: 0,
            dragBorderHeight: {
                height: '100%'
            },
            dragStartIndex: '',
            dynamicColumnBoxShow: false,
            dynamicColumns: [],
            modalShow: false,
            showResizeBorder: false
        }
    },
    computed: {
        localeNoDataText () {
            if (this.noDataText === undefined) {
                return this.t('i.table.noDataText')
            } else {
                return this.noDataText
            }
        },
        localeNoFilteredDataText () {
            if (this.noFilteredDataText === undefined) {
                return this.t('i.table.noFilteredDataText')
            } else {
                return this.noFilteredDataText
            }
        },
        wrapClasses () {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-hide`]: !this.ready,
                    [`${prefixCls}-draggable`]: this.draggable,
                    [`${prefixCls}-with-header`]: this.showSlotHeader,
                    [`${prefixCls}-with-footer`]: this.showSlotFooter
                }
            ]
        },
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-border`]: this.border,
                    [`${prefixCls}-stripe`]: this.stripe,
                    [`${prefixCls}-with-fixed-top`]: !!this.height
                }
            ]
        },
        fixedHeaderClasses () {
            return [
                `${prefixCls}-fixed-header`,
                {
                    [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length
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
        tableStyle () {
            let style = {}
            let boxWidth = this.$el ? this.$el.offsetWidth : 0
            let tableWidth = this.getVisibleColumnsWidth()
            if (tableWidth !== 0) {
                let width = tableWidth
                if (this.bodyHeight === 0) {
                    width = tableWidth
                } else {
                    width = tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0)
                }
                if (boxWidth && width + 1 + (this.showVerticalScrollBar ? this.scrollBarWidth : 0) < boxWidth) {
                    width = boxWidth - 1
                }
                style.width = `${width}px`
            }
            return style
        },
        tableHeaderStyle () {
            let boxWidth = this.$el ? this.$el.offsetWidth : 0
            let tableWidth = this.getVisibleColumnsWidth()
            let style = {}
            if (tableWidth !== 0) {
                let width = ''
                width = tableWidth
                if (boxWidth && width + 1 < boxWidth) {
                    width = boxWidth - 1
                }
                style.width = `${width}px`
            }
            return style
        },
        fixedTableStyle () {
            let style = {}
            let width = 0
            this.leftFixedColumns.forEach((col) => {
                if (col.fixed && col.fixed === 'left') width += col._width
            })
            style.width = `${width}px`
            return style
        },
        fixedRightTableStyle () {
            let style = {}
            let width = 0
            this.rightFixedColumns.forEach((col) => {
                if (col.fixed && col.fixed === 'right') width += col._width
            })
            //width += this.scrollBarWidth;
            style.width = `${width}px`
            style.right = `${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px`
            return style
        },
        fixedRightHeaderStyle () {
            let style = {}
            let width = 0
            let height = this.headerHeight + 1
            if (this.showVerticalScrollBar) {
                width = this.scrollBarWidth
            }
            style.width = `${width}px`
            style.height = `${height}px`
            return style
        },
        bodyStyle () {
            let style = {}
            if (this.bodyHeight !== 0) {
                const height = this.bodyHeight
                style.height = `${height}px`
            }
            return style
        },
        fixedBodyStyle () {
            let style = {}
            if (this.bodyHeight !== 0) {
                let height = this.bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0)
                style.height = this.showHorizontalScrollBar ? `${height}px` : `${height - 1}px`
            }
            return style
        },
        leftFixedColumns () {
            return convertColumnOrder(this.cloneColumns, 'left')
        },
        rightFixedColumns () {
            return convertColumnOrder(this.cloneColumns, 'right')
        },
        isLeftFixed () {
            return this.columns.some(col => col.fixed && col.fixed === 'left')
        },
        isRightFixed () {
            return this.columns.some(col => col.fixed && col.fixed === 'right')
        },
        normalColumns () {
            if (this.dynamicable) {
                return this.cloneColumns.filter((cell) => (!cell.fixed))
            } else {
                return this.dynamicColumns.filter((cell) => (!cell.fixed))
            }
        }
    },
    methods: {
        rowClsName (index) {
            return this.rowClassName(this.data[index], index)
        },
        getVisibleColumnsWidth (isDynamicColumns = false) {
            let cloneColumns = isDynamicColumns ? this.dynamicColumns : this.cloneColumns
            return cloneColumns.map(cell => {
                if (cell._visible) {
                    return cell._width
                } else {
                    return 0
                }
            }).reduce((a, b) => a + b, 0) + (this.showVerticalScrollBar ? this.scrollBarWidth : 0) + 1
        },
        handleResize () {
            //let tableWidth = parseInt(getStyle(this.$el, 'width')) - 1;
            let tableWidth = this.$el.offsetWidth - 1
            let columnsWidth = {}
            let sumMinWidth = 0
            let hasWidthColumns = []
            let noWidthColumns = []
            let maxWidthColumns = []
            let noMaxWidthColumns = []
            this.cloneColumns.forEach((col) => {
                if (col.width) {
                    hasWidthColumns.push(col)
                }
                else {
                    noWidthColumns.push(col)
                    if (col.minWidth) {
                        sumMinWidth += col.minWidth
                    }
                    if (col.maxWidth) {
                        maxWidthColumns.push(col)
                    }
                    else {
                        noMaxWidthColumns.push(col)
                    }
                }
                col._width = null
            })

            let unUsableWidth = hasWidthColumns.map(cell => cell.width).reduce((a, b) => a + b, 0)
            let usableWidth = tableWidth - unUsableWidth - sumMinWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0) - 1
            let usableLength = noWidthColumns.length
            let columnWidth = 0
            if (usableWidth > 0 && usableLength > 0) {
                columnWidth = parseInt(usableWidth / usableLength)
            }

            for (let i = 0; i < this.cloneColumns.length; i++) {
                const column = this.cloneColumns[i]
                let width = columnWidth + (column.minWidth ? column.minWidth : 0)
                if (column.width) {
                    width = column.width
                } else {
                    if (column._width) {
                        width = column._width
                    } else {
                        if (column.minWidth > width) {
                            width = column.minWidth
                        } else if (column.maxWidth < width) {
                            width = column.maxWidth
                        }

                        if (usableWidth > 0) {
                            usableWidth -= width - (column.minWidth ? column.minWidth : 0)
                            usableLength--
                            if (usableLength > 0) {
                                columnWidth = parseInt(usableWidth / usableLength)
                            } else {
                                columnWidth = 0
                            }
                        } else {
                            columnWidth = 0
                        }
                    }
                }

                column._width = width

                columnsWidth[column._index] = {
                    width: width
                }

            }
            if (usableWidth > 0) {
                usableLength = noMaxWidthColumns.length
                columnWidth = parseInt(usableWidth / usableLength)
                for (let i = 0; i < noMaxWidthColumns.length; i++) {
                    const column = noMaxWidthColumns[i]
                    let width = column._width + columnWidth
                    if (usableLength > 1) {
                        usableLength--
                        usableWidth -= columnWidth
                        columnWidth = parseInt(usableWidth / usableLength)
                    }
                    else {
                        columnWidth = 0
                    }

                    column._width = width

                    columnsWidth[column._index] = {
                        width: width
                    }

                }
            }

            // this.tableWidth = this.cloneColumns.map(cell => cell._width).reduce((a, b) => a + b, 0) + (this.showVerticalScrollBar ? this.scrollBarWidth : 0) + 1
            this.tableWidth = this.getVisibleColumnsWidth()
            this.columnsWidth = columnsWidth
            this.fixedHeader()
        },
        handleMouseIn (_index) {
            if (this.disabledHover) return
            if (this.objData[_index]._isHover) return
            this.objData[_index]._isHover = true
        },
        handleMouseOut (_index) {
            if (this.disabledHover) return
            this.objData[_index]._isHover = false
        },
        // 通用处理 highlightCurrentRow 和 clearCurrentRow
        handleCurrentRow (type, _index) {
            let oldIndex = -1
            for (let i in this.objData) {
                if (this.objData[i]._isHighlight) {
                    oldIndex = parseInt(i)
                    this.objData[i]._isHighlight = false
                }
            }
            if (type === 'highlight') this.objData[_index]._isHighlight = true
            const oldData = oldIndex < 0 ? null : JSON.parse(JSON.stringify(this.cloneData[oldIndex]))
            const newData = type === 'highlight' ? JSON.parse(JSON.stringify(this.cloneData[_index])) : null
            this.$emit('on-current-change', newData, oldData)
        },
        highlightCurrentRow (_index) {
            if (!this.highlightRow || this.objData[_index]._isHighlight) return
            this.handleCurrentRow('highlight', _index)
        },
        clearCurrentRow () {
            if (!this.highlightRow) return
            this.handleCurrentRow('clear')
        },
        clickCurrentRow (_index) {
            this.highlightCurrentRow(_index)
            this.$emit('on-row-click', JSON.parse(JSON.stringify(this.cloneData[_index])), _index)
        },
        dblclickCurrentRow (_index) {
            this.highlightCurrentRow(_index)
            this.$emit('on-row-dblclick', JSON.parse(JSON.stringify(this.cloneData[_index])), _index)
        },
        getSelection () {
            let selectionIndexes = []
            for (let i in this.objData) {
                if (this.objData[i]._isChecked) selectionIndexes.push(parseInt(i))
            }
            return JSON.parse(JSON.stringify(this.data.filter((data, index) => selectionIndexes.indexOf(index) > -1)))
        },
        toggleSelect (_index) {
            let data = {}

            for (let i in this.objData) {
                if (parseInt(i) === _index) {
                    data = this.objData[i]
                    break
                }
            }
            const status = !data._isChecked

            this.objData[_index]._isChecked = status

            const selection = this.getSelection()
            this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(this.data[_index])))
            this.$emit('on-selection-change', selection)
        },
        toggleExpand (_index) {
            let data = {}

            for (let i in this.objData) {
                if (parseInt(i) === _index) {
                    data = this.objData[i]
                    break
                }
            }
            const status = !data._isExpanded
            this.objData[_index]._isExpanded = status
            this.$emit('on-expand', JSON.parse(JSON.stringify(this.cloneData[_index])), status)

            if (this.height) {
                this.$nextTick(() => this.fixedBody())
            }
        },
        selectAll (status) {
            // this.rebuildData.forEach((data) => {
            //     if(this.objData[data._index]._isDisabled){
            //         this.objData[data._index]._isChecked = false;
            //     }else{
            //         this.objData[data._index]._isChecked = status;
            //     }

            // });
            for (const data of this.rebuildData) {
                if (this.objData[data._index]._isDisabled) {
                    continue
                } else {
                    this.objData[data._index]._isChecked = status
                }
            }
            const selection = this.getSelection()
            if (status) {
                this.$emit('on-select-all', selection)
            } else {
                this.$emit('on-select-all-cancel', selection)
            }
            this.$emit('on-selection-change', selection)
        },

        fixedHeader () {
            if (this.height) {
                this.$nextTick(() => {
                    const titleHeight = parseInt(getStyle(this.$refs.title, 'height')) || 0
                    const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0
                    const footerHeight = parseInt(getStyle(this.$refs.footer, 'height')) || 0
                    this.bodyHeight = this.height - titleHeight - headerHeight - footerHeight
                    this.$nextTick(() => this.fixedBody())
                })
            } else {
                this.bodyHeight = 0
                this.$nextTick(() => this.fixedBody())
            }
        },
        fixedBody () {
            if (this.$refs.header) {
                this.headerWidth = this.$refs.header.children[0].offsetWidth
                this.headerHeight = this.$refs.header.children[0].offsetHeight
                //this.showHorizontalScrollBar = this.headerWidth>this.$refs.header.offsetWidth;
            }

            if (!this.$refs.tbody || !this.data || this.data.length === 0) {
                this.showVerticalScrollBar = false
            }
            else {
                let bodyContentEl = this.$refs.tbody.$el
                let bodyEl = bodyContentEl.parentElement
                let bodyContentHeight = bodyContentEl.offsetHeight
                let bodyHeight = bodyEl.offsetHeight

                this.showHorizontalScrollBar = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.showVerticalScrollBar ? this.scrollBarWidth : 0)
                this.showVerticalScrollBar = this.bodyHeight ? bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) < bodyContentHeight : false

                if (this.showVerticalScrollBar) {
                    bodyEl.classList.add(this.prefixCls + '-overflowY')
                } else {
                    bodyEl.classList.remove(this.prefixCls + '-overflowY')
                }
                if (this.showHorizontalScrollBar) {
                    bodyEl.classList.add(this.prefixCls + '-overflowX')
                } else {
                    bodyEl.classList.remove(this.prefixCls + '-overflowX')
                }
            }
        },

        hideColumnFilter () {
            this.cloneColumns.forEach((col) => col._filterVisible = false)
        },
        handleBodyScroll (event) {
            if (this.showHeader) this.$refs.header.scrollLeft = event.target.scrollLeft
            if (this.isLeftFixed) this.$refs.fixedBody.scrollTop = event.target.scrollTop
            if (this.isRightFixed) this.$refs.fixedRightBody.scrollTop = event.target.scrollTop
            this.hideColumnFilter()
        },
        handleFixedMousewheel (event) {
            let deltaY = event.deltaY
            if (!deltaY && event.detail) {
                deltaY = event.detail * 40
            }
            if (!deltaY && event.wheelDeltaY) {
                deltaY = -event.wheelDeltaY
            }
            if (!deltaY && event.wheelDelta) {
                deltaY = -event.wheelDelta
            }
            if (!deltaY) return
            const body = this.$refs.body
            const currentScrollTop = body.scrollTop
            if (deltaY < 0 && currentScrollTop !== 0) {
                event.preventDefault()
            }
            if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
                event.preventDefault()
            }
            //body.scrollTop += deltaY;
            let step = 0
            let timeId = setInterval(() => {
                step += 5
                if (deltaY > 0) {
                    body.scrollTop += 2
                }
                else {
                    body.scrollTop -= 2
                }
                if (step >= Math.abs(deltaY)) {
                    clearInterval(timeId)
                }
            }, 5)
        },
        handleMouseWheel (event) {
            const deltaX = event.deltaX
            const $body = this.$refs.body

            if (deltaX > 0) {
                $body.scrollLeft = $body.scrollLeft + 10
            } else {
                $body.scrollLeft = $body.scrollLeft - 10
            }
        },
        sortData (data, type, index) {
            const key = this.cloneColumns[index].key
            data.sort((a, b) => {
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
            return data
        },
        handleSort (_index, type) {
            const index = this.GetOriginalIndex(_index)
            this.cloneColumns.forEach((col) => col._sortType = 'normal')

            const key = this.cloneColumns[index].key
            if (this.cloneColumns[index].sortable !== 'custom') {    // custom is for remote sort
                if (type === 'normal') {
                    this.rebuildData = this.makeDataWithFilter()
                } else {
                    this.rebuildData = this.sortData(this.rebuildData, type, index)
                }
            }
            this.cloneColumns[index]._sortType = type

            this.$emit('on-sort-change', {
                column: JSON.parse(JSON.stringify(this.allColumns[this.cloneColumns[index]._index])),
                key: key,
                order: type
            })
        },
        handleFilterHide (index) {    // clear checked that not filter now
            if (!this.cloneColumns[index]._isFiltered) this.cloneColumns[index]._filterChecked = []
        },
        filterData (data, column) {
            return data.filter((row) => {
                //如果定义了远程过滤方法则忽略此方法
                if (typeof column.filterRemote === 'function') return true

                let status = !column._filterChecked.length
                for (let i = 0; i < column._filterChecked.length; i++) {
                    status = column.filterMethod(column._filterChecked[i], row)
                    if (status) break
                }
                return status
            })
        },
        filterOtherData (data, index) {
            let column = this.cloneColumns[index]
            if (typeof column.filterRemote === 'function') {
                column.filterRemote.call(this.$parent, column._filterChecked, column.key, column)
            }

            this.cloneColumns.forEach((col, colIndex) => {
                if (colIndex !== index) {
                    data = this.filterData(data, col)
                }
            })
            return data
        },
        handleFilter (index) {
            const column = this.cloneColumns[index]
            let filterData = this.makeDataWithSort()

            // filter others first, after filter this column
            filterData = this.filterOtherData(filterData, index)
            this.rebuildData = this.filterData(filterData, column)

            this.cloneColumns[index]._isFiltered = true
            this.cloneColumns[index]._filterVisible = false
            this.$emit('on-filter-change', column)
        },
        /**
         * #2832
         * 应该区分当前表头的 column 是左固定还是右固定
         * 否则执行到 $parent 时，方法的 index 与 cloneColumns 的 index 是不对应的
         * 左固定和右固定，要区分对待
         * 所以，此方法用来获取正确的 index
         * */
        GetOriginalIndex (_index) {
            return this.cloneColumns.findIndex(item => item._index === _index)
        },
        handleFilterSelect (_index, value) {
            const index = this.GetOriginalIndex(_index)
            this.cloneColumns[index]._filterChecked = [value]
            this.handleFilter(index)
        },
        handleFilterReset (_index) {
            const index = this.GetOriginalIndex(_index)
            this.cloneColumns[index]._isFiltered = false
            this.cloneColumns[index]._filterVisible = false
            this.cloneColumns[index]._filterChecked = []

            let filterData = this.makeDataWithSort()
            filterData = this.filterOtherData(filterData, index)
            this.rebuildData = filterData
            this.$emit('on-filter-change', this.cloneColumns[index])
        },
        makeData () {
            let data = deepCopy(this.data)
            data.forEach((row, index) => {
                row._index = index
                row._rowKey = rowKey++
            })
            return data
        },
        makeDataWithSort () {
            let data = this.makeData()
            let sortType = 'normal'
            let sortIndex = -1
            let isCustom = false

            for (let i = 0; i < this.cloneColumns.length; i++) {
                if (this.cloneColumns[i]._sortType !== 'normal') {
                    sortType = this.cloneColumns[i]._sortType
                    sortIndex = i
                    isCustom = this.cloneColumns[i].sortable === 'custom'
                    break
                }
            }
            if (sortType !== 'normal' && !isCustom) data = this.sortData(data, sortType, sortIndex)
            return data
        },
        makeDataWithFilter () {
            let data = this.makeData()
            this.cloneColumns.forEach(col => data = this.filterData(data, col))
            return data
        },
        makeDataWithSortAndFilter () {
            let data = this.makeDataWithSort()
            this.cloneColumns.forEach(col => data = this.filterData(data, col))
            return data
        },
        makeObjData () {
            let data = {}
            this.data.forEach((row, index) => {
                const newRow = deepCopy(row)// todo 直接替换
                newRow._isHover = false
                if (newRow._disabled) {
                    newRow._isDisabled = newRow._disabled
                } else {
                    newRow._isDisabled = false
                }
                if (newRow._checked) {
                    newRow._isChecked = newRow._checked
                } else {
                    newRow._isChecked = false
                }
                if (newRow._expanded) {
                    newRow._isExpanded = newRow._expanded
                } else {
                    newRow._isExpanded = false
                }
                if (newRow._highlight) {
                    newRow._isHighlight = newRow._highlight
                } else {
                    newRow._isHighlight = false
                }
                data[index] = newRow
            })
            return data
        },
        // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
        makeColumnsId (columns) {
            return columns.map(item => {
                if ('children' in item) this.makeColumnsId(item.children)
                item.__id = getRandomStr(6)
                return item
            })
        },
        makeColumns (cols) {
            // 在 data 时，this.allColumns 暂时为 undefined
            let columns = deepCopy(getAllColumns(cols))
            let left = []
            let right = []
            let center = []

            columns.forEach((column, index) => {
                column._index = index
                column._columnKey = columnKey++
                column.width = parseInt(column.width)
                column._width = column.width ? column.width : ''    // update in handleResize()
                column._sortType = 'normal'
                column._filterVisible = false
                column._isFiltered = false
                column._filterChecked = []
                column._visible = true
                if ('filterMultiple' in column) {
                    column._filterMultiple = column.filterMultiple
                } else {
                    column._filterMultiple = true
                }
                if ('filteredValue' in column) {
                    column._filterChecked = column.filteredValue
                    column._isFiltered = true
                }

                if ('sortType' in column) {
                    column._sortType = column.sortType
                }

                if (column.fixed && column.fixed === 'left') {
                    left.push(column)
                } else if (column.fixed && column.fixed === 'right') {
                    right.push(column)
                } else {
                    center.push(column)
                }
            })
            return left.concat(center).concat(right)
        },
        // create a multiple table-head
        makeColumnRows (fixedType, cols) {
            return convertToRows(cols, fixedType)
        },
        exportCsv (params) {
            if (params.filename) {
                if (params.filename.indexOf('.csv') === -1) {
                    params.filename += '.csv'
                }
            } else {
                params.filename = 'table.csv'
            }

            let columns = []
            let datas = []
            if (params.columns && params.data) {
                columns = params.columns
                datas = params.data
            } else {
                columns = this.allColumns
                if (!('original' in params)) params.original = true
                datas = params.original ? this.data : this.rebuildData
            }

            let noHeader = false
            if ('noHeader' in params) noHeader = params.noHeader

            const data = Csv(columns, datas, params, noHeader)
            if (params.callback) {
                params.callback(data)
            } else {
                ExportCsv.download(params.filename, data)
            }
        },
        // resizeable
        handleMouse (options) {
            let tableWidth = this.$el.offsetWidth
            let bodyWidth = this.$refs.tbody.$el.offsetWidth
            let scrollWidth = this.showHorizontalScrollBar ? this.scrollBarWidth : 0
            if (options.isMouseUp) {
                let deltaX
                this.showResizeBorder = false
                // 拖拽后的宽度总宽度不能比表格的固定宽度小
                if (options.deltaX + bodyWidth + scrollWidth > tableWidth) {
                    deltaX = options.deltaX
                } else {
                    deltaX = tableWidth - bodyWidth - scrollWidth - 1
                }
                this.$set(this.cloneColumns[options.index], 'width', this.cloneColumns[options.index].width + deltaX)
                this.handleResize()
            } else {
                this.showResizeBorder = true
                // 拖拽后的宽度总宽度不能比表格的固定宽度小
                if (options.deltaX + bodyWidth + scrollWidth > tableWidth) {
                    this.$refs.resizeBorder.style.left = options.borderLeft + 'px'
                }
            }
        },
        // dr
        handleDragStart (index) {
            this.showResizeBorder = false
            this.dragStartIndex = index
        },
        handleDragEnd () {
            this.showResizeBorder = false
            this.dragStartIndex = ''
        },
        handleDragOver (borderLeft) {
            this.showResizeBorder = true
            this.$refs.resizeBorder.style.left = borderLeft + 'px'
        },
        attrChange (beforeIndex, afterIndex) {
            let cloneColumns = this.cloneColumns
            let cacheObj = deepCopy(cloneColumns[beforeIndex])
            cloneColumns[beforeIndex].fixed = cloneColumns[afterIndex].fixed
            cloneColumns[beforeIndex]._index = cloneColumns[afterIndex]._index
            cloneColumns[afterIndex].fixed = cacheObj.fixed
            cloneColumns[afterIndex]._index = cacheObj._index
            cloneColumns[beforeIndex] = cloneColumns.splice(afterIndex, 1, cloneColumns[beforeIndex])[0]
        },
        handleDragDrop (index) {
            if (this.dragStartIndex === '') return
            this.attrChange(this.dragStartIndex, index)
        },
        getDragBorderHeight () {
            let style = {}
            let height = this.$el.getBoundingClientRect().height - getStyle(this.$refs.header, 'height').replace(/px/, '')
            if (this.showHorizontalScrollBar) {
                height = height - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0)
            }
            style.height = `${height}px`
            style.top = getStyle(this.$refs.header, 'height')
            return style
        },
        // ContextMenu
        handleContextMenu (event) {
            let tablePosition = this.$el.getBoundingClientRect()
            this.dynamicColumnBoxShow = true
            this.$refs.dynamic.$el.style.left = event.clientX - tablePosition.left + 'px'
            this.$refs.dynamic.$el.style.top = event.clientY - tablePosition.top + 'px'
        },
        showDynamicModal () {
            this.modalShow = true
        },
        dynamicSave () {
            this.cloneColumns = deepCopy(this.dynamicColumns)
        },
        getVisibleNum (isDynamicColumns = false) {
            let cloneColumns = isDynamicColumns ? this.dynamicColumns : this.cloneColumns
            return cloneColumns.filter((item) => (item._visible && !item.fixed)).length
        },
        dynamicOrder (index, status) {
            if (this.getVisibleNum(!this.dynamicable) < 2 && status) return
            let cloneColumns
            if (this.dynamicable) {
                cloneColumns = this.cloneColumns
            } else {
                cloneColumns = this.dynamicColumns
            }
            let isExistFixColumns = cloneColumns.filter((item) => (item.fixed)).length > 0
            this.$set(cloneColumns[index], '_visible', !status)
            if (isExistFixColumns) {
                let boxWidth = this.$el ? this.$el.offsetWidth : 0
                let tableWidth = this.getVisibleColumnsWidth(!this.dynamicable)
                let width = this.bodyHeight === 0 ? tableWidth : tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0)
                if (boxWidth && width - 1 < boxWidth) {
                    this.$set(cloneColumns[index], '_visible', status)
                    return
                }
            }
            // this.handleResize()
        }
    },
    created () {
        if (!this.context) this.currentContext = this.$parent
        this.showSlotHeader = this.$slots.header !== undefined
        this.showSlotFooter = this.$slots.footer !== undefined
        this.rebuildData = this.makeDataWithSortAndFilter()
    },
    mounted () {
        this.handleResize()
        this.dragBorderHeight = this.getDragBorderHeight()
        this.$nextTick(() => this.ready = true)

        on(window, 'resize', this.handleResize)
        this.observer = elementResizeDetectorMaker()
        this.observer.listenTo(this.$el, this.handleResize)

        this.$on('on-visible-change', (val) => {
            if (val) {
                this.handleResize()
            }
        })
        // If you don't click on the dynamicColumn, hide it.
        if (this.dynamicable) {
            const containsElement = (root, el) => {
                if (root.compareDocumentPosition) {
                    return root === el || !!(root.compareDocumentPosition(el) & 16)
                }
                if (root.contains && el.nodeType === 1) {
                    return root.contains(el) && root !== el
                }
                while ((el = el.parentNode)) {
                    if (el === root) return true
                }
                return false
            }
            const handleClick = (event) => {
                if (this.dynamicColumnBoxShow) {
                    if (!containsElement(this.$refs.dynamic.$el, event.target)) {
                        this.dynamicColumnBoxShow = false
                    }
                }
            }
            document.addEventListener('click', handleClick)
        }
    },
    beforeDestroy () {
        off(window, 'resize', this.handleResize)
        this.observer.removeListener(this.$el, this.handleResize)
    },
    watch: {
        data: {
            handler () {
                const oldDataLen = this.rebuildData.length
                this.objData = this.makeObjData()
                this.rebuildData = this.makeDataWithSortAndFilter()
                this.handleResize()
                if (!oldDataLen) {
                    this.fixedHeader()
                }
                // here will trigger before clickCurrentRow, so use async
                setTimeout(() => {
                    this.cloneData = deepCopy(this.data)
                }, 0)
            },
            deep: true
        },
        columns: {
            handler () {
                // todo 这里有性能问题，可能是左右固定计算属性影响的
                const colsWithId = this.makeColumnsId(this.columns)
                this.allColumns = getAllColumns(colsWithId)
                this.cloneColumns = this.makeColumns(colsWithId)

                this.columnRows = this.makeColumnRows(false, colsWithId)
                this.leftFixedColumnRows = this.makeColumnRows('left', colsWithId)
                this.rightFixedColumnRows = this.makeColumnRows('right', colsWithId)
                this.rebuildData = this.makeDataWithSortAndFilter()
                this.handleResize()
            },
            deep: true
        },
        cloneColumns: {
            handler () {
                if (this.dynamicallocation) {
                    this.dynamicColumns = deepCopy(this.cloneColumns)
                }
            },
            deep: true
        },
        height () {
            this.handleResize()
        },
        showHorizontalScrollBar () {
            this.dragBorderHeight = this.getDragBorderHeight()
            this.handleResize()
        },
        showVerticalScrollBar () {
            this.handleResize()
        }
    }
}
</script>
<style>
    .ivu-table-resize-border {
        position: absolute;
        z-index: 5;
        width: 1px;
        height: 100%;
        border-left: 1px dashed #dddee1;
        top: 0;
    }

    .ivu-table-dynamic-column {
        list-style: none;
        position: absolute;
        z-index: 5;
        top: 0;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 6px;
    }

    .ivu-table-dynamic-modal-column {
        list-style: none;
    }

    .ivu-table-dynamic-modal-column li {
        display: inline-block;
        padding: 10px 10px;
    }

    .ivu-table-dynamic-column-item {
        padding: 3px 10px;
    }

    .ivu-table-dynamic-icon {
        position: absolute;
        top: -30px;
        right: 0;
        font-size: 16px;
        cursor: pointer;
    }

    .ivu-table-draggable th {
        cursor: pointer;
    }
</style>