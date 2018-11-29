<template>
    <div>
        <div class="yulan_wrap_left">
            <div class="tabPage-zzszyfp">
                <!--公共样式部分 发票类型 发票状态 灰层-->
                <div class="invoice_base">
                    <p class="invoice_type" v-if="InvoiceType"><span v-text="InvoiceType"></span></p>
                    <p class="invoice_deductible">通行费<span v-text="tollSign" style="color: red"></span></p>
                    <span class="invoice_state"
                          :class="{'outcontrol': InvoiceTollData.invoiceStatus ==='1', 'void': InvoiceTollData.invoiceStatus==='2','red': InvoiceTollData.invoiceStatus==='3','abnormal': InvoiceTollData.invoiceStatus==='4'}"></span>
                    <!--1-失控：outcontrol，2-作废：void，3-红冲：red，4-异常：abnormal-->
                    <!--<div class="mask"></div>-->
                    <div class="mask" v-if="isShow"></div>
                </div>
                <h1 class="invoice_tit"><span><i v-text="title"></i></span></h1>
                <ul class="invoice_top_info clearfix">
                    <li>发票代码：<span><i class="content_td_blue" v-text='InvoiceTollData.invoiceCode'></i></span></li>
                    <li>发票号码：<span><i class="content_td_blue" v-text='InvoiceTollData.invoiceNo'></i></span></li>
                </ul>
                <ul class="invoice_top_info_right clearfix">
                    <li v-bind:class="{ opacity: !InvoiceTollData.invoiceCheckCode }">校验码：<span><i
                            class="content_td_blue"
                            v-text="InvoiceTollData.invoiceCheckCode"></i></span>
                    </li>
                    <li v-bind:class="{ opacity: !InvoiceTollData.machineCode }">机器编号：<span><i class="content_td_blue"
                                                                                               v-text="InvoiceTollData.machineCode"></i></span>
                    </li>
                    <li>开票日期：<span><i class="content_td_blue">{{ InvoiceTollData.invoiceDate }}</i></span></li>
                </ul>
                <table class="fppy_table" style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td width="20" class="align_center" rowspan="4">
                            <p>购</p>
                            <p>买</p>
                            <p>方</p>
                        </td>
                        <td width="105" class="align_left borderNo">名称：</td>
                        <td class="align_left borderNo bgcolorWhite"><span class="content_td_blue"
                                                                           v-text="InvoiceTollData.buyerName"> </span>
                        </td>
                        <td width="20" class="align_center" rowspan="4">
                            <p>密</p>
                            <p>码</p>
                            <p>区</p>
                        </td>
                        <td width="310" class="align_left " nowrap="" rowspan="4">&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo">纳税人识别号：</td>
                        <td class="align_left borderNo" nowrap=""><span class="content_td_blue"
                                                                        v-text="InvoiceTollData.buyerTaxNo"> </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">地址、电话：</td>
                        <td class="align_left borderNo" valign="top"><span class="content_td_blue"
                                                                           v-text="InvoiceTollData.buyerAddressPhone"> </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">开户行及账号：</td>
                        <td class="align_left borderNo" valign="top"><span class="content_td_blue"
                                                                           v-text="InvoiceTollData.buyerBankAccount"> </span>
                        </td>
                    </tr>
                    <!--表头-->
                    <tr>
                        <td colspan="5">
                            <table class="fppy_table_box" style="width: 100%;" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr id="tab_head_zp">
                                    <td width="30%" class="align_center borderRight">货物或应税劳务、服务名称</td>
                                    <td width="10%" class="align_center borderRight">车牌号</td>
                                    <td width="5%" class="align_center borderRight">类型</td>
                                    <td width="10%" class="align_center borderRight">通行日期起</td>
                                    <td width="10%" class="align_center borderRight">通行日期止</td>
                                    <td width="15%" class="align_center borderRight">金额</td>
                                    <td width="5%" class="align_center borderRight">税率</td>
                                    <td width="15%" class="align_center">税额</td>
                                </tr>
                                <!--商品列表-->
                                <tr v-for="item in goodsList" v-if="ifMoreThan8Records">
                                    <td class="align_left borderRight"><span class="content_td_blue"
                                                                             v-text="item.goodsName"> </span></td>
                                    <td class="align_left borderRight"><span class="content_td_blue"
                                                                             v-text="item.LicensePlateNum"> </span>
                                    </td>
                                    <td class="align_left borderRight"><span class="content_td_blue"
                                                                             v-text="item.Type"> </span></td>
                                    <td class="align_right borderRight"><span class="content_td_blue"
                                                                              v-text="item.CurrentDateStart"> </span>
                                    </td>
                                    <td class="align_right borderRight"><span class="content_td_blue"
                                                                              v-text="item.CurrentDateEnd"> </span></td>
                                    <td class="align_right borderRight"><span class="content_td_blue"
                                                                              v-text="item.goodsTotalPrice"> </span>
                                    </td>
                                    <td class="align_right borderRight"><span class="content_td_blue"
                                                                              v-text="getGoodsTaxRate(item.goodsTaxRate)"> </span>
                                    </td>
                                    <td class="align_right"><span class="content_td_blue"
                                                                  v-text="item.goodsTotalTax"> </span></td>
                                </tr>
                                <tr v-if="!ifMoreThan8Records">
                                    <td class="align_center borderRight">
                                        <a href="javascript:;" @click="modalGoods = true">查看货物明细清单</a>
                                        <Modal v-model="modalGoods" width="1204px" class-name="vertical-center-modal">
                                            <invoiceGoodslist :GoodsList="goodsList"
                                                              :InvoiceTollData="InvoiceTollData"></invoiceGoodslist>
                                        </Modal>
                                    </td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="align_center borderRight">合计</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_right borderRight">
                                        <span class="content_td_blue" v-text="totalPrice"></span>
                                        <!--<span class="content_td_blue"  v-text="invoiceTotalPrice"></span>-->
                                    </td>
                                    <td class="align_center borderRight">&nbsp;</td>
                                    <td class="align_right">
                                        <span class="content_td_blue" v-text="totalTax"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="align_center borderRight borderTop">价税合计（大写）</td>
                                    <td class="align_left borderTop" colspan="4"><span class="content_td_blue"
                                                                                       v-text="totalPriceTaxCn"> </span>
                                    </td>
                                    <td class="align_left borderTop" colspan="3"><span
                                            style="padding: 0px 20px;">（小写）</span><span class="content_td_blue"
                                                                                        v-text="totalPriceTax"> </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <!--表头结束-->
                    <tr>
                        <td class="align_center" rowspan="4">
                            <p>销</p>
                            <p>售</p>
                            <p>方</p>
                        </td>
                        <td class="align_left borderNo">名称：</td>
                        <td class="align_left borderNo"><span class="content_td_blue"
                                                              v-text="InvoiceTollData.sellerName"> </span></td>
                        <td width="20" class="align_center" rowspan="4">
                            <p>备</p>
                            <p>注</p>
                        </td>
                        <td width="310" class="align_left" id="bz_zp" valign="top" rowspan="4">&nbsp;
                            <span class="warp content_td_blue remarktext" v-text="InvoiceTollData.remarks"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo">纳税人识别号：</td>
                        <td class="align_left borderNo">
                            <span class="content_td_blue" v-text="InvoiceTollData.sellerTaxNo"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">地址、电话：</td>
                        <td class="align_left borderNo" valign="top">
                            <span class="content_td_blue" v-text="InvoiceTollData.sellerAddressPhone"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">开户行及账号：</td>
                        <td class="align_left borderNo" valign="top">
                            <span class="content_td_blue" v-text="InvoiceTollData.sellerBankAccount"> </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import InvoiceGoodslist from '@/components/publics/_invioce/InvoiceGoodslist'

    export default {
        data() {
            return {
                goodsList: [],
                title: '增值税电子普通发票',
                InvoiceType: '电',
                modalGoods: false,
                totalPrice: '',
                totalTax: '',
                totalPriceTax: '',
                totalPriceTaxCn: '',
                isShow: true,
                tollSign: ''
            }
        },
        props: ['InvoiceTollData'],
        components: {
            InvoiceGoodslist
        },
        watch: {
            InvoiceTollData() {
                this.initGoodsList()
                this.calcPrice()
                if (this.InvoiceTollData) {
                    this.isShow = false
                }
                if (this.InvoiceTollData.tollSign == '06') {
                    this.tollSign = '[可认证]'
                } else {
                    this.tollSign = '[不可认证]'
                }
            }
        },
        methods: {
            /**
             * 作用税率显示
             * @param name 姓名
             * @return
             **/
            getGoodsTaxRate(goodsTaxRate) {
                if (goodsTaxRate) {
                    return goodsTaxRate * 100 + "%"
                } else {
                    return '0%'
                }
            },
            initGoodsList() {
                let list = []
                if (this.InvoiceTollData.detailList && this.InvoiceTollData.detailList.results) {
                    list = this.InvoiceTollData.detailList.results
                } else {
                    list = this.InvoiceTollData.detailList || []
                }
                let temp = ''
                for (let index = 0, length = list.length; index < length; index++) {
                    if (list[index].goodsPrice) {
                        list[index].goodsPrice = Number.parseFloat(list[index].goodsPrice).toFixed(2).toString()
                    }
                    if (list[index].goodsQuantity) {
                        list[index].goodsQuantity = Number.parseFloat(list[index].goodsQuantity).toFixed(0).toString()
                    }
                }
                this.goodsList = list
            },
            calcPrice() {
                if (this.InvoiceTollData.invoiceTotalPrice) {
                    this.totalPrice = '￥' + this.InvoiceTollData.invoiceTotalPrice.toFixed(2)
                } else {
                    this.totalPrice = ''
                }
                if (this.InvoiceTollData.invoiceTotalTax != "undefined") {
                    this.totalTax = '￥' + this.InvoiceTollData.invoiceTotalTax.toFixed(2)
                } else {
                    this.totalTax = ''
                }
                if (this.InvoiceTollData.invoiceTotalPriceTax != "undefined") {
                    this.totalPriceTax = '￥' + this.InvoiceTollData.invoiceTotalPriceTax.toFixed(2)
                } else {
                    this.totalPriceTax = ''
                }
                if (this.InvoiceTollData.invoiceTotalPriceTaxCn != "undefined") {
                    this.totalPriceTaxCn = '⊗' + this.InvoiceTollData.invoiceTotalPriceTaxCn
                } else {
                    this.totalPriceTaxCn = ''
                }
            }
        },
        computed: {
            ifMoreThan8Records() {
                if (this.goodsList.length < 9) {
                    return true;
                } else {
                    return false
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal {
            top: 0;
        }
    }

    .opacity {
        opacity: 0;
    }

    .remarktext {
        display: inline-block;
        width: 100%;
    }

    .invoice_deductible {
        position: absolute;
        left: 97px;
        top: 53px;
    }
</style>