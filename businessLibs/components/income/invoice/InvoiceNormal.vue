<template>
    <div :class="[prefixCls+'-box',prefixCls+'-normal']">
        <div :class="[prefixCls+'-title']">
            <span><i>{{invoiceNormalData.title}}</i></span>
        </div>
        <ul :class="[prefixCls+'-ul']">
            <li :style="{ opacity: invoiceNormalData.checkCode ? 1:0 }">校验码：
                <i :class="[prefixCls+'-ul-content']">
                    {{invoiceNormalData.checkCode}}
                </i>
            </li>
            <li :style="{ opacity: invoiceNormalData.machineCode ? 1:0  }">机器编号：
                <i :class="[prefixCls+'-ul-content']" v-text="invoiceNormalData.machineCode"></i>
            </li>
            <li>开票日期：
                <i :class="[prefixCls+'-ul-content']" v-text='invoiceNormalData.invoiceDateStr'></i>
            </li>
        </ul>
        <div :class="[prefixCls+'-type']">
            <span>{{invoiceNormalData.invoiceType}}</span>
        </div>
        <div v-if="isToll" :class="[prefixCls+'-toll-content']">
            通行费<span data-v-aaf12130="" style="color: red;">{{invoiceNormalData.tollSign}}</span>
        </div>
        <table :class="[prefixCls+'-top']">
            <tr height="30">
                <td style="width: 180px" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">发票代码：</span>{{invoiceNormalData.invoiceCode}}
                </td>
                <td :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">发票号码：</span>{{invoiceNormalData.invoiceNo}}
                </td>
            </tr>
        </table>
        <table :class="[prefixCls+'-table']">
            <!--购方信息 start-->
            <tr>
                <td rowspan="4" width="20" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>购</p>
                    <p>买</p>
                    <p>方</p>
                </td>
                <td width="105" :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    名称：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.buyerName}}
                </td>
                <td width="20" rowspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>密</p>
                    <p>码</p>
                    <p>区</p>
                </td>
                <td width="310" rowspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-content']"></td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    纳税人识别号：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.buyerTaxNo}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    地址、电话：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.buyerAddressPhone}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    开户行及账号：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.buyerBankAccount}}
                </td>
            </tr>
            <!--购方信息 end-->
            <tr>
                <td colspan="5">
                    <invoice-detail
                        :isToll="isToll"
                        :invoiceData='invoiceData'
                        :detailData="detailList"
                        :monenyData="monenyData">
                    </invoice-detail>
                </td>
            </tr>
            <!--销方信息 start-->
            <tr>
                <td rowspan="4" width="20" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>销</p>
                    <p>售</p>
                    <p>方</p>
                </td>
                <td width="105" :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    名称：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.sellerName}}
                </td>
                <td width="20" rowspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>备</p>
                    <p>注</p>
                </td>
                <td width="310" rowspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceNormalData.remarks}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    纳税人识别号：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.sellerTaxNo}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    地址、电话：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.sellerAddressPhone}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column',prefixCls+'-table-name']">
                    开户行及账号：
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content',prefixCls+'-table-name']">
                    {{invoiceNormalData.sellerBankAccount}}
                </td>
            </tr>
            <!--购方信息 end-->
        </table>
    </div>
</template>

<script>
import { prefix } from '../../../utils/common'
import InvoiceDetail from './InvoiceDetail'

const prefixCls = prefix + 'invoice'
export default {
    name: 'InvoiceNormal',
    components: {InvoiceDetail},
    data () {
        return {
            prefixCls: prefixCls,
            isToll: false, //是否是通行费发票
            monenyData: {
                totalPriceTaxCn: '',
                totalPriceTax: '',
                totalTax: '',
                totalPrice: ''
            }
        }
    },
    props: {
        invoiceData: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        detailList () {
            let result = this.invoiceData
            if (result.detailList && result.detailList.results) {
                return result.detailList.results
            }
            return [{}]
        },
        invoiceNormalData () {
            let result = this.invoiceData
            var type = result.invoiceTypeCode
            if (result.invoiceTotalPrice) {
                this.monenyData.totalPrice = '￥' + result.invoiceTotalPrice.toFixed(2)
            } else {
                this.monenyData.totalPrice = ''
            }
            if (result.invoiceTotalTax) {
                this.monenyData.totalTax = '￥' + result.invoiceTotalTax.toFixed(2)
            } else {
                this.monenyData.totalTax = ''
            }
            if (result.invoiceTotalPriceTax) {
                this.monenyData.totalPriceTax = '￥' + result.invoiceTotalPriceTax.toFixed(2)
            } else {
                this.monenyData.totalPriceTax = ''
            }
            if (result.invoiceTotalPriceTaxCn) {
                this.monenyData.totalPriceTaxCn = '⊗' + result.invoiceTotalPriceTaxCn
            } else {
                this.monenyData.totalPriceTaxCn = ''
            }
            if (result.invoiceDate) {
                let temDate = result.invoiceDate.split('-')
                result.invoiceDateStr = temDate[0] + '年' + temDate[1] + '月' + temDate[2] + '日'
            } else {
                result.invoiceDateStr = ''
            }
            switch (type) {
                case '01':
                    result.title = '增值税专用发票'
                    result.invoiceType = '专'
                    break
                case '04':
                    result.title = '增值税普通发票'
                    result.invoiceType = '普'
                    break
                case '10':
                    result.title = '增值税普通发票（电子）'
                    result.invoiceType = '电'
                    break
                case '14':
                    result.title = '增值税电子普通发票'
                    result.invoiceType = '电'
                    break
            }
            switch (type) {
                case '14':
                    this.isToll = true
                    break
                default :
                    this.isToll = false
            }
            if (result.tollSign == '06') {
                result.tollSign = '[可认证]'
            } else {
                result.tollSign = '[不可认证]'
            }
            return result
        }
    }
}
</script>