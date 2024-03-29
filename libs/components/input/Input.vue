/**
* input 组件
* @author ganbowen
* @created 2018/09/18 20:05:54
*/
<template>
    <div :class="boxClasses" :style='inputBoxStyles'
         @mouseenter="mouseenterHandle"
         @mouseleave="mouseleaveHandle">
        <template v-if="type !== 'textarea'">
            <div ref="label" :class="labelClasses" :style='labelStyles' v-if="label || $slots.label">
                <slot name="label">{{label}}</slot>
            </div>
            <div ref="prepend" :class="[prefixCls+`-prepend`]" v-if="$slots.prepend && !label && !$slots.label">
                <slot name="prepend"></slot>
            </div>
            <div :class="[prefixCls+`-main`]" :style='inputStyles'>
                <div v-if="prefix || $slots.prefix" :class='[prefixCls+`-icon`,prefixCls+`-icon-prefix`]'>
                    <slot name='prefix'>
                        <Icon size :type="prefix+''" @on-click="handleIconClick"></Icon>
                    </slot>
                </div>
                <transition name='fade'>
                    <div v-if="suffix || $slots.suffix || clearable || showPassword"
                         v-show='showSuffix' :class='[prefixCls+`-icon`,prefixCls+`-icon-suffix`]'>
                        <Icon size v-if="clearable && currentValue" type="shibai-mian"
                              :class="[prefixCls+`-icon-clear`]" @on-click="handleClear"></Icon>
                        <Icon size v-if="showPassword && currentValue" type="suoding-dongjie"
                              @on-click="handleShowPassword"></Icon>
                        <slot name='suffix' v-if='suffix || $slots.suffix'>
                            <Icon size :type="suffix+''" :class="[prefixCls+`-noclear`]"
                                  @on-click="handleIconClick"></Icon>
                        </slot>
                    </div>
                </transition>
                <input
                    :id="elementId"
                    :class="inputClasses"
                    :spellcheck="spellcheck"
                    ref="input"
                    :value="currentValue"
                    :name="name"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :maxlength="maxlength"
                    :minlength="minlength"
                    :readonly="readonly"
                    :autofocus="autofocus"
                    :type="currentType"
                    :autocomplete="autocomplete"
                    @change="handleChange"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keyup="handleKeyup"
                    @keydown="handleKeydown"/>
            </div>
            <div ref="append" :class="[prefixCls+`-append`]" v-if="$slots.append && !label && !$slots.label">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea
            v-else
            :id="elementId"
            :class="textareaClasses"
            :style="textareaStyles"
            :spellcheck="spellcheck"
            ref="textarea"
            :value="currentValue"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :minlength="minlength"
            :readonly="readonly"
            :autofocus="autofocus"
            :rows="rows"
            :wrap="wrap"
            :autosize="autosize"
            :type="currentType"
            @change="handleChange"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @keyup="handleKeyup"
            @keydown="handleKeydown">
        </textarea>
    </div>
</template>

<script>
import calcTextareaHeight from './calcTeatareaHeight.js'
import { findComponentUpward } from '../../utils/assist'
import { prefix, oneOf, propsInit } from '../../utils/common'
import Emitter from '../../mixins/emitter'
import Icon from '../icon'

const prefixCls = prefix + 'input' // b-input

