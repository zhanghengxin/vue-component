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
    data () {
        return {
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
    methods: {
        defaultChange () {
            let arr = this.$children
            arr.map((item) => {
                if (this.value === item.label) {
                    item.checkedValue = true
                }
            })
        },
        change (label) {
            this.$emit('input', label)
            this.$emit('on-change', label)
        }
    }
}
</script>
