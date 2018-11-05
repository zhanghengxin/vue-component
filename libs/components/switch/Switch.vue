<template>
    <span
            :class="switchClass"
            @click="toggle"
            @keydown.space="toggle"
    >
        <input type="hidden" :value="currentValue">
        <span :class="innerClasses">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>

<script>
import {oneOf} from '../../utils/common.js'
const prefixCls = 'b-switch'
export default {
    name: 'BSwitch',
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
        }
    },
    computed: {
        switchClass () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-${this.size}`]: !!this.size
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
            if (this.disabled) {
                return false
            }
            const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue
            this.currentValue = checked
            this.$emit('on-change', checked)
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
