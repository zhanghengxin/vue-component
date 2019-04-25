/*
* @Author: hanshuai
* @Date: 2018-09-21 14:44:29
* @Last Modified by: hanshuai
* @Last Modified time: 2018-11-26 18:58:57
*/

<template>
    <div :class="wrapperCls">
        <div :class="headerCls" v-if="showHeader">
            <slot name="title">
                <div :class="headerInnerCls" v-if="title">
                    <Icon v-if="icon" :type='icon'></Icon>
                    <span>{{title}}</span>
                </div>
            </slot>
        </div>
        <div :class="extraCls" v-if="showExtra">
            <slot name="extra"></slot>
        </div>
        <div :class="bodyCls" :style="bodyStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
import Icon from '../icon'

const prefixCls = prefix + 'card'

export default {
    name: prefixCls,
    components: {Icon},
    data () {
        return {
            prefixCls,
            showHeader: true,
            showExtra: true
        }
    },
    props: {
        icon: String,
        title: String,
        padding: {
            type: Number,
            default: 16
        },
        bordered: {
            type: Boolean,
            default: true
        },
        shadow: {
            type: Boolean,
            default: false
        },
        disHover: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-border`]: this.bordered && !this.shadow,
                    [`${prefixCls}-dis-hover`]: this.disHover,
                    [`${prefixCls}-shadow`]: this.shadow
                }
            ]
        },
        headerInnerCls () {
            return `${prefixCls}-header-inner`
        },
        headerCls () {
            return `${prefixCls}-header`
        },
        extraCls () {
            return `${prefixCls}-extra`
        },
        bodyCls () {
            return `${prefixCls}-body`
        },
        bodyStyle () {
            return {
                padding: this.padding + 'px'
            }
        }
    },
    mounted () {
        this.showHeader = this.title || this.$slots.title !== undefined
        this.showExtra = this.$slots.extra !== undefined
    }
}
</script>
