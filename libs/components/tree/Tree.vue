<template>

    <div
        :class="wrapCls"
    >
        <tree-node
            v-for="(item, index) in rootData"
            :key="index"
            :data="item"
            :class-name="className"
            :draggable="draggable"
            :auto-scroll="autoScroll"
            :show-checkbox="showCheckbox"
            :checkbox-options="checkboxOptions"
            :default-opt="defaultOpt"
        >
        </tree-node>
        <transition name="fade">
            <div v-show="showTip" :class="[prefixCls + '-tip']">暂无数据</div>
        </transition>
    </div>
</template>

<script>
import { prefix, propsInit } from '../../utils/common'
import TreeNode from './Node.vue'
import Emitter from '../../mixins/emitter'
import clickOutside from '../../utils/directives/clickOutside'
import { deepCopy } from '../../utils/assist'

const prefixCls = prefix + 'tree'
export default {
    name: prefixCls,
    mixins: [Emitter],
    directives: {clickOutside},
    components: {
        TreeNode
    },
    data () {
        return {
            prefixCls: prefixCls,
            rootData: [],
            dataList: [],
            dargState: {}
        }
    },
    watch: {
        data: {
            deep: true,
            handler () {
                this.rebuidData()
            }
        },
        defaultCheckedValues: {
            deep: true,
            handler () {
                this.defaultRebuild('checked')
            }
        },
        defaultExpandedValues: {
            deep: true,
            handler () {
                this.defaultRebuild('expaned')
            }
        },
        filterText (value) {
            this.filterTreeData(value)
        },
        rootData: {
            deep: true,
            handler () {
                this.$emit('data-change', deepCopy(this.rootData))
            }
        }
    },
    props: {
        className: {
            type: String
        },
        defaultOpt: {
            type: Object,
            default () {
                return {
                    childrenKey: 'children',
                    nameKey: 'name',
                    idKey: 'id',
                    disabledKey: 'disabled',
                    checkedKey: 'checked',
                    expandKey: 'expand',
                    selectedKey: 'selected',
                    indeterminateKey: 'indeterminate'
                }
            }
        },
        checkboxOptions: { // 多选级联配置
            type: Object,
            default () {
                return {
                    parent: true, // 是否级联父级节点
                    disabled: false, // 是否级联禁用节点
                    children: true // 是否级联子级节点
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
            type: [String, Number],
            default: ''
        },
        ...propsInit({
            // draggable 开启拖拽模式
            // loading 开启懒加载模式
            // accordion 开启手风琴模式
            // showCheckbox 开启多选模式
            // autoScroll  选中后自动滚动到选中位置
            props: ['draggable', 'loading', 'accordion', 'showCheckbox', 'autoScroll'],
            config: {
                type: Boolean,
                default: false
            }
        }),
        ...propsInit({
            // defaultCheckedValues 默认选中集合【多选】
            // defaultExpandedValues 默认展现集合
            // data  树形数据
            props: ['defaultCheckedValues', 'defaultExpandedValues', 'data'],
            config: {
                type: Array,
                default () {
                    return []
                }
            }
        }),
        render: {
            type: [Function, Boolean],
            default: false
        },
        checkCascade: {
            type: Boolean,
            default: true
        }
    },
    created () {
        this.rebuidData()
        this.$nextTick(() => {
            this.defaultRebuild('checked')
            this.defaultRebuild('expaned')
            this.filterTreeData(this.filterText)
        })
    },
    mounted () {
        this.$on('on-selected-change', this.handleSelect)
        this.$on('on-expand-change', this.handleExpand)
        this.$on('on-check-change', this.handleCheck)
        this.$on('on-drag-start', this.handleDragStart)
        this.$on('on-drag-drop', this.handleDrop)
    },
    computed: {
        wrapCls () {
            return [
                `${prefixCls}`
            ]
        },
        showTip () {
            return !this.getVisibleNodes().length
        }
    },
    methods: {
        rebuidData () {
            this.rootData = deepCopy(this.data)
            this.dataList = this.indexArrCreate()
            // if (!this.checkboxOptions.parent && this.checkboxOptions.children) return
            this.formatTreeData()
        },
        allCheckedData (status, type) {
            if (type === 'select') {
                this.clearSelectedState()
            } else {
                this.clearCheckedState(status)
            }
        },
        clearCheckedState (status) {
            this.dataList.forEach((item) => {
                this.$set(item.node, this.defaultOpt.checkedKey, status)
            })
        },
        clearSelectedState () {
            let defaultOpt = this.defaultOpt
            this.dataList.map(item => {
                this.$set(item.node, defaultOpt.selectedKey, false)
            })
        },
        getCheckedNodes () {
            const {checkboxOptions, defaultOpt, dataList} = this
            const checkedKey = defaultOpt.checkedKey
            return dataList.filter(obj => obj.node[checkedKey] && !(!checkboxOptions.disabled && obj.node[defaultOpt.disabledKey])).map(obj => obj.node)
        },
        getVisibleNodes () {
            return this.dataList.filter(obj => (!obj.node.invisible)).map(obj => obj.node)
        },
        getIndeterminateNodes () {
            const {checkboxOptions, defaultOpt, dataList} = this
            const indeterminateKey = defaultOpt.indeterminateKey
            return dataList.filter(obj => (obj.node[indeterminateKey] && !(!checkboxOptions.disabled && obj.node[defaultOpt.disabledKey]))).map(obj => obj.node)
        },
        getSelectedNodes () {
            const selectedKey = this.defaultOpt.selectedKey
            return this.dataList.filter(obj => (obj.node[selectedKey])).map(obj => obj.node)
        },
        // 原数据格式化
        formatTreeData () {
            let defaultOpt = this.defaultOpt
            let dataList = this.dataList
            const checkedNodes = this.getCheckedNodes()
            checkedNodes.forEach(node => {
                if (this.checkboxOptions.children && this.checkCascade) this.downTraversal(node, {[`${defaultOpt.checkedKey}`]: true})
                const parentKey = dataList[node.nodeKey].parent
                if (!parentKey && parentKey !== 0) return
                const parent = dataList[parentKey].node
                const childHasCheckSetter = typeof node[defaultOpt.checkedKey] !== 'undefined' && node[defaultOpt.checkedKey]
                if (childHasCheckSetter && parent[defaultOpt.checkedKey] !== node[defaultOpt.checkedKey]) {
                    if (this.checkboxOptions.parent && this.checkCascade) this.upwardTraversal(node.nodeKey)
                }
            })
        },
        defaultRebuild (type) {
            let {dataList, defaultOpt} = this
            let {idKey} = defaultOpt
            let arr = type === 'checked' ? this.defaultCheckedValues : this.defaultExpandedValues
            if (arr.length) {
                if (type === 'checked') {
                    if (this.showCheckbox) {
                        let nodeKeys = dataList.filter(item => arr.includes(item.node[idKey]) || arr.includes(String(item.node[idKey]))).map(item => item.nodeKey)
                        nodeKeys.forEach(item => {
                            this.handleCheck({checked: true, nodeKey: item, isFormat: true})
                        })
                    } else {
                        let [node] = dataList.filter(item => (String(item.node[idKey]) === String(arr[0])))
                        this.handleSelect(node.nodeKey, true)
                    }
                } else {
                    let nodes = dataList.filter(item => arr.includes(item.node[idKey]) || arr.includes(String(item.node[idKey]))).map(item => item)
                    nodes.forEach(item => {
                        this.$set(item.node, defaultOpt.expandKey, !item.node[defaultOpt.expandKey])
                        this.handleExpand({data: item.node, isFormat: true})
                    })
                }
            }
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
        handleSelect (nodeKey, isFormat = false) {
            const selectedKey = this.defaultOpt.selectedKey
            const node = this.dataList[nodeKey].node
            const selectedIndex = this.dataList.findIndex(obj => obj.node.selected)
            if (selectedIndex >= 0 && selectedIndex !== nodeKey) this.$set(this.dataList[selectedIndex].node, selectedKey, false)
            this.$set(node, selectedKey, !node.selected)
            if (!isFormat) this.$emit('on-select', {data: node, selectedNodes: this.getSelectedNodes()})
        },
        // 选中
        handleCheck ({checked, nodeKey, isFormat = false}) {
            const defaultOpt = this.defaultOpt
            const node = this.dataList[nodeKey].node
            this.$set(node, defaultOpt.checkedKey, checked)
            this.$set(node, defaultOpt.indeterminateKey, false)
            if (this.checkboxOptions.parent && this.checkCascade) this.upwardTraversal(nodeKey)
            if (this.checkboxOptions.children && this.checkCascade) {
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
            if (!isFormat) this.$emit('on-check', options)
        },
        // 展开/关闭
        handleExpand (options) {
            const {defaultOpt, dataList, accordionOptions, accordion} = this
            const {expandKey, childrenKey} = defaultOpt
            const node = options.data
            if (accordion) { // 是否开启手风琴
                if (!accordionOptions.isCache && options.parents) { // 是否开启缓存
                    const parents = options.parents.map(item => {
                        return item.nodeKey
                    })
                    dataList.forEach((item, index) => {
                        if (parents.indexOf(index) < 0) {
                            this.$set(dataList[index].node, expandKey, false)
                        }
                    })
                } else {
                    let parentKey = dataList[node.nodeKey].parent
                    if (parentKey !== undefined) {
                        let parent = dataList[parentKey].node
                        parent[childrenKey].forEach((item) => {
                            if (item.nodeKey !== node.nodeKey) {
                                this.$set(dataList[item.nodeKey].node, expandKey, false)
                            }
                        })
                    }
                }
            }
            if (!options.isFormat) this.$emit('on-expand', {data: node})
        },
        // 模糊检索
        filterTreeData (value) {
            const defaultOpt = this.defaultOpt
            const _this = this
            const cascadeParent = function (data, isRoot = false) {
                let allHidden = true
                const childNodes = data[defaultOpt.childrenKey] || []
                childNodes.forEach((child) => {
                    if (!child.invisible) allHidden = false
                })
                if (isRoot) {
                    _this.$set(data, 'invisible', !_this.filterMethod(value, data))
                }
                if (childNodes.length) {
                    _this.$set(data, 'invisible', allHidden && !_this.filterMethod(value, data))
                }
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
                cascadeParent(rootNode, true)
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
