<!-- 发票开具 上方工具按钮 -->
<template>
    <div class="toolbar-wrapper">
        <div v-if="!isIssue" class="unissue">
            <FuncButton buttonType="first" funcType="search" :opcode="btnShow('tempSave')" inputLabel="暂存" :clickCallback="saveInvoice"></FuncButton>
            <FuncButton buttonType="first" funcType="search" :opcode="btnShow('makeInvoice')" inputLabel="开具" :disabled="isDisabledIssue" :clickCallback="issueInvoice"></FuncButton>
            <CheckSwitch v-show="config.enableTaxTypeSwitch" :selectedValue="taxationMethod" :dataList="taxTypeSwitchList" @change="changeTaxTypeSwitch">
            </CheckSwitch>
            <CheckSwitch v-show="config.enableTaxSwitch" :selectedValue="priceTaxMark" :dataList="taxSwitchList" @click.native="clickTaxSwitch" @change="changeTaxSwitch">
            </CheckSwitch>
            <CheckSwitch v-show="isShowListMark" :selectedValue="invoiceListMark" :dataList="detailSwitchList" @change="changeDetailSwitch">
            </CheckSwitch>
            <FuncButton v-show="config.enableCommonNagative" :opcode="btnShow('negativeInvoice')" buttonType="first" funcType="search" inputLabel="负数" :clickCallback="() => {showCommonNeigative = true}">
            </FuncButton>
            <LabelSelect v-show="(isDishOrServer==='server'&&config.enableIssuePlace)" :inputValue="invoiceTerminalCode" inputLabel="开票终端" @change="changeInvoiceTerminalCode" :dataList="invoiceTerminalList">
            </LabelSelect>
            <FuncButton v-show="config.enableCurrentNumber" :opcode="btnShow('currentInvoiceNo')" buttonType="first" funcType="search" inputLabel="当前票号" :clickCallback="showCurrentNoModal">
            </FuncButton>
            <FuncButton v-show="config.enableOrderSerial === undefined ? true : config.enableOrderSerial" buttonType="first" funcType="search" :opcode="btnShow('bindOrderSerial')" inputLabel="绑定订单流水" :clickCallback="showOrderSerial"></FuncButton>
            <FuncButton v-show="config.enableInvoiceTitle === undefined ? true : config.enableInvoiceTitle" buttonType="first" funcType="search" :opcode="btnShow('InvoiceTitle')" inputLabel="发票抬头" :clickCallback="showInvoiceHead"></FuncButton>
            <FuncButton v-show="config.enableMarginSetting" :opcode="btnShow('pageConfig')" buttonType="first" funcType="search" inputLabel="页边距设置" :clickCallback="showPageMargin"></FuncButton>
        </div>
        <div v-if="isIssue&&!showCommonCopyEdit" class="unissue">
            <FuncButton buttonType="first" :opcode="btnShow('print')" v-show="invoiceTypeCode!=='026'" funcType="search" inputLabel="打印" :clickCallback="printInvoice"></FuncButton>
            <FuncButton buttonType="first" :opcode="btnShow('nextInvoice')" funcType="search" inputLabel="下一张" :clickCallback="nextInvoice"></FuncButton>
            <FuncButton v-show="config.enableMarginSetting" :opcode="btnShow('pageConfig')" buttonType="first" funcType="search" inputLabel="页边距设置" :clickCallback="showPageMargin"></FuncButton>
        </div>
        <!-- 负数开票 -->
        <negative ref="negative" :config="config"></negative>
        <!-- 差额征收 -->
        <difference ref="difference" :is-negative="isNegative"></difference>
        <!-- 当前票号 -->
        <crurent-no ref="currentNo" :config="config" :current-data="currentData"></crurent-no>
        <!-- 绑定订单流水 -->
        <order-serial ref="orderSerial" :serialNo="serialNo"></order-serial>
        <!-- 发票抬头 -->
        <invoice-title ref="invoiceTitle" :invoiceTerminalCode="invoiceTerminalCode" :invoiceTypeCode="invoiceTypeCode"></invoice-title>
        <!-- 页边距设置 -->
        <page-margin ref="pageMargin" :invoiceTypeCode="invoiceTypeCode" :isDishOrServer="isDishOrServer"></page-margin>
        <!-- 遮罩层 -->
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=25 class="demo-spin-icon-load"></Icon>
            <div>{{ spinText }}</div>
        </Spin>
    </div>
</template>

