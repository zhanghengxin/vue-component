<template>
  <div :class="[prefixCls,classes]" >
    <div :class="prefixCls+'-bar'" ref="tabHeaderItem">
          <div @click="handleChange(index)" v-for="(item,index) in navList" :key="index" :class="tabCls(item)" >
            <Icon v-if="item.icon !== ''" :type="item.icon"></Icon>
            <span>{{item.label}}</span>
            <Icon v-if="showClose(item)" type="yidongduan_conclose" @click.native.stop="handleRemove(index)"></Icon>
          </div>
    </div>
    <div :class="prefixCls+'-content'">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import BScroll from 'better-scroll'
import { prefix } from '../../utils/common'
import Icon from '../icon/Icon.vue'
const prefixCls = prefix + 'tabs'
export default {
    name: 'Tabs',
    props: {
        value: {
            type: [String, Number]
        },
        type: {
            type: String,
            default: 'card'
        },
        size: {
            type: String,
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
            prefixCls: prefixCls,
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
                {
                    card: this.type === 'card',
                    [`${prefixCls}-line`]: this.type === 'line',
                    [`${prefixCls}-lineActive`]: this.type === 'line'

                }
            ]
        }
    },
    methods: {
        tabCls (item) {
            return [
                `${prefixCls}-tab`,
                {
                    [`${prefixCls}-disabled`]: item.disabled,
                    [`${prefixCls}-active`]: item.name === this.currentValue,
                    [`${prefixCls}-lineActive`]: this.type === 'line' && item.name === this.currentValue,
                    [`${prefixCls}-mini`]: this.size === 'small' && this.type === 'line',
                    [`${prefixCls}-line`]: this.type === 'line',
                    [`${prefixCls}-lineActive`]: this.type === 'line'
                }
            ]
        },
        getTabs () {
            return this.$children.filter(item => item.$options.name === 'TabPanel')
        },
        updateNav () {
            // debugger
            this.navList = []
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    disabled: pane.disabled,
                    icon: pane.icon || '',
                    closable: pane.closable
                })
                if (!pane.name) pane.name = index
                if (index === 0) {
                    if (!this.currentValue) this.currentValue = pane.name || index
                }
            })
            console.log(this.navList)
            this.updateStatus()
            // this.updateBar();
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
            debugger
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
        updateStatus () {
            // debuggger
            const tabs = this.getTabs()
            var _this = this
            tabs.forEach(function (tab) {
                tab.show = (tab.name === _this.currentValue)
            })
        },
        handleChange (index) {
            // debugger
            var nav = this.navList[index]
            var name = nav.name
            if (nav.disabled) return
            this.currentValue = name
            this.$emit('input', name)
            this.$emit('on-click', name)
        }
    },
    mounted () {
        // let self = this // 外层新建变量引用this
        // this.$slots.default.forEach((components) => { // 循环default内的内容
        //     if (components.tag && components.componentOptions) { // 如果子元素tag键&&componentOptions有内容。
        //         self.navList.push(components.componentOptions.propsData)
        //         // 在components.componentOptions这个键内 有propsDate这个属性。我们可以通过这个属性拿到子组件的props值
        //     }
        // })
        // this.$nextTick(() => { // 避免data未更新
        //    // this.activeTab = { // 给activeTab赋初始值
        //        // index: 0, // 默认选中第一个
        //         //name: this.navList[0].name // 寻找tabList第一个元素 还有他的名字
        //     //}
        //     this.currentValue = this.navList[0].name
        // })
        // setTimeout(() => {
        //     this.$nextTick(() => { // 避免data未更新
        //         this._initScroll()
        //     }
        //     )
        // }, 20)
    }
}
</script>
