import Picker from '../Picker'
import DatePickerPanel from '../panel/Date/date'
import RangeDatePickerPanel from '../panel/Date/date-range'
import { oneOf, prefix } from '../../../utils/common'
const prefixCls = `${prefix}datepicker`

export default {
    name: prefixCls,
    mixins: [Picker],
    props: {
        type: {
            validator (value) {
                return oneOf(value, ['year', 'month', 'date', 'daterange', 'datetime', 'datetimerange'])
            },
            default: 'date'
        }
    },
    components: { DatePickerPanel, RangeDatePickerPanel },
    computed: {
        panel () {
            const isRange = this.type === 'daterange' || this.type === 'datetimerange'
            return isRange ? 'RangeDatePickerPanel' : 'DatePickerPanel'
        },
        ownPickerProps () {
            return this.options
        }
    }
}
