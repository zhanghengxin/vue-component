<template>
    <div :class="prefixCls">
        <b-button
            type="primary"
            size="small"
            icon="zuo"
            :disabled="!rightActive"
            @click.native="moveToLeft">
            {{ operations[0] }}
        </b-button>
        <b-button
            type="primary"
            size="small"
            icon="you"
            :disabled="!leftActive"
            @click.native="moveToRight">
            {{ operations[1] }}
        </b-button>
    </div>
</template>
<script>
import bButton from '../button/Button'
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}transfer-operation`

export default {
    name: prefixCls,
    components: { bButton },
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
