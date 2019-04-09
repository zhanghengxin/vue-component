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
        <Icon :class="prefixCls+`-load-loop`" type="tongbu" v-if="loading"></Icon>
        <Icon :type="icon" v-if="(icon) && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </a>
    <button
        v-else
        :type="htmlType"
        :class="classes"
        :disabled="disabled"
        @click="handleClickLink">
        <Icon :class="prefixCls+`-load-loop`" type="tongbu" v-if="loading"></Icon>
        <Icon :type="icon" v-if="(icon) && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>
<script>
    import Icon from '../icon'
    import { prefix, oneOf } from '../../utils/common'
    import mixinsLink from '../../mixins/link'

    const prefixCls = prefix + 'button'

    export default {
        name: prefixCls,
        mixins: [ mixinsLink ],
        components: { Icon },
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'])
                },
                default: 'default'
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline'])
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default'])
                },
                default () {
                    return 'default'
                }
            },
            loading: Boolean,
            disabled: Boolean,
            htmlType: {
                default: 'button',
                validator (value) {
                    return oneOf(value, ['button', 'submit', 'reset'])
                }
            },
            icon: {
                type: String,
                default: ''
            },
            long: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showSlot: true,
                prefixCls
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: this.size !== 'default',
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading),
                        [`${prefixCls}-ghost`]: this.ghost
                    }
                ]
            }
        },
        methods: {
            handleClickLink (event, new_window = false) {
                this.$emit('on-click', event)
                this.handleCheckClick(event, new_window)
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined
        }
    }
</script>
