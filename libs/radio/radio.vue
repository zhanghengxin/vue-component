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
export default {
    name: 'b-radio',
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
                    wrapClasses = 'radio-wrapper radio-wrapper-disabled radio-wrapper-checked'
                } else {
                    wrapClasses = 'radio-wrapper radio-wrapper-disabled'
                }
            } else {
                if (this.checkedValue) {
                    wrapClasses = 'radio-wrapper radio-wrapper-checked'
                } else {
                    wrapClasses = 'radio-wrapper'
                }
            }
            return wrapClasses
        },
        radioClasses () {
            let radioClasses = ''
            if (this.disabled) {
                if (this.checkedValue) {
                    // 已选失效项
                    radioClasses = 'radio radio-disabled radio-checked'
                } else {
                    // 未选中
                    radioClasses = 'radio radio-disabled'
                }
            } else {
                if (this.checkedValue) {
                    //  选中项
                    radioClasses = 'radio radio-checked'
                } else {
                    // 未选失效项
                    radioClasses = 'radio'
                }
            }
            return radioClasses
        },
        innerClasses () {
            let innerClasses = ''
            innerClasses = 'radio-inner'
            return innerClasses
        },
        inputClasse () {
            let inputRadio = 'radio-input'
            return inputRadio
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
