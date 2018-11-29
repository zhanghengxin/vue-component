<!-- 发票开具 主体信息 -->
<template>
    <div>
        <div class="grid-list">
            <div class="grid-list-main">
                <div class="grid-list-head">
                    <div class="grid-list-col col-index">行号</div>
                    <div class="grid-list-col col-a"><span class="red" v-if="(invoiceListMark === '1' && !isNegative)">(清单)</span>货物或应税劳务.服务名称</div>
                    <div class="grid-list-col col-b">规格型号</div>
                    <div class="grid-list-col col-c">单位</div>
                    <div class="grid-list-col col-d">数 量</div>
                    <div class="grid-list-col col-e">单价<span class="red" v-if="(priceTaxMark == '1')">(含税)</span><span v-else>(不含税)</span></div>
                    <div class="grid-list-col col-f">金额<span class="red" v-if="(priceTaxMark == '1')">(含税)</span><span v-else>(不含税)</span></div>
                    <div class="grid-list-col col-g">税率</div>
                    <div class="grid-list-col col-h">税 额</div>
                    <div class="grid-list-col col-i">操作</div>
                    <div class="grid-list-col col-j last"></div>
                </div>
                <div class="grid-list-body">
                    <div class="grid-list-body-outline">
                        <div class="grid-list-col col-index"></div>
                        <div class="grid-list-col col-a"></div>
                        <div class="grid-list-col col-b"></div>
                        <div class="grid-list-col col-c"></div>
                        <div class="grid-list-col col-d"></div>
                        <div class="grid-list-col col-e"></div>
                        <div class="grid-list-col col-f"></div>
                        <div class="grid-list-col col-g"></div>
                        <div class="grid-list-col col-h"></div>
                        <div class="grid-list-col col-i"></div>
                        <div class="grid-list-col col-j last"></div>
                    </div>
                    <div class="grid-list-body-data" :class="{'scroll-bar':withScroll}">
                        <InvoiceContentItem
                            v-show="isShowNegative"
                            ref="items"
                            :data-obj="item"
                            :data-index="index"
                            v-for="(item,index) in detailList"
                            :key="unique+index"
                            :add-row-callback="addRow"
                            :isNegative="isNegative"
                            :isIssue="isIssue"
                            @select-goods="selectGoods"
                            :remove-row-callback="removeRow"
                            :toggle-goods-callback="toggleGoodsSelector"
                            :rates="taxRates"
                            :showDifference="taxationMethod === '2'"
                            :invoiceListMark="invoiceListMark"
                            :toggle-discount-callback="toggleDiscountSelector"
                            :update-data-callback="updateObjByIndex"
                            :suggestGoodsList="suggestGoodsList"
                            :isSpecialInvoice="isSpecialInvoice"
                        >
                        </InvoiceContentItem>
                    </div>
                </div>
                <div class="grid-list-foot">
                    <div class="grid-list-col col-a sum red">合计折扣</div>
                    <div class="grid-list-col col-b">&nbsp;</div>
                    <div class="grid-list-col col-c">&nbsp;</div>
                    <div class="grid-list-col col-d">&nbsp;</div>
                    <div class="grid-list-col col-e">&nbsp;</div>
                    <div class="grid-list-col col-f">{{discountTotalAmount}}</div>
                    <div class="grid-list-col col-g"></div>
                    <div class="grid-list-col col-h">{{discountTotalTax}}</div>
                    <div class="grid-list-col col-i">&nbsp;</div>
                    <div class="grid-list-col col-j last">&nbsp;</div>
                </div>
                <div class="grid-list-foot">
                    <div class="grid-list-col col-a sum">合计</div>
                    <div class="grid-list-col col-b">&nbsp;</div>
                    <div class="grid-list-col col-c">&nbsp;</div>
                    <div class="grid-list-col col-d">&nbsp;</div>
                    <div class="grid-list-col col-e">&nbsp;</div>
                    <div class="grid-list-col col-f">￥<span>{{totalAmountText}}</span></div>
                    <div class="grid-list-col col-g">&nbsp;</div>
                    <div class="grid-list-col col-h">￥{{totalTaxText}}</div>
                    <div class="grid-list-col col-i">&nbsp;</div>
                    <div class="grid-list-col col-j last">&nbsp;</div>
                </div>
                <div class="grid-list-extra">
                    <div class="grid-list-col col-a"> 价税合计（大写）</div>
                    <div class="grid-list-col col-b">
                        ⓧ
                        <span v-if="isNegative" style="color:red">(负数)</span>
                        <span v-show="withTax">{{(totalAmount) | moneyToCharacter}}</span>
                        <span v-show="!withTax">{{(totalAmount + totalTax) | moneyToCharacter}}</span>
                    </div>
                    <div class="grid-list-col col-c">(小写)</div>
                    <div class="grid-list-col col-d last">￥<span>{{totalLowerText}}</span></div>
                </div>
            </div>
            <!-- 商品选择 弹框 -->
            <goods-selector :selectCallback="selectGoods" :isSpecialInvoice="isSpecialInvoice" :invoiceTypeCode="invoiceTypeCode"></goods-selector>
            <!-- 折扣 弹框 -->
            <discount-selector :goods-price="currentLineObj.goodsTotalPrice" :max-line="maxDiscountLines" :change-discount="changeDiscount" :discount-price-map="discountPriceMap"></discount-selector>
            <!-- 添加商品 弹框 -->
            <goods-add :addShow="showAddGoods" :height="500" @change="addGoodsVisibleChange" @add-goods="addGoods"></goods-add>
            <!-- 清单负票 弹框 -->
            <list-goods :selectCallback="selectListGoods" :id="invoiceId"></list-goods>
        </div>
    </div>
