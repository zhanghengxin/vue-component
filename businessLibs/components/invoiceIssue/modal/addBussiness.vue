<template>
    <div class=" clearfix " v-if="modalStatus=='modal'">
        <div class="goods_float_label">
            <span class="spaninfo spaninfo_mark">税收编码:</span>
            <i-input :disabled="true" v-model="taxGoodsCode.goodsCode"></i-input>
        </div>

        <div class="goods_float_label">
            <div v-if="addStatus==='add'">
                <span class="spaninfo spaninfo_mark">商品名称:</span>
                <i-input v-model="taxGoodsCode.goodsName" @on-change="pinyinchange"></i-input>
            </div>
            <div v-if="addStatus==='update'">
                <span class="spaninfo spaninfo_mark">商品名称:</span>
                <i-input v-model="taxGoodsCode.goodsName" :disabled="taxGoodsCode.goodsCode.length==19" @on-change="pinyinchange"></i-input>
            </div>
        </div>
        <div class="goods_float_label" v-if="!classificationSpecial">
            <span class="spaninfo">税收分类简称:</span>
            <i-input :disabled="true" v-model="taxGoodsCode.goodsSimpleName"></i-input>
        </div>
        <div class="goods_float_label" v-if="classificationSpecial">
            <span class="spaninfo">商品编码:</span>
            <i-input :disabled="disabled" v-model="taxGoodsCode.customGoodsCode"></i-input>
        </div>

        <div class="goods_float_label" v-if="classificationSpecial">
            <span class="spaninfo">商品分类:</span>
            <div style="overflow: hidden">
                <Select clearable class="ivu-select" v-model="taxGoodsCode.classificationName"
                        @on-change="(e) => {taxGoodsCode.classificationCode=e}" :disabled="disabled||sixGoods">
                    <Option v-for="item in classificationNameList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
            </div>
        </div>

        <div class="goods_float_label" style="width: 100%;">
            <span class="spaninfo">说明:</span>
            <div style="overflow: hidden">
                <i-input :disabled="disabled" v-model="taxGoodsCode.illustrate" type="textarea" :rows="2"></i-input>
            </div>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo">商品简码:</span>
            <i-input :disabled="disabled" v-model="taxGoodsCode.simpleCode"></i-input>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo">规格型号:</span>
            <i-input :disabled="disabled" v-model="taxGoodsCode.goodsSpecification"></i-input>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo">计量单位:</span>
            <i-input :disabled="disabled" v-model="taxGoodsCode.goodsUnit"></i-input>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo">单价:</span>
            <i-input :disabled="disabled" v-model="taxGoodsCode.goodsPrice"></i-input>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo" style="width: 12em;margin-left: -4em;">是否使用优惠政策:</span>
            <Checkbox v-model="taxGoodsCode.useDiscount" v-if="addStatus!='show'"
                            @on-change="useDiscountChange" :disabled="disabled||sixGoods"></Checkbox>
            <Checkbox v-model="taxGoodsCode.useDiscount" v-else
                        @on-change="useDiscountChange" :disabled="addStatus=='show'"></Checkbox>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo">优惠政策类型:</span>
            <div style="overflow: hidden">
                <Select  class="ivu-select" v-model="taxGoodsCode.discountType"
                            :clearable="false"
                            @on-change="(e) => {taxGoodsCode.discountType=e}" :disabled="disabled||sixGoods"
                            v-if="taxGoodsCode.useDiscount">
                    <Option v-for="item in preferentialWrap" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
                <Select  class="ivu-select" v-model="taxGoodsCode.discountType" :clearable="false"
                            @on-change="(e) => {taxGoodsCode.discountType=e}" :disabled="true"
                            v-if="!taxGoodsCode.useDiscount">
                    <Option v-for="item in preferentialWrap" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
            </div>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo spaninfo_mark">税率:</span>
            <div style="overflow: hidden">
                <Select  class="ivu-select" v-model="taxGoodsCode.rate" :clearable="false"
                            :disabled="disabled||rateChange||sixGoods" :value="taxGoodsCode.rate"
                            @on-change="taxGoodsCodeRateChange">
                    <Option v-for="item in rateWrap" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>

        <div class="goods_float_label">
            <span class="spaninfo">免税类型:</span>
            <div style="overflow: hidden">
                <Select  class="ivu-select" v-model="taxGoodsCode.freeType" :clearable="false"
                            @on-change="(e) => {taxGoodsCode.freeType=e}" :disabled="disabled||sixGoods||flag">
                    <Option v-for="item in freeTypeWrap" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
            </div>
        </div>
        <div class="goods_float_label">
            <span class="spaninfo">含税标志:</span>
            <Checkbox :disabled="disabled" v-model="taxGoodsCode.priceTaxMark"
                        @on-change="(e) => {taxGoodsCode.priceTaxMark=e}">
            </Checkbox>
        </div>
        <div class="goods_float_label">
            <span class="spaninfo">云打印商品:</span>
            <Checkbox :disabled="disabled " v-model="taxGoodsCode.bwPrintGoods"
                        @on-change="(e) => {taxGoodsCode.bwPrintGoods=e}">
            </Checkbox>
        </div>

    </div>
