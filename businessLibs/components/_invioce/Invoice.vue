<template>
    <div>
        <div class="yulan_wrap_left">
            <div class="tabPage-zzszyfp">
                <!--公共样式部分 发票类型 发票状态 灰层-->
                <div class="invoice_base">
                    <p class="invoice_type" v-if="InvoiceType"><span v-text="InvoiceType"></span></p>
                    <span class="invoice_state"
                          :class="{'outcontrol': InvoiceData.invoiceStatus ==='1', 'void': InvoiceData.invoiceStatus==='2','red': InvoiceData.invoiceStatus==='3','abnormal': InvoiceData.invoiceStatus==='4'}"></span>
                    <!--1-失控：outcontrol，2-作废：void，3-红冲：red，4-异常：abnormal-->
                    <div class="mask" v-if="isShow"></div>
                </div>
                <h1 class="invoice_tit"><span><i v-text="title"></i></span></h1>
                <ul class="invoice_top_info clearfix">
                    <li>发票代码：<span><i class="content_td_blue" v-text='InvoiceData.invoiceCode'></i></span></li>
                    <li>发票号码：<span><i class="content_td_blue" v-text='InvoiceData.invoiceNo'></i></span></li>
                </ul>
                <ul class="invoice_top_info_right clearfix">
                    <li v-bind:class="{ opacity: !InvoiceData.invoiceCheckCode }">校验码：
                        <span>
                            <i class="content_td_blue" v-text="InvoiceData.invoiceCheckCode"></i>
                        </span>
                    </li>
                    <li v-bind:class="{ opacity: !InvoiceData.machineCode }">机器编号：
                        <span>
                            <i class="content_td_blue" v-text="InvoiceData.machineCode"></i>
                        </span>
                    </li>
                    <li>开票日期：
                        <span><i class="content_td_blue" v-text='invoiceDateStr'></i></span>
                    </li>
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
                        <td class="align_left borderNo bgcolorWhite">
                            <span class="content_td_blue" v-text="InvoiceData.buyerName"> </span></td>
                        <td width="20" class="align_center" rowspan="4">
                            <p>密</p>
                            <p>码</p>
                            <p>区</p>
                        </td>
                        <td width="310" class="align_left " nowrap="" rowspan="4">&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo">纳税人识别号：</td>
                        <td class="align_left borderNo" nowrap="">
                            <span class="content_td_blue" v-text="InvoiceData.buyerTaxNo"> </span></td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">地址、电话：</td>
                        <td class="align_left borderNo" valign="top">
                            <span class="content_td_blue" v-text="InvoiceData.buyerAddressPhone"> </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">开户行及账号：</td>
                        <td class="align_left borderNo" valign="top">
                            <span class="content_td_blue" v-text="InvoiceData.buyerBankAccount"> </span>
                        </td>

                    </tr>

                    <!--表头-->
                    <tr>
                        <td colspan="5">
                            <div class="good_list">
                                <table class="fppy_table_box" style="width: 100%;" cellspacing="0" cellpadding="0">
                                    <tbody>
                                    <tr id="tab_head_zp">
                                        <td width="30%" class="align_center borderRight">货物或应税劳务、服务名称</td>
                                        <td width="10%" class="align_center borderRight">规格型号</td>
                                        <td width="5%" class="align_center borderRight">单位</td>
                                        <td width="10%" class="align_center borderRight">数量</td>
                                        <td width="10%" class="align_center borderRight">单价</td>
                                        <td width="15%" class="align_center borderRight">金额</td>
                                        <td width="5%" class="align_center borderRight">税率</td>
                                        <td width="15%" class="align_center">税额</td>
                                    </tr>
                                    <!--<div class="good_list">-->
                                    <!--商品列表-->
                                    <tr v-for="item in goodsList" v-if="ifMoreThan8Records">
                                        <td class="align_left borderRight">
                                            <span class="content_td_blue" v-text="item.goodsName"> </span></td>
                                        <td class="align_left borderRight">
                                            <span class="content_td_blue" v-text="item.goodsSpecification"></span>
                                        </td>
                                        <td class="align_left borderRight">
                                            <span class="content_td_blue" v-text="item.goodsUnit"></span>
                                        </td>
                                        <td class="align_right borderRight">
                                            <span class="content_td_blue" v-text="item.goodsQuantity"></span>
                                        </td>
                                        <td class="align_right borderRight">
                                            <span class="content_td_blue" v-text="item.goodsPrice"></span>
                                        </td>
                                        <td class="align_right borderRight">
                                            <span class="content_td_blue" v-text="item.goodsTotalPrice"></span>
                                        </td>
                                        <td class="align_right borderRight">
                                            <span class="content_td_blue"
                                                  v-text="getGoodsTaxRate(item.goodsTaxRate)"></span>
                                        </td>
                                        <td class="align_right">
                                            <span class="content_td_blue" v-text="item.goodsTotalTax"></span>
                                        </td>
                                    </tr>
                                    <!--</div>-->
                                    <tr v-if="!ifMoreThan8Records">
                                        <td class="align_center borderRight">
                                            <a href="javascript:;" @click="modalGoods = true">查看货物明细清单</a>
                                            <Modal v-model="modalGoods" width="1204px"
                                                   class-name="vertical-center-modal">
                                                <invoiceGoodslist :GoodsList="goodsList"
                                                                  :InvoiceData="InvoiceData"></invoiceGoodslist>
                                                <div slot="footer"></div>
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
                                            <span class="content_td_blue" v-text="totalPrice"> </span>
                                        </td>
                                        <td class="align_center borderRight">&nbsp;</td>
                                        <td class="align_right">
                                            <span class="content_td_blue" v-text="totalTax"> </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="align_center borderRight borderTop">价税合计（大写）</td>
                                        <td class="align_left borderTop" colspan="4">
                                            <span class="content_td_blue" v-text="totalPriceTaxCn"></span>
                                        </td>
                                        <td class="align_left borderTop" colspan="3">
                                            <span style="padding: 0px 20px;">（小写）</span>
                                            <span class="content_td_blue" v-text="totalPriceTax"> </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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
                        <td class="align_left borderNo">
                            <span class="content_td_blue" v-text="InvoiceData.sellerName"> </span>
                        </td>
                        <td width="20" class="align_center" rowspan="4">
                            <p>备</p>
                            <p>注</p>
                        </td>
                        <td width="310" class="align_left" id="bz_zp" valign="top" rowspan="4">&nbsp;
                            <p class="warp content_td_blue"></p>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo">纳税人识别号：</td>
                        <td class="align_left borderNo">
                            <span class="content_td_blue" v-text="InvoiceData.sellerTaxNo"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">地址、电话：</td>
                        <td class="align_left borderNo" valign="top">
                            <span class="content_td_blue" v-text="InvoiceData.sellerAddressPhone"> </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align_left borderNo" valign="top">开户行及账号：</td>
                        <td class="align_left borderNo" valign="top">
                            <span class="content_td_blue" v-text="InvoiceData.sellerBankAccount"> </span>
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
    import {emptyJudge} from '@/utils/objectUtil'

    export default {
        props: ['InvoiceData'],
        components: {
            InvoiceGoodslist
        },
        watch: {
            InvoiceData() {
                this.invoiceTitle()
                this.initGoodsList()
                this.calcPrice()
                this.invoiceDateTrans()
                if (emptyJudge(this.InvoiceData)) {
                    this.isShow = false
                }
            }
        },
        data() {
            return {
                goodsList: [],
                title: '',
                InvoiceType: '',
                modalGoods: false,
                totalPrice: '',
                totalTax: '',
                totalPriceTax: '',
                totalPriceTaxCn: '',
                invoiceDateStr: '',
                isShow: true
            }
        },
        methods: {
            invoiceTitle() {
                var type = this.InvoiceData.invoiceTypeCode
                switch (type) {
                    case '01':
                        this.title = '增值税专用发票'
                        this.InvoiceType = '专'
                        break;
                    case '04':
                        this.title = '增值税普通发票'
                        this.InvoiceType = '普'
                        break;
                    case '10':
                        this.title = '增值税普通发票（电子）'
                        this.InvoiceType = '电'
                        break;
                }
            },
            getGoodsTaxRate(goodsTaxRate) {
                if (goodsTaxRate) {
                    return goodsTaxRate * 100 + "%"
                } else {
                    return '0%'
                }
            },
            //商品列表
            initGoodsList() {
                let list = []
                if (this.InvoiceData.detailList) {
                    if (this.InvoiceData.detailList.results) {
                        list = this.InvoiceData.detailList.results
                    } else {
                        list = this.InvoiceData.detailList
                    }
                } else {
                    list = []
                }

                let temp = ''
                for (let index = 0, length = list.length; index < length; index++) {
                    if (list[index].goodsPrice) {
                        list[index].goodsPrice = Number.parseFloat(list[index].goodsPrice).toFixed(2).toString();
                    }
                    if (list[index].goodsQuantity) {
                        list[index].goodsQuantity = Number.parseFloat(list[index].goodsQuantity).toFixed(0).toString()
                    }
                }
                this.goodsList = list
            },
            //价格控制2位小数
            calcPrice() {
                if (this.InvoiceData.invoiceTotalPrice) {
                    this.totalPrice = '￥' + this.InvoiceData.invoiceTotalPrice.toFixed(2)
                } else {
                    this.totalPrice = ''
                }
                if (this.InvoiceData.invoiceTotalTax) {
                    this.totalTax = '￥' + this.InvoiceData.invoiceTotalTax.toFixed(2)
                } else {
                    this.totalTax = ''
                }
                if (this.InvoiceData.invoiceTotalPriceTax) {
                    this.totalPriceTax = '￥' + this.InvoiceData.invoiceTotalPriceTax.toFixed(2)
                } else {
                    this.totalPriceTax = ''
                }

                if (this.InvoiceData.invoiceTotalPriceTaxCn) {
                    this.totalPriceTaxCn = '⊗' + this.InvoiceData.invoiceTotalPriceTaxCn
                } else {
                    this.totalPriceTaxCn = ''
                }
            },
            //日期
            invoiceDateTrans() {
                if (this.InvoiceData.invoiceDate) {
                    let temDate = this.InvoiceData.invoiceDate.split('-')
                    this.invoiceDateStr = temDate[0] + '年' + temDate[1] + '月' + temDate[2] + '日'
                } else {
                    this.invoiceDateStr = ''
                }
            }
        },
        computed: {
            ifMoreThan8Records() {
                if (this.goodsList.length < 9) {
                    return true
                } else {
                    return false
                }
            },
        },
    }
