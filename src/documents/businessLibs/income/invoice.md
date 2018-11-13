<script>
    export default {
        data () {
            return {
                invoiceCarData: {
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
                    maxCapacity: '限乘人数'
                },
                invoiceNormalData: {
                    invoiceTypeCode:'10',
                    invoiceCode: '123456789012',
                    invoiceNo: '1234567890',
                    invoiceDate: '2018-10-01',
                    machineCode: '123312331311',
                    buyerName: '购方名称',
                    buyerTaxNo: '购方纳税人识别号',
                    buyerAddressPhone:'北京市海淀区马连洼竹园住宅小区综合楼7层713 010-84782665',
                    buyerBankAccount:'中国建设银行北京苏州桥支行11001079800053014887',
                    detailList: {
                        "total": 1,
                        "results": [
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            }
                        ]
                    }
                }
            }
        }
    }
</script>

# 进项票面
一共分为四种票

### 机动车票
当传入数据的`invoiceTypeCode`为`'03'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceCarData'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceCarData'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceCarData: {
                        invoiceTypeCode:'03',
                        invoiceCode: '123456789012',
                        invoiceNo: '1234567890',
                        invoiceDate: '2018-10-01',
                        machineCode: '123312331311',
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
                        maxCapacity: '限乘人数'
                    }
                }
            }
        }
    </script>
```
:::
</div>


### 专/普/电票票面
当传入数据的`invoiceTypeCode`为`'01'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceNormalData'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceNormalData'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {

                }
            }
        }
    </script>
```
:::
</div>

