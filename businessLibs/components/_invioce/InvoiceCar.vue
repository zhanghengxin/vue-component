<template>

    <div class="yulan_wrap_left">

        <div class="cms_r_main">
            <h1 class="invoice_tit"><span><i>机动车销售统一发票</i></span></h1>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr height="30">
                        <td class="align_left">发票代码：
                            <span class="content_td_blue" v-text="InvoiceCarData.invoiceCode"> </span>
                        </td>
                        <td>&nbsp;</td>
                        <td class="align_left">发票号码：
                            <span class="content_td_blue" v-text="InvoiceCarData.invoiceNo"> </span>
                        </td>
                        <td>&nbsp;</td>
                        <td class="align_left">开票日期：
                            <span class="content_td_blue" v-text="InvoiceCarData.invoiceDate"> </span>
                        </td>
                        <td>&nbsp;</td>
                        <td class="align_left">&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <table class="fppy_table" style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    <td class="align_center"><p style="width: 99px;">机 打 代 码</p>
                        <p>机 打 号 码</p>
                        <p>机 器 编 号</p></td>
                    <td class="align_left" nowrap="" colspan="3">
                        <p class="content_td_blue" v-text="InvoiceCarData.invoiceCode"></p>
                        <p class="content_td_blue" v-text="InvoiceCarData.invoiceNo"></p>
                        <p class="content_td_blue" v-text="InvoiceCarData.machineCode"></p></td>
                    <td class="align_center"><p>税</p>
                        <p>控</p>
                        <p>码</p></td>
                    <td class="align_center" colspan="6">&nbsp;</td>
                </tr>
                <tr>
                    <td class="align_center"><p>购买方名称及</p>
                        <p>身份证号码/</p>
                        <p>组织机构代码</p></td>
                    <td class="align_left" nowrap="" colspan="4">
                        <p class="content_td_blue" v-text="InvoiceCarData.buyerName"></p>
                        <p class="content_td_blue" v-text="InvoiceCarData.cardid"></p>
                    </td>
                    <td class="align_center">纳税人识别号</td>
                    <td class="align_left" colspan="4">
                        <p class="content_td_blue" v-text="InvoiceCarData.buyerTaxNo"></p>
                    </td>
                </tr>
                <tr>
                    <td class="align_center"><p>车 辆 类 型</p></td>
                    <td class="align_left" nowrap="" colspan="2">
                        <span class="content_td_blue" v-text="InvoiceCarData.cartype"> </span>
                    </td>
                    <td class="align_center" nowrap="">厂牌型号</td>
                    <td class="align_left" colspan="3">
                        <p class="content_td_blue" v-text="InvoiceCarData.makeModel"></p>
                    </td>
                    <td class="align_center">产地</td>
                    <td class="align_left" colspan="2">
                        <p class="content_td_blue" v-text="InvoiceCarData.makeAddress"></p></td>
                </tr>
                <tr>
                    <td class="align_center">合 格 证 号</td>
                    <td class="align_left" nowrap="" colspan="2">
                        <span class="content_td_blue" v-text="InvoiceCarData.certificationNo"> </span>
                    </td>
                    <td class="align_center" nowrap="" colspan="2">进口证明书号</td>
                    <td class="align_left" colspan="2">
                        <span class="content_td_blue" v-text="InvoiceCarData.importBookNo"> </span>
                    </td>
                    <td class="align_center">商检单号</td>
                    <td class="align_left content_td_blue" colspan="2" v-text="InvoiceCarData.inspectionNo"></td>
                </tr>
                <tr>
                    <td class="align_center">发动机号码</td>
                    <td class="align_left content_td_blue" nowrap="" colspan="4" v-text="InvoiceCarData.engineNo"></td>
                    <td class="align_center" nowrap="">车辆识别代号/车架号码</td>
                    <td class="align_left content_td_blue" nowrap="" colspan="4" v-text="InvoiceCarData.frameNo"></td>
                </tr>
                <tr>
                    <td class="align_center">价 税 合 计</td>
                    <td class="borderLeft align_left" nowrap="" colspan="5">
                        <span class="content_td_blue align_left" v-text="totalPriceTaxCn"> </span>
                    </td>
                    <td class="borderRight align_right" nowrap="" colspan="4">
                        <span style="padding: 0px 20px;">小写</span>
                        <span class="content_td_blue align_right" v-text="totalPriceTax"> </span>
                    </td>
                </tr>
                <tr>
                    <td class="align_center">销货单位名称</td>
                    <td class="align_left content_td_blue" nowrap="" colspan="4"
                        v-text="InvoiceCarData.sellerName"></td>
                    <td class="align_center">电话</td>
                    <td class="align_left content_td_blue" colspan="4" v-text="InvoiceCarData.phoneNo"></td>
                </tr>
                <tr>
                    <td class="align_center">纳税人识别号</td>
                    <td class="align_left content_td_blue" nowrap="" colspan="4" v-text="InvoiceCarData.sellerTaxNo"></td>
                    <td class="align_center">账号</td>
                    <td class="align_left content_td_blue" colspan="4" v-text="InvoiceCarData.account"></td>
                </tr>
                <tr>
                    <td class="align_center">地 址</td>
                    <td class="align_left" colspan="3">
                        <p class="content_td_blue" v-text="InvoiceCarData.address"></p>
                    </td>
                    <td class="align_center" nowrap="">开户银行</td>
                    <td class="align_left" colspan="5">
                        <p class="content_td_blue" v-text="InvoiceCarData.bank"></p>
                    </td>
                </tr>
                <tr>
                    <td class="align_center">
                        <p>增值税税率</p>
                        <p>或 征 收 率</p>
                    </td>
                    <td width="20%" nowrap="">
                        <p class="content_td_blue align_center"
                           v-text="getGoodsTaxRate(InvoiceCarData.goodsTaxRate)">
                        </p>
                    </td>
                    <td class="align_center" nowrap=""><p>增值税</p>
                        <p>税额</p></td>
                    <td class="align_center" nowrap="">
                        <p class="content_td_blue" v-text="totalTax"></p>
                    </td>
                    <td class="align_center"><p>主管税务</p>
                        <p>机关及代码</p></td>
                    <td class="align_left" colspan="5">
                        <p class="content_td_blue">
                            <span>{{ InvoiceCarData.competentTaxName }}</span>
                            <br>{{InvoiceCarData.competentTaxCode }}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td width="10%" class="align_center">不 含 税 价</td>
                    <td width="20%" class="align_left" nowrap="" colspan="2">小写
                        <span class="content_td_blue" v-text="totalPrice"> </span>
                    </td>
                    <td width="15%" class="align_center" nowrap="">完税凭证号码</td>
                    <td width="24%" class="align_center" colspan="2">
                        <p class="content_td_blue" v-text="InvoiceCarData.taxReceiptNo"></p>
                    </td>
                    <td width="5%" class="align_center">吨位</td>
                    <td width="8%" class="align_center">
                        <p class="content_td_blue" v-text="InvoiceCarData.tonnage"></p>
                    </td>
                    <td width="10%" class="align_center">限乘人数</td>
                    <td width="8%" class="align_center">
                        <p class="content_td_blue" v-text="InvoiceCarData.maxCapacity"></p>
                    </td>
                </tr>
                <!--表头-->
                <!--表头结束-->
                </tbody>
            </table>
        </div>


    </div>


