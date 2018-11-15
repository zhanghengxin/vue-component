<template>
  <div :class="btagoutclass" v-if="show">
    <span v-if="type" :class="btagdotclass"></span>
    <span>
         <slot></slot>
    </span>
     <b-icon  v-if="closeable" type="shibai1" @click.native='close'>
    </b-icon>
  </div>
</template>

<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'tag'
export default {
    name: prefixCls,
    props: {
        color: {
            type: String,
            default: ''
        },
        closeable: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        },
        backcolor: {
            type: String,
            default: ''
        }
    },
    computed: {
        btagdotclass () {
            return [`${prefixCls}-inner`, `${prefixCls}-${this.color}`]
        },
        btagoutclass () {
            return [`${prefixCls}`, `${prefixCls}-back-${this.backcolor}`]
        }
    },
    data () {
        return {
            show: true,
            prefixCls: prefixCls
        }
    },
    methods: {
        close () {
            this.show = false
            this.$emit('on-close')
        }
    }
}
</script>
