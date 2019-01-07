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
                    maxCapacity: '限乘人数',
                    checkCode:'1123312'
                },

                invoiceNormalData1: {
                    invoiceTypeCode:'10',
                    invoiceCode: '123456789012',
                    invoiceNo: '1234567890',
                    invoiceDate: '2018-10-01',
                    machineCode: '123312331311',
                    buyerName: '购方名称',
                    checkCode:'1123312',
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
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsSpecification": "无",
                                "goodsTaxRate": 0.03,
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsUnit": "次",
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
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
                    },
                    invoiceTotalPrice:'123',
                    invoiceTotalTax:'11',
                    invoiceTotalPriceTax:'134',
                    invoiceTotalPriceTaxCn:'一百三十四',
                    sellerName:'销方名称',
                    sellerTaxNo:'销方税号',
                    sellerAddressPhone:'销方地址、电话',
                    sellerBankAccount:'销方开户行及账号',
                    remarks:'备注',
                    createDate:'2017-01-01',
                },
                invoiceNormalData2: {
                    invoiceTypeCode:'01',
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
                    },
                    invoiceTotalPrice:'123',
                    invoiceTotalTax:'11',
                    invoiceTotalPriceTax:'134',
                    invoiceTotalPriceTaxCn:'一百三十四',
                    sellerName:'销方名称',
                    sellerTaxNo:'销方税号',
                    sellerAddressPhone:'销方地址、电话',
                    sellerBankAccount:'销方开户行及账号',
                    remarks:'备注',
                    createDate:'2017-01-01',
                },
                invoiceNormalData3: {
                    invoiceTypeCode:'04',
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
                    },
                    invoiceTotalPrice:'123',
                    invoiceTotalTax:'11',
                    invoiceTotalPriceTax:'134',
                    invoiceTotalPriceTaxCn:'一百三十四',
                    sellerName:'销方名称',
                    sellerTaxNo:'销方税号',
                    sellerAddressPhone:'销方地址、电话',
                    sellerBankAccount:'销方开户行及账号',
                    remarks:'备注',
                    createDate:'2017-01-01',
                },
                invoiceNormalData4: {
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
                    },
                    invoiceTotalPrice:'123',
                    invoiceTotalTax:'11',
                    invoiceTotalPriceTax:'134',
                    invoiceTotalPriceTaxCn:'一百三十四',
                    sellerName:'销方名称',
                    sellerTaxNo:'销方税号',
                    sellerAddressPhone:'销方地址、电话',
                    sellerBankAccount:'销方开户行及账号',
                    remarks:'备注',
                    createDate:'2017-01-01',
                },
                invoiceNormalData5: {
                    invoiceTypeCode:'14',
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
                                "goodsTaxRate": 0.03,
                                "goodsTotalTax": 9.83,
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62,
                                "LicensePlateNum": 'A213131',
                                "Type": '辆',
                                "CurrentDateStart": '2019-01-01',
                                "CurrentDateEnd":'2019-01-01'
                            }
                        ]
                    },
                    invoiceTotalPrice:'123',
                    invoiceTotalTax:'11',
                    invoiceTotalPriceTax:'134',
                    invoiceTotalPriceTaxCn:'一百三十四',
                    sellerName:'销方名称',
                    sellerTaxNo:'销方税号',
                    sellerAddressPhone:'销方地址、电话',
                    sellerBankAccount:'销方开户行及账号',
                    remarks:'备注',
                    createDate:'2017-01-01',
                },
                invoiceRollData: {
                    invoiceTypeCode:'11',
                    invoiceCode: '123456789012',
                    invoiceNo: '1234567890',
                    invoiceDate: '2018-10-01',
                    machineCode: '123312331311',
                    buyerName: '购方名称',
                    buyerTaxNo: '购方纳税人识别号',
                    detailList: {
                        "total": 1,
                        "results": [
                            {
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            },
                            {
                                "goodsPrice": "327.62",
                                "goodsQuantity": "1.0",
                                "goodsName": "*运输服务*客运服务费",
                                "goodsTotalPrice": 327.62
                            }
                        ]
                    },
                    invoiceTotalPriceTax:'134',
                    invoiceTotalPriceTaxCn:'一百三十四',
                    sellerName:'销方名称',
                    sellerTaxNo:'销方税号',
                    receivingClerk:'收货员',
                    checkCode:'07180849917739061879'
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

### 专票
当传入数据的`invoiceTypeCode`为`'01'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceNormalData2'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceNormalData2'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceNormalData2: {
                       invoiceTypeCode:'01',
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
                       },
                       invoiceTotalPrice:'123',
                       invoiceTotalTax:'11',
                       invoiceTotalPriceTax:'134',
                       invoiceTotalPriceTaxCn:'一百三十四',
                       sellerName:'销方名称',
                       sellerTaxNo:'销方税号',
                       sellerAddressPhone:'销方地址、电话',
                       sellerBankAccount:'销方开户行及账号',
                       remarks:'备注',
                       createDate:'2017-01-01',
                    },
                }
            }
        }
    </script>
```
:::
</div>


### 普票
当传入数据的`invoiceTypeCode`为`'04'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceNormalData3'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceNormalData3'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceNormalData3: {
                       invoiceTypeCode:'04',
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
                       },
                       invoiceTotalPrice:'123',
                       invoiceTotalTax:'11',
                       invoiceTotalPriceTax:'134',
                       invoiceTotalPriceTaxCn:'一百三十四',
                       sellerName:'销方名称',
                       sellerTaxNo:'销方税号',
                       sellerAddressPhone:'销方地址、电话',
                       sellerBankAccount:'销方开户行及账号',
                       remarks:'备注',
                       createDate:'2017-01-01',
                    }
                }
            }
        }
    </script>
```
:::
</div>

### 电票
当传入数据的`invoiceTypeCode`为`'10'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceNormalData4'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceNormalData4'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceNormalData4: {
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
                       },
                       invoiceTotalPrice:'123',
                       invoiceTotalTax:'11',
                       invoiceTotalPriceTax:'134',
                       invoiceTotalPriceTaxCn:'一百三十四',
                       sellerName:'销方名称',
                       sellerTaxNo:'销方税号',
                       sellerAddressPhone:'销方地址、电话',
                       sellerBankAccount:'销方开户行及账号',
                       remarks:'备注',
                       createDate:'2017-01-01',
                    },
                }
            }
        }
    </script>
```
:::
</div>

### 显示货物明细清单
当传入数据的`invoiceTypeCode.detailList`的长度大于`8`条时，显示货物明细清单
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceNormalData1'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceNormalData1'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceNormalData1: {
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
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                        "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsSpecification": "无",
                                    "goodsTaxRate": 0.03,
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsUnit": "次",
                                    "goodsTotalTax": 9.83,
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
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
                        },
                        invoiceTotalPrice:'123',
                        invoiceTotalTax:'11',
                        invoiceTotalPriceTax:'134',
                        invoiceTotalPriceTaxCn:'一百三十四',
                        sellerName:'销方名称',
                        sellerTaxNo:'销方税号',
                        sellerAddressPhone:'销方地址、电话',
                        sellerBankAccount:'销方开户行及账号',
                        remarks:'备注',
                        createDate:'2017-01-01',
                    }
                }
            }
        }
    </script>
