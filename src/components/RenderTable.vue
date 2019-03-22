<template>
    <b-table
        class="expend-table"
        :border="border"
        :columns='columns'
        disHover
        :stripe='stripe'
        :show-header="showHeader"
        :data='data'>
    </b-table>
</template>

<script>
export default {
    name: 'render-table',
    data () {
        return {
            showHeader: false
        }
    },
    props: {
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        border: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        }
    }
}
</script>
