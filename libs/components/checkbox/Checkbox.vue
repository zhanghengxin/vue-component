<template>
    <label class="b-checkbox">
        <span :class="checkbboxLeftClass">
            <input
                class="b-checkbox-input"
                type="checkbox"
                :value="value"
                :checked="checked"
                @change="change"/>
        </span>
        <span class="b-checkbox-right">
            <slot>
                <span v-if="!showSlot">{{label}}</span>
            </slot>
        </span>
    </label>
</template>

<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'checkbox'
export default {
    name: prefixCls,
    data () {
        return {
            checked: this.value,
            showSlot: true
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
        label: {
            type: String,
            default: ''
        }
    },
    computed: {
        checkbboxLeftClass: function () {
            return [
                `${prefixCls}-left`,
                {
                    [`${prefixCls}-checked`]: this.checked,
                    [`${prefixCls}-disabled`]: this.disabled
                }
            ]
        }
    },
    mounted () {
        this.showSlot = this.$slots.default !== undefined
    },
    methods: {
        change (e) {
            if (this.disabled) return
            this.checked = e.target.checked
            if (this.$parent.$options.name === prefix + 'checkboxGroup') {
                this.$parent.change(this.label, this.checked)
                return
            }
            this.$emit('input', this.checked)
            this.$emit('on-change', this.checked)
        }
    }
}
</script>
