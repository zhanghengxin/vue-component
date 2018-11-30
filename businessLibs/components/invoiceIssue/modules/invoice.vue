<template>
    <div>
        <point-group :point-num="12"></point-group>
        <div :class="prefixCls">
            <div class="invoiceType electric">
                <i :class="ticketTypeIcon"></i>
            </div>
            <div class="region">
                <span v-text="ticketTitle"></span>
                <p class="hr"></p>
            </div>
            <div class="invoice-head">
                <p class="fontColor fl">{{ numberName }}：<span class="elecColor">{{machineNo}}</span></p>
            </div>
            <div class="invoice-right-header">
                <p class="fontColor">发票代码：<span class="date">{{invoiceCode}}</span></p>
                <p class="fontColor">发票号码：<span class="date">{{invoiceNo}}</span></p>
                <p class="fontColor">开票日期：<span class="date">{{today}}</span></p>
                <p class="fontColor">校验码：<span class="date">{{verifyCode}}</span></p>
            </div>
            <div class="invoice-body">
                <InvoiceHeader :data-obj="buyerInfo" :invoiceTypeCode="invoiceTypeCode" :isIssue="isIssue"></InvoiceHeader>
                <InvoiceContent :isSpecialInvoice="isSpecialInvoice" :isIssue="isIssue" :isEInvoice="isEInvoice" @change="syncGoodListInfo" :invoiceTypeCode="invoiceTypeCode"></InvoiceContent>
                <InvoiceFooter :data-obj="sellerInfo" :isIssue="isIssue" :isRed="isRed" :invoiceTypeCode="invoiceTypeCode"></InvoiceFooter>
            </div>
            <div class="invoice-foot">
                <div class="skxx">
                    <span>收款人：</span><input type="text" :maxlength="16" :disabled="isIssue" v-model="otherInfo.payee"/>
                    <span>复核人：</span><input type="text" :maxlength="16" :disabled="isIssue" v-model="otherInfo.checker"/>
                    <span>开票人：</span><span class="kpr" :title="otherInfo.drawer" v-text="otherInfo.drawer"></span>
                    <span>销货单位（章）</span>
                </div>
                <div class="tishi">
                    {{extraInfo}}
                </div>
            </div>
        </div>
        <point-group :point-num="12"></point-group>
        <!-- 客户弹框 -->
        <customer :invoiceTypeCode="invoiceTypeCode"></customer>
    </div>
</template>

<script>
// component 组件
import PointGroup from './modules/pointGroup'
import InvoiceHeader from './header'
import InvoiceFooter from './footer'
import InvoiceContent from './content'
import Customer from '../modal/customer'
// vuex helper
import {generateComputed, keyUtil} from '../store/helper'
// 混入 mixins
import serverOrDish from '../mixins/serverOrDish'
// 工具库 utils
import common from '../utils/common'

const propMixin = {
    computed: {
        ...generateComputed(['isIssue', 'editOtherInfo'], state => state.invoiceEdit),
        ...generateComputed(['invoiceCode', 'invoiceNo', 'issuePlace', 'email', 'phone', 'buyerInfo', 'sellerInfo', 'machineNo', 'drawer', 'checker', 'payee', 'verifyCode'], state => state.invoiceEdit.currentData)
    }
}
// 004专票 007普票 026电票 005机动车 025卷票
const ticketType = {
    '004': '增值税专用发票',
    '007': '增值税普通发票',
    '025': '增值税卷式发票',
    '026': '增值税电子发票'
}

