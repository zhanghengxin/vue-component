<template>
    <li
        :class="classes"
        @click.stop="selectFn"
        @touchend.stop="selectFn"
        @mousedown.prevent
        @touchstart.prevent
    >
        <slot>{{ labelText }}
            <Icon type='queding' v-if='showSelected'/>
        </slot>
    </li>
</template>
<script>
import Emitter from '../../mixins/emitter'
import { prefix } from '../../utils/common'
import Icon from '../icon'

const prefixCls = prefix + 'option'

export default {
    name: prefixCls,
    mixins: [Emitter],
    components: {Icon},
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        label: {
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
        labelText () {
            return (this.label) ? this.label : this.value
        },
        optionLabel () {
            return this.label || (this.$el && this.$el.textContent)
        },
        selected () {
            if (!this.multiple) { // 非多选
                return this.value === this.publicValue
            } else { // 多选
                return this.publicValue && this.publicValue.indexOf(this.value) > -1
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
                value: this.value,
                label: this.optionLabel
            })
            this.$emit('on-select-selected', {
                value: this.value,
                label: this.optionLabel
            })
        }
    }
}
</script>
