<template>
  <div class="" v-click-outside="onClickoutside">
      <div @click="handleClick"><slot></slot></div>
      <slot name="list"></slot>
  </div>
</template>

<script>
import clickOutside from '../../directives/clickOutside'
import Emitter from '../mixins/emitter'
export default {
    name: 'Dropdown',
    directives: {clickOutside},
    mixins: [Emitter],
    data () {
        return {
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
        size: {
            type: String,
            default: ''
        },
        visibleArrow: {
            default: 'true'
        },
        showTimeout: {
            type: Number,
            default: 250
        },
        hideTimeout: {
            type: Number,
            default: 150
        }
    },
    mounted () {
        this.initEvent()
        console.log(this.$el)
    },
    watch: {
        visible (val) {
            this.broadcast('DropdownMenu', 'visible', val)
            this.$emit('visible-change', val)
        }
    },
    methods: {
        showItem () {
            if (this.triggerElm.disabled) {
                return
            }
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
        onClickoutside () {
            this.show = false
        },
        initEvent () {
            let { trigger, showItem, hide, handleClick } = this
            this.triggerElm = this.$slots.default[0].elm
            let dropdownElm = this.dropdownElm = this.$slots.list[0].elm
            if (trigger === 'hover') {
                this.triggerElm.addEventListener('mouseenter', showItem)
                this.triggerElm.addEventListener('mouseleave', hide)
            } else if (trigger === 'click') {
                this.triggerElm.addEventListener('click', handleClick)
            }

        }
    }
}
</script>

<style scoped lang="scss">

</style>