</script>

<style lang="scss" >
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

    .good_list {
        width: 100%;
        display: inline-block;
        max-height: 150px;
        overflow-y: auto;
        overflow-x:hidden;
    }
    //发票预览样式
    /* resule table--------------------------------------------------------------------*/
    .yulan_wrap_left, .hwqd_wrap {
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    }

    .fppy_table, .fppy_table td {
        border: 1px solid #dddee1; /*border-collapse: collapse;*/
        line-height: 25px;
        margin: 0 auto;
    }

    .fppy_table td.borderBottomNo {
        border: 0px;
    }

    .fppy_table td.borderRightNo {
        border: 0px;
    }

    .fppy_table td.borderNo {
        border: 0px;
    }

    .fppy_table td.borderRight {
        border-left: 0px;
        border-right: 1px solid #dddee1;
    }

    .fppy_table td.borderLeft {
        border-right: 0px;
        border-left: 1px solid #dddee1;
    }

    .fppy_table td.borderBottomTopNo {
        border-bottom: 0px;
        border-top: 0px;
        text-align: center;
    }

    .fppy_table td.borderHaveTop {
        border-bottom: 0px;
        border-top: 1px solid #dddee1;
    }

    table.fppy_table_box {
        border: 0px;
        border-collapse: collapse;
    }

    table.fppy_table_box td {
        border: 0px solid #ccc;
        border-collapse: collapse;
    }

    .fppy_table_box td.borderTop {
        border-top: 1px solid #dddee1;
    }

    .fppy_table_box td.borderRight {
        border-right: 1px solid #dddee1;
    }

    .align_center {
        text-align: center !important;
    }

    .align_left {
        text-align: left !important;
        padding: 0 0 0 2px;
    }

    .align_right {
        text-align: right !important;
        padding: 0 3px 0 3px;
    }

    .align_right2 {
        text-align: right !important;
        width: 165px !important;
    }

    .content_td_blue {
        color: #495060;
    }

    .tab-page {
        display: none;
    }

    .tabPage-zzszyfp, .cms_r_main {
        font-size: 14px;
    }

    /**/
    .yulan_wrap_left {
        padding: 23px 29px;
        color: #80848f;
        border: 1px solid #dddee1;
        position: relative;
    }

    .yulan_wrap {
        margin: 0 auto;
    }


    /*发票公共部分*/
    /*标题*/
    .invoice_tit {
        width: 350px;
        margin: 0 auto 10px;
        padding: 5px 0px 2px;
        text-align: center;
        color: #80848f;
        border-bottom: 1px solid #dddee1;
        font-weight: normal;
        font-size: 18px;
    }

    .invoice_tit span {
        display: block;
        border-bottom: 1px solid #dddee1;
        padding-bottom: 10px;
        height: 38px;
        line-height: 38px;
    }

    .invoice_tit i {
        font-style: normal;
    }

    .invoice_type {
        position: absolute;
        left: 26px;
        top: 12px;
        $typecolor: #e6d8bd;
        box-sizing: border-box;
        padding: 2px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        /*line-height: 48px;*/
        color: $typecolor;
        text-align: center;
        border: 4px solid $typecolor;
        text-align: center;
        span {
            display: inline-block;
            width: 48px;
            height: 48px;
            line-height: 40px;
            box-sizing: border-box;
            border: 2px solid $typecolor;
            border-radius: 50%;
            font-size: 30px;
        }
    }

    .invoice_state {
        width: 227px;
        height: 194px;
        position: absolute;
        left: 50%;
        top: 2px;
        margin-left: -113px;
        z-index: 1;
    }

    /*异常*/
    .abnormal {
        background: 'static/images/state_abnormal.png';
    }

    /*失控*/
    .outcontrol {
        background: 'static/images/state_outcontrol.png';
    }

    /*红冲*/
    .red {
        background: 'static/images/state_abnormal.png';
    }

    /*作废*/
    .void {
        background: 'static/images/state_void.png';
    }

    /*灰层*/
    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(232, 232, 232, 0.4);
        z-index: -1;
    }

    .yulan_wrap_left {
        width: 900px;
        box-sizing: border-box;
        margin-right: 20px;
        border-radius: 3px;
    }

    /*.fppy_table_box{ height: 211px;}*/
    .invoice_gray {
        .mask {
            display: block;
        }
        .invoice_state, .invoice_type, .content_td_blue {
            display: none;
        }
        .invoice_tit i {
            display: none;
        }
    }

    /*表格头部信息 发票代码 发票号码*/
    .invoice_top_info {
        padding-bottom: 6px;
        i {
            font-style: normal;
        }
        li {
            float: left;
            span {
                display: inline-block;
                width: 96px;
            }
        }
    }

    //发票操作信息
    .invoice_top_info_right {
        min-width: 180px;
        li {
            white-space: nowrap;
        }
        position: absolute;
        text-align: right;
        right: 30px;
        top: 16px;
        line-height: 2;
        height: 88px;
        span {
            display: inline-block;
        }
        i {
            font-style: normal;
        }
        //  li:nth-of-type(1) span{width: 170px;}
        li:nth-of-type(2) span {
            width: 100px;
        }
        li:nth-of-type(3) {
            position: absolute;
            right: 0;
            bottom: 0;
            //      span{width: 90px;}
        }
    }

    //货物清单高度
    .hwqd_wrap {
        max-height: 500px;
        overflow-y: auto;
    }

    //必选标识*样式
    .require {
        color: $error;
        padding-right: 10px;
        vertical-align: middle;
        font-style: normal
    }

    //表格最小高度
    .ivu-table-tip table {
        //min-height: 240px;
    }
</style>