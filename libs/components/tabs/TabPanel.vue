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
            show: true
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
        }
    },
    watch: {
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
    }
}
</script>

<style scoped>

</style>
