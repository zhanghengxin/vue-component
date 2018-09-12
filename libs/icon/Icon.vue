<template>
    <i
            class="b-icon icon iconfont"
            :class="typeClass"
            :style="styles"
            @click="handleClick">
    </i>
</template>
<script>

export default {
    name: 'b-icon',
    props: {
        type: {
            type: String,
            default: ''
        },
        size: {
            type: [Number, String],
            default: 12
        },
        color: String
    },
    computed: {
        typeClass () {
            return [
                {
                    [`bw-${this.type}`]: this.type !== ''
                }
            ]
        },
        styles () {
            let style = {}
            if (this.size) {
                style['font-size'] = `${this.size}px`
            }
            if (this.color) {
                style.color = this.color
            }
            return style
        }
    },
    methods: {
        handleClick (event) {
            this.$emit('on-click', event)
        }
    }
}
</script>
