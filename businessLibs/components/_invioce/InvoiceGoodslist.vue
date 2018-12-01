<template>

	<div class="hwqd_wrap">

	    <h1 class="invoice_tit"><span><i>销 售 货 物 或 提 供 应 税 劳 务 清 单</i></span></h1>

		<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
			<tbody>
				<tr height="30">
					<td class="align_left" colspan="3">购买方名称：<span class="content_td_blue" id="fpmx_gfmc">{{InvoiceData.buyerName}}</span></td>
				</tr>
				<tr height="30">
					<td class="align_left" colspan="3">销售方名称：<span class="content_td_blue" id="fpmx_xfmc">{{InvoiceData.sellerName}}</span></td>
				</tr>
				<tr height="30">
					<td class="align_left"><span id="fpmx_fpdminfo">所属增值税专用发票代码：</span><span class="content_td_blue" id="fpmx_fpdm">{{InvoiceData.invoiceCode}}</span></td>
					<td class="align_left">号码：<span class="content_td_blue" id="fpmx_fphm">{{InvoiceData.invoiceNo}}</span></td>
					<td class="align_right"> </td>
					<td> &nbsp;</td>
				</tr>
			</tbody>
		</table>
		<table class="fppy_table" style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
			<tbody>
				<tr>
					<td width="60">序号</td>
					<td width="240">货物（劳务）名称</td>
					<td width="100">规格型号</td>
					<td width="60">单位</td>
					<td width="100">数量</td>
					<td width="100">单价</td>
					<td width="100">金额</td>
					<td width="40"> 税率</td>
					<td width="100">税额</td>
				</tr>
				<tr v-for="item in GoodsList">
					<td class="borderBottomTopNo content_td_blue">&nbsp;</td>
					<td class="borderBottomTopNo align_left content_td_blue">{{item.goodsName}}</td>
					<td class="borderBottomTopNo align_left content_td_blue">{{item.goodsSpecification}}</td>
					<td class="borderBottomTopNo align_left content_td_blue">{{item.goodsUnit}}</td>
					<td class="borderBottomTopNo align_right content_td_blue">{{item.goodsQuantity}}</td>
					<td class="borderBottomTopNo align_right content_td_blue">{{item.goodsPrice}}</td>
					<td class="borderBottomTopNo align_right content_td_blue">{{item.goodsTotalPrice}}</td>
					<td class="borderBottomTopNo align_right content_td_blue">{{item.goodsTaxRate}}</td>
					<td class="borderBottomTopNo align_right content_td_blue">{{item.goodsTotalTax}}</td>
				</tr>

				<tr>
					<td width="60" align="center" class="borderHaveTop"> 小计</td>
					<td width="240" class="borderHaveTop align_left"></td>
					<td width="100" class="borderHaveTop"></td>
					<td width="60" class="borderHaveTop"></td>
					<td width="100" class="borderHaveTop align_right"></td>
					<td width="100" class="borderHaveTop align_right"></td>
					<td width="100" class="borderHaveTop align_right content_td_blue" id="xiaoji1">{{InvoiceData.invoiceTotalPrice}}</td>
					<td width="40" class="borderHaveTop"></td>
					<td width="100" class="borderHaveTop align_right content_td_blue" id="xiaoji2">{{InvoiceData.invoiceTotalTax}}</td>
				</tr>
				<tr>
					<td width="60" class="borderBottomTopNo"> 总计</td>
					<td width="240" class="borderBottomTopNo align_left"></td>
					<td width="100" class="borderBottomTopNo"></td>
					<td width="60" class="borderBottomTopNo"></td>
					<td width="100" class="borderBottomTopNo align_right"></td>
					<td width="100" class="borderBottomTopNo align_right"></td>
					<td width="100" class="borderBottomTopNo align_right content_td_blue" id="zongji1">{{InvoiceData.invoiceTotalPrice}}</td>
					<td width="40" class="borderBottomTopNo"></td>
					<td width="100" class="borderBottomTopNo align_right content_td_blue" id="zongji2">{{InvoiceData.invoiceTotalTax}}</td>
				</tr>
				
				<tr>
					<td class="borderTop">备注</td>
					<td class="borderTop align_left content_td_blue" colspan="8">{{InvoiceData.remarks}}</td>
				</tr>
			</tbody>
		</table>
		<br>
		<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
			<tbody>
				<tr height="30">
					<td class="align_left">销售方（章）：</td>
					<td class="align_right">填开日期：<span class="content_td_blue" id="fpmx_kprq">{{InvoiceData.createDate}}</span></td>
					<td>&nbsp;</td>
				</tr>
			</tbody>
		</table>
	</div>

</template>

<script>
	export default {
		name: 'InvoiceGoodList',
		props: {
			InvoiceData: {
				type: Object,
				default: function () {
					return {
						buyerName: '购买方名称',
						sellerName: '销售方名称',
						invoiceCode: '发票代码',
						invoiceNo: '发票号码',
						invoiceTotalPrice: '合计金额',
						invoiceTotalTax: '合计税额',
						invoiceTotalPriceTax: '价税合计',
						createDate: '填开日期',
						remarks: '备注'
					}
				}
			},
            GoodsList: {
				type: Array,
				default: function () {
					return [{
						goodsName: '货物名称', goodsSpecification: '规格型号', goodsUnit: '单位', goodsQuantity: '数量',
						goodsPrice: '单价', goodsTotalPrice: '金额', goodsTaxRate: '税率', goodsTotalTax: '税额',
					}]
				}
			}
		}
	}
</script>

<style>

</style>