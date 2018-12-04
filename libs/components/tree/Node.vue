<template>
    <ul
        :class="wrapCls"
        v-show="!data.invisible"
        @dragstart.stop="handleDragStart"
        @dragover.stop="handleDragOver"
        @drop.stop="handleDrop"
        :nodeKey="data.nodeKey"
        :draggable="draggable">
        <li>
            <span :class="arrowsCls">
                <Icon v-if="showArrow" :type="arrowType" @on-click="expanded"></Icon>
                <Icon v-if="showLoading" type="chushihua" :class="[prefixCls +'-loop']"></Icon>
            </span>
            <Checkbox
                v-if="showCheckbox"
                :value="data[defaultOpt.checkedKey]"
                :indeterminate="data[defaultOpt.indeterminateKey]"
                :disabled="data[defaultOpt.disabledKey]"
                @click.native.prevent="handleCheck">
            </Checkbox>
            <Render v-if="data.render" :render="data.render" :data="data" :node="node"></Render>
            <Render v-else-if="isParentRender" :render="parentRender" :data="data" :node="node"></Render>
            <span v-else :class="nameCls" @click="selectData">{{ data[defaultOpt.nameKey] }}</span>
            <tree-node
                v-for="(item, key) in children"
                v-if="data[defaultOpt.expandKey]"
                :key="key"
                :draggable="draggable"
                :data="item"
                :show-checkbox="showCheckbox"
                :default-opt="defaultOpt">
            </tree-node>
        </li>
    </ul>
</template>
<script>
import { findComponentUpwards, findComponentUpward } from '../../utils/assist'
import Render from './render'
import Checkbox from '../checkbox/Checkbox.vue'
import Icon from '../icon/Icon.vue'
import { prefix } from '../../utils/common'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'tree'

export default {
    name: 'tree-node',
    components: {Checkbox, Icon, Render},
    mixins: [Emitter],
    props: {
        data: {
            type: Object,
            default () {
                return {}
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
                    selectedKey: 'selected',
                    indeterminateKey: 'indeterminate'
                }
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        draggable: {

            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    computed: {
        wrapCls () {
            return [
                `${prefixCls}-children`
            ]
        },
        arrowsCls () {
            return [
                `${prefixCls}-arrow`
            ]
        },
        arrowType () {
            return this.data[this.defaultOpt.expandKey] ? 'xiasanjiao' : 'yousanjiao'
        },
        showArrow () {
            return (this.data[this.defaultOpt.childrenKey] && this.data[this.defaultOpt.childrenKey].length) || ('loading' in this.data && !this.data.loading)
        },
        nameCls () {
            return [
                `${prefixCls}-name`,
                {
                    [`${prefixCls}-name-selected`]: this.data[this.defaultOpt.selectedKey],
                    [`${prefixCls}-name-draggable`]: this.draggable

                }
            ]
        },
        children () {
            return this.data[this.defaultOpt.childrenKey]
        },
        showLoading () {
            return 'loading' in this.data && this.data.loading
        },
        node () {
            const Tree = findComponentUpward(this, prefix + 'tree')
            if (Tree) {
                // 将所有的 node（即flatState）和当前 node 都传递
                return [Tree.dataList, Tree.dataList.find(item => item.nodeKey === this.data.nodeKey)]
            } else {
                return []
            }
        },
        isParentRender () {
            const Tree = findComponentUpward(this, prefix + 'tree')
            return Tree && Tree.render
        },
        parentRender () {
            const Tree = findComponentUpward(this, prefix + 'tree')
            if (Tree && Tree.render) {
                return Tree.render
            } else {
                return null
            }
        }
    },
    methods: {
        expanded () {
            const data = this.data
            const defaultOpt = this.defaultOpt
            // if (data[defaultOpt.disabledKey]) return // 禁用
            if (data[defaultOpt.childrenKey] && data[defaultOpt.childrenKey].length) {
                this.$set(this.data, defaultOpt.expandKey, !this.data[defaultOpt.expandKey])
            }
            // loading
            if (!data[defaultOpt.childrenKey] || data[defaultOpt.childrenKey].length === 0) {
                const tree = findComponentUpward(this, prefixCls)
                if (tree && tree.loading && tree.loadMethod) {
                    this.$set(data, 'loading', true)
                    tree.loadMethod(data, children => {
                        this.$set(data, 'loading', false)
                        if (children.length) {
                            this.$set(data, defaultOpt.childrenKey, children)
                            this.$nextTick(() => this.expanded())
                        }
                    })
                    return
                }
            }
            // accordion
            let parents = findComponentUpwards(this, prefixCls).map(item => {
                return item.data
            })
            parents.push(data)
            this.dispatch(prefix + 'tree', 'on-expand-change', {data: this.data, parents: parents})
        },
        selectData () {
            const defaultOpt = this.defaultOpt
            if (this.data[defaultOpt.disabled] || this.showCheckbox) return
            this.dispatch(prefix + 'tree', 'on-selected-change', this.data.nodeKey)
        },
        handleCheck () {
            const defaultOpt = this.defaultOpt
            if (this.data[defaultOpt.disabledKey]) return
            const changes = {
                checked: !this.data[defaultOpt.checkedKey] && !this.data[defaultOpt.indeterminateKey],
                nodeKey: this.data.nodeKey
            }
            this.dispatch(prefix + 'tree', 'on-check-change', changes)
        },
        handleDragStart (event) {
            this.dispatch(prefix + 'tree', 'on-drag-start', {
                event: event,
                treeNode: this
            })
        },
        handleDragOver (event) {
            if ('draggable' in this.data && !this.data.draggable) return
            this.dispatch(prefix + 'tree', 'on-drag-over', this)
            event.preventDefault()
        },
        handleDrop (event) {
            if ('draggable' in this.data && !this.data.draggable) return
            this.dispatch(prefix + 'tree', 'on-drag-drop', {
                event: event,
                treeNode: this.data
            })
        }
    }
}
</script>
