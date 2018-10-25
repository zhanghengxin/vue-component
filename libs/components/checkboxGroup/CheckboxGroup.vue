<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'CheckboxGroup',
    data () {
        return {
        }
    },
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    computed: {

    },
    mounted () {
        this.$children.map((item) => {
            this.value.map((valueItem) => {
                if (item.label === valueItem) {
                    item.checked = true
                }
            })
        })
    },
    methods: {
        change (label, checked) {
            let value = this.value
            let index = this.value.indexOf(label)
            if (index < 0) {
                value.push(label)
            } else {
                value.splice(index, 1)
            }
            this.$emit('input', value)
            this.$emit('on-change', value)
        }
    }
}
</script>
