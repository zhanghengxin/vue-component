<template>
    <div>
        <div v-if="invoiceType === 'car'">
            <invoice-car :invoiceData='invoiceData'></invoice-car>
        </div>
    </div>
</template>

<script>
import InvoiceCar from './InvoiceCar'

export default {
    name: '',
    components: {
        InvoiceCar
    },
    props: {
        invoiceData: {
            type: Object
        }
    },
    data () {
        return {
            // invoiceAllData: {}
        }
    },
    computed: {
        invoiceType () {
            return 'car'
            let type = this.invoiceData.invoiceTypeCode
            if (type === '03') {
                return 'car'
            } else if (type === '11') {
                return 'roll'
            } else if (type === '14') {
                return 'toll'
            } else {
                return 'normal'
            }
        }
    }
}
</script>

<style>

</style>