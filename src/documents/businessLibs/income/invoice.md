# 进项票面
一共分为四种票

### 机动车票
当传入数据的`invoiceTypeCode`为`'03'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceData'></basic-invoice>
    </div>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceData: {
                        invoiceTypeCode:'03',
                        invoiceCode: '123456789012',
                        invoiceNo: '1234567890',
                        invoiceDate: '2018-10-01',
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
                        sellerName: '销货单位名称',
                        phoneNo: '电话',
                        sellerTaxNo: '销方税号',
                        account: '账号',
                        address: '地址',
                        bank: '开户银行',
                        competentTaxName: '主管税务机关',
                        competentTaxCode: '税务机关代码',
                        goodsTaxRate: '0.3',
                        invoiceTotalTax: '123.213', //税额
                        invoiceTotalPrice: '123.122', //不含税金额
                        invoiceTotalPriceTax: '1331.11', // 价税合计小写
                        invoiceTotalPriceTaxCn: '金额大写', //金额大写
                        taxReceiptNo: '完税凭证号码',
                        tonnage: '吨位',
                        maxCapacity: '限乘人数',
                    }
                }
            }
        }
    </script>

::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceData'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceData: {
                        invoiceTypeCode:'03',
                        invoiceCode: '123456789012',
                        invoiceNo: '1234567890',
                        invoiceDate: '2018-10-01',
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
                        sellerName: '销货单位名称',
                        phoneNo: '电话',
                        sellerTaxNo: '销方税号',
                        account: '账号',
                        address: '地址',
                        bank: '开户银行',
                        competentTaxName: '主管税务机关',
                        competentTaxCode: '税务机关代码',
                        goodsTaxRate: '0.3',
                        invoiceTotalTax: '10.00',
                        invoiceTotalPrice: '120.00',
                        invoiceTotalPriceTax: '130.00',
                        invoiceTotalPriceTaxCn: '金额大写',
                        taxReceiptNo: '完税凭证号码',
                        tonnage: '吨位',
                        maxCapacity: '限乘人数',
                    }
                }
            }
        }
    </script>
```
:::
</div>
