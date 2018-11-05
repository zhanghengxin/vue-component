/**
 * input 组件
 * @author ganbowen
 * @created 2018/09/18 20:05:54
 */
<template>
    <div :class="boxClasses">
        <template v-if="type !== 'textarea'">
            <b-icon
                v-if="prefix"
                size
                :type="icon"
                :class="[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-prefix`]"
                @click="handleIconClick">
            </b-icon>
            <b-icon
                v-if="suffix"
                size
                :type="icon"
                :class="[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-suffix`]"
                @click="handleIconClick">
            </b-icon>
            <b-icon
                v-if="clearable && currentValue"
                size
                type="yidongduan_conclose"
                :class="[
                prefixCls+`-icon`,
                prefixCls+`-icon-`+size,
                prefixCls+`-icon-suffix`,
                prefixCls+`-icon-clear`]"
                @click="handleClear">
            </b-icon>
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
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'input'

export default {
    name: prefixCls,
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
                return ['text', 'textarea', 'password', 'url', 'email'].indexOf(value) !== -1
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
        // 样式属性
        size: {
            default: 'normal',
            validator: function (value) {
                return ['large', 'small', 'normal'].indexOf(value) !== -1
            }
        },
        error: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
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
            textareaStyles: {}
        }
    },
    computed: {
        boxClasses () {
            return [
                `${prefixCls}-box`,
                {
                    [`${prefixCls}-error`]: this.error
                }
            ]
        },
        inputClasses () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.size}`,
                {
                    [`${prefixCls}-prefix`]: this.prefix,
                    [`${prefixCls}-suffix`]: this.suffix
                }
            ]
        },
        textareaClasses () {
            return [
                `${prefixCls}`
            ]
        }
    },
    methods: {
        handleChange (event) {
            this.$emit('on-change', event)
        },
        handleFocus (event) {
            this.$emit('on-focus', event)
        },
        handleBlur (event) {
            this.$emit('on-blur', event)
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
        },
        focus () {
            if (this.type === 'textarea') {
                this.$refs.textarea.focus()
            } else {
                this.$refs.input.focus()
            }
        },
        blur () {
            if (this.type === 'textarea') {
                this.$refs.textarea.blur()
            } else {
                this.$refs.input.blur()
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
