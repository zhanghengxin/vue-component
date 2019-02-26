<template>
    <div ref="picker" :class="wrapperCls" v-clickoutside="closePopup">
        <b-input
            ref="input"
            :label="label"
            :fixed="fixed"
            type="text"
            :class="inputClass"
            :name="inputName"
            :disabled="disabled"
            :readonly="!editable"
            :value="text"
            :labelWidth="width"
            :size="size"
            suffix
            clearable
            icon="rili"
            :style="inputStyle"
            :placeholder="innerPlaceholder"
            @input="handleInput"
            @on-change="handleChange"
            @on-focus="showPopup">
        </b-input>
        <transition name="slide">
            <div
                v-show="popupVisible"
                :class="popupCls"
                ref="calendar">
                <div :class="popupContentCls">
                    <slot name="shortcuts">
                        <div
                            v-if="shortcuts && innerShortcuts.length"
                            :class="shortcutsWrapper">
                            <button
                                type="button"
                                :class="shortcutsCls"
                                v-for="(range, index) in innerShortcuts"
                                :key="index"
                                @click="selectRange(range)">
                                {{range.text}}
                            </button>
                        </div>
                    </slot>
                    <panel
                        ref="panel"
                        v-if="!range"
                        :type="innerType"
                        :date-format="innnerDateFormat"
                        :value="curVal"
                        :visible="popupVisible"
                        :not-before="notBefore"
                        :not-after="notAfter"
                        :minute-step="minuteStep"
                        :disabled-days="disabledDays"
                        :first-day-of-week="firstDayOfWeek"
                        @select-date="selectDate"
                        @select-time="selectTime">
                    </panel>
                    <div v-else :class="rangeWrapper">
                        <panel
                            ref="startPanel"
                            style="box-shadow: 1px 0 rgba(0, 0, 0, .1)"
                            v-bind="$attrs"
                            :type="innerType"
                            :date-format="innnerDateFormat"
                            :value="curVal[0]"
                            :start-at="null"
                            :end-at="curVal[1]"
                            :visible="popupVisible"
                            :not-before="notBefore"
                            :not-after="notAfter"
                            :minute-step="minuteStep"
                            :disabled-days="disabledDays"
                            :first-day-of-week="firstDayOfWeek"
                            @select-date="selectStartDate"
                            @select-time="selectStartTime">
                        </panel>
                        <panel
                            ref="endPanel"
                            v-bind="$attrs"
                            :type="innerType"
                            :date-format="innnerDateFormat"
                            :value="curVal[1]"
                            :start-at="curVal[0]"
                            :end-at="null"
                            :not-before="notBefore"
                            :not-after="notAfter"
                            :minute-step="minuteStep"
                            :visible="popupVisible"
                            :disabled-days="disabledDays"
                            :first-day-of-week="firstDayOfWeek"
                            @select-date="selectEndDate"
                            @select-time="selectEndTime">
                        </panel>
                    </div>
                </div>
                <slot name="footer" :confirm="confirmDate">
                    <div v-if="confirm || innerType === 'datetime' || innerType === 'time'" :class="footerCls">
                        <span v-if="innerType === 'datetime'" :class="datetimeCls" @click="pickTime">选择时间</span>
                        <b-button @on-click="confirmDate" size="small">
                            {{ confirmText }}
                        </b-button>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
import Panel from './panel/panel'
import bButton from '../button/Button'
import { oneOf, prefix } from '../../utils/common'
import clickoutside from '../../utils/directives/clickOutside'
import {
    isValidDate,
    isValidRange,
    formatDate,
    parseDate,
    dateEqual,
    rangeEqual,
    transformDate,
    transformRange,
    isPlainObject,
    shortcuts,
    rangeShortcuts,
    placeholder
} from '../../utils/date'
const isServer = Vue.prototype.$isServer
const Popper = isServer ? function () {} : require('popper.js/dist/umd/popper.js')
const pickerCls = `${prefix}datepicker`
const shortcutsCls = `${prefix}shortcuts`
const rangeCls = `${prefix}range`

