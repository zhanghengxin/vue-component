<template>
    <div ref="split" :class="wrapperCls">
        <div v-if="isHorizontal" :class="horizontalCls">
            <div :style="{ right: `${anotherOffset}%` }" :class="paneCls" class="left-pane">
                <slot name="left"></slot>
            </div>
            <div :style="{ left: `${offset}%` }" :class="triggerCls" @mousedown="handleMousedown">
                <slot name="trigger">
                    <Trigger mode="vertical"></Trigger>
                </slot>
            </div>
            <div :style="{ left: `${offset}%` }" :class="paneCls" class="right-pane">
                <slot name="right"></slot>
            </div>
        </div>
        <div v-else :class="verticalCls">
            <div :style="{ bottom: `${anotherOffset}%` }" :class="paneCls" class="top-pane">
                <slot name="top"></slot>
            </div>
            <div :style="{ top: `${offset}%` }" :class="triggerCls" @mousedown="handleMousedown">
                <slot name="trigger">
                    <Trigger mode="horizontal"></Trigger>
                </slot>
            </div>
            <div :style="{ top: `${offset}%` }" :class="paneCls" class="bottom-pane">
                <slot name="bottom"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { oneOf, prefix } from '../../utils/common'
import { on, off } from '../../utils/dom'
import Trigger from './Trigger'

const prefixCls = `${prefix}split`
const defaultHeight = '40px'

export default {
    name: prefixCls,
    components: {Trigger},
    props: {
        value: {
            type: [Number, String],
            default: 0.5
        },
        mode: {
            default: 'horizontal',
            validator (value) {
                return oneOf(value, ['horizontal', 'vertical'])
            }
        },
        min: {
            type: [Number, String],
            default: defaultHeight
        },
        max: {
            type: [Number, String],
            default: defaultHeight
        }
    },
    data () {
        return {
            offset: 0,
            oldOffset: 0,
            isMoving: false
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefixCls}`,
                this.isMoving ? 'no-select' : ''
            ]
        },
        horizontalCls () {
            return `${prefixCls}-horizontal`
        },
        verticalCls () {
            return `${prefixCls}-vertical`
        },
        paneCls () {
            return [
                `${prefixCls}-pane`,
                {
                    [`${prefixCls}-pane-moving`]: this.isMoving
                }
            ]
        },
        triggerCls () {
            return `${prefixCls}-trigger-con`
        },
        isHorizontal () {
            return this.mode === 'horizontal'
        },
        anotherOffset () {
            return 100 - this.offset
        },
        valueIsPx () {
            return typeof this.value === 'string'
        },
        offsetSize () {
            return this.isHorizontal ? 'offsetWidth' : 'offsetHeight'
        },
        computedMin () {
            return this.getComputedThresholdValue('min')
        },
        computedMax () {
            return this.getComputedThresholdValue('max')
        }
    },
    methods: {
        px2percent (numerator, denominator) {
            return parseFloat(numerator) / parseFloat(denominator)
        },
        getComputedThresholdValue (type) {
            const size = this.$refs.split[this.offsetSize]
            if (this.valueIsPx) {
                return typeof this[type] === 'string' ? this[type] : size * this[type]
            } else {
                return typeof this[type] === 'string' ? this.px2percent(this[type], size) : this[type]
            }
        },
        getMin (value1, value2) {
            if (this.valueIsPx) {
                return `${Math.min(parseFloat(value1), parseFloat(value2))}px`
            } else {
                return Math.min(value1, value2)
            }
        },
        getMax (value1, value2) {
            if (this.valueIsPx) {
                return `${Math.max(parseFloat(value1), parseFloat(value2))}px`
            } else {
                return Math.max(value1, value2)
            }
        },
        getAnotherOffset (value) {
            let res = 0
            if (this.valueIsPx) {
                res = `${this.$refs.split[this.offsetSize] - parseFloat(value)}px`
            } else {
                res = 1 - value
            }
            return res
        },
        handleMove (e) {
            let pageOffset = this.isHorizontal ? e.pageX : e.pageY
            let offset = pageOffset - this.initOffset
            let outerWidth = this.$refs.split[this.offsetSize]
            let value = this.valueIsPx ? `${parseFloat(this.oldOffset) + offset}px` : (this.px2percent(outerWidth * this.oldOffset + offset, outerWidth))
            let anotherValue = this.getAnotherOffset(value)
            if (parseFloat(value) <= parseFloat(this.computedMin)) value = this.getMax(value, this.computedMin)
            if (parseFloat(anotherValue) <= parseFloat(this.computedMax)) value = this.getAnotherOffset(this.getMax(anotherValue, this.computedMax))
            e.atMin = this.value === this.computedMin
            e.atMax = this.valueIsPx ? this.getAnotherOffset(this.value) === this.computedMax : this.getAnotherOffset(this.value).toFixed(5) === this.computedMax.toFixed(5)
            this.$emit('input', value)
            this.$emit('on-moving', e)
        },
        handleUp () {
            this.isMoving = false
            off(document, 'mousemove', this.handleMove)
            off(document, 'mouseup', this.handleUp)
            this.$emit('on-move-end')
        },
        handleMousedown (e) {
            this.initOffset = this.isHorizontal ? e.pageX : e.pageY
            this.oldOffset = this.value
            this.isMoving = true
            on(document, 'mousemove', this.handleMove)
            on(document, 'mouseup', this.handleUp)
            this.$emit('on-move-start')
        },
        computeOffset () {
            this.offset = (this.valueIsPx ? this.px2percent(this.value, this.$refs.split[this.offsetSize]) : this.value) * 10000 / 100
        }
    },
    watch: {
        value () {
            this.computeOffset()
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.computeOffset()
        })
        window.addEventListener('resize', () => {
            this.computeOffset()
        })
    }
}
</script>
