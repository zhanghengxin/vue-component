/**
 * Created by zhangliming on 2018/9/15.
 *
 */

<template>
    <transition name="b-message-fade" mode="in-out">
        <div
            v-show="show"
            class="b-message-wrapper"
            :style="{ zIndex: zIndex }">
            <div
                class="b-message"
                @mouseenter="enter"
                @mouseleave="leave">
                <b-icon
                    v-if="imgSrc"
                    class="b-message-img"
                    :color="fsColor"
                    :type="imgSrc">
                 </b-icon>
                {{message}}
                <button
                    v-if="showClose"
                    class="b-message-close"
                    @click="close">
                    ×
                </button>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'b-message',
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
            showClose: false
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
                info: '#0079CC',
                error: '#f44336',
                success: '#1fca74',
                warning: '#ff8f00'
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
