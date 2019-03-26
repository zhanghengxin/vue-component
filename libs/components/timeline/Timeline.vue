<template>
    <ul :class="wrapperCls">
        <slot></slot>
    </ul>
</template>
<script>
import { prefix } from '../../utils/common'

const prefixCls = `${prefix}timeline`

export default {
    name: prefixCls,
    props: {
        pending: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-pending`]: this.pending
                }
            ]
        }
    }
}
</script>
