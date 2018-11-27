
<template>
    <div class="pane" v-show="show">
      <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabPanel',
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
