/**
 * input 组件
 * author ganbowen
 * created 2018/09/18 20:05:54
 */
<template>
    <div :class="{'b-input-group':labelText}">
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
                :readonly="readonly"
                :autofocus="autofocus"
                :type="type"
                :error='error'
                @change="handleChange"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @keyup="handleKeyup"
                @keydown="handleKeydown"/>
    </div>
</template>

<script>

export default {
    name: 'b-input',
    props: {
        /* 控制input的自带属性 */
        // 接收input的value
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            validator (value) {
                return ['text', 'password', 'url', 'email'].indexOf(value) !== -1
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
    $border:#DDDEE1;
    $borderhover:#52B7FC;
    $inputcolor:#495060;
    $placeholder:#CCCCCC;
    .b-input-group {
        position: relative;
        width: 200px;
        display: table;
        border: 1px solid $border;
        border-radius: 4px;
        border-collapse: separate;
        .b-input {
            border: 0;
            width: 100%;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            float: left;
        }
        &:hover{
            border-color: $borderhover;
            box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
        }
        &:hover input{
            box-shadow: none;
        }
        &:disabled :hover{
            border-color: $border;
            box-shadow: none;
        }
        .b-input-icon-normal{
            position: absolute;
            right: 0px;
            padding: 8px;
        }
        .b-input-icon-large{
            position: absolute;
            right: 0px;
            padding: 8px;
        }
        .b-input-icon-small{
            position: absolute;
            right: 0px;
            padding: 8px;
        }
    }

    .b-input {
        display: inline-block;
        width: 180px;
        line-height: 1.5;
        font-size: 12px;
        border: 1px solid $border;
        border-radius: 4px;
        color: $inputcolor;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
        &:hover{
            border-color: $borderhover;
        }
        &:focus{
            box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
        }
        &:disabled{
            background-color: #E8E8E8;
        }
        &:disabled:hover{
            border-color: $border;
        }
    }

    .b-input-small {
        padding: 4px 8px;
        height: 24px;
        border-radius: 3px;
    }

    .b-input-normal {
        font-size: 12px;
        padding: 8px;
        height: 32px;
    }

    .b-input-large {
        font-size: 14px;
        padding: 12px 8px;
        height: 40px;
    }

    .b-input-label {
        display: table-cell;
        padding: 4px 7px;
        font-size: inherit;
        font-weight: normal;
        line-height: 1;
        color: #515a6e;
        text-align: center;
        background-color: #f8f8f9;
        border-right: 1px solid $border;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        white-space: nowrap;
        vertical-align: middle;
    }
</style>
