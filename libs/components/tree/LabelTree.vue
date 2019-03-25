<template>
    <Select v-clickoutside="closePopup"
            @on-click="clickPopup"
            @on-clear="clearValues"
            :multiple='showCheckbox'
            :label='label'
            :fixed='fixed'
            :tree-values="values"
            :default-opt="defaultOpt"
            clearable
            :width="width"
            :label-width="labelWidth"
            placeholder=""
            @get-drop-width="getDropWidth"
            :options='options'>
        <transition name="slide">
            <Drop
                :placement='placement'
                v-show="popupVisible">
                <div :class="wrapCls" :style="wrapSty">
                    <b-input
                        v-model='filterText'
                        ref="reference"
                        prefix
                        :width="dropWidth"
                        clearable
                        v-if="filter"
                        icon="chaxun">
                    </b-input>
                    <Tree
                        :filter-text="filterText"
                        :filter-method="filterMethod"
                        :data='data'
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
import clickoutside from '../../utils/directives/clickOutside'

const prefixCls = prefix + 'label-tree'
export default {
    name: prefixCls,
    directives: {clickoutside},
    components: {
        Tree, Drop, Select, BInput
    },
    data () {
        return {
            prefixCls: prefixCls,
            filterText: '',
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
        filter: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: [String, Number],
            default: 72
        },
        width: {
            type: [String, Number],
            default: 200
        },
        fixed: {
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
                if (this.showCheckbox) {
                    this.$nextTick(() => {
                        this.getTreeValues()
                    })
                }
            }
        }
    },
    computed: {
        wrapCls () {
            return prefixCls
        },
        wrapSty () {
            return {
                width: this.dropWidth && `${this.dropWidth}px`
            }
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
        handleCheck (options) {
            this.values = options.checkedNodes
            this.$emit('on-check', options)
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
            this.values = []
            this.data.forEach((item) => {
                this.downTraversal(item)
            })
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
            } else {
                if (this.showCheckbox) {
                    if (node[checkedKey]) {
                        this.values.push({
                            name: node[defaultOpt.nameKey],
                            id: node[defaultOpt.idKey]
                        })
                    }
                } else {
                    if (node[selectedKey]) {
                        this.values.push({
                            name: node[defaultOpt.nameKey],
                            id: node[defaultOpt.idKey]
                        })
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
