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
            let wrapClasses = ''
            if (this.disabled) {
                if (this.checkedValue) {
                    wrapClasses = `${prefixCls}-wrapper` + ` ${prefixCls}-wrapper-disabled` + ` ${prefixCls}-wrapper-checked`
                } else {
                    wrapClasses = `${prefixCls}-wrapper` + ` ${prefixCls}-wrapper-disabled`
                }
            } else {
                if (this.checkedValue) {
                    wrapClasses = `${prefixCls}-wrapper` + ` ${prefixCls}-wrapper-checked`
                } else {
                    wrapClasses = `${prefixCls}-wrapper`
                }
            }
            return wrapClasses
        },
        radioClasses () {
            return [
                `prefixCls`,
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
            for (let index = 0; index < arr.length; index++) {
                arr[index].checkedValue = false
            }
            let checked = event.target.checked
            this.checkedValue = checked
        }
    },
    mounted () {
    }
}
</script>
