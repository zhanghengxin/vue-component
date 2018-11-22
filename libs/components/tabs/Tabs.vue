<template>
  <div class="tabs">
    <div class="tabs-bar">
          <div @click="handleChange(index)" v-for="(item,index) in navList" :key="index" :class="tabCls(item)">
            <span>{{item.label}}</span>
          </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import BScroll from 'better-scroll'

export default {
    name: 'Tabs',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data () {
        return {
            currentValue: this.value,
            navList: []
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
    methods: {
        tabCls (item) {
            return [
                'tabs-tab',
                {
                    'tab-disabled': item.disabled,
                    'tabs-tab-active': item.name === this.currentValue
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
                    disabled: pane.disabled
                })
                if (!pane.name) pane.name = index
                if (index === 0) {
                    if (!this.currentValue) this.currentValue = pane.name || index
                }
            })
            this.updateStatus()
            // this.updateBar();
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
    //     _initScroll: function () {
    //         new BScroll(this.$refs.tabHeaderItem, {
    //             scrollX: true,
    //             bounce: true
    //         })
    //     }
    // }
    // mounted () {
    //     let self = this // 外层新建变量引用this
    //     this.$slots.default.forEach((components) => { // 循环default内的内容
    //         if (components.tag && components.componentOptions) { // 如果子元素tag键&&componentOptions有内容。
    //             self.navList.push(components.componentOptions.propsData)
    //             // 在components.componentOptions这个键内 有propsDate这个属性。我们可以通过这个属性拿到子组件的props值
    //         }
    //     })
    //     this.$nextTick(() => { // 避免data未更新
    //         this.activeTab = { // 给activeTab赋初始值
    //             index: 0, // 默认选中第一个
    //             name: this.tabList[0].name // 寻找tabList第一个元素 还有他的名字
    //         }
    //     })
    //     setTimeout(() => {
    //         this.$nextTick(() => { // 避免data未更新
    //             this._initScroll()
    //         }
    //         )
    //     }, 20)
    }
}
</script>

<style scoped>
  [v-cloak] {
      display:none;
  }
  .tabs {
      font-size: 14px;
      color: #657180
  }
  .tabs-bar:after {
      content:'';
      display: block;
      width:100%;
      height: 1px;
      background: #d7dde4;
      margin-top: -1px;
  }
  .tabs-tab {
      display: inline-block;
      padding: 4px 16px;
      margin-right: 6px;
      background: #fff;
      border: 1px solid #d7dde4;
      cursor:pointer;
      position: relative;
  }
  .tabs-tab-active {
      color: #3399ff;
      border-top: 1px solid #3399ff;
      border-bottom: 1px solid #fff;
  }
  .tabs-tab-active:before {
      content:'';
      display: block;
      height: 1px;
      background: #3399ff;
      position: absolute;
      top:0;
      left: 0;
      right:0;
  }
  .tabs-content {
      padding: 8px 0;
  }
  .tab-disabled {
    pointer-events: none;
    color: #ccc;
  }
</style>
