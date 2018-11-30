<template>
    <transition :name="transitionNames[0]">
        <ul :class="[prefixCls + '-menu']" class="b-popper" v-show="showPopper">
            <slot></slot>
        </ul>
    </transition>
</template>

<script>
import Popper from '../../utils/vue-popper.js'
const prefixCls = 'b-dropdown'
export default {
    name: 'BDropdownMenu',
    mixins: [Popper],
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        transitionNames: {
            type: Array,
            default () {
                return ['zoomIn', 'ease', 'fade']
            }
        }
    },
    inject: ['dropdown'],
    created () {
        this.$on('visible', val => {
            this.showPopper = val
        })
    },
    mounted () {
        this.$parent.popperElm = this.popperElm = this.$el
        this.referenceElm = this.$parent.$el
    },
    watch: {
        'dropdown.placement': {
            immediate: true,
            handler (val) {
                this.currentPlacement = val
            }
        }
    }
}
</script>

<style scoped>

</style>
