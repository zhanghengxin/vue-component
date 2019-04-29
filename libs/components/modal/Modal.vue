<template>
    <div v-transfer-dom :data-transfer="transfer">
        <transition :name="transitionNames[1]">
            <div :class="maskClasses" :style="wrapStyles" v-show="visible" v-if="showMask" @click="handleMask"></div>
        </transition>
        <div :class="wrapClasses" :style="wrapStyles" @click="handleWrapClick">
            <transition :name="transitionNames[0]" @after-leave="animationFinish">
                <div :class="classes" :style="mainStyles" v-show="visible">
                    <div :class="contentClasses" ref="content" :style="contentStyles">
                        <a :class="[prefixCls + '-close']" v-if="closable" @click="close">
                            <slot name="close">
                                <Icon type="quxiao-guanbi-shanchu"></Icon>
                            </slot>
                        </a>
                        <div :class="[prefixCls + '-header']" @mousedown="handleMoveStart" v-if="showHead">
                            <slot name="header">
                                <div :class="[prefixCls + '-header-inner']">{{ title }}</div>
                            </slot>
                        </div>
                        <div :class="[prefixCls + '-body']">
                            <slot></slot>
                        </div>
                        <div :class="[prefixCls + '-footer']" v-if="!footerHide">
                            <slot name="footer">
                                <Button @click.native="cancel">{{ localeCancelText }}</Button>
                                <Button type="primary" :loading="buttonLoading" @click.native="ok">{{ localeOkText }}</Button>
                            </slot>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import Button from '../button'
import Icon from '../icon'
import TransferDom from './directive/transfer-dom'
import { on, off } from '../../utils/dom'
import Scrollbar from './mixins/scrollbar'
import { prefix } from '../../utils/common'
import { existenceIndex as modalIndex, existenceIncrease as modalIncrease } from '../../utils/existence-queue'

const prefixCls = prefix + 'modal'

