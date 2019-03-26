<!-- 差额征税 弹框 -->
<template>
    <div>
        <Modal v-model="showDifference" title="差额设置" width="400px" :maskClosable="false" @on-visible-change="showDifference = arguments[0]">
            <div class="wrap difference-setting">
                <div class="m-bottom">
                    <span>含税销售额：</span>
                    <InputNumber :min="0" v-model="difference.sellerPrice" :formatter="value => value ? value : ''"></InputNumber>
                </div>
                <div>
                    <span>扣除额：</span>
                    <SInputNumber :min="0" v-model="difference.deduction" :formatter="value => value ? `${value}`.replace(/^(\d+?\.\d{2})+(\d*)$/g, '$1') : ''"></SInputNumber>
                </div>
            </div>
            <div slot="footer">
                <Button type="ghost" @click="cancelDifference">取消</Button>
                <Button type="primary" @click="setDifference">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { generateComputed } from '../store/helper'

const propMixin = {
    computed: {
        ...generateComputed(['showDifference'], state => state.invoiceEdit),
        ...generateComputed(['detailList'], state => state.invoiceEdit.currentData)
    }
}
export default {
    data () {
        return {
            difference: {
                sellerPrice: '',
                deduction: ''
            }
        }
    },
    watch: {
        showDifference (val) {
            if (!val) {
                this.cancelDifference()
            }
        }
    },
    mixins: [ propMixin ],
    props: {
        isNegative: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        setDifference () {
            let {sellerPrice, deduction} = this.difference
            if (!sellerPrice) {
                this.$Message.info('请输入含税金额')
                return
            }
            if (!deduction) {
                this.$Message.info('请输入扣除额')
                return
            }
            sellerPrice = +sellerPrice
            deduction = ('' + deduction).replace(/^(\d+?\.\d{2})+(\d*)$/g, '$1')
            deduction = +deduction
            if (deduction >= sellerPrice) {
                this.difference.deduction = ''
                this.$Message.info('含税销售额必须大于扣除额！')
                return
            }

            let detailList = this.detailList.map(item => {
                let totalTax = ((sellerPrice - deduction) * (+item.goodsTaxRate)) / (1 + (+item.goodsTaxRate))
                let totalPrice = sellerPrice - totalTax

                let newItem = {
                    ...item,
                    goodsTotalPrice: totalPrice.toFixed(2),
                    goodsTotalTax: totalTax.toFixed(2),
                    goodsQuantity: '',
                    goodsPrice: '',
                    difference: (sellerPrice - deduction).toFixed(2),
                    sellerPrice,
                    deduction
                }
                if (this.isNegative) {
                    newItem = {
                        ...newItem,
                        goodsTotalPrice: '-' + totalPrice.toFixed(2),
                        goodsTotalTax: '-' + totalTax.toFixed(2)
                    }
                }
                return newItem
            })

            this.cancelDifference()
            // TODO 简化操作 动态更新 vuex 数据
            this.detailList = detailList
        },
        resetDifference () {
            this.difference = {
                sellerPrice: '',
                deduction: ''
            }
        },
        cancelDifference () {
            this.showDifference = false
            this.resetDifference()
        }
    }
}
</script>

<style lang="scss" scoped>
.difference-setting {
    .ivu-input-number{
        width: 240px;
    }
    .ivu-input-number-input-wrap{
        width: auto;
    }
    .ivu-input-number-input {
        width: 100%;
        height: initial;
        padding: 0 7px;
    }
    .m-bottom{
        margin-bottom: 10px;
    }
}
</style>
