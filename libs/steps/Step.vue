<template>
    <div :class="[stepItem, statusClass]">
        <div :class="[stepPoint]">{{index}}</div>
        <div  :class="[stepMain]">
            <div :class="[steptitle]">{{title}}</div>
            <div :class="[tailClass]" v-if="showTail"></div>
        </div>
    </div>
</template>

<script>
import Common from './common'

export default {
    name: 'b-step',
    props: {
        title: {
            default: ''
        }
    },
    data () {
        return {
            index: 1,
            status: 'wait',
            showTail: true
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
        }
    }
}
</script>

<style scoped>

</style>
