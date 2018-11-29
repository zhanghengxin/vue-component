/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: BWCloudPrepose-catering
 * @FileName: mutations.js
 * @Dependence: --
 * @Description: --
 * @CreatedBy: zhangliao
 * @CreateDate: 2018/3/1 上午10:21
 * @LastModifiedBy: zhangliao
 * @LastModifiedDate: 2018/3/1 上午10:21
 *
 * --------------------------------------------------------------------------- *
 */

import {generateMutations} from '../../helper'
import {getDefaultDetailTpl, getDefaultCurrentData, getDefaultCarTpl} from '../../stateHelper'

const mutations = {
    ...generateMutations([
        'currentData',
        'customerCategory',
        'customerList',
        'goodsCategory',
        'goodsList',
        'negativeList',
        'showCustomerSelector',
        'showAddGoods',
        'currentCustomerType',
        'showGoodsSelector',
        'showDifference',
        'showDiscountSelector',
        'showCommonNeigativeNext',
        'isNegative',
        'showListGoodsSelector',
        'showCommonCopyEdit',
        'isExistOriginalData',
        'isOpenReComputed',
        'isIssue',
        'isAutoStage',
        'editOtherInfo',
        'showRedInfoNoSelector'
    ], state => state),
    ...generateMutations([
        'carData',
        'serialNo',
        'invoiceCode',
        'invoiceNo',
        'originalInvoiceCode',
        'originalInvoiceNo',
        'email',
        'phone',
        'taxationMethod',
        'invoiceListMark',
        'invoiceSpecialMark',
        'priceTaxMark',
        'buyerInfo',
        'sellerInfo',
        'detailList',
        'machineNo',
        'payee',
        'checker',
        'drawer',
        'remarks',
        'verifyCode',
        'taxControlCode',
        'issuePlace'
    ], state => state.currentData),
    // ...generateMutations([
    //     'sellerName',
    //     'sellerTaxNo',
    //     'sellerAddress',
    //     'sellerPhone',
    //     'licensePlate',
    //     'registryNo',
    //     'vehicleNo',
    //     'brandModel',
    //     'vehicleAdministration',

    //     'certificateNo',
    //     'engineNo',
    //     'freeTaxMark',
    //     'drawerType',
    //     'goodsPersonalCode',
    //     'importCertificateNo',
    //     'inspectionListNo',
    //     'manufacturingEnterprise',
    //     'originPlace',
    //     'passengersLimited',
    //     'paymentVoucherNo',
    //     'preferentialMarkFlag',
    //     'tonnage',
    //     'vatSpecialManagement',
    //     'vehicleType',
    //     'goodsCode',
    // ], state => state.currentData.carData),

    /**
     * 暂存成功重置填写的信息，不重置销方信息和收款、复核、开票人
     * 不能动state，以及currentData的引用，这个在上面的computed里面用到了，动了数据reset之后就放不到最终的引用的地方了
     * @param state
     */
    partReset: (state) => {
        let partCurrentData = getDefaultCurrentData()
        // 解决因为含税标志改变导致的第一行数据变为老数据的问题
        partCurrentData.priceTaxMark = state.currentData.priceTaxMark

        delete partCurrentData.sellerInfo
        delete partCurrentData.payee
        delete partCurrentData.checker
        delete partCurrentData.drawer

        let initStateDefault = {
            customerCategory: [],
            customerList: [],
            goodsCategory: [],
            goodsList: [],
            negativeList: [],
            showListGoodsSelector: false,
            isIssue: false,
            isNegative: false,
            showCustomerSelector: false,
            currentCustomerType: '',
            showGoodsSelector: false,
            showDifference: false,
            showDiscountSelector: false,
            showCommonNeigativeNext: false,
            showCommonCopyEdit: false,
            isExistOriginalData: true,
            isOpenReComputed: false,
            showRedInfoNoSelector: false,
            isAutoStage: false,
            editOtherInfo: {},
            defaultDetailTpl: getDefaultDetailTpl()
        }
        for (let [k, v] of Object.entries(initStateDefault)) {
            state[k] = v
        }
        // 车
        partCurrentData.carData = getDefaultCarTpl()

        Object.assign(state.currentData, partCurrentData)
    },
    /**
     * 重置所有信息
     * @param state
     */
    reset: (state) => {
        mutations.partReset(state)
        Object.assign(state.currentData, {
            // 销方信息
            sellerInfo: {
                taxSerial: '',
                name: '',
                addressAndPhone: '',
                bankAndAccount: ''
            },
            // 开票人
            drawer: '',
            // 复核人
            checker: '',
            // 收款人
            payee: ''
        })
    }
}

export default mutations
