/**
 * input 组件
 * @author ganbowen
 * @created 2018/09/18 20:05:54
 */
<template>
    <div :class="boxClasses" :style='inputStyles'>
        <template v-if="type !== 'textarea'">
            <div
                v-if="prefix"
                :class='[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-prefix`]'>
                <slot name='prefix'>
                    <b-icon
                        size
                        :type="icon"
                        @on-click="handleIconClick">
                    </b-icon>
                </slot>
            </div>
            <div
                v-if="suffix"
                :class='[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-suffix`]'>
                <slot name='suffix'>
                    <b-icon
                        size
                        :type="icon"
                        :class="[prefixCls+`-noclear`]"
                        @on-click="handleIconClick">
                    </b-icon>
                </slot>
            </div>
            <b-icon
                v-if="clearable && currentValue"
                size
                type="shibai-mian"
                :class="[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-suffix`,
                prefixCls+`-icon-clear`]"
                @on-click="handleClear">
            </b-icon>
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
import { prefix, oneOf } from '../../utils/common'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'input' // b-input

export default {
    name: prefixCls,
    mixins: [Emitter],
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
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        maxlength: {
            type: Number
        },
        minlength: {
            type: Number
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        spellcheck: {
            type: Boolean,
            default: false
        },
        autocomplete: {
            type: String,
            default: 'off',
            validator (value) {
                return oneOf(value, ['off', 'on'])
            }
        },
        width: {
            type: [String, Number]
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
        error: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        label: {
            type: String
        },
        // 定长包裹着input的样式 true input前只有文字的样式 false
        fixed: {
            type: Boolean,
            default: false
        },
        labelWidth: {
            type: Number,
            default: 36
        },
        // icon属性
        icon: {
            type: String,
            default: ''
        },
        prefix: {
            type: Boolean,
            default: false
        },
        suffix: {
            type: Boolean,
            default: false
        },
        // textarea
        rows: {
            type: Number,
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
        }
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
            return [
                {
                    [`width: ${this.labelWidth}px`]: !this.fixed
                }
            ]
        },
        inputStyles () {
            let style = {}
            if (this.width) {
                style.width = `${this.width}px`
            }
            return style
        }
    },
    methods: {
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
