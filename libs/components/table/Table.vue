<template>
    <div
        :class="wrapCls" :style="styles" v-loading="loading" :loading-text="loadingText"
    >
        <div :class="tableCls">
            <div v-if="showHeader" :class="[preCls + '-header']" ref="header">
                <table-head
                    :columns="cloneColumns"
                    :column-rows="columnRows"
                    :header-style="headerStyle"
                    :pre-cls="preCls"
                    :data="formatData"
                    :resizeable="resizeable"
                    :dynamicable="dynamicable"
                    :draggable="draggable"
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
                :column-rows="columnRows"
                :dynamicable="dynamicable"
                :data="formatData"
                :show-header="showHeader"
                :fixed-column-rows="leftFixedColumnRows"
                :resizeable="resizeable"
                :columns="cloneColumns"
                :draggable="draggable"
                :fixed-columns="leftFixedColumns"
            >
            </table-fixed>
            <table-fixed
                v-if="rightFixedColumns.length"
                :bodyStyle="fixedBodyStyle"
                :pre-cls="preCls"
                ref="rightTable"
                :dynamicable="dynamicable"
                fixed="right"
                :fixed-column-rows="rightFixedColumnRows"
                :column-rows="columnRows"
                :columns="cloneColumns"
                :show-header="showHeader"
                :data="formatData"
                :draggable="draggable"
                :resizeable="resizeable"
                :fixed-columns="rightFixedColumns"
            >
            </table-fixed>
            <div
                :class="[preCls + '-fixed-right-header']"
                :style="fixedRightHeaderStyle"
                v-if="rightFixedColumns.length">
            </div>
        </div>
        <div
            :class="[preCls + '-resize-border']"
            v-show="showResizeBorder"
            :style="dragBorderHeight"
            ref="resizeBorder">
        </div>
        <dynamic-column
            :pre-cls="preCls"
            v-show="dynamicColumnBoxShow"
            :columns="normalColumns"
            ref="dynamic">
        </dynamic-column>
        <Icon
            v-if="dynamicallocation"
            :class="[preCls + '-dynamic-icon']"
            @click.native="showDynamicModal"
            type="shezhi">
        </Icon>
        <Modal
            v-model="modalShow"
            title="自定义列表"
            @on-ok="dynamicSave"
        >
            <ul :class="[preCls + '-dynamic-modal-column']">
                <li :class="[preCls + '-dynamic-modal-column-item']" v-for="(column,index) in normalColumns"
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
        <span :class="[preCls + '-right-border']"></span>
        <span :class="[preCls + '-bottom-border']"></span>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
import { deepCopy } from '../../utils/assist'
import { getStyle, getScrollBarSize, on, containsElement } from '../../utils/dom'
import tableHead from './table-head'
import tableBody from './table-body'
import tableFixed from './table-fixed'
import dynamicColumn from './dynamic-column'
import Icon from '../icon'
import Modal from '../modal'
import Checkbox from '../checkbox'
import Emitter from '../../mixins/emitter'
import { getRandomStr, convertToRows, getAllColumns } from './utils'

