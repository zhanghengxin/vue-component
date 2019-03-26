<template>

    <div
        style="margin-left: 150px ; padding: 20px; border: 1px dashed rgb(204, 204, 204); width: 500px; line-height: 30px;">

        <h1 class="invoice_tit"><span><i>增值税普通发票（卷票）<br/></i></span></h1>

        <table width="100%" class="fppy_table_box" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td class="align_left" colspan="4">发票代码：<span class="content_td_blue" id="fpdm_jp"
                                                              v-text="InvoiceRollData.invoiceCode"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">发票号码：<span class="content_td_blue" id="fphm_jp"
                                                              v-text="InvoiceRollData.invoiceNo"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="2">机打号码：<span id="fphmjp" style="color: rgb(0, 0, 0);"
                                                              v-text="InvoiceRollData.invoiceNo"> </span></td>
                <td class="align_left" colspan="2">机器编码：<span class="content_td_blue" id="sbbh_jp"
                                                              v-text="InvoiceRollData.machineCode"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">销售方名称：<span class="content_td_blue" id="xfmc_jp"
                                                               v-text="InvoiceRollData.sellerName"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">销售方税号：<span class="content_td_blue" id="xfsh_jp"
                                                               v-text="InvoiceRollData.sellerTaxNo"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="2">开票日期：<span class="content_td_blue" id="kprq_jp"
                                                              v-text="InvoiceRollData.invoiceDate"> </span></td>
                <td class="align_left" colspan="2">收货员：<span class="content_td_blue" id="shy_jp"
                                                             v-text="InvoiceRollData.receivingClerk"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">购买方单位：<span class="content_td_blue" id="gfmc_jp"
                                                               v-text="InvoiceRollData.buyerName"> </span></td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">购买方税号：<span class="content_td_blue" id="gfsh_jp"
                                                               v-text="InvoiceRollData.buyerTaxNo"> </span></td>
            </tr>
            <tr>
                <td class="align_center">&nbsp;</td>
                <td class="align_center">&nbsp;</td>
                <td class="align_center">&nbsp;</td>
                <td class="align_center">&nbsp;</td>
            </tr>
            <tr id="tab_head_jp">
                <td class="align_center">项目</td>
                <td class="align_center">单价</td>
                <td class="align_center">数量</td>
                <td class="align_center">金额</td>
            </tr>
            <tr v-for="item in goodsList" v-if="ifMoreThan8Records">
                <td class="align_center"><span class="content_td_blue">{{ item.goodsName }}</span></td>
                <td class="align_center"><span class="content_td_blue">{{ item.goodsPrice }}</span></td>
                <td class="align_center"><span class="content_td_blue">{{ item.goodsQuantity }}</span></td>
                <td class="align_center"><span class="content_td_blue">{{ item.goodsTotalPrice }}</span></td>
            </tr>
            <tr v-else="ifMoreThan8Records">
                <td class="align_center"><span class="content_td_blue">
						<a href="javascript:;" @click="modalGoods = true">查看货物明细清单</a>
						<Modal v-model="modalGoods" width="1204px" class-name="vertical-center-modal">
							<invoiceGoodslist :GoodsList="goodsList" :InvoiceData="InvoiceData"></invoiceGoodslist>
						</Modal>
					</span></td>
                <td class="align_center"><span class="content_td_blue">&nbsp;</span></td>
                <td class="align_center"><span class="content_td_blue">&nbsp;</span></td>
                <td class="align_center"><span class="content_td_blue">&nbsp;</span></td>
            </tr>

            <tr>
                <td class="align_left" colspan="4">合计金额（小写）：<span class="content_td_blue" id="jshj_jp">{{ '￥' + InvoiceRollData.invoiceTotalPriceTax }}</span>
                </td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">合计金额（大写）：<span class="content_td_blue" id="dxjshj_jp">{{ '⊗' + InvoiceRollData.invoiceTotalPriceTaxCn }}</span>
                </td>
            </tr>
            <tr>
                <td class="align_left" colspan="4">校验码：<span class="content_td_blue" id="jym_jp"
                                                             v-text="InvoiceRollData.checkCode"> </span></td>
            </tr>
            </tbody>
        </table>

    </div>

</template>

<script>
import InvoiceGoodslist from '@/components/publics/_invioce/InvoiceGoodslist'

export default {
    data () {
        return {
            goodsList: ''
        }
    },
    components: {
        InvoiceGoodslist
    },

    watch: {
        InvoiceRollData () {
            this.initGoodsList()
        }
    },
    methods: {
        initGoodsList () {
            if (this.InvoiceRollData.detailList) {
                this.goodsList = this.InvoiceRollData.detailList.results || this.InvoiceRollData.detailList
            } else {
                this.goodsList = this.InvoiceRollData.detailList
            }
        }
    },
    computed: {
        ifMoreThan8Records () {
            if (this.goodsList.length < 9) {
                return true
            } else {
                return false
            }
        }
    },
    props: {
        InvoiceRollData: {
            type: Object,
            default: function () {
                return {
                    invoiceCode: '发票代码',
                    invoiceNo: '发票号码/机打号码',
                    machineCode: '机器编码',
                    sellerName: '销货单位名称',
                    sellerTaxNo: '销方税号',
                    invoiceDate: '开票日期',
                    receivingClerk: '收货员',
                    buyerName: '购方名称',
                    buyerTaxNo: '购方税号',
                    invoiceCheckCode: '校验码',
                    invoiceTotalPrice: '合计金额',
                    invoiceTotalPriceTaxCn: '合计金额大写'
                }
            }
        }
    }
}
</script>

<style>

</style>