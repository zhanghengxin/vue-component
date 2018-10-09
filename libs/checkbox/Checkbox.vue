<template>
    <label class="b-checkbox">
        <span :class="checkbboxLeftClass">
            <input
                class="b-checkbox-input"
                name="Fruit"
                type="checkbox"
                :value="value"
                :checked="checked"
                @change="change"/>
        </span>
        <span class="b-checkbox-right">
            <slot></slot>
            <span v-if="label">{{label}}</span>
        </span>
    </label>
</template>

<script>
const prefixCls = 'b-checkbox'
export default {
    name: 'Checkbox',
    data () {
        return {
            checked: this.value
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    },
    computed: {
        checkbboxLeftClass: function () {
            return [
                `${prefixCls}-left`,
                {
                    [`${prefixCls}-checked`]: this.checked,
                    [`${prefixCls}-disabled`]: this.disabled
                }
            ]
        }
    },
    methods: {
        change (e) {
            if (this.disabled) return
            this.checked = e.target.checked
            if (this.$parent.$options.name === 'CheckboxGroup') {
                this.$parent.change(this.label, this.checked)
                return
            }
            console.log(this.$parent)
            console.log(e.target.checked)

            console.log(this.checked)
            if (this.checked) {
                this.checkboxCheck = ''
            } else {
                this.checkboxCheck = 'checkbox-checked'
            }
            this.$emit('input', this.checked)
            //   this.checked = !this.checked
            this.$emit('change', this.checked)
        }
    }
}
</script>

<style lang="scss">
.b-checkbox{
    font-size: 12px;
    margin:0;
    padding:0;
    color: #495060;
    cursor: pointer;
    .b-checkbox-left{
        box-sizing: border-box;
        display:inline-block;
        vertical-align: middle;
        margin-right:8px;
        width:14px;
        height:14px;
        border: 1px solid #DDDEE1;
        border-radius: 2px;
        position:relative;
        background-color: #fff;
        transition: border-color .2s ease-in-out,background-color .2s ease-in-out,box-shadow .2s ease-in-out;
    }
    .b-checkbox-right{
        display: inline-block;
        vertical-align: middle;
    }
    .b-checkbox-checked{
        background: #0079CC;
        border: 1px solid #0079CC;
    }
    .b-checkbox-checked::after{
        content: '';
        display: table;
        width: 3px;
        height: 8px;
        position: absolute;
        top: 1px;
        left: 4px;
        border: 2px solid #FFF;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
        transition: all .2s ease-in-out;
    }
    .b-checkbox-disabled{
        background: #E8E8E8;
        border: 1px solid #DDDEE1;
    }
    .b-checkbox-disabled.b-checkbox-checked::after{
        content: '';
        display: table;
        width: 3px;
        height: 8px;
        position: absolute;
        top: 1px;
        left: 4px;
        border: 2px solid #CCC;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
        transition: all .2s ease-in-out;
    }
    .b-checkbox-left:hover{
        border: 1px solid #CCCCCC;
    }
    .b-checkbox-input{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        cursor: pointer;
        opacity: 0;
    }
}
</style>
