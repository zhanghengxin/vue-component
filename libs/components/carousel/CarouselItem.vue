<template>
    <div :class="prefixCls" :style="styles">
        <slot></slot>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}carousel-item`

export default {
    componentName: prefixCls,
    name: prefixCls,
    data () {
        return {
            prefixCls: prefixCls,
            width: 0,
            height: 'auto',
            left: 0
        }
    },
    computed: {
        styles () {
            return {
                width: `${this.width}px`,
                height: `${this.height}`,
                left: `${this.left}px`
            }
        }
    },
    mounted () {
        this.$parent.slotChange()
    },
    watch: {
        width (val) {
            if (val && this.$parent.loop) {
                this.$parent.initCopyTrackDom()
            }
        },
        height (val) {
            if (val && this.$parent.loop) {
                this.$parent.initCopyTrackDom()
            }
        }
    },
    beforeDestroy () {
        this.$parent.slotChange()
    }
}
</script>
