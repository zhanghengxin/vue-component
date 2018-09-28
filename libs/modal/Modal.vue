<template>
    <div :class="[prefixCls + '-container']">
        <transition :name="transitionNames[1]">
            <div :class="maskClass" :style="{'z-index': zIndex}" v-show="visible" v-if="showMask" @click="handleMask"></div>
        </transition>
        <div :class="wrapClass" :style="{'z-index': zIndex}" @click="handleWrap">
            <transition :name="transitionNames[0]">
                <div :class="modalClass" :style="mainStyles" v-show="visible">
                    <div :class="contentClass" ref="content" :style="contentStyles">
                        <a :class="[prefixCls + '-close']" v-if="closable" @click="close">
                            <slot name="close">
                                <b-icon type="ios-close"></b-icon>
                            </slot>
                        </a>
                        <div :class="[prefixCls + '-header']" @mousedown="handleMoveStart" v-if="showHead">
                            <slot name="header">
                                <div :class="[prefixCls + '-header-inner']">{{ title }}</div>
                            </slot>
                        </div>
                        <div :class="[prefixCls + '-body']"><slot></slot></div>
                        <div :class="[prefixCls + '-footer']" v-if="!footerHide">
                            <slot name="footer">
                                <b-button type="text" @click.native="cancel">{{ localeCancelText }}</b-button>
                                <b-button type="primary" :loading="okLoading" @click.native="ok">{{ localeOkText }}</b-button>
                            </slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

import BButton from '../button'
// import BIcon from '../icon'
import { ModalDefaultProps } from './util'
import Scrollbar from './mixins/scrollbar'

const prefixCls = 'bw-modal'

export default {
    name: 'BModal',
    props: {
        ...ModalDefaultProps()
    },
    components: {
        // BIcon,
        BButton
    },
    mixins: [ Scrollbar ],
    computed: {
        maskClass () {
            return `${prefixCls}-mask`
        },
        wrapClass () {
            return [
                `${prefixCls}-wrap`,
                {
                    [`${prefixCls}-hidden`]: !this.wrapShow,
                    [`${this.className}`]: !!this.className,
                    [`${prefixCls}-no-mask`]: !this.showMask,
                    [`${prefixCls}-center`]: this.center
                }
            ]
        },
        modalClass () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-fullscreen`]: this.fullscreen,
                    [`${prefixCls}-fullscreen-no-header`]: this.fullscreen && !this.showHead,
                    [`${prefixCls}-fullscreen-no-footer`]: this.fullscreen && this.footerHide
                }
            ]
        },
        contentClass () {
            return [
                `${prefixCls}-content`,
                {
                    [`${prefixCls}-content-no-mask`]: !this.showMask,
                    // [`${prefixCls}-content-drag`]: this.draggable,
                    // [`${prefixCls}-content-dragging`]: this.draggable && this.dragData.dragging
                }
            ]
        },
        // modal 主 样式
        mainStyles () {
            let style = {}

            const width = parseInt(this.width)
            // const styleWidth = this.dragData.x !== null ? {
            //     top: 0
            // } : {
            //     width: width <= 100 ? `${width}%` : `${width}px`
            // }

            const customStyle = this.styles ? this.styles : {}
            Object.assign(style, customStyle)

            return style
        },
        contentStyles () {
            let style = {}
            return style
        },
        // 确定按钮 文字
        localeOkText () {
            if (this.okText === undefined) {
                return '确定'
            } else {
                return this.okText
            }
        },
        // 取消按钮 文字
        localeCancelText () {
            if (this.cancelText === undefined) {
                return '取消'
            } else {
                return this.cancelText
            }
        },
        // 展示 遮罩层
        showMask () {
            return this.draggable ? false : this.mask
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            wrapShow: false, // modal wrap
            visible: this.value, // modal show
            showHead: true,
            okLoading: false
        }
    },
    mounted () {
        if (visible) {
            this.wrapShow = true
        }

        if (this.$slots.header === undefined && !this.title) {
            this.showHead = false;
        }

        // 挂载到 body 下
        if (this.appendToBody) {
            document.body.appendChild(this.$el);
        }

        // esc close
        document.addEventListener('keydown', this.escClose)
    },
    beforeDestroy () {
        if (this.destoryed) {
            this.destoryModal()
        }
        document.removeEventListener('keydown', this.escClose)
    },
    methods: {
        close () {
            this.wrapShow = false
            this.visible = false
            // modal 关闭后需要执行的回调
            this.$emit('on-after-close')
        },
        handleMask () {
            if (this.maskClosable && this.showMask) {
                this.close()
            }
        },
        handleWrap (event) {
            const className = event.target.getAttribute('class')
            if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask()
        },
        handleMoveStart () {},
        cancel () {
            this.close()
        },
        ok () {
            if (!this.loading) {
                this.visible = false
            }
            // modal 点击确定后的 回调
            this.$emit('on-ok')
        },
        escClose (e) {
            if (this.visible && this.closable) {
                if (e.keyCode === 27) {
                    this.close()
                }
            }
        },
        destoryModal () {
            if (this.$el && this.$el.parentNode) {
                this.$destory()
                this.$el.parentNode.removeChild(this.$el)
            }
        }
    },
    watch: {
        value (val) {
            this.visible = val
        },
        visible (val) {
            this.wrapShow = val

            if (!val) {
                this.okLoading = false
            } else {
                // 挂载到 body 下
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            }

            this.$emit('on-visible-change', val)
        },
        loading (val) {
            this.okLoading = val
        },
        scrollable (val) {
            if (!val) {
                this.addScrollEffect()
            } else {
                this.removeScrollEffect()
            }
        },
        title (val) {
            if (this.$slots.header === undefined) {
                this.showHead = !!val
            }
        }
    }
}
</script>

<style scoped>

</style>