export default {
    components: { Panel, bButton },
    directives: { clickoutside },
    props: {
        value: null,
        // input 组件 -- start
        label: String,
        fixed: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default',
            validator (value) {
                return oneOf(value, ['large', 'default', 'small'])
            }
        },
        placeholder: {
            type: String,
            default: null
        },
        inputClass: {
            type: [String, Array]
        },
        inputStyle: {
            type: Object
        },
        inputName: {
            type: String,
            default: 'date'
        },
        // input 组件 -- end
        dateFormat: String,
        type: {
            type: String,
            default: 'date'
        },
        range: {
            type: Boolean,
            default: false
        },
        rangeSeparator: {
            type: String,
            default: '~'
        },
        width: {
            type: [String, Number],
            default: null
        },
        confirm: {
            type: Boolean,
            default: false
        },
        confirmText: {
            type: String,
            default: '确认'
        },
        editable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        shortcuts: {
            type: [Boolean, Array],
            default: false
        },
        dateType: {
            default: 'formatdate',
            validator (value) {
                return oneOf(value, ['formatdate', 'timestamp', 'date']) || isPlainObject(value)
            }
        },
        notBefore: {
            default: null,
            validator: function (val) {
                return !val || isValidDate(val)
            }
        },
        notAfter: {
            default: null,
            validator: function (val) {
                return !val || isValidDate(val)
            }
        },
        minuteStep: {
            type: Number,
            default: 0,
            validator: val => val >= 0 && val <= 60
        },
        disabledDays: {
            type: [Array, Function],
            default: function () {
                return []
            }
        },
        firstDayOfWeek: {
            type: Number,
            default: 7,
            validator: val => val >= 1 && val <= 7
        }
    },
    data () {
        return {
            shortcutsCls,
            prefix,
            curVal: this.range ? [null, null] : null,
            userInput: null,
            popupVisible: false
        }
    },
    computed: {
        wrapperCls () {
            return pickerCls
        },
        popupCls () {
            return `${pickerCls}-popup`
        },
        popupContentCls () {
            return `${pickerCls}-popup-content`
        },
        shortcutsWrapper () {
            return `${shortcutsCls}-wrapper`
        },
        rangeWrapper () {
            return `${rangeCls}-wrapper`
        },
        footerCls () {
            return `${pickerCls}-footer`
        },
        datetimeCls () {
            return `${pickerCls}-datetime`
        },
        text () {
            if (this.userInput !== null) return this.userInput
            const date = this.transform.value2date(this.value, this.format)
            if (!this.range) return date ? this.stringify(date) : ''
            return Array.isArray(date) && date.length === 2 && date[0] && date[1]
                ? `${this.stringify(date[0])} ${this.rangeSeparator} ${this.stringify(date[1])}`
                : ''
        },
        transform () {
            const obj = this.range ? transformRange : transformDate
            return isPlainObject(this.dateType) ? { ...obj.date, ...this.dateType } : obj[this.dateType] || obj.date
        },
        showClearIcon () {
            return !this.disabled && this.clearable && (this.range ? isValidRange(this.value) : isValidDate(this.value))
        },
        innerPlaceholder () {
            if (typeof this.placeholder === 'string') return this.placeholder

            const p = placeholder[this.innerType]
            return this.range ? p[1] : p[0]
        },
        innerType () {
            return String(this.type).toLowerCase()
        },
        innerShortcuts () {
            if (Array.isArray(this.shortcuts)) return this.shortcuts
            if (this.shortcuts === false) return []
            return this.range ? rangeShortcuts : shortcuts
        },
        innnerDateFormat () {
            if (this.dateFormat) return this.dateFormat
            if (this.innerType === 'date') return this.format
            return this.format.replace(/[Hh]+.*[msSaAZ]|\[.*?\]/g, '').trim() || 'YYYY-MM-DD'
        },
        labelWidth () {
            const inputBox = this.$refs.input
            if (inputBox.$el.children.length < 2) return 0
            const offsetWidth = inputBox.$el.children[1].offsetWidth
            if (this.label && this.fixed) return offsetWidth
            if (this.label) return offsetWidth + 4
            return 0
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: 'handleValChange'
        },
        popupVisible (val) {
            if (val) {
                this.init()
            } else {
                this.userInput = null
            }
        }
    },
    methods: {
        handleValChange (value) {
            this.curVal = this.transform.value2date(value, this.format)
        },
        init () {
            this.handleValChange(this.value)
            this.update()
        },
        stringify (date, format) {
            return formatDate(date, format || this.format)
        },
        parseDate (value, format) {
            return parseDate(value, format || this.format)
        },
        selectRange (range) {
            if (typeof range.onClick === 'function') {
                return range.onClick(this)
            }
            if (this.range) {
                const [ start, end ] = range.date
                this.curVal = [new Date(start), new Date(end)]
                this.updateDate(true)
            } else {
                this.curVal = range.date
                this.updateDate(true)
            }
        },
        clearDate () {
            const date = this.range ? [null, null] : null
            this.curVal = date
            this.updateDate(true)
            if (this.popupVisible) this.closePopup()
            this.$emit('on-clear')
        },
        confirmDate () {
            const valid = this.range ? isValidRange(this.curVal) : isValidDate(this.curVal)
            if (valid) this.updateDate(true)
            this.$emit('on-confirm', this.transform.date2value(this.curVal, this.format))
            this.closePopup()
        },
        updateDate (confirm = false) {
            if ((this.confirm && !confirm) || this.disabled) return false
            const equal = this.range ? rangeEqual(this.value, this.curVal) : dateEqual(this.value, this.curVal)
            if (equal) return false
            this.$emit('input', this.transform.date2value(this.curVal, this.format))
            this.$emit('on-change', this.transform.date2value(this.curVal, this.format))
            return true
        },
        selectDate (date) {
            this.curVal = date
            this.updateDate() && this.closePopup()
        },
        selectStartDate (date) {
            this.$set(this.curVal, 0, date)
            if (this.curVal[1]) {
                this.updateDate()
                if (this.innerType !== 'datetime' && this.innerType !== 'time') {
                    this.closePopup()
                }
            }
        },
        selectEndDate (date) {
            this.$set(this.curVal, 1, date)
            if (this.curVal[0]) {
                this.updateDate()
                if (this.innerType !== 'datetime' && this.innerType !== 'time') {
                    this.closePopup()
                }
            }
        },
        selectTime (time, close) {
            this.curVal = time
            this.updateDate() && close && this.closePopup()
        },
        selectStartTime (time) {
            this.selectStartDate(time)
        },
        selectEndTime (time) {
            this.selectEndDate(time)
        },
        showPopup () {
            if (this.disabled) return
            this.popupVisible = true
        },
        closePopup () {
            this.popupVisible = false
            this.destroy()
        },
        handleInput (val) {
            if (val) {
                this.userInput = val
            } else {
                this.clearDate()
            }
        },
        handleChange (e) {
            const { value } = e.target
            if (this.editable && this.userInput !== null) {
                const calendar = this.$children[1]
                const checkDate = calendar.isDisabledTime
                if (this.range) {
                    let range = value.split(` ${this.rangeSeparator} `)
                    if (range.length === 2) {
                        let start = this.parseDate(range[0], this.format)
                        let end = this.parseDate(range[1], this.format)
                        if (start && end && !checkDate(start, null, end) && !checkDate(end, start, null)) {
                            this.curVal = [ start, end ]
                            this.updateDate(true)
                            this.closePopup()
                        }
                    }
                } else {
                    const date = this.parseDate(value, this.format)
                    if (date && !checkDate(date, null, null)) {
                        this.curVal = date
                        this.updateDate(true)
                        this.closePopup()
                    }
                }
                this.$emit('on-input-error', value)
            }
        },
        pickTime () {
            if (this.range) {
                this.$refs.startPanel.panel = 'TIME'
                this.$refs.endPanel.panel = 'TIME'
            } else {
                this.$refs.panel.panel = 'TIME'
            }
        },
        update () {
            if (this.popper) {
                this.$nextTick(() => {
                    this.popper.update()
                    this.popperStatus = true
                })
            } else {
                this.$nextTick(() => {
                    this.popper = new Popper(this.$refs.picker, this.$refs.calendar, {
                        placement: 'bottom-start',
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            },
                            preventOverflow: {
                                boundariesElement: 'window'
                            },
                            offset: {
                                offset: this.labelWidth
                            }
                        },
                        onCreate: () => {
                            this.resetTransformOrigin()
                            this.$nextTick(this.popper.update())
                        },
                        onUpdate: () => {
                            this.resetTransformOrigin()
                        }
                    })
                })
            }
        },
        destroy () {
            if (this.popper) {
                setTimeout(() => {
                    if (this.popper && !this.popperStatus) {
                        this.popper.destroy()
                        this.popper = null
                    }
                    this.popperStatus = false
                }, 1000)
            }
        },
        resetTransformOrigin () {
            if (!this.popper) return
            let xPlacement = this.popper.popper.getAttribute('x-placement')
            let placementStart = xPlacement.split('-')[0]
            let placementEnd = xPlacement.split('-')[1]
            const leftOrRight = xPlacement === 'left' || xPlacement === 'right'
            if (!leftOrRight) {
                this.popper.popper.style.transformOrigin = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
            }
        },
        beforeDestroy () {
            if (this.popper) this.popper.destroy()
        }
    }
}
</script>
