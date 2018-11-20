// 暂存 开具相关
import { getDefaultDetailTpl } from '../store/stateHelper'

export default {
    methods: {
        generateData () {
            let params
            if (this.invoiceTypeCode === '005' || this.invoiceTypeCode === '006') {
                params = this.generateCarData()
            } else {
                params = this.generateZpdData()
            }
            return params
        },
        validateInvoice () {
            let flag
            if (this.invoiceTypeCode === '005' || this.invoiceTypeCode === '006') {
                flag = this.validateCarInvoice()
            } else {
                flag = this.validateZpdInvoice()
            }
            return flag
        },
        saveInvoice () {
            this.changeValue('isAutoStage', false)
            const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))
            if (!userBindTerminal.invoiceTerminalCode && this.invoiceTypeCode !== '026') {
                this.$Modal.info({
                    title: '信息',
                    content: '当前用户没有绑定终端，请绑定终端后在进行开票业务！'
                })
                return false
            }
            if (!this.validateInvoice()) {
                return false
            }
            const ts = {...this.stageInfo()}
            this.spinShow = true
            this.spinText = '暂存中,请稍候'

            let params = this.generateData()

            const isInvoiceCopyPage = this.$store.state.invoiceEdit.currentData.isInvoiceCopyPage
            return new Promise((resolve, reject) => {
                this.http.outPost('/api/invoiceManage/saveInvoice', params).then(resp => {
                    this.spinShow = false
                    if (resp.success) {
                        this.serialNoModel = ''
                        // if (!this.isAutoStage) {}
                        this.$Message.success('暂存成功')
                        // 代开编辑
                        let isWait = this.showCommonCopyEdit && !isInvoiceCopyPage
                        if (!isWait) {
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
                                if (this.config.enableCommonNagative) {
                                    this.changeValue('isNegative', true)
                                }
                            })
                        }
                        resolve(true)
                    }
                }).catch((err) => {
                    this.spinShow = false
                    reject(err)
                })
            })
        },
        issueInvoice () {
            if (this.isIssuing) {
                return
            }
            if (!this.validateInvoice()) {
                return
            }
            this.spinShow = true
            this.spinText = '开具中,请稍候'

            let params = this.generateData()

            this.isIssuing = true
            this.http.outPost('/api/invoiceManage/issueInvoice', params).then(resp => {
                this.spinShow = false
                this.isIssuing = false
                if (resp.success) {
                    let [res] = resp.data.results || []
                    // this.$Message.success(resp.message || '开具成功')
                    this.isIssue = true
                    this.changeValue('isIssue', true)
                    res.taxControlCode && this.changeValue('taxControlCode', res.taxControlCode)
                    res.remarks && this.changeValue('remarks', res.remarks)
                    res.machineNo && this.changeValue('machineNo', res.machineNo)
                    res.invoiceCheckCode && this.changeValue('verifyCode', res.invoiceCheckCode)
                    if (this.invoiceTypeCode === '026' && res.invoiceTerminalCode) {
                        let invoiceTerminalName = JSON.parse(sessionStorage.getItem('transDataKeyMap')).invoiceTerminalCode[res.invoiceTerminalCode]
                        this.changeValue('issuePlace', {invoiceTerminalName})
                    }
                    this.printData = {...res}
                    if (res.invoiceNo) {
                        this.changeValue('invoiceNo', res.invoiceNo)
                    }
                    if (res.invoiceCode) {
                        this.changeValue('invoiceCode', res.invoiceCode)
                    }

                    this.$Modal.info({
                        title: '开具成功',
                        content: '发票代码: ' + (res.invoiceCode || '') + ', 发票号码: ' + (res.invoiceNo || '')
                    })
                }
            }).catch(resp => {
                this.isIssuing = false
                this.spinShow = false
            })
        },
        // 暂存清空数据
        tsClearData () {
            this.serialNoModel = ''
            this.$store.commit('partReset')
            this.getDefaultConfig()

            this.$emit('on-show-difference', true)
            this.getCodeNo()
            this.$nextTick(() => {
                this.changeValue('detailList', [{
                    ...getDefaultDetailTpl()
                }])
            })
        },
        // 暂存一些必要信息
        stageInfo () {
            return {
                email: this.email,
                phone: this.phone,
                buyerInfo: { ...this.buyerInfo },
                carBuyer: { ...this.bufferBuyerInfo() },
                carSeller: { ...this.bufferSellerInfo() },
                invoiceSpecialMark: this.invoiceSpecialMark,
                drawerType: this.carData.drawerType
            }
        }
    }
}
