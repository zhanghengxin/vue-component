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
    <a
        v-if="to"
        :class="classes"
        :disabled="disabled"
        :href="linkUrl"
        :target="target"
        @click.exact="handleClickLink($event, false)"
        @click.ctrl="handleClickLink($event, true)"
        @click.meta="handleClickLink($event, true)">
        <svg v-if="loading" class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <Icon v-if="icon && !loading" :type="icon"></Icon>
        <span ref="slot"><slot></slot></span>
    </a>
    <button
        v-else
        ref="button"
        :type="htmlType"
        :class="bodyCls"
        :disabled="disabled"
        @click="handleClickLink">
        <svg v-if="loading" class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <Icon v-if="icon && !loading" :type="icon"></Icon>
        <span ref="slot"><slot></slot></span>
    </button>
</template>

<script>
import { prefix, oneOf } from '../../utils/common'
import mixinsLink from '../../mixins/link'
import Icon from '../icon'

const prefixCls = prefix + 'button'
export default {
    name: prefixCls,
    mixins: [mixinsLink],
    components: {Icon},
    computed: {
        bodyCls () {
            return [
                `${prefixCls}`,
                `${prefixCls}-size-${this.size}`,
                `${prefixCls}-type-${this.type} `,
                {
                    [`${prefixCls}-round`]: this.round, // 圆角
                    [`${prefixCls}-circle`]: this.circle, // 圆形
                    [`${prefixCls}-disabled`]: this.disabled // 禁用
                }
            ]
        }
    },
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['default', 'primary', 'error', 'warning', 'success'])
            },
            default: 'default'
        },
        size: {
            validator (value) {
                return oneOf(value, ['default', 'small', 'large'])
            },
            default: 'default'
        },
        disabled: Boolean,
        round: Boolean,
        loading: Boolean,
        circle: Boolean,
        icon: {
            type: String,
            default: ''
        },
        htmlType: {
            default: 'button',
            validator (value) {
                return oneOf(value, ['button', 'submit', 'reset'])
            }
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
        handleClickLink (event, new_window = false) {
            this.$emit('on-click', event)

            this.handleCheckClick(event, new_window)
        }
    }
}
</script>
