<!-- 页边距设置 弹框 -->
<template>
    <div>
        <Modal v-model="showPageMarginSetting"
            :maskClosable="false"
            class-name="vertical-center-modal"
            title="页边距设置" width="360"
            @on-visible-change="showPageMarginSetting = arguments[0]"
            @on-ok="setPrintMargin"
        >
            <div class="wrap">
                <p style="margin-bottom: 16px">打印之前可进行页边距设置</p>
                <Form ref="pageMargin" :model="pageMargin" :label-width="100">
                    <FormItem label="打印上边距">
                    <InputNumber v-model="pageMargin.top" style="width:100%;"></InputNumber>
                    </FormItem>
                    <FormItem label="打印左边距">
                    <InputNumber v-model="pageMargin.left" style="width:100%;"></InputNumber>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showPageMarginSetting: false,
            pageMargin: {
                top: 0,
                left: 0
            }
        }
    },
    props: {
        invoiceTypeCode: {
            type: String,
            required: true
        },
        isDishOrServer: {
            type: String,
            required: true
        }
    },
    methods: {
        open () {
            this.showPageMarginSetting = true
            this.getPrintMargin()
        },
        getPrintMargin () {
            var ajaxData = {
                invoiceTypeCode: this.invoiceTypeCode
            }
            this.http.outPost('/api/invoiceManage/queryPrintMargin', ajaxData).then(resp => {
                var res = resp.data.results || []
                if (res.length === 0) {
                    this.pageMargin = {
                        top: 0,
                        left: 0
                    }
                } else {
                    this.pageMargin.top = Number(res[0].top)
                    this.pageMargin.left = Number(res[0].left)
                }
            })
        },
        setPrintMargin () {
            const userBindTerminal = JSON.parse(sessionStorage.getItem('userBindTerminal'))
            let data = {
                terminalId: userBindTerminal.terminalId,
                leftMargin: this.pageMargin.left,
                topMargin: this.pageMargin.top,
                invoiceTypeCode: this.invoiceTypeCode
            }
            if (this.isDishOrServer === 'dish') {
                data.invoiceTerminalCode = this.invoiceTerminalCode
            }
            this.http.outPost('/api/terminal/setTerminalMargin', data).then(res => {
                this.$Message.info('页边距设置成功')
                this.showPageMarginSetting = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
