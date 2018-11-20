<!-- 负数开票 弹框 -->
<template>
    <div>
        <Modal v-if="config.enableCommonNagative" v-model="showCommonNeigative" :maskClosable="false" :title="commonNeigativeTitle" width="650px" @on-visible-change="showCommonNeigative = arguments[0]">
            <div class="wrap">
                <div v-if="config.enableSpecialNagative">
                    <p class="negative-tips">导入开具</p>
                    <Upload
                        ref="uploadRed"
                        type="drag"
                        :action="actionUrl"
                        accept=".xml"
                        :multiple="false"
                        :before-upload="beforeUpload"
                        :on-success="onSuccess"
                        :on-error="onError"
                    >
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p><span v-if="file !== null">文件: {{file.name}}</span><span v-else>选择红字信息表，仅支持.xml文件</span></p>
                        </div>
                    </Upload>
                    <div v-if="file !== null" style="text-align: center;">
                        <bw-button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '确定' }}</bw-button>
                    </div>
                </div>
                <Form ref="negativeForm" :model="nextModel" :label-width="90" :rules="ruleValidate">
                    <Row v-if="!config.enableSpecialNagative">
                        <p class="negative-title">开具销项负数发票时，您必须找到相对应得销项正数发票。请您在下面填写销项正数发票的发票代码、发票号码。</p>
                    </Row>
                    <Row><p class="negative-tips">销项正数发票代码、号码</p></Row>
                    <Row>
                        <div v-if="config.enableSpecialNagative">
                            <i-col span="12">
                                <FormItem prop="redInfoNo" label="信息表编号:">
                                    <i-input type="text" icon="ios-search" v-model="nextModel.redInfoNo" placeholder="" @on-click="redInfoBtn"></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem prop="repeatRedInfoNo" label="再次输入:">
                                    <i-input type="text" v-model="nextModel.repeatRedInfoNo" placeholder=""></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem prop="invoiceCode" label="发票代码:">
                                    <i-input type="text" v-model="nextModel.invoiceCode" :maxlength="12" placeholder=""></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem prop="invoiceNo" label="发票号码:">
                                    <i-input type="text" v-model="nextModel.invoiceNo" :maxlength="8" placeholder=""></i-input>
                                </FormItem>
                            </i-col>
                        </div>
                        <div v-else>
                            <i-col span="12">
                                <FormItem prop="invoiceCode" label="发票代码:">
                                    <i-input type="text" v-model="nextModel.invoiceCode" :maxlength="12" placeholder=""></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem prop="invoiceNo" label="发票号码:">
                                    <i-input type="text" v-model="nextModel.invoiceNo" placeholder="" :maxlength="8"></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="24"><p class="negative-tips">确认正数发票代码、号码</p></i-col>
                            <i-col span="12">
                                <FormItem prop="repeatInvoiceCode" label="发票代码">
                                    <i-input type="text" v-model="nextModel.repeatInvoiceCode" :maxlength="12"></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem prop="repeatInvoiceNo" label="发票号码">
                                    <i-input type="text" v-model="nextModel.repeatInvoiceNo" :maxlength="8"></i-input>
                                </FormItem>
                            </i-col>
                        </div>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <FuncButton inputLabel="下一步" :clickCallback="nextStep"></FuncButton>
            </div>
        </Modal>
        <!-- 红字专票 弹框 -->
        <red-info ref="redInfo" @red-info-change="redInfoChange"></red-info>
    </div>
</template>

<script>
import { keyUtil } from '../store/helper'
import { getDefaultDetailTpl } from '../store/stateHelper'
import RedInfo from './modal/redInfo'
// TODO → webpack 打包不同的绝对路径  需要再webpack 中配置，分别 开发 生产 预生产 环境
const OUTPUT_URL = ''

