<script>
import Picker from '../Picker'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}datepicker`,
    mixins: [ Picker ],
    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        type: {
            type: String,
            default: 'date'
        }
    }
}
</script>
