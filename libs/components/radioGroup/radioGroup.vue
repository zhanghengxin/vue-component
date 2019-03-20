<template>
    <div :class="radioGroupClass">
        <slot></slot>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'radio-group'
export default {
    name: prefixCls,
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        }
    },
    computed: {
        radioGroupClass () {
            return [
                {
                    [`${prefixCls}-button`]: this.type,
                    [`${prefixCls}-${this.size}`]: this.size
                }
            ]
        }
    },
    mounted () {
        this.defaultChange()
    },
    watch: {
        value: {
            handler () {
                this.defaultChange()
            },
            deep: true
        }
    },
    methods: {
        defaultChange () {
            let arr = this.$children
            arr.map((item) => {
                if (this.value === item.label) {
                    item.checkedValue = true
                } else {
                    item.checkedValue = false
                }
            })
        },
        change (label) {
            this.$emit('input', label)
            this.$emit('on-click', label)
            this.$emit('on-change', label)
        }
    }
}
</script>
