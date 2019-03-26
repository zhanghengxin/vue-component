<template>
    <li :class="classes" @click="handleClick"><slot></slot></li>
</template>
<script>
import { findComponentUpward } from '../../utils/assist'
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'dropdown-item'
export default {
    name: prefixCls,
    props: {
        name: {
            type: [String, Number]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        },
        divided: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-selected`]: this.selected,
                    [`${prefixCls}-divided`]: this.divided
                }
            ]
        }
    },
    methods: {
        handleClick () {
            const $parent = findComponentUpward(this, `${prefix}dropdown`)
            const hasChildren = this.$parent && this.$parent.$options.name === `${prefix}dropdown`

            if (this.disabled) {
                this.$nextTick(() => {
                    $parent.currentShow = true
                })
            } else if (hasChildren) {
                this.$parent.$emit('on-haschild-click')
            } else {
                if ($parent && $parent.$options.name === `${prefix}dropdown`) {
                    $parent.$emit('on-hover-click')
                }
            }
            $parent.$emit('on-click', this.name)
        }
    }
}
</script>
