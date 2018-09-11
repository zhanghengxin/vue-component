<template>
    <div :class="[stepItem]">
        <div class="b-step-tail" v-if="showTail"></div>
        <div :class="[stepPoint, statusClass]">{{index}}</div>
    </div>
</template>

<script>
import Common from './common'

export default {
    name: 'b-step',
    props: {},
    data () {
        return {
            index: 1,
            status: 'wait',
            showTail: true
        }
    },
    computed: {
        stepItem () {
            return 'b-step-item'
        },
        stepPoint () {
            return 'b-step-point'
        },
        statusClass () {
            let status = this.status
            return Common.getStatusClass(status)
        }
    }
}
</script>

<style scoped>

</style>
