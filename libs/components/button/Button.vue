/**
* Created by lijiahang on 2018/9/5.
*
*/
<template>
    <button ref="button"
    :disabled="disabled"
    @click='handleClick($event)'
    :class="bclass"
    >
      <i v-if='loading' class="iconfont icon-loading">
      </i>
      <b-icon v-if="icon" :type="iclass">
      </b-icon>
      <span>
      <slot></slot>
      </span>
    </button>
</template>

<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'btn'
export default {
    name: 'bButton',
    computed: {
        iclass () {
            return `${this.icon}`
        },
        bclass () {
            return [ `${prefixCls}-${this.size}`,
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
            type: String,
            default: 'normal'
        },
        type: {
            type: String,
            default: 'typrimary'
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
        return {
        }
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
