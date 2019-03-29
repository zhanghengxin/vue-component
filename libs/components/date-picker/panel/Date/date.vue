<template>
    <div :class="classes" @mousedown.prevent>
        <div :class="[prefixCls + '-sidebar']" v-if="shortcuts.length">
            <div
                :key="index"
                :class="[prefixCls + '-shortcut']"
                v-for="(shortcut, index) in shortcuts"
                @click="handleShortcutClick(shortcut)">
                {{ shortcut.text }}
            </div>
        </div>
        <div :class="[prefixCls + '-body']">
            <div :class="[datePrefixCls + '-header']" v-show="currentView !== 'time'">
                <span
                    :class="iconBtnCls('prev', '-double')"
                    @click="changeYear(-1)">
                    <Icon type="zuo1"></Icon>
                </span>
                <span
                    v-if="pickerTable === 'date-table'"
                    :class="iconBtnCls('prev')"
                    @click="changeMonth(-1)"
                    v-show="currentView === 'date'">
                    <Icon type="zuo"></Icon>
                </span>
                <date-panel-label
                    :date-panel-label="datePanelLabel"
                    :current-view="pickerTable.split('-').shift()"
                    :date-prefix-cls="datePrefixCls">
                </date-panel-label>
                <span
                    :class="iconBtnCls('next', '-double')"
                    @click="changeYear(+1)">
                    <Icon type="you1"></Icon>
                </span>
                <span
                    v-if="pickerTable === 'date-table'"
                    :class="iconBtnCls('next')"
                    @click="changeMonth(+1)"
                    v-show="currentView === 'date'">
                    <Icon type="you"></Icon>
                </span>
            </div>
            <div :class="[prefixCls + '-content']">
                <component
                    :is="pickerTable"
                    ref="pickerTable"
                    v-if="currentView !== 'time'"
                    :table-date="panelDate"
                    :show-week-numbers="showWeekNumbers"
                    :value="dates"
                    :selection-mode="selectionMode"
                    :disabled-date="disabledDate"
                    :focused-date="focusedDate"
                    @on-pick="panelPickerHandlers"
                    @on-pick-click="handlePickClick">
                </component>
            </div>
            <div :class="[prefixCls + '-content']" v-show="isTime">
                <time-picker
                    ref="timePicker"
                    v-if="currentView === 'time'"
                    :value="dates"
                    :format="format"
                    :time-disabled="timeDisabled"
                    :disabled-date="disabledDate"
                    :focused-date="focusedDate"
                    v-bind="timePickerOptions"
                    @on-pick="handlePick"
                    @on-pick-click="handlePickClick"
                    @on-pick-clear="handlePickClear"
                    @on-pick-success="handlePickSuccess"
                    @on-pick-toggle-time="handleToggleTime">
                </time-picker>
            </div>
            <Confirm
                v-if="confirm"
                :show-time="showTime"
                :is-time="isTime"
                @on-pick-toggle-time="handleToggleTime"
                @on-pick-clear="handlePickClear"
                @on-pick-success="handlePickSuccess">
            </Confirm>
        </div>
    </div>
</template>
<script>
    import Icon from '../../../icon/'
    import DateTable from '../../base/date-table'
    import YearTable from '../../base/year-table'
    import MonthTable from '../../base/month-table'
    import TimePicker from '../Time/time'
    import Confirm from '../../base/confirm'
    import datePanelLabel from './date-panel-label'
    import Mixin from '../panel-mixin'
    import DateMixin from './date-panel-mixin'
    import lang from '../../../../utils/date'
    import { prefix } from '../../../../utils/common'
    import { siblingMonth, formatDateLabels } from '../../util'
    const prefixCls = `${prefix}picker-panel`
    const datePrefixCls = `${prefix}date-picker`

    export default {
        name: 'DatePickerPanel',
        mixins: [ Mixin, DateMixin ],
        components: { Icon, DateTable, YearTable, MonthTable, TimePicker, Confirm, datePanelLabel },
        props: {
            // more props in the mixin
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data () {
            const { selectionMode, value } = this
            const dates = value.slice().sort()
            return {
                prefixCls: prefixCls,
                datePrefixCls: datePrefixCls,
                currentView: selectionMode || 'date',
                pickerTable: this.getTableType(selectionMode),
                dates: dates,
                panelDate: this.startDate || dates[0] || new Date()
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-body-wrapper`,
                    {
                        [`${prefixCls}-with-sidebar`]: this.shortcuts.length
                    }
                ]
            },
            panelPickerHandlers () {
                return this.pickerTable === `${this.currentView}-table` ? this.handlePick : this.handlePreSelection
            },
            datePanelLabel () {
                const locale = lang.i.locale
                const datePanelLabel = lang.i.datepicker.datePanelLabel
                const date = this.panelDate
                const { labels, separator } = formatDateLabels(locale, datePanelLabel, date)
                /*eslint-disable*/
                const handler = type => {
                    return () => this.pickerTable = this.getTableType(type)
                }
                return {
                    separator: separator,
                    labels: labels.map(obj => ((obj.handler = handler(obj.type)), obj))
                }
            },
            timeDisabled () {
                return !this.dates[0]
            }
        },
        watch: {
            value (newVal) {
                this.dates = newVal
                this.panelDate = this.startDate || (this.multiple ? this.dates[this.dates.length - 1] : this.dates[0]) || new Date()
            },
            currentView (currentView) {
                this.$emit('on-selection-mode-change', currentView)
                if (this.currentView === 'time') {
                    this.$nextTick(() => {
                        const spinner = this.$refs.timePicker.$refs.timeSpinner
                        spinner.updateScroll()
                    })
                }
            },
            selectionMode (type) {
                this.currentView = type
                this.pickerTable = this.getTableType(type)
            },
            focusedDate (date) {
                const isDifferentYear = date.getFullYear() !== this.panelDate.getFullYear()
                const isDifferentMonth = isDifferentYear || date.getMonth() !== this.panelDate.getMonth()
                if (isDifferentYear || isDifferentMonth) {
                    this.panelDate = date
                }
            }
        },
        methods: {
            reset () {
                this.currentView = this.selectionMode
                this.pickerTable = this.getTableType(this.currentView)
            },
            changeYear (dir) {
                if (this.selectionMode === 'year' || this.pickerTable === 'year-table') {
                    this.panelDate = new Date(this.panelDate.getFullYear() + dir * 10, 0, 1)
                } else {
                    this.panelDate = siblingMonth(this.panelDate, dir * 12)
                }
            },
            getTableType (currentView) {
                return currentView.match(/^time/) ? 'time-picker' : `${currentView}-table`
            },
            changeMonth (dir) {
                this.panelDate = siblingMonth(this.panelDate, dir)
            },
            handlePreSelection (value) {
                this.panelDate = value
                if (this.pickerTable === 'year-table') this.pickerTable = 'month-table'
                else this.pickerTable = this.getTableType(this.currentView)
            },
            handlePick (value, type) {
                const {selectionMode, panelDate} = this
                if (selectionMode === 'year') value = new Date(value.getFullYear(), 0, 1)
                else if (selectionMode === 'month') value = new Date(panelDate.getFullYear(), value.getMonth(), 1)
                else value = new Date(value)
                this.dates = [value]
                this.$emit('on-pick', value, false, type || selectionMode)
            }
        }
    }
</script>
