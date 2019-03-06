/**
 *
 * @author ganbowen
 * description inputNumber
 * @created 2019/01/28 15:52:54
 *
 */
<template>
    <b-input
        ref='input'
        :value="currentValue"
        :label="label"
        :labelWidth='labelWidth'
        :fixed="fixed"
        :class="[prefixCls]"
        :disabled="disabled"
        :readonly="readonly"
        :size="size"
        :inputNumber="operationShow || !type"
        :suffix="!disabled"
        :prefix="!disabled && !type && !label"
        @on-change="handleChange"
        @on-blur="handleBlur"
        @on-focus="handleFocus"
        @on-mouseenter="operationShow = true"
        @on-mouseleave="operationShow = false"
        >
        <template v-if='!disabled && type' slot='suffix'>
            <span @click="up" :class='[prefixCls+`-up`,prefixCls+`-up-border`]'><Icon type='shang'></Icon></span>
            <span @click="down" :class='[prefixCls+`-down`]'><Icon type='xia'></Icon></span>
        </template>
        <template v-if='!disabled && !type'>
            <template slot='prefix'>
                <span @click="up" :class='[prefixCls+`-up`,prefixCls+`-icon`]'>+</span>
            </template>
            <template slot='suffix'>
                <span @click="down" :class='[prefixCls+`-down`,prefixCls+`-icon`]'>-</span>
            </template>
        </template>
    </b-input>
</template>

<script>
import { prefix } from '../../utils/common'
import { add } from './utlis.js'
import bInput from '../input'
import Icon from '../icon'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'input-number'
export default {
    name: prefixCls,
    mixins: [ Emitter ],
    components: { bInput, Icon },
    props: {
        step: {
            type: Number,
            default: 1
        },
        value: {},
        label: {
            type: [String, Number],
            default: ''
        },
        labelWidth: {
            type: Number,
            default: 36
        },
        fixed: {
            type: Boolean,
            default: false
        },
        type: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: [String, Number],
            default: ''
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        precision: {
            type: Number
        },
        size: {
            validator: function (value) {
                return ['large', 'small', 'default'].indexOf(value) !== -1
            },
            default () {
                return !this.size || this.size === '' ? 'default' : this.size
            }
        }
    },
    data () {
        return {
            prefixCls,
            currentValue: 0,
            operationShow: false
        }
    },
    created () {
        this.setCurrentValue(this.value)
    },
    methods: {
        up () {
            const { step, currentValue, max, min } = this
            let current = add(currentValue, step)
            if (current > max) current = max
            if (current < min) current = min
            this.setCurrentValue(current)
        },
        down () {
            const { step, currentValue, max, min } = this
            let current = add(currentValue, -step)
            if (current > max) current = max
            if (current < min) current = min
            this.setCurrentValue(current)
        },
        toPrecision (num, precision) {
            if (precision === undefined) precision = this.numPrecision
            return parseFloat(Number(num)).toFixed(precision)
        },
        setCurrentValue (newVal) {
            const oldVal = this.currentValue
            if (newVal >= this.max) newVal = this.max
            if (newVal <= this.min) newVal = this.min
            if (oldVal === newVal) {
                this.$refs.input.setCurrentValue(this.currentValue)
                return
            }
            if (typeof newVal === 'number' && this.precision !== undefined) {
                newVal = this.toPrecision(newVal, this.precision)
            }
            this.$emit('input', newVal)
            this.$emit('on-change', newVal)
            this.currentValue = newVal
        },
        handleBlur (event) {
            this.$emit('blur', event)
            this.$refs.input.setCurrentValue(this.currentValue)
        },
        handleFocus (event) {
            this.$emit('focus', event)
        },
        handleChange (e) {
            let value = e.target.value
            const newVal = value === '' ? undefined : Number(value)
            if (!isNaN(newVal) || value === '') {
                this.setCurrentValue(newVal)
            }
        }
    },
    watch: {
        currentValue (val) {
            this.$emit('input', val)
        },
        value (val) {
            this.setCurrentValue(val)
        }
    }
}
</script>

<style lang="scss">
</style>
