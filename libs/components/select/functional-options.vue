<script>
    export default {
        props: {
            slotOptions: {
                type: Array,
                default: undefined
            },
            slotUpdateHook: {
                type: Function,
                default: () => {}
            }
        },
        functional: true,
        render (h, {props, parent}) {
            if (props.slotOptions !== parent.$slots.default) props.slotUpdateHook()
            return props.options
        }
    }
</script>
