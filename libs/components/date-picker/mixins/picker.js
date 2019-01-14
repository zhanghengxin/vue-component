import Panel from '../panel/panel'
import bButton from '../../button/Button'
import { oneOf, prefix } from '../../../utils/common'
import clickoutside from '../../../utils/directives/clickOutside'
import { isValidDate, isValidRange, formatDate, parseDate, dateEqual, rangeEqual, transformDate, transformRange, isPlainObject } from '../../../utils/date'
import Vue from 'vue'
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
        label: {
            type: Boolean,
            default: false
        },
        labelText: {
            type: String,
            default: () => this.label ? '日期' : ''
        },
        fixed: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'normal',
            validator (value) {
                return oneOf(value, ['large', 'normal', 'small'])
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
        popupTopCls () {
            return `${pickerCls}-popup-top`
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
        transform () {
            const obj = this.range ? transformRange : transformDate
            return isPlainObject(this.dateType) ? { ...obj.date, ...this.dateType } : obj[this.dateType] || obj.date
        },
        innerPlaceholder () {
            if (typeof this.placeholder === 'string') return this.placeholder
            if (this.innerType === 'time') {
                return this.range ? '请选择时间范围' : '请选择时间'
            } else if (this.innerType === 'datetime') {
                return this.range ? '请选择日期时间范围' : '请选择日期时间'
            } else if (this.innerType === 'year') {
                return '请选择年份'
            } else if (this.innerType === 'month') {
                return '请选择月份'
            } else {
                return this.range ? '请选择日期范围' : '请选择日期'
            }
        },
        text () {
            if (this.userInput !== null) return this.userInput
            const date = this.transform.value2date(this.value, this.format)
            if (!this.range) return date ? this.stringify(date) : ''
            return Array.isArray(date) && date.length === 2 && date[0] && date[1]
                ? `${this.stringify(date[0])} ${this.rangeSeparator} ${this.stringify(date[1])}` : ''
        },
        showClearIcon () {
            return !this.disabled && this.clearable && (this.range ? isValidRange(this.value) : isValidDate(this.value))
        },
        innerType () {
            return String(this.type).toLowerCase()
        },
        innerRangeShortcuts () {
            if (Array.isArray(this.shortcuts)) return this.shortcuts
            if (this.shortcuts === false) return []
            let pickers = ['今天', '昨天', '一周前']
            // TODO
            const arr = [
                {
                    text: pickers[0],
                    onClick (self) {
                        let _date = new Date()
                        _date.setHours(0, 0, 0, 0)
                        self.curVal = new Date(_date)
                        self.updateDate(true)
                    }
                },
                {
                    text: pickers[1],
                    onClick (self) {
                        let _date = new Date()
                        _date.setHours(0, 0, 0, 0)
                        let preDate = _date - (3600 * 1000 * 24)
                        self.curVal = new Date(preDate)
                        self.updateDate(true)
                    }
                },
                {
                    text: pickers[2],
                    onClick (self) {
                        let _date = new Date()
                        _date.setHours(0, 0, 0, 0)
                        let preDate = _date - 3600 * 1000 * 24 * 7
                        self.curVal = new Date(preDate)
                        self.updateDate(true)
                    }
                }
            ]
            return arr
        },
        innerShortcuts () {
            if (Array.isArray(this.shortcuts)) return this.shortcuts
            if (this.shortcuts === false) return []
            let pickers = ['最近一周', '最近一个月', '最近三个月']
            const arr = [
                {
                    text: pickers[0],
                    onClick (self) {
                        let _date = new Date()
                        _date.setHours(0, 0, 0, 0)
                        self.curVal = [ new Date(_date - 3600 * 1000 * 24 * 6), new Date(_date) ]
                        self.updateDate(true)
                    }
                },
                {
                    text: pickers[1],
                    onClick (self) {
                        let _date = new Date()
                        _date.setHours(0, 0, 0, 0)
                        self.curVal = [ new Date(_date - 3600 * 1000 * 24 * 30), new Date(_date) ]
                        self.updateDate(true)
                    }
                },
                {
                    text: pickers[2],
                    onClick (self) {
                        let _date = new Date()
                        _date.setHours(0, 0, 0, 0)
                        self.curVal = [ new Date(_date - 3600 * 1000 * 24 * 90), new Date(_date) ]
                        self.updateDate(true)
                    }
                }
            ]
            return arr
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
            let { start, end } = range
            this.curVal = [new Date(start), new Date(end)]
            this.updateDate(true)
        },
        clearDate () {
            let date = this.range ? [null, null] : null
            this.curVal = date
            this.updateDate(true)
            this.$emit('clear')
        },
        confirmDate () {
            let valid = this.range ? isValidRange(this.curVal) : isValidDate(this.curVal)
            if (valid) {
                this.updateDate(true)
            }
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
            }
        },
        selectEndDate (date) {
            this.$set(this.curVal, 1, date)
            if (this.curVal[0]) {
                this.updateDate()
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
        handleInput (e) {
            if (e) {
                this.userInput = e.target.value
            } else {
                this.clearDate()
            }
        },
        handleChange (e) {
            let value = e.target.value
            if (this.editable && this.userInput !== null) {
                let calendar = this.$children[0]
                let checkDate = calendar.isDisabledTime
                if (this.range) {
                    let range = value.split(` ${this.rangeSeparator} `)
                    if (range.length === 2) {
                        let start = this.parseDate(range[0], this.format)
                        let end = this.parseDate(range[1], this.format)
                        if (start && end && !checkDate(start, null, end) && !checkDate(end, start, null)) {
                            this.curVal = [ start, end ]
                            this.updateDate(true)
                            this.closePopup()
                            return
                        }
                    }
                } else {
                    const date = this.parseDate(value, this.format)
                    if (date && !checkDate(date, null, null)) {
                        this.curVal = date
                        this.updateDate(true)
                        this.closePopup()
                        return
                    }
                }
                this.$emit('input-error', value)
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
            if (this.popper) {
                this.popper.destroy()
            }
        }
    }
}
