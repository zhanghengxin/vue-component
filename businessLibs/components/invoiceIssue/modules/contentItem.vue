<!-- 发票开具 主体 每行商品信息 -->
<template>
    <div class="grid-list-item" :class="{'discount-line':currentDataObj.isDiscountLine}">
        <div class="grid-list-col col-index">{{dataIndex + 1}}</div>
        <div class="grid-list-col col-a">
            <div class="selector-goods" @dblclick="toggleGoodsCallback(dataIndex)" v-show="!readOnlyFlag">
                <auto-complete type="text" class="name" v-show="!readOnlyFlag" v-model="currentDataObj.goodsName" @on-search="doSuggestGoods" @on-select="selectItemGoods">
                    <i-option v-for="(item,index) in filteredSuggestGoods" :label="item.goodsName" :value="index" :key="index">{{item.goodsName}}</i-option>
                </auto-complete>
            </div>
            <span class="selector-btn" v-show="!readOnlyFlag" @click="toggleGoodsCallback(dataIndex)">...</span>
            <input type="text" v-if="readOnlyFlag" :readonly="readOnlyFlag" class="input" v-model="currentDataObj.goodsName"/>
        </div>
        <div class="grid-list-col col-b">
            <input type="text" class="input" :readonly="readOnlyFlag||isList" v-model="currentDataObj.goodsSpecification"/>
        </div>
        <div class="grid-list-col col-c">
            <input type="text" class="input" :readonly="readOnlyFlag||isList" v-model="currentDataObj.goodsUnit"/>
        </div>
        <div class="grid-list-col col-d">
            <number-input :key="numberKey" type="NoneZeroFloat" :class="[currentDataObj.isDiscountLine ? 'red' : '']" :readonly="readOnlyFlag||isList" v-model="currentDataObj.goodsQuantity" :max="10000000000000" @on-blur="changeQuantity"></number-input>
        </div>
        <div class="grid-list-col col-e">
            <number-input :key="numberKey" type="NoneZeroFloat" :class="[currentDataObj.isDiscountLine ? 'red' : '']" :readonly="readOnlyFlag||isList||priceNoEdit" v-model="currentDataObj.goodsPrice" :max="10000000000000" @on-blur="changePrice"></number-input>
        </div>
        <div class="grid-list-col col-f" @click="showDifferenceModal">
            <number-input :key="numberKey" type="NoneZeroFloat" :class="[currentDataObj.isDiscountLine ? 'red' : '']" :readonly="editPrice" v-model="currentDataObj.goodsTotalPrice" :max="10000000000" @on-blur="changeTotalPrice"></number-input>
        </div>
        <div class="grid-list-col col-g">
            <select v-model="currentDataObj.goodsTaxRate" :class="[currentDataObj.isDiscountLine ? 'red' : '']" :disabled="isDisabled||currentDataObj.noEdit||(showCommonCopyEdit&&showDifference)" @change="changeTaxRate" style="width: 96%;">
            <option v-for="im in taxRates" :value="im.value" :key="im.value">{{ im.label }}</Option>
            </select>
        </div>
        <div class="grid-list-col col-h">
            <input type="text" class="input" v-model="currentDataObj.goodsTotalTax" readonly/>
        </div>
        <div class="grid-list-col col-i " v-if="!isIssue">
            <span class="op" @click="addRowCallback(dataIndex)">+</span><span class="op" v-if="!(relateDiscount || isNegative || showDifference)" @click="toggleDiscount(dataIndex,currentDataObj)">折</span><span class="op" @click="removeRowCallback(dataIndex)">—</span>
        </div>
        <div class="grid-list-col col-i" v-else>
        </div>
    </div>
</template>

<script>
// utils 工具库
import { toKeepFixed2, toKeepFixed6, toKeepFixed13, convertToNormal } from '../utils/number'
import typeUtil from '../utils/typeUtil'
// component 组件
import NumberInput from '../component/NumberInput'
import AutoComplete from '../component/AutoComplete'
// vuex helper
import { keyUtil } from '../store/helper'
// mixins 混入
import goodsMixin from '../mixins/goodsMixin'
import serverOrDish from '../mixins/serverOrDish'
const propMixin = {
    ...goodsMixin,
    computed: {
        ...goodsMixin.computed
    }
}