export default {
    name: prefixCls,
    mixins: [Emitter],
    components: {Icon},
    props: {
        // 接收input的自带属性
        elementId: {
            type: String
        },
        type: {
            validator (value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'])
            },
            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        // 样式属性
        size: {
            // default: 'default',
            validator: function (value) {
                return ['large', 'small', 'default'].indexOf(value) !== -1
            },
            default () {
                return !this.size || this.size === '' ? 'default' : this.size
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        showSuffix: {
            type: Boolean,
            default: true
        },
        name: {
            type: String
        },
        autocomplete: {
            type: String,
            default: 'off',
            validator (value) {
                return oneOf(value, ['off', 'on'])
            }
        },
        // textarea
        rows: {
            type: [Number, String],
            default: 2
        },
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        wrap: {
            validator (value) {
                return function (value) {
                    return ['hard', 'soft'].indexOf(value) !== -1
                }
            },
            default: 'soft'
        },
        // props type为[Number, String]的配置
        ...propsInit({
            // label label样式的文字描述
            // width input的宽度
            // labelWidth label样式的文字的宽度 仅在fixed为false时有效
            // maxlength lmaxlength
            // minlength minlength
            props: ['label', 'width', 'labelWidth', 'maxlength', 'minlength'],
            config: {
                type: [Number, String]
            }
        }),
        // props type为 Boolean 的配置
        ...propsInit({
            // disabled disabled
            // readonly readonly
            // autofocus autofocus
            // spellcheck 原生的拼写检测
            // error error的样式设置
            // clearable 清空
            // fixed label的两种样式
            // prefix 前面的icon显示
            // suffix 后面的icon显示
            props: ['disabled', 'readonly', 'autofocus', 'spellcheck', 'error', 'clearable', 'showPassword', 'fixed'],
            config: {
                type: Boolean,
                default: false
            }
        }),
        // props type为 Boolean 的配置
        ...propsInit({
            // prefix 前面的icon显示
            // suffix 后面的icon显示
            props: ['prefix', 'suffix'],
            config: {
                type: [Boolean, String],
                default: ''
            }
        })
    },
    data () {
        return {
            currentValue: this.value,
            prefixCls: prefixCls,
            textareaStyles: {},
            labelFocus: false,
            inputStyles: {},
            currentType: this.type
        }
    },
    computed: {
        boxClasses () {
            return [
                `${prefixCls}-box`,
                `${prefixCls}-box-${this.size}`,
                {
                    [`${prefixCls}-error`]: this.error,
                    [`${prefixCls}-fixed-disabled`]: this.label && this.fixed && this.disabled,
                    [`${prefixCls}-box-clear`]: this.clearable && this.currentValue,
                    [`${prefixCls}-group`]: this.label && !this.fixed,
                    [`${prefixCls}-group-fixed`]: (this.label && this.fixed) || ((this.$slots.append || this.$slots.prepend) && !this.label && !this.$slots.label),
                    [`${prefixCls}-box-textarea`]: this.type === 'textarea',
                    [`${prefixCls}-box-focused`]: this.label && this.fixed && this.labelFocus
                }
            ]
        },
        inputClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-prefix`]: this.prefix || this.$slots.prefix,
                    [`${prefixCls}-suffix`]: this.suffix || this.$slots.suffix || this.showPassword,
                    [`${prefixCls}-nobox`]: this.label && !this.fixed
                }
            ]
        },
        labelClasses () {
            return [
                prefixCls + `-label`,
                {
                    [prefixCls + `-label-box`]: this.fixed
                }
            ]
        },
        textareaClasses () {
            return [
                `${prefixCls}`,
                `${prefixCls}-textarea`
            ]
        },
        labelStyles () {
            const {label, $slots, labelWidth} = this
            let style = {}
            if ((label || $slots.label) && labelWidth) {
                style = {
                    width: `${labelWidth}px`
                }
            }
            return style
        },
        // 整体的input的宽度
        inputBoxStyles () {
            const {label, fixed} = this
            let style = {}
            if (!label || (label && fixed)) { //
                style.width = `${this.width}px`
            }
            return style
        }
    },
    mounted () {
        if (this.type === 'textarea') {
            this.resizeTextarea()
        } else {
            this.label && this.widthInit()
        }
    },
    methods: {
        widthInit () {
            const {fixed, label, $el} = this
            let width = ''
            if (label && fixed) {
                let clientWidth = parseInt($el.style.width)
                let labelWidth = this.labelWidth || +$el.querySelector(`.${prefixCls}-label`).clientWidth
                width = clientWidth - labelWidth - 1
                this.inputStyles = {
                    width: width + 'px'
                }
            } else {
                this.inputStyles = {
                    width: this.width + 'px'
                }
            }
        },
        handleShowPassword () {
            this.currentType = this.currentType !== 'password' ? 'password' : 'text'
        },
        mouseenterHandle (event) {
            this.$emit('on-mouseenter', event)
        },
        mouseleaveHandle (event) {
            this.$emit('on-mouseleave', event)
        },
        handleChange (event) {
            this.$emit('on-change', event)
        },
        handleFocus (event) {
            this.labelFocus = true
            this.$emit('on-focus', event)
        },
        handleBlur (event) {
            this.labelFocus = false
            this.$emit('on-blur', event)
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch(prefix + 'form-item', 'on-form-blur', this.currentValue)
            }
        },
        handleKeyup (event) {
            this.$emit('on-keyup', event)
        },
        handleKeydown (event) {
            if (event.keyCode === 13) {
                this.$emit('on-enter', event, this.currentValue)
            }
            this.$emit('on-keydown', event)
        },
        handleInput (event) {
            let value = event.target.value
            this.$emit('input', value)
            this.setCurrentValue(value)
            this.$emit('on-change', event)
        },
        setCurrentValue (value) {
            if (value === this.currentValue) return
            this.$nextTick(() => {
                this.resizeTextarea()
            })
            this.currentValue = value
        },
        resizeTextarea () {
            const autosize = this.autosize
            if (!autosize || this.type !== 'textarea') {
                return false
            }
            const minRows = autosize.minRows
            const maxRows = autosize.maxRows
            this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
        },
        handleIconClick (e) {
            e && e.preventDefault()
            e && e.stopPropagation()
            this.$emit('on-click', e, this.currentValue)
        },
        handleClear () {
            const e = {target: {value: ''}}
            this.$emit('input', '')
            this.setCurrentValue('')
            this.$emit('on-change', e)
            this.$emit('on-clear', '')
        },
        focus () {
            if (this.type === 'textarea') {
                this.$refs.textarea.focus()
            } else {
                this.labelFocus = true
                this.$refs.input.focus()
            }
        },
        blur () {
            if (this.type === 'textarea') {
                this.$refs.textarea.blur()
            } else {
                this.labelFocus = false
                this.$refs.input.blur()
                if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                    this.dispatch(prefix + 'form-item', 'on-form-change', this.currentValue)
                }
            }
        }
    },
    watch: {
        value (val) {
            this.setCurrentValue(val)
        }
    }
}

</script>

<style lang="scss">

</style>
