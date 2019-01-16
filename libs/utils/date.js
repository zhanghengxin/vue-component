import fecha from './fecha'

export const isPlainObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isDateObject = function (value) {
    return value instanceof Date
}

export const isValidDate = function (date) {
    if (date === null || date === undefined) {
        return false
    }
    return !isNaN(new Date(date).getTime())
}

export const isValidRange = function (date) {
    return (
        Array.isArray(date) &&
        date.length === 2 &&
        isValidDate(date[0]) &&
        isValidDate(date[1]) &&
        (new Date(date[1]).getTime() >= new Date(date[0]).getTime())
    )
}

export const parseTime = function (time) {
    let values = time.split(':')
    if (values.length >= 2) {
        let hours = parseInt(values[0], 10)
        let minutes = parseInt(values[1], 10)
        return { hours, minutes }
    }
    return null
}

export const formatTime = function (time, type = '24', a = 'a') {
    let { hours, minutes } = time
    hours = (type === '24') ? hours : (hours % 12 || 12)
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    let result = hours + ':' + minutes
    if (type === '12') {
        let suffix = time.hours >= 12 ? '下午' : '上午'
        if (a === 'A') {
            suffix = suffix.toUpperCase()
        }
        result = `${result} ${suffix}`
    }
    return result
}

export const parseDate = function (str, format) {
    try {
        return fecha.parse(str, format)
    } catch (e) {
        return null
    }
}

export const formatDate = function (date, format) {
    try {
        return fecha.format(new Date(date), format)
    } catch (e) {
        return ''
    }
}

export const dateEqual = function (a, b) {
    return isDateObject(a) && isDateObject(b) && a.getTime() === b.getTime()
}

export const rangeEqual = function (a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((item, index) => dateEqual(item, b[index]))
}

export const transformDate = {
    date: {
        value2date: val => isValidDate(val) ? new Date(val) : null,
        date2value: date => date
    },
    timestamp: {
        value2date: val => isValidDate(val) ? new Date(val) : null,
        date2value: date => isValidDate(date) ? new Date(date).getTime() : null
    },
    formatdate: {
        value2date: parseDate,
        date2value: (date, format) => isValidDate(date) ? formatDate(date, format) : null
    }
}

export const transformRange = {
    date: {
        value2date: val => isValidRange(val) ? [new Date(val[0]), new Date(val[1])] : [null, null],
        date2value: date => date
    },
    timestamp: {
        value2date: val => isValidRange(val) ? [new Date(val[0]), new Date(val[1])] : [null, null],
        date2value: date => date.map(transformDate.timestamp.date2value)
    },
    formatdate: {
        value2date: (val, format) => {
            if (Array.isArray(val) && val.length === 2) {
                const start = parseDate(val[0], format)
                const end = parseDate(val[1], format)
                if (start && end && end >= start) {
                    return [start, end]
                }
            }
            return [null, null]
        },
        date2value: (date, format) => date.map(val => transformDate.formatdate.date2value(val, format))
    }
}

const pickers = ['今天', '昨天', '一周前']
export const shortcuts = [
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

const rangePickers = ['最近一周', '最近一个月', '最近三个月']
export const rangeShortcuts = [
    {
        text: rangePickers[0],
        onClick (self) {
            let _date = new Date()
            _date.setHours(0, 0, 0, 0)
            self.curVal = [ new Date(_date - 3600 * 1000 * 24 * 6), new Date(_date) ]
            self.updateDate(true)
        }
    },
    {
        text: rangePickers[1],
        onClick (self) {
            let _date = new Date()
            _date.setHours(0, 0, 0, 0)
            self.curVal = [ new Date(_date - 3600 * 1000 * 24 * 30), new Date(_date) ]
            self.updateDate(true)
        }
    },
    {
        text: rangePickers[2],
        onClick (self) {
            let _date = new Date()
            _date.setHours(0, 0, 0, 0)
            self.curVal = [ new Date(_date - 3600 * 1000 * 24 * 90), new Date(_date) ]
            self.updateDate(true)
        }
    }
]

export const placeholder = {
    time: ['请选择时间', '请选择时间范围'],
    datetime: ['请选择日期时间', '请选择日期时间范围'],
    year: ['请选择年份', '请选择年份范围'],
    month: ['请选择月份', '请选择月份范围'],
    date: ['请选择日期', '请选择日期范围']
}
