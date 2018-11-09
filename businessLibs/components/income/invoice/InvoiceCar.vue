/**
* 机动车发票票面
* Created by gaoguoqing on 2018/11/8.
*
*/
<template>
    <div :class="[prefixCls+'-box']">
        <div :class="[prefixCls+'-title']">
            <span><i>机动车销售统一发票</i></span>
        </div>
        <table :class="[prefixCls+'-top']">
            <tr height="30">
                <td :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">发票代码：</span>{{invoiceCarData.invoiceCode}}
                </td>
                <td :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">发票号码：</span>{{invoiceCarData.invoiceNo}}
                </td>
                <td :class="[prefixCls+'-table-td']">
                    <span :class="[prefixCls+'-table-clumn']">开票日期：</span>{{invoiceCarData.invoiceDate}}
                </td>
            </tr>
        </table>
        <table :class="[prefixCls+'-table']">
            <tr>
                <td style="width: 100px" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>机 打 代 码</p>
                    <p>机 打 号 码</p>
                    <p>机 器 编 号</p>
                </td>
                <td colspan="3" style="width: 200px" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    <p>{{invoiceCarData.invoiceCode}}</p>
                    <p>{{invoiceCarData.invoiceNo}}</p>
                    <p>{{invoiceCarData.machineCode}}</p>
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>税</p>
                    <p>控</p>
                    <p>码</p>
                </td>
                <td colspan="3" :class="[prefixCls+'-table-td',prefixCls+'-table-content']"></td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>购买方名称及</p>
                    <p>身份证号码/</p>
                    <p>组织机构代码</p>
                </td>
                <td colspan="3" style="width: 200px" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    <p v-text="invoiceCarData.buyerName"></p>
                    <p v-text="invoiceCarData.cardid"></p>
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">纳税人识别号</td>
                <td colspan="3" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.buyerTaxNo}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">车 辆 类 型</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.cartype}}
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">厂 牌 型 号</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.makeModel}}</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">产 地</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.makeAddress}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">合 格 证 号</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.certificationNo}}
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">进口证明书号</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.importBookNo}}
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">商 检 单 号</td>
                <td style="width: 150px" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.inspectionNo}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">发动机号码</td>
                <td colspan="3" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.engineNo}}
                </td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">车辆识别代号/车架号码</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.frameNo}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">价 税 合 计</td>
                <td colspan="5" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{totalPriceTaxCn}}</td>
                <td style="border: none" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">小 写</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{totalPriceTax}}</td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">销货单位名称</td>
                <td colspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.sellerName}}
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">电 话</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.phoneNo}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">纳税人识别号</td>
                <td colspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{invoiceCarData.sellerTaxNo}}
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">账 号</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.account}}
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">地 址</td>
                <td colspan="4" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.address}}
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">开 户 银 行</td>
                <td colspan="2" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.bank}}</td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>增值税税率</p>
                    <p>或 征 收 率</p>
                </td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    {{getGoodsTaxRate(invoiceCarData.goodsTaxRate)}}
                </td>
                <td style="width: 100px" :class="[prefixCls+'-table-td',prefixCls+'-table-column']">增值税税额</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{totalTax}}</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">
                    <p>主管税务机</p>
                    <p>关及代码</p>
                </td>
                <td colspan="3" :class="[prefixCls+'-table-td',prefixCls+'-table-content']">
                    <p>{{invoiceCarData.competentTaxName}}</p>
                    <p>{{invoiceCarData.competentTaxCode}}</p>
                </td>
            </tr>
            <tr>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">不 含 税 价</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{totalPrice}}</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">完税凭证号码</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.taxReceiptNo}}</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">吨 位</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.tonnage}}</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-column']">限 乘 人 数</td>
                <td :class="[prefixCls+'-table-td',prefixCls+'-table-content']">{{invoiceCarData.maxCapacity}}</td>

            </tr>
        </table>
    </div>
</template>

<script>
import { prefix } from '../../../utils/common'

const prefixCls = prefix + 'invoice'
export default {
    name: 'InvoiceCar',
    data () {
        return {
            prefixCls: prefixCls,
            totalPriceTaxCn: '',
            totalPriceTax: '',
            totalTax: '',
            totalPrice: ''
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
            if (this.invoiceData.invoiceTotalPrice) {
                this.totalPrice = '￥' + this.invoiceData.invoiceTotalPrice.toFixed(2)
            } else {
                this.totalPrice = ''
            }
            if (this.invoiceData.invoiceTotalTax) {
                this.totalTax = '￥' + this.invoiceData.invoiceTotalTax.toFixed(2)
            } else {
                this.totalTax = ''
            }
            if (this.invoiceData.invoiceTotalPriceTax) {
                this.totalPriceTax = '￥' + this.invoiceData.invoiceTotalPriceTax.toFixed(2)
            } else {
                this.totalPriceTax = ''
            }
            if (this.invoiceData.invoiceTotalPriceTaxCn) {
                this.totalPriceTaxCn = '⊗' + this.invoiceData.invoiceTotalPriceTaxCn
            } else {
                this.totalPriceTaxCn = ''
            }
            return this.invoiceData
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
