<template>
    <Select @on-click="clickPopup"
            @on-clear="clearValues"
            @on-outside="closePopup"
            :multiple='showCheckbox'
            :label='label'
            :fixed='fixed'
            :tree-values="values"
            :default-opt="defaultOpt"
            clearable
            :width="width"
            style="position: relative"
            :label-width="labelWidth"
            @get-drop-width="getDropWidth"
            :options='options'>
        <transition name="slide" slot="tree">
            <Drop
                :placement='placement'
                v-show="popupVisible">
                <div :style="wrapSty">
                    <b-input
                        v-model='filterText'
                        ref="reference"
                        suffix="chaxun"
                        :placeholder="placeholder"
                        :width="dropWidth"
                        @on-enter="handleClick"
                        @on-click="handleClick"
                        v-if="filterable">
                    </b-input>
                    <Checkbox
                        v-if="showAllcheckbox"
                        :class="prefixCls+'-checkbox'"
                        :value="allCheckText!=='全选'"
                        :label="allCheckText"
                        @on-change="allCheckClick">
                    </Checkbox>
                    <Tree
                        :filter-text="treeFilterText"
                        :filter-method="filterMethod"
                        :data='data'
                        ref="tree"
                        :draggable='draggable'
                        :accordion='accordion'
                        :loading='loading'
                        :show-checkbox="showCheckbox"
                        :load-method="loadMethod"
                        :default-opt="defaultOpt"
                        :class-name="className"
                        :accordion-options="accordionOptions"
                        @on-check="handleCheck"
                        @on-select="handleSelect"
                        @on-expand="handleExpand"
                        :checkbox-options='checkboxOptions'>
                    </Tree>
                </div>
            </Drop>
        </transition>
    </Select>
</template>

<script>
import { prefix } from '../../utils/common'
import Tree from './Tree.vue'
import Drop from '../select/Dropdown'
import BInput from '../input'
import Select from '../select/Select'
import Checkbox from '../checkbox/Checkbox.vue'

const prefixCls = prefix + 'select-tree'
export default {
    name: prefixCls,
    components: {
        Tree, Drop, Select, BInput, Checkbox
    },
    data () {
        return {
            prefixCls: prefixCls,
            filterText: '',
            treeFilterText: '',
            allCheck: false,
            values: [],
            dropWidth: '',
            options: [],
            popupVisible: false
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
                    indeterminateKey: 'indeterminate',
                    idKey: 'id'
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
        clearable: {
            type: Boolean,
            default: false
        },
        loadMethod: {
            type: Function
        },
        filterMethod: {
            type: Function,
            default (value, data) {
                return data.name.indexOf(value) !== -1
            }
        },
        render: {
            type: [Function, Boolean],
            default: false
        },
        // labeltions
        filterable: {
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
        placeholder: {
            type: String,
            default: '输入关键字进行搜索'
        },
        labelWidth: {
            type: [String, Number],
            default: 72
        },
        width: {
            type: [String, Number],
            default: 200
        },
        autoFilter: { // open auto-filter
            type: Boolean,
            default: false
        },
        showAllcheck: {
            type: Boolean,
            default: false
        },
        placement: {
            type: String,
            default: 'bottom-start'
        }
    },
    watch: {
        data: {
            deep: true,
            handler () {
                this.$nextTick(() => {
                    this.getTreeValues()
                })
            }
        },
        filterText () {
            if (this.autoFilter) this.treeFilterText = this.filterText
        }
    },
    computed: {
        wrapSty () {
            return {
                width: this.dropWidth && `${this.dropWidth}px`
            }
        },
        allCheckText () {
            let status = true
            this.data.forEach((item) => {
                if (!item[this.defaultOpt.checkedKey]) status = false
            })
            return status ? '取消全选' : '全选'
        },
        showAllcheckbox () {
            let status = true
            this.data.forEach((item) => {
                if (item.invisible) status = false
            })
            return this.showAllcheck && this.showCheckbox && status
        }
    },
    mounted () {
        if (this.showCheckbox) this.getTreeValues()
    },
    methods: {
        clickPopup () {
            this.popupVisible = !this.popupVisible
        },
        closePopup () {
            this.popupVisible = false
        },
        allCheckClick (status) {
            let changes
            this.data.forEach((item) => {
                changes = {
                    checked: status,
                    nodeKey: item.nodeKey
                }
                this.$refs.tree.handleCheck(changes)
            })
            this.$emit('on-all-check', status)
        },
        handleCheck (options) {
            this.values = options.checkedNodes
            this.$emit('on-check', options)
        },
        handleClick (e, value) {
            if (!this.autoFilter) {
                this.treeFilterText = value
            }
        },
        handleSelect (options) {
            const {defaultOpt} = this
            this.values = [
                {
                    name: options.data[defaultOpt.nameKey],
                    id: options.data[defaultOpt.idKey]
                }
            ]
            this.$emit('on-select', options)
            this.popupVisible = false
        },
        handleExpand (options) {
            this.$emit('on-expand', options)
        },
        clearValues (item) {
            const {defaultOpt, data} = this
            if (item) {
                data.forEach((node) => {
                    this.downTraversal(node, {
                        isCheckedCancel: true,
                        id: item[defaultOpt.idKey]
                    })
                })
            } else {
                data.forEach((node) => {
                    this.downTraversal(node, {
                        isSelectCancel: true,
                        id: this.values[0].id
                    })
                })
                this.values = []
            }
        },
        getTreeValues () {
            this.values = this.showCheckbox ? this.$refs.tree.getCheckedNodes() : this.$refs.tree.getSelectedNodes()
        },
        downTraversal (node, options) {
            const {defaultOpt} = this
            const childrenKey = defaultOpt.childrenKey
            const selectedKey = defaultOpt.selectedKey
            const checkedKey = defaultOpt.checkedKey
            if (options && options.isSelectCancel) {
                if (node[defaultOpt.idKey] === options.id) this.$set(node, selectedKey, false)
            } else if (options && options.isCheckedCancel) {
                if (node[defaultOpt.checkedKey]) {
                    if (node[defaultOpt.idKey] === options.id) {
                        this.$set(node, checkedKey, false)
                        node.checked = false
                    }
                }
            }
            if (node[childrenKey]) {
                node[childrenKey].forEach(child => {
                    this.downTraversal(child, options)
                })
            }
        },
        getDropWidth (width) {
            this.dropWidth = width
        }
    }
}
</script>

<style scoped>

</style>
