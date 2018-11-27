// 折扣行 相关的mixins
import { toKeepFixed2 } from '../utils/numberUtil'
export default {
    computed: {
        discountLines () {
            return this.detailList.filter(item => (item.isDiscountLine))
        },
        // 折扣金额合计
        discountTotalAmount () {
            let total = this.discountLines.reduce((total, item) => {
                let numValue = parseFloat(item.goodsTotalPrice)
                if (Number.isNaN(numValue)) {
                    return total
                }
                return total + numValue
            }, 0.00)
            if (total) {
                return '-' + toKeepFixed2(total * (-1))
            } else {
                return '0.00'
            }
        },
        // 折扣税额合计
        discountTotalTax () {
            let total = this.discountLines.reduce((total, item) => {
                let numValue = parseFloat(item.goodsTotalTax)
                if (Number.isNaN(numValue)) {
                    return total
                }
                return total + numValue
            }, 0.00)
            if (total) {
                return '-' + toKeepFixed2(total * (-1))
            } else {
                return '0.00'
            }
        }
    },
    methods: {
        toggleDiscountSelector (index, dataObj) {
            this.currentIndex = index
            // 折扣行数为当前行及其之前所有可折扣的（税率相同）行数之和
            let count = 1
            let tmpObj
            let infoList = this.detailList.slice(0, index + 1)
            let discountPriceMap = {
                1: (+dataObj.goodsTotalPrice)
            }

            // 便于从折扣行开始计算 折扣总金额
            infoList.reverse()

            // 下标从1开始，0是当前行
            for (let i = 1; i <= index; i++) {
                tmpObj = infoList[i]
                if (tmpObj.isDiscountLine || tmpObj.hasDiscountLine || tmpObj.taxRate !== dataObj.taxRate) {
                    continue
                }
                count++

                discountPriceMap[count] = (+discountPriceMap[count - 1]) + ((+tmpObj.goodsTotalPrice) || 0)
            }
            this.currentLineObj = dataObj
            this.currentLineIndex = index
            this.maxDiscountLines = count
            this.discountPriceMap = discountPriceMap
            this.showDiscountSelector = true
        },
        changeDiscount (discountInfo) {
            let { discountLines } = discountInfo
            // 本次会有折扣的行
            const withDiscountList = this.getDiscountList(discountLines)
            // 本次新增的折扣行
            const discountList = this.getComputedDiscount(withDiscountList, discountInfo)// .filter(item => !item.notDiscount);
            if (!discountList) {
                return
            }

            const detailList = this.detailList
            const newDetailList = [...detailList]
            for (let i = withDiscountList.length; i--;) {
                let index = newDetailList.indexOf(withDiscountList[i])
                if (!discountList[i].notDiscount) {
                    newDetailList[index] = {
                        ...withDiscountList[i],
                        hasDiscountLine: true
                    }
                    newDetailList.splice(index + 1, 0, discountList[i])
                }
            }

            this.detailList = newDetailList
            this.showDiscountSelector = false
            this.$store.commit('changeShowDiscountSelector', false)
            if (newDetailList.length > 8) {
                if (this.invoiceListMark !== '1' && !this.isEInvoice) {
                    this.$Message.warning({
                        content: '超过8行明细将必须使用清单打印,票面将只显示（详见销货清单）和折扣!',
                        duration: 10,
                        closable: true
                    })
                    this.invoiceListMark = '1'
                }
            }
        },
        getDiscountList (discountLines) {
            const currentLineObj = this.currentLineObj
            const detailList = this.detailList
            // 先把需要折扣的行 拎出来
            const withDiscountList = []
            const currentIndex = this.currentIndex
            let tmpLineObj
            let count = 0
            for (let i = currentIndex; i >= 0; i--) {
                // 取所有当前行前面的 折扣等于当前行的能折扣的行，数够行数
                tmpLineObj = detailList[i]
                if (!tmpLineObj.isDiscountLine && !tmpLineObj.hasDiscountLine && tmpLineObj.taxRate === currentLineObj.taxRate) {
                    withDiscountList.unshift(tmpLineObj)
                    if (++count === discountLines) {
                        break
                    }
                }
            }
            return withDiscountList
        },
        getComputedDiscount (withDiscountList, discountInfo) {
            let {discountLines, discountType, discountValue} = discountInfo
            const discountList = []
            const discountNum = toKeepFixed2(+this.discountPriceMap[discountLines])

            for (let i = 0, len = withDiscountList.length; i < len; i++) {
                discountList.push({
                    ...withDiscountList[i],
                    goodsSpecification: '',
                    goodsUnit: '',
                    goodsQuantity: '',
                    goodsPrice: '',
                    isDiscountLine: true,
                    notDiscount: false
                })
            }

            // 折扣率
            if (discountType === 'rate') {
                for (let i = discountList.length; i--;) {
                    let tmpObj = discountList[i]

                    let tp = this.minToPlus(tmpObj.goodsTotalPrice * discountValue / 100)
                    let noTaxTotalPrice
                    if (+this.priceTaxMark) {
                        noTaxTotalPrice = tp / (1 + (+tmpObj.goodsTaxRate))
                    } else {
                        noTaxTotalPrice = tp
                    }
                    let tt = this.minToPlus(noTaxTotalPrice * tmpObj.goodsTaxRate)
                    tmpObj.goodsTotalPrice = +tp ? ('-' + tp) : '0.00'
                    tmpObj.goodsTotalTax = +tt ? ('-' + tt) : '0.00'
                }
            } else {
                // 折扣金额
                for (let i = discountList.length; i--;) {
                    let tmpObj = discountList[i]
                    // 折扣金额/被折扣总金额*当前被折扣行的金额 ，被折扣金额保留两位小数。再用（原始金额-被折扣金额）*税率，计算出税额，税额留两位小数后如果小于0.01，则该行不进行折扣
                    let tp = (+tmpObj.goodsTotalPrice) / discountNum * discountValue
                    let noTaxTotalPrice
                    if (+this.priceTaxMark) {
                        noTaxTotalPrice = tp / (1 + (+tmpObj.goodsTaxRate))
                    } else {
                        noTaxTotalPrice = tp
                    }
                    let tt = this.minToPlus(noTaxTotalPrice * (+tmpObj.goodsTaxRate))
                    tmpObj.goodsTotalPrice = '-' + this.minToPlus(tp)
                    if (+tt >= 0.01 || (+tmpObj.goodsTaxRate === 0)) {
                        if (+tmpObj.goodsTaxRate === 0) {
                            tmpObj.goodsTotalTax = '0.00'
                        } else {
                            tmpObj.goodsTotalTax = '-' + this.minToPlus(tt)
                        }
                    } else {
                        tmpObj.notDiscount = true
                        tmpObj.goodsTotalTax = '0.00'
                    }
                }
                // 折扣税额小于0.01的行
                const notDis = discountList.filter((item) => item.notDiscount)
                // 折扣税额大于0.01的行
                const hasDis = discountList.filter((item) => !item.notDiscount)
                // 折扣税额大于0.01的行金额总和
                const hasDisTP = hasDis.reduce((total, item) => {
                    let numValue = parseFloat(item.goodsTotalPrice)
                    if (Number.isNaN(numValue)) {
                        return total
                    }
                    return total + numValue
                }, 0.00)

                if (hasDis.length === 0) {
                    this.$Message.warning('请输入有效的折扣金额')
                    return false
                }
                if (notDis.length > 0) {
                    let hasObj = hasDis[hasDis.length - 1]
                    let tp = this.minToPlus(discountValue + hasDisTP - hasObj.goodsTotalPrice)
                    let noTaxTotalPrice
                    hasObj.goodsTotalPrice = +tp ? ('-' + tp) : '0.00'
                    if (+this.priceTaxMark) {
                        noTaxTotalPrice = tp / (1 + (+hasObj.goodsTaxRate))
                    } else {
                        noTaxTotalPrice = tp
                    }
                    let tax = this.minToPlus(noTaxTotalPrice * (+hasObj.goodsTaxRate))
                    hasObj.goodsTotalTax = +tax ? ('-' + tax) : '0.00'
                } else {
                    let hasObj = hasDis[hasDis.length - 1]
                    // console.log(hasObj,hasObj.goodsTotalPrice, +hasObj.goodsTotalPrice)
                    let lastPrice = -hasObj.goodsTotalPrice
                    let tp = this.minToPlus(discountValue + hasDisTP + lastPrice)
                    let noTaxTotalPrice
                    hasObj.goodsTotalPrice = +tp ? ('-' + tp) : '0.00'
                    if (+this.priceTaxMark) {
                        noTaxTotalPrice = tp / (1 + (+hasObj.goodsTaxRate))
                    } else {
                        noTaxTotalPrice = tp
                    }
                    let tax = this.minToPlus(noTaxTotalPrice * (+hasObj.goodsTaxRate))
                    hasObj.goodsTotalTax = +tax ? ('-' + tax) : '0.00'
                }
            }

            return discountList
        },
        minToPlus (val) {
            val = Number(val)
            if (val < 0) {
                return toKeepFixed2(-val)
            } else {
                return toKeepFixed2(val)
            }
        }
    }
}
