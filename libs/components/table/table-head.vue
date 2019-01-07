<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styles">
        <colgroup>
            <col v-for="(column, index) in columns" :key="index" :width="setCellWidth(column)">
            <col v-if="$parent.horizontalScroll" :width="$parent.scrollBarWidth"/>
        </colgroup>
        <thead>
        <tr>
            <th
                v-for="(item,index) in columns"
                :key="index"
                :class="alignCls(item)"
                :colspan="item.colSpan"
                :rowspan="item.rowSpan">
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
            <th v-if="$parent.horizontalScroll" rowspan=1></th>
        </tr>
        </thead>
    </table>
</template>
<script>
import tableMixin from './tableMixin'
import Checkbox from '../checkbox/Checkbox.vue'
import Icon from '../icon/Icon'
import Emitter from '../../mixins/emitter'

export default {
    name: 'TableHead',
    mixins: [tableMixin, Emitter],
    components: {Checkbox, Icon},
    props: {
        columns: Array,
        preCls: String,
        headerStyle: Object,
        data: Array
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
        }
    }
}
</script>
