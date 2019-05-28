<template>
    <div class="online-run">
        <online-header class="online-run-header"
                       @run="handleRun"
                       @reset="handleReset">
        </online-header>
        <div class="main">
            <SpiltCode v-model="split">
                <codemirror
                    slot="left"
                    v-model="code"
                    :options="cmOptions">
                </codemirror>
                <div slot="right" id="show-el"></div>
            </SpiltCode>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

// codemirror相关
import { codemirror } from 'vue-codemirror'
import '@/codeMirror/index.js'
import codeDefault from '@/codeMirror/codeDefault.js'

// 导入自定义组件
import OnlineHeader from './onlineHeader.vue'
import SpiltCode from './spilt.vue'

// 导入分割字符串方法
import { getSource, getUuid } from '@/utils/util'

export default {
    name: 'online-run',
    components: {
        codemirror, OnlineHeader, SpiltCode
    },
    data () {
        return {
            code: codeDefault,
            split: 0.5,
            cmOptions: {
                mode: 'htmlmixed',
                lineNumbers: !0,
                autoCloseBrackets: !0,
                matchBrackets: !0,
                autoCloseTags: true,
                showCursorWhenSelecting: !0,
                tabSize: 4,
                foldGutter: !0,
                gutters: [
                    'CodeMirror-linenumbers',
                    'CodeMirror-foldgutter',
                    'CodeMirror-lint-markers'
                ],
                autofocus: !0,
                styleActiveLine: !0
            },
            userCode: {
                template: '',
                script: '',
                style: '',
                uuid: '',
                component: null
            },
            mountEl: ''
        }
    },
    methods: {
        handleRun () {
            this.unMountUserCode()
            this.splitCode()
            this.mountUserCode()
        },
        handleReset () {
            this.code = codeDefault
            this.unMountUserCode()
        },
        mountUserCode () {
            this.userCode.uuid = getUuid()
            // 生成组件挂载
            const parseStrToObj = new Function(this.userCode.script)()
            parseStrToObj.template = this.userCode.template
            let userCodeComponent = Vue.extend(parseStrToObj)
            this.userCode.component = new userCodeComponent().$mount()
            this.mountEl.appendChild(this.userCode.component.$el)
            // 添加样式
            if (this.userCode.css !== '') {
                let styleEl = document.createElement('style')
                styleEl.type = 'text/css'
                styleEl.id = this.userCode.uuid
                styleEl.innerHTML = this.userCode.style
                document.head.appendChild(styleEl)
            }
        },
        unMountUserCode () {
            // 销毁组件
            if (this.userCode.component) {
                this.mountEl.removeChild(this.userCode.component.$el)
                this.userCode.component.$destroy
                this.userCode.component = null
            }
            // 清除样式
            let userStyle = document.getElementById(this.userCode.uuid)
            if (userStyle) {
                document.head.removeChild(userStyle)
            }
        },
        splitCode () {
            this.userCode.template = getSource(this.code, 'template')
            this.userCode.style = getSource(this.code, 'style')
            this.userCode.script = getSource(this.code, 'script').replace(
                /export default/,
                'return '
            )
        }
    },
    mounted () {
        this.mountEl = document.getElementById('show-el')
        this.handleRun()
    }
}
</script>

<style lang="scss">
    @import "../../libs/styles/common/color";

    .online-run {
        margin-top: 70px;
        position: absolute;
        width: 100%;
        background: white;
        z-index: 1000;
        .vue-codemirror, .CodeMirror {
            height: 100%;
        }
        .main {
            border: 1px solid $Border;
            height: 1000px;
        }
        .cm-tag {
            color: $LightPrimary;
        }
        .cm-attribute {
            color: $Error;
        }
        .cm-string {
            color: $Success;
        }
        .CodeMirror-line {
            color: $Title;
        }
        .cm-property {
            color: $Warning;
        }
    }

</style>
