<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styles">
        <colgroup>
            <col v-for="(column, index) in columns" :key="index" :width="setCellWidth(column)">
            <col v-if="$parent.verticalScroll" :width="$parent.scrollBarWidth"/>
        </colgroup>
        <thead>
        <tr>
            <th
                v-for="(item,index) in columns"
                :key="index"
                :class="alignCls(item)"
                :colspan="item.colSpan"
                :draggable="draggable"
                :rowspan="item.rowSpan"
                @dragstart.stop="handleDragStart($event,index)"
                @dragover.stop="handleDragOver($event)"
                @dragend.stop="handleEndDrop($event)"
                @drop.stop="handleDrop($event,index)"
                @mousemove="mousemoveHandler($event)"
                @mousedown="mousedownHandler($event,index)"
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
                        <span :class="{[preCls + '-cell-sort']: item.sortable}">{{ item.title || '#' }}</span>
                        <span :class="[preCls + '-sort']" v-if="item.sortable">
                            <Icon
                                :class="iconCls('asc',item)"
                                type="shangsanjiao"
                                @on-click="handleSort(item._index, 'asc')">
                            </Icon>
                            <Icon
                                :class="iconCls('desc',item)"
                                type="xiasanjiao"
                                @on-click="handleSort(item._index, 'desc')">
                            </Icon>
                        </span>
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
import Icon from '../icon/Icon'
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/assist'

export default {
    name: 'TableHead',
    mixins: [tableMixin, Emitter],
    components: {Checkbox, Icon},
    data () {
        return {
            isResizing: false
        }
    },
    props: {
        columns: Array,
        cloneColumns: Array,
        preCls: String,
        headerStyle: Object,
        data: Array,
        resizeable: Boolean,
        draggable: Boolean
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
        }
    },
    methods: {
        cellCls () {
            return [
                `${this.preCls}-cell`
            ]
        },
        iconCls (type, item) {
            return [
                `${this.preCls}-sort-${type}`,
                {
                    [`${this.preCls}-sort-active`]: item._sortType === type
                }
            ]
        },
        selectAll () {
            if (!this.data.length) return
            const status = !this.isSelectAll
            this.dispatch(this.preCls, 'selected-all-change', status)
        },
        handleSort (index, type) {
            this.dispatch(this.preCls, 'sort-change', {
                index: index,
                type: type
            })
        },
        mousemoveHandler (e) {
            if (!this.resizeable) {
                this.isResizing = false
                return false
            }
            const bodyStyle = document.body.style
            bodyStyle.cursor = ''
            let target = e.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }
            if (target) {
                let rect = target.getBoundingClientRect()
                if (rect.width > 12 && rect.right - e.pageX < 10) {
                    bodyStyle.cursor = 'col-resize'
                    this.isResizing = true
                    event.preventDefault()
                } else {
                    if (this.draggable) {
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
        mousedownHandler (e, index) {
            if (!this.isResizing) return
            this.isResizing = true
            const table = findComponentUpward(this, this.preCls).$el
            // document.onselectstart = function () { return false }
            document.ondragstart = () => { return false }
            let target = e.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }
            let startX = e.pageX
            let columns = this.columns
            let columnsWidth = columns[index]._width
            let x = table.getBoundingClientRect().left
            let tableWidth = table.getBoundingClientRect().width
            const handleMouseMove = (event) => {
                let borderLeft
                if (event.pageX + columnsWidth - 40 < startX) {
                    borderLeft = startX - columnsWidth + 40 - x
                } else if (event.pageX > tableWidth + x) {
                    borderLeft = tableWidth - 20
                } else {
                    borderLeft = event.pageX - x
                }
                document.body.style.cursor = 'col-resize'
                this.dispatch(this.preCls, 'mouse-drag', {
                    borderLeft: borderLeft,
                    isMouseUp: false
                })
            }
            const handleMouseDown = (event) => {
                event.preventDefault()
            }
            const handleMouseUp = (event) => {
                let deltaX = event.pageX - startX
                if (deltaX < 0 && -deltaX > columnsWidth - 40) {
                    deltaX = -(columnsWidth - 40)
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
            if (!this.draggable || this.isResizing) event.preventDefault()
            try {
                // setData is required for draggable to work in FireFox
                // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
                event.dataTransfer.setData('text/plain', '')
            } catch (e) {}
            this.dispatch(this.preCls, 'drag-start', this.columns[index]._index)
        },
        handleDragOver (event) {
            if (!this.draggable) return false
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
            event.preventDefault()
        },
        handleEndDrop () {
            if (!this.draggable) return false
            this.dispatch(this.preCls, 'drag-end', '')
        },
        handleDrop (event, index) {
            if (!this.draggable) return false
            this.dispatch(this.preCls, 'drag-drop', this.columns[index]._index)
        }
    }
}
</script>
