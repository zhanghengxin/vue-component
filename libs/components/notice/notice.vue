<template>
  <transition :name="prefixCls+'-fade'" @after-leave="afterLeave" @after-enter="afterEnter">
    <div :class="noticeCls"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
        <div :class="[noticeCls[1]+'-icon']">
            <Icon v-if="iconVisible" size="32" :type='iconType'></Icon>
        </div>
        <div :class="[prefixCls+'-body']">
            <div :class="[prefixCls+'-body-title']">{{title}}</div>
            <span :class="[prefixCls+'-body-content']">{{content}}</span>
        </div>
        <Icon :class="[prefixCls+'-close']" size='18' type='quxiao-guanbi-shanchu' @on-click="handleClose"></Icon>
    </div>
  </transition>
</template>
<script>
import Icon from '../icon'
import { prefix, oneOf } from '../../utils/common'
const prefixCls = prefix + 'notice'
export default {
    name: prefixCls,
    components: {Icon},
    props: {
        content: {
            type: [String, Number]
        },
        title: {
            type: [String, Number]
        },
        type: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return oneOf(value, ['error', 'normal', 'warning', 'success'])
            }
        },
        autoClose: {
            type: Boolean,
            default: true
        },
        duration: {
            type: [String, Number],
            default: 3000
        },
        iconVisible: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            verticalOffset: 0,
            height: 0,
            visible: false
        }
    },
    computed: {
        noticeCls () {
            return [
                `${prefixCls}`,
                `${this.prefixCls}-${this.type}`
            ]
        },
        style () {
            return {
                position: 'fixed',
                right: '20px',
                top: `${this.verticalOffset}px`
            }
        },
        iconType () {
            const iconType = {
                warning: 'yichang-mian',
                normal: 'xinxi-yiban-mian',
                error: 'shibai-mian',
                success: 'chenggong-mian'
            }
            return iconType[this.type]
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
            if (this.duration && this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.duration)
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
