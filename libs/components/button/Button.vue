/**
* Created by lijiahang on 2018/9/5.
*
*/
<template>
    <button ref="button"
    :disabled="disabled"
    @click='BwButtonclick($event)'
    :class="bclass"
    >
      <i v-if='loading' class="iconfont icon-loading">
      </i>
      <b-icon v-if="icon" :type="iclass">
      </b-icon>
      <span>
      <slot></slot>
      </span>
    </button>
</template>

<script>
export default {
    name: 'bButton',
    computed: {
        iclass () {
            return `${this.icon}`
        },
        bclass () {
            let style = {}
            let style1 = {}
            if (this.size) {
                style1 = `b-btn-${this.size}`
            }
            true ? style + '' : style
            if (this.type) {
                style = `${style1} b-btn-${this.type} `
            }
            if (this.round) {
                style = `b-btn-${this.type} ${style1} b-btn-round`
            }
            if (this.circle) {
                style = `b-btn-${this.type} ${style1} b-btn-circle`
            }
            if (this.icon) {
                style = `b-btn-${this.type} ${style1} b-btn-circle`
            }
            if (this.disabled) {
                style = `b-btn-${this.type} ${style1} b-btn-disabled`
            }
            if (this.plain) {
                style = `b-btn-${this.type} ${style1} b-btn-plain`
            }
            if (this.plain && this.round) {
                style = `b-btn-${this.type} ${style1} b-btn-plain b-btn-round`
            }
            if (this.icon && this.disabled) {
                style = `b-btn-${this.type} ${style1} b-btn-circle b-btn-disabled`
            }
            if (this.icon && this.plain) {
                style = `b-btn-${this.type} ${style1} b-btn-circle b-btn-plain`
            }
            if (this.circle && this.disabled) {
                style = `b-btn-${this.type} ${style1} b-btn-circle b-btn-disabled`
            }
            if (this.circle && this.plain) {
                style = `b-btn-${this.type} ${style1} b-btn-circle b-btn-plain`
            }
            if (this.plain && this.disabled) {
                style = `b-btn-${this.type} ${style1} b-btn-plain b-btn-disabled`
            }
            if (this.round && this.disabled) {
                style = `b-btn-${this.type} ${style1} b-btn-round b-btn-disabled`
            }
            if (this.round && this.disabled && this.plain) {
                style = `b-btn-${this.type} ${style1} b-btn-round b-btn-disabled b-btn-plain`
            }
            return style
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'normal'
        },
        type: {
            type: String,
            default: 'typrimary'
        },
        round: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    mounted () {
        // 是否需要不可点击？
        if (this.loading) {
            // this.disabled = true
        }
    },
    methods: {
        BwButtonclick (e) {
            this.$emit('on-click', e)
        }
    }
}
</script>
