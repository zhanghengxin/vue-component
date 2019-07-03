<template>
    <Select @on-click="clickPopup"
            @on-clear="clearValues"
            @on-outside="closePopup"
            :multiple='showCheckbox'
            :label='label'
            :fixed='fixed'
            :disabled='disabled'
            :tree-values="values"
            :default-opt="defaultOpt"
            :clearable="clearable"
            :width="width"
            :label-width="labelWidth"
            @get-drop-width="getDropWidth"
            :options='options'>
        <transition name="slide" slot="tree">
            <Drop
                    :placement='placement'
                    v-show="popupVisible"
                    :class='dropTransferCls'
                    ref="dropdown"
                    :data-transfer="transfer"
                    :transfer="transfer"
                    v-transfer-dom>
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
                            :default-checked-values="defaultValues"
                            :draggable='draggable'
                            :accordion='accordion'
                            @data-change="dateChange"
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
    import { prefix, propsInit } from '../../utils/common'
    import Tree from './Tree.vue'
    import Drop from '../select/Dropdown'
    import BInput from '../input'
    import Select from '../select/Select'
    import clickoutside from '../../utils/directives/clickOutside'
    import TransferDom from '../../utils/directives/transfer-dom'
    import Checkbox from '../checkbox/Checkbox.vue'

    const prefixCls = prefix + 'select-tree'
    export default {
        name: prefixCls,
        directives: {clickoutside, TransferDom},
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
                allCheckText: '',
                showAllcheckbox: false,
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
            defaultValues: {
                type: Array,
                default () {
                    return []
                }
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
            placeholder: {
                type: String,
                default: '输入关键字进行搜索'
            },
            // props type为Boolean的配置
            ...propsInit({
                props: ['showCheckbox', 'showAllcheck', 'autoFilter', 'fixed', 'filterable', 'draggable', 'loading', 'accordion', 'transfer', 'disabled'],
                config: {
                    type: Boolean,
                    default: false
                }
            }),
            clearable: {
                type: Boolean,
                default: true
            },
            // props type为[Number, String]的配置
            ...propsInit({
                // label label样式的文字描述
                // width input的宽度
                // labelWidth label样式的文字的宽度
                props: ['label', 'width', 'labelWidth'],
                config: {
                    type: [Number, String]
                }
            }),
            placement: {
                type: String,
                default: 'bottom-start'
            }
        },
        watch: {
            data: {
                deep: true,
                handler () {
                    this.getTreeValues()
                }
            },
            filterText () {
                if (this.autoFilter) this.treeFilterText = this.filterText
            },
            defaultValues: {
                deep: true,
                handler () {
                    this.getTreeValues()
                }
            }
        },
        computed: {
            wrapSty () {
                return {
                    width: this.dropWidth && `${this.dropWidth}px`
                }
            },
            dropTransferCls () {
                return {
                    [prefix + 'drop-transfer']: this.transfer
                }
            }
        },
        mounted () {
            this.getTreeValues()
            this.dateChange(this.data)
        },
        methods: {
            dateChange (data) {
                let status = true
                data.forEach((item) => {
                    if (!item[this.defaultOpt.checkedKey]) status = false
                })
                this.allCheckText = status ? '取消全选' : '全选'
                let showStatus = true
                data.forEach((item) => {
                    if (item.invisible) showStatus = false
                })
                this.showAllcheckbox = this.showAllcheck && this.showCheckbox && showStatus
            },
            clickPopup () {
                this.popupVisible = !this.popupVisible
            },
            closePopup () {
                if (this.transfer) {
                    const {$el} = this.$refs.dropdown
                    if ($el === event.target || $el.contains(event.target)) {
                        return
                    }
                }
                this.popupVisible = false
            },
            allCheckClick (status) {
                this.$refs.tree.allCheckedData(status)
                this.$emit('on-all-check', status)
                this.getTreeValues()
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
                this.values = [options.data]
                this.$emit('on-select', options)
                this.popupVisible = false
            },
            handleExpand (options) {
                this.$emit('on-expand', options)
            },
            clearValues (data) {
                if (data === 'select' || data === 'checked') {
                    this.$refs.tree.allCheckedData(false, data)
                    this.values = []
                    this.$emit('on-clear')
                } else {
                    this.$refs.tree.handleCheck({checked: false, nodeKey: data.nodeKey})
                }
            },
            getTreeValues () {
                this.$nextTick(() => {
                    if (this.$refs.tree) {
                        this.values = this.showCheckbox ? this.$refs.tree.getCheckedNodes() : this.$refs.tree.getSelectedNodes()
                    }
                })
            },
            getDropWidth (width) {
                this.dropWidth = width
            }
        }
    }
</script>

<style scoped>

</style>
