<template>
    <div>
        <slot name="template"></slot>
        <div
            @click="handleUploadClick"
            @drop.prevent="onDrop"
            @paste="handlePaste(e)"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            style="width:67px;"
        >
            <input
                style="display:none"
                ref="input"
                type="file"
                @change="handleChange"
                :multiple="multiple"
                :accept="accept"
            >
            <!-- <i>👇 上传显示框/slot 用来插入组件</i> -->
            <slot style="" name="uploadTitle"></slot>
        </div>
        <slot name="tip"></slot>
        <!-- <div>👇 上传列表</div> -->
        <!-- @click.self="handleClick(file)"         -->
        <ul v-if="showUploadList">
            <li :key="file.uid"
                v-for="file in fileList"
                class="li-bg"
            >
                <span
                    @click.self="handlePreview(file)"
                >
                    <!-- :type="handleFormat(file)" -->
                    <Icon></Icon>{{file.name}}
                </span>
                <span
                    @click="handleRemove(file)"
                >
                    <!-- <Icon
                        v-show="file.status === 'finished'"
                        @click.native="handleRemove(file)"
                    > -->
                      <Icon type="shibai" size=12></Icon>
                    <!-- <button
                        @click="handleRemove(file)"
                    > -->
                        <!-- 删除
                    </button> -->
                    <!-- </Icon> -->
                </span>
                <!-- @click="handleUploadAgain(file)" -->
                <span>
                    <div
                        v-show="file.status === 'fail'"
                        @click.self="handleUploadAgain(file)"
                        >{{file.prompt}}
                    </div>
                </span>
                <!-- <div>👇 上传进度框</div> -->
                <transition name="fade">
                    <!-- <div class="bw-progress-inner" v-show="file.status !== 'finished'"> -->
                        <!-- <div class="bw-progress-bg" :style="bgStyle"></div> -->
                        <!-- <div class="bw-progress-bg" style="`width:${file.precent}px,height:10px`"></div> -->
                    <!-- </div> -->
                    <!-- :status="file.status === 'fail' ? '#e64e12' : '#2d8cf0'"  -->
                    <b-progress
                        :percent="file.percentage"
                        v-show="file.status !== 'finished' &&  file.status !== 'fail'"
                    >
                    </b-progress>
                </transition>
            </li>
        </ul>
    </div>
</template>
<script>
import ajax from './upload_ajax.js'
import Icon from '../icon/Icon.vue'
import bProgress from './progress.vue'

