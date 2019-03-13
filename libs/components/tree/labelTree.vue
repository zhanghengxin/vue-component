<template>
    <div v-clickoutside="closePopup">
        <b-input
            ref="reference"
            suffix
            clearable
            readonly
            icon="rili"
            @on-focus="showPopup">
        </b-input>
        <transition name="slide">
            <Drop
                v-show="popupVisible">
                <div>
                    <b-input
                        v-model='filterText'
                        ref="reference"
                        prefix
                        clearable
                        icon="chaxun"
                        @on-focus="showPopup">
                    </b-input>
                    <Tree
                        :filter-text="filterText"
                        :data='data'
                        :show-checkbox="showCheckbox"
                        :checkboxOptions='checkboxOptions'>
                    </Tree>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
import Tree from './Tree.vue'
import Drop from '../select/Dropdown'
import clickoutside from '../../utils/directives/clickOutside'

const prefixCls = prefix + 'label-tree'
export default {
    name: prefixCls,
    directives: {clickoutside},
    components: {
        Tree, Drop
    },
    data () {
        return {
            prefixCls: prefixCls,
            filterText: '',
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
            type: Function
        },
        size: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showPopup () {
            this.popupVisible = true
        },
        closePopup () {
            this.popupVisible = false
        }
    }
}
</script>

<style scoped>

</style>
