<template>
    <ul :class="wrapCls">
        <li>
            <span :class="arrowsCls">
                <Icon v-if="showArrow" :type="arrowType" @on-click="expanded"></Icon>
            </span>
            <!--<Checkbox-->
            <!--v-if="showCheckbox"-->
            <!--:value="data.checked"-->
            <!--:indeterminate="data.indeterminate"-->
            <!--:disabled="data.disabled || data.disableCheckbox"-->
            <!--@click.native.prevent="handleCheck">-->
            <!--</Checkbox>-->
            <!--<Render v-if="data.render" :render="data.render" :data="data" :node="node"></Render>-->
            <!--<Render v-else-if="isParentRender" :render="parentRender" :data="data" :node="node"></Render>-->
            <span :class="nameCls" @click="selectData">{{ data[defaultOpt.nameKey] }}</span>
            <tree-node
                v-if="data[defaultOpt.expandKey]"
                v-for="(item, key) in children"
                :key="key"
                :data="item"
                :default-opt="defaultOpt">
            </tree-node>
        </li>
    </ul>
</template>
<script>
import { findComponentUpwards } from '../../utils/assist'
import Checkbox from '../checkbox/Checkbox.vue'
import Icon from '../icon/Icon.vue'
import { prefix } from '../../utils/common'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'tree'

export default {
    name: 'tree-node',
    components: {Checkbox, Icon},
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
                    selectedKey: 'selected'
                }
            }
        },
        checkbox: {
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
            return this.data[this.defaultOpt.childrenKey] && this.data[this.defaultOpt.childrenKey].length
        },
        nameCls () {
            return [
                `${prefixCls}-name`,
                {
                    [`${prefixCls}-name-selected`]: this.data[this.defaultOpt.selectedKey]
                }
            ]
        },
        children () {
            return this.data[this.defaultOpt.childrenKey]
        }
    },
    methods: {
        expanded () {
            const data = this.data
            const defaultOpt = this.defaultOpt
            if (data[defaultOpt.disabledKey]) return // 禁用
            if (data[defaultOpt.childrenKey] && data[defaultOpt.childrenKey].length) {
                this.$set(this.data, defaultOpt.expandKey, !this.data[defaultOpt.expandKey])
            }
            let parents = findComponentUpwards(this, prefixCls).map(item => {
                return item.data
            })
            parents.push(data)
            this.dispatch(prefix + 'tree', 'on-expand', {data: this.data, parents: parents})
        },
        selectData () {
            if (this.data.disabled || this.checkbox) return
            this.dispatch(prefix + 'tree', 'on-selected', this.data.nodeKey)
        }
    }
}
</script>