export default {
    data () {
        const isNumber = (val) => {
            return /^\d+?$/.test(val)
        }
        const validateRedInfoNo = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('信息表编号不能为空'))
            } else if (!isNumber(value)) {
                callback(new Error('信息表编号只能是数字类型'))
            } else {
                callback()
            }
        }
        const validatePassRedInfoNo = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('请再次输入信息表编号'))
            } else if (!isNumber(value)) {
                callback(new Error('信息表编号只能是数字类型'))
            } else if (value !== this.nextModel.redInfoNo) {
                callback(new Error('信息表编号两次输入不一致'))
            } else {
                callback()
            }
        }
        const validateRedInvoiceCode = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('销项正数发票代码不能为空'))
            } else if (!isNumber(value)) {
                callback(new Error('销项正数发票代码只能是数字类型'))
            } else if (value.length !== 10) {
                callback(new Error('销项正数发票代码输入不正确'))
            } else {
                callback()
            }
        }
        const validateInvoiceCode = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('销项正数发票代码不能为空'))
            } else if (!isNumber(value)) {
                callback(new Error('销项正数发票代码只能是数字类型'))
            } else if (value.length !== 10 && value.length !== 12) {
                callback(new Error('销项正数发票代码输入不正确'))
            } else {
                callback()
            }
        }
        const validateInvoiceNo = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('销项正数发票号码不能为空'))
            } else if (!isNumber(value)) {
                callback(new Error('销项正数发票号码只能是数字类型'))
            } else if (value.length !== 8) {
                callback(new Error('销项正数发票号码输入不正确'))
            } else {
                callback()
            }
        }
        const validatePassInvoiceCode = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('请再次输入发票代码'))
            } else if (!isNumber(value)) {
                callback(new Error('发票代码只能是数字类型'))
            } else if (value !== this.nextModel.invoiceCode) {
                callback(new Error('发票代码两次输入不一致'))
            } else {
                callback()
            }
        }
        const validatePassInvoiceNo = (rule, value, callback) => {
            value = value.replace(/\s/g, '')
            if (value === '') {
                callback(new Error('请再次输入发票号码'))
            } else if (!isNumber(value)) {
                callback(new Error('发票号码只能是数字类型'))
            } else if (value !== this.nextModel.invoiceNo) {
                callback(new Error('发票号码两次输入不一致'))
            } else {
                callback()
            }
        }
        const isRedFlage = this.config.enableSpecialNagative
        return {
            // 上传 相关
            actionUrl: OUTPUT_URL + '/api/redInvoice/importRedInfo',
            file: null,
            loadingStatus: false,
            // 负数发票
            showCommonNeigative: this.config.enableCommonNagative,
            showSpecialNeigative: this.config.enableSpecialNagative,
            // 对应的正数发票号码
            nextModel: {
                redInfoNo: '',
                repeatRedInfoNo: '',
                invoiceCode: '',
                invoiceNo: '',
                repeatInvoiceCode: '',
                repeatInvoiceNo: ''
            },
            ruleValidate: {
                redInfoNo: [{ required: isRedFlage, validator: validateRedInfoNo, trigger: 'blur' }],
                repeatRedInfoNo: [{required: isRedFlage, validator: validatePassRedInfoNo, trigger: 'blur'}],
                invoiceCode: [{ required: true, validator: (isRedFlage ? validateRedInvoiceCode : validateInvoiceCode), trigger: 'blur' }],
                invoiceNo: [{ required: true, validator: validateInvoiceNo, trigger: 'blur' }],
                repeatInvoiceCode: [{required: !isRedFlage, validator: validatePassInvoiceCode, trigger: 'blur'}],
                repeatInvoiceNo: [{required: !isRedFlage, validator: validatePassInvoiceNo, trigger: 'blur'}]
            }
        }
    },
    components: { RedInfo },
    props: {
        config: {
            type: Object,
            required: true
        }
    },
    computed: {
        commonNeigativeTitle () {
            if (this.config.enableSpecialNagative) {
                return '导入开具请上传信息表文件或者手工输入请填写信息表编号'
            } else if (this.config.enableCommonNagative) {
                return '开票信息填写'
            }
        }
    },
    methods: {
        // 上传相关
        beforeUpload (file) {
            this.$refs.uploadRed.clearFiles()
            this.file = file
            return false
        },
        onSuccess (response, file, fileList) {
            if (!response.success) {
                this.$Message.info({
                    content: response.errorMsg + '请重新上传',
                    duration: 4
                })
                this.$refs.uploadRed.clearFiles()
                return
            }
            let [res] = response.data || []
            if (res) {
                this.nextModel.redInfoNo = res.redInfoNo
                this.nextModel.repeatRedInfoNo = res.redInfoNo
                this.nextModel.invoiceNo = res.invoiceNo
                this.nextModel.invoiceCode = res.invoiceCode
            }
        },
        onError (error, file, fileList) {
            console.log(error, file, fileList)
        },
        upload () {
            this.loadingStatus = true
            this.http.outUploadPost('/api/redInvoice/importRedInfo', this.file).then((response) => {
                const resp = response.data
                if (resp.success) {
                    let [res] = resp.data || []
                    if (!res) {
                        this.$Message.info('数据返回错误')
                    }
                    this.nextModel.redInfoNo = res.redInfoNo
                    this.nextModel.repeatRedInfoNo = res.redInfoNo
                    this.nextModel.invoiceNo = res.invoiceNo
                    this.nextModel.invoiceCode = res.invoiceCode
                    this.nextStep()
                    this.$nextTick(() => {
                        this.file = null
                        this.loadingStatus = false
                        this.$refs.uploadRed.clearFiles()
                    })
                } else {
                    this.$Message.info({
                        content: resp.errorMsg + ',请重新上传',
                        duration: 3
                    })
                    this.file = null
                    this.loadingStatus = false
                    this.$refs.uploadRed.clearFiles()
                }
            }).catch(() => {
                this.file = null
                this.loadingStatus = false
                this.$refs.uploadRed.clearFiles()
            })
        },
        // 红字专票 选择器
        redInfoBtn () {
            this.$store.commit(keyUtil.getChangeName('showRedInfoNoSelector'), true)
        },
        // 红字专票 弹框 赋值
        redInfoChange (row) {
            this.nextModel.redInfoNo = row.redInfoNo
            this.nextModel.repeatRedInfoNo = row.redInfoNo
            this.nextModel.invoiceCode = row.invoiceCode
            this.nextModel.invoiceNo = row.invoiceNo
        },
        // 下一步 按钮
        nextStep () {
            this.$refs.negativeForm.validate((valid) => {
                if (valid) {
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'load-c',
                                        size: 25
                                    }
                                }),
                                h('div', '数据请求中,请稍候')
                            ])
                        }
                    })
                    this.$store.commit(keyUtil.getChangeName('isOpenReComputed'), false)
                    // 红字专票
                    if (this.config.enableSpecialNagative) {
                        this.redNegative()
                    } else {
                        this.generalNegative()
                    }
                }
            })
        },
        // 红字专票负数下一步
        redNegative () {
            let {invoiceCode, invoiceNo, redInfoNo} = this.nextModel
            let data = {invoiceCode, invoiceNo, redInfoNo}
            // 当用户申请负数开票，需要通过发票代码发票号码查询原发票的信息
            this.$store.dispatch('updatedRedInvoiceEditCurrentData', data).then((res) => {
                if (res.flage) {
                    // 重新获取 发票代码 号码 代替 this.getCodeNo()
                    this.$emit('reGetCodeNo')
                    this.showCommonNeigative = false
                    this.$store.commit(keyUtil.getChangeName('showCommonNeigativeNext'), true)
                } else {
                    let content = ''
                    if (res.msg === '1') {
                        content = '未能找到相应的红字信息表和原发票代码号码，是否继续开具红字发票'
                    } else if (res.msg === '2') {
                        content = '未能找到相应的红字信息表，是否继续开具红字发票'
                    } else if (res.msg === '3') {
                        content = '原发票号码代码不存在，是否需要手工开具红字发票。确定后进入手工开具界面。'
                    } else {}
                    this.$Modal.confirm({
                        title: '提示',
                        content,
                        onOk: () => {
                            this.showCommonNeigative = false
                            this.$store.commit(keyUtil.getChangeName('showCommonNeigativeNext'), true)
                            // 重新获取 发票代码 号码 代替 this.getCodeNo()
                            this.$emit('reGetCodeNo')
                            // 重新获取 默认配置 代替 this.getDefaultConfig()
                            this.$emit('reGetDefaultConfig')

                            this.$nextTick(() => {
                                this.$store.commit(keyUtil.getChangeName('buyerInfo'), {
                                    taxSerial: '',
                                    name: '',
                                    addressAndPhone: '',
                                    bankAndAccount: ''
                                })
                                this.$store.commit(keyUtil.getChangeName('remarks'), '')
                                this.$store.commit(keyUtil.getChangeName('detailList'), [{
                                    ...getDefaultDetailTpl()
                                }])
                            })
                        },
                        onCancel: () => {
                            this.$store.commit(keyUtil.getChangeName('isOpenReComputed'), true)
                        }
                    })
                }
                this.$Spin.hide()
            }).catch(() => {
                this.$Spin.hide()
                this.$store.commit(keyUtil.getChangeName('showCommonNeigativeNext'), false)
                this.$store.commit(keyUtil.getChangeName('isOpenReComputed'), true)
            })
        },
        // 普票负数 下一步
        generalNegative () {
            let {invoiceCode, invoiceNo} = this.nextModel
            let data = {invoiceCode, invoiceNo, invoiceTypeCode: this.invoiceTypeCode}
            // 当用户申请负数开票，需要通过发票代码发票号码查询原发票的信息
            this.$store.dispatch('updatedInvoiceEditCurrentData', data).then((res) => {
                if (res) {
                    // 重新获取 发票代码 号码 代替 this.getCodeNo()
                    this.$emit('reGetCodeNo')
                    this.showCommonNeigative = false
                    this.$store.commit(keyUtil.getChangeName('showCommonNeigativeNext'), true)
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '无法找到您输入的发票代码和发票号码，点击确定后，进入手工开具负数发票界面!',
                        onOk: () => {
                            this.showCommonNeigative = false

                            this.$store.commit(keyUtil.getChangeName('showCommonNeigativeNext'), true)
                            // 重新获取 发票代码 号码 代替 this.getCodeNo()
                            this.$emit('reGetCodeNo')
                            // 重新获取 默认配置 代替 this.getDefaultConfig()
                            this.$emit('reGetDefaultConfig')
                            this.$nextTick(() => {
                                this.$store.commit(keyUtil.getChangeName('buyerInfo'), {
                                    taxSerial: '',
                                    name: '',
                                    addressAndPhone: '',
                                    bankAndAccount: ''
                                })
                                this.$store.commit(keyUtil.getChangeName('email'), '')
                                this.$store.commit(keyUtil.getChangeName('phone'), '')
                                this.$store.commit(keyUtil.getChangeName('remarks'), '')
                                this.$store.commit(keyUtil.getChangeName('detailList'), [{
                                    ...getDefaultDetailTpl()
                                }])
                                if (this.invoiceTypeCode === '006') {
                                    this.$emit('re-load')
                                }
                            })
                        },
                        onCancel: () => {
                            this.$store.commit(keyUtil.getChangeName('isOpenReComputed'), true)
                        }
                    })
                }
                this.$Spin.hide()
            }).catch(() => {
                this.$Spin.hide()
                this.$store.commit(keyUtil.getChangeName('showCommonNeigativeNext'), false)
                this.$store.commit(keyUtil.getChangeName('isOpenReComputed'), true)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
