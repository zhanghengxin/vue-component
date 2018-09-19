<template>
    <span>
        <a
          v-if="to"
          :href="linkUrl"
          :target="target"
          :class="linkClasses"
          @click.exact="handleCheckClick($event, false)"
          @click.ctrl="handleCheckClick($event, true)"
          @click.meta="handleCheckClick($event, true)">
            <slot></slot>
        </a>
        <span v-else :class="linkClasses">
            <slot></slot>
        </span>
        <span :class="separatorClasses" v-html="separator" v-if="!showSeparator"></span>
        <span :class="separatorClasses" v-else>
            <slot name="separator"></slot>
        </span>
    </span>
</template>
<script>
const prefixCls = 'breadcrumb-item'
export default {
    name: 'BreadcrumbItem',
    props: {
    },
    data () {
        return {
            separator: '',
            showSeparator: false
        }
    },
    computed: {
        linkClasses () {
            return `${prefixCls}-link`
        },
        separatorClasses () {
            return `${prefixCls}-separator`
        }
    },
    mounted () {
        this.showSeparator = this.$slots.separator !== undefined
    },
    methods: {
        handleClick (newWindow = false) {
            if (newWindow) {
                window.open(this.to)
            } else {
                const isRoute = this.$router
                if (isRoute) {
                    this.replace ? this.$router.replace(this.to) : this.$router.push(this.to)
                } else {
                    window.location.href = this.to
                }
            }
        },
        handleCheckClick (event, newWindow = false) {
            if (this.to) {
                if (this.target === '_blank') {
                    return false
                } else {
                    event.preventDefault()
                    this.handleClick(newWindow)
                }
            }
        }
    }
}
</script>
