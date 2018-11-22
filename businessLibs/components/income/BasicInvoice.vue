<template>
    <div>
        <div v-if="invoiceType === 'car'">
            <invoice-car :invoiceData='invoiceData'></invoice-car>
        </div>
        <div v-if="invoiceType === 'normal'">
            <invoice-normal :invoiceData='invoiceData'></invoice-normal>
        </div>
        <div v-if="invoiceType === 'roll'">
            <invoice-roll :invoiceData='invoiceData'></invoice-roll>
        </div>
    </div>
</template>

<script>
import InvoiceCar from './invoice/InvoiceCar'
import InvoiceNormal from './invoice/InvoiceNormal'
import InvoiceRoll from './invoice/InvoiceRoll'

export default {
    name: 'BasicInvoice',
    components: {
        InvoiceCar, InvoiceNormal, InvoiceRoll
    },
    props: {
        invoiceData: {
            type: Object
        }
    },
    data () {
        return {}
    },
    computed: {
        invoiceType () {
            let type = this.invoiceData.invoiceTypeCode
            if (type === '03') {
                return 'car'
            } else if (type === '11') {
                return 'roll'
            } else {
                return 'normal'
            }
        }
    }
}
</script>

<style>

</style>