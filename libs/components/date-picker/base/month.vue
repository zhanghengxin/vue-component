<template>
    <div :class="wrapperCls">
        <span
            :key="i"
            v-for="(month, i) in months"
            class="cell"
            :class="{ actived: curYear === year && curMonth === i, disabled: isDisabled(i) }"
            @click="selectMonth(i)">
            {{ month }}
        </span>
    </div>
</template>

<script>
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}table-month`,
    data () {
        return {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    },
    props: {
        value: null,
        year: {
            default: new Date().getFullYear()
        },
        disabledMonth: {
            type: Function,
            default: () => {
                return false
            }
        }
    },
    computed: {
        wrapperCls () {
            return [`${prefix}panel`, `${prefix}panel-month`]
        },
        curYear () {
            return this.value && new Date(this.value).getFullYear()
        },
        curMonth () {
            return this.value && new Date(this.value).getMonth()
        }
    },
    methods: {
        isDisabled (month) {
            return !!this.disabledMonth(month)
        },
        selectMonth (month) {
            if (!this.disabledMonth(month)) {
                this.$emit('select', month)
            }
        }
    }
}
</script>
