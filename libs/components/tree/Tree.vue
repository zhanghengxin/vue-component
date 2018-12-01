<template>

    <div
        :class="wrapCls"
    >
        <tree-node
            v-for="(item, index) in rootData"
            :key="index"
            :data="item"
            :checkbox="checkbox"
            :default-opt="defaultOpt"
        >
        </tree-node>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
import TreeNode from './Node.vue'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'tree'
export default {
    name: prefixCls,
    mixins: [Emitter],
    components: {
        TreeNode
    },
    data () {
        return {
            prefixCls: prefixCls,
            rootData: this.data,
            dataList: []
        }
    },
    watch: {
        data: {
            deep: true,
            handler () {
                this.rootData = this.data
                this.dataList = this.compileFlatState()
            }
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
        defaultOpt: {
            default () {
                return {
                    childrenKey: 'children',
                    nameKey: 'name',
                    disabledKey: 'disabled',
                    checkedKey: 'checked',
                    expandKey: 'expand',
                    selectedKey: 'selected'
                }
            }
        },
        checkbox: {
            type: Boolean,
            default: false
        },
        accordion: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.dataList = this.compileFlatState()
    },
    mounted () {
        this.$on('on-selected', this.handleSelect)
        this.$on('on-expand', this.handleExpand)
    },
    computed: {
        wrapCls () {
            return [
                `${prefixCls}`,
                {
                    [`${this.className}`]: !!this.className
                    // [`${prefixCls}-item-active`]: this.currentPage === 1
                }
            ]
        }
    },
    methods: {
        compileFlatState () { // so we have always a relation parent/children of each node
            let keyCounter = 0
            let childrenKey = this.defaultOpt.childrenKey
            const flatTree = []

            function flattenChildren (node, parent) {
                node.nodeKey = keyCounter++
                flatTree[node.nodeKey] = {node: node, nodeKey: node.nodeKey}
                if (typeof parent !== 'undefined') {
                    flatTree[node.nodeKey].parent = parent.nodeKey
                    flatTree[parent.nodeKey][childrenKey].push(node.nodeKey)
                }

                if (node[childrenKey]) {
                    flatTree[node.nodeKey][childrenKey] = []
                    node[childrenKey].forEach(child => flattenChildren(child, node))
                }
            }

            this.rootData.forEach(rootNode => {
                flattenChildren(rootNode)
            })
            return flatTree
        },
        handleSelect (nodeKey) {
            const selectedKey = this.defaultOpt.selectedKey
            const node = this.dataList[nodeKey].node
            const selectedIndex = this.dataList.findIndex(obj => obj.node.selected)
            if (selectedIndex >= 0 && selectedIndex !== nodeKey) this.$set(this.dataList[selectedIndex].node, selectedKey, false)
            this.$set(node, selectedKey, !node.selected)
            this.$emit('on-select-change', {data: node})
        },
        handleExpand (options) {
            const _this = this
            const expandKey = this.defaultOpt.expandKey
            if (this.accordion) {
                const parents = options.parents.map(item => {
                    return item.nodeKey
                })
                this.dataList.forEach((item, index) => {
                    if (parents.indexOf(index) < 0) {
                        _this.$set(_this.dataList[index].node, expandKey, false)
                    }
                })
            }
            this.$emit('on-expand-change', {data: options.data})
        }
    }
}
</script>

<style>

</style>