</template>

<script>
// 组件
import InvoiceContentItem from './contentItem'
import GoodsSelector from '../modal/goods'
import DiscountSelector from '../modal/discount'
import ListGoods from '../modal/listing'
import goodsAdd from '../modal/goodsAdd'
// number 方法
import {toMoneyFixedString, moneyToCharacter, toKeepFixed2, toKeepFixed6, toKeepFixed13} from '../utils/numberUtil'
// helper vuex
import {generateComputed} from '../store/helper'
import {getDefaultDetailTpl} from '../store/stateHelper'
// mixins
import serverOrDish from '../mixins/serverOrDish'
import getTaxRates from '../mixins/getTaxRates'
import discount from '../mixins/discount'
const propMixin = {
    computed: {
        ...generateComputed(['showGoodsSelector', 'showListGoodsSelector', 'showAddGoods', 'showDiscountSelector', 'isNegative', 'showCommonNeigativeNext', 'showCommonCopyEdit', 'isOpenReComputed'], state => state.invoiceEdit),
        ...generateComputed(['priceTaxMark', 'invoiceListMark', 'detailList', 'taxationMethod'], state => state.invoiceEdit.currentData)
    }
}

export default {
    name: 'invoice-content',
    filters: {
        moneyToCharacter,
        toMoneyFixedString
    },
    mixins: [propMixin, getTaxRates, serverOrDish, discount],
    components: {
        InvoiceContentItem,
        GoodsSelector,
        DiscountSelector,
        ListGoods,
        goodsAdd
    },
    props: {
        isSpecialInvoice: {
            type: Boolean,
            default: false
        },
        isIssue: {
            type: Boolean,
            default: false
        },
        isEInvoice: {
            type: Boolean,
            default: false
        },
        invoiceTypeCode: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            withScroll: false,
            // 当前操作的行数据
            currentLineObj: {},
            currentLineIndex: -1,
            // 自动补全的商品列表
            suggestGoodsList: [],
            // 折扣行数
            maxDiscountLines: 1,
            discountPriceMap: {},
            taxRates: []
        }
    },
    methods: {
        addRow (index) {
            if (this.taxationMethod === '2') {
                this.$Message.info('差额征税不能增加行！')
                return
            }

            let targetList = [...this.detailList]

            if (this.isNegativeListMark && targetList.length === 8) {
                this.$Message.info('已到最大行数，无法继续新增费用项目！')
                return
            }

            if (targetList.length === 8) {
                if (this.invoiceListMark !== '1' && !this.isEInvoice) {
                    this.$Message.warning({
                        content: '超过8行明细将必须使用清单打印,票面将只显示（详见销货清单）和折扣!',
                        duration: 10,
                        closable: true
                    })
                    this.invoiceListMark = '1'
                }
            }

            // 每次都在最后添加
            targetList.push({
                ...getDefaultDetailTpl(),
                noEdit: true,
                isNewLine: true
            })
            this.detailList = targetList
        },
        removeRow (index) {
            const targetList = [...this.detailList]

            let notDiscountLines = targetList.filter((item) => !item.isDiscountLine)
            let targetLine = targetList[index]

            if (targetLine.hasDiscountLine) {
                this.$Message.warning('该行已添加折扣信息，请先删除此行的折扣信息！')
                return
            } else if (!targetLine.isDiscountLine && notDiscountLines.length === 1) {
                this.$Message.warning('最后一行不能删除!')
                return
            }

            let targetObj = targetList[index]
            if (targetObj.hasDiscountLine) {
                this.$Message.warning('该行已添加折扣信息，请先删除此行的折扣信息！')
            } else if (targetObj.isDiscountLine) {
                targetList.splice(index, 1)
                targetList[index - 1] = {
                    ...targetList[index - 1],
                    isDiscountLine: false,
                    hasDiscountLine: false
                }
            } else {
                targetList.splice(index, 1)
            }

            this.detailList = targetList
        },
        selectGoods (dataObj) {
            if (dataObj.dataIndex) {
                this.currentIndex = +dataObj.dataIndex
            }

            let dataTax = dataObj.priceTaxMark === 'Y'
            let isTax = Boolean(+this.priceTaxMark)
            let goodsPrice = +dataObj.goodsPrice
            let goodsTaxRate = +dataObj.goodsTaxRate
            let price = ''
            if (goodsPrice) {
                if (dataTax === isTax) {
                    // 含税
                    price = goodsPrice
                } else {
                    if (dataTax && !isTax) {
                        price = goodsPrice / (1 + goodsTaxRate)
                    } else if (isTax && !dataTax) {
                        price = goodsPrice * (1 + goodsTaxRate)
                    }
                }
            }
            let goods = {
                ...dataObj,
                noEdit: false,
                goodsName: dataObj.goodsSimpleName ? `*${dataObj.goodsSimpleName}*${dataObj.goodsName}` : dataObj.goodsName,
                goodsPrice: price ? (+toKeepFixed6(price)) : '',
                goodsQuantity: (+dataObj.goodsQuantity) ? dataObj.goodsQuantity : '',
                goodsTotalPrice: '',
                goodsTotalTax: ''
            }

            // 这里不直接更新数据，而是给子组件
            // 避免vuex里面更新了 子组件没更新的问题，因为是单向数据，所有从子组件开始更新
            this.$refs.items[this.currentIndex].updateItemData(goods)
        },
        selectListGoods (dataObj) {
            let goods = {
                ...dataObj,
                noEdit: false,
                goodsName: dataObj.goodsSimpleName ? `*${dataObj.goodsSimpleName}*${dataObj.goodsName}` : dataObj.goodsName
                // goodsPrice: (+dataObj.goodsPrice) ? dataObj.goodsPrice : '',
                // goodsQuantity: (+dataObj.goodsQuantity) ? dataObj.goodsQuantity : '',
                // goodsTotalPrice: '',
                // goodsTotalTax: '',
            }
            if (dataObj.goodsPrice == null || dataObj.goodsPrice === '') {
                goods.goodsPrice = ''
            } else {
                goods.goodsPrice = +dataObj.goodsPrice + ''
            }
            if (dataObj.goodsQuantity == null || dataObj.goodsQuantity === '') {
                goods.goodsQuantity = ''
            } else if (+dataObj.goodsQuantity === 0) {
                goods.goodsQuantity = '0'
            } else {
                goods.goodsQuantity = '-' + (+dataObj.goodsQuantity)
            }
            if (dataObj.goodsTotalPrice == null || dataObj.goodsTotalPrice === '') {
                goods.goodsTotalPrice = ''
            } else if (+dataObj.goodsTotalPrice === 0) {
                goods.goodsTotalPrice = '0.00'
            } else {
                goods.goodsTotalPrice = '-' + toKeepFixed2(dataObj.goodsTotalPrice)
            }
            if (dataObj.goodsTotalTax == null || dataObj.goodsTotalTax === '') {
                goods.goodsTotalTax = ''
            } else if (+dataObj.goodsTotalTax === 0) {
                goods.goodsTotalTax = '0.00'
            } else {
                goods.goodsTotalTax = '-' + toKeepFixed2(dataObj.goodsTotalTax)
            }
            this.$refs.items[this.currentIndex].updateItemData(goods)
        },
        updateObjByIndex (dataObj, index) {
            const targetList = [...this.detailList]
            targetList.splice(index, 1, dataObj)
            this.detailList = targetList
        },
        toggleGoodsSelector (index) {
            this.currentIndex = index
            if (this.isNegative && (this.invoiceListMark === '1')) {
                this.showListGoodsSelector = true
            } else {
                this.showGoodsSelector = true
            }
        },
        addGoodsVisibleChange (state) {
            this.showAddGoods = state
        },
        addGoods (dataobj) {
            if (this.isSpecialInvoice) {
                if (dataobj && (+dataobj.rate) === 0) {
                    this.$Message.warning('专票不能开零税率的票!')
                    return
                }
            }
            let obj = {
                ...dataobj,
                goodsTaxRate: dataobj.rate
            }
            this.selectGoods(obj)
            this.$store.commit('changeShowGoodsSelector', false)
        },
        updateItemData (data, index = this.currentIndex) {
            if (index < 0) {
                index = 0
            }
            let targetRef = this.$refs.items[index]
            // TODO 编辑的时候 这里取不到值
            if (targetRef) {
                targetRef.updateItemData(data)
            }
        },
        // 切换含税不含税 误差解决
        reComputed (item, flag, index) {
            // 负票 和 负票并且差额 和 复制开票 初次不重新计算
            let n = this.isNegative
            let ce = this.showCommonCopyEdit
            let goodsTotalPrice = 0
            // 如果 原始数量*不含税单价 和 不含税金额 的误差大于一分 重新 计算 数量=不含税金额/不含税单价
            let price, // 切换含税 重新计算单价
                prevTotal // 原始数量*不含税单价

            // 负票 和 负票并且差额 和 复制开票 不重新计算
            if ((n || ce) && !this.isOpenReComputed) {
                goodsTotalPrice = toKeepFixed2(item.goodsTotalPrice)
                price = +item.goodsPrice + ''
            } else {
                if ((+item.goodsTotalPrice) && (+item.goodsTotalTax)) {
                    if (flag === '1') {
                        goodsTotalPrice = toKeepFixed2((+item.goodsTotalPrice) + (+item.goodsTotalTax))
                    } else {
                        goodsTotalPrice = toKeepFixed2((+item.goodsTotalPrice) - (+item.goodsTotalTax))
                    }
                }
                if (+item.goodsQuantity) {
                    price = goodsTotalPrice / (+item.goodsQuantity)
                    price = this.reDishServer(price)
                    prevTotal = (+price) * (+item.goodsQuantity)

                    if (Math.abs(prevTotal - goodsTotalPrice) > 0.01) {
                        item.goodsQuantity = this.reDishServer((+item.goodsTotalPrice) / (+price))
                    }
                } else if ((+item.goodsPrice) && (+item.goodsTaxRate)) {
                    if (flag === '1') {
                        price = +item.goodsPrice * (1 + (+item.goodsTaxRate))
                    } else {
                        price = +item.goodsPrice / (1 + (+item.goodsTaxRate))
                    }
                    price = this.reDishServer(price)
                } else {}
            }
            price = this.isOpenReComputed ? price : +item.goodsPrice

            this.updateItemData({
                goodsTotalPrice: goodsTotalPrice || '',
                goodsPrice: price || '',
                goodsTotalTax: item.goodsTotalTax,
                goodsQuantity: item.goodsQuantity ? item.goodsQuantity : ''
            }, index)
        },
        // 服务器 盘
        reDishServer (val) {
            if ((+val) < 0) {
                val = (-val) + ''
            } else {
                val = val + ''
            }
            if (this.isDishOrServer === 'server') {
                return toKeepFixed13(val)
            } else if (this.isDishOrServer === 'dish') {
                return toKeepFixed6(val)
            } else {}
        }
    },
    computed: {
        invoiceId () {
            return this.$store.state.invoiceEdit.currentData.id || ''
        },
        unique () {
            return '' + Date.now()
        },
        withTax () {
            return !!(+this.priceTaxMark)
        },
        totalAmount () {
            return this.detailList.reduce((total, item) => {
                let numValue = parseFloat(item.goodsTotalPrice)
                if (Number.isNaN(numValue)) {
                    return total
                }
                return total + numValue
            }, 0.00)
        },
        totalTax () {
            return this.detailList.reduce((total, item) => {
                let numValue = parseFloat(item.goodsTotalTax)
                if (Number.isNaN(numValue)) {
                    return total
                }
                return total + numValue
            }, 0.00)
        },
        // 合计金额
        totalAmountText () {
            let total = 0
            if (this.withTax) {
                total = this.totalAmount - this.totalTax
            } else {
                total = this.totalAmount
            }
            if (total) {
                if (this.isNegative) {
                    total = total * (-1)
                    return '-' + toKeepFixed2(total)
                } else {
                    return toKeepFixed2(total)
                }
            } else {
                return '0.00'
            }
        },
        // 合计税额
        totalTaxText () {
            let total = this.totalTax
            if (total) {
                if (this.isNegative) {
                    total = total * (-1)
                    return '-' + toKeepFixed2(total)
                } else {
                    return toKeepFixed2(total)
                }
            } else {
                return '0.00'
            }
        },
        // 小写
        totalLowerText () {
            let total = 0
            if (this.withTax) {
                total = this.totalAmount
            } else {
                total = this.totalAmount + this.totalTax
            }
            if (total) {
                if (this.isNegative) {
                    total = total * (-1)
                    return '-' + toKeepFixed2(total)
                } else {
                    return toKeepFixed2(total)
                }
            } else {
                return '0.00'
            }
        },
        isShowNegative () {
            return this.isNegative ? (!!this.showCommonNeigativeNext) : true
        },
        isNegativeListMark () {
        // 清单 负票  回传  非清单  只能添加8行
            return this.isNegative
        // return this.isNegative && this.invoiceListMark === '1'
        }
    },
    watch: {
        detailList: {
            deep: true,
            handler: function (val, oldVal) {
                if (val.length !== oldVal.length) {
                    this.withScroll = this.detailList.length > 6
                }
            }
        },
        priceTaxMark (newValue, oldValue) {
            const dataList = this.detailList
            // 切成含税
            if (newValue === '1') {
                dataList.forEach((item, index) => {
                    Object.assign(item, this.reComputed(item, '1', index))
                })
            } else {
                dataList.forEach((item, index) => {
                    Object.assign(item, this.reComputed(item, '0', index))
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
