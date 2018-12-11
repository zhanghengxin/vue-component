<template>
  <label :class="wrapClasses">
            <span :class="radioClasses">
                <span :class="innerClasses"></span>
                <input
                  type="radio"
                  :disabled='disabled'
                  :checked='checkedValue'
                  :class="inputClasse"
                  @change="change">
            </span>
    <slot>{{ label }}</slot>
  </label>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'radio'
export default {
    name: prefixCls,
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            checkedValue: this.value
        }
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}-wrapper`,
                {
                    [` ${prefixCls}-wrapper-disabled`]: this.disabled,
                    [` ${prefixCls}-wrapper-checked`]: this.checkedValue
                }
            ]
        },
        radioClasses () {
            return [
                {
                    [` ${prefixCls}-disabled`]: this.disabled,
                    [` ${prefixCls}-checked`]: this.checkedValue
                }
            ]
        },
        innerClasses () {
            return `${prefixCls}-inner`
        },
        inputClasse () {
            return `${prefixCls}-input`
        }

    },
    methods: {
        change (event) {
            let arr = this.$parent.$children
            arr.map((item) => {
                item.checkedValue = false
            })
            let checked = event.target.checked
            this.checkedValue = checked
            if (this.checkedValue) {
                this.$parent.change(this.label)
            }
            this.$emit('input', this.checkedValue)
            this.$emit('on-change', this.checkedValue)
        }
    },
    mounted () {
    }
}
</script>
