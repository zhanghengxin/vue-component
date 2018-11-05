<template>
    <li
        :class="{
            'b-dropdown-item-disabled': disabled,
            'b-dropdown-item-divided': divided,
            'b-dropdown-item': true
        }"
        @click="handleClick">
        <slot></slot>
    </li>
</template>

<script>
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/utils'
export default {
    name: 'BDropdownItem',
    mixins: [Emitter],
    props: {
        command: {
            type: [String, Object, Number],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        divided: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick (e) {
            const $parent = findComponentUpward(this, 'b-dropdown')
            const hasChildren = this.$parent && this.$parent.$options._componentTag === 'b-dropdown'
            if (hasChildren) {
                this.$parent.$emit('on-haschild-click')
            } else {
                if ($parent && $parent.$options._componentTag === 'b-dropdown') {
                    $parent.$emit('on-hover-click')
                }
            }
            this.dispatch('b-dropdown', 'menu-item-click', [this.command, this])
        }
    }
}
</script>

<style>

</style>