</template>

<script>
    export default {
        data() {
            return {
                totalTax: '',//税额
                totalPrice: '',//不含税小写
                totalPriceTax: '',//价税合计小写
                totalPriceTaxCn: ''//价税合计大写
            }
        },
        watch: {
            InvoiceCarData() {
                this.calcPrice()
            }
        },
        methods: {
            calcPrice() {
                if (this.InvoiceCarData.invoiceTotalPrice) {
                    this.totalPrice = '￥' + this.InvoiceCarData.invoiceTotalPrice.toFixed(2)
                } else {
                    this.totalPrice = ''
                }
                if (this.InvoiceCarData.invoiceTotalTax) {
                    this.totalTax = '￥' + this.InvoiceCarData.invoiceTotalTax.toFixed(2)
                } else {
                    this.totalTax = ''
                }
                if (this.InvoiceCarData.invoiceTotalPriceTax) {
                    this.totalPriceTax = '￥' + this.InvoiceCarData.invoiceTotalPriceTax.toFixed(2)
                } else {
                    this.totalPriceTax = ''
                }
                if (this.InvoiceCarData.invoiceTotalPriceTaxCn) {
                    this.totalPriceTaxCn = '⊗' + this.InvoiceCarData.invoiceTotalPriceTaxCn
                } else {
                    this.totalPriceTaxCn = ''
                }
            },
            getGoodsTaxRate(goodsTaxRate) {
                if (goodsTaxRate) {
                    return goodsTaxRate * 100 + "%"
                } else {
                    return "0%"
                }
            }
        },
        props: {
            InvoiceCarData: {
                type: Object,
                default: function () {
                    return {
                        invoiceCode: '发票代码机打代码',
                        invoiceNo: '发票号码机打号码',
                        invoiceDate: '开票日期',
                        machineCode: '机器编号',
                        buyerName: '购方名称',
                        cardid: '身份证号',
                        buyerTaxNo: '购方纳税人识别号',
                        cartype: '车辆类型',
                        makeModel: '厂牌型号',
                        makeAddress: '产地',
                        certificationNo: '合格证号',
                        importBookNo: '进口证明书号',
                        inspectionNo: '商检单号',
                        engineNo: '发动机号码',
                        frameNo: '车辆识别代号/车架号码',
                        invoiceTotalPriceTax: '价税合计小写',
                        sellerName: '销货单位名称',
                        phoneNo: '电话',
                        sellerTaxNo: '销方税号',
                        account: '账号',
                        address: '地址',
                        bank: '开户银行',
                        goodsTaxRate: '税率',
                        invoiceTotalTax: '税额',
                        competentTaxName: '主管税务机关',
                        competentTaxCode: '税务机关代码',
                        invoiceTotalPrice: '不含税价',
                        taxReceiptNo: '完税凭证号码',
                        tonnage: '吨位',
                        maxCapacity: '限乘人数',
                        invoiceTotalPriceTaxCn: '金额大写'
                    }
                }
            }
        },
    }
</script>

<style>
</style>
