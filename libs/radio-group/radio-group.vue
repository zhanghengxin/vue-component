<template>
    <div :class="radioGroupClass" :value='value'>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'b-radio-group',
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    computed: {
        radioGroupClass () {
            let radioGroupClass = ''
            if (this.type) {
                radioGroupClass = 'radio-group-button'
                return radioGroupClass
            }
        }
    },
    methods: {
    }
}
</script>
