<template>

    <div
        :class="wrapCls"
    >
        <tree-node
            v-for="(item, index) in rootData"
            :key="index"
            :data="item"
            :draggable="draggable"
            :show-checkbox="showCheckbox"
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
            dataList: [],
            dargState: {}

        }
    },
    watch: {
        data: {
            deep: true,
            handler () {
                this.rootData = this.data
                this.dataList = this.indexArrCreate()
                // TODO 当选中不级联父级元素且级联子元素的时候，无法区分是原数据动态变化和操作引起的数据变化，所以如果有此配置的话，需要手动触发一次formatTreeData方法
                if (!this.checkboxOptions.parent && this.checkboxOptions.children) return
                this.formatTreeData()
            }
        },
        filterText (value) {
            this.filterTreeData(value)
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
        filterText: {
            type: String,
            default: ''
        },
        loadMethod: {
            type: Function
        },
        filterMethod: {
            type: Function
        }
    },
    created () {
        this.dataList = this.indexArrCreate()
        this.formatTreeData()
    },
    mounted () {
        this.$on('on-selected-change', this.handleSelect)
        this.$on('on-expand-change', this.handleExpand)
        this.$on('on-check-change', this.handleCheck)
        this.$on('on-drag-start', this.handleDragStart)
        this.$on('on-drag-over', this.handleDragOver)
        this.$on('on-drag-end', this.handleDragEnd)
        this.$on('on-drag-drop', this.handleDrop)
    },
    computed: {
        wrapCls () {
            return [
                `${prefixCls}`,
                {
                    [`${this.className}`]: !!this.className
                }
            ]
        }
    },
    methods: {
        getCheckedNodes () {
            const checkedKey = this.defaultOpt.checkedKey
            return this.dataList.filter(obj => obj.node[checkedKey]).map(obj => obj.node)
        },
        getIndeterminateNodes () {
            const indeterminateKey = this.defaultOpt.indeterminateKey
            return this.dataList.filter(obj => (obj.node[indeterminateKey])).map(obj => obj.node)
        },
        // 原数据格式化
        formatTreeData () {
            let defaultOpt = this.defaultOpt
            let dataList = this.dataList
            const checkedNodes = this.getCheckedNodes()
            checkedNodes.forEach(node => {
                if (this.checkboxOptions.children) this.downTraversal(node, {[`${defaultOpt.checkedKey}`]: true})
                const parentKey = dataList[node.nodeKey].parent
                if (!parentKey && parentKey !== 0) return
                const parent = dataList[parentKey].node
                const childHasCheckSetter = typeof node[defaultOpt.checked] !== 'undefined' && node[defaultOpt.checked]
                if (childHasCheckSetter && parent[defaultOpt.checked] !== node[defaultOpt.checked]) {
                    if (this.checkboxOptions.parent) this.upwardTraversal(node.nodeKey)
                }
            })
        },
        // 建立索引数组
        indexArrCreate () {
            let keyCounter = 0
            let childrenKey = this.defaultOpt.childrenKey
            let indexArr = []

            function traversalChildren (node, parent, index) {
                node.nodeKey = keyCounter++
                indexArr[node.nodeKey] = {node: node, nodeKey: node.nodeKey}
                if (typeof parent !== 'undefined') {
                    indexArr[node.nodeKey].parent = parent.nodeKey
                    indexArr[parent.nodeKey][childrenKey].push(node.nodeKey)
                }
                if (typeof index !== 'undefined') {
                    indexArr[node.nodeKey].childrenIndex = index
                }
                if (node[childrenKey]) {
                    indexArr[node.nodeKey][childrenKey] = []
                    node[childrenKey].forEach((child, index) => traversalChildren(child, node, index))
                }
            }

            this.rootData.forEach(rootNode => {
                traversalChildren(rootNode)
            })
            return indexArr
        },
        // 向上遍历父级数据
        upwardTraversal (nodeKey) {
            let dataList = this.dataList
            const parentKey = dataList[nodeKey].parent
            if (typeof parentKey === 'undefined') return
            const node = dataList[nodeKey].node
            const parent = dataList[parentKey].node
            const defaultOpt = this.defaultOpt
            if (node[defaultOpt.checkedKey] === parent[defaultOpt.checkedKey] && node[defaultOpt.indeterminateKey] === parent[defaultOpt.indeterminateKey]) return // no need to update upwards
            if (node[defaultOpt.checkedKey] === true) {
                this.$set(parent, defaultOpt.checkedKey, parent[defaultOpt.childrenKey].every(node => node[defaultOpt.checkedKey]))
                this.$set(parent, defaultOpt.indeterminateKey, !parent[defaultOpt.checkedKey])
            } else {
                this.$set(parent, defaultOpt.checkedKey, false)
                this.$set(parent, defaultOpt.indeterminateKey, parent[defaultOpt.childrenKey].some(node => node[defaultOpt.checkedKey] || node[defaultOpt.indeterminateKey]))
            }
            this.upwardTraversal(parentKey)
        },
        // 向下遍历子孙级数据
        downTraversal (node, options) {
            const childrenKey = this.defaultOpt.childrenKey
            for (let key in options) {
                this.$set(node, key, options[key])
            }
            if (node[childrenKey]) {
                node[childrenKey].forEach(child => {
                    this.downTraversal(child, options)
                })
            }
        },
        // 单选

        handleSelect (nodeKey) {
            const selectedKey = this.defaultOpt.selectedKey
            const node = this.dataList[nodeKey].node
            const selectedIndex = this.dataList.findIndex(obj => obj.node.selected)
            if (selectedIndex >= 0 && selectedIndex !== nodeKey) this.$set(this.dataList[selectedIndex].node, selectedKey, false)
            this.$set(node, selectedKey, !node.selected)
            this.$emit('on-select', {data: node})
        },
        // 选中
        handleCheck ({checked, nodeKey}) {
            const defaultOpt = this.defaultOpt
            const node = this.dataList[nodeKey].node
            this.$set(node, defaultOpt.checkedKey, checked)
            this.$set(node, defaultOpt.indeterminateKey, false)
            if (this.checkboxOptions.parent) this.upwardTraversal(nodeKey)
            if (this.checkboxOptions.children) {
                this.downTraversal(node, {
                    [`${defaultOpt.checkedKey}`]: checked,
                    [`${defaultOpt.indeterminateKey}`]: false
                })
            }
            let options = {
                checkedNodes: this.getCheckedNodes(),
                indeterminateNodes: this.getIndeterminateNodes(),
                currentNode: node
            }
            options.checkedAndIndeterminateNodes = options.checkedNodes.concat(options.indeterminateNodes)
            this.$emit('on-check', options)
        },
        // 展开/关闭
        handleExpand (options) {
            const _this = this
            const expandKey = this.defaultOpt.expandKey
            const childrenKey = this.defaultOpt.childrenKey
            const node = options.data
            let dataList = this.dataList
            if (this.accordion) { // 是否开启手风琴
                if (!this.accordionOptions.isCache) { // 是否开启缓存
                    const parents = options.parents.map(item => {
                        return item.nodeKey
                    })
                    this.dataList.forEach((item, index) => {
                        if (parents.indexOf(index) < 0) {
                            _this.$set(dataList[index].node, expandKey, false)
                        }
                    })
                } else {
                    let parentKey = dataList[node.nodeKey].parent
                    if (parentKey !== undefined) {
                        let parent = dataList[parentKey].node
                        parent[childrenKey].forEach(function (item) {
                            if (item.nodeKey !== node.nodeKey) {
                                _this.$set(dataList[item.nodeKey].node, expandKey, false)
                            }
                        })
                    }
                }
            }
            this.$emit('on-expand', {data: node})
        },
        filterTreeData (value) {
            const defaultOpt = this.defaultOpt
            const _this = this
            const cascadeParent = function (data) {
                let allHidden = true
                const childNodes = data[defaultOpt.childrenKey] || []
                childNodes.forEach((child) => {
                    if (!child.invisible) allHidden = false
                })
                _this.$set(data, 'invisible', allHidden)
            }
            const traverseVisible = function (data) {
                const childNodes = data[defaultOpt.childrenKey] || []
                childNodes.forEach((child) => {
                    _this.$set(child, 'invisible', !_this.filterMethod(value, child))
                    traverseVisible(child)
                })
                if (data.invisible && childNodes.length) {
                    cascadeParent(data)
                }
            }
            this.rootData.forEach(rootNode => {
                traverseVisible(rootNode)
                cascadeParent(rootNode)
            })
        },
        handleDragStart (options) {
            let _this = options.treeNode
            try {
                // setData is required for draggable to work in FireFox
                // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
                options.event.dataTransfer.setData('text/plain', '')
            } catch (e) {}
            if ('draggable' in _this.data && !_this.data.draggable) {
                this.dargState.startNode = ''
                return
            }
            this.dargState.startNode = options.treeNode.data
        },
        handleDrop (options) {
            let childrenKey = this.defaultOpt.childrenKey
            let dataList = this.dataList
            let satrtNode = this.dargState.startNode
            if (!satrtNode) return
            let satrtKey = satrtNode.nodeKey
            let parentKey = dataList[satrtKey].parent
            let targetKey = options.treeNode.nodeKey
            let childrenIndex = dataList[satrtKey].childrenIndex

            // judge is children
            let isChildrens = false

            function isChildren (nodeKey, node) {
                if (nodeKey === node.nodeKey) {
                    isChildrens = true
                }
                if (node[childrenKey]) {
                    node[childrenKey].forEach(node => isChildren(nodeKey, node))
                }
            }

            isChildren(targetKey, satrtNode)
            if (parentKey === options.treeNode.nodeKey || isChildrens) return
            // add target
            if (options.treeNode.children) {
                let length = options.treeNode.children.length
                this.$set(options.treeNode.children, length, this.dargState.startNode)
            } else {
                this.$set(options.treeNode, 'children', [])
                this.$set(options.treeNode.children, 0, this.dargState.startNode)
            }
            // delete startNode
            if (childrenIndex !== undefined) {
                dataList[parentKey].node.children.splice(childrenIndex, 1)
            }
        }
    }
}
</script>
