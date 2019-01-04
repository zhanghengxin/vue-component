<template>
  <transition :name="fadeCls" @after-leave="afterLeave" @after-enter="afterEnter">
    <div :class="[noticeCls, prefixType]"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span :class="contentCls">{{content}}</span>
      <img :class="closeCls" src="./close.png" @click="handleClose" />
    </div>
  </transition>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'notice'
export default {
    name: prefixCls,
    props: {
        content: {
            type: String,
            required: true
        },
        btn: {
            type: String,
            default: '关闭'
        },
        type: {
            type: String,
            default: 'normal'
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            verticalOffset: 0,
            autoClose: 300000,
            height: 0,
            visible: false
        }
    },
    computed: {
        prefixType () {
            return this.prefixCls + '-' + this.type
        },
        fadeCls () {
            return `${prefixCls}-fade`
        },
        noticeCls () {
            return `${prefixCls}-notice`
        },
        contentCls () {
            return `${prefixCls}-content`
        },
        closeCls () {
            return `${prefixCls}-close`
        },
        style () {
            return {
                position: 'fixed',
                right: '20px',
                top: `${this.verticalOffset}px`
            }
        }
    },
    mounted () {
        this.createTimer()
    },
    methods: {
        handleClose (e) {
            e.preventDefault()
            this.$emit('close')
        },
        afterLeave () {
            this.$emit('closed')
        },
        createTimer () {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        afterEnter () {
            this.height = this.$el.offsetHeight
        }
    },
    beforeDestory () {
        this.clearTimer()
    }
}
</script>
