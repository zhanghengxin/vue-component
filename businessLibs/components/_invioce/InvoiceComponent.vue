<template>
    <div>
        <div v-if="invoiceType === 'normal'">
            <Invoice :InvoiceData='invoiceAllData'></Invoice>
        </div>
        <div v-if="invoiceType === 'car'">
            <InvoiceCar :InvoiceCarData='invoiceAllData'></InvoiceCar>
        </div>
        <div v-if="invoiceType === 'roll'">
            <InvoiceRoll :InvoiceRollData='invoiceAllData'></InvoiceRoll>
        </div>
        <div v-if="invoiceType === 'toll'">
            <InvoiceToll :InvoiceTollData='invoiceAllData'></InvoiceToll>
        </div>
    </div>
</template>

<script>
    import Invoice from '@/components/publics/_invioce/Invoice'
    import InvoiceCar from '@/components/publics/_invioce/InvoiceCar'
    import InvoiceRoll from '@/components/publics/_invioce/InvoiceRoll'
    import InvoiceToll from '@/components/publics/_invioce/InvoiceToll'

    export default {
        name: '',
        props: {
            invoiceData: {
                type: Object
            }
        },
        data() {
            return {
                invoiceAllData: {}
            }
        },
        mounted() {
            this.invoiceAllData = {}
        },
        beforeUpdate() {
            this.invoiceAllData = this.invoiceData
        },
        computed: {
            invoiceType() {
                let type = this.invoiceData.invoiceTypeCode
                if (type === '03') {
                    return 'car'
                } else if (type === '11') {
                    return 'roll'
                } else if (type === '14') {
                    return 'toll'
                } else {xw
                    return 'normal'
                }
            }
        },
        components: {
            Invoice, InvoiceCar, InvoiceRoll,InvoiceToll
        }
    }
</script>

<style scoped>

</style>