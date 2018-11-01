<template>
    <div :class="radioGroupClass" :value='value'>
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
        }
    },
    data () {
        return {
        }
    },
    computed: {
        radioGroupClass () {
            let radioGroupClass = ''
            if (this.type) {
                radioGroupClass = `${prefixCls}-button`
                return radioGroupClass
            }
        }
    },
    methods: {
    }
}
</script>
