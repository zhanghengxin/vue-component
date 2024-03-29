<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styles">
        <colgroup>
            <col v-for="(column, index) in visibleColumns" :key="index" :width="setCellWidth(column)">
            <col v-if="$parent.verticalScroll" :width="$parent.scrollBarWidth"/>
        </colgroup>
        <thead>
        <tr v-for="(columns, rowIndex) in groupRows" :key="rowIndex">
            <th
                v-for="(item,index) in columns"
                :key="index"
                :class="alignCls(item)"
                :colspan="item.colSpan"
                :rowspan="item.rowSpan"
                :draggable="draggable"
                @dragstart.stop="handleDragStart($event,index)"
                @dragover.stop="handleDragOver($event)"
                @dragend.stop="handleEndDrop($event)"
                @drop.stop="handleDrop($event,index)"
                @mousemove="mousemoveHandler($event,rowIndex,index)"
                @mousedown="mousedownHandler($event,rowIndex,index)"
                @mouseleave="mouseleaveHandler"
            >
                <div :class="cellCls(item)">
                    <template v-if="item.type === 'selection'">
                        <Checkbox
                            :value="isSelectAll"
                            :disabled="!data.length"
                            @click.native.prevent="selectAll"
                        >
                        </Checkbox>
                    </template>
                    <template v-else>
                        <span :class="{[preCls + '-cell-sort']: item.sortable}">{{ item.title }}</span>
                        <span :class="[preCls + '-sort']" v-if="item.sortable">
                            <Icon
                                :class="iconCls('asc',index,rowIndex)"
                                type="shangsanjiao"
                                @on-click="handleSort(rowIndex,index, 'asc')">
                            </Icon>
                            <Icon
                                :class="iconCls('desc',index,rowIndex)"
                                type="xiasanjiao"
                                @on-click="handleSort(rowIndex,index, 'desc')">
                            </Icon>
                        </span>
                        <Poptip
                            v-if="isPopperShow(item)"
                            :class="[preCls + '-poptip']"
                            v-model="getColumn(rowIndex, index)._filterVisible"
                            placement="bottom">
                            <span :class="[preCls + '-filter']">
                                <Icon type="shaixuan"></Icon>
                            </span>
                            <div slot="content" :class="[preCls + '-filter-list']"
                                 v-if="getColumn(rowIndex, index)._filterMultiple">
                                <div :class="[preCls + '-filter-list-item']">
                                    <checkbox-group v-model="getColumn(rowIndex, index)._filterChecked">
                                        <checkbox v-for="(filter, index) in item.filters" :key="index"
                                                  :label="filter.value">{{ filter.label }}
                                        </checkbox>
                                    </checkbox-group>
                                </div>
                                <div :class="[preCls + '-filter-footer']">
                                    <Button
                                        size="small"
                                        :disabled="!getColumn(rowIndex, index)._filterChecked.length"
                                        @on-click="handleFilter(getColumn(rowIndex, index)._index)">
                                        筛选
                                    </Button>
                                    <Button
                                        size="small"
                                        @on-click="filterReset(getColumn(rowIndex, index)._index)">
                                        重置
                                    </Button>
                                </div>
                            </div>
                            <div slot="content" :class="[preCls + '-filter-list']" v-else>
                                <ul :class="[preCls + '-filter-list-single']">
                                    <li
                                        :class="itemAllClasses(getColumn(rowIndex, index))"
                                        @click="filterReset(getColumn(rowIndex, index)._index)">全部
                                    </li>
                                    <li
                                        :class="itemClasses(getColumn(rowIndex, index),filter)"
                                        v-for="(filter,key) in item.filters"
                                        @click="filterSelect(getColumn(rowIndex, index)._index, filter.value)"
                                        :key="key">{{ filter.label }}
                                    </li>
                                </ul>
                            </div>
                        </Poptip>
                    </template>
                </div>
            </th>
            <th v-if="$parent.verticalScroll" rowspan=1></th>
        </tr>
        </thead>
    </table>
</template>
<script>
import tableMixin from './tableMixin'
import Checkbox from '../checkbox/Checkbox.vue'
import Button from '../button/Button.vue'
import Poptip from '../poptip/Poptip.vue'
import Icon from '../icon/Icon'
import CheckboxGroup from '../checkbox-group'
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/assist'
import { preventDefault } from '../../utils/compatible'

