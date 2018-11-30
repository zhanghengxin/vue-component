<template>
    <div>
        <table :class="[prefixCls+'-table']" style="border: none;">
            <tr>
                <td width="30%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    货物或应税劳务、服务名称
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
            <tr v-if="!showListModal">
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-content']">
                    &nbsp; <a @click="openDetailList">查看货物明细清单</a>
                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                    &nbsp;
                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
            </tr>
        </table>
        <table :class="[prefixCls+'-table']" style="border: none;">
            <tr>
                <td width="30%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                    合计
                </td>
                <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td width="15%" :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                    {{monenyData.totalPrice}}
                </td>
                <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">

                </td>
                <td width="15%" :class="[prefixCls+'-table-right']">
                    {{monenyData.totalTax}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-total',prefixCls+'-table-column']">
                    价税合计（大写）
                </td>
                <td colspan="4" :class="[prefixCls+'-table-total',prefixCls+'-table-left']">
                    {{monenyData.totalPriceTaxCn}}
                </td>
                <td colspan="3" :class="[prefixCls+'-table-total',prefixCls+'-table-column']">
                    (小写) {{monenyData.totalPriceTax}}
                </td>
            </tr>
        </table>
        <b-modal
            v-model="isShow"
            title="货物明细清单"
            width="1200"
        >
            <invoice-goods-list
                :monenyData="monenyData"
                :invoiceData="invoiceData"
                :isToll="isToll"
                :invoiceDetail='detailData'>
            </invoice-goods-list>
            <div slot="footer"></div>
        </b-modal>
    </div>
</template>


<script>
import { prefix } from '../../../utils/common'
import InvoiceGoodsList from './InvoiceGoodsList.vue'

const prefixCls = prefix + 'invoice'

export default {
    name: 'invoice-detail',
    components: {InvoiceGoodsList},
    data () {
        return {
            prefixCls: prefixCls,
            isShow: false
        }
    },
    props: {
        detailData: {
            type: Array,
            default: function () {
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
            default: function () {
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
    computed: {
        invoiceDetail () {

            if (this.detailData.length < 9) {
                return this.detailData
            } else {
                return []
            }
        },
        showListModal () {
            if (this.detailData.length < 9) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        getGoodsTaxRate (goodsTaxRate) {
            if (goodsTaxRate) {
                return goodsTaxRate * 100 + '%'
            } else if (goodsTaxRate == 0) {
                return '0%'
            } else {
                return ''
            }
        },
        openDetailList () {
            this.isShow = true
        }
    }
}
</script>

