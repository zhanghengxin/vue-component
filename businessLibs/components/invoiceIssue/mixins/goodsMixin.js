/**
 * 商品弹框 选择 mixins
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
                goodsName: '',
                goodsSpecification: '',
                goodsUnit: '',
                goodsQuantity: '',
                goodsPrice: '',
                goodsTotalPrice: '',
                goodsTaxRate: '',
                goodsTotalTax: '',
                hasDiscountLine: false,
                isDiscountLine: false,
                noEdit: true,
                ...this.dataObj
            },
            filteredSuggestGoods: []
        }
    },
    methods: {
        doSuggestGoods (query) {
            const self = this
            var han = /[\u4e00-\u9fa5]{2,}/
            if (han.test(query)) {
                this.$store.dispatch('suggestGoodsList', {
                    goodsName: query,
                    callback: (dataList) => {
                        self.filteredSuggestGoods = dataList
                    }
                })
            }
        },
        selectItemGoods (index) {
            const targetData = this.filteredSuggestGoods[index]
            if (targetData) {
                targetData.goodsTaxRate = targetData.rate
                targetData.dataIndex = this.dataIndex + ''
                for (let k in targetData) {
                    if ((targetData[k] + '') === 'null') {
                        targetData[k] = ''
                    }
                }
                this.$emit('select-goods', targetData)
            }
        }
    },
    computed: {
        ...generateComputed(['showGoodsSelector'], state => state.invoiceEdit)
    }
}
