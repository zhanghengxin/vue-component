<!-- 发票抬头 弹框  只有一条数据直接赋值到购方， 若有 多条 弹出来 表格展示-->
<template>
    <div>
        <Modal v-model="showInvoiceTitle" title="发票抬头" :maskClosable="false" width="60%" @on-visible-change="showInvoiceTitle = arguments[0]">
            <div class="wrap">
                <BwDataGrid
                    ref="table"
                    :columns="columns"
                    :data="tableData"
                    :total="total"
                    :highlight-row="true"
                    @bw-query="query"
                    @bw-current-change="changeCurrentRow"
                    @bw-row-dbl-click="rowDblClick"
                />
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { keyUtil } from '../store/helper'

export default {
    data () {
        return {
            showInvoiceTitle: false,
            columns: [
                {
                    title: '序号',
                    key: 'showIndex'
                },
                {
                    title: '购货单位名称',
                    key: 'buyerName'
                },
                {
                    title: '购物单位税号',
                    key: 'buyerTaxNo'
                },
                {
                    title: '购货单位地址电话',
                    key: 'buyerAddressPhone'
                },
                {
                    title: '购货单位银行账号',
                    key: 'buyerBankAccount'
                },
                {
                    title: '绑定订单流水',
                    key: 'serialNo'
                }
            ],
            tableData: [],
            total: -1,
            currentRow: null
        }
    },
    props: {
        invoiceTerminalCode: {
            type: String,
            required: true
        },
        invoiceTypeCode: {
            type: String,
            required: true
        }
    },
    methods: {
        open () {
            this.query()
        },
        query ({ pageNo = 1, pageSize = 10 } = {}) {
            this.pagination = { pageNo, pageSize }
            this.getTableData()
        },
        getTableData () {
            const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))
            var params = {
                machineNo: userBindTerminal.machineNo || '',
                invoiceTerminalCode: this.invoiceTerminalCode || userBindTerminal.invoiceTerminalCode || '',
                invoiceTypeCode: this.invoiceTypeCode,
                ...this.pagination
            }
            this.http.outPost('/api/invoiceManage/getFpInvoiceTitle', params).then(resp => {
                let res = resp.data.results || []
                if (!res && res.length === 0) {
                    this.$Message.info('数据错误')
                    return false
                }
                if (res.length === 1) {
                    this.$store.commit(keyUtil.getChangeName('buyerInfo'), {
                        taxSerial: res[0].buyerTaxNo,
                        name: res[0].buyerName,
                        addressAndPhone: res[0].buyerAddressPhone,
                        bankAndAccount: res[0].buyerBankAccount
                    })
                    let serialNo = res[0].serialNo
                    this.$store.commit(keyUtil.getChangeName('serialNo'), serialNo)
                } else {
                    this.showInvoiceTitle = true
                    this.tableData = res
                    this.total = resp.data.total
                }
            })
        },
        changeCurrentRow (newRow, oldRow) {
            this.currentRow = newRow
        },
        rowDblClick () {
            if (this.currentRow) {
                this.showInvoiceTitle = false
                this.$store.commit(keyUtil.getChangeName('buyerInfo'), {
                    taxSerial: this.currentRow.buyerTaxNo,
                    name: this.currentRow.buyerName,
                    addressAndPhone: this.currentRow.buyerAddressPhone,
                    bankAndAccount: this.currentRow.buyerBankAccount
                })
                let serialNo = this.currentRow.serialNo
                this.$store.commit(keyUtil.getChangeName('serialNo'), serialNo)
            } else {
                this.$Message.warning('没有选中任何数据')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
