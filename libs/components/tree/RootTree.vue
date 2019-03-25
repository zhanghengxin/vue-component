<template>
    <Tree
        v-if="!label"
        :filter-text="filterText"
        :filter-method="filterMethod"
        :data='data'
        :draggable='draggable'
        :accordion='accordion'
        :class-Name='className'
        :loading='loading'
        :render='treeRender'
        :show-checkbox="showCheckbox"
        :load-method="loadMethod"
        :default-opt="defaultOpt"
        :accordion-options="accordionOptions"
        @on-check="handleCheck"
        @on-select="handleSelect"
        @on-expand="handleExpand"
        :checkbox-options='checkboxOptions'>
    </Tree>
    <LabelTree
        v-else
        :filter-text="filterText"
        :filter-method="filterMethod"
        :data='data'
        :draggable='draggable'
        :accordion='accordion'
        :class-Name='className'
        :show-checkbox="showCheckbox"
        :loading='loading'
        :load-method="loadMethod"
        :default-opt="defaultOpt"
        :filter="filter"
        :label="label"
        :fixed="fixed"
        :width="width"
        :label-width="labelWidth"
        :accordion-options="accordionOptions"
        @on-check="handleCheck"
        @on-select="handleSelect"
        @on-expand="handleExpand"
        :checkbox-options='checkboxOptions'>
    </LabelTree>
</template>
<script>
import { prefix } from '../../utils/common'
import Tree from './Tree.vue'
import LabelTree from './LabelTree.vue'

const prefixCls = prefix + 'tree'
export default {
    name: prefixCls,
    components: {
        Tree, LabelTree
    },
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        className: {
            type: String
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        defaultOpt: {
            type: Object,
            default () {
                return {
                    childrenKey: 'children',
                    nameKey: 'name',
                    disabledKey: 'disabled',
                    checkedKey: 'checked',
                    expandKey: 'expand',
                    selectedKey: 'selected',
                    idKey: 'id',
                    indeterminateKey: 'indeterminate'
                }
            }
        },
        accordion: {
            type: Boolean,
            default: false
        },
        checkboxOptions: { // 多选级联配置
            type: Object,
            default () {
                return {
                    parent: true, // 是否影响父级节点
                    children: true // 是否影响子级节点
                }
            }
        },
        accordionOptions: {
            type: Object,
            default () {
                return {
                    isCache: true // 是否缓存其他同级节点的展开状态
                }
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: false
        },
        filterMethod: {
            type: Function,
            default (value, data) {
                return data.name.indexOf(value) !== -1
            }
        },
        loadMethod: {
            type: Function
        },
        filterText: {
            type: [String, Number]
        },
        render: {
            type: [Function, Boolean],
            default: false
        },
        // labeltions
        multiple: {
            type: Boolean,
            default: false
        },
        filter: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        fixed: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: 200
        },
        labelWidth: {
            type: [String, Number],
            default: 72
        }
    },
    methods: {
        clickPopup () {
            this.popupVisible = !this.popupVisible
        },
        closePopup () {
            this.popupVisible = false
        },
        handleCheck (options) {
            this.$emit('on-check', options)
        },
        handleSelect (options) {
            this.$emit('on-select', options)
        },
        handleExpand (options) {
            this.$emit('on-expand', options)
        }
    },
    computed: {
        treeRender () {
            return this.render
        }
    }
}
</script>

<style scoped>

</style>
