<template>
    <div :class="[prefixCls]" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper">
        <div :class="[prefixCls + '-rel']" ref="reference">
            <slot></slot>
        </div>
        <transition name="fade">
            <div
                v-transfer-dom
                :data-transfer="transfer"
                :class="[prefixCls + '-popper', prefixCls + '-' + theme]"
                ref="popper"
                v-show="!disabled && (visible || always)"
                @mouseenter="handleShowPopper"
                @mouseleave="handleClosePopper"
            >
                <div :class="[prefixCls + '-content']">
                    <div :class="[prefixCls + '-arrow']"></div>
                    <div :class="innerClasses" :style="innerStyles">
                        <slot name="content">{{ content }}</slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Popper from './popper'
import TransferDom from '../modal/directive/transfer-dom'
import { oneOf, prefix } from '../../utils/common'

const prefixCls = `${prefix}tooltip`

export default {
    name: prefixCls,
    directives: {TransferDom},
    mixins: [Popper],
    props: {
        placement: {
            validator (value) {
                return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'])
            },
            default: 'bottom'
        },
        content: {
            type: [String, Number],
            default: ''
        },
        delay: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        controlled: { // under this prop,Tooltip will not close when mouseleave
            type: Boolean,
            default: false
        },
        always: {
            type: Boolean,
            default: false
        },
        transfer: {
            type: Boolean,
            default () {
                return false
            }
        },
        theme: {
            validator (value) {
                return oneOf(value, ['dark', 'light'])
            },
            default: 'dark'
        },
        maxWidth: {
            type: [String, Number]
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            timeout: null
        }
    },
    computed: {
        innerClasses () {
            return [
                `${prefixCls}-inner`,
                {
                    [`${prefixCls}-inner-with-width`]: !!this.maxWidth
                }
            ]
        },
        innerStyles () {
            let style = {}
            if (this.maxWidth) style['max-width'] = `${this.maxWidth}px`
            return style
        }
    },
    methods: {
        handleShowPopper () {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
            }
            this.timeout = setTimeout(() => {
                this.visible = true
            }, this.delay)
        },
        handleClosePopper () {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
                if (!this.controlled) {
                    this.timeout = setTimeout(() => {
                        this.visible = false
                    }, 100)
                }
            }
        }
    },
    mounted () {
        if (this.always) {
            this.updatePopper()
        }
    }
}
</script>
