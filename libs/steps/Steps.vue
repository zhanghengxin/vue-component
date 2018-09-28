<template>
    <div :class="[stepsArea,stepsSize(),haveContentClass]">
        <slot></slot>
    </div>
</template>

<script>
import Common from './common'

export default {
    name: 'b-steps',
    props: {
        current: {// 当前步数
            default: 1
        },
        status: {// step的状态
            default: 'process'
        },
        size: {// 组件的型号
            default: 'normal'
        },
        click: {// 单击事件的方法，没有规定类型为function，因为需要做非空判断
            default: ''
        }
    },
    data () {
        return {
            ifHaveContent: false, // 是否含有content
            haveContentClass: ' '// 若有content时的class
        }
    },
    computed: {
        stepsArea: () => { // 返回stepsArea的class
            return 'b-steps-area'
        }
    },
    mounted () { // 初次加载时触发属性设置方法
        this.setChildrenAttr()
    },
    updated () { // 更新时触发属性设置方法
        this.setChildrenAttr()
    },
    methods: {
        // 若子组件有content，则操作class
        haveContent () {
            this.haveContentClass = 'b-steps-area-haveContent'
        },
        // 获取steps组件的size属性
        stepsSize () {
            let size = this.size
            let className = ' '
            switch (size) {
            case 'small':
                className = 'b-steps-area-small'
                break
            default :
                className = ' '
            }
            return className
        },
        // 设置子元素的属性
        setChildrenAttr () {
            let that = this
            // 设置子组件（Step）的默认值，比如index，showLine。
            that.$children.map((seg, idx) => {
                let index = idx + 1
                index === that.$children.length && (seg['showTail'] = false)
                that.setStepStatus(seg, index)
                that.setClick(seg)
                seg['index'] = index
            })
        },
        // 设置单击事件
        setClick (seg) {
            let stepsClick = this.click
            if (typeof stepsClick === 'function') {
                seg['stepsClick'] = stepsClick
            }
        },
        // 设置step的status
        setStepStatus (seg, index) {
            let {status, current} = this
            let statusList = Common.statusList
            switch (true) {
            case +current === index :
                if (status) {
                    seg['status'] = status
                } else {
                    seg['status'] = statusList[1]
                }
                break
            case +current > index:
                seg['status'] = statusList[2]
                break
            case +current < index:
            default :
                seg['status'] = statusList[0]
                break
            }
        }
    }
}
</script>

<style scoped>

</style>
