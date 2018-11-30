<!-- 当前票号 弹框 -->
<template>
    <div>
        <Modal v-show="config.enableCurrentNumber" v-model="showCurrentNumbers" :maskClosable="false" title="当前票号" width="360px" @on-visible-change="showCurrentNumbers = arguments[0]">
            <div class="wrap">
                <p>发票代码: {{currentData.invoiceCode}}</p>
                <p>发票号码: {{currentData.invoiceNo}}</p>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showCurrentNumbers: false
        }
    },
    props: {
        config: {
            type: Object,
            required: true
        },
        currentData: {
            type: Object,
            required: true
        }
    },
    methods: {
        open () {
            this.showCurrentNumbers = true
        },
        close () {
            this.showCurrentNumbers = false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