export default {
    name: 'bwUpload',
    components: {Icon, bProgress},
    props: {
        action: {
            type: String,
            require: true // 上传地址 * 必须传入
        },
        headers: {
            type: Object,
            default: function () {

            } // 上传请求头部
        },
        multiple: {
            type: [Boolean, String],
            default: false // 支持多行
        },
        parse: {
            type: Boolean,
            default: true
        },
        data: {
            type: Object // 上传时附带的额外参数
        },
        name: {
            type: String
        },
        withCredentials: {
            type: Boolean,
            default: false //  支持cookie信息
        },
        showUploadList: {
            type: Boolean,
            default: true //  支持显示list信息
        },
        accept: {
            type: String,
            default: '' //  避免使用
        },
        format: {
            type: Array,
            default () {
                return []
            }
        },
        maxSize: {
            type: Number
        },
        dragOver: {
            type: Boolean,
            default: false
        },
        beforeUpload: Function,
        onSuccess: {
            type: Function,
            default () {
                return {}
            }
        },
        onError: {
            type: Function,
            default () {
                return {}
            }
        },
        onClick: {
            type: Function,
            default () {
                return {}
            }
        },
        onRemove: {
            type: Function,
            default () {
                return {}
            }
        },
        onPreview: {
            type: Function,
            default () {
                return {}
            }
        },
        onProgress: {
            type: Function,
            default () {
                return {}
            }
        },
        onFormatError: {
            type: Function,
            default () {
                return {}
            }
        },
        onExceededSize: {
            type: Function,
            default () {
                return {}
            }
        }
        // ,
        // inputShow: {
        //     type: Boolean
        // }
        // prompt: {
        //     type: String,
        //     default: ''
        // }
        // percent: {
        //     type: Number,
        //     default: 0
        // }
    },
    data () {
        return {
            fileList: [],
            tempIndex: 0,
            percent: 0
        }
    },
    computed: {
        // bgStyle () {
        //     return {
        //         width: `${this.percent}%`,
        //         height: `10px`
        //     }
        // }
        // inputStyle () {
        //     let obj = {}
        //     if (this.inputShow) {
        //         obj.display = 'block'
        //     } else {
        //         obj.display = 'none'
        //     }
        //     return obj
        // }
    },
    // watch: {
    //     percent () {

    //     }
    // },
    methods: {
        handleChange (e) {
            const files = e.target.files
            // console.log('上传文件 - input.value', this.$refs.input.value)
            if (!files) {
                return
            }
            this.uploadFiles(files)
            this.$refs.input.value = null
        },
        handleUploadClick () {
            this.$refs.input.click()
        },
        handleUploadAgain (file) {
            // let _index = file.uid - 1
            let _file = this.getFile(file)
            _file.status = 'reload'
            this.upload(file)
        },
        onDrop (e) {
            this.uploadFiles(e.dataTransfer.files) //   事件存储的files
        },
        handlePaste (e) {
            if (this.parse) {
                this.uploadFiles(e.clipboardData.files) //  粘贴板里的files
            }
        },
        uploadFiles (files) {
            let filesArray = Array.from(files)
            let _fileList = this.fileList
            let checked = false
            //  支持多文件同时选中上传
            if (filesArray.length === 0) {
                return
            }
            // debugger // 测试multiple over
            if (!this.multiple) {
                if (this.fileList.length < 1) {
                    this.upload(filesArray[0])
                }
            } else {
                filesArray.forEach(file => {
                    checked = _fileList.some(item => item.name === file.name)
                    if (checked) {
                        this.onError(new Error(`文件名重复`))
                        // console.log(_fileList.indexOf(file.name))
                    } else {
                        this.upload(file)
                    }
                })
            }
        },
        upload (file) {
            if (!this.beforeUpload) {
                return this.post(file)
            }
        },
        post (file) {
            // console.log('this.format', this.format)
            if (this.format.length) {
                const _fileSuffix = file.name.split('.').pop().toLocaleLowerCase()
                const checked = this.format.some(item => {
                    return item.toLocaleLowerCase() === _fileSuffix
                })
                console.log(checked)
                if (!checked) {
                    this.onFormatError(file, this.fileList)
                    return false
                }
            }
            if (this.maxSize) {
                if (file.size >= this.maxSize * 1024) {
                    this.onExceededSize(file, this.fileList)
                    return false
                }
            }
            if (file.status !== 'reload') {
                this.handlePushFilesList(file) //  加入list
            }

            ajax({
                headers: this.headers,
                withCredentials: this.withCredentials,
                file: file,
                data: this.data,
                filename: this.name,
                action: this.action,
                onProgress: e => {
                    this.handleProgress(e, file)
                },
                onSuccess: e => {
                    this.handleSuccess(e, file)
                },
                onError: (err, res) => {
                    this.handleError(err, res, file)
                }
            })
        },
        handlePushFilesList (file) {
            file.uid = ++this.tempIndex
            const _file = {
                status: 'uploading',
                name: file.name,
                size: file.size,
                percentage: 0,
                uid: file.uid,
                showProgress: true
            }
            // debugger // file插入fileList 数组
            this.fileList.push(_file)
        },
        getFile (file) {
            let target = ''
            const _fileList = this.fileList
            _fileList.every(item => {
                target = item.uid === file.uid ? item : null
                return !target
            })

            return target
        },
        handleProgress (e, file) {
            const _file = this.getFile(file)
            this.onProgress(e, _file, this.fileList)
            if (_file) {
                _file.percentage = e.percent || 0
            }
        },
        handleSuccess (res, file) {
            const _file = this.getFile(file)
            if (_file) {
                _file.status = 'finished'
                _file.response = res
                // 成功之后改状态
                this.onSuccess(_file.response, _file, this.fileList)
            }
        },
        handleError (err, response, file) {
            const _file = this.getFile(file)
            const _status = err.status || err.target.status
            _file.prompt = ''
            _file.status = 'fail'
            if (_status === 0) {
                _file.prompt = `未上传, 联系后台亲, status: 0`
            } else if (_status < 200) {
                _file.prompt = `上传中, 请等待亲, status: ${_status}`
            } else if (_status >= 400 && _status < 500) {
                _file.prompt = `客户端错误, 请联系前端亲, status: ${_status}`
            } else if (_status >= 500) {
                _file.prompt = `服务器错误, 请联系后端亲, status: ${_status}`
            }
            this.onError(err, response, file)
        },
        handlePreview (file) {
            this.onPreview(file)
        },
        handleRemove (file) {
            const _fileList = this.fileList
            // console.log(_fileList, file)
            _fileList.splice(_fileList.indexOf(file), 1)
            this.onRemove(file, _fileList)
        }
    }
}
</script>

<style>
.li-bg:hover {
    background: #f3f3f3
}
</style>