export default {
    mixins: [propMixin, serverOrDish],
    components: {
        PointGroup,
        Customer,
        InvoiceHeader,
        InvoiceContent,
        InvoiceFooter
    },
    props: {
        invoiceTypeCode: {
            type: String,
            default: ''
        },
        isRed: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            type: String,
            required: true
        }
    },
    watch: {
        issuePlace (cur, old) {
            if (cur && cur.invoiceTerminalName && old && old.invoiceTerminalName) {
                var payee = this.payee
                var checker = this.checker
                this.otherInfo.payee = payee
                this.otherInfo.checker = checker
            }
        },
        otherInfo: {
            deep: true,
            handler (newValue, oldValue) {
                if (newValue.payee && oldValue.payee) {
                    this.$store.commit(keyUtil.getChangeName('payee'), newValue.payee)
                }
                if (newValue.checker && oldValue.checker) {
                    this.$store.commit(keyUtil.getChangeName('checker'), newValue.checker)
                }
            }
        }
    },
    data () {
        return {
            today: common.transDate(Date.now(), 'YYYY年MM月DD日'),
            otherInfo: {
                payee: this.payee,
                checker: this.checker,
                drawer: this.drawer
            },
            numberName: '机器编号'
        }
    },
    methods: {
        handleChange (event) {
            this.$emit('change', event, this.currentValue)
        },
        syncGoodListInfo (infoList) {
            this.invoiceData.goodsInfoList = infoList
        },
        getUpInfo () {
            return new Promise((resolve, reject) => {
                this.http.outPost('/api/adminOrg/queryMoiraTaxInfo', {}).then(resp => {
                    console.log(resp)
                    const [res] = resp.data.results || [{}]
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        initInvoice () {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))
            const organizationInfo = JSON.parse(sessionStorage.getItem('organizationInfo'))
            const orgConfig = JSON.parse(sessionStorage.getItem('orgConfig'))

            if (this.isDishOrServer === 'dish') {
                this.numberName = '税控盘编号'
            }

            if (!userBindTerminal.invoiceTerminalCode && this.invoiceTypeCode !== '026') {
                this.$Modal.info({
                    title: '信息',
                    content: '当前用户没有绑定终端，请绑定终端后在进行开票业务！'
                })
                return
            }

            const terminalAddressPhone = (userBindTerminal.sellerAddress || '') + (userBindTerminal.sellerPhone || '')
            const terminalBankAccount = (userBindTerminal.sellerBankName || '') + (userBindTerminal.sellerBankAccount || '')
            const organizationAddressPhone = (organizationInfo.businessAddress || '') + (organizationInfo.telphone || '')
            const organizationBankAccount = (organizationInfo.bankDeposit || '') + (organizationInfo.accountNumber || '')
            // 编辑的时候带过来的 信息
            const editOtherInfo = this.editOtherInfo

            let drawer = editOtherInfo.drawer || userInfo.userName
            let payee = editOtherInfo.payee || userBindTerminal.payee || orgConfig.SKR || drawer
            let checker = editOtherInfo.checker || userBindTerminal.checker || orgConfig.FHR || drawer
            Object.assign(this.otherInfo, {
                payee,
                drawer,
                checker
            })

            // 1 纳税主体 2 非纳税主体
            const taxBody = organizationInfo.orgType + ''

            let sellerInfo
            if (taxBody === 2) {
                const useSelfinfo = organizationInfo.useSelfinfo === '1'
                // 上级纳税主体信息
                this.getUpInfo().then(res => {
                    let upInfo = res
                    let upAddressAndPhone = (upInfo.businessAddress || '') + (upInfo.telphone || '')
                    let upBankAndAccount = (upInfo.bankDeposit || '') + (upInfo.accountNumber || '')
                    let addressAndPhone = terminalAddressPhone || upAddressAndPhone
                    let bankAndAccount = terminalBankAccount || upBankAndAccount
                    sellerInfo = {
                        taxSerial: upInfo.taxCode,
                        name: upInfo.orgName,
                        addressAndPhone: useSelfinfo ? (organizationAddressPhone || addressAndPhone) : addressAndPhone,
                        bankAndAccount: useSelfinfo ? (organizationBankAccount || bankAndAccount) : bankAndAccount
                    }
                    this.$store.commit(keyUtil.getChangeName('sellerInfo'), sellerInfo)
                })
            } else {
                sellerInfo = {
                    taxSerial: organizationInfo.taxNo,
                    name: organizationInfo.orgName,
                    addressAndPhone: terminalAddressPhone || organizationAddressPhone,
                    bankAndAccount: terminalBankAccount || organizationBankAccount
                }
            }

            setTimeout(() => {
                this.$store.commit(keyUtil.getChangeName('payee'), payee)
                this.$store.commit(keyUtil.getChangeName('checker'), checker)
                this.$store.commit(keyUtil.getChangeName('drawer'), drawer)
                this.$store.commit(keyUtil.getChangeName('sellerInfo'), sellerInfo)
            }, 100)
        }
    },
    created () {
        this.initInvoice()
    },
    computed: {
        isEInvoice () {
            return this.invoiceTypeCode === '026'
        },
        isSpecialInvoice () {
            return this.invoiceTypeCode === '004'
        },
        extraInfo () {
            let els = ['温馨提示:']
            // 电票开具成功后显示开票终端
            let eInvoiceIssued = this.isEInvoice && this.isIssue
            if (!this.isEInvoice || eInvoiceIssued) {
                if (this.issuePlace.invoiceTerminalName) {
                    els.push('您目前的开票终端为:', this.issuePlace.invoiceTerminalName + ' ')
                }
            }
            if (this.email) {
                els.push('电子票信息邮箱为:', this.email + ' ')
            }
            if (this.phone) {
                els.push('电话为:', this.phone + ' ')
            }

            return els.join('')
        },
        ticketTitle () {
            return ticketType[this.invoiceTypeCode]
        },
        // 004专票 007普票 026电票 005机动车 025卷票
        ticketTypeIcon () {
            const code = this.invoiceTypeCode
            return [
                'iconfont',
                {
                    'bw-zhuanpiao': (code === '004'),
                    'bw-pupiao': (code === '007'),
                    'bw-dianpiao': (code === '026'),
                    'bw-juanshi': (code === '025'),
                    // ['bw-huoyun']: (code === '005'),
                    'bw-jidongche': (code === '005')
                }
            ]
        }
    }
}
</script>

<style lang="scss">
@import '../index.scss'
</style>
