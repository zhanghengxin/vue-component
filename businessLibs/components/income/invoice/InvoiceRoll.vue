/**
* 卷票票面
* Created by gaoguoqing on 2018/11/20.
*
*/
<template>
    <div :class="[prefixCls+'-roll-box']">
        <div :class="[prefixCls+'-title']">
            <span><i>{{invoiceCarData.title}}</i></span>
        </div>
        <table :class="[prefixCls+'-table']">
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">发票代码：</span>{{invoiceCarData.invoiceCode}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">发票号码：</span>{{invoiceCarData.invoiceNo}}
                </td>
            </tr>
            <tr>
                <td colspan="2" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">机打号码：</span>{{invoiceCarData.invoiceNo}}
                </td>
                <td colspan="2" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">机器编码：</span>{{invoiceCarData.machineCode}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">销售方名称：</span>{{invoiceCarData.sellerName}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">销售方税号：</span>{{invoiceCarData.sellerTaxNo}}
                </td>
            </tr>
            <tr>
                <td colspan="2" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">开票日期：</span>{{invoiceCarData.invoiceDate}}
                </td>
                <td colspan="2" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">收货员：</span>{{invoiceCarData.receivingClerk}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">购买方单位：</span>{{invoiceCarData.buyerName}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">购买方税号：</span>{{invoiceCarData.buyerTaxNo}}
                </td>
            </tr>
            <tr>
                <td style="width: 180px" :class="[prefixCls+'-table-column']">&nbsp;</td>
                <td style="width: 60px" :class="[prefixCls+'-table-column']">&nbsp;</td>
                <td style="width: 80px" :class="[prefixCls+'-table-column']">&nbsp;</td>
                <td :class="[prefixCls+'-table-column']">&nbsp;</td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-column']">项目</td>
                <td :class="[prefixCls+'-table-column']">单价</td>
                <td :class="[prefixCls+'-table-column']">数量</td>
                <td :class="[prefixCls+'-table-column']">金额</td>
            </tr>
            <tr v-for="(item,index) in detailList">
                <td :class="[prefixCls+'-table-content']">{{item.goodsName}}</td>
                <td :class="[prefixCls+'-table-content']">{{item.goodsPrice}}</td>
                <td :class="[prefixCls+'-table-content']">{{item.goodsQuantity}}</td>
                <td :class="[prefixCls+'-table-content']">{{item.goodsTotalPrice}}</td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">合计金额（小写）：</span>{{monenyData.totalPriceTax}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">合计金额（大写）：</span>{{monenyData.totalPriceTaxCn}}
                </td>
            </tr>
            <tr>
                <td colspan="4" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-column']">校验码：</span>{{invoiceCarData.checkCode}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { prefix } from '../../../utils/common'

const prefixCls = prefix + 'invoice'
export default {
    name: 'InvoiceRoll',
    data () {
        return {
            prefixCls: prefixCls,
            monenyData: {
                totalPriceTaxCn: '',
                totalPriceTax: ''
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
        invoiceCarData () {
            let result = this.invoiceData
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
            result.title = '增值税普通发票（卷票）'
            return result
        },
        detailList () {
            let result = this.invoiceData
            if (result.detailList && result.detailList.results) {
                return result.detailList.results
            }
            return [{}]
        }
    },
    methods: {
        getGoodsTaxRate (goodsTaxRate) {
            if (goodsTaxRate) {
                return goodsTaxRate * 100 + '%'
            } else {
                return '0%'
            }
        }
    }
}
</script>
