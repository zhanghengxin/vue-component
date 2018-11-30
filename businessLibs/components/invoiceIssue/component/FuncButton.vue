<template>
  <div class="BwButton_wrap">

    <BwButton :type="buttonType" :opcode="opcode" :disabled="disabled" :inputLabel="inputLabel" :icon="funcType" @click="doClick" >{{inputLabel}}</BwButton>
  </div>
</template>

<script>

export default {
    name: 'func-button',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        buttonType: {
            type: String,
            default: 'first'
        },
        clickCallback: {
            type: Function
        },
        inputLabel: {
            type: String,
            default: ''
        },
        funcType: {
            type: String,
            default: ''
        },
        opcode: {
            type: String,
            default: ''
        }
    },
    methods: {
        doClick: function () {
            const callback = this.clickCallback
            callback.call()
        }
    }
}
</script>

<style lang="scss">
    .inputground_btn{
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }
    .BwButton_wrap{
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        margin: 0 16px 6px 0;
    }
</style>
