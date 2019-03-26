<template>
    <div :class="[stepsArea,stepsSize(),haveContentClass,setDirection]" :style="setStyle" ref="stepArea">
        <slot></slot>
        <!--<div style="width:100%;height:0px;font-size:1px;line-height: 0px;clear:both;"></div>-->
    </div>
</template>

<script>
    import Common from './common'
    import { prefix } from '../../utils/common'

    const prefixCls = prefix + 'step-area'
    export default {
        name: Common.stepsName,
        props: {
            current: {// 当前步数
                type: [Number, String],
                default: 0
            },
            status: {// step的状态
                type: String,
                default: 'process'
            },
            size: {// 组件的型号
                type: String,
                default: 'normal'
            },
            length: {// 组件的宽度
                type: [Number, String],
                default: '100%'
            },
            direction: { // step组件布局的方向
                type: String,
                default: ''
            }
        },
        data () {
            return {
                ifHaveContent: false, // 是否含有content
                ifHaveSingle: false,
                haveContentClass: ' '// 若有content时的class
            }
        },
        computed: {
            stepsArea: () => { // 返回stepsArea的class
                return `${prefixCls}`
            },
            setDirection () {
                if (this.direction === 'vertical') {
                    return `${prefixCls}-vertical`
                }
                return `${prefixCls}-horizontal`
            },
            setStyle () {
                let length = this.length
                if (+length) {
                    length = length + 'px'
                }
                let params = this.direction === 'vertical' ? 'height' : 'width'
                return {[params]: length}
            }
        },
        mounted () { // 初次加载时触发属性设置方法
            this.setChildrenAttr()
            this.$on('step-click', (options) => {
                this.$emit('on-click', options)
            })
        },
        updated () { // 更新时触发属性设置方法
            this.setChildrenAttr()
        },
        methods: {
            // 若子组件有content，则操作class
            haveContent () {
                this.haveContentClass = `${prefixCls}-haveContent`
            },
            haveSingle () {
                this.ifHaveSingle = true
            },
            // 获取steps组件的size属性
            stepsSize () {
                let size = this.size
                let className = ' '
                switch (size) {
                    case 'small':
                        className = `${prefixCls}-small`
                        break
                    default :
                        className = ' '
                }
                return className
            },
            // 设置子元素的属性
            setChildrenAttr () {
                let that = this
                let childrenLength = that.$children.length
                // 设置子组件（Step）的默认值，比如index，showLine。
                that.$children.map((seg, idx) => {
                    seg['size'] = that.size
                    seg['direction'] = that.direction
                    if (that.ifHaveSingle) {
                        seg['index'] = idx
                    } else {
                        seg['index'] = idx + 1
                    }
                    idx === (childrenLength - 1) && (seg['theLast'] = true)
                    that.setStepStatus(seg, idx)
                    that.setChildrenLength(seg, childrenLength)
                })
            },
            // 设置子组件的length
            setChildrenLength (seg, length) {
                seg['length'] = ~~(95 / length) + '%'
            },
            // 设置step的status
            setStepStatus (seg, index) {
                let {status, current} = this
                let childrenStatus = 'stepsStatus'
                let statusList = Common.statusList
                switch (true) {
                    case +current === index :
                        if (status) {
                            seg[childrenStatus] = status
                        } else {
                            seg[childrenStatus] = statusList[1]
                        }
                        break
                    case +current > index:
                        seg[childrenStatus] = statusList[2]
                        break
                    case +current < index:
                    default :
                        seg[childrenStatus] = statusList[0]
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
