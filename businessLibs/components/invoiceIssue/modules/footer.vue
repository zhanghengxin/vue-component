<!-- 发票开具 底部 销方 信息 -->
<template>
    <div class="grid-hf">
        <div class="grid-hf-col col-a">{{sell}}</div>
        <div class="grid-hf-col col-b">
            <ul class="trader">
                <li>
                    <span class="label">名称</span>：<span class="info" v-text="currentDataObj.name"></span>
                </li>
                <li v-if="isRollInvoice">
                    <span class="label"></span>
                    <input type="text" class="input" style="display:none;"/>
                </li>
                <li>
                    <span class="label">纳税人识别号</span>：
                    <span class="info" v-text="currentDataObj.taxSerial"></span>
                </li>
                <li v-if="!isRollInvoice">
                    <span class="label">地址、电话</span>：
                    <input type="text" :readonly="isIssue" @change="updateStore" class="input" v-model="currentDataObj.addressAndPhone"/>
                </li>
                <li v-if="!isRollInvoice">
                    <span class="label">开户行及账号</span>：
                    <input type="text" class="input" :readonly="isIssue" @change="updateStore" v-model="currentDataObj.bankAndAccount"/>
                </li>
                <li v-if="isRollInvoice">
                    <span class="label"></span>
                    <input type="text" class="input" style="display:none;"/>
                </li>
            </ul>
        </div>
        <div class="grid-hf-col col-c">备注</div>
        <div class="grid-hf-col col-d last">
            <div v-if="isNegative" class="red">
                对应正数发票代码:<span v-text="originalInvoiceCode"></span>
                号码:<span v-text="originalInvoiceNo"></span>
            </div>
            <p v-if="isIssue&&(invoiceTypeCode === '007')" class="red">
                校验码:<span v-text="verifyCode"></span>
            </p>
            <div v-if="showDifference&&isIssue" class="red" style="text-align: left;">
                差额征税<span v-if="!isNegative">：{{deductibleAmount}}</span>
            </div>
            <textarea :class="['remark', (isNegative || isIssue) ? 'active-remark' : '', (showDifference&&isIssue) ? 'min-remark' : '' ]" v-model="remarks" :readonly="isIssue"></textarea>
        </div>
    </div>
</template>

<script>
import { keyUtil, generateComputed } from '../store/helper'
import customerMixin from '../mixins/customerMixin'

const propMixin = {
    ...customerMixin,
    computed: {
        ...customerMixin.computed,
        ...generateComputed([{
            propName: 'currentCustomerType',
            fixedValue: 'seller'
        }], state => state.invoiceEdit),
        ...generateComputed(['isNegative'], state => state.invoiceEdit),
        ...generateComputed(['remarks', 'originalInvoiceCode', 'originalInvoiceNo', 'verifyCode', 'taxationMethod', 'invoiceSpecialMark'], state => state.invoiceEdit.currentData)
    }
}

export default {
    name: 'invoice-footer',
    mixins: [propMixin],
    props: {
        dataObj: {
            type: Object,
            required: true
        },
        isIssue: {
            type: Boolean,
            default: false
        },
        invoiceTypeCode: {
            type: String,
            required: true
        },
        isRed: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentDataObj: {
                ...this.dataObj
            }
        }
    },
    computed: {
        hasTrader () {
            return false
        },
        isRollInvoice () {
            return this.invoiceTypeCode === '025'
        },
        sell () {
            let invoiceSpecialMark = this.invoiceSpecialMark
            let isRollInvoice = this.isRollInvoice
            if (invoiceSpecialMark === '02') {
                return '购买方'
            } else if (invoiceSpecialMark === '08' || isRollInvoice) {
                return '销售方'
            } else {
                return '销货单位'
            }
        },
        showDifference () {
            return this.taxationMethod === '2'
        },
        deductibleAmount () {
            if (this.showDifference && this.isIssue) {
                let ded = this.$store.state.invoiceEdit.currentData.detailList[0].deduction
                return (+ded).toFixed(2)
            } else {
                return ''
            }
        },
        isSpecialInvoice () {
            return this.invoiceTypeCode === '004'
        }
    },
    watch: {
        dataObj: {
            deep: true,
            handler (dataObj) {
                Object.assign(this.currentDataObj, dataObj)
            }
        }
    },
    methods: {
        showSelectTrader () {
            this.currentCustomerType = 'seller'
            this.showCustomerSelector = true
        },
        updateStore () {
            this.$store.commit(keyUtil.getChangeName('sellerInfo'), {...this.currentDataObj})
        }
    }
}
</script>

<style lang="scss" scoped>
.input{
    border: 1px solid #dddee1;
}
.red{
    color: red;
    text-align: left;
    padding: 0px 4px;
    line-height: 16px;
    font-size: 14px;
}
.active-remark{
    height: auto!important;
}
.min-remark{
    height: 35%;
    margin-top: 0;
}
</style>
