<template>
        <!-- <div
            s-if="Array.isArray(pickers) && pickers.length"
            :class="timeCls" >
            <ul
                :class="timeListCls"
                :key="index"
                v-for="(picker, index) in pickers">
                <li
                    :class="timeItemCls(picker)"
                    @click="pickerTime(picker)">
                    {{ picker.label }}
                </li>
            </ul>
        </div> -->
    <div :class="wrapperCls">
        <ul
            :class="timeListCls"
            :style="timeListStyle">
            <!-- 时 -->
            <li
                :key="i + 'hour'"
                :class="hourCls(i)"
                v-for="(_, i) in 24"
                @click="selectTime(new Date(date).setHours(i))">
                {{ stringifyText(i) }}
            </li>
        </ul>
        <ul
            :class="timeListCls"
            :style="timeListStyle">
            <!-- 分 -->
            <li
                :key="i + 'minute'"
                :class="minuteCls(i)"
                v-for="(_, i) in stepLength"
                @click="selectTime(new Date(date).setMinutes(i * step))">
                {{ stringifyText(i * step) }}
            </li>
        </ul>
        <ul
            :class="timeListCls"
            :style="timeListStyle">
            <!-- 秒 -->
            <li
                v-if="minuteStep === 0"
                :key="i + 'seconde'"
                :class="secondCls(i)"
                v-for="(_, i) in 60"
                @click="selectTime(new Date(date).setSeconds(i))">
                {{ stringifyText(i) }}
            </li>
        </ul>
    </div>
</template>
<script>
import { formatTime, parseTime } from '../../../utils/date'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}table-time`,
    props: {
        value: null,
        disabledTime: {
            type: Function,
            default: () => {
                return false
            }
        },
        timePickerOptions: {
            type: [Object, Function],
            default: () => {
                return null
            }
        },
        minuteStep: {
            type: Number,
            default: 0,
            validator: val => val >= 0 && val <= 60
        },
        timeType: {
            type: Array,
            default: () => {
                return ['24', 'a']
            }
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefix}panel`,
                `${prefix}panel-time`
            ]
        },
        timeCls () {
            return [
                `${prefix}panel`,
                `${prefix}panel-time`
            ]
        },
        timeListCls () {
            return [`${prefix}time-list`]
        },
        timeListStyle () {
            return {
                width: 100 / this.times + '%'
            }
        },
        timeItemCls (picker) {
            let { hours, minutes } = picker.value
            let time = new Date(this.date).setHours(hours, minutes, 0)
            return [
                `${prefix}time-picker-item`,
                'cell',
                {
                    actived: hours === this.curHours && minutes === this.curMinutes,
                    disabled: this.disabledTime && this.disabledTime(time)
                }
            ]
        },
        curHours () {
            return this.value ? new Date(this.value).getHours() : 0
        },
        curMinutes () {
            return this.value ? new Date(this.value).getMinutes() : 0
        },
        step () {
            return this.minuteStep || 1
        },
        stepLength () {
            return parseInt(60 / this.step, 10)
        },
        curSeconds () {
            return this.value ? new Date(this.value).getSeconds() : 0
        },
        date () {
            return new Date(this.value)
        },
        times () {
            return this.minuteStep === 0 ? 3 : 2
        },
        pickers () {
            return this.getTimeSelectOptions()
        }
    },
    methods: {
        hourCls (i) {
            let time = new Date(this.date).setHours(i)
            return [
                'cell',
                {
                    actived: i === this.curHours,
                    disabled: this.disabledTime && this.disabledTime(time)
                }
            ]
        },
        minuteCls (i) {
            let value = i * this.step
            let time = new Date(this.date).setMinutes(value)
            return [
                'cell',
                {
                    actived: value === this.curMinutes,
                    disabled: this.disabledTime && this.disabledTime(time)
                }
            ]
        },
        secondCls (i) {
            let time = new Date(this.date).setSeconds(i)
            return [
                'cell',
                {
                    actived: i === this.curSeconds,
                    disabled: this.disabledTime && this.disabledTime(time)
                }
            ]
        },
        stringifyText (value) {
            return ('00' + value).slice(String(value).length)
        },
        selectTime (time) {
            if (!this.disabledTime(time)) {
                this.$emit('select', new Date(time))
            }
        },
        pickTime (picker) {
            let { hours, minutes } = picker.value
            let time = new Date(this.date).setHours(hours, minutes, 0)
            if (!this.disabledTime(time)) {
                this.$emit('pick', new Date(time))
            }
        },
        getTimeSelectOptions () {
            let result = []
            let options = this.timePickerOptions

            if (!options) {
                return []
            }

            if (typeof options === 'function') {
                return options() || []
            }

            let { start, end, step } = options
            start = parseTime(start)
            end = parseTime(end)
            step = parseTime(step)

            if (start && end && step) {
                let startMinutes = start.minutes + start.hours * 60
                let endMinutes = end.minutes + end.hours * 60
                let stepMinutes = step.minutes + step.hours * 60
                let len = Math.floor((endMinutes - startMinutes) / stepMinutes)
                for (let i = 0; i <= len; i++) {
                    let timeMinutes = startMinutes + i * stepMinutes
                    let hours = Math.floor(timeMinutes / 60)
                    let minutes = timeMinutes % 60
                    let value = { hours, minutes }
                    result.push({
                        value,
                        label: formatTime(value, ...this.timeType)
                    })
                }
            }
            return result
        }
    }
}
</script>