<script>
// component 组件
// 公共组件
import CheckSwitch from '../component/CheckSwitch'
import LabelInput from '../component/LabelInput'
import LabelSelect from '../component/LabelSelect'
import FuncButton from '../component/FuncButton'
// 业务组件
import Negative from './modal/negative'
import Difference from './modal/difference'
import CrurentNo from './modal/currentNo'
import OrderSerial from './modal/orderSerial'
import InvoiceTitle from './modal/invoiceTitle'
import PageMargin from './modal/pageMargin'
// helper vuex 帮助
import { generateComputed, keyUtil } from '../store/helper'
import { getDefaultDetailTpl } from '../store/stateHelper'
// mixins 混入
import serverOrDish from './mixins/serverOrDish'
import carMixin from './mixins/carMixin'
import speGeneEleMixin from './mixins/speGeneEleMixin'
import saveStage from './mixins/saveStage'

const propMixin = {
    computed: {
        ...generateComputed(['isIssue', 'isNegative', 'showCommonNeigativeNext', 'currentData', 'showCommonCopyEdit', 'isAutoStage', 'isExistOriginalData', 'showRedInfoNoSelector'], state => state.invoiceEdit),
        ...generateComputed(['serialNo', 'invoiceCode', 'invoiceNo', 'detailList', 'issuePlace', 'taxationMethod', 'priceTaxMark', 'invoiceListMark', 'buyerInfo', 'phone', 'email', 'invoiceSpecialMark', 'carData'], state => state.invoiceEdit.currentData)
    }
}

