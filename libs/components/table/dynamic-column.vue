<template>
    <ul :class="[preCls + '-dynamic-column']">
        <li :class="[preCls + '-dynamic-column-item']" v-for="(column,index) in columns" :key="index">
            <Checkbox
                :value="column._visible"
                manual-change
                @click.native.prevent="handleClick(column._index,column._visible)"
            >
            </Checkbox>
            <span>{{column.title}}</span>
        </li>
    </ul>
</template>

<script>
import Checkbox from '../checkbox/Checkbox.vue'

export default {
    name: 'dynamic-column',
    components: {Checkbox},
    data () {
        return {
            name: true
        }
    },
    props: {
        columns: Array,
        preCls: String
    },
    methods: {
        handleClick (index, status) {
            this.$parent.dynamicOrder(index, status)
        }
    }
}
</script>

<style scoped>

</style>
