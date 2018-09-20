<template>
    <div :class="[stepItem, statusClass]">
        <div :class="[stepPoint]" @click="stepClick">{{index}}</div>
        <div :class="[stepMain]">
            <div :class="[steptitle]">{{title}}</div>
            <div :class="[tailClass]" v-if="showTail"></div>
            <div :class="[stepContent]">{{content}}</div>
        </div>
    </div>
</template>

<script>
import Common from './common'

export default {
    name: 'b-step',
    props: {
        title: {// 标题
            default: ''
        },
        content: {// 文本内容
            default: ''
        },
        value: {// 当前节点的值
            default: ''
        },
        click: {// 单击事件触发的方法
            default: ''
        }
    },
    data () {
        return {
            index: 1, // step所属序号
            status: 'wait', // 状态status
            showTail: true, // 是否显示tail线
            stepsClick: ''// 来自外层steps的click触发的方法
        }
    },
    mounted () { // 组件初次加载的时候设置steps的属性
        this.setParentProps()
    },
    updated () { // 组件更新的时候设置steps的属性
        this.setParentProps()
    },
    methods: {
        // 设置父组件steps的属性
        setParentProps () {
            let that = this
            if (that.content) {
                that.$parent.haveContent()
            }
        },
        // 对单击事件处理并且向外抛出属性
        stepClick () {
            let {value, content, title, index, click, stepsClick, status, size} = this
            let options = {
                value, content, title, index, status, size
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
            return 'b-step-item'
        },
        // step节点的class
        stepPoint () {
            return 'b-step-point'
        },
        // step状态的class
        statusClass () {
            let status = this.status
            return Common.getStatusClass(status)
        },
        // 连接线的class
        tailClass () {
            return 'b-step-tail'
        },
        // step的title
        steptitle () {
            return 'b-step-title'
        },
        // step 的main
        stepMain () {
            return 'b-step-main'
        },
        // step 的 Content
        stepContent () {
            return 'b-step-content'
        }
    }
}
</script>

<style scoped>

</style>