export default {
    components: {
        AutoComplete,
        NumberInput
    },
    name: 'invoide-content-item',
    mixins: [propMixin, serverOrDish],
    props: {
        dataObj: {
            type: Object,
            required: true
        },
        dataIndex: {
            type: Number,
            required: true
        },
        addRowCallback: {
            type: Function,
            require: true
        },
        removeRowCallback: {
            type: Function,
            required: true
        },
        toggleGoodsCallback: {
            type: Function,
            required: true
        },
        toggleDiscountCallback: {
            type: Function,
            require: true
        },
        suggestGoodsList: {
            type: Array
        },
        updateDataCallback: {
            type: Function,
            required: true
        },
        rates: {
            type: Array,
            required: true
        },
        showDifference: {
            type: Boolean,
            required: true
        },
        isSpecialInvoice: {
            type: Boolean,
            default: false
        },
        isNegative: {
            type: Boolean,
            default: false
        },
        isIssue: {
            type: Boolean,
            default: false
        },
        invoiceListMark: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            numberKey: Date.now() + '',
            currentDataObj: {
                ...this.dataObj
            }
        }
    },
    methods: {
        updateItemData (newData) {
            let dataObj = this.currentDataObj
            // 编辑的时候 由于上条数据 问题， 导致 重新选择商品后，保留上次的数据，
            // ps 商品的数据字段不一致 hack
            delete dataObj.vatSpecialManagement
            delete dataObj.freeTaxMark
            delete dataObj.preferentialMarkFlag

            this.currentDataObj = {
                ...dataObj,
                ...newData
            }
            this.updateData()
        },
        toggleDiscount (index, dataObj) {
            if (!dataObj.goodsName) {
                this.$Message.warning('请先填写商品名称')
            } else {
                let numPrice = Number(dataObj.goodsTotalPrice)
                // NaN 和 0 都是 false
                if (numPrice) {
                    this.toggleDiscountCallback(index, dataObj)
                } else {
                    this.$Message.warning('请先填写正确的商品金额')
                }
            }
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
        },
        changeTaxRate (event) {
            let taxRate = +event.target.value
            let dataObj = this.currentDataObj
            let sellerPrice = +dataObj.sellerPrice
            let deduction = +dataObj.deduction
            this.$set(dataObj, 'goodsTaxRate', taxRate)

            if (this.showDifference) {
                let tt = (sellerPrice - deduction) * taxRate / (1 + taxRate)
                let tp = toKeepFixed2(sellerPrice - tt)
                if (this.isNegative) {
                    tp = '-' + tp
                }
                this.$set(dataObj, 'goodsTotalPrice', tp)
            }

            this.changeTotalTax()
        },
        changeQuantity (num) {
            if (this.readOnlyFlag || this.isList) {
                return
            }
            let dataObj = this.currentDataObj
            if (!dataObj.isDiscountLine) {
                num = (num + '').replace('-', '')
            }

            this.numberKey = Date.now() + ''
            if (+num === 0 || +num === 10000000000000) {
                this.$set(dataObj, 'goodsQuantity', '')
                this.updateData()
                return
            }

            num = this.reDishServer(num)

            if (num.length > 13) {
                this.$set(dataObj, 'goodsQuantity', num)
                this.$Message.warning('数量输入错误，请重新输入')
                return
            }

            this.$set(dataObj, 'goodsQuantity', num)

            // 差额征税
            if (this.showDifference) {
                let diffPrice = (+dataObj.goodsTotalPrice) / (+num)
                // 判断服务器或盘 用户
                diffPrice = this.reDishServer(diffPrice)
                this.$set(dataObj, 'goodsPrice', diffPrice)
            } else {
                if ((+dataObj.goodsPrice)) {
                    let total = (+dataObj.goodsPrice) * (+num)
                    total = toKeepFixed2(total)
                    if ((total + '').replace('-', '').match(/\d/g).length > 12 || !+total) {
                        this.$Message.warning('数量和单价输入错误，请重新输入')
                        this.$set(dataObj, 'goodsTotalPrice', '')
                        this.$set(dataObj, 'goodsPrice', '')
                        this.$set(dataObj, 'goodsQuantity', '')
                        return
                    }
                    this.$set(dataObj, 'goodsTotalPrice', total)

                    this.changeTotalTax()
                } else if ((+dataObj.goodsTotalPrice)) {
                    let price = (+dataObj.goodsTotalPrice) / (+num)
                    price = this.reDishServer(price)
                    this.$set(dataObj, 'goodsPrice', price)
                } else {}
            }

            this.negativeNumber()
            // 折行不加 改变数量不改变金额？
            // this.updateData();
        },
        // 单价处：含小数点最多只可输入13位；小数点后最多6位 ， 鼠标离开单价后，会计算数量跟单价，如果计算出来金额也超了13位就提示数量和单价输入错误，请重新输入。
        changePrice (price) {
            if (this.readOnlyFlag || this.isList || this.priceNoEdit) {
                return
            }
            let dataObj = this.currentDataObj
            if (!dataObj.isDiscountLine) {
                price = (price + '').replace('-', '')
            }

            this.numberKey = Date.now() + ''
            if (+price === 0 || +price === 10000000000000) {
                this.$set(dataObj, 'goodsPrice', '')
                this.updateData()
                return
            }
            price = this.reDishServer(price)

            let strtp = Number(price) + ''
            if (strtp.length > 13) {
                this.$set(dataObj, 'goodsPrice', price)
                this.$Message.warning('单价输入错误，请重新输入')
                return
            }

            this.$set(dataObj, 'goodsPrice', price)

            if ((+dataObj.goodsQuantity)) {
                let total = (+dataObj.goodsQuantity) * (+price)
                total = toKeepFixed2(total)
                if ((total + '').replace('-', '').match(/\d/g).length > 12 || !+total) {
                    this.$Message.warning('数量和单价输入错误，请重新输入')
                    this.$set(dataObj, 'goodsTotalPrice', '')
                    this.$set(dataObj, 'goodsPrice', '')
                    this.$set(dataObj, 'goodsQuantity', '')
                    return
                }
                this.$set(dataObj, 'goodsTotalPrice', total)

                this.changeTotalTax()
            } else if ((+dataObj.goodsTotalPrice)) {
                let num = (+dataObj.goodsTotalPrice) / (+price)
                num = this.reDishServer(num)
                this.$set(dataObj, 'goodsQuantity', num)
            } else {}

            this.negativeNumber()
        },
        // 金额：小数点前的数字位数大于10位，则提示金额错误，并清空输入内容。如果小于10位，鼠标离开后会截取小数点后两位，不够2位则补0。
        changeTotalPrice (totalPrice) {
            if (this.editPrice) {
                return
            }
            let dataObj = this.currentDataObj
            totalPrice = (totalPrice + '').replace('-', '')
            if (!dataObj.isDiscountLine) {
                totalPrice = toKeepFixed2(totalPrice)
            } else {
                totalPrice = '-' + toKeepFixed2(totalPrice)
            }

            this.numberKey = Date.now() + ''

            let strtp = totalPrice + ''
            let f = strtp.match(/^-?(\d{0,12})(\.{0,1})(\d{0,2})/)[1]
            let fLen = f.length
            if (fLen > 10) {
                this.$set(dataObj, 'goodsTotalPrice', '')
                this.$Message.warning('金额错误，请重新输入')
                return
            }

            if (Number(totalPrice)) {
                this.$set(dataObj, 'goodsTotalPrice', totalPrice)
            } else {
                this.$set(dataObj, 'goodsTotalPrice', '')
            }

            if ((+dataObj.goodsQuantity)) {
                let price = (+totalPrice) / (+dataObj.goodsQuantity) + ''
                price = this.reDishServer(price)
                this.$set(dataObj, 'goodsPrice', price)
            } else if ((+dataObj.goodsPrice)) {
                let num = (+totalPrice) / (+dataObj.goodsPrice) + ''
                num = this.reDishServer(num)
                this.$set(dataObj, 'goodsQuantity', num)
            } else {
                // nothing
            }
            this.changeTotalTax()
            this.negativeNumber()
        },
        changeTotalTax () {
            let dataObj = this.currentDataObj
            let result = 0
            let rate = +dataObj.goodsTaxRate
            let noTaxTotalPrice
            let goodsTotalPrice = (+dataObj.goodsTotalPrice > 0) ? (+dataObj.goodsTotalPrice) : (-dataObj.goodsTotalPrice)

            if (+this.priceTaxMark && rate) {
                noTaxTotalPrice = goodsTotalPrice / (1 + rate)
            } else {
                noTaxTotalPrice = goodsTotalPrice
            }

            if (this.showDifference) {
                result = dataObj.difference ? ((+dataObj.difference) * rate / (1 + rate)) : dataObj
                    .result = +result > 0 ? +result : -result
                let quantity = +dataObj.goodsQuantity > 0 ? +dataObj.goodsQuantity : -dataObj.goodsQuantity
                if (+dataObj.goodsQuantity) {
                    dataObj.goodsPrice = this.reDishServer(goodsTotalPrice / quantity)
                }
            } else if (this.isNegative && this.invoiceListMark === '1') {
                if (rate) {
                    result = noTaxTotalPrice * rate
                } else {
                    result = dataObj.goodsTotalTax
                }
            } else {
                result = rate * noTaxTotalPrice
            }
            if (dataObj.goodsTotalPrice !== '') {
                let tt = toKeepFixed2(result)
                if (this.isNegative || dataObj.isDiscountLine) {
                    dataObj.goodsTotalTax = (+tt) ? ('-' + tt) : '0.00'
                } else {
                    dataObj.goodsTotalTax = (+tt) ? tt : '0.00'
                }
            } else {
                dataObj.goodsTotalTax = ''
            }
            // debugger;
            this.updateData()
        },
        // 负数统一转换
        negativeNumber () {
            let dataObj = this.currentDataObj
            let quantity = Number(dataObj.goodsQuantity) > 0 ? dataObj.goodsQuantity : -dataObj.goodsQuantity
            let price = Number(dataObj.goodsTotalPrice) > 0 ? toKeepFixed2(dataObj.goodsTotalPrice) : toKeepFixed2(-dataObj.goodsTotalPrice)
            let tax = Number(dataObj.goodsTotalTax) > 0 ? toKeepFixed2(dataObj.goodsTotalTax) : toKeepFixed2(-dataObj.goodsTotalTax)

            if (this.isNegative || (this.showCommonCopyEdit && dataObj.invoiceLineNature === '1')) {
                if (+quantity) {
                    this.$set(dataObj, 'goodsQuantity', '-' + convertToNormal(quantity))
                }
                if (+price) {
                    this.$set(dataObj, 'goodsTotalPrice', ('-' + price))
                }
                if (+tax) {
                    this.$set(dataObj, 'goodsTotalTax', ('-' + tax))
                } else {
                    this.$set(dataObj, 'goodsTotalTax', '0.00')
                }
            }
            let pce = Number(dataObj.goodsPrice) > 0 ? dataObj.goodsPrice : -dataObj.goodsPrice
            if (Number(pce)) {
                this.$set(dataObj, 'goodsPrice', convertToNormal(pce))
            } else {
                this.$set(dataObj, 'goodsPrice', '')
            }
            this.updateData()
        },
        selectGoods (value) {
            let targetObj
            let hasMatch = this.suggestGoodsList.some(item => {
                return item.goodsName === value && (targetObj = item)
            })
            if (hasMatch) {
                const dataObj = this.currentDataObj
                dataObj.goodsName = targetObj.goodsName
                this.updateData()
                this.changeTaxRate(targetObj.taxRate)
            }
        },
        updateData () {
            if (typeUtil.isFunction(this.updateDataCallback)) {
                this.updateDataCallback.call(null, {
                    ...this.currentDataObj
                }, this.dataIndex)
            }
        },
        showDifferenceModal () {
            if (!this.isIssue && !this.isNegative && this.showDifference) {
                this.$store.commit(keyUtil.getChangeName('showDifference'), true)
            }
        }
    },
    computed: {
        showCommonCopyEdit () {
            return this.$store.state.invoiceEdit.showCommonCopyEdit
        },

        isExistOriginalData () {
            return this.$store.state.invoiceEdit.isExistOriginalData
        },
        readOnlyFlag () {
            let fd = this.isNegative && this.showDifference && this.isExistOriginalData
            return this.relateDiscount || this.isIssue || fd
        },
        // 负票不可以编辑
        isDisabled () {
            let a = this.isNegative && this.isExistOriginalData
            if (this.currentDataObj.isNewLine && !this.isIssue) {
                return false
            } else {
                return a || this.readOnlyFlag
            }
        },
        editPrice () {
            if (this.isNegative) {
                return this.readOnlyFlag || (this.invoiceListMark === '1' && this.currentDataObj.goodsTaxRate === '')
            } else {
                return this.readOnlyFlag
            }
        },
        // 差额征税 单价列不开编辑
        priceNoEdit () {
            return !this.isNegative && this.showDifference
        },
        isList () {
            return this.isNegative && this.invoiceListMark === '1' && this.dataIndex === 0
        },
        taxRates () {
            var result = [...this.rates]
            if (this.isSpecialInvoice) {
                result = result.filter(item => item.value !== 0)
            }
            return result
        },
        priceTaxMark () {
            return this.$store.state.invoiceEdit.currentData.priceTaxMark
        },
        taxRateShow () {
            const percent = this.currentDataObj.goodsTaxRate * 100
            if (!isNaN(percent)) {
                return (percent) + '%'
            }
            return ''
        },
        filteredSuggest () {
            const self = this
            return this.suggestGoodsList.filter(item => {
                return item.goodsName.match(new RegExp(self.currentDataObj.goodsName, 'i'))
            })
        },
        relateDiscount () {
            return this.currentDataObj.isDiscountLine || this.currentDataObj.hasDiscountLine
        }
    },
    watch: {
        dataObj: {
            deep: true,
            handler (value) {
                // 删掉的时候 index 会变，需要更新内容
                Object.assign(this.currentDataObj, value)
                // 只影响组件本身和插入插槽的子组件,而不是所有子组件
                this.$forceUpdate()
            }
        },
        currentDataObj: {
            deep: true,
            handler (target) {
                this.updateDataCallback.call(null, {
                    ...this.currentDataObj
                }, this.dataIndex)
            }
        }
    }
}
</script>

<style lang="scss">

</style>
