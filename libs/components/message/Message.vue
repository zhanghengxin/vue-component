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
                <b-icon
                    v-if="imgSrc"
                    :class="[prefixCls+'-img',fsColor]"
                    :type="imgSrc">
                </b-icon>
                {{message}}
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
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'message'
export default {
    name: prefixCls,
    data () {
        return {
            show: false,
            timer: null,
            zIndex: 80,
            closed: false,
            closeImg: '',
            onClose: null,
            message: '',
            type: 'info',
            duration: 3000,
            showClose: false,
            prefixCls
        }
    },
    computed: {
        imgSrc () {
            let img = {
                info: 'yiban',
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
            }, this.duration)
        },
        leave () {
            clearTimeout(this.timer)
        }
    }
}
</script>
