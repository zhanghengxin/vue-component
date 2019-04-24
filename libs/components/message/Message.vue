/**
* Created by zhangliming on 2018/9/15.
*
*/

<template>
    <transition :name="prefixCls+'-fade'" mode="in-out">
        <div
            v-show="show"
            :class="[prefixCls+'-wrapper']"
            :style="{ zIndex: zIndex }">
            <div
                :class="[prefixCls]"
                @mouseenter="enter"
                @mouseleave="leave">
                <Icon
                    v-if="imgSrc"
                    :class="[prefixCls+'-img',fsColor]"
                    :type="imgSrc">
                </Icon>
                <span :class="[prefixCls+'-content']" v-html="message || content"></span>
                <span :class="[prefixCls+'-content']">
                    <render-cell :render="renderFunc"></render-cell>
                </span>
                <button
                    v-if="showClose"
                    :class="[prefixCls+'-close']"
                    @click="close">
                    ×
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
import renderCell from './render'
import { prefix } from '../../utils/common'
import Icon from '../icon'

const prefixCls = prefix + 'message'
export default {
    name: prefixCls,
    components: {Icon, renderCell},
    data () {
        return {
            show: false,
            timer: null,
            zIndex: 1800,
            closed: false,
            closeImg: '',
            onClose: null,
            message: '',
            content: '',
            type: 'info',
            duration: 3,
            showClose: false,
            prefixCls,
            render: function () {}
        }
    },
    computed: {
        imgSrc () {
            let img = {
                info: 'xinxi-yiban',
                error: 'shibai',
                success: 'chenggong',
                warning: 'yichang'
            }
            return img[this.type]
        },
        fsColor () {
            let colors = {
                info: prefixCls + '-info',
                error: prefixCls + '-error',
                success: prefixCls + '-success',
                warning: prefixCls + '-warning'
            }
            return colors[this.type]
        },
        renderFunc () {
            return this.render || function () {}
        }
    },
    mounted () {
        this.enter()
        if (this.duration <= 0) {
            this.showClose = true
        }
    },
    watch: {
        closed (val) {
            this.show = false
            this.$el.addEventListener('animationend', this.destroyElement)
        }
    },
    methods: {
        close () {
            this.closed = true
            if (typeof this.onClose === 'function') {
                this.onClose(this)
            }
        },
        destroyElement () {
            this.$el.removeEventListener('transitionend', this.destroyElement)
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
        enter () {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close()
                }
            }, this.duration * 1000)
        },
        leave () {
            clearTimeout(this.timer)
        }
    }
}
</script>
