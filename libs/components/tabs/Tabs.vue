<template>
    <div :class="classes">
        <div :class="tabsBarCls">
            <div @click="handleChange(index)"  v-for="(item,index) in navList" :key="index" :class="tabCls(item)">
                <Icon v-if="item.icon !== ''" :type="item.icon"></Icon>
                <span>{{item.label}}</span>
                <Icon v-if="showClose(item)" :class="tabsCloseIcon" type="quxiao-guanbi-shanchu" @click.native.stop="handleRemove(index)"></Icon>
            </div>
        </div>
        <div :class="tabsContent">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { TABS, TABPANEL } from './common'
import { oneOf } from '../../utils/common'
import Icon from '../icon/Icon.vue'

const prefixCls = TABS
export default {
    name: prefixCls,
    props: {
        value: {
            type: [String, Number]
        },
        type: {
            type: String,
            validator (value) {
                return oneOf(value, ['line', 'card'])
            },
            default: 'line'
        },
        size: {
            type: String,
            validator (value) {
                return oneOf(value, ['small', 'default'])
            },
            default: 'default'
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    components: {Icon},
    data () {
        return {
            currentValue: this.value,
            navList: [],
            activeKey: this.value
        }
    },
    watch: {
        value: function (val) {
            this.currentvalue = val
        },
        currentValue: function () {
            this.updateStatus()
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.type}`]: this.type
                }
            ]
        },
        tabsBarCls () {
            return `${prefixCls}-bar`
        },
        tabsContent () {
            return `${prefixCls}-content`
        },
        tabsCloseIcon () {
            return `${prefixCls}-close-icon`
        }
    },
    methods: {
        tabCls (item) {
            return [
                `${prefixCls}-tab`,
                {
                    [`${prefixCls}-disabled`]: item.disabled,
                    [`${prefixCls}-active`]: item.name === this.currentValue,
                    [`${prefixCls}-mini`]: this.type === 'line' && this.size === 'small',
                    [`${prefixCls}-${this.type}`]: this.type
                }
            ]
        },
        getTabs () {
            return this.$children.filter(item => item.$options.name === TABPANEL)
        },
        showClose (item) {
            if (this.type === 'card') {
                if (item.closable !== null) {
                    return item.closable
                } else {
                    return this.closable
                }
            } else {
                return false
            }
        },
        handleRemove (index) {
            const tabs = this.getTabs()
            const tab = tabs[index]
            tab.$destroy()
            if (tab.currentName === this.currentValue) {
                const newTabs = this.getTabs()
                let currentValue = -1
                if (newTabs.length) {
                    const leftNoDisabledTabs = tabs.filter((item, itemIndex) => !item.disabled && itemIndex < index)
                    const rightNoDisabledTabs = tabs.filter((item, itemIndex) => !item.disabled && itemIndex > index)
                    if (rightNoDisabledTabs.length) {
                        currentValue = rightNoDisabledTabs[0].currentName
                    } else if (leftNoDisabledTabs.length) {
                        currentValue = leftNoDisabledTabs[leftNoDisabledTabs.length - 1].currentName
                    } else {
                        currentValue = newTabs[0].currentName
                    }
                }
                this.currentValue = currentValue
                this.$emit('input', currentValue)
            }
            this.$emit('on-tab-remove', tab.currentName)
            this.updateNav()
        },
        updateNav () {
            this.navList = []
            this.getTabs().forEach((pane, index) => {
                let {label, name, disabled, icon = '', closable} = pane
                this.navList.push({
                    label,
                    name: name || index,
                    disabled,
                    icon,
                    closable
                })
                if (!name) pane.name = index
                if (index === 0) {
                    if (!this.currentValue) this.currentValue = name || index
                }
            })
            this.updateStatus()
        },
        updateStatus () {
            const tabs = this.getTabs()
            var _this = this
            tabs.forEach(function (tab) {
                tab.show = (tab.name === _this.currentValue)
            })
        },
        handleChange (index) {
            var nav = this.navList[index]
            var name = nav.name
            if (nav.disabled) return
            this.currentValue = name
            this.$emit('input', name)
            this.$emit('on-click', name)
        }
    }
}
</script>
