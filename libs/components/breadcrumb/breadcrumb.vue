<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
const prefixCls = 'bw-breadcrumb'
export default {
    name: 'Breadcrumb',
    props: {
        separator: {
            type: String,
            default: '/'
        }
    },
    computed: {
        classes () {
            return `${prefixCls}`
        }
    },
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
                if (index !== this.$children.length - 1) {
                    child.separator = this.separator
                }
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
