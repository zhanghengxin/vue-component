<template>
    <div :class="classes">
        <template v-if="renderType === 'html'"><span v-html="row[column.key]"></span></template>
        <template v-if="renderType === 'selection'">
            <Checkbox :value="checked"
                      @click.native.prevent="handleClick"
                      :disabled="disabled">
            </Checkbox>
        </template>
        <template v-if="renderType === 'normal'">
            <span>{{row[column.key]}}</span>
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
import Emitter from '../../mixins/emitter'
import Render from './render'

export default {
    name: 'TableCell',
    components: {Checkbox, Render},
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
            } else {
                type = 'normal'
            }
            return type
        }
    },
    methods: {
        handleClick () {
            if (this.disabled) return
            this.dispatch(this.preCls, 'selected-change', this.index)
        }
    }
}
</script>
