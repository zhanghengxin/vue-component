
//  专 普 电
const defaultTaxRate = ''
export const getDefaultDetailTpl = () => {
    return {
        // 行产品名称
        goodsName: '',
        // 行规格说明
        goodsSpecification: '',
        // 行单位
        goodsUnit: '',
        // 行数量
        goodsQuantity: '',
        // 行单价
        goodsPrice: '',
        // 行金额
        goodsTotalPrice: '',
        // 行税率
        goodsTaxRate: defaultTaxRate,
        // 行税额
        goodsTotalTax: '',
        // 是否被折扣行
        hasDiscountLine: false,
        // 是否折扣行
        isDiscountLine: false,
        // 默认不可编辑税率
        noEdit: true
    }
}

export const getDefaultCurrentData = () => {
    const defaultDetailTpl = getDefaultDetailTpl()
    return {
        carData: getDefaultCarTpl(),
        // 发票ID，编辑的时候有用
        id: '',
        // 流水单号
        serialNo: '',
        // 当前发票代码
        invoiceCode: '',
        // 当前发票号码
        invoiceNo: '',
        originalInvoiceCode: '',
        originalInvoiceNo: '',
        // 征税方式0普通征税2差额征税
        taxationMethod: '',
        // 差额征税的差额
        deductibleAmount: '',
        // 清单标志： 0：无清单 1：带清单
        invoiceListMark: '',
        // 特殊票种标记，00：普通发票 02：农业发票 06：抵扣通行费 07：其他通行费 01 农产品销售   02 农产品收购    08 成品油  默认：00
        invoiceSpecialMark: '00',
        // 校验码
        verifyCode: '',
        // 机器编号
        machineNo: '',
        // 开票终端
        issuePlace: {},
        // 邮箱
        email: '',
        // 手机号
        phone: '',
        // 是否含税 含税标识 0 不含税 1 含税
        priceTaxMark: '0',
        // 购方信息
        buyerInfo: {
            taxSerial: '',
            name: '',
            addressAndPhone: '',
            bankAndAccount: ''
        },
        // 销方信息
        sellerInfo: {
            taxSerial: '',
            name: '',
            addressAndPhone: '',
            bankAndAccount: ''
        },
        // 明细列表
        detailList: [{
            ...defaultDetailTpl
        }],
        // 开票人
        drawer: '',
        // 复核人
        checker: '',
        // 收款人
        payee: '',
        // 备注
        remarks: '',
        // 密码区
        taxControlCode: ''
    }
}

// 二手车  机动车
export const getDefaultCarTpl = () => {
    return {
        brandModel: '', // 厂牌型号
        certificateNo: '', // 合格证号
        engineNo: '', // 发动机号
        freeTaxMark: '', // 零税率标识 空代表无
        goodsCode: '', // 商品编码
        goodsPersonalCode: '', // 自行编码
        id: '', // id
        importCertificateNo: '', // 进口证明书号
        inspectionListNo: '', // 商检单号
        invoiceID: '', //
        manufacturingEnterprise: '', // 生产企业名称
        originPlace: '', // 产地
        passengersLimited: '', // 限乘人数
        paymentVoucherNo: '', // 完税凭证号码
        preferentialMarkFlag: '', // 是否使用优惠政策 0:未使用，1:使用
        tonnage: '', // 吨位
        vatSpecialManagement: '', // 增值税特殊管理（使用优惠政策时必填）
        vehicleNo: '', // 车辆识别代号/车架号码
        vehicleType: '', // 车辆类型
        // 二手车新增
        drawerType: '', // 开票方类型
        licensePlate: '', // 车牌照号
        registryNo: '', // 登记证号
        vehicleAdministration: '', // 转入地车辆管理所名称 vehicleAdministration
        auctionName: '', // 经营、拍卖单位名称  AuctionName
        auctionAddress: '', // 经营、拍卖单位地址  AuctionAddress  AuctionPhone
        auctionTaxNo: '', // 经营、拍卖单位纳税人识别号  AuctionTaxNo
        auctionBankAccount: '', // 经营、拍卖单位开户行、账号  AuctionBankAccount
        auctionPhone: '', // 经营、拍卖单位电话  AuctionPhone
        marketName: '', // 二手车市场名称   MarketName
        marketTaxNo: '', // 二手车市场识别号   MarketTaxNo
        marketAddress: '', // 二手车市场地址   MarketAddress
        marketBankAccount: '', // 二手车市场开户行、账号  MarketBankAccount
        marketPhone: '', // 二手车市场电话   MarketPhone
        carPaymentVoucherNo: '', // 车购税完税凭证号码   TaxPaymentNo
        invoiceMark: '', // 开票标识   invoiceMark
        vatMark: '', // 增值税标志   AddedValueMark
        issuedInvoiceCode: '', // 已开发票代码  IssuedInvoiceCode
        issuedInvoiceNo: '', // 已开发票号码  IssuedInvoiceNo
        issuedTotalPrice: '', // 已开票销售额  issuedTotalPrice
        issuedTaxRate: '', // 已开票税率   issuedTaxRate
        issuedTotalTax: '', // 已开票税额  issuedTotalTax
        paymentVoucherMark: '', // 开具完税证明标识  taxPaymentMark
        paymentVoucherToralPrice: '', // 完税凭证销售额  taxPaymentToralPrice
        paymentVoucherTaxRate: '', // 完税凭证税率  taxPaymentTaxRate
        paymentVoucherTotalTax: '', // 完税凭证税额  taxPaymentTotalTax
        sellerTaxNo: '', // 销方单位代码
        sellerName: '', // 销方单位名称
        sellerAddress: '', // 销方地址
        sellerPhone: '', // 卖方电话
        // delete 辅助数据源
        buyertaxSerial: '',
        buyername: '',
        buyeraddress: '',
        buyerphone: '',
        goodsTotalPrice: '',
        goodsTotalTax: ''
    }
}
