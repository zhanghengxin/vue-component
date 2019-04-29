<template>
    <div :class="classes">
        <div :class="tabsBarCls" ref="nav">
            <div :class="tabsExtraCls" v-if="showExtra">
                <slot name="extra"></slot>
            </div>
            <div :class="tabsInkBar" :style="inkBarStyle"></div>
            <div @click="handleChange(index)" v-for="(item,index) in navList" :key="index" :class="tabCls(item)">
                <Icon v-if="item.icon !== ''" :type="item.icon"></Icon>
                <span>{{item.label}}</span>
                <Icon v-if="showClose(item)" :class="tabsCloseIcon" type="quxiao-guanbi-shanchu"
                      @click.native.stop="handleRemove(index)"></Icon>
            </div>
        </div>
        <div :class="tabsContent" :style="contentStyle" ref="panes">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import { TABS, TABPANEL, TABPANELCSS } from './common'
    import { oneOf } from '../../utils/common'
    import { findComponentsDownward } from '../../utils/assist'
    import Icon from '../icon/Icon.vue'

    const prefixCls = TABS
    const focusFirst = (element, root) => {
        try { element.focus() } catch (err) {} // eslint-disable-line no-empty

        if (document.activeElement === element && element !== root) return true

        const candidates = element.children
        for (let candidate of candidates) {
            if (focusFirst(candidate, root)) return true
        }
        return false
    }
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
            },
            animated: {
                type: Boolean,
                default: true
            },
            beforeRemove: Function,
            // Tabs 嵌套时，用 name 区分层级
            name: {
                type: String
            },
            captureFocus: {
                type: Boolean,
                default: false
            }
        },
        components: {Icon},
        data () {
            return {
                currentValue: this.value,
                navList: [],
                barWidth: 0,
                barOffset: 0,
                showExtra: false,
                activeKey: this.value
            }
        },
        watch: {
            value: function (val) {
                this.currentvalue = val
            },
            currentValue: function (val) {
                this.activeKey = val
                // this.updateStatus()
                this.updateBar()
                this.autoFocus()
            }
        },
        mounted () {
            this.initTabs()
        },
        updated () {
            this.initTabs()
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.type}`]: this.type,
                        [`${prefixCls}-animated`]: this.animated
                    }
                ]
            },
            tabsBarCls () {
                return `${prefixCls}-bar`
            },
            tabsExtraCls () {
                return `${prefixCls}-extra`
            },
            tabsContent () {
                return [
                    `${prefixCls}-content`
                ]
            },
            contentStyle () {
                const x = this.getTabIndex(this.activeKey)
                const p = x === 0 ? '0%' : `-${x}00%`

                let style = {}
                if (x > -1) {
                    style = {
                        transform: `translateX(${p}) translateZ(0px)`
                    }
                }
                return style
            },
            tabsCloseIcon () {
                return `${prefixCls}-close-icon`
            },
            inkBarStyle () {
                let style = {
                    visibility: 'hidden',
                    width: `${this.barWidth}px`
                }
                if (this.type === 'line') {
                    style.visibility = 'visible'
                } else {
                    style.visibility = 'hidden'
                }
                style.transform = `translate3d(${this.barOffset}px, 0px, 0px)`
                return style
            },
            tabsInkBar () {
                return `${prefixCls}-ink-bar`
            }
        },
        methods: {
            initTabs () {
                this.showExtra = this.$slots.extra !== undefined
                this.updateBar()
                this.autoFocus()
            },
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
                // return this.$children.filter(item => item.$options.name === TABPANEL)
                const AllTabPanes = findComponentsDownward(this, TABPANEL)
                const TabPanes = []

                AllTabPanes.forEach(item => {
                    if (item.tab && this.name) {
                        if (item.tab === this.name) {
                            TabPanes.push(item)
                        }
                    } else {
                        TabPanes.push(item)
                    }
                })

                // 在 TabPane 使用 v-if 时，并不会按照预先的顺序渲染，这时可设置 index，并从小到大排序
                TabPanes.sort((a, b) => {
                    if (a.index && b.index) {
                        return a.index > b.index ? 1 : -1
                    }
                })
                return TabPanes
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
                if (!this.beforeRemove) {
                    return this.handleRemoveTab(index)
                }

                const before = this.beforeRemove(index)

                if (before && before.then) {
                    before.then(() => {
                        this.handleRemoveTab(index)
                    })
                } else {
                    this.handleRemoveTab(index)
                }
            },
            handleRemoveTab (index) {
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
                    let {label, disabled, icon = '', closable, currentName} = pane
                    this.navList.push({
                        label,
                        name: currentName || index,
                        disabled,
                        icon,
                        closable
                    })
                    if (!currentName) pane.currentName = index
                    if (index === 0) {
                        if (!this.currentValue) this.currentValue = currentName || index
                    }
                })
                // this.updateStatus()
                this.updateBar()
            },
            updateBar () {
                this.$nextTick(() => {
                    const index = this.getTabIndex(this.activeKey)
                    if (!this.$refs.nav) return
                    const prevTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`)
                    const tab = prevTabs[index]
                    this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0
                    const gutter = 6
                    if (index > 0) {
                        let offset = 0
                        for (let i = 0; i < index; i++) {
                            offset += parseFloat(prevTabs[i].offsetWidth) + gutter
                        }
                        this.barOffset = offset
                    } else {
                        this.barOffset = 0
                    }
                })
            },
            // updateStatus () {
            // const tabs = this.getTabs()
            // var _this = this
            // tabs.forEach(function (tab) {
            //     tab.show = (tab.name === _this.currentValue || _this.animated)
            // })
            // },
            handleChange (index) {
                var nav = this.navList[index]
                var name = nav.name
                if (nav.disabled) return
                this.currentValue = name
                this.$emit('input', name)
                this.$emit('on-click', name)
            },
            autoFocus () {
                const index = this.getTabIndex(this.activeKey);
                [...this.$refs.panes.querySelectorAll(`.${TABPANELCSS}`)].forEach((el, i) => {
                    if (index === i) {
                        if (this.captureFocus) setTimeout(() => focusFirst(el, el), 300)
                    }
                })
            },
            getTabIndex (name) {
                let tabIdx = this.navList.findIndex(nav => nav.name === name)
                return tabIdx > -1 ? tabIdx : 0
            }
        }
    }
</script>
