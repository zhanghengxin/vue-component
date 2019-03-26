<script>
import Picker from '../Picker'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}datetimepicker`,
    mixins: [ Picker ],
    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD HH:mm:ss'
        },
        type: {
            type: String,
            default: 'datetime',
            validator (val) {
                return val === 'datetime'
            }
        }
    }
}
</script>
