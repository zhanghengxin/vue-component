<template>
    <ul :class="prefixCls">
        <li
            :key="'file' + index"
            v-for="(file, index) in files"
            :class="fileCls(file)"
            @click="handleClick(file)">
            <span @click="handlePreview(file)">
                <b-icon :type="format(file)"></b-icon>
                {{ file.name }}
            </span>
            <b-icon
                type="shibai-mian"
                :class="[prefixCls + '-remove']"
                v-show="file.status === 'finished'"
                @click.native="handleRemove(file)">
            </b-icon>
            <transition name="fade">
                <b-progress
                    v-if="file.showProgress"
                    :stroke-width="2"
                    :percentage="parsePercentage(file.percentage)"
                    :status="file.status === 'finished' && file.showProgress ? 'Success' : ''">
                </b-progress>
            </transition>
        </li>
    </ul>
</template>
<script>
import BIcon from '../icon'
import BProgress from '../progress'
import { prefix } from '../../utils/common'

const prefixCls = `${prefix}upload-list`

export default {
    name: prefixCls,
    components: { BIcon, BProgress },
    props: {
        files: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            prefixCls
        }
    },
    methods: {
        fileCls (file) {
            return [
                `${prefixCls}-file`,
                {
                    [`${prefixCls}-file-finish`]: file.status === 'finished'
                }
            ]
        },
        handleClick (file) {
            this.$emit('on-file-click', file)
        },
        handlePreview (file) {
            this.$emit('on-file-preview', file)
        },
        handleRemove (file) {
            this.$emit('on-file-remove', file)
        },
        parsePercentage (value) {
            return parseInt(value, 10)
        },
        format (file) {
            const format = file.name.split('.').pop().toLocaleLowerCase() || ''
            let type = 'baobiao'
            if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
                type = 'tupian'
            }
            if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
                type = 'yingxiangguanli'
            }
            if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
                type = 'mingxi'
            }
            if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
                type = 'baobiao'
            }
            if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
                type = 'tongjibaobiao'
            }
            if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
                type = 'yingxiangguanli'
            }
            return type
        }
    }
}
</script>
