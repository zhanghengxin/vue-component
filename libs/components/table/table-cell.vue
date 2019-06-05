<template>
    <div :class="classes" :style="styles">
        <template v-if="renderType === 'html'"><span v-html="row[column.key]"></span></template>
        <template v-if="renderType === 'selection'">
            <Checkbox :value="checked"
                      @click.native.prevent="handleClick"
                      :disabled="disabled">
            </Checkbox>
        </template>
        <template v-if="renderType === 'index'">
            <span v-html="row._indexNo"></span>
        </template>
        <template v-if="renderType === 'normal'">
            <span :title="row[column.key]">{{row[column.key]}}</span>
        </template>
        <template v-if="renderType === 'expand'">
            <div @click="toggleExpand">
                <Icon :class="[preCls + '-expand-icon']" :type="iconType"></Icon>
            </div>
        </template>
        <Render
            v-if="renderType === 'render'"
            :row="row"
            :column="column"
            :index="index"
            :render="column.render"
        >
        </Render>
    </div>
</template>
<script>
import Checkbox from '../checkbox/Checkbox.vue'
import Icon from '../icon'
import Emitter from '../../mixins/emitter'
import Render from './render'

export default {
    name: 'TableCell',
    components: {Checkbox, Render, Icon},
    mixins: [Emitter],
    props: {
        preCls: String,
        row: Object,
        column: Object,
        index: Number,
        checked: Boolean,
        disabled: Boolean
    },
    computed: {
        classes () {
            return [
                `${this.preCls}-cell`,
                `${this.preCls}-cell-ellipsis`,
                {
                    [`${this.preCls}-cell-with-selection`]: this.column.type === 'selection'
                }
            ]
        },
        renderType () {
            let type = ''
            if (this.column.type === 'index') {
                type = 'index'
            } else if (this.column.type === 'selection') {
                type = 'selection'
            } else if (this.column.type === 'html') {
                type = 'html'
            } else if (this.column.render) {
                type = 'render'
            } else if (this.column.type === 'expand' && !this.row._disableExpand) {
                type = 'expand'
            } else {
                type = 'normal'
            }
            return type
        },
        styles () {
            const style = {}
            const width = parseInt(this.column._width - 1)
            style.width = `${width}px`
            return style
        },
        iconType () {
            let icon = 'jiahao'
            if (this.row._expanded) {
                icon = 'jianhao'
            }
            return icon
        }
    },
    methods: {
        handleClick () {
            if (this.disabled) return
            this.dispatch(this.preCls, 'selected-change', this.index)
        },
        toggleExpand () {
            this.dispatch(this.preCls, 'expand-change', this.index)
        }
    }
}
</script>
