<template>
    <div v-if="show">
        <slot> </slot>
    </div>
</template>

<script>
import { TABPANEL } from './common'

const prefixCls = TABPANEL
export default {
    name: prefixCls,
    data () {
        return {
            show: false,
            ifDestory: false,
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
