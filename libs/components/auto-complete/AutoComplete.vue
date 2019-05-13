<template>
    <Select
        :width='width'
        ref="select"
        :label="label"
        :disabled="disabled"
        :clearable="clearable"
        :className='prefixCls'
        :placeholder="placeholder"
        :size="size"
        :placement="placement"
        :value="currentValue"
        filterabled
        auto-complete
        :remoteFn="remoteMethod"
        @on-change="handleChange"
        @on-clear='handleClear'
        @on-focus='handleFocus'
        @on-blur='handleBlur'
        :transfer="transfer">
        <slot>
            <Option v-for="item in filteredData" :value="item" :key="item">{{ item }}</Option>
        </slot>
    </Select>
</template>
<script>
    import Select from '../select/Select.vue'
    import Option from '../select/Option.vue'
    import Emitter from '../../mixins/emitter'
    import { prefix, oneOf } from '../../utils/common'

    const prefixCls = prefix + 'auto-complete' // 防止与别人发生冲突
    export default {
        name: prefixCls,
        mixins: [ Emitter ],
        components: { Select, Option },
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            label: {
                type: [String, Number],
                default: ''
            },
            data: {
                type: Array,
                default: () => []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default'])
                },
                default: 'default'
            },
            icon: {
                type: String
            },
            filterMethod: {
                type: [Function, Boolean],
                default: false
            },
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'bottom'])
                },
                default: 'bottom'
            },
            transfer: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            elementId: {
                type: String
            },
            width: {
                type: [String, Number]
            }
        },
        data () {
            return {
                prefixCls,
                currentValue: this.value,
                disableEmitChange: false // for Form reset
            }
        },
        computed: {
            filteredData () {
                if (this.filterMethod) {
                    return this.data.filter(item => this.filterMethod(this.currentValue, item))
                } else {
                    return this.data
                }
            }
        },
        watch: {
            value (val) {
                if (this.currentValue !== val) {
                    this.disableEmitChange = true
                }
                this.currentValue = val
            },
            currentValue (val) {
                this.$emit('input', val)
                if (this.disableEmitChange) {
                    this.disableEmitChange = false
                    return
                }
                this.$emit('on-change', val)
                this.dispatch('b-form-item', 'on-form-change', val)
            }
        },
        methods: {
            remoteMethod (query) {
                this.currentValue = query
                if (query !== '') { this.$emit('on-search', query) }
            },
            handleChange (val) {
                if (val === undefined || val === null) return
                this.currentValue = val
                this.$emit('on-select', val)
            },
            handleFocus (event) {
                this.$emit('on-focus', event)
            },
            handleBlur (event) {
                this.$emit('on-blur', event)
            },
            handleClear () {
                if (!this.clearable) return
                this.currentValue = ''
                this.$emit('on-clear')
            }
        }
    }
</script>
