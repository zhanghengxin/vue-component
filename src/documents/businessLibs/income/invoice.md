# 进项票面
- 简单和复合模式切换。
- 页数过多时会自动折叠。
- 可以切换每页显示的数量。【暂时不做，等 select 出来后使用公共组件】
- 快速跳转到某一页。
- 显示总共多少条数据，接受 slot 来自定义内容。
- 可以自定义上一页和下一页的文字
- 支持键盘前进后退以及跳转确认

### 基础用法
基本的分页，页数过多时会自动折叠。
<div class="example">
    <div class="example-box">
        <div>
            <basic-invoice :invoiceData=invoiceData></basic-invoice>
        </div>
    </div>
    </div>
    <script>
        export default {
            data () {
                return {
                    invoiceData: {
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
        }
    </script>

::: code
```html
    <div>
        <b-page total=200 page=2></b-page>
    </div>
```
:::
</div>
