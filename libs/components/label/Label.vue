/**
 * label组件
 * @author ganbowen
 * @created 2018/10/25 10:46:17
 */
<template>
    <div
        :type='type'
        :class="labelClasses">
        <solt></solt>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'label'

export default {
    name: prefixCls,
    props: {
        type: {
            type: String,
            default: 'input'
        }
    },
    computed: {
        labelClasses () {
            return [
                prefixCls,
                prefixCls + this.type
            ]
        }
    },
    mounted: {}
}
</script>
