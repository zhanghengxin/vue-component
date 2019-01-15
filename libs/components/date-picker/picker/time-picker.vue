<script>
import Picker from '../Picker'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}timepicker`,
    mixins: [ Picker ],
    props: {
        format: {
            type: String,
            default: 'HH:mm:ss'
        },
        type: {
            type: String,
            default: 'time'
        }
    }
}
</script>
