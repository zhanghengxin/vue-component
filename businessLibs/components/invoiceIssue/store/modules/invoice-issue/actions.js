/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: BWCloudPrepose-catering
 * @FileName: actions
 * @Dependence: --
 * @Description: --
 * @CreatedBy: zhangliao
 * @CreateDate: 2018/3/1 上午10:24
 * @LastModifiedBy: zhangliao
 * @LastModifiedDate: 2018/3/1 上午10:24
 *
 * --------------------------------------------------------------------------- *
 */

import http from '../utils/http'
import typeUtil from '../../../utils/typeUtil'
import {keyUtil} from '../../helper'
import Message from 'iview/src/components/message/index.js'

let timmer = null

const callIfFunc = (callee, args) => {
    if (typeUtil.isFunction(callee)) {
        callee(args)
    }
}

const actions = {
    // 获取客户分类
    getCustomerCategory ({commit}, {params = {}, callback}) {
        http.outPost('/api/customer/queryCustomerClassify', params, resp => {
            if (resp.success) {
                callIfFunc(callback, resp.data)

                var results = resp.data.results || []
                results.forEach((item) => {
                    item.label = item.classifyName
                    item.value = item.id
                })

                commit(keyUtil.getChangeName('customerCategory'), resp.data)
            }
        })
    },
    // 获取客户数据列表
    getCustomerList ({commit}, {params = {}, callback}) {
        let newParams = {
            pageNo: 1,
            pageSize: 10,
            ...params
        }
        // /api/invoiceManage/getCustomerInfoList  云抬头的
        http.outPost('/api/customer/queryCustomerInfo', newParams, resp => {
            if (resp.success) {
                callIfFunc(callback, resp.data)
                // results.forEach((item) => {
                //   item.customerName = item.name;
                //   item.accountBank = item.bank;
                //   item.taxSerial = item.taxId;
                //   item.address = item.location;
                //   item.phone = item.fixedPhone;
                // });
                commit(keyUtil.getChangeName('customerList'), resp.data)
            }
        })
    },
    // 获取商品分类
    getGoodsCategory ({commit}, {params = {}, callback}) {
        http.outPost('/api/goodsCode/initGoodsClassiftList', params, resp => {
            if (resp.success) {
                callIfFunc(callback, resp.data)
                commit(keyUtil.getChangeName('goodsCategory'), resp.data.results)
            }
        })
    },
    // 商品联想查询
    suggestGoodsList ({commit}, {goodsName, callback}) {
        let params = {}
        Object.assign(params, {
            goodsName: goodsName
        })
        // debugger
        http.outPost('/api/taxGoodsCode/getCommodityByAuto', params, resp => {
            if (resp.success) {
                const results = resp.data.results
                // console.log(results)
                callIfFunc(callback, results)
                // results.forEach((item) => {
                //   // item.name = item.name;
                //   item.taxSerial = item.tax_id;
                //   item.bankAndAccount = item.bank_and_account;
                //   item.addressPhone = item.address_and_phone;
                //   item.addressAndPhone = item.address_and_phone;
                //   item.accountBank = item.bank || '';
                //   item.address = item.location || '';
                //   item.phone = item.fixed_phone || item.mobile_phone || '';
                // });
                // commit(keyUtil.getChangeName('customerList'), results);
            }
        })
    },
    // 获取商品列表
    getGoodsList ({commit}, {params = {}, callback}) {
        let newParams = {
            pageNo: 1,
            pageSize: 10,
            ...params
        }
        http.outPost('/api/taxGoodsCode/invoice/goodsCodeList', newParams, resp => {
            if (resp.success) {
                callIfFunc(callback, resp.data)
                // const results = resp.data.results;
                // results.forEach((item) => {
                //   item.goodsName = item.artName;
                //   item.goodsCode = item.artNo;
                //   item.goodsTaxRate = item.taxRate;
                // });
                commit(keyUtil.getChangeName('goodsList'), resp.data.results)
            }
        })
    },
    // 获取负票 清单列表
    getNegativeList ({commit}, {params = {}, callback}) {
        let newParams = {
            pageNo: 1,
            pageSize: 10,
            ...params
        }
        http.outPost('/api/invoice/getInvoiceItemList', newParams, resp => {
            if (resp.success) {
                callIfFunc(callback, resp.data)
                // const results = resp.data.results;
                // results.forEach((item) => {
                //   item.goodsName = item.artName;
                //   item.goodsCode = item.artNo;
                //   item.goodsTaxRate = item.taxRate;
                // });
                commit(keyUtil.getChangeName('negativeList'), resp.data.results)
            }
        })
    },
    getSellerConfig ({commit}, {params, callback}) {
        http.outPost('/api/taxConfig/list', params, resp => {
            if (resp.success) {
                callIfFunc(callback, resp.data)
                const results = resp.data.results
                results.forEach((item) => {
                    item.goodsName = item.artName
                    item.goodsCode = item.artNo
                    item.goodsTaxRate = item.taxRate
                })
                commit(keyUtil.getChangeName('goodsList'), resp.data.results)
            }
        })
    },
    suggestCompany ({commit}, {companyName, callback}) {
        let params = {}
        Object.assign(params, {
            customerName: companyName
            // sort:'0',
            // orgCode:sessionStorage.getItem('orgCode')
        })
        http.outputPostResults('/api/invoiceManage/getCustomerInfoList', params, resp => {
            if (resp.success) {
                const results = resp.data
                callIfFunc(callback, results)
                results.forEach((item) => {
                    // item.name = item.name;
                    item.taxSerial = item.tax_id
                    item.bankAndAccount = item.bank_and_account
                    item.addressPhone = item.address_and_phone
                    item.addressAndPhone = item.address_and_phone
                    item.accountBank = item.bank || ''
                    item.address = item.location || ''
                    item.phone = item.fixed_phone || item.mobile_phone || ''
                })
                commit(keyUtil.getChangeName('customerList'), results)
            }
        })
    },
    // 编辑获取原始信息 -- 红字专票
    updatedRedInvoiceEditCurrentData ({dispatch, commit, state}, data) {
        return new Promise((resolve, reject) => {
            http.outPost('/api/redInvoice/getRedInfoByRedInfoNo', data).then(res => {
                let msg = ''
                if (res.success) {
                    let [det] = res.data ? res.data.results : []
                    if (det.invoiceTypeCode && det.invoiceTypeCode !== '004') {
                        Message.info('红冲票种与原票种不一致，请重新填写')
                        return false
                    }
                    det.priceTaxMark = det.invoiceDetailList[0] ? det.invoiceDetailList[0].priceTaxMark : state.currentData.priceTaxMark
                    det.originalInvoiceNo = det.invoiceNo
                    det.originalInvoiceCode = det.invoiceCode
                    det.invoiceDetailList.forEach(item => {
                        item.goodsQuantity = (+item.goodsQuantity < 0) ? (-item.goodsQuantity) : item.goodsQuantity
                        item.goodsTotalPrice = (+item.goodsTotalPrice < 0) ? (-item.goodsTotalPrice) : item.goodsTotalPrice
                        item.goodsTotalTax = (+item.goodsTotalTax < 0) ? (-item.goodsTotalTax) : item.goodsTotalTax
                    })
                    det.taxationMethod = det.collectionType + ''
                    det.buyerAddressPhone = det.buyerAdressPhone
                    commit('changeIsExistOriginalData', true)
                    dispatch('updatedInvoiceEditCurrentDataGenerate', det)
                    msg = ''
                } else {
                    if (res.errorCode === '10090') {
                        commit('changeOriginalInvoiceCode', data.invoiceCode)
                        commit('changeOriginalInvoiceNo', data.invoiceNo)
                        commit('changeIsExistOriginalData', false)
                        msg = res.errorMsg
                    }
                }
                resolve({
                    flage: res.success,
                    msg
                })
            }).catch((err) => {
                if (err.errorCode === '10090') {
                    commit('changeOriginalInvoiceCode', data.invoiceCode)
                    commit('changeOriginalInvoiceNo', data.invoiceNo)
                    commit('changeIsExistOriginalData', false)
                    resolve({
                        flage: false,
                        msg: err.errorMsg
                    })
                } else {
                    reject(err)
                }
            })
        })
    },
    // 编辑获取原始信息 -- 普票
    updatedInvoiceEditCurrentData ({dispatch, commit, state}, data) {
        let {invoiceCode, invoiceNo, invoiceTypeCode} = data
        let ajaxData = {
            invoiceCode,
            invoiceNo
        }
        return new Promise((resolve, reject) => {
            http.outPost('/api/invoice/wholeInvoice', ajaxData).then(res => {
                if (res.success) {
                    let [det] = res.data ? res.data.results : []
                    if (det.invoiceTypeCode !== invoiceTypeCode) {
                        Message.info('红冲票种与原票种不一致，请重新填写')
                        return false
                    }
                    if (det.invoiceTypeCode === '005' || det.invoiceTypeCode === '006') {
                        det.invoiceTotalPrice = (-det.invoiceTotalPrice).toFixed(2)
                        det.invoiceTotalTax = (-det.invoiceTotalTax).toFixed(2)
                    } else {
                        det.priceTaxMark = det.invoiceDetailsList[0] ? det.invoiceDetailsList[0].priceTaxMark : state.currentData.priceTaxMark
                    }

                    det.originalInvoiceNo = det.invoiceNo
                    det.originalInvoiceCode = det.invoiceCode
                    det.taxControlCode = ''
                    commit('changeIsExistOriginalData', true)
                    dispatch('updatedInvoiceEditCurrentDataGenerate', det)
                } else {
                    if (res.errorCode === '10090') {
                        commit('changeOriginalInvoiceCode', data.invoiceCode)
                        commit('changeOriginalInvoiceNo', data.invoiceNo)
                        commit('changeIsExistOriginalData', false)
                    }
                }
                resolve(res.success)
            }).catch((err) => {
                if (err.errorCode === '10090') {
                    commit('changeOriginalInvoiceCode', data.invoiceCode)
                    commit('changeOriginalInvoiceNo', data.invoiceNo)
                    commit('changeIsExistOriginalData', false)
                    resolve(false)
                } else {
                    reject(err)
                }
            })
        })
    },
    updatedInvoiceEditCurrentDataGenerate ({commit, state}, data) {
        let {
            buyerTaxNo, buyerName, buyerAddressPhone, buyerPhone, buyerEmail, buyerBankAccount, invoiceVehicleInfo,
            sellerTaxNo, sellerName, sellerAddressPhone, sellerBankAccount, invoiceTerminalCode,
            ...otherInfo
        } = data

        let invoiceDetailsList = otherInfo.invoiceDetailsList || otherInfo.invoiceDetailList || []

        delete otherInfo.invoiceDetailsList
        delete otherInfo.invoiceDetailList

        commit('changePhone', (buyerPhone || ''))
        commit('changeEmail', (buyerEmail || ''))

        let buyerInfo = {
            taxSerial: buyerTaxNo,
            name: buyerName,
            addressAndPhone: buyerAddressPhone,
            bankAndAccount: buyerBankAccount
        }
        let sellerInfo = {
            taxSerial: sellerTaxNo,
            name: sellerName,
            addressAndPhone: sellerAddressPhone,
            bankAndAccount: sellerBankAccount
        }

        let detailList = invoiceDetailsList.map(item => {
            item.hasDiscountLine = (item.invoiceLineNature === '2')
            item.isDiscountLine = (item.invoiceLineNature === '1')
            // if (item.hasDiscountLine) {
            //   item.goodsTotalPrice = (+item.goodsTotalPrice) + (+invoiceDetailsList[index+1].goodsTotalPrice)
            // }
            if (state.isNegative) {
                item.goodsQuantity = (+item.goodsQuantity) ? (-item.goodsQuantity) : ''
                item.goodsTotalPrice = '-' + item.goodsTotalPrice.toFixed(2)
                item.goodsTotalTax = (+item.goodsTaxRate) ? ('-' + item.goodsTotalTax.toFixed(2)) : '0.00'
            } else {
                item.goodsTotalPrice = (+item.goodsTotalPrice).toFixed(2)
                item.goodsTotalTax = (+item.goodsTaxRate) ? (+item.goodsTotalTax).toFixed(2) : '0.00'
            }
            if (state.showCommonCopyEdit) {
                item.noEdit = false
            }
            // // item.noEdit = true
            // if (!item.isDiscountLine) {
            //   detailList.push(item)
            // }
            return item
        })
        let currentData = {
            verifyCode: '',
            place: invoiceTerminalCode,
            email: buyerEmail,
            phone: buyerPhone,
            buyerInfo,
            sellerInfo,
            detailList: [...detailList],
            issuePlace: {},
            carData: {...invoiceVehicleInfo},
            ...otherInfo
        }
        if (data.invoiceTypeCode === '005' || data.invoiceTypeCode === '006') {
            let [address, phone] = buyerInfo.addressAndPhone.split('※')
            currentData.carData.buyertaxSerial = buyerInfo.taxSerial
            currentData.carData.buyername = buyerInfo.name
            currentData.carData.buyeraddress = address
            currentData.carData.buyerphone = phone

            currentData.carData.goodsTotalPrice = (+data.invoiceTotalPrice).toFixed(2)
            currentData.carData.goodsTotalTax = (+data.invoiceTotalTax).toFixed(2)
        }

        if (otherInfo.taxationMethod === '2') {
            currentData.detailList[0].deduction = otherInfo.deductibleAmount
        }

        // 清单负票
        const [list1] = detailList
        let isTax
        if (list1) {
            isTax = Boolean(+list1.priceTaxMark)
        }
        if (otherInfo.invoiceListMark === '1' && !state.showCommonCopyEdit) {
            let tp = isTax ? (+otherInfo.invoiceTotalPriceTax).toFixed(2) : (+otherInfo.invoiceTotalPrice).toFixed(2)
            let singelList = false
            if (detailList.length === 1) {
                singelList = true
            } else {
                let dtl = detailList.map(item => item.goodsTaxRate)
                let isSingle = new Set(dtl)
                if (isSingle.size === 1) {
                    singelList = true
                }
            }

            currentData.detailList = [{
                goodsLineNo: 1,
                goodsCode: '', // 商品编码
                goodsPersonalCode: '', // 自行编码
                goodsName: '（详见销货清单）', // 商品名称
                goodsTaxItem: '', // 商品税目
                goodsSpecification: '', // 规格型号
                goodsUnit: '', // 计量单位
                goodsQuantity: '', // 商品数量
                goodsPrice: '', // 商品单价
                goodsTotalPrice: '-' + tp, // 金额
                goodsTotalTax: '-' + otherInfo.invoiceTotalTax, // 税额
                goodsTaxRate: singelList ? list1.goodsTaxRate : '', // 税率
                priceTaxMark: list1.priceTaxMark, // 含税标志0：不含税 1：含税
                vatSpecialManagement: '', // 增值税特殊管理
                freeTaxMark: '', // 零税率标识 空代表无
                preferentialMarkFlag: '', // 是否使用优惠政策 0:未使用，1:使用
                invoiceLineNature: '0', // 发票行性质       明细
                goodsDiscountLineNo: '', // ite
                noEdit: false
                // singelList, // 清单 单税率 金额可编辑
            }]
        }

        let newPriceTaxMark = currentData.priceTaxMark

        currentData.priceTaxMark = state.currentData.priceTaxMark

        commit(keyUtil.getChangeName('currentData'), currentData)

        if (timmer) {
            clearTimeout(timmer)
        }
        timmer = setTimeout(function () {
            commit(keyUtil.getChangeName('priceTaxMark'), newPriceTaxMark)
            if (!state.showCommonCopyEdit || data.isInvoiceCopyPage) {
                commit(keyUtil.getChangeName('serialNo'), '')
            }
            clearTimeout(timmer)
        }, 100)
    },

    // 获取当前号码
    getCurrentNoCode ({commit}, data) {
        http.outPost('/api/invoiceManage/getInvoiceCodeAndNum', data).then(resp => {
            let [res] = resp.data.results
            commit(keyUtil.getChangeName('invoiceNo'), res.invoiceNo)
            commit(keyUtil.getChangeName('invoiceCode'), res.invoiceCode)
        }).catch(() => {
            commit(keyUtil.getChangeName('invoiceNo'), '')
            commit(keyUtil.getChangeName('invoiceCode'), '')
        })
    }

}

export default actions
