<template>
    <div :class="[stepItem, statusClass]"  :style="setStyle">
        <div :class="[tailClass]" v-if="ifShowTail"></div>
        <div :class="[stepMain]" >
            <div :class="[stepPoint]" v-if="icon" @click="stepClick" >
                <b-icon :type="icon"></b-icon>
            </div>
            <div :class="[stepPoint]" v-else @click="stepClick" >
                {{label}}
            </div>
            <div :class="[steptitle]">{{title}}</div>
        </div>
        <div :class="[stepContent]">{{content}}</div>
    </div>
</template>

<script>
import Common from './common'
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'step'
export default {
    name: prefixCls,
    props: {
        title: {// 标题
            type: String,
            default: ''
        },
        content: {// 文本内容
            type: String,
            default: ''
        },
        status: {// step的状态
            type: String,
            default: ''
        },
        value: {// 当前节点的值
            type: [Number, String],
            default: ''
        },
        // icon属性
        icon: {
            type: String,
            default: ''
        },
        click: {// 单击事件触发的方法
            type: [Function, String],
            default: ''
        }
    },
    data () {
        return {
            index: 1, // step所属序号
            length: '',
            direction: '', // step的方向
            stepsStatus: 'process', // 来自外层steps的状态status
            theLast: false, // 是否显示tail线
            stepsClick: ''// 来自外层steps的click触发的方法
        }
    },
    mounted () { // 组件初次加载的时候设置steps的属性
        this.setParentProps()
        this.checkIndexAndSingle()
    },
    updated () { // 组件更新的时候设置steps的属性
        this.setParentProps()
        this.checkIndexAndSingle()
    },
    methods: {
        // 设置父组件steps的属性
        setParentProps () {
            let that = this
            if (that.content) {
                that.$parent.haveContent()
            }
            if ((this.status || this.stepsStatus) === 'single') {
                that.$parent.haveSingle()
            }
        },
        // 检测单点step是否index为1
        checkIndexAndSingle () {
            let status = this.status || this.stepsStatus
            if (status === 'single' && !!this.label) {
                console.error(`单点状态（status='single'）的step必须放在第一个位置！`)
            }
        },
        // 对单击事件处理并且向外抛出属性
        stepClick () {
            let {value, content, title, index, click, stepsClick, status, stepsStatus, size} = this
            let options = {
                value, content, title, index, status: status || stepsStatus, size
            }
            switch (true) {
            case typeof click === 'function':
                click(options)
                break
            case typeof stepsClick === 'function':
                stepsClick(options)
                break
            }
        }
    },
    computed: {
        // step整体的class
        stepItem () {
            return `${prefixCls}-item`
        },
        // step节点的class
        stepPoint () {
            return `${prefixCls}-point`
        },
        // step状态的class
        statusClass () {
            let {status, stepsStatus} = this
            return Common.getStatusClass(status || stepsStatus)
        },
        // 连接线的class
        tailClass () {
            return `${prefixCls}-tail`
        },
        // step的title
        steptitle () {
            return `${prefixCls}-title`
        },
        // step 的main
        stepMain () {
            return `${prefixCls}-main`
        },
        // step 的 Content
        stepContent () {
            return `${prefixCls}-content`
        },
        // 水平方向的step组件中，title和tail的所在div的样式
        horizontalClass () {
            return `${prefixCls}-horizontal`
        },
        setStyle () {
            let length = this.length
            let params = this.direction === 'vertical' ? 'height' : 'width'
            return {[params]: length}
        },
        // 是否展示tail
        ifShowTail () {
            return (this.status || this.stepsStatus) !== 'single' && !this.theLast
        },
        label () {
            let str = ''
            if ((this.status || this.stepsStatus) !== 'single') {
                str = this.index
            } else {
                str = ''
            }
            return str
        }
    }
}
</script>

<style scoped>

</style>
