<template>
    <div>
        <button :class="btnclass" @click="change">
            <span :class="spanclass"></span>
        </button>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'lswitch'
export default {
    name: prefixCls,
    computed: {
        spanclass () {
            if (this.show === true) {
                return `${this.switchspan}`
            } else {
                return `${prefixCls}-spanblue`
            }
        },
        btnclass () {
            if (this.show === true) {
                return `${prefixCls}-spanbtndark`
            } else {
                return `${prefixCls}-spanbtnblue`
            }
        }
    },
    data () {
        return {
            show: true,
            switchspan: `${prefixCls}-spandrakstart`,
            prefixCls: prefixCls
        }
    },
    methods: {
        change () {
            this.show = !this.show
            this.switchspan = `${prefixCls}-spandrak`
            this.$emit('on-change', this.show)
        }
    }
}
</script>
