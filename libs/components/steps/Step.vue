<template>
    <div :class="[stepItem, statusClass]" :style="setStyle">
        <div :class="[tailClass]" v-if="ifShowTail"></div>
        <div :class="[stepMain]">
            <div :class="[stepPoint,stepPointAsIcon]" v-if="icon" @click="stepClick">
                <Icon :type="icon" :size="size==='small' ? 14 : 16"></Icon>
            </div>
            <div :class="[stepPoint]" v-else-if="(status || stepsStatus) === 'finish'" @click="stepClick">
                <Icon type="queding" :size="size==='small' ? 14 : 16"></Icon>
            </div>
            <div :class="[stepPoint]" v-else-if="(status || stepsStatus) === 'error'" @click="stepClick">
                <Icon type="quxiao-guanbi-shanchu" :size="size==='small' ? 14 : 16"></Icon>
            </div>
            <div :class="[stepPoint]" v-else @click="stepClick">
                {{label}}
            </div>
            <div :class="[steptitle]">{{title}}</div>
        </div>
        <div :class="[stepContent]">{{content}}</div>
    </div>
</template>

<script>
    import Common from './common'
    import Emitter from '../../mixins/emitter'
    import Icon from '../icon'

    const prefixCls = Common.stepName
    export default {
        name: prefixCls,
        components: {Icon},
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
            }
        },
        mixins: [Emitter],
        data () {
            return {
                index: 1, // step所属序号,从1开始计数
                length: '',
                size: 'normal',
                direction: '', // step的方向
                stepsStatus: 'process', // 来自外层steps的状态status
                theLast: false // 是否显示tail线
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
                    // console.error(`单点状态（status='single'）的step必须放在第一个位置！`)
                    throw new Error(`单点状态（status='single'）的step必须放在第一个位置！`)
                }
            },
            // 对单击事件处理并且向外抛出属性
            stepClick () {
                let {value, content, title, index, status, stepsStatus, size, icon} = this
                let options = {
                    value, content, title, index, status: status || stepsStatus, size, icon
                }
                this.$emit('on-click', options)
                this.dispatch(Common.stepsName, 'step-click', options)
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
            stepPointAsIcon () {
                return `${prefixCls}-point-icon-area`
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
            // icon的大小
            setIconSize () {
                if (this.size === 'small') {
                    return 12
                } else {
                    return 16
                }
            },
            // 是否展示tail
            ifShowTail () {
                return (this.status || this.stepsStatus) !== 'single' && !this.theLast
            },
            // 展示的序号标记
            label () {
                let str = ''
                if ((this.status || this.stepsStatus) !== 'single') {
                    str = this.index
                }
                return str
            }
        }
    }
</script>

<style scoped>

</style>