const preCls = prefix + 'table'
export default {
    name: preCls,
    mixins: [Emitter],
    components: {
        tableHead, tableBody, tableFixed, dynamicColumn, Icon, Modal, Checkbox
    },
    data () {
        return {
            preCls: preCls,
            formatData: [],
            cloneColumns: [],
            columnRows: [],
            leftFixedColumnRows: [],
            rightFixedColumnRows: [],
            tableWidth: 0,
            bodyHeight: 0,
            dragStartIndex: '',
            headerHeight: 0,
            dragBorderHeight: {
                height: '100%'
            },
            dynamicColumnBoxShow: false,
            horizontalScroll: false,
            verticalScroll: false,
            showResizeBorder: false,
            modalShow: false,
            dynamicColumns: [],
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
        resizeable: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        draggable: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: [Number, String],
            default: ''
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
        dynamicable: {
            type: Boolean,
            default: false
        },
        dynamicallocation: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        },
        showIndex: {
            type: Boolean,
            default: false
        },
        indexInfo: {
            type: Object,
            default () {
                return {
                    page: 1,
                    size: 10,
                    width: 50,
                    align: 'center',
                    fixed: '',
                    title: '序号'
                }
            }
        }
    },
    created () {
        const colsWithId = this.makeColumnsId(this.columns, this.showIndex)
        this.cloneColumns = this.buildColumns(colsWithId)
        this.columnRows = this.makeColumnRows(false, colsWithId)
        this.leftFixedColumnRows = this.makeColumnRows('left', colsWithId)
        this.rightFixedColumnRows = this.makeColumnRows('right', colsWithId)
        this.formatData = this.buildData()
        this.$on('selected-change', this.toggleSelect)
        this.$on('selected-all-change', this.selectAll)
        this.$on('sort-change', this.handleSort)
        this.$on('mouse-in', this.handleMouseIn)
        this.$on('mouse-out', this.handleMouseOut)
        this.$on('row-click', this.handleClick)
        this.$on('row-dbclick', this.handleDbclick)
        this.$on('mouse-drag', this.handleMouse)
        this.$on('drag-start', this.handleDragStart)
        this.$on('drag-over', this.handleDragOver)
        this.$on('drag-drop', this.handleDragDrop)
        this.$on('drag-end', this.handleDragEnd)
        this.$on('context-menu', this.handleContextMenu)
        this.$on('filiter-reset', this.handleFilterReset)
        this.$on('filiter-select', this.handleFilterSelect)
        this.$on('expand-change', this.handleExpand)
    },
    mounted () {
        this.handleResize()
        this.dragBorderHeight = this.getDragBorderHeight()
        on(window, 'resize', this.handleResize)
        // If you don't click on the dynamicColumn, hide it.
        const handleClick = (event) => {
            if (this.dynamicColumnBoxShow) {
                if (!containsElement(this.$refs.dynamic.$el, event.target)) {
                    this.dynamicColumnBoxShow = false
                }
            }
        }
        document.addEventListener('click', handleClick)
    },
    watch: {
        data: {
            handler () {
                this.formatData = this.buildData()
                this.handleResize()
            },
            deep: true
        },
        horizontalScroll () {
            this.dragBorderHeight = this.getDragBorderHeight()
        },
        columns: {
            handler () {
                const cols = this.makeColumnsId(this.columns, this.showIndex)
                this.cloneColumns = this.buildColumns(cols)
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
                    [`${preCls}-stripe`]: this.stripe,
                    [`${preCls}-draggable`]: this.draggable && !this.resizeable
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
            let boxWidth = this.$el ? this.$el.offsetWidth : 0
            let tableWidth = this.getVisibleColumnsWidth()
            if (tableWidth !== 0) {
                let width = ''
                width = tableWidth
                if (boxWidth && width - 1 < boxWidth) {
                    width = boxWidth - 1
                } else {
                    width += (this.verticalScroll ? this.scrollBarWidth : 0)
                }
                style.width = `${width}px`
            }
            return style
        },
        bodyStyle () {
            let style = {}
            let boxWidth = this.$el ? this.$el.offsetWidth : 0
            let tableWidth = this.getVisibleColumnsWidth()
            if (tableWidth !== 0) {
                let width = ''
                width = tableWidth
                if (boxWidth && width - 1 < boxWidth) {
                    width = boxWidth - 1 - (this.verticalScroll ? this.scrollBarWidth : 0)
                }
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
            return this.cloneColumns.filter((item) => (item.fixed && item.fixed === 'left' && item._visible))
        },
        rightFixedColumns () {
            return this.cloneColumns.filter((item) => (item.fixed && item.fixed === 'right' && item._visible))
        },
        fixedBodyStyle () {
            let style = {}
            if (this.bodyHeight !== 0) {
                let height = this.bodyHeight - (this.horizontalScroll ? this.scrollBarWidth : 0)
                style.height = `${height}px`
            }
            return style
        },
        fixedRightHeaderStyle () {
            let style = {}
            let width = 0
            let height = this.headerHeight + 1
            if (this.verticalScroll) {
                width = this.scrollBarWidth
            }
            style.width = `${width}px`
            style.height = `${height}px`
            return style
        },
        normalColumns () {
            // return this.cloneColumns.filter((cell) => (!cell.fixed))
            if (this.dynamicable) {
                return this.cloneColumns.filter((cell) => (!cell.fixed))
            } else {
                return this.dynamicColumns.filter((cell) => (!cell.fixed))
            }
        }
    },
    methods: {
        buildData () {
            let data = deepCopy(this.data)
            let pageStart = this.indexInfo.size * (this.indexInfo.page - 1)
            data.forEach((row, index) => {
                row._index = index
                row._indexNo = pageStart + index + 1
                if (!data._checked) {
                    data._checked = false
                }
            })
            return data
        },
        buildColumns (cols) {
            let columns = deepCopy(getAllColumns(cols))
            let indexArr = columns.filter((item) => (item.key === '_indexNo'))
            let fixLeftArr = columns.filter((item) => (item.fixed === 'left'))
            let fixRightArr = columns.filter((item) => (item.fixed === 'right'))
            let normalArr = columns.filter((item) => (!item.fixed && item.key !== '_indexNo'))
            let result = fixLeftArr.concat(indexArr, normalArr, fixRightArr)

            // Clumns in disorder
            columns.forEach((row, index) => {
                row._index = index
                row._sortType = row.sortType || ''
                row._visible = true
            })
            return result
        },
        getColumnsWidth () {
            return this.cloneColumns.map(cell => {
                return cell._width
            }).reduce((a, b) => a + b, 0)
        },
        getVisibleColumnsWidth (isDynamicColumns = false) {
            let cloneColumns = isDynamicColumns ? this.dynamicColumns : this.cloneColumns
            return cloneColumns.map(cell => {
                if (cell._visible) {
                    return cell._width
                } else {
                    return 0
                }
            }).reduce((a, b) => a + b, 0)
        },
        handleResize () {
            let noWidthList = []
            let hasWidthList = []
            let noMaxWidthColumns = []
            let sumMinWidth = 0
            let tableWidth = this.$el.offsetWidth - 1
            this.cloneColumns.forEach((item) => {
                if (item._visible) {
                    if (item.width) {
                        hasWidthList.push(item)
                    } else {
                        noWidthList.push(item)
                    }
                    if (item.minWidth) {
                        sumMinWidth += item.minWidth
                    } else if (!item.width && !item.maxWidth) {
                        noMaxWidthColumns.push(item)
                    }
                }
            })
            let columnWidth = 0
            // 固定宽度
            let fixedWidth = hasWidthList.map(cell => cell.width).reduce((a, b) => a + b, 0)
            let adaptiveWidth = tableWidth - fixedWidth - sumMinWidth - (this.verticalScroll ? this.scrollBarWidth : 0)
            let adaptiveLength = noWidthList.length
            // 可用宽度
            if (adaptiveWidth > 0 && adaptiveLength > 0) {
                columnWidth = parseInt(adaptiveWidth / adaptiveLength)
            }
            for (let i = 0; i < this.cloneColumns.length; i++) {
                let column = this.cloneColumns[i]
                let width = columnWidth + (column.minWidth ? column.minWidth : 0)
                if (column.width) {
                    width = column.width
                } else if (column._visible) {
                    if (column.minWidth > width) {
                        width = column.minWidth
                    }
                    if (column.maxWidth < width) {
                        width = column.maxWidth
                    }
                    if (adaptiveWidth > 0) {
                        adaptiveWidth -= width - (column.minWidth ? column.minWidth : 0)
                        adaptiveLength--
                        if (adaptiveLength > 0) {
                            columnWidth = parseInt(adaptiveWidth / adaptiveLength)
                        } else {
                            columnWidth = 0
                        }
                    } else {
                        columnWidth = 0
                    }
                }
                this.$set(column, '_width', width)
            }

            if (adaptiveWidth > 0) {
                adaptiveLength = noMaxWidthColumns.length
                columnWidth = parseInt(adaptiveWidth / adaptiveLength)
                for (let i = 0; i < noMaxWidthColumns.length; i++) {
                    const column = noMaxWidthColumns[i]
                    let width = column._width + columnWidth
                    if (adaptiveLength > 1) {
                        adaptiveLength--
                        adaptiveWidth -= columnWidth
                        columnWidth = parseInt(adaptiveWidth / adaptiveLength)
                    } else {
                        columnWidth = 0
                    }
                    column._width = width
                }
            }
            this.scrollReckon()
        },
        scrollReckon () {
            if (this.height) {
                this.$nextTick(() => {
                    const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0
                    this.headerHeight = headerHeight
                    this.bodyHeight = this.height - headerHeight
                    this.bodyScrollReckon()
                })
            } else {
                this.$nextTick(() => {
                    this.bodyHeight = 0
                    this.bodyScrollReckon()
                })
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
                this.horizontalScroll = bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.verticalScroll ? this.scrollBarWidth : 0) - 1
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
                this.$emit('on-select-all-cancel')
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
                key: this.cloneColumns[options.index].key,
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
            this.$emit('on-row-click', deepCopy(this.data[this.formatData[_index]._index]))
            if (!this.highlightRow) return
            this.handleCurrentRow(_index)
        },
        handleDbclick (_index) {
            this.$emit('on-row-dbclick', deepCopy(this.data[this.formatData[_index]._index]))
            if (!this.highlightRow) return
            this.handleCurrentRow(_index)
        },
        handleMouse (options) {
            let tableWidth = this.$el.offsetWidth
            let bodyWidth = this.$refs.body.$el.offsetWidth
            let scrollWidth = this.verticalScroll ? this.scrollBarWidth : 0
            if (options.isMouseUp) {
                let deltaX
                this.showResizeBorder = false
                // 拖拽后的宽度总宽度不能比表格的固定宽度小
                if (options.deltaX + bodyWidth + scrollWidth > tableWidth) {
                    deltaX = options.deltaX
                } else {
                    deltaX = tableWidth - bodyWidth - scrollWidth - 1
                }
                this.$set(this.cloneColumns[options.index], 'width', this.cloneColumns[options.index]._width + deltaX)
                this.handleResize()
            } else {
                this.showResizeBorder = true
                if (options.deltaX + bodyWidth + scrollWidth > tableWidth) {
                    this.$refs.resizeBorder.style.left = options.borderLeft + 'px'
                }
            }
        },
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
            let headerHeight = this.$refs.header ? getStyle(this.$refs.header, 'height').replace(/px/, '') : 0
            let height = this.$el.getBoundingClientRect().height - headerHeight
            if (this.horizontalScroll) {
                height = height - (this.horizontalScroll ? this.scrollBarWidth : 0)
            }
            style.height = `${height}px`
            style.top = getStyle(this.$refs.header, 'height')
            return style
        },
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
                }
            }
        },
        // 过滤数据
        // 还原全部数据
        handleFilterReset (_index) {
            const index = _index
            this.$set(this.cloneColumns[index], '_filterChecked', [])
            let filterData = this.buildData()
            this.formatData = filterData
            this.$emit('on-filter-change', this.cloneColumns[index])
        },
        handleFilterSelect (option) {
            this.$set(this.cloneColumns[option.index], '_filterChecked', [option.value])
            this.handleFilter(option.index)
        },
        handleFilter (index) {
            const column = this.cloneColumns[index]
            let filterData = this.buildData()
            this.formatData = this.filterData(filterData, column)
            this.$emit('on-filter-change', column)
        },
        filterData (data, column) {
            return data.filter((row) => {
                let status = !column._filterChecked.length
                for (let i = 0; i < column._filterChecked.length; i++) {
                    status = column.filterMethod(column._filterChecked[i], row)
                    if (status) break
                }
                return status
            })
        },
        handleExpand (_index) {
            let {formatData} = this
            const status = !formatData[_index]._expanded
            this.$set(formatData[_index], '_expanded', status)
            this.$emit('on-expand', deepCopy(this.data[_index]), status)
            // if (this.height) {
            //     this.$nextTick(() => this.bodyScrollReckon())
            // }
        },
        // 多级表头 start
        // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
        makeColumnsId (columns, showIndex = false) {
            if (showIndex && columns.filter((item) => (item.key === '_indexNo')).length < 1) {
                let indexArr = []
                indexArr.push({
                    title: this.indexInfo.title,
                    key: '_indexNo',
                    width: this.indexInfo.width,
                    align: this.indexInfo.align,
                    fixed: this.indexInfo.fixed
                })
                columns = columns.concat(indexArr)
            }
            return columns.map(item => {
                if ('children' in item) this.makeColumnsId(item.children)
                item.__id = getRandomStr(8)
                return item
            })
        },
        // create a multiple table-head
        makeColumnRows (fixedType, cols) {
            return convertToRows(cols, fixedType)
        }
    }
}
</script>
