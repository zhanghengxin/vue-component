/**
* input 组件
* author ganbowen
* created 2018/09/18 20:05:54
*/
<template>
    <div class='b-input-box' :class="{'b-input-group':labelText,'b-input-error':error}">
        <div v-if="labelText" class="b-input-label">{{labelText}}</div>
        <i class="b-icon" :class="['']" v-if="false" @click="handleClear"></i>
        <i class="b-icon" :class="['']" v-else-if="false" @click="handleIconClick"></i>
        <i class="b-icon" :class="['']" v-else-if="false" @click="handleSearch"></i>
        <input
            class="b-input"
            :class="['b-input-'+size]"
            :value="currentValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :minlength="minlength"
            :autofocus="autofocus"
            :type="type"
            @change="handleChange"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @keyup="handleKeyup"
            @keydown="handleKeydown"/>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
import { findComponentUpward } from '../../utils/assist'
import Emitter from '../../mixins/emitter'

const prefixCls = prefix + 'input'
export default {
    name: prefixCls,
    mixins: [Emitter],
    props: {
        /* 控制input的自带属性 */
        // 接收input的value
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            validator (value) {
                return ['text', 'password', 'url', 'email', 'textarea'].indexOf(value) !== -1
            },
            default: 'text'
        },
        placeholder: {
            type: String,
            default: '请输入...'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        maxlength: {
            type: Number
        },
        minlength: {
            type: Number
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        labelText: {
            type: String
        },
        /* 控制样式 */
        // normal small large
        size: {
            default: 'normal',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['large', 'small', 'normal'].indexOf(value) !== -1
            }
        },
        error: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        }

    },
    data () {
        return {
            currentValue: this.value
        }
    },
    computed: {},
    methods: {
        handleChange (event) {
            this.$emit('on-change', event)
        },
        handleFocus (event) {
            this.$emit('on-focus', event)
        },
        handleBlur (event) {
            this.$emit('on-blur', event)
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch(prefix + 'form-item', 'on-form-blur', this.currentValue)
            }
        },
        handleKeyup (event) {
            this.$emit('on-keyup', event)
        },
        handleKeydown (event) {
            this.$emit('on-keydown', event)
        },
        handleInput (event) {
            let value = event.target.value
            // if (this.number && value !== '') value = Number.isNaN(Number(value)) ? value : Number(value)
            this.$emit('input', value)
            this.setCurrentValue(value)
            this.$emit('on-change', event)
        },
        setCurrentValue (value) {
            if (value === this.currentValue) return
            this.currentValue = value
            if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                this.dispatch(prefix + 'form-item', 'on-form-change', this.currentValue)
            }
        }
    },
    watch: {
        value (val) {
            this.setCurrentValue(val)
        }
    }
}

</script>

<style lang="scss">

</style>
