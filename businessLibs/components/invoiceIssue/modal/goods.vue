<!-- 商品选择 弹框 -->
<template>
    <div>
        <Modal v-model="showGoodsSelector" title="选择税收编码" width="980" @on-visible-change="visibleStateChange" @on-ok="selectItem">
            <Row>
                <i-col span="19" style="border-right: 1px solid #ccc;padding-right: 20px;">
                    <div class="wrap red-invoice-sell-modal">
                        <LabelSelect inputLabel="商品分类" :dataList="categoryList" :inputValue="goodsQuery.goodsCategory" @change="goodsQuery.goodsCategory = arguments[1]"></LabelSelect>
                        <LabelInput inputLabel="商品名称" placeholder="商品名称" :inputValue="goodsQuery.goodsName" @change="goodsQuery.goodsName = arguments[1]"></LabelInput>
                        <LabelInput inputLabel="税收编码" placeholder="税收编码" :inputValue="goodsQuery.goodsCode" @change="goodsQuery.goodsCode = arguments[1]"></LabelInput>
                        <LabelInput inputLabel="商品编码" placeholder="商品编码" :inputValue="goodsQuery.simpleCode" @change="goodsQuery.simpleCode = arguments[1]"></LabelInput>
                        <FuncButton buttonType="first" inputLabel="查询" :clickCallback="query"></FuncButton>
                        <FuncButton buttonType="first" inputLabel="选择" :clickCallback="selectItem"></FuncButton>
                        <FuncButton buttonType="first" inputLabel="新增" :clickCallback="addItem"></FuncButton>
                    </div>
                    <BwDataGrid
                        ref="goodsWrap"
                        table-ref="goodsSelector"
                        :columns="columns"
                        :data="resultList"
                        :total="resultTotal"
                        :highlight-row="true"
                        :page-size-opts="[10]"
                        @bw-query="query"
                        @bw-current-change="changeCurrentRow"
                        @bw-row-dbl-click="selectItem"
                    />
                </i-col>
                <i-col span="5">
                    <div class="border-left">
                        <p class="goods-title">常用商品</p>
                        <ul>
                            <li class="goods-li" v-for="(item,index) in commonUseGoods" :key="index" @click="selectItem(item)">{{item.goodsName}}</li>
                        </ul>
                    </div>
                </i-col>
            </Row>
        </Modal>
    </div>
</template>

<script>
import LabelSelect from '../component/LabelSelect'
import LabelInput from '../component/LabelInput'
import FuncButton from '../component/FuncButton'
import typeUtil from '../utils/typeUtil'
import {keyUtil, generateComputed} from '../store/helper'

const propMixin = {
    computed: {
        ...generateComputed(['showGoodsSelector', 'showDifference', 'showAddGoods'], state => state.invoiceEdit),
        ...generateComputed(['taxationMethod'], state => state.invoiceEdit.currentData)
    }
}

const defaultQuery = {
    goodsCategory: '',
    goodsName: '',
    goodsCode: '',
    simpleCode: ''
}

