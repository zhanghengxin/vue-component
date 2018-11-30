<!-- 红字负票  选择红字信息 弹框 -->
<template>
    <div>
        <Modal v-model="showRedInfoNoSelector" title="选择发票代码" width="60%" @on-visible-change="visibleStateChange" @on-ok="selectItem">
            <div class="wrap">
                <LabelInput inputLabel="发票代码" placeholder="发票代码" :inputValue="cusQuery.invoiceCode" @change="cusQuery.invoiceCode = arguments[1]"></LabelInput>
                <LabelInput inputLabel="发票号码" placeholder="发票号码" :inputValue="cusQuery.invoiceNo" @change="cusQuery.invoiceNo = arguments[1]"></LabelInput>
                <FuncButton buttonType="first" inputLabel="查询" :clickCallback="queryBtn"></FuncButton>
                <FuncButton buttonType="first" inputLabel="选择" :clickCallback="selectItem"></FuncButton>
            </div>
            <BwDataGrid
                ref="redInfoNoWrap"
                table-ref="redInfoNoSelector"
                :columns="columns"
                :data="resultList"
                :total="resultTotal"
                :highlight-row="true"
                :page-size-opts="[10]"
                @bw-query="query"
                @bw-current-change="changeCurrentRow"
            />
        </Modal>
    </div>
</template>

<script>
import LabelSelect from '../component/LabelSelect'
import LabelInput from '../component/LabelInput'
import FuncButton from '../component/FuncButton'
import { generateComputed } from '../store/helper'

const propMixin = {
    computed: {
        ...generateComputed(['showRedInfoNoSelector'], state => state.invoiceEdit)
    }
}
const cusQueryTpl = {
    invoiceCode: '',
    invoiceNo: ''
}

export default {
    mixins: [ propMixin ],
    components: {
        LabelSelect,
        LabelInput,
        FuncButton
    },
    data () {
        return {
            cusQuery: {
                ...cusQueryTpl
            },
            cusQueryTpl: {...cusQueryTpl},
            resultTotal: 0, // 查询结果总数
            resultList: [], // 查询结果,
            pagination: null,
            columns: [
                {
                    type: 'index',
                    width: 60
                },
                {
                    title: '信息表编号',
                    key: 'redInfoNo',
                    width: 200
                },
                {
                    title: '发票代码',
                    key: 'invoiceCode',
                    width: 200
                },
                {
                    title: '发票号码',
                    key: 'invoiceNo',
                    width: 200
                },
                {
                    title: '销方名称',
                    key: 'sellerName',
                    width: 200
                },
                {
                    title: '销方税号',
                    key: 'sellerTaxNo',
                    width: 200
                },
                {
                    title: '购方名称',
                    key: 'buyerName',
                    width: 200
                },
                {
                    title: '购方税号',
                    key: 'buyerTaxNo',
                    width: 200
                },
                {
                    title: '合计金额',
                    key: 'invoiceTotalPrice',
                    width: 100
                },
                {
                    title: '合计税额',
                    key: 'invoiceTotalTax',
                    width: 100
                }
            ]
        }
    },
    created () {

    },
    methods: {
        queryBtn () {
            this.$refs.redInfoNoWrap.onChanged(1)
        },
        query ({pageNo = 1, pageSize = 10} = {}) {
            this.currentRow = null
            this.pagination = {pageNo, pageSize}
            let params = {
                // infoState: "TZD0000",
                ...this.cusQuery,
                ...this.pagination
            }
            this.http.outPost('/api/redInvoice/getRedInfoListForOpeninvoice', params, resp => {
                let data = resp.data.results || []
                this.resultList = data
                this.resultTotal = resp.data.total
            })
        },
        selectItem () {
            if (this.currentRow) {
                this.showRedInfoNoSelector = false

                this.$emit('red-info-change', this.currentRow)

                this.$refs.redInfoNoWrap.clearCurrentRow()
                this.$nextTick(() => {
                    this.currentRow = null
                    this.cusQuery = {...cusQueryTpl}
                })
            } else {
                this.$Message.warning('没有选中任何数据')
            }
        },
        visibleStateChange (state) {
            this.cusQueryTpl = {...cusQueryTpl}
            if (state) {
                this.$refs.redInfoNoWrap.onChanged(1)
            }
            this.showRedInfoNoSelector = state
        },
        changeCurrentRow (newRow, oldRow) {
            this.currentRow = newRow
        }
    },
    watch: {
        showRedInfoNoSelector (val) {
            if (!val) {
                this.$refs.redInfoNoWrap.onChanged(1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
