<template>
    <li
        :class="classes"
        @click.stop="selectFn"
        @touchend.stop="selectFn"
        @mousedown.prevent
        @touchstart.prevent
    >
        <slot>{{ label }}
            <b-icon type='queding' v-if='showSelected'/>
        </slot>
    </li>
</template>
<script>
import Emitter from '../../mixins/emitter'
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'option'

export default {
    name: prefixCls,
    mixins: [Emitter],
    props: {
        code: {
            type: [String, Number],
            required: true
        },
        name: {
            type: [String, Number]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isFocused: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        publicValue: {
            type: [String, Number, Array]
        }
    },
    data () {
        return {
            autoComplete: false
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-selected`]: this.selected && !this.multiple,
                    [`${prefixCls}-selected-multiple`]: this.selected && this.multiple,
                    [`${prefixCls}-focus`]: this.isFocused
                }
            ]
        },
        label () {
            return (this.name) ? this.name : this.code
        },
        optionLabel () {
            return this.name || (this.$el && this.$el.textContent)
        },
        selected () {
            if (!this.multiple) { // 非多选
                return this.code === this.publicValue
            } else { // 多选
                return this.publicValue && this.publicValue.indexOf(this.code) > -1
            }
        },
        showSelected () {
            return this.multiple && this.selected
        }
    },
    methods: {
        selectFn (e) {
            if (this.disabled) return false
            this.dispatch(`${prefix}select`, 'on-select-selected', {
                code: this.code,
                name: this.optionLabel
            })
            this.$emit('on-select-selected', {
                code: this.code,
                name: this.optionLabel
            })
        }
    }
}
</script>
