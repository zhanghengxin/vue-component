<template>
    <transition name="move-notice" @after-leave="afterLeave" @after-enter="afterEnter">
        <div
            v-show="visible"
            :class="[prefixCls+'-wrapper']">
            <div :class="noticeCls"
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
                <Icon :class="[prefixCls+'-close']" size='18' type='quxiao-guanbi-shanchu'
                      @on-click="handleClose"></Icon>
            </div>
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
            closed: false,
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
    watch: {
        closed (val) {
            this.visible = false
            this.$el.addEventListener('animationend', this.destroyElement)
        }
    },
    methods: {
        handleClose (e) {
            e.preventDefault()
            this.closed = true
            this.$emit('on-close')
        },
        afterLeave () {
            this.closed = true
            this.$emit('on-close')
        },
        createTimer () {
            if (this.duration && this.autoClose) {
                this.timer = setTimeout(() => {
                    this.closed = true
                }, this.duration * 1000)
            }
        },
        destroyElement () {
            this.$el.removeEventListener('transitionend', this.destroyElement)
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
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
