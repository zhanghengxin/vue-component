<!-- 清单负票 弹框 -->
<template>
    <div>
        <Modal v-model="showListGoodsSelector" title="选择清单商品" width="980" @on-visible-change="visibleStateChange" @on-ok="selectItem">
            <div class="wrap">
                <LabelInput inputLabel="商品名称" placeholder="商品名称" :inputValue="goodsQuery.goodsName"  @change="goodsQuery.goodsName = arguments[1]"></LabelInput>
                <LabelInput inputLabel="商品编码" placeholder="商品编码" :inputValue="goodsQuery.goodsCode"  @change="goodsQuery.goodsCode = arguments[1]"></LabelInput>
                <LabelInput inputLabel="商品规格" placeholder="商品规格" :inputValue="goodsQuery.goodsSpecification"  @change="goodsQuery.goodsSpecification = arguments[1]"></LabelInput>
                <FuncButton buttonType="first" inputLabel="查询" :clickCallback="query"></FuncButton>
                <FuncButton buttonType="first" inputLabel="选择" :clickCallback="selectItem"></FuncButton>
            </div>
            <BwDataGrid
                ref="listsWrap"
                table-ref="listsSelector"
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
import typeUtil from '../utils/typeUtil'

import { generateComputed } from '../store/helper'

const propMixin = {
    computed: {
        ...generateComputed(['showListGoodsSelector'], state => state.invoiceEdit)
    }
}

const defaultQuery = {
    goodsName: '',
    goodsCode: '',
    goodsSpecification: ''
}

export default {
    mixins: [ propMixin ],
    components: {
        LabelSelect,
        LabelInput,
        FuncButton
    },
    props: {
        // 选择商品后的回调
        selectCallback: {
            type: Function,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            goodsQuery: {
                ...defaultQuery
            },
            resultTotal: 0, // 查询结果总数
            resultList: [], // 查询结果,
            pagination: null,
            columns: [
                {
                    title: '商品名称',
                    key: 'goodsName',
                    minWidth: 150
                },
                {
                    title: '商品编码',
                    key: 'goodsCode',
                    minWidth: 150
                },
                {
                    title: '规格型号',
                    key: 'goodsSpecification',
                    minWidth: 150
                },
                {
                    title: '单位',
                    width: 108,
                    key: 'goodsUnit'
                },
                {
                    title: '单价',
                    minWidth: 90,
                    key: 'goodsPrice'
                },
                {
                    title: '商品数量',
                    minWidth: 90,
                    key: 'goodsQuantity'
                },
                {
                    title: '税率',
                    width: 70,
                    key: 'goodsTaxRate'
                },
                {
                    title: '金额',
                    minWidth: 90,
                    key: 'goodsTotalPrice'
                },
                {
                    title: '税额',
                    minWidth: 90,
                    key: 'goodsTotalTax'
                },
                {
                    title: '可用税率',
                    minWidth: 90,
                    key: 'usedRate'
                }
            ]
        }
    },
    created () {
        this.query()
    },
    methods: {
        query (args) {
            var params = {...this.goodsQuery, ...args, id: this.id}
            this.$store.dispatch('getNegativeList', {
                params,
                callback: respData => {
                    this.resultList = respData.results
                    this.resultTotal = respData.total
                }
            })
        },
        selectItem () {
            if (this.currentRow) {
                this.showListGoodsSelector = false
                if (typeUtil.isFunction(this.selectCallback)) {
                    this.selectCallback(this.currentRow)
                    this.$refs.listsWrap.clearCurrentRow()
                }
                this.$emit('update:visible', false)
            } else {
                this.$Message.warning('没有选中任何数据')
            }
        },
        visibleStateChange (state) {
            this.goodsQuery = {...defaultQuery}
            if (state) {
                this.$refs.listsWrap.onChanged(1)
            }
            this.showListGoodsSelector = state
        },
        changeCurrentRow (newRow, oldRow) {
            this.currentRow = newRow
        }
    }
}
</script>

<style lang="scss">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
      top: 0;
    }
  }
</style>