export default {
    data () {
        const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))
        return {
            // 开具中 遮罩层
            spinShow: false,
            spinText: '开具中,请稍候',
            // 打印所需数据
            printData: null,

            userBindTerminal,
            // 开票终端
            invoiceTerminalList: [],
            // 征税方式
            taxTypeSwitchList: [
                { text: '普通征税', value: '0' },
                { text: '差额征税', value: '2' }
            ],
            // 含税不含税
            taxSwitchList: [
                { text: '含税', value: '1' },
                { text: '不含税', value: '0' }
            ],
            // 清单明细
            detailSwitchList: [
                { text: '明细', value: '0' },
                { text: '清单', value: '1' }
            ],
            // 开票终端
            invoiceTerminalCode: '',
            // 保存红字信息,
            redInfoNo: ''
        }
    },
    mixins: [ propMixin, serverOrDish, carMixin, speGeneEleMixin, saveStage ],
    props: {
        config: {
            type: Object,
            required: true
        },
        invoiceTypeCode: {
            type: String,
            default: ''
        },
        btnPermission: Object
    },
    components: {
        CheckSwitch,
        LabelInput,
        LabelSelect,
        FuncButton,
        Negative,
        Difference,
        CrurentNo,
        OrderSerial,
        InvoiceTitle,
        PageMargin
    },
    computed: {
        isShowNegative () {
            return this.isNegative ? (!!this.showCommonNeigativeNext) : true
        },
        isDisabledIssue () {
            const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))
            if (this.invoiceTypeCode === '026') {
                return false
            } else {
                return !userBindTerminal.invoiceTerminalCode
            }
        },
        isNegativeListMark () {
            // 清单 负票  回传  非清单  只能添加8行
            return this.isNegative && (this.isDishOrServer === 'server')
            // return this.isNegative && this.invoiceListMark === '1'
        },
        isShowListMark () {
            const e = this.config.enableDetailSwitch // 电票 不显示
            const n = this.isNegative
            const c = this.taxationMethod === '2' // 差额征税不显示
            if (c || n) {
                return false
            } else {
                return e
            }
        }
    },
    watch: {
        taxationMethod (val) {
            if (this.taxationMethod !== val) {
                this.changeTaxTypeSwitch(val)
            } else {
                if (val === '2') {
                    setTimeout(() => {
                        this.changeValue('priceTaxMark', '0')
                    }, 500)
                    if (this.invoiceTypeCode !== '026') {
                        this.changeValue('invoiceListMark', '0')
                    }
                    this.$emit('on-show-difference', false)
                }
            }
        },
        priceTaxMark (val) {
            if (this.priceTaxMark !== val) {
                this.changeTaxSwitch(val)
            }
        },
        invoiceListMark (val) {
            this.changeDetailSwitch(val)
        },
        showCommonNeigative (val) {
            if (!val) {
                this.redInfoNo = this.nextModel.redInfoNo
                this.$refs.negativeForm.resetFields()
            }
        }
    },
    created () {
        this.getInvoiceTerminalList()
    },
    mounted () {
        this.$nextTick(() => {
            // let notExistOriginalData = this.isNegative && !this.isExistOriginalData
            setTimeout(() => {
                // let terminalId
                let terminalName
                this.invoiceTerminalList.map(item => {
                    if (item.invoiceTerminalCode === this.invoiceTerminalCode) {
                        // terminalId = item.terminalId
                        terminalName = item.invoiceTerminalName
                    }
                })
                const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))

                if (!(!userBindTerminal.invoiceTerminalCode && this.invoiceTypeCode !== '026')) {
                    this.http.outPost('/api/ruleCheck/checkKpdXe', {
                        terminalCode: this.invoiceTerminalCode,
                        terminalName,
                        invoiceType: this.invoiceTypeCode
                    }, (res) => {
                        this.$Message.success(res.message)
                    })
                }

                if (this.isDishOrServer === 'dish') {
                    this.getCodeNo()
                    if (!this.isNegative && !this.showCommonCopyEdit) {
                        this.getDefaultConfig()
                    }
                } else {
                    if (!this.isNegative) {
                        this.getCodeNo()
                        if (!this.showCommonCopyEdit) {
                            this.getDefaultConfig()
                        }
                    }
                }
            }, 100)
        })
    },
    methods: {
        // 发票复制 编辑 按钮的显示与否
        btnShow (opcode) {
            const { path } = this.$route
            if ((path === '/output/issue/invoiceQuery' || path === '/output/bills/invoiceToIssue')) {
                let cd = this.btnPermission ? this.btnPermission[opcode] ? '' : opcode : opcode
                return cd
            } else {
                return opcode
            }
        },
        clickTaxSwitch () {
            this.changeValue('isOpenReComputed', true)
        },
        changeTaxSwitch (value) {
            this.changeValue('priceTaxMark', value)
        },
        changeDetailSwitch (value) {
            this.changeValue('invoiceListMark', value)
        },
        changeTaxTypeSwitch (value) {
            let flage = true
            if (this.taxationMethod !== value) {
                this.changeValue('taxationMethod', value)
                this.$nextTick(() => {
                    this.changeValue('detailList', [{
                        ...getDefaultDetailTpl()
                    }])
                })
                if (value === '2') {
                    flage = false
                    this.changeValue('priceTaxMark', '0')
                    if (this.invoiceTypeCode !== '026') {
                        this.changeValue('invoiceListMark', '0')
                    }
                    if (this.isNegative && this.isExistOriginalData) {
                        this.$nextTick(() => {
                            this.changeValue('detailList', [])
                        })
                    }
                } else {
                    // 开具 和 复制 和 编辑页面  切换 征收方式后， 切换回 普通征税，含税不含税 默认取 机构配置的
                    // if (!this.showCommonCopyEdit) { // 判断是否为 复制 编辑页面
                    this.getDefaultConfig()
                    // }
                }
                this.$emit('on-show-difference', flage)
            }
        },
        changeValue (action, value) {
            this.$store.commit(keyUtil.getChangeName(action), value)
        },
        showCurrentNoModal () {
            this.$refs.currentNo.open()
        },
        showOrderSerial () {
            this.$refs.orderSerial.open()
        },
        showInvoiceHead () {
            this.$refs.invoiceTitle.open()
        },
        showPageMargin () {
            this.$refs.pageMargin.open()
        },
        // 获取当前用户绑定开票终端
        getInvoiceTerminalList () {
            const organizationInfo = JSON.parse(sessionStorage.getItem('organizationInfo'))
            let data = {
                taxNo: organizationInfo.taxNo,
                machineNo: this.userBindTerminal.machineNo || '',
                invoiceTypeCode: this.invoiceTypeCode
            }
            if (data.machineNo) {
                this.http.outPost('/api/terminal/queryMultUserTermList', data).then(res => {
                    this.invoiceTerminalList = res.data.results.map(item => {
                        item.label = item.invoiceTerminalName
                        item.value = item.invoiceTerminalCode + ''
                        return item
                    })
                    let [machineNo] = this.invoiceTerminalList.filter(item => (item.value === this.userBindTerminal.invoiceTerminalCode))
                    this.changeValue('machineNo', machineNo && machineNo.machineNo)
                    if (this.config.enableIssuePlace) {
                        let place = this.$store.state.invoiceEdit.currentData.place || ''
                        if (this.showCommonCopyEdit) {
                            this.invoiceTerminalCode = place
                        } else {
                            this.invoiceTerminalCode = this.userBindTerminal.invoiceTerminalCode || ''
                        }
                    }
                })
            }
        },
        // 开票终端改变后 重新获取 发票号 收款人复核人
        changeInvoiceTerminalCode (val) {
            this.invoiceTerminalCode = val
            let data = {
                invoiceTerminalCode: val,
                invoiceTypeCode: this.invoiceTypeCode
            }

            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            const orgConfig = JSON.parse(sessionStorage.getItem('orgConfig'))
            let drawer = userInfo.userName

            for (var item of this.invoiceTerminalList) {
                if (item.invoiceTerminalCode === val) {
                    let payee = item.payee || orgConfig.SKR || drawer
                    let checker = item.checker || orgConfig.FHR || drawer
                    this.changeValue('payee', payee)
                    this.changeValue('checker', checker)
                }
            }
            let [invoiceTerminal] = this.invoiceTerminalList.filter(item => (item.value === val))
            let invoiceTerminalName = invoiceTerminal.invoiceTerminalName
            let machineNo = invoiceTerminal.machineNo
            this.changeValue('issuePlace', {invoiceTerminalName})
            this.changeValue('machineNo', machineNo)
            if (this.invoiceTypeCode !== '026') {
                this.$store.dispatch('getCurrentNoCode', data)
            }
        },
        // 打印
        printInvoice () {
            let ajaxData = {
                printMode: '0',
                taxPanel: this.printData.machineNo || '',
                invoiceNo: this.printData.invoiceNo,
                invoiceTypeCode: this.printData.invoiceTypeCode,
                printType: '0',
                invoiceCode: this.printData.invoiceCode,
                invoiceTerminalCode: this.printData.invoiceTerminalCode
            }
            this.http.outPost('/api/invoiceManage/invoicePrint', ajaxData).then(res => {
                this.$Message.info('打印成功')
            }).catch(err => {
                console.log(err)
            })
        },
        nextInvoice () {
            const ts = {...this.stageInfo()}
            // 负数开票直接清空
            if (this.isNegative) {
                this.tsClearData()
                this.reShowNegative()
                this.$nextTick(() => {
                    this.changeValue('isNegative', true)
                    this.changeValue('detailList', [])
                })
                return
            }
            // 正数开票 用户选择是否清空 购方信息
            this.$Modal.confirm({
                title: '提示',
                content: '是否清除购方信息',
                onOk: () => {
                    this.tsClearData()
                    this.$nextTick(() => {
                        if (ts.drawerType === '03') {
                            this.changeValue('carData', {
                                ...this.carData,
                                ...ts.carSeller,
                                drawerType: ts.drawerType,
                                sellerTaxNo: '',
                                sellerName: '',
                                sellerAddress: '',
                                sellerPhone: ''
                            })
                        } else {
                            this.changeValue('carData', {...this.carData, ...ts.carSeller, drawerType: ts.drawerType})
                        }
                        this.changeValue('invoiceSpecialMark', ts.invoiceSpecialMark)
                    })
                },
                onCancel: () => {
                    this.tsClearData()
                    this.$nextTick(() => {
                        this.changeValue('email', ts.email)
                        this.changeValue('phone', ts.phone)
                        this.changeValue('buyerInfo', ts.buyerInfo)
                        if (ts.drawerType === '03') {
                            this.changeValue('carData', {
                                ...this.carData,
                                ...ts.carBuyer,
                                ...ts.carSeller,
                                drawerType: ts.drawerType,
                                sellerTaxNo: '',
                                sellerName: '',
                                sellerAddress: '',
                                sellerPhone: ''
                            })
                        } else {
                            this.changeValue('carData', {...this.carData, ...ts.carBuyer, ...ts.carSeller, drawerType: ts.drawerType})
                        }
                        this.changeValue('invoiceSpecialMark', ts.invoiceSpecialMark)
                    })
                }
            })
        },
        // 获取代码号码
        getCodeNo () {
            if (this.userBindTerminal && this.userBindTerminal.invoiceTerminalCode) {
                // 取默认开票终端
                let {invoiceTerminalCode, invoiceTerminalName} = this.userBindTerminal
                // 取选择的 开票终端
                if (this.invoiceTerminalCode) {
                    invoiceTerminalCode = this.invoiceTerminalCode
                    let [curTerminal] = this.invoiceTerminalList.filter(item => (item.value === invoiceTerminalCode))
                    invoiceTerminalName = curTerminal ? curTerminal.label : ''
                }

                this.changeValue('issuePlace', {invoiceTerminalName})
                this.changeValue('verifyCode', '')

                if (this.isDishOrServer === 'server') {
                    if (this.invoiceTypeCode !== '026') {
                        this.$store.dispatch('getCurrentNoCode', {
                            invoiceTerminalCode,
                            invoiceTypeCode: this.invoiceTypeCode
                        })
                    } else {
                        this.changeValue('invoiceNo', '')
                        this.changeValue('invoiceCode', '')
                    }
                } else {
                    this.$store.dispatch('getCurrentNoCode', {
                        invoiceTerminalCode,
                        invoiceTypeCode: this.invoiceTypeCode
                    })
                }
            }
        },
        // 获取默认配置
        getDefaultConfig () {
            const orgConfig = JSON.parse(sessionStorage.getItem('orgConfig'))
            const priceTaxMark = orgConfig.HSBZ === 'Y' ? '1' : '0'
            this.changeValue('priceTaxMark', priceTaxMark)
            this.changeValue('invoiceListMark', '0')
            this.changeValue('taxationMethod', '0')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
