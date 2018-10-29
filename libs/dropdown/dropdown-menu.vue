<template>
  <!--<ul class="b-dropdown-menu"><slot></slot></ul>-->
  <transition name="el-zoom-in-top">
    <ul class="el-dropdown-menu el-popper" v-show="showPopper">
      <slot></slot>
    </ul>
  </transition>
</template>

<script>
import Popper from '../utils/vue-popper.js'
export default {
    name: 'DropdownMenu',
    mixins: [Popper],
    data () {
        return {
        }
    },
    inject: ['dropdown'],
    created () {
        this.$on('visible', val => {
            this.showPopper = val
        })
    }
}
</script>

<style scoped>

</style>
