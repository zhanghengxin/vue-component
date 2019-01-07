<template>
    <div :class="prefixCls">
        <slot></slot>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'breadcrumb'
export default {
    name: prefixCls,
    props: {
        separator: {
            type: String,
            default: '/'
        }
    },
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    // computed: {
    //     classes () {
    //         return `${prefixCls}`
    //     }
    // },
    mounted () {
        this.updateChildren()
    },
    updated () {
        this.$nextTick(() => {
            this.updateChildren()
        })
    },
    methods: {
        updateChildren () {
            this.$children.forEach((child, index) => {
                if (index !== this.$children.length - 1) child.separator = this.separator
            })
        }
    },
    watch: {
        separator () {
            this.updateChildren()
        }
    }
}
</script>
