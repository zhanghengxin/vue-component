/**
* Created by 李佳航 on 2018/11/2.
*
*/
/*
* @Author: lijiahang
* @Date: 2018-11-14 15:32:43
* @Last Modified by:   lijiahang
* @Last Modified time: 2018-11-14 15:32:43
*/
<template>
    <button ref="button"
            :disabled="disabled"
            @click='handleClick($event)'
            :class="bodyCls"
    >
        <i v-if='loading' class="iconfont icon-loading"></i>
        <b-icon v-if="icon" :type="iconcls"></b-icon>
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script>
import { prefix, oneOf } from '../../utils/common'

const prefixCls = prefix + 'button'
export default {
    name: prefixCls,
    computed: {
        iconcls () {
            return `${this.icon}`
        },
        bodyCls () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.size}`,
                `${prefixCls}-${this.type} `,
                this.round ? `${prefixCls}-round` : '',
                (this.circle || this.icon) ? `${prefixCls}-circle` : '',
                this.disabled ? `${prefixCls}-disabled` : '',
                this.plain ? `${prefixCls}-plain` : ''
            ]
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            validator (value) {
                return oneOf(value, ['normal', 'small', 'big'])
            },
            default: 'normal'
        },
        type: {
            validator (value) {
                return oneOf(value, ['default', 'primary', 'error', 'warning', 'success'])
            },
            default: 'default'
        },
        round: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        }
    },
    data () {
        return {}
    },
    mounted () {
        // 是否需要不可点击？
        if (this.loading) {
            // this.disabled = true
        }
    },
    methods: {
        handleClick (e) {
            this.$emit('on-click', e)
        }
    }
}
</script>