```
:::
</div>


### 通行费电子发票
当传入数据的`invoiceTypeCode`为`'14'`时，票面为机动车票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceNormalData5'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceNormalData5'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceNormalData5: {
                       invoiceTypeCode:'14',
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
                                   "goodsTaxRate": 0.03,
                                   "goodsTotalTax": 9.83,
                                   "goodsName": "*运输服务*客运服务费",
                                   "goodsTotalPrice": 327.62,
                                   "LicensePlateNum": 'A213131',
                                   "Type": '辆',
                                   "CurrentDateStart": '2019-01-01',
                                   "CurrentDateEnd":'2019-01-01',
                               }
                           ]
                       },
                       invoiceTotalPrice:'123',
                       invoiceTotalTax:'11',
                       invoiceTotalPriceTax:'134',
                       invoiceTotalPriceTaxCn:'一百三十四',
                       sellerName:'销方名称',
                       sellerTaxNo:'销方税号',
                       sellerAddressPhone:'销方地址、电话',
                       sellerBankAccount:'销方开户行及账号',
                       remarks:'备注',
                       createDate:'2017-01-01',
                       checkCode:'checkCode',
                    }
                }
            }
        }
    </script>
```
:::
</div>

### 卷票
当传入数据的`invoiceTypeCode`为`'11'`时，票面为卷票
<div class="example">
    <div class="example-box">
        <basic-invoice :invoiceData='invoiceRollData'></basic-invoice>
    </div>
</div>


