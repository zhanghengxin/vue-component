/**
* 示例组件，实际效果请负责的同学更改
* Created by gaoguoqing on 2018/9/5.
*
*/
<template>
    <button type="button"
            class="b-btn"
            :class='[typeClass,sizeClass]'
            @click="handleClick">
        <span>
            <slot>按钮</slot>
        </span>
    </button>
</template>

<script>
import { oneOf } from '../utils/common'

export default {
    name: 'b-button',
    methods: {
        handleClick (event) {
            this.$emit('on-click', event)
        }
    },
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['info', 'white'])
            },
            default: 'info'
        },
        size: {
            validator (value) {
                return oneOf(value, ['normal', 'small'])
            },
            default: 'normal'
        }
    },
    computed: {
        typeClass () {
            return {
                'b-btn-info': this.type === 'info',
                'b-btn-white': this.type === 'white'
            }
        },
        sizeClass () {
            return {
                'b-btn-small': this.size === 'small',
                'b-btn-normal': this.size === 'normal'
            }
        }
    }
}
</script>
