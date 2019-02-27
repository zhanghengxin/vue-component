import TimePicker from '../date-picker/picker/time-picker.vue'

TimePicker.install = function (Vue) {
    Vue.component(TimePicker.name, TimePicker)
}

export default TimePicker
