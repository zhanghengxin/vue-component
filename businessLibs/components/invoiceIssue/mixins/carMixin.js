// 二手车机动车 相关
import common from '../utils/common'
import typeUtil from '../utils/typeUtil'

export default {
    // 获取 机动车、二手车 的数据
    generateCarData () {
        const invoiceData = this.currentData
        // const buyerInfo = invoiceData.buyerInfo
        const sellerInfo = invoiceData.sellerInfo
        // const detailList = invoiceData.detailList
        let val = this.carData
        let address = common.trim(val.buyeraddress) ? common.trim(val.buyeraddress) : ''
        let phone = common.trim(val.buyerphone) ? common.trim(val.buyerphone) : ''

        let buyerInfo = {
            taxSerial: val.buyertaxSerial,
            name: val.buyername,
            addressAndPhone: address + '※' + phone,
            bankAndAccount: ''
        }
        const totalPrice = +this.carData.goodsTotalPrice
        const totalTax = +this.carData.goodsTotalTax

        let params = {
            id: invoiceData.id,
            serialNo: '', // 开票流水号
            sourceMark: invoiceData.sourceMark || '', // 来源标示

            // 负数开票 原发票信息
            originalInvoiceCode: invoiceData.originalInvoiceCode,
            originalInvoiceNo: invoiceData.originalInvoiceNo,
            // 销方信息
            sellerTaxNo: sellerInfo.taxSerial, // 单位代码/身份证号码
            sellerName: sellerInfo.name, // 卖方单位/个人
            sellerAddressPhone: sellerInfo.addressAndPhone, // 卖方单位/个人住址 电话
            sellerBankAccount: sellerInfo.bankAndAccount,
            // 购方信息
            buyerTaxNo: buyerInfo.taxSerial, // 单位代码/身份证号码
            buyerName: buyerInfo.name, // 买方单位/个人
            buyerAddressPhone: buyerInfo.addressAndPhone, // 买方单位/个人住址电话
            buyerBankAccount: buyerInfo.bankAndAccount,
            buyerEmail: '',
            buyerPhone: invoiceData.phone, // 电话

            invoiceTypeCode: this.invoiceTypeCode, // 发票种类编码，004专票 007普票 026电票 005机动车 025卷票
            invoiceTerminalCode: this.invoiceTerminalCode, // 开票终端编码
            invoiceSpecialMark: '00', // 特殊票种标记，00：普通发票 02：农业发票 06：抵扣通行费 07：其他通行费  默认：00
            invoiceType: this.config.enableCommonNagative ? '1' : '0', // 开票类型0:正数发票（蓝票） 1：负数发票（红票）

            drawer: invoiceData.drawer,
            payee: invoiceData.payee,
            checker: invoiceData.checker,
            invoiceListMark: invoiceData.invoiceListMark, // 清单标志： 0：无清单 1：带清单 （发票明细大于等于8行必须带清单
            taxationMethod: invoiceData.taxationMethod, // 征税方式 0：普通征税，2：差额征税
            deductibleAmount: '', // 扣除额

            invoiceTotalPrice: totalPrice,
            invoiceTotalTax: totalTax,
            invoiceTotalPriceTax: totalPrice + totalTax,
            remarks: invoiceData.remarks,
            invoiceDetailsList: null,
            invoiceVehicleInfo: { ...this.carData }
        }
        delete params.invoiceVehicleInfo.buyeraddress
        delete params.invoiceVehicleInfo.buyerphone
        delete params.invoiceVehicleInfo.buyertaxSerial
        delete params.invoiceVehicleInfo.buyername
        delete params.invoiceVehicleInfo.goodsTotalPrice
        delete params.invoiceVehicleInfo.goodsTotalTax

        return params
    },
    // 校验 机动车、二手车 的数据
    validateCarInvoice () {
        const params = this.generateCarData()
        let val = this.carData
        let buyeraddress = common.trim(val.buyeraddress) ? common.trim(val.buyeraddress) : ''
        let buyerphone = common.trim(val.buyerphone) ? common.trim(val.buyerphone) : ''
        const noSpaceSpecialReg = /[/'∏￥§℅€℃￡℉№℡‰$￠∮※？?&<>【】[]]/

        if (!params.buyerName) {
            this.$Message.info('买方单位/个人不能为空')
            return false
        } else {
            if (noSpaceSpecialReg.test(params.buyerName)) {
                this.$Message.info('买方单位/个人不能含有特殊字符')
                return false
            }
            if (typeUtil.getStrLength(params.buyerName) > 72) {
                this.$Message.info('买方单位/个人最多为72个字符')
                return false
            }
        }
        // 买方单位代码/身份证号, 前端界面添加正则检验,只能输入数字和字母,,后端同步加个二层校验
        if (!params.buyerTaxNo) {
            this.$Message.info('买方单位代码/身份证号码不能为空')
            return false
        } else {
            if (!/^[A-Za-z0-9]{15,22}$/.test(params.buyerTaxNo)) {
                this.$Message.info('买方单位代码/身份证号码只能输入数字和字母并且15-22个字符')
                return false
            }
        }
        if (buyeraddress) {
            if (typeUtil.validateSpecial(buyeraddress)) {
                this.$Message.info('买方单位/个人住址不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(buyeraddress) > 80) {
                this.$Message.info('买方单位/个人住址最多为80个字符')
                return false
            }
        }
        if (buyerphone && !(typeUtil.validatePhone(buyerphone) || typeUtil.validateTelephone(buyerphone))) {
            this.$Message.info('买方单位/个人电话格式不正确')
            return false
        }
        if (!params.invoiceVehicleInfo.sellerName) {
            this.$Message.info('卖方单位/个人不能为空')
            return false
        } else {
            if (typeUtil.validateSpecial(params.invoiceVehicleInfo.sellerName)) {
                this.$Message.info('卖方单位/个人不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.sellerName) > 72) {
                this.$Message.info('卖方单位/个人最多为72个字符')
                return false
            }
        }
        if (!params.invoiceVehicleInfo.sellerTaxNo) {
            this.$Message.info('卖方单位代码/身份证号码不能为空')
            return false
        } else {
            if (!/^[A-Za-z0-9]{15,22}$/.test(params.invoiceVehicleInfo.sellerTaxNo)) {
                this.$Message.info('卖方单位代码/身份证号码只能输入数字和字母并且15-22个字符')
                return false
            }
        }
        if (params.invoiceVehicleInfo.sellerAddress) {
            if (typeUtil.validateSpecial(params.invoiceVehicleInfo.sellerAddress)) {
                this.$Message.info('卖方单位/个人住址不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.sellerAddress) > 80) {
                this.$Message.info('卖方单位/个人住址最多为80个字符')
                return false
            }
        }
        if (params.invoiceVehicleInfo.sellerPhone && !(typeUtil.validatePhone(params.invoiceVehicleInfo.sellerPhone) || typeUtil.validateTelephone(params.invoiceVehicleInfo.sellerPhone))) {
            this.$Message.info('卖方单位/个人电话电话格式不正确')
            return false
        }
        if (!params.invoiceVehicleInfo.licensePlate) {
            this.$Message.info('车牌照号不能为空')
            return false
        } else {
            if (typeUtil.validateSpecial(params.invoiceVehicleInfo.licensePlate)) {
                this.$Message.info('车牌照号不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.licensePlate) > 20) {
                this.$Message.info('车牌照号最多为20个字符')
                return false
            }
        }
        if (!params.invoiceVehicleInfo.registryNo) {
            this.$Message.info('登记证号不能为空')
            return false
        } else {
            if (typeUtil.validateSpecial(params.invoiceVehicleInfo.registryNo)) {
                this.$Message.info('登记证号不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.registryNo) > 20) {
                this.$Message.info('登记证号最多为20个字符')
                return false
            }
        }
        if (!params.invoiceVehicleInfo.vehicleType) {
            this.$Message.info('车辆类型不能为空')
            return false
        } else {
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.vehicleType) > 40) {
                this.$Message.info('车辆类型最多为40个字符')
                return false
            }
        }

        if (!params.invoiceVehicleInfo.vehicleNo) {
            this.$Message.info('车架号/车辆识别代码不能为空')
            return false
        } else {
            if (!/^[A-Za-z0-9*]{1,23}$/.test(params.invoiceVehicleInfo.vehicleNo)) {
                this.$Message.info('车架号/车辆识别代码只能为字母、数字或*号并且最大23位')
                return false
            }
        }
        if (!params.invoiceVehicleInfo.brandModel) {
            this.$Message.info('厂牌型号不能为空')
            return false
        } else {
            if (typeUtil.validateSpecial(params.invoiceVehicleInfo.brandModel)) {
                this.$Message.info('厂牌型号不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.brandModel) > 60) {
                this.$Message.info('厂牌型号最多为60个字符或空格')
                return false
            }
        }
        if (!params.invoiceVehicleInfo.vehicleAdministration) {
            this.$Message.info('转入地车辆管理所名称不能为空')
            return false
        } else {
            if (typeUtil.validateSpecial(params.invoiceVehicleInfo.vehicleAdministration)) {
                this.$Message.info('转入地车辆管理所名称不能含有特殊字符或空格')
                return false
            }
            if (typeUtil.getStrLength(params.invoiceVehicleInfo.vehicleAdministration) > 80) {
                this.$Message.info('转入地车辆管理所名称最多为80个字符')
                return false
            }
        }
        if (!params.invoiceTotalPrice) {
            this.$Message.info('车价合计不能为空或不能为0')
            return false
        }
        if (params.remarks && typeUtil.getStrLength(params.remarks) > 230) {
            this.$Message.info('备注最多为230个字符')
            return false
        } else {
            if (noSpaceSpecialReg.test(params.remarks)) {
                this.$Message.info('备注不能含有特殊字符')
                return false
            }
        }

        return true
    },
    // 二手车 保存 买方 信息
    bufferBuyerInfo () {
        let carData = this.carData
        let buyer = {
            buyertaxSerial: carData.buyertaxSerial,
            buyername: carData.buyername,
            buyeraddress: carData.buyeraddress,
            buyerphone: carData.buyerphone
        }
        return buyer
    },
    // 二手车 保存 卖方 信息
    bufferSellerInfo () {
        let carData = this.carData
        let seller = {
            auctionName: carData.auctionName,
            auctionAddress: carData.auctionAddress,
            auctionTaxNo: carData.auctionTaxNo,
            auctionBankAccount: carData.auctionBankAccount,
            auctionPhone: carData.auctionPhone,
            marketName: carData.marketName,
            marketTaxNo: carData.marketTaxNo,
            marketAddress: carData.marketAddress,
            marketBankAccount: carData.marketBankAccount,
            marketPhone: carData.marketPhone,
            sellerTaxNo: carData.sellerTaxNo,
            sellerName: carData.sellerName,
            sellerAddress: carData.sellerAddress,
            sellerPhone: carData.sellerPhone
        }
        return seller
    }
}
