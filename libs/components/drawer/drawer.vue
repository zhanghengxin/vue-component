/*
 * @Author: lijiahang
 */
<template>
  <div :class="[prefixCls+'-root']" ref='mask'>
    <div :class="mask" @click="maskclick"></div>
    <transition :name="drawer">
      <div v-show="isshow" :class="drawer">
        <div :class="[prefixCls+'-drawerTop']">
          <p>{{title}}</p>
        </div>
        <div :class="[prefixCls+'-drawerbody']">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

const prefixCls = 'b-drawer'
export default {
    name: 'bDrawer',
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        local: {
            type: String,
            default: 'right'
        },
        title: {
            type: String,
            default: '百望股份'
        },
        isshow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        drawer () {
            return `${prefixCls}-${this.local}`
        },
        mask () {
            return [this.isshow ? `${prefixCls}-maskshow` : `${prefixCls}-maskshid`]
        }
    },
    methods: {
        maskclick () {
            this.$emit('drawerchange')
        }
    },
    mounted () {
        document.getElementById('app').appendChild(this.$refs.mask)
    }
}
</script>
