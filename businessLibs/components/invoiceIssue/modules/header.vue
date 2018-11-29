<!-- 发票开具 头部 购方 信息 -->
<template>
    <div class="grid-hf">
        <div class="grid-hf-col col-a">{{buy}}</div>
        <div class="grid-hf-col col-b roll-height">
            <ul class="trader">
                <li>
                    <span class="label">名称</span>：
                    <div class="selector-customer" @dblclick="showSelectTrader" v-show="!isIssue">
                        <auto-complete class="input name" v-show="!isIssue" type="text" v-model="currentDataObj.name" @on-change="doSuggest" @on-select="selectItem">
                            <i-option v-for="(item,index) in suggestDataList" :value="index" :key="index">{{item.name}}</i-option>
                        </auto-complete>
                    </div>
                    <span v-if="hasTrader&&!isIssue" class="selector-btn" @click="showSelectTrader">···</span>
                    <input type="text" v-if="isIssue" :readonly="isIssue" class="input" v-model="currentDataObj.name" />
                </li>
                <li v-if="isRollInvoice"><span class="label"></span><input type="text" class="input" style="display:none;" /></li>
                <li><span class="label">纳税人识别号</span>：<input type="text" :readonly="isIssue" class="input" v-model="currentDataObj.taxSerial"
                    @on-change="() => {currentDataObj.taxSerial = currentDataObj.taxSerial.toUpperCase()}" /></li>
                <li v-if="!isRollInvoice"><span class="label">地址、电话</span>：<input type="text" :readonly="isIssue" class="input"
                    v-model="currentDataObj.addressAndPhone" /></li>
                <li v-if="!isRollInvoice"><span class="label">开户行及账号</span>：<input type="text" :readonly="isIssue" class="input"
                    v-model="currentDataObj.bankAndAccount" /></li>
                <li v-if="isRollInvoice"><span class="label"></span><input type="text" class="input" style="display:none;" /></li>
            </ul>
        </div>
        <div class="grid-hf-col col-c">密码区</div>
        <div class="grid-hf-col col-d last">
            <p class="password-area" v-text="taxCode1"></p>
            <p class="password-area" v-text="taxCode2"></p>
            <p class="password-area" v-text="taxCode3"></p>
            <p class="password-area" v-text="taxCode4"></p>
        </div>
    </div>
</template>

<script>
// vuex helper
import { keyUtil, generateComputed } from '../store/helper'
// 组件 component
import AutoComplete from '../component/AutoComplete'
// 工具库 utils
import common from '../utils/common'
// 混入 mixins
import customerMixin from '../mixins/customerMixin'
const propMixin = {
    ...customerMixin,
    computed: {
        ...customerMixin.computed,
        ...generateComputed([{
            propName: 'currentCustomerType',
            fixedValue: 'buyer'
        }], state => state.invoiceEdit),
        ...generateComputed(['taxControlCode', 'invoiceSpecialMark'], state => state.invoiceEdit.currentData)
    }
}
export default {
    components: { AutoComplete },
    name: 'invoice-header',
    mixins: [propMixin],
    props: {
        dataObj: {
            type: Object,
            required: true
        },
        invoiceTypeCode: {
            type: String,
            required: true
        },
        isIssue: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentDataObj: {
                ...this.dataObj
            },
            debounce: common.debounce(() => {
                this.$store.commit(keyUtil.getChangeName('buyerInfo'), {...this.currentDataObj})
            }, 300)
        }
    },
    methods: {
        showSelectTrader () {
            this.currentCustomerType = 'buyer'
            this.showCustomerSelector = true
        }
    },
    computed: {
        hasTrader () {
            return true
        },
        isRollInvoice () {
            return this.invoiceTypeCode === '025'
        },
        buy () {
            let invoiceSpecialMark = this.invoiceSpecialMark
            let isRollInvoice = this.isRollInvoice
            if (invoiceSpecialMark === '02') {
                return '销售方'
            } else if (invoiceSpecialMark === '08' || isRollInvoice) {
                return '购买方'
            } else {
                return '购买单位'
            }
        },
        taxCode1 () {
            if (this.taxControlCode) {
                return this.taxControlCode.slice(0, 28)
            } else {
                return ''
            }
        },
        taxCode2 () {
            if (this.taxControlCode) {
                return this.taxControlCode.slice(28, 56)
            } else {
                return ''
            }
        },
        taxCode3 () {
            if (this.taxControlCode) {
                return this.taxControlCode.slice(56, 84)
            } else {
                return ''
            }
        },
        taxCode4 () {
            if (this.taxControlCode) {
                return this.taxControlCode.slice(84, 112)
            } else {
                return ''
            }
        }
    },
    watch: {
        dataObj: {
            deep: true,
            handler (dataObj) {
                Object.assign(this.currentDataObj, dataObj)
            }
        },
        currentDataObj: {
            deep: true,
            handler (val) {
                this.currentDataObj.taxSerial = this.currentDataObj.taxSerial.toUpperCase()
                this.debounce()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
