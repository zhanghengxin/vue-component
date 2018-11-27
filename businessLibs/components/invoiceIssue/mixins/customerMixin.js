/**
 * 客户弹框 选择 mixins
 */

import { generateComputed } from '../store/helper'

export default {
    props: {
        dataObj: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            currentDataObj: {
                name: '',
                taxSerial: '',
                address: '',
                location: '',
                fixedPhone: '',
                phone: '',
                accountBank: '',
                bank: '',
                bankAccount: '',
                addressPhone: '',
                bankAndAccount: '',
                ...this.dataObj
            },
            suggestDataList: []
        }
    },
    methods: {
        doSuggest (query) {
            const self = this
            var han = /[\u4e00-\u9fa5]{2,}/
            if (han.test(query)) {
                this.$store.dispatch('suggestCompany', {
                    companyName: query,
                    callback: (dataList) => {
                        self.suggestDataList = dataList
                    }
                })
            } else {
                self.suggestDataList = []
            }
        },
        selectItem (index) {
            const targetData = this.suggestDataList[index]
            if (targetData) {
                this.currentDataObj = Object.assign(this.currentDataObj, targetData)
                for (let k in this.currentDataObj) {
                    if ((this.currentDataObj[k] + '') === 'null') {
                        this.currentDataObj[k] = ''
                    }
                }
            } else {
                let lastName = this.currentDataObj.name
                this.$nextTick(() => {
                    this.currentDataObj.name = lastName
                })
            }
        }
    },
    computed: {
        ...generateComputed(['showCustomerSelector'], state => state.invoiceEdit)
    }
}