export default {
    name: 'TableHead',
    mixins: [tableMixin, Emitter],
    components: {Checkbox, Icon, Poptip, CheckboxGroup, Button},
    data () {
        return {
            isResizing: false,
            visibleColumns: this.columns.filter((item) => item._visible)
        }
    },
    props: {
        columns: Array,
        columnRows: Array,
        cloneColumns: Array,
        fixedColumnRows: Array,
        fixed: String,
        preCls: String,
        headerStyle: {
            type: Object,
            default () {
                return {}
            }
        },
        data: Array,
        resizeable: Boolean,
        dynamicable: Boolean,
        draggable: Boolean
    },
    watch: {
        columns: {
            handler () {
                this.visibleColumns = this.columns.filter((item) => item._visible)
            },
            deep: true
        }
    },
    computed: {
        styles () {
            const style = Object.assign({}, this.headerStyle)
            const width = parseInt(this.headerStyle.width)
            style.width = `${width}px`
            return style
        },
        isSelectAll () {
            let status = true
            if (!this.data.length) status = false
            if (!this.data.find(item => !item._disabled)) status = false
            for (let i = 0; i < this.data.length; i++) {
                if (!this.data[i]._checked && !this.data[i]._disabled) {
                    status = false
                    break
                }
            }
            return status
        },
        groupRows () {
            if (this.isGroup) {
                return this.fixed ? this.fixedColumnRows : this.columnRows
            } else {
                return [this.visibleColumns]
            }
        },
        isGroup () {
            return this.columnRows && this.columnRows.length > 1
        }
    },
    methods: {
        // 因为表头嵌套不是深拷贝，所以没有 _ 开头的方法，在 isGroup 下用此列
        getColumn (rowIndex, index) {
            const isGroup = this.columnRows.length > 1

            if (isGroup) {
                const id = this.groupRows[rowIndex][index].__id
                return this.columns.filter(item => item.__id === id)[0]
            } else {
                return this.groupRows[rowIndex][index]
            }
        },
        cellCls () {
            return [
                `${this.preCls}-cell`
            ]
        },
        iconCls (type, index, rowIndex) {
            let item = this.getColumn(rowIndex, index)
            return [
                `${this.preCls}-sort-${type}`,
                {
                    [`${this.preCls}-sort-active`]: item && item._sortType === type
                }
            ]
        },
        selectAll () {
            if (!this.data.length) return
            const status = !this.isSelectAll
            this.dispatch(this.preCls, 'selected-all-change', status)
        },
        handleSort (rowIndex, index, type) {
            this.dispatch(this.preCls, 'sort-change', {
                index: this.getColumn(rowIndex, index)._index,
                type: type
            })
        },
        mousemoveHandler (e, rowIndex, index) {
            if (!this.resizeable) {
                this.isResizing = false
                return false
            }
            const bodyStyle = document.body.style
            let target = e.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }
            if (target) {
                let rect = target.getBoundingClientRect()
                if (rect.width > 12 && rect.right - e.pageX < 10 && this.getColumn(rowIndex, index)) {
                    bodyStyle.cursor = 'col-resize'
                    this.isResizing = true
                    preventDefault(event)
                } else {
                    if (this.draggable && this.columnRows.length < 2) {
                        bodyStyle.cursor = 'pointer'
                    } else {
                        bodyStyle.cursor = ''
                    }
                    this.isResizing = false
                }
            } else {
                bodyStyle.cursor = ''
                this.isResizing = false
            }
        },
        mouseleaveHandler () {
            document.body.style.cursor = ''
        },
        mousedownHandler (e, rowindex, _index) {
            if (this.dynamicable) this.rightClick(e)
            if (!this.isResizing) return
            this.isResizing = true
            if (!this.getColumn(rowindex, _index)) return
            let index = this.isGroup ? this.getColumn(rowindex, _index)._index : _index
            const table = findComponentUpward(this, this.preCls).$el
            const cellMinWidth = 80
            // document.onselectstart = function () { return false }
            document.ondragstart = () => { return false }
            let target = e.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }
            let startX = e.pageX
            let columns = this.fixed ? this.cloneColumns : this.visibleColumns
            // let columns = this.fixed ? this.cloneColumns : this.columns
            let columnsWidth = columns[index]._width
            let x = table.getBoundingClientRect().left
            let tableWidth = table.getBoundingClientRect().width
            const handleMouseMove = (event) => {
                let borderLeft
                if (event.pageX + columnsWidth - cellMinWidth < startX) {
                    borderLeft = startX - columnsWidth + cellMinWidth - x
                } else if (event.pageX > tableWidth + x) {
                    borderLeft = tableWidth - 1
                } else {
                    borderLeft = event.pageX - x
                }
                let deltaX = event.pageX - startX
                if (deltaX < 0 && -deltaX > columnsWidth - cellMinWidth) {
                    deltaX = -(columnsWidth - cellMinWidth)
                }
                document.body.style.cursor = 'col-resize'
                this.dispatch(this.preCls, 'mouse-drag', {
                    borderLeft: borderLeft,
                    deltaX: deltaX,
                    isMouseUp: false
                })
            }
            const handleMouseDown = (event) => {
                preventDefault(event)
            }
            const handleMouseUp = (event) => {
                let deltaX = event.pageX - startX
                if (deltaX < 0 && -deltaX > columnsWidth - cellMinWidth) {
                    deltaX = -(columnsWidth - cellMinWidth)
                }
                document.body.style.cursor = ''
                this.dispatch(this.preCls, 'mouse-drag', {
                    isMouseUp: true,
                    deltaX: deltaX,
                    index: columns[index]._index
                })
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
                document.removeEventListener('mousedown', handleMouseDown)
            }
            document.addEventListener('mousedown', handleMouseDown)
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        },
        handleDragStart (event, index) {
            if (!this.draggable || this.isResizing || this.columnRows.length > 1) preventDefault(event)
            try {
                // setData is required for draggable to work in FireFox
                // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
                event.dataTransfer.setData('text/plain', '')
            } catch (e) {}
            this.dispatch(this.preCls, 'drag-start', this.visibleColumns[index]._index)
        },
        handleDragOver (event) {
            if (!this.draggable || this.columnRows.length > 1) return false
            const table = findComponentUpward(this, this.preCls).$el
            const tableLeft = table.getBoundingClientRect().left
            const tableWidth = table.getBoundingClientRect().width
            let borderLeft
            if (event.pageX < tableLeft) {
                borderLeft = 0
            } else if (event.pageX - tableLeft > tableWidth) {
                borderLeft = tableWidth
            } else {
                borderLeft = event.pageX - tableLeft
            }
            this.dispatch(this.preCls, 'drag-over', borderLeft)
            preventDefault(event)
        },
        handleEndDrop () {
            if (!this.draggable || this.columnRows.length > 1) return false
            this.dispatch(this.preCls, 'drag-end', '')
        },
        handleDrop (event, index) {
            if (!this.draggable || this.columnRows.length > 1) return false
            this.dispatch(this.preCls, 'drag-drop', this.visibleColumns[index]._index)
        },
        rightClick (event) {
            if (event.button === 2 && !this.isGroup) {
                const oncontextmenu = (event) => {
                    preventDefault(event)
                    document.removeEventListener('contextmenu', oncontextmenu)
                }
                document.addEventListener('contextmenu', oncontextmenu)
                this.dispatch(this.preCls, 'context-menu', event)
            }
        },
        itemClasses (column, item) {
            return [
                `${this.preCls}-filter-select-item`,
                {
                    [`${this.preCls}-filter-select-item-selected`]: column._filterChecked && column._filterChecked[0] === item.value
                }
            ]
        },
        itemAllClasses (column) {
            return [
                `${this.preCls}-filter-select-item`,
                {
                    [`${this.preCls}-filter-select-item-selected`]: !column._filterChecked || !column._filterChecked.length
                }
            ]
        },
        filterReset (index) {
            this.dispatch(this.preCls, 'filiter-reset', index)
        },
        handleFilter (index) {
            this.dispatch(this.preCls, 'filiter-check', index)
        },
        filterSelect (index, value) {
            this.dispatch(this.preCls, 'filiter-select', {
                index: index,
                value: value
            })
        }
    }
}
</script>
