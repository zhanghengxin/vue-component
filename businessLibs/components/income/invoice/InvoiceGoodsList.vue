<template>
    <div :class="[prefixCls+'-goods']">
        <div :class="[prefixCls+'-title']">
            <span><i>销 售 货 物 或 提 供 应 税 劳 务 清 单</i></span>
        </div>
        <ul :class="[prefixCls+'-ul']">
            <li>购买方名称：
                <i :class="[prefixCls+'-ul-content']">
                    {{invoiceData.buyerName}}
                </i>
            </li>
            <li>销售方名称：
                <i :class="[prefixCls+'-ul-content']">
                    {{invoiceData.sellerName}}
                </i>
            </li>
        </ul>
        <table style="margin: 3px 0" :class="[prefixCls+'-top']">
            <tr height="30">
                <td :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">所属增值税专用发票代码：</span>{{invoiceData.invoiceCode}}
                </td>
                <td :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">发票号码：</span>{{invoiceData.invoiceNo}}
                </td>
            </tr>
        </table>
        <table :class="[prefixCls+'-table']">
            <tr>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    序号
                </td>
                <td width="25%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    货物（劳务）名称
                </td>
                <td v-if="isToll" width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    车牌号
                </td>
                <td v-if="isToll" width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    类型
                </td>
                <td v-if="isToll" width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    通行日期起
                </td>
                <td v-if="isToll" width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    通行日期止
                </td>

                <td v-if="!isToll" width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    规格型号
                </td>
                <td v-if="!isToll" width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    单位
                </td>
                <td v-if="!isToll" width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    数量
                </td>
                <td v-if="!isToll" width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    单价
                </td>
                <td width="15%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    金额
                </td>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    税率
                </td>
                <td width="15%" :class="[prefixCls+'-table-column']">
                    税额
                </td>
            </tr>
            <tr v-for="(item,index) in invoiceDetail">
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    {{index + 1}}
                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    {{item.goodsName}}
                </td>
                <td v-if="isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    {{item.LicensePlateNum}}
                </td>
                <td v-if="isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    {{item.Type}}
                </td>
                <td v-if="isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{item.CurrentDateStart}}
                </td>
                <td v-if="isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{item.CurrentDateEnd}}
                </td>
                <td v-if="!isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    {{item.goodsSpecification}}
                </td>
                <td v-if="!isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    {{item.goodsUnit}}
                </td>
                <td v-if="!isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{item.goodsQuantity}}
                </td>
                <td v-if="!isToll" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{item.goodsPrice}}
                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{item.goodsTotalPrice}}
                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{getGoodsTaxRate(item.goodsTaxRate)}}
                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{item.goodsTotalTax}}
                </td>
            </tr>
        </table>
        <table :class="[prefixCls+'-table']" style="border-top:none ">
            <tr>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    小计
                </td>
                <td width="25%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']"></td>
                <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']"></td>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']"></td>
                <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']"></td>
                <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']"></td>
                <td width="15%" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{monenyData.totalPrice}}
                </td>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']"></td>
                <td width="15%" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{monenyData.totalTax}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-total',prefixCls+'-table-column']">
                    总计
                </td>
                <td colspan="4" :class="[prefixCls+'-table-total',prefixCls+'-table-left']">
                    {{monenyData.totalPriceTaxCn}}
                </td>
                <td colspan="4" :class="[prefixCls+'-table-total',prefixCls+'-table-right']">
                    {{monenyData.totalPriceTax}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-total',prefixCls+'-table-column']">
                    备注
                </td>
                <td colspan="8" :class="[prefixCls+'-table-total',prefixCls+'-table-left']">
                    {{invoiceData.remarks}}
                </td>
            </tr>
        </table>
        <table style="margin-top: 20px" :class="[prefixCls+'-top']">
            <tr height="30">
                <td width="85%" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">销售方（章）:</span>
                </td>
                <td width="15%" :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">填开日期:</span>{{invoiceData.createDate}}
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import { prefix } from '../../../utils/common'

const prefixCls = prefix + 'invoice'

export default {
    name: 'invoice-goods-list',
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        invoiceDetail: {
            type: Array,
            default () {
                return []
            }
        },
        invoiceData: {
            type: Object,
            default () {
                return {}
            }
        },
        monenyData: {
            type: Object,
            default () {
                return {
                    totalPriceTaxCn: '',
                    totalPriceTax: '',
                    totalTax: '',
                    totalPrice: ''
                }
            }
        },
        isToll: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getGoodsTaxRate (goodsTaxRate) {
            console.log('isToll', this.isToll)
            if (goodsTaxRate) {
                return goodsTaxRate * 100 + '%'
            } else if (goodsTaxRate == 0) {
                return '0%'
            } else {
                return ''
            }
        }
    }
}
</script>

