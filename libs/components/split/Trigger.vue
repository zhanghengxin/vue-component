<template>
    <div :class="wrapperCls">
        <div :class="contentCls">
            <i
                :class="barCls"
                v-once
                v-for="i in 8"
                :key="`trigger-${i}`">
            </i>
        </div>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}split-trigger`

export default {
    name: prefixCls,
    props: {
        mode: String
    },
    data () {
        return {
            initOffset: 0
        }
    },
    computed: {
        isVertical () {
            return this.mode === 'vertical'
        },
        wrapperCls () {
            return [
                prefixCls,
                this.isVertical ? `${prefixCls}-vertical` : `${prefixCls}-horizontal`
            ]
        },
        contentCls () {
            return [
                `${prefixCls}-bar-con`,
                this.isVertical ? 'vertical' : 'horizontal'
            ]
        },
        barCls () {
            return `${prefixCls}-bar`
        }
    }
}
</script>
