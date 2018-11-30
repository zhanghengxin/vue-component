<!-- 添加 折扣 弹框 -->
<template>
    <div>
        <Modal v-model="showDiscountSelector" title="折扣设置" width="350" @on-visible-change="visibleStateChange" @on-ok="selectItem" :loading="loading">
            <div class="discount">
                <div>商品原金额：<span v-text="discountPrice"></span></div>
                <div>
                    <span class="inline-label">折扣行数：</span>
                    <div class="addOrLess line-select inline-content">
                        <InputNumber :max="maxLine" :min="1" v-model="discountLines"></InputNumber>
                    </div>
                </div>
                <div>
                    <RadioGroup v-model="discountType">
                    <Radio label="rate">折扣率</Radio>
                    <Radio label="amount">金额</Radio>
                    </RadioGroup>
                </div>
                <InputNumber
                    :min="0"
                    :max="max"
                    v-model="discountValue"
                    :formatter="value => `${value}` + unit"
                    :parser="value => value.replace(unit, '')"
                >
                </InputNumber>
            </div>
        </Modal>
    </div>
</template>

<script>
import {generateComputed} from '../store/helper'

const DISCOUNT_TYPE_RATE = 'rate'
// const DISCOUNT_TYPE_AMOUNT = 'amount'

const propMixin = {
    computed: {
        ...generateComputed(['showDiscountSelector'], state => state.invoiceEdit)
    }
}

export default {
    name: 'discount-selector',
    mixins: [propMixin],
    props: {
        discountPriceMap: {
            type: Object,
            required: true
        },
        maxLine: {
            type: Number,
            defaut: 1
        },
        changeDiscount: {
            type: Function,
            required: true
        }
    },
    data () {
        return {
            discountLines: 1,
            discountType: 'rate',
            discountValue: 0,
            loading: true,
            max: 100
        }
    },
    watch: {
        discountType (val) {
            this.discountValue = 0
            if (val === 'rate') {
                this.max = 100
            } else {
                this.max = Infinity
            }
        }
    },
    methods: {
        visibleStateChange (state) {
            this.$emit('update:visible', state)
            if (!state) {
                this.discountLines = 1
                this.discountType = 'rate'
                this.discountValue = 0
            }
        },
        selectItem () {
            if (this.discountType === DISCOUNT_TYPE_RATE) {
                if (this.discountValue <= 0 || this.discountValue > 100) {
                    this.$Message.warning('折扣率只能是0-100之间的数值')
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                } else {
                    this.changeDiscount(this.$data, this.discountLines)
                    this.loading = false
                }
            } else {
                if (this.discountValue <= 0) {
                    this.$Message.warning('折扣金额不能为0和负数')
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                } else if (this.discountValue > this.discountPrice) {
                    this.$Message.warning('折扣金额不能大于原始金额')
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                } else {
                    this.changeDiscount(this.$data, this.discountLines)
                    this.loading = false
                }
            }
        }
    },
    computed: {
        discountPrice () {
            let tp = this.discountPriceMap[this.discountLines]
            return (+tp).toFixed(2)
        },
        unit () {
            return this.discountType === 'rate' ? '%' : '圆'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
