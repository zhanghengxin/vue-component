<template>
    <transition name="move-notice" @after-leave="afterLeave" @after-enter="afterEnter">
        <div :class="noticeCls"
             :style="style"
             v-show="visible"
             @mouseenter="clearTimer"
             @mouseleave="createTimer"
        >
            <div :class="[noticeCls[1]+'-icon']">
                <Icon v-if="iconShow" size="32" :type='iconType'></Icon>
            </div>
            <div :class="[prefixCls+'-body']">
                <div :class="[prefixCls+'-body-title']">{{title}}</div>
                <span :class="[prefixCls+'-body-content']">{{content||desc}}</span>
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
        desc: {
            type: [String, Number]
        },
        title: {
            type: [String, Number]
        },
        type: {
            type: String,
            default: 'info',
            validator: function (value) {
                return oneOf(value, ['error', 'info', 'warning', 'success'])
            }
        },
        autoClose: {
            type: Boolean,
            default: true
        },
        duration: {
            type: [String, Number],
            default: 3
        },
        iconShow: {
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
                info: 'xinxi-yiban-mian',
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
            this.$emit('on-close')
        },
        afterLeave () {
            this.$emit('on-close')
        },
        createTimer () {
            if (this.duration && this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.duration * 1000)
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
