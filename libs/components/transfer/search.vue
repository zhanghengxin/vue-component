<template>
    <div :class="prefixCls">
        <b-input
            v-model="currentQuery"
            :size="size"
            :icon="iconCls"
            suffix
            :placeholder="placeholder"
            @on-click="handleClick">
        </b-input>
    </div>
</template>
<script>
import BInput from '../input/Input'
import { prefix, oneOf } from '../../utils/common'
const prefixCls = `${prefix}transfer-search`

export default {
    name: prefixCls,
    components: { BInput },
    props: {
        placeholder: String,
        query: String,
        size: {
            type: String,
            default: 'small',
            validator: val => {
                return oneOf(val, ['small', 'normal', 'large'])
            }
        }
    },
    data () {
        return {
            prefixCls,
            currentQuery: this.current
        }
    },
    computed: {
        iconCls () {
            return !this.query ? 'chaxun' : 'quxiao-guanbi-shanchu'
        }
    },
    watch: {
        query (val) {
            this.currentQuery = val
        },
        currentQuery (val) {
            this.$emit('on-query-change', val)
        }
    },
    methods: {
        handleClick () {
            if (!this.currentQuery) return
            this.currentQuery = ''
            this.$emit('on-query-clear')
        }
    }
}
</script>
