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

const prefixCls = 'b-label'

export default {
    name: 'b-label',
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
