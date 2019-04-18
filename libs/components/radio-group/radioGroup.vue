<template>
    <div :class="classes" :name="name">
        <slot></slot>
    </div>
</template>
<script>

import { findComponentsDownward } from '../../utils/assist'
import { prefix, oneOf } from '../../utils/common'
import Emitter from '../../mixins/emitter'
const prefixCls = prefix + 'radio-group'
const radioPrefixCls = prefix + 'radio'

let seed = 0
const now = Date.now()
const getUuid = () => `${now}_${seed++}`

export default {
    name: prefixCls,
    mixins: [ Emitter ],
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        size: {
            validator (value) {
                return oneOf(value, ['small', 'large', 'default'])
            },
            default: 'default'
        },
        type: {
            type: Boolean,
            default: true
        },
        vertical: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: getUuid
        }
    },
    data () {
        return {
            currentValue: this.value,
            childrens: []
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${radioPrefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-button`]: !this.type,
                    [`${prefixCls}-vertical`]: this.vertical
                }
            ]
        }
    },
    mounted () {
        this.updateValue()
    },
    methods: {
        updateValue () {
            this.childrens = findComponentsDownward(this, radioPrefixCls)
            if (this.childrens) {
                this.childrens.forEach(child => {
                    child.currentValue = this.currentValue === child.label
                    child.group = true
                })
            }
        },
        change (data) {
            this.currentValue = data.value
            this.updateValue()
            this.$emit('input', data.value)
            this.$emit('on-change', data.value)
            this.dispatch('FormItem', 'on-form-change', data.value)
        }
    },
    watch: {
        value () {
            if (this.currentValue !== this.value) {
                this.currentValue = this.value
                this.$nextTick(() => {
                    this.updateValue()
                })
            }
        }
    }
}
</script>
