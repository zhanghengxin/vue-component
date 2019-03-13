<template>
    <div :class="wrapperCls">
        <span
            :key="i"
            v-for="(_, i) in 10"
            class="cell"
            :class="{ actived: curYear === startYear + i, disabled: isDisabled(startYear + i) }"
            @click="selectYear(startYear + i)">
            {{ startYear + i }}
        </span>
    </div>
</template>

<script>
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}table-year`,
    props: {
        value: null,
        firstYear: Number,
        disabledYear: {
            type: Function,
            default: () => {
                return false
            }
        }
    },
    computed: {
        wrapperCls () {
            return [`${prefix}panel`, `${prefix}panel-year`]
        },
        startYear () {
            return Math.floor(this.firstYear / 10) * 10
        },
        curYear () {
            return new Date(this.value || new Date()).getFullYear()
        }
    },
    methods: {
        isDisabled (year) {
            return !!this.disabledYear(year)
        },
        selectYear (year) {
            if (!this.isDisabled(year)) {
                this.$parent.changeSplitYear(year)
                this.$emit('select', year)
            }
        }
    }
}
</script>
