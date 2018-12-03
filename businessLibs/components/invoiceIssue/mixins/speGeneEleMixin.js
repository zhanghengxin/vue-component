// 专普电 相关
import typeUtil from '../utils/typeUtil'

export default {
    // 获取 专普电 的数据，成品油, 农产品收购（普电）
    generateZpdData () {
        const invoiceData = this.currentData
        const buyerInfo = invoiceData.buyerInfo
        const sellerInfo = invoiceData.sellerInfo
        const detailList = invoiceData.detailList

        const totalPrice = detailList.reduce((total, item) => {
            let numValue = parseFloat(item.goodsTotalPrice)
            if (Number.isNaN(numValue)) {
                return total
            }
            return total + numValue
        }, 0.00)
        const totalTax = detailList.reduce((total, item) => {
            let numValue = parseFloat(item.goodsTotalTax)
            if (Number.isNaN(numValue)) {
                return total
            }
            return total + numValue
        }, 0.00)

        let [storeDedu] = invoiceData.detailList
        let deductibleAmount = (this.taxationMethod === '2') ? storeDedu.deduction : ''
        if (this.isNegative) {
            // 服务器，并且是负数票，扣除额就传空
            if (this.isDishOrServer === 'server') {
                deductibleAmount = ''
            } else if (this.isDishOrServer === 'dish') {
                // 盘的负数差额票，扣除额传负数值
                deductibleAmount = (+deductibleAmount > 0) ? (-deductibleAmount) : deductibleAmount
            }
        }

        let params = {
            id: invoiceData.id,
            serialNo: invoiceData.serialNo, // 开票流水号
            sourceMark: invoiceData.sourceMark || '', // 来源标示

            // 负数开票 原发票信息
            originalInvoiceCode: invoiceData.originalInvoiceCode,
            originalInvoiceNo: invoiceData.originalInvoiceNo,
            // 销方信息
            sellerTaxNo: sellerInfo.taxSerial,
            sellerName: sellerInfo.name,
            sellerAddressPhone: sellerInfo.addressAndPhone,
            sellerBankAccount: sellerInfo.bankAndAccount,
            // 购方信息
            buyerTaxNo: buyerInfo.taxSerial,
            buyerName: buyerInfo.name,
            buyerAddressPhone: buyerInfo.addressAndPhone,
            buyerBankAccount: buyerInfo.bankAndAccount,
            buyerEmail: invoiceData.email,
            buyerPhone: invoiceData.phone,

            invoiceTypeCode: this.invoiceTypeCode, // 发票种类编码，004专票 007普票 026电票 005机动车 025卷票
            invoiceTerminalCode: (this.invoiceTypeCode === '026') ? '' : this.invoiceTerminalCode, // 开票终端编码
            invoiceSpecialMark: invoiceData.invoiceSpecialMark, // 特殊票种标记，00：普通发票 02：农业发票 06：抵扣通行费 07：其他通行费 01 农产品销售   02 农产品收购    08 成品油  默认：00
            invoiceType: this.config.enableCommonNagative ? '1' : '0', // 开票类型0:正数发票（蓝票） 1：负数发票（红票）

            drawer: invoiceData.drawer,
            payee: invoiceData.payee,
            checker: invoiceData.checker,
            invoiceListMark: (this.invoiceTypeCode === '026' || this.isNegativeListMark) ? '0' : invoiceData.invoiceListMark, // 清单标志： 0：无清单 1：带清单 （发票明细大于等于8行必须带清单
            taxationMethod: invoiceData.taxationMethod, // 征税方式 0：普通征税，2：差额征税
            deductibleAmount, // .replace(/^(\d+?\.\d{2})+(\d*)$/g, '$1'), // 扣除额

            invoiceTotalPrice: (+invoiceData.priceTaxMark) ? (totalPrice - totalTax) : totalPrice,
            invoiceTotalTax: totalTax,
            invoiceTotalPriceTax: (+invoiceData.priceTaxMark) ? totalPrice : (totalPrice + totalTax),
            remarks: invoiceData.remarks,
            invoiceDetailsList: detailList.map((item, index) => {
                let newItem = {}
                // invoiceID = item.invoiceID || ''
                newItem.goodsLineNo = index + 1// 明细行号
                newItem.goodsCode = item.goodsCode ? item.goodsCode.slice(0, 19) : '' // 商品编码
                newItem.goodsPersonalCode = item.goodsCode ? item.goodsCode.slice(19) : '' // 自行编码
                newItem.goodsName = item.goodsName || '' // 商品名称
                newItem.goodsTaxItem = item.goodsTaxItem || '' // 商品税目
                newItem.goodsSpecification = item.goodsSpecification || '' // 规格型号
                newItem.goodsUnit = item.goodsUnit || '' // 计量单位
                newItem.goodsQuantity = item.goodsQuantity || '' // 商品数量
                newItem.goodsPrice = item.goodsPrice || '' // 商品单价
                newItem.goodsTotalPrice = item.goodsTotalPrice // 金额
                newItem.goodsTotalTax = item.goodsTotalTax // 税额
                newItem.goodsTaxRate = item.goodsTaxRate // 税率
                newItem.priceTaxMark = invoiceData.priceTaxMark // 含税标志0：不含税 1：含税
                if (item.vatSpecialManagement) {
                    newItem.vatSpecialManagement = item.vatSpecialManagement // 增值税特殊管理
                } else {
                    newItem.vatSpecialManagement = (item.useDiscount === 'Y') ? item.discountType : '' // 增值税特殊管理
                }
                if (item.freeTaxMark) {
                    newItem.freeTaxMark = item.freeTaxMark // 零税率标识 空代表无
                } else {
                    newItem.freeTaxMark = (+item.goodsTaxRate) ? '' : item.freeType // 零税率标识 空代表无
                }
                if (item.preferentialMarkFlag) {
                    newItem.preferentialMarkFlag = item.preferentialMarkFlag
                } else {
                    newItem.preferentialMarkFlag = (item.useDiscount === 'Y') ? '1' : '0' // 是否使用优惠政策 0:未使用，1:使用
                }

                newItem.invoiceLineNature = item.isDiscountLine ? '1' : (item.hasDiscountLine ? '2' : '0') // 发票行性质       明细
                newItem.goodsDiscountLineNo = item.isDiscountLine ? index : '' // item.isDiscountLine ? '1' : (item.hasDiscountLine ? '2' : '0'); //折行对应行号
                return newItem
            })
        }
        if (this.config.enableSpecialNagative) {
            params.redInfoNo = this.redInfoNo
            params.notificationNo = this.redInfoNo
        }

        return params
    },
    // 校验 专普电 的数据
    validateZpdInvoice () {
        if (!this.isShowNegative) {
            this.$Message.info('请添加费用项目')
            return false
        }
        const buyerInfo = this.buyerInfo

        if (!buyerInfo.name) {
            this.$Message.info('购方名称不能为空')
            return false
        }
        if (typeUtil.validateSpecial(buyerInfo.name)) {
            this.$Message.info('购方名称不能含有特殊字符或者空格')
            return false
        }
        if (this.invoiceTypeCode === '004') {
            if (!buyerInfo.taxSerial) {
                this.$Message.info('纳税人识别号不能为空')
                return false
            }
            if (buyerInfo.taxSerial && !typeUtil.validateTaxNo(buyerInfo.taxSerial)) {
                this.$Message.info('纳税人识别号应为15-20位字母或数字！')
                return false
            }
        } else {
            if (buyerInfo.taxSerial && !typeUtil.validateTaxNo(buyerInfo.taxSerial)) {
                this.$Message.info('纳税人识别号应为15-20位字母或数字！')
                return false
            }
        }

        // if (this.invoiceTypeCode === '026') {
        //     let { email, phone } = this.currentData
        //     if (email || phone) {
        //       if (email && !typeUtil.validateEmail(email)) {
        //         this.$Message.info('邮箱格式不正确！')
        //         return false
        //       }
        //       if (phone && !typeUtil.validatePhone(phone)) {
        //         this.$Message.info('手机号格式不正确！')
        //         return false
        //       }
        //     } else {
        //       this.$Message.info('邮箱和手机号至少填写一个！')
        //       return false
        //     }
        // }

        let params = this.generateData()
        let {invoiceDetailsList = []} = params
        if (invoiceDetailsList.some((item) => {
            return !item.goodsName
        })) {
            this.$Message.warning('货物或应税劳务名称不能为空！')
            return false
        }

        if (invoiceDetailsList.some((item) => {
            return !item.goodsTotalPrice
        })) {
            this.$Message.warning('金额不能为空！')
            return false
        }

        if (typeUtil.validateSpecial(params.payee) || typeUtil.validateSpecial(params.checker)) {
            this.$Message.info('收款人或复核不能包含特殊字符！')
            return false
        }
        if (this.invoiceTypeCode === '004') {
            if (this.taxationMethod === '2') {
                if (typeUtil.getStrLength(params.remarks) > 160) {
                    this.$Message.info('备注长度最长为160个字符！')
                    return false
                }
            } else {
                if (typeUtil.getStrLength(params.remarks) > 184) {
                    this.$Message.info('备注长度最长为184个字符！')
                    return false
                }
            }
        } else {
            if (this.taxationMethod === '2') {
                if (typeUtil.getStrLength(params.remarks) > 114) {
                    this.$Message.info('备注长度最长为114个字符！')
                    return false
                }
            } else {
                if (typeUtil.getStrLength(params.remarks) > 138) {
                    this.$Message.info('备注长度最长为138个字符！')
                    return false
                }
            }
        }
        return true
    }
}
