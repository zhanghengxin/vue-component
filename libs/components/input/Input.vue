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
            <div
                v-if="prefix"
                :class='[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-prefix`]'>
                <slot name='prefix'>
                    <Icon
                        size
                        :type="icon"
                        @on-click="handleIconClick">
                    </Icon>
                </slot>
            </div>
            <transition name='fade'>
                <div
                    v-if="suffix"
                    v-show='showSuffix'
                    :class='[
                    prefixCls+`-icon`,
                    prefixCls+`-icon-`+size,
                    prefixCls+`-icon-suffix`]'>
                    <slot name='suffix'>
                        <Icon
                            size
                            :type="icon"
                            :class="[prefixCls+`-noclear`]"
                            @on-click="handleIconClick">
                        </Icon>
                    </slot>
                </div>
            </transition>
            <Icon
                v-if="clearable && currentValue"
                size
                type="shibai-mian"
                :class="[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-suffix`,
                prefixCls+`-icon-clear`]"
                @on-click="handleClear">
            </Icon>
            <label
                ref="label"
                :class="labelClasses"
                :style='labelStyles'
                v-if="label || $slots.label">
                <slot name="label">{{label}}</slot>
            </label>
            <input
                :id="elementId"
                :class="inputClasses"
                :spellcheck="spellcheck"
                ref="input"
                :value="currentValue"
                :name="name"
                :style='inputStyles'
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="maxlength"
                :minlength="minlength"
                :readonly="readonly"
                :autofocus="autofocus"
                :type="type"
                :autocomplete="autocomplete"
                @change="handleChange"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @keyup="handleKeyup"
                @keydown="handleKeydown"/>
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
            :type="type"
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
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            validator (value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email'])
            },
            default: 'text'
        },
        placeholder: {
            type: String,
            default: '请输入...'
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
        // icon属性
        icon: {
            type: String,
            default: ''
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
            props: ['disabled', 'readonly', 'autofocus', 'spellcheck', 'error', 'clearable', 'fixed', 'prefix', 'suffix'],
            config: {
                type: Boolean,
                default: false
            }
        })
    },
    data () {
        return {
            currentValue: this.value,
            prefixCls: prefixCls,
            textareaStyles: {},
            labelFocus: false
        }
    },
    computed: {
        boxClasses () {
            return [
                `${prefixCls}-box`,
                `${prefixCls}-box-${this.size}`,
                {
                    [`${prefixCls}-error`]: this.error,
                    [`${prefixCls}-box-clear`]: this.clearable && this.currentValue,
                    [`${prefixCls}-group`]: this.label && this.fixed,
                    'focus': this.label && this.labelFocus && this.fixed
                }
            ]
        },
        inputClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-prefix`]: this.prefix,
                    [`${prefixCls}-suffix`]: this.suffix,
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
                `${prefixCls}`
            ]
        },
        labelStyles () {
            const {label, fixed, labelWidth} = this
            let style = {}
            if (label && !fixed && labelWidth) {
                style = {
                    width: labelWidth && `${labelWidth}px`
                }
            }
            return style
        },
        // 整体的input的宽度
        inputBoxStyles () {
            const {label, fixed, width} = this
            let style = {}
            if (!label || (label && width && fixed)) {
                style.width = `${width}px`
            }
            return style
        },
        // label的时候 fixed为false  input的宽度
        inputStyles () {
            const { label, fixed } = this
            let style = {}
            if (label && this.width && !fixed) {
                style.width = `${this.width}px`
            }
            return style
        }
    },
    methods: {
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
            this.$emit('on-click', e)
        },
        handleClear () {
            const e = { target: { value: '' } }
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
    },
    mounted () {
        this.resizeTextarea()
    }
}

</script>

<style lang="scss">

</style>