::: code
```html
    <div>
        <basic-invoice :invoiceData='invoiceRollData'></basic-invoice>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceRollData: {
                        invoiceTypeCode:'11',
                        invoiceCode: '123456789012',
                        invoiceNo: '1234567890',
                        invoiceDate: '2018-10-01',
                        machineCode: '123312331311',
                        buyerName: '购方名称',
                        buyerTaxNo: '购方纳税人识别号',
                        detailList: {
                            "total": 1,
                            "results": [
                                {
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                },
                                {
                                    "goodsPrice": "327.62",
                                    "goodsQuantity": "1.0",
                                    "goodsName": "*运输服务*客运服务费",
                                    "goodsTotalPrice": 327.62
                                }
                            ]
                        },
                        invoiceTotalPriceTax:'134',
                        invoiceTotalPriceTaxCn:'一百三十四',
                        sellerName:'销方名称',
                        sellerTaxNo:'销方税号',
                        receivingClerk:'收货员',
                        checkCode:'07180849917739061879'
                    }
                }
            }
        }
    </script>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| invoiceData     |  发票明细字段   | Object  |  -    |    {}   |

### invoiceData - 机动车
| 参数      | 说明    | 类型      |
|---------- |-------- |---------- |
| invoiceTypeCode     |  发票类型   |  String |
| invoiceCode     |  发票代码   |  String/Number |
| invoiceNo     |  发票号码   |  String/Number |
| invoiceDate     |  开票日期   |  String |
| machineCode     |  机器编号   |  String |
| buyerName     |  购方名称   |  String |
| buyerTaxNo     |  购方税号  |  String |
| cardid     |  身份证号  |  String |
| cartype     |  车辆类型  |  String |
| makeModel     |  厂牌型号  |  String |
| makeAddress     |  产地  |  String |
| certificationNo     |  合格证号  |  String |
| importBookNo     |  进口证明书号  |  String |
| inspectionNo     |  商检单号  |  String |
| engineNo     |  发动机号码  |  String |
| frameNo     |  车辆识别代号/车架号码  |  String |
| sellerName     |  销货名称  |  String |
| phoneNo     |  电话  |  String |
| sellerTaxNo     |  销方税号  |  String |
| account     |  账号  |  String |
| address     |  地址  |  String |
| bank     |  开户银行  |  String |
| competentTaxName     |  主管税务机关  |  String |
| competentTaxCode     |  税务机关代码  |  String |
| goodsTaxRate     |  税率  |  String |
| invoiceTotalTax     |  税额  |  String |
| invoiceTotalPrice     |  不含税金额  |  String |
| invoiceTotalPriceTax     |  价税合计小写  |  String |
| invoiceTotalPriceTaxCn     |  价税合计大写  |  String |
| taxReceiptNo     |  完税凭证号码  |  String |
| tonnage     |  吨位  |  String |
| maxCapacity     |  限乘人数  |  String |
| checkCode     |  校验码  |  String |
| receivingClerk     |  收货员`卷票`  |  String |

### invoiceData - 专/普/电/通行费/卷
| 参数      | 说明    | 类型      |
|---------- |-------- |---------- |
| invoiceTypeCode     |  发票类型   |  String |
| invoiceCode     |  发票代码   |  String/Number |
| invoiceNo     |  发票号码   |  String/Number |
| invoiceDate     |  开票日期   |  String |
| machineCode     |  机器编号   |  String |
| buyerName     |  购方名称   |  String |
| buyerTaxNo     |  购方税号  |  String |
| buyerAddressPhone     |  购方地址、电话  |  String |
| buyerBankAccount     |  购方开户行及账号  |  String |
| sellerName     |  销货名称  |  String |
| sellerTaxNo     |  销方税号  |  String |
| sellerAddressPhone     |  销方地址、电话  |  String |
| sellerBankAccount     |  销方开户行及账号  |  String |
| remarks     |  备注  |  String |
| createDate     |  填开日期  |  String |
| detailList     |  明细列表  |   Array |

### detailList - 明细列表
| 参数      | 说明    | 类型      |
|---------- |-------- |---------- |
| goodsName     |  货物或应税劳务、服务名称	   |  String |
| goodsSpecification     |  规格型号   |  String |
| goodsUnit     |  单位	   |  String |
| goodsQuantity     |  数量   |  String |
| goodsPrice     |  单价   |  String |
| goodsTotalPrice     |  金额   |  String |
| goodsTaxRate     |  税率   |  String |
| goodsTotalTax     |  税额   |  String |
| LicensePlateNum     |  车牌号`通行费`   |  String |
| Type     |  类型`通行费`   |  String |
| CurrentDateStart     |  通行日期起`通行费` 	   |  String |
| CurrentDateEnd     |  通行日期止`通行费`    |  String |