</template>
<script>
// 数组对象去重
import {convertToNormal} from '../utils/numberUtil'
function arrayUnique (arr, name) {
    var hash = {}
    return arr.reduce(function (item, next) {
        if (hash[next[name]]) {
            item.push(next)
        }
        return item
    }, [])
}
const pinyin = require('pinyin')

export default {
    name: 'model',
    props: {
        addShow: {
            type: Boolean,
            default: false
        },
        addBussinessParams: {
            type: Object,
            default: () => {
            }
        },
        addStatus: {
            type: String,
            default: ''
        },
        classificationNameList: {
            type: Array,
            default: () => []
        },
        classificationSpecial: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            ifWatch: false,
            ifUpdate: false,
            watch: false,
            flag: false,
            rateChange: false,
            sixGoods: false, // 60商品税率，优惠政策禁止编辑
            taxGoodsCode: {
                classificationName: '',
                useDiscount: false, // 是否使用优惠政策
                priceTaxMark: false, // 含税标志
                bwPrintGoods: false, // 云打印商品
                goodsSimpleName: '',
                goodsCode: '',
                goodsName: '', // 商品名称
                illustrate: '', // 说明
                simpleCode: '', // 商品简码
                goodsSpecification: '', // 规格型号
                goodsUnit: '', // 计量单位
                goodsPrice: '', // 单价
                rate: '',
                discountType: '', // 优惠政策类型
                freeType: '' // 免税类型
            },
            preferentialWrap: [],
            rateWrap: [
                {value: '0.1', label: '10%'},
                {value: '0.03', label: '3%'},
                {value: '0', label: '0%'}
            ],
            freeTypeWrap: [
                {value: '0', label: '正常税率'},
                {value: '1', label: '出口免税或其他免税优惠政策'},
                {value: '2', label: '不征增值税'},
                {value: '3', label: '普通零税率'}
            ]
        }
    },
    methods: {
        pinyinchange () {
            let parms = this.taxGoodsCode.goodsName
            if (!/^[\u4e00-\u9fa5]+$/.test(parms)) {
                if (/^[0-9a-zA-Z\u4e00-\u9fa5]+/.test(parms)) {
                    parms = parms.slice(0, 1)
                }
            }
            let arr = pinyin(parms, {
                style: pinyin.STYLE_FIRST_LETTER // 设置拼音风格
                // heteronym: true
            })
            let str = arr.join('').toUpperCase()
            this.taxGoodsCode.simpleCode = str
        },
        cancle (status) {
            this.ifWatch = false
            if (status === 1) {
                this.ifWatch = false
                if (this.disabled) {
                    this.$emit('showChange')
                    return
                }
                this.$emit('close')

                return false
            }
            if (status === 2) {
                this.ifWatch = false
                if (this.disabled) {
                    this.$emit('showChange')
                    return
                }
                let url = '/api/taxGoodsCode/add'
                if (this.checked()) {
                    let params = {
                        ...this.taxGoodsCode
                    }

                    params.rate = this.taxGoodsCode.rate
                    for (let key in params) {
                        if (params[key] === true || params[key] === '是') {
                            params[key] = 'Y'
                        }
                        if (params[key] === false || params[key] === '否') {
                            params[key] = 'N'
                        }
                    }
                    if (/%/i.test(params.rate)) {
                        let str = params.rate.slice(0, params.rate.length - 1)
                        str = parseFloat(str) / 100
                        params.rate = JSON.stringify(str)
                    }

                    let ajaxDate = {}
                    ajaxDate.goodsCode = params.goodsCode
                    ajaxDate.goodsName = params.goodsName
                    ajaxDate.classificationCode = params.classificationCode
                    ajaxDate.illustrate = params.illustrate
                    ajaxDate.simpleCode = params.simpleCode
                    ajaxDate.goodsSpecification = params.goodsSpecification
                    ajaxDate.goodsUnit = params.goodsUnit
                    ajaxDate.goodsPrice = convertToNormal(params.goodsPrice)
                    ajaxDate.useDiscount = params.useDiscount
                    ajaxDate.discountType = params.discountType
                    ajaxDate.rate = params.rate
                    ajaxDate.freeType = params.freeType
                    ajaxDate.priceTaxMark = params.priceTaxMark
                    ajaxDate.bwPrintGoods = params.bwPrintGoods
                    if (this.classificationSpecial) {
                        ajaxDate.customGoodsCode = params.customGoodsCode
                    }
                    if ((ajaxDate.freeType + '') === '0') {
                        ajaxDate.freeType = ''
                    }
                    this.http.outPost(url, ajaxDate).then(resp => {
                        if (resp.success) {
                            this.ifWatch = false
                            this.$emit('change', ajaxDate.goodsCode)
                            this.$emit('modalChange', ajaxDate)
                            this.$Message.success('添加成功')
                        }
                    }).catch(() => {
                        this.$Message.error('添加失败')
                    })
                }
            }
        },
        convert (params) {
            for (let key in params) {
                if (params[key] === true) {
                    params[key] = 'Y'
                }
                if (params[key] === false) {
                    params[key] = 'N'
                }
                if (typeof params[key] === 'string') {
                    params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                }
            }
            return params
        },
        taxGoodsCodeRateChange (e) {
            if (e === '0') {
                this.rateChange = true
                this.taxGoodsCode.freeType = '3'
                this.taxGoodsCode.priceTaxMark = false
            }
            this.taxGoodsCode.rate = e
        },
        checked () {
            let params = {
                ...this.taxGoodsCode
            }
            params = this.convert(params)

            if (params.customGoodsCode && this.checkJs.stringLength(params.customGoodsCode) > 20) {
                this.$Message.error('商品编码不能超过20字符')
                return false
            }
            if (params.goodsName && this.checkJs.stringLength(params.goodsName) > 50) {
                this.$Message.error('商品名称不能超过50字符')
                return false
            }
            if (!params.goodsCode) {
                this.$Message.error('商品编码不能为空')
                return false
            }
            if (!params.goodsName) {
                this.$Message.error('商品名称不能为空')
                return false
            }
            if (!params.goodsSimpleName) {
                this.$Message.error('税收分类简称不能为空')
                return false
            }

            if (!params.useDiscount) {
                this.$Message.error('使用优惠政策不能为空')
                return false
            }

            if (!params.rate) {
                this.$Message.error('税率不能为空')
                return false
            }

            if (!params.freeType) {
                this.$Message.error('免税类型不能为空')
                return false
            }
            if (!params.priceTaxMark) {
                this.$Message.error('含税标志不能为空')
                return false
            }
            if (!params.bwPrintGoods) {
                this.$Message.error('云打印商品不能为空')
                return false
            }
            if (params.useDiscount !== 'N' && params.discountType === '') {
                this.$Message.error('使用优惠政策不能为空')
                return false
            }
            if (!this.checkJs.checkSpecical(params.goodsSpecification, 0, 32)) {
                this.$Message.error('规格型号:字段长度介于0-32位之间并且不含特殊字符')
                return false
            }

            if (params.goodsPrice && params.goodsPrice !== 'null') {
                if (!this.checkJs.numRegCheck(params.goodsPrice)) {
                    this.$Message.error('单价:单价只能输入数字、小数')
                    return false
                }
                if (!this.checkJs.checkNum(convertToNormal(params.goodsPrice), 0, 13)) {
                    this.$Message.error('单价含小数点最多只可输入13位')
                    return false
                }
            }
            return true
        },
        getpreferentialPolicies () {
            let params = {}
            this.preferentialWrap = []
            return new Promise((resolve, reject) => {
                this.http.outPost('/api/taxGoodsCode/preferentialPolicies', params).then(resp => {
                    if (resp.success) {
                        let data = resp.data.results
                        data.forEach((item) => {
                            let obj = {}
                            obj['value'] = item.preferentialPolicyName
                            obj['label'] = item.preferentialPolicyName
                            this.preferentialWrap.push(obj)
                        })
                        resolve()
                    }
                })
            })
        },
        // 是否使用优惠政策
        useDiscountChange (e) {
            if (e) {
                this.getpreferentialPolicies()
            } else {
                // 不使用时清空
                this.preferentialWrap = []
            }
        },
        deletMsg () {
            let taxGoodsCode = {
                ...this.taxGoodsCode
            }
            for (let key in taxGoodsCode) {
                taxGoodsCode[key] = ''
            }
            this.taxGoodsCode = taxGoodsCode
        }
    },
    watch: {
        'taxGoodsCode.rate': {
            handler (data) {
                if (this.ifWatch && !this.sixGoods && !this.ifUpdate) {
                    if (this.watch) {
                        setTimeout(() => {
                            this.taxGoodsCode.freeType = '0'
                            this.taxGoodsCode.rate = '0.1'
                            this.watch = false
                        }, 700)
                        return false
                    } else {
                        if (data === '0.015') {
                            this.rateChange = true
                            this.flag = true
                            this.taxGoodsCode.priceTaxMark = true
                            this.taxGoodsCode.freeType = '0'
                        }
                        if (data === '0') {
                            this.rateChange = true
                            this.taxGoodsCode.freeType = '3'
                            this.taxGoodsCode.priceTaxMark = false
                        }
                        if (data !== '0' && data !== '' && data !== '0.015') {
                            this.taxGoodsCode.priceTaxMark = false
                        }
                        if (data === '') {
                            this.rateChange = false
                            this.taxGoodsCode.priceTaxMark = false
                        }
                    }
                }
            },
            deep: true
        },
        'taxGoodsCode.discountType' (newVal, oldVal) {
            if (this.ifWatch) {
                this.taxGoodsCode.rate = '0'
                let newArray = []
                let usedRate = this.addBussinessParams.usedRate || '10%、3%、0%' // 可以编辑税率
                usedRate = usedRate.split('、')
                this.rateWrap = []
                usedRate.forEach((item) => {
                    let obj = {
                        label: item,
                        value: item.slice(0, item.length - 1) / 100 + ''
                    }
                    this.rateWrap.push(obj)
                })
                this.rateChange = false
                this.flag = false
                switch (newVal) {
                case '按5%简易征收':
                    newArray = [{value: '0.05', label: '5%'}]
                    this.rateWrap = this.rateWrap.concat(newArray)
                    this.rateWrap = arrayUnique(this.rateWrap, 'value')
                    this.taxGoodsCode.rate = this.rateWrap[0].value
                    break
                case '按5%简易征收减按1.5%计征':
                    newArray = [{value: '0.015', label: '1.5%'}]
                    this.rateWrap = newArray
                    this.rateWrap = arrayUnique(this.rateWrap, 'value')
                    this.rateChange = true
                    this.taxGoodsCode.rate = '0.015'
                    break
                case '简易征收':
                    newArray = [{value: '0.04', label: '4%'}, {value: '0.05', label: '5%'}]
                    this.rateWrap = this.rateWrap.concat(newArray)
                    this.rateWrap = arrayUnique(this.rateWrap, 'value')
                    this.taxGoodsCode.rate = this.rateWrap[0].value
                    break
                default :
                    this.taxGoodsCode.rate = '' // this.rateWrap[0].value
                    this.rateChange = false
                    this.flag = false
                }
            }
        },
        'taxGoodsCode.freeType': {
            handler (data) {
                if (this.ifWatch) {
                    if (data === '0') {
                        // 按5%简易征收减按1.5%计征
                        if (this.taxGoodsCode.rate === '0.015') {
                            this.rateChange = true
                            this.flag = true
                        } else {
                            this.rateChange = false
                            this.flag = false
                        }
                    }
                    if (data !== '0' && data !== '' && data !== null) {
                        this.rateChange = true
                        this.taxGoodsCode.rate = '0'
                        this.flag = false
                    }
                }
            },
            deep: true
        },
        addShow (data) {
            this.ifWatch = true
        },
        'taxGoodsCode.useDiscount' (newVal) {
            if (this.ifWatch) {
                if (!newVal) {
                    this.rateWrap = [
                        {value: '0.1', label: '10%'},
                        {value: '0.03', label: '3%'},
                        {value: '0', label: '0%'}
                    ]
                }
            }
        },
        addStatus: function () {
            this.deletMsg()
        },
        addBussinessParams: function () {
            if (this.ifWatch || this.modalStatus == 'modal') {
                if (this.addStatus === 'add') {
                    this.ifUpdate = false
                    this.watch = true
                    this.taxGoodsCode = {
                        useDiscount: false, // 是否使用优惠政策
                        priceTaxMark: false, // 含税标志
                        bwPrintGoods: false, // 云打印商品
                        goodsSimpleName: '',
                        goodsCode: '',
                        goodsName: '', // 商品名称
                        illustrate: '', // 说明
                        simpleCode: '', // 商品简码
                        goodsSpecification: '', // 规格型号
                        goodsUnit: '', //	计量单位
                        goodsPrice: '', // 单价
                        discountType: '', // 优惠政策类型
                        rate: '',
                        freeType: '' // 免税类型
                    }
                    let usedRate = this.addBussinessParams.usedRate || '10%、3%、0%' // 可以编辑税率
                    usedRate = usedRate.split('、')
                    this.rateWrap = []
                    usedRate.forEach((item) => {
                        let obj = {
                            label: item,
                            value: item.slice(0, item.length - 1) / 100 + ''
                        }
                        this.rateWrap.push(obj)
                    })
                    this.taxGoodsCode.rate = this.rateWrap[0].value || ''
                    this.taxGoodsCode.bwPrintGoods = this.taxGoodsCode.bwPrintGoods || false
                    this.taxGoodsCode.goodsSimpleName = this.addBussinessParams.goodsSimpleName
                    this.taxGoodsCode.goodsCode = this.addBussinessParams.goodsCode
                    this.taxGoodsCode.usedRate = '0.1'
                    this.taxGoodsCode.freeType = '0'
                    if (this.taxGoodsCode.goodsCode.slice(0, 1) == '6') {
                        this.sixGoods = true
                        this.taxGoodsCode.rate = '0'
                        this.taxGoodsCode.useDiscount = true
                        setTimeout(() => {
                            this.taxGoodsCode.freeType = '2'
                        }, 200)

                        this.getpreferentialPolicies().then(() => {
                            this.taxGoodsCode.discountType = '不征税'
                        })
                    } else {
                        this.sixGoods = false
                    }
                }
                if (this.addStatus === 'update') {
                    debugger
                    this.ifUpdate = true
                    this.taxGoodsCode = {
                        useDiscount: false, // 是否使用优惠政策
                        priceTaxMark: false, // 含税标志
                        bwPrintGoods: false, // 云打印商品
                        goodsSimpleName: '',
                        goodsCode: '',
                        goodsName: '', // 商品名称
                        illustrate: '', // 说明
                        simpleCode: '', // 商品简码
                        goodsSpecification: '', // 规格型号
                        goodsUnit: '', // 计量单位
                        goodsPrice: '', // 单价
                        discountType: '', // 优惠政策类型
                        rate: '',
                        freeType: '' // 免税类型
                    }

                    let obj = this.addBussinessParams
                    for (let key in obj) {
                        if (obj[key] === '是') {
                            obj[key] = true
                        }
                        if (obj[key] === '否') {
                            obj[key] = false
                        }
                        if (obj[key] === 'Y') {
                            obj[key] = true
                        }
                        if (obj[key] === 'N') {
                            obj[key] = false
                        } else {
                            obj[key] = obj[key]
                        }
                    }
                    this.taxGoodsCode = obj
                    this.taxGoodsCode.useDiscount = this.taxGoodsCode.useDiscount || false
                    let discountTypeStr = this.taxGoodsCode.discountType
                    let usedRate = this.addBussinessParams.usedRate || '10%、3%、0%' // 可以编辑税率
                    let rateStr = this.taxGoodsCode.rate + '' // 转字符串，不然数字读不出来

                    this.taxGoodsCode.bwPrintGoods = this.taxGoodsCode.bwPrintGoods || false
                    this.taxGoodsCode.goodsName = this.taxGoodsCode.goodsName || ''

                    this.taxGoodsCode.priceTaxMark = this.taxGoodsCode.priceTaxMark || false
                    this.taxGoodsCode.bwPrintGoods = this.taxGoodsCode.bwPrintGoods || false

                    if (this.taxGoodsCode.freeType === '') {
                        this.taxGoodsCode.freeType = '0'
                    }
                    this.taxGoodsCode.goodsUnit = this.taxGoodsCode.goodsUnit || ''
                    if (rateStr) {
                        this.taxGoodsCode.rate = rateStr
                    }
                    if (!rateStr || rateStr == 'null') {
                        this.taxGoodsCode.rate = ''
                    }
                    usedRate = usedRate.split('、')
                    this.rateWrap = usedRate.map(item => {
                        return {
                            label: item,
                            value: item.slice(0, item.length - 1) / 100 + ''
                        }
                    })
                    if (this.taxGoodsCode.useDiscount) {
                        this.getpreferentialPolicies().then(() => {
                            this.taxGoodsCode.discountType = discountTypeStr
                        })
                    } else {
                        this.preferentialWrap = []
                    }
                    if (this.taxGoodsCode.goodsCode.slice(0, 1) === '6') {
                        this.ifUpdate = false
                        this.taxGoodsCode.rate = '0'
                        this.taxGoodsCode.useDiscount = true
                        setTimeout(() => {
                            this.taxGoodsCode.freeType = '2'
                        }, 200)

                        this.sixGoods = true
                        this.getpreferentialPolicies().then(() => {
                            this.taxGoodsCode.discountType = '不征税'
                        })
                    } else {
                        this.sixGoods = false
                    }
                }
            }
            // 60 商品 rate  freeType  固定  税率为0，不征税
        }
    }
}
</script>

<style lang="scss">
    .spaninfo_mark:before{
        content: '*';
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
    }

    .goods_float_label{
        width: 304px;
        float: left;
        margin-bottom: 20px;
        .spaninfo{
            padding-right: 8px;
            width: 8em;
            float: left;
            text-align: right;
            line-height: 32px;
        }
        .ivu-input-wrapper{

            overflow: hidden;
            display: block;
            width: 200px;
        }
        .ivu-checkbox-wrapper{
            line-height: 32px;
        }
    }
</style>