export default {
    name: prefixCls,
    mixins: [Scrollbar],
    components: {Button, Icon},
    directives: {TransferDom},
    props: {
        value: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        title: {
            type: String
        },
        width: {
            type: [Number, String],
            default: 520
        },
        okText: {
            type: String
        },
        cancelText: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object
        },
        className: {
            type: String
        },
        // for instance
        footerHide: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        transitionNames: {
            type: Array,
            default () {
                return ['ease', 'fade']
            }
        },
        transfer: {
            type: Boolean,
            default () {
                return true
            }
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        center: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: [Number, String],
            default () {
                return 1000
            }
        },
        mask: {
            type: Boolean,
            default: true
        },
        draggable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            wrapShow: false,
            showHead: true,
            buttonLoading: false,
            visible: this.value,
            dragData: {
                x: null,
                y: null,
                dragX: null,
                dragY: null,
                dragging: false
            },
            modalIndex: this.handleGetModalIndex()
        }
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}-wrap`,
                {
                    [`${prefixCls}-hidden`]: !this.wrapShow,
                    [`${prefixCls}-center`]: this.center,
                    [`${this.className}`]: !!this.className,
                    [`${prefixCls}-no-mask`]: !this.showMask
                }
            ]
        },
        maskClasses () {
            return `${prefixCls}-mask`
        },
        wrapStyles () {
            return {
                zIndex: this.modalIndex + this.zIndex
            }
        },
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-fullscreen`]: this.fullscreen,
                    [`${prefixCls}-fullscreen-no-header`]: this.fullscreen && !this.showHead,
                    [`${prefixCls}-fullscreen-no-footer`]: this.fullscreen && this.footerHide
                }
            ]
        },
        contentClasses () {
            return [
                `${prefixCls}-content`,
                {
                    [`${prefixCls}-content-no-mask`]: !this.showMask,
                    [`${prefixCls}-content-drag`]: this.draggable,
                    [`${prefixCls}-content-dragging`]: this.draggable && this.dragData.dragging
                }
            ]
        },
        mainStyles () {
            let style = {}

            const width = parseInt(this.width)
            const styleWidth = this.dragData.x !== null ? {
                top: 0
            } : {
                width: width <= 100 ? `${width}%` : `${width}px`
            }

            const customStyle = this.styles ? this.styles : {}

            Object.assign(style, styleWidth, customStyle)

            return style
        },
        contentStyles () {
            let style = {}

            if (this.draggable) {
                if (this.dragData.x !== null) style.left = `${this.dragData.x}px`
                if (this.dragData.y !== null) style.top = `${this.dragData.y}px`
                const width = parseInt(this.width)
                const styleWidth = {
                    width: width <= 100 ? `${width}%` : `${width}px`
                }

                Object.assign(style, styleWidth)
            }

            return style
        },
        localeOkText () {
            if (this.okText === undefined) {
                return '确定'
            } else {
                return this.okText
            }
        },
        localeCancelText () {
            if (this.cancelText === undefined) {
                return '取消'
            } else {
                return this.cancelText
            }
        },
        showMask () {
            return this.draggable ? false : this.mask
        }
    },
    methods: {
        close () {
            this.visible = false
            this.$emit('input', false)
            this.$emit('on-cancel')
        },
        handleMask () {
            if (this.maskClosable && this.showMask) {
                this.close()
            }
        },
        handleWrapClick (event) {
            // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
            const className = event.target.getAttribute('class')
            if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask()
        },
        cancel () {
            this.close()
        },
        ok () {
            if (this.loading) {
                this.buttonLoading = true
            } else {
                this.visible = false
                this.$emit('input', false)
            }
            this.$emit('on-ok')
        },
        EscClose (e) {
            if (this.visible && this.closable) {
                if (e.keyCode === 27) {
                    this.close()
                }
            }
        },
        animationFinish () {
            this.$emit('on-hidden')
        },
        handleMoveStart (event) {
            if (!this.draggable) return false

            const $content = this.$refs.content
            const rect = $content.getBoundingClientRect()
            this.dragData.x = rect.x
            this.dragData.y = rect.y

            const distance = {
                x: event.clientX,
                y: event.clientY
            }

            this.dragData.dragX = distance.x
            this.dragData.dragY = distance.y

            this.dragData.dragging = true

            on(window, 'mousemove', this.handleMoveMove)
            on(window, 'mouseup', this.handleMoveEnd)
        },
        handleMoveMove (event) {
            if (!this.dragData.dragging) return false

            const distance = {
                x: event.clientX,
                y: event.clientY
            }

            const diffDistance = {
                x: distance.x - this.dragData.dragX,
                y: distance.y - this.dragData.dragY
            }

            this.dragData.x += diffDistance.x
            this.dragData.y += diffDistance.y

            this.dragData.dragX = distance.x
            this.dragData.dragY = distance.y
        },
        handleGetModalIndex () {
            modalIncrease()
            return modalIndex
        },
        handleMoveEnd () {
            this.dragData.dragging = false
            off(window, 'mousemove', this.handleMoveMove)
            off(window, 'mouseup', this.handleMoveEnd)
        }
    },
    mounted () {
        if (this.visible) {
            this.wrapShow = true
        }

        let showHead = true

        if (this.$slots.header === undefined && !this.title) {
            showHead = false
        }

        this.showHead = showHead

        // ESC close
        document.addEventListener('keydown', this.EscClose)
    },
    beforeDestroy () {
        document.removeEventListener('keydown', this.EscClose)
        this.removeScrollEffect()
    },
    watch: {
        value (val) {
            this.visible = val
        },
        visible (val) {
            if (val === false) {
                this.buttonLoading = false
                this.timer = setTimeout(() => {
                    this.wrapShow = false
                    this.removeScrollEffect()
                }, 300)
                this.$emit('on-after-close')
            } else {
                if (this.timer) clearTimeout(this.timer)
                this.wrapShow = true
                if (!this.scrollable) {
                    this.addScrollEffect()
                }
            }
            this.$emit('on-visible-change', val)
        },
        loading (val) {
            if (!val) {
                this.buttonLoading = false
            }
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
