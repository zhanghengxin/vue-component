<!-- 绑定订单流水 弹框 -->
<template>
    <div>
        <Modal v-model="showOrderSerial" title="绑定订单流水" :maskClosable="false" class-name="vertical-center-modal serial-modal" @on-visible-change="showOrderSerial = arguments[0]" @on-ok="bindOrderSerial">
            <div class="clearfix tax_lab_flo">
                <span>订单流水号</span>
                <i-input class="serial" v-model="serialNoModel" @on-blur="changeSerialNo"></i-input>
            </div>
        </Modal>
    </div>
</template>

<script>
import { keyUtil } from '../store/helper'

export default {
    data () {
        return {
            showOrderSerial: false,
            serialNoModel: ''
        }
    },
    props: {
        serialNo: {
            type: String,
            required: true
        }
    },
    watch: {
        serialNo (val) {
            if (val) {
                this.serialNoModel = val
            }
        }
    },
    methods: {
        open () {
            this.showOrderSerial = true
        },
        changeSerialNo (event) {
            this.serialNoModel = event.target.value
        },
        bindOrderSerial () {
            this.$store.commit(keyUtil.getChangeName('serialNo'), this.serialNoModel)
        }
    }
}
</script>

<style lang="scss" scoped>
.serial-modal {
    width: 360px;
    .serial {
        width: 200px;
    }
}
</style>
