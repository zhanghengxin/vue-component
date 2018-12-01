
<template>
    <div  v-show="show">
      <slot></slot>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'tabsPanel'
export default {
    name: prefixCls,
    data () {
        return {
            show: true,
            currentName: this.name
        }
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        },
        closable: {
            type: Boolean,
            default: null
        }
    },
    watch: {
        name (val) {
            this.currentName = val
            this.updateNav()
        },
        label () {
            this.updateNav()
        },
        disabled () {
            this.updateNav()
        },
        icon () {
            this.updateNav()
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav()
        }
    },
    mounted () {
        this.updateNav()
    },
    destroyed () {
        this.updateNav()
    }
}
</script>

<style scoped>

</style>
