import DatePicker from './picker/date-picker'

DatePicker.install = function (Vue) {
    Vue.component(DatePicker.name, DatePicker)
}

export default DatePicker
