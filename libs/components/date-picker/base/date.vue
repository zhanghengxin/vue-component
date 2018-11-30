<template>
    <div :class="wrapperCls">
        <thead>
            <th
                :class="headerCls"
                :key="index"
                v-for="(day, index) in getDays(firstDayOfWeek)">
                {{ day }}
            </th>
        </thead>
        <tbody>
            <tr
                :key="i"
                v-for="(week, i) in 6">
                <td
                    class="cell"
                    :key="index"
                    v-for="(date, index) in getDates(year, month, firstDayOfWeek).slice(7 * i, 7 * i + 7)"
                    :title="getCellTitle(date)"
                    :class="[bodyCls, getCellClasses(date)]"
                    @click="selectDate(date)">
                    {{ date.day }}
                </td>
            </tr>
        </tbody>
    </div>
</template>

<script>
import { formatDate } from '../../../utils/date'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}table-date`,
    props: {
        value: null,
        startAt: null,
        endAt: null,
        dateFormat: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        month: {
            default: new Date().getMonth()
        },
        year: {
            default: new Date().getFullYear()
        },
        firstDayOfWeek: {
            type: Number,
            default: 7,
            validator: val => val >= 1 && val <= 7
        },
        disabledDate: {
            type: Function,
            default: () => {
                return false
            }
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefix}panel`,
                `${prefix}panel-date`
            ]
        },
        headerCls () {
            return `${prefix}date-header`
        },
        bodyCls () {
            return `${prefix}date-body`
        }
    },
    methods: {
        selectDate ({ year, month, day }) {
            let date = new Date(year, month, day)
            if (!this.disabledDate(date)) {
                this.$emit('select', date)
            }
        },
        getDays (firstDayOfWeek) {
            let days = ['日', '一', '二', '三', '四', '五', '六']
            let firstDay = parseInt(firstDayOfWeek, 10)
            return days.concat(days).slice(firstDay, firstDay + 7)
        },
        getDates (year, month, firstDayOfWeek) {
            let arr = []
            let time = new Date(year, month)

            time.setDate(0) // 把时间切换到上个月最后一天
            let lastMonthLength = (time.getDay() + 7 - firstDayOfWeek) % 7 + 1 // time.getDay() 0是星期天, 1是星期一 ...
            let lastMonthfirst = time.getDate() - (lastMonthLength - 1)
            for (let i = 0; i < lastMonthLength; i++) {
                arr.push({ year, month: month - 1, day: lastMonthfirst + i })
            }

            time.setMonth(time.getMonth() + 2, 0) // 切换到这个月最后一天
            let curMonthLength = time.getDate()
            for (let i = 0; i < curMonthLength; i++) {
                arr.push({ year, month, day: 1 + i })
            }

            time.setMonth(time.getMonth() + 1, 1) // 切换到下个月第一天
            let nextMonthLength = 42 - (lastMonthLength + curMonthLength)
            for (let i = 0; i < nextMonthLength; i++) {
                arr.push({ year, month: month + 1, day: 1 + i })
            }

            return arr
        },
        getCellClasses ({ year, month, day }) {
            let classes = []
            let cellTime = new Date(year, month, day).getTime()
            let today = new Date().setHours(0, 0, 0, 0)
            let curTime = this.value && new Date(this.value).setHours(0, 0, 0, 0)
            let startTime = this.startAt && new Date(this.startAt).setHours(0, 0, 0, 0)
            let endTime = this.endAt && new Date(this.endAt).setHours(0, 0, 0, 0)

            if (month < this.month) {
                classes.push('last-month')
            } else if (month > this.month) {
                classes.push('next-month')
            } else {
                classes.push('cur-month')
            }

            if (cellTime === today) {
                classes.push('today')
            }

            if (this.disabledDate(cellTime)) {
                classes.push('disabled')
            }

            if (curTime) {
                if (cellTime === curTime) {
                    classes.push('actived')
                } else if (startTime && cellTime <= curTime) {
                    classes.push('inrange')
                } else if (endTime && cellTime >= curTime) {
                    classes.push('inrange')
                }
            }

            // console.log('classes', classes)
            return classes
        },
        getCellTitle ({ year, month, day }) {
            return formatDate(new Date(year, month, day), this.dateFormat)
        }
    }
}
</script>
