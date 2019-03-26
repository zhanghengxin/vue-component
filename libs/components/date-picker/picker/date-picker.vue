<script>
import Picker from '../Picker'
import { prefix, oneOf } from '../../../utils/common'

export default {
    name: `${prefix}datepicker`,
    mixins: [ Picker ],
    props: {
        type: {
            type: String,
            default: 'date',
            validator (val) {
                return oneOf(val, ['date', 'year', 'month', 'time', 'datetime'])
            }
        },
        format: {
            type: String,
            default () {
                const type = {
                    date: 'YYYY-MM-DD',
                    year: 'YYYY',
                    month: 'YYYY-MM',
                    time: 'HH:mm:ss',
                    datetime: 'YYYY-MM-DD HH:mm:ss'
                }
                const innerType = String(this.type).toLowerCase()
                return type[innerType]
            }
        }
    }
}
</script>
