<template>
      <div>
          <input type="text"
              class="input"
              style="ime-mode: disabled;"
              :disabled="disabled"
              :readonly="readonly"
              autocomplete="off"
              @focus="focus"
              @blur="blur"
              @keydown.stop="keyDown"
              @change="change"
              :value="value">
      </div>
</template>
<script>

const prefixCls = 'ivu-input-number'
const iconPrefixCls = 'ivu-icon'

// function isValueNumber (value) {
//     return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
// }
function addNum (num1, num2) {
    let sq1, sq2, m
    try {
        sq1 = num1.toString().split('.')[1].length
    } catch (e) {
        sq1 = 0
    }
    try {
        sq2 = num2.toString().split('.')[1].length
    } catch (e) {
        sq2 = 0
    }
    m = Math.pow(10, Math.max(sq1, sq2))
    return (num1 * m + num2 * m) / m
}

export default {
    props: {
        withSelector: {
            type: Boolean,
            default: false
        },
        type: {
            validator (value) {
                return ['PositiveInteger', 'NegativeInteger', 'Integer', 'PositiveFloat', 'NegativeFloat', 'NoneZeroFloat', 'Float', 'Percent'].indexOf(value) !== -1
            }
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: [Number, String],
            default: ''
        },
        size: {
            validator (value) {
                return ['small', 'large'].indexOf(value) !== -1
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            focused: false,
            upDisabled: false,
            downDisabled: false,
            currentValue: this.value
        }
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-focused`]: this.focused
                }
            ]
        },
        handlerClasses () {
            return `${prefixCls}-handler-wrap`
        },
        upClasses () {
            return [
                `${prefixCls}-handler`,
                `${prefixCls}-handler-up`,
                {
                    [`${prefixCls}-handler-up-disabled`]: this.upDisabled
                }
            ]
        },
        innerUpClasses () {
            return `${prefixCls}-handler-up-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-up`
        },
        downClasses () {
            return [
                `${prefixCls}-handler`,
                `${prefixCls}-handler-down`,
                {
                    [`${prefixCls}-handler-down-disabled`]: this.downDisabled
                }
            ]
        },
        innerDownClasses () {
            return `${prefixCls}-handler-down-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-down`
        },
        inputWrapClasses () {
            return `${prefixCls}-input-wrap`
        },
        inputClasses () {
            return `${prefixCls}-input`
        }
    },
    methods: {
        preventDefault (e) {
            e.preventDefault()
        },
        up (e) {
            const targetVal = Number(e.target.value)
            if (this.upDisabled && isNaN(targetVal)) {
                return false
            }
            this.changeStep('up', e)
        },
        down (e) {
            const targetVal = Number(e.target.value)
            if (this.downDisabled && isNaN(targetVal)) {
                return false
            }
            this.changeStep('down', e)
        },
        changeStep (type, e) {
            if (this.disabled) {
                return false
            }

            const targetVal = Number(e.target.value)
            let val = Number(this.currentValue)
            const step = Number(this.step)
            if (isNaN(val)) {
                return false
            }

            // input a number, and key up or down
            if (!isNaN(targetVal)) {
                if (type === 'up') {
                    if (addNum(targetVal, step) <= this.max) {
                        val = targetVal
                    } else {
                        return false
                    }
                } else if (type === 'down') {
                    if (addNum(targetVal, -step) >= this.min) {
                        val = targetVal
                    } else {
                        return false
                    }
                }
            }

            if (type === 'up') {
                val = addNum(val, step)
            } else if (type === 'down') {
                val = addNum(val, -step)
            }
            this.setValue(val)
        },
        setValue (val) {
            this.$nextTick(() => {
                this.currentValue = val
                this.$emit('on-change', val)
            })
        },
        focus () {
            this.focused = true
            this.$emit('on-focus')
        },
        blur (event) {
            this.focused = false
            let val = event.target.value.trim()

            const max = this.max
            const min = this.min

            if (this.isValueValid(val) || (val === '')) {
                let nVal = Number(val)
                this.currentValue = val

                if (nVal > max) {
                    this.$nextTick(() => {
                        this.$emit('on-blur', max)
                    })
                } else if (nVal < min) {
                    this.$nextTick(() => {
                        this.$emit('on-blur', min)
                    })
                } else {
                    this.$nextTick(() => {
                        this.$emit('on-blur', val)
                    })
                }
            } else {
                event.target.value = this.currentValue
            }
        },
        keyDown (e) {
            if (e.keyCode === 38) {
                e.preventDefault()
                this.up(e)
            } else if (e.keyCode === 40) {
                e.preventDefault()
                this.down(e)
            }
        },
        change (event) {
            let val = event.target.value.trim()

            const max = this.max
            const min = this.min

            if (this.isValueValid(val) || (val === '')) {
                let nVal = Number(val)
                this.currentValue = val

                if (nVal > max) {
                    this.setValue(max)
                } else if (nVal < min) {
                    this.setValue(min)
                } else {
                    this.setValue(val)
                }
            } else {
                event.target.value = this.currentValue
            }
        },
        changeVal (val) {
            if (this.isValueValid(val)) {
                let nVal = Number(val)
                const step = this.step

                this.upDisabled = nVal + step > this.max
                this.downDisabled = nVal - step < this.min
            } else {
                this.upDisabled = true
                this.downDisabled = true
            }
        },
        isValueValid (val) {
            return this.typeUtil['is' + this.type](val)
        }
    },
    compiled () {
        this.changeVal(this.currentValue)
    },
    watch: {
        value (val) {
            this.currentValue = val
        },
        currentValue (val) {
            this.changeVal(val)
        }
    }
}
</script>

<style lang="scss" scoped>
.hide{
  display:none;
}

.ivu-input-number:focus{
  border:none;
}
.ivu-input-number{
  height:auto;
  border:none;
}

.ivu-input-number-input-wrap{
  height:auto;
}

.ivu-input-number-input{
  width: 90%;
  border: 1px solid #dddee1;
  height:18px;
  padding:0px;
}

</style>
