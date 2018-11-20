<template>
  <div class="inputground">
    <i-input v-model="currentValue" :type="inputType" :placeholder="placeholder" :disabled="disabled" @on-input-change="handleChange" @change="handleChange">
        <span slot="prepend" v-if="inputLabel">{{inputLabel}}</span>
    </i-input>
  </div>
</template>

<script>
export default {
    name: 'label-input',
    props: {
        inputType: {
            type: String,
            default: 'text'
        },
        inputLabel: {
            type: String,
            default: ''
        },
        inputValue: {
            type: [String, Number],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        validateType: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            currentValue: this.inputValue
        }
    },
    watch: {
        inputValue: function () {
            this.currentValue = this.inputValue
        },
        currentValue (newVal, oldVal) {
            if (this.validateType) {
                if (newVal === '') {
                    this.$nextTick(() => {
                        this.value = ''
                    })
                } else {
                    let valid = null
                    if (this.validateType === 'taxRefundPassword') {
                        valid = /^[a-zA-Z0-9]{0,8}$/g.test(newVal)
                    }
                    if (!valid) {
                        this.$nextTick(() => {
                            this.currentValue = oldVal === '' ? '' : oldVal
                        })
                    }
                }
            }
        }
    },
    methods: {
        handleChange: function (event) {
            this.$emit('change', event, this.currentValue)
        }
    }
}
</script>

<style lang="scss">

</style>
