<template>
    <span
        tabindex="0"
        :class="switchClass"
        @click="toggle"
        @keydown.space="toggle">
        <input type="hidden" :name="name" :value="currentValue">
        <span :class="innerClasses">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>

<script>
import { oneOf, prefix } from '../../utils/common.js'
import Emitter from '../../mixins/emitter'

const prefixCls = `${prefix}switch`

export default {
    name: prefixCls,
    mixins: [ Emitter ],
    data () {
        return {
            currentValue: this.value
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        trueValue: {
            type: Boolean,
            default: true
        },
        falseValue: {
            type: Boolean,
            default: false
        },
        size: {
            validator (value) {
                return oneOf(value, ['large', 'small', 'default'])
            }
        },
        name: String,
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        switchClass () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-loading`]: this.loading
                }
            ]
        },
        innerClasses () {
            return `${prefixCls}-inner`
        }
    },
    methods: {
        toggle (event) {
            event.preventDefault()
            if (this.disabled || this.loading) {
                return false
            }
            this.$emit('on-click', this.currentValue)
            const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue
            this.currentValue = checked
            this.$emit('input', checked)
            this.$emit('on-change', checked)
            this.dispatch('FormItem', 'on-form-change', checked)
        }
    },
    watch: {
        value (val) {
            if (val !== this.trueValue && val !== this.falseValue) {
                throw 'Value should be trueValue or falseValue.' // eslint-disable-line
            }
            this.currentValue = val
        }
    }
}
</script>
