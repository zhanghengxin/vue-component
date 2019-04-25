<template>
    <div :class="prefixCls">
        <Button
            type="primary"
            size="small"
            icon="zuo"
            :disabled="!rightActive"
            @click.native="moveToLeft">
            {{ operations[0] }}
        </Button>
        <Button
            type="primary"
            size="small"
            icon="you"
            :disabled="!leftActive"
            @click.native="moveToRight">
            {{ operations[1] }}
        </Button>
    </div>
</template>
<script>
import Button from '../button/Button'
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}transfer-operation`

export default {
    name: prefixCls,
    components: { Button },
    props: {
        operations: Array,
        leftActive: Boolean,
        rightActive: Boolean
    },
    data () {
        return {
            prefixCls
        }
    },
    methods: {
        moveToLeft () {
            this.$parent.moveTo('left')
        },
        moveToRight () {
            this.$parent.moveTo('right')
        }
    }
}
</script>
