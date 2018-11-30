<!-- 客户选择 弹框 -->
<template>
    <div>
        <Modal v-model="showCustomerSelector" title="选择客户" width="60%" @on-visible-change="visibleStateChange" @on-ok="selectItem">
            <div class="wrap red-invoice-sell-modal">
                <LabelSelect inputLabel="客户分类" :dataList="categoryList" :inputValue="cusQuery.customerCategory" @change="cusQuery.customerCategory = arguments[1]"></LabelSelect>
                <LabelInput inputLabel="客户名称" placeholder="客户名称" :inputValue="cusQuery.customerName" @change="cusQuery.customerName = arguments[1]"></LabelInput>
                <LabelInput inputLabel="客户编码" placeholder="客户编码" :inputValue="cusQuery.customerCode" @change="cusQuery.customerCode = arguments[1]"></LabelInput>
                <FuncButton buttonType="first" inputLabel="查询" :clickCallback="queryBtn"></FuncButton>
                <FuncButton buttonType="first" inputLabel="选择" :clickCallback="selectItem"></FuncButton>
            </div>

            <BwDataGrid
                ref="customerWrap"
                table-ref="customerSelector"
                :columns="columns"
                :data="resultList"
                :total="resultTotal"
                :highlight-row="true"
                :page-size-opts="[10]"
                @bw-query="query"
                @bw-current-change="changeCurrentRow"
                @bw-row-dbl-click="selectItem"
            />
        </Modal>
    </div>
</template>

<script>
import LabelSelect from '../component/LabelSelect'
import LabelInput from '../component/LabelInput'
import FuncButton from '../component/FuncButton'
import { keyUtil, generateComputed } from '../store/helper'

const propMixin = {
    computed: {
        ...generateComputed(['currentCustomerType', 'showCustomerSelector'], state => state.invoiceEdit)
    }
}
const cusQueryTpl = {
    customerCategory: '',
    customerName: '',
    customerCode: ''
}

export default {
    name: 'customer-selector',
    mixins: [propMixin],
    components: {
        LabelSelect,
        LabelInput,
        FuncButton
    },
    props: {
        invoiceTypeCode: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            categoryList: [],
            cusQuery: {
                ...cusQueryTpl
            },
            cusQueryTpl: {...cusQueryTpl},
            resultTotal: 0, // 查询结果总数
            resultList: [], // 查询结果
            pagination: null,
            columns: [
                {
                    type: 'index',
                    width: 45,
                    title: '序号'
                },
                {
                    title: '客户分类',
                    ellipsis: true,
                    key: 'classifyName',
                    minWidth: 100
                },
                {
                    title: '客户名称',
                    ellipsis: true,
                    key: 'customerName',
                    minWidth: 150
                },
                {
                    title: '客户编码',
                    ellipsis: true,
                    key: 'customerCode',
                    minWidth: 100
                },
                {
                    title: '纳税人识别号',
                    ellipsis: true,
                    key: 'taxNo',
                    width: 165
                }
            ]
        }
    },
    created () {
        this.$store.dispatch('getCustomerCategory', {
            callback: respData => {
                let categoryList = respData.results || []
                this.categoryList = categoryList
                this.$_categoryMap = categoryList.reduce((result, item) => {
                    result[item.id] = item
                    return result
                }, {})
                this.query()
            }
        })
    },
    methods: {
        queryBtn () {
            this.$refs.customerWrap.onChanged(1)
        },
        query ({pageNo = 1, pageSize = 10} = {}) {
            this.currentRow = null
            this.pagination = {pageNo, pageSize}
            let params = {
                ...this.cusQuery,
                ...this.pagination
            }

            params.classifyId = params.customerCategory
            delete params.customerCategory

            let categoryMap = this.$_categoryMap || {}
            this.$store.dispatch('getCustomerList', {
                params,
                callback: respData => {
                    let renderData = () => {
                        let dataResults = (respData.results || []).map(item => {
                            let target = categoryMap[item.classifyId]

                            item.categoryName = target ? target.classifyName : ''
                            return item
                        })

                        this.resultList = dataResults
                        this.resultTotal = parseInt(respData.total)
                    }
                    if (Object.keys(categoryMap).length === 0) {
                        setTimeout(renderData, 10)
                    } else {
                        renderData()
                    }
                }
            })
        },
        riskCustomer (fun) {
            let params = {
                customerName: this.currentRow.customerName,
                customerTaxCode: this.currentRow.taxNo,
                invoiceType: this.invoiceTypeCode
            }
            this.http.outPost('/api/ruleCheck/checkCustomer', {
                ...params
            }, (res) => {
                if (res.data.results[0] && (res.data.results[0].returncode + '') === '1') {
                    this.$Modal.confirm({
                        title: '提示',
                        content: res.data.results[0].returnMsg,
                        onOk: () => {
                            fun()
                        },
                        onCancel: () => {}
                    })
                    return
                }
                fun()
            })
        },
        chooseCustomer () {
            if (this.currentRow) {
                let status = +this.currentRow.status
                if (!status) {
                    this.$Message.warning('该客户已冻结！')
                } else {
                    this.showCustomerSelector = false
                    const currentCustomerInfoKey = this.currentCustomerType + 'Info'
                    let { taxNo, customerName, address, phone, bankName, bankAccount } = this.currentRow
                    const current = {
                        taxSerial: taxNo || '',
                        name: customerName || '',
                        addressAndPhone: (address || '') + (phone || ''),
                        bankAndAccount: (bankName || '') + (bankAccount || '')
                    }
                    this.$store.commit(keyUtil.getChangeName(currentCustomerInfoKey), current)

                    this.$refs.customerWrap.clearCurrentRow()
                    this.currentRow = null
                    this.cusQuery = {...cusQueryTpl}
                }
            } else {
                this.$Message.warning('没有选中任何数据')
            }
        },
        selectItem () {
            this.riskCustomer(this.chooseCustomer)
        },
        visibleStateChange (state) {
            this.cusQueryTpl = {...cusQueryTpl}
            if (state) {
                this.$refs.customerWrap.onChanged(1)
            }
            this.showCustomerSelector = state
        },
        changeCurrentRow (newRow, oldRow) {
            this.currentRow = newRow
        }
    },
    watch: {
        showCustomerSelector (val) {
            if (!val) {
                this.$refs.customerWrap.onChanged(1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
