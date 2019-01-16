<template>
    <ul :class='[prefixCls]'><slot></slot></ul>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'dropdown-menu'
export default {
    name: prefixCls,
    data () {
        return {
            prefixCls
        }
    }
}
</script>