export default {
    name: 'goods-selector',
    mixins: [propMixin],
    components: {
        LabelSelect,
        LabelInput,
        FuncButton
    },
    props: {
        isSpecialInvoice: {
            type: Boolean,
            default: false
        },
        // 选择商品后的回调
        selectCallback: {
            type: Function,
            required: true
        },
        invoiceTypeCode: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            categoryList: [],
            categoryMap: {},
            goodsQuery: {
                ...defaultQuery
            },
            resultTotal: 0, // 查询结果总数
            resultList: [], // 查询结果,
            pagination: {pageNo: 1, pageSize: 10},
            columns: [
                {
                    title: '商品分类',
                    key: 'classificationName',
                    minWidth: 150
                }, {
                    title: '商品名称',
                    key: 'goodsName',
                    minWidth: 150
                }, {
                    title: '税收编码',
                    key: 'goodsCode',
                    minWidth: 200
                }, {
                    title: '商品编码',
                    key: 'simpleCode',
                    minWidth: 150
                }, {
                    title: '单价',
                    minWidth: 90,
                    key: 'goodsPrice'
                }, {
                    title: '税率',
                    width: 70,
                    key: 'goodsTaxRate'
                }, {
                    title: '可用税率',
                    minWidth: 150,
                    key: 'usedRate'
                }
            ],
            commonUseGoods: []
        }
    },
    created () {
        this.$store.dispatch('getGoodsCategory', {
            callback: respData => {
                this.categoryList = respData.results.map(item => {
                    return {
                        label: item.classificationName,
                        value: item.classificationCode
                    }
                })
                this.categoryList.forEach((item) => {
                    this.categoryMap[item.id] = item
                })
            }
        })
        this.getCommonUseGoods()
        this.query()
    },
    methods: {
        getCommonUseGoods () {
            this.http.outPost('/api/taxGoodsCode/selectOftenGoods', {}).then(resp => {
                const res = resp.data && resp.data.results || []
                this.commonUseGoods = res.filter(item => item !== null)
            })
        },
        query ({pageNo = 1, pageSize = 10} = {}) {
            this.currentRow = null
            this.pagination = {pageNo, pageSize}
            var params = {...this.goodsQuery, ...this.pagination}
            params.classificationCode = params.goodsCategory; delete params.goodsCategory
            // params.customGoodsCode = params.goodsCode;delete params.goodsCode;

            // this.paramUtil.setWhenNotEmpty(this.$data,params,['goodsCategory','goodsName','goodsCode','simpleCode','goodsPrice','goodsTaxRate','usedRate'])
            let categoryMap = this.categoryMap
            this.$store.dispatch('getGoodsList', {
                params,
                callback: respData => {
                    this.resultList = respData.results
                    this.resultList = respData.results.map(item => {
                        item.goodsTaxRate = item.rate
                        if (item.classifyId in categoryMap) {
                            item.goodsCategory = categoryMap[item.classifyId].categoryName
                        }
                        return item
                    })
                    this.resultTotal = respData.total
                }
            })
        },
        selectItem (customer) {
            this.chooseCustomer(customer)
        },
        chooseCustomer (customer) {
            if (customer) {
                this.currentRow = {
                    ...customer,
                    goodsTaxRate: customer.rate
                }
            }

            if (this.isSpecialInvoice) {
                if (this.currentRow && (this.currentRow.rate + '') === '0') {
                    this.$Message.warning('专票不能开零税率的票!')
                    return
                }
            }

            if (this.currentRow) {
                this.showGoodsSelector = false
                if (typeUtil.isFunction(this.selectCallback)) {
                    for (let k in this.currentRow) {
                        if ((this.currentRow[k] + '') === 'null') {
                            this.currentRow[k] = ''
                        }
                    }
                    this.selectCallback(this.currentRow)
                    this.$refs.goodsWrap.clearCurrentRow()
                }
                if (this.taxationMethod === '2') {
                    this.showDifference = true
                    this.$store.commit(keyUtil.getChangeName('showDifference'), true)
                } else {
                    this.showDifference = false
                    this.$store.commit(keyUtil.getChangeName('showDifference'), false)
                }

                this.$refs.goodsWrap.clearCurrentRow()
                this.currentRow = null

                this.$emit('update:visible', false)
            } else {
                this.$Message.warning('没有选中任何数据')
            }
        },
        addItem () {
            this.$store.commit(keyUtil.getChangeName('showAddGoods'), true)
        },
        visibleStateChange (state) {
            this.goodsQuery = {...defaultQuery}
            if (state) {
                this.$refs.goodsWrap.onChanged(1)
                this.getCommonUseGoods()
            }
            this.showGoodsSelector = state
        },
        changeCurrentRow (newRow, oldRow) {
            this.currentRow = newRow
        }
    },
    watch: {
        showAddGoods (val) {
            if (!val) {
                this.$refs.goodsWrap.onChanged(1)
                this.getCommonUseGoods()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.border-left{
  // margin: 0 5px;
  // border-left: 1px solid #666;
  padding: 0 15px;
}
.goods-title{
  font-size: 14px;
  margin-bottom: 10px;
}
.goods-li{
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0;
}
</style>
