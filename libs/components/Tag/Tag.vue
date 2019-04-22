/*
* @Author: lijiahang
* @Date: 2018-11-15 17:52:20
* @Last Modified by: hanshuai@baiwang.com
* @Last Modified time: 2019-01-16 15:21:06
*/

<template>
    <div :class="btagoutclass" v-if="show" @click="handleClick">
        <span
            v-if="type"
            :class="btagdotclass">
        </span>
        <span>
            <slot></slot>
        </span>
        <Icon
            v-if="closeable"
            type="quxiao-guanbi-shanchu"
            @click.native='close'>
        </Icon>
    </div>
</template>

<script>
import Icon from '../icon'
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'tag'
export default {
    name: prefixCls,
    components: {Icon},
    props: {
        color: {
            type: String,
            default: ''
        },
        closeable: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        },
        name: [String, Number],
        backcolor: {
            type: String,
            default: ''
        }
    },
    computed: {
        btagdotclass () {
            return [`${prefixCls}-inner`, `${prefixCls}-${this.color}`]
        },
        btagoutclass () {
            return [`${prefixCls}`, `${prefixCls}-back-${this.backcolor}`]
        }
    },
    data () {
        return {
            show: true,
            prefixCls: prefixCls
        }
    },
    methods: {
        close (event) {
            this.show = false
            this.$emit('on-close', event, this.name)
        },
        handleClick (e) {
            this.$emit('on-click', e, this.name)
        }
    }
}
</script>
