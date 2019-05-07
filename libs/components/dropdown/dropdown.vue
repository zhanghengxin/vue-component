<template>
    <div
        :class="[prefixCls]"
        v-click-outside="onClickoutside"
        @mouseenter='handleMouseenter'
        @mouseleave='handleMouseleave'
        >
        <div
            ref='reference'
            @click='handleClick'
            @contextmenu.prevent="handleRightClick">
            <slot></slot>
        </div>
        <transition name="slide">
            <Drop
                ref='drop'
                v-show='currentShow'
                :placement='placement'
                :class='dropTransferCls'
                @mouseenter.native='handleMouseenter'
                @mouseleave.native='handleMouseleave'
                :data-transfer="transfer"
                :transfer="transfer"
                v-transfer-dom>
                <slot name="list"></slot>
            </Drop>
        </transition>
    </div>
</template>

<script>
import Drop from '../select/Dropdown'
import clickOutside from '../../utils/directives/clickOutside'
import TransferDom from '../../utils/directives/transfer-dom'
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/assist'
import { prefix } from '../../utils/common'
const prefixCls = prefix + 'dropdown'

export default {
    name: prefixCls,
    directives: { clickOutside, TransferDom },
    mixins: [ Emitter ],
    components: { Drop },
    data () {
        return {
            prefixCls,
            currentShow: this.show
        }
    },
    props: {
        trigger: {
            validator (value) {
                return ['click', 'hover', 'custom', 'contextMenu'].indexOf(value) !== -1
            },
            default: 'hover'
        },
        placement: {
            validator (value) {
                return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(value) !== -1
            },
            default: 'bottom'
        },
        show: {
            type: Boolean,
            default: false
        },
        transfer: {
            type: Boolean,
            default: false
        }
    },
     computed: {
        dropTransferCls () {
            return {
                [prefix + 'drop-transfer']: this.transfer
            }
        }
    },
    watch: {
        show (val) {
            this.currentShow = val
        },
        currentShow (val) {
            if (val) {
                this.$refs.drop.update()
            } else {
                this.$refs.drop.destroy()
            }
            this.$emit('on-visible-change', val)
        }
    },
    methods: {
        handleClick () {
            if (this.trigger === 'custom') return false
            if (this.trigger !== 'click') {
                return false
            }
            this.currentShow = !this.currentShow
        },
        handleRightClick () {
            if (this.trigger === 'custom') return false
            if (this.trigger !== 'contextMenu') {
                return false
            }
            this.currentShow = !this.currentShow
        },
        handleMouseenter () {
            if (this.trigger === 'custom') return false
            if (this.trigger !== 'hover') {
                return false
            }
            if (this.timeout) clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.currentShow = true
            }, 250)
        },
        handleMouseleave () {
            if (this.trigger === 'custom') return false
            if (this.trigger !== 'hover') {
                return false
            }
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.currentShow = false
                }, 150)
            }
        },
        onClickoutside (e) {
            this.handleClose()
            this.handleRightClose()
            if (this.currentShow) this.$emit('on-clickoutside', e)
        },
        handleClose () {
            if (this.trigger === 'custom') return false
            if (this.trigger !== 'click') {
                return false
            }
            this.currentShow = false
        },
        handleRightClose () {
            if (this.trigger === 'custom') return false
            if (this.trigger !== 'contextMenu') {
                return false
            }
            this.currentShow = false
        },
        hasParent () {
            const $parent = findComponentUpward(this, prefixCls)
            if ($parent) {
                return $parent
            } else {
                return false
            }
        }
    },
    mounted () {
        this.$on('on-click', (key) => {
            const $parent = this.hasParent()
            if ($parent) $parent.$emit('on-click', key)
        })
        this.$on('on-hover-click', () => {
            const $parent = this.hasParent()
            if ($parent) {
                this.$nextTick(() => {
                    if (this.trigger === 'custom') return false
                    this.currentShow = false
                })
                $parent.$emit('on-hover-click')
            } else {
                this.$nextTick(() => {
                    if (this.trigger === 'custom') return false
                    this.currentShow = false
                })
            }
        })
        this.$on('on-haschild-click', () => {
            this.$nextTick(() => {
                if (this.trigger === 'custom') return false
                this.currentShow = true
            })
            const $parent = this.hasParent()
            if ($parent) $parent.$emit('on-haschild-click')
        })
    }
}
</script>

<style lang="scss">

</style>
