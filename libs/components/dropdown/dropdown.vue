<template>
  <div
      :class="[prefixCls]"
      v-click-outside="hide">
      <div>
          <slot></slot>
      </div>
      <slot name="list"></slot>
  </div>
</template>

<script>
import clickOutside from '../../../directives/clickOutside'
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/utils'
const prefixCls = 'b-dropdown'
export default {
    name: 'BDropdown',
    directives: {clickOutside},
    mixins: [Emitter],
    data () {
        return {
            prefixCls: prefixCls,
            show: false,
            visible: false,
            triggerElm: null,
            dropdownElm: null
        }
    },
    provide () {
        return {
            dropdown: this
        }
    },
    props: {
        trigger: {
            type: String,
            default: 'hover'
        },
        placement: {
            type: String,
            default: 'bottom-end'
        },
        showTimeout: {
            type: Number,
            default: 300
        },
        hideTimeout: {
            type: Number,
            default: 200
        }
    },
    mounted () {
        this.$on('menu-item-click', this.handleMenuItemClick)
        this.initEvent()
        this.$on('on-haschild-click', () => {
            this.$nextTick(() => {
                this.visible = true
            })
        })
        this.$on('on-hover-click', () => {
            this.$nextTick(() => {
                this.visible = false
            })
        })
    },
    watch: {
        visible (val) {
            this.broadcast('b-dropdown-menu', 'visible', val)
            this.$emit('visible-change', val)
        }
    },
    methods: {
        hasParent () {
            const $parent = findComponentUpward(this, 'b-dropdown')
            if ($parent) {
                return $parent
            } else {
                return false
            }
        },
        showItem () {
            if (this.triggerElm.disabled) {
                return
            }
            this.visible = true
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.visible = true
            }, this.showTimeout)
        },
        hide () {
            if (this.triggerElm.disabled) {
                return
            }
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.visible = false
            }, this.hideTimeout)
        },
        handleClick () {
            if (this.visible) {
                this.hide()
            } else {
                this.showItem()
            }
        },
        handleMenuItemClick (command) {
            this.$emit('command', command)
        },
        initEvent () {
            let { trigger, showItem, hide, handleClick } = this
            this.triggerElm = this.$slots.default[0].elm
            let dropdownElm = this.dropdownElm = this.$slots.list[0].elm
            if (trigger === 'hover') {
                this.triggerElm.addEventListener('mouseenter', showItem)
                this.triggerElm.addEventListener('mouseleave', hide)
                dropdownElm.addEventListener('mouseenter', showItem)
                dropdownElm.addEventListener('mouseleave', hide)
            } else if (trigger === 'click') {
                this.triggerElm.addEventListener('click', handleClick)
            }
        }
    }
}
</script>

<style lang="scss">

</style>
