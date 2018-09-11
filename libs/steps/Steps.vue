<template>
    <div class="b-steps-area">
        <slot></slot>
    </div>
</template>

<script>
import Common from './common'

export default {
    name: 'b-steps',
    props: {
        current: {
            default: 1
        },
        status: {
            default: 'process'
        },
        size: {
            default: 'normal'
        }
    },
    data () {
        return {}
    },
    mounted () {
        // 设置子组件（Step）的默认值，比如index，showLine。
        this.$children.map((seg, idx) => {
            let index = idx + 1
            let statusList = Common.statusList
            seg['index'] = index
            index === 1 && (seg['showTail'] = false)
            switch (true) {
            case this.current == index :
                if (this.status) {
                    seg['status'] = this.status
                } else {
                    seg['status'] = statusList[1]
                }
                break
            case this.current > index:
                seg['status'] = statusList[2]
                break
            case this.current < index:
            default :
                seg['status'] = statusList[0]
                break
            }
        })
    }
}
</script>

<style scoped>

</style>
