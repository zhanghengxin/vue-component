<template>
    <transition name='gradual'>
        <li :class="classes" :style="paddingStyle" @click="handleClick">
            <span class="item-solt">
            <Icon :type="icon"
                  size="14"
                  class="menu-pre-icon"
                  v-show="icon">
            </Icon>
            <span :class="[prefixCls + '-item-dot']" v-show="!icon"></span>
                <slot></slot>
            </span>
        </li>
    </transition>
</template>
<script>
import { MENU, MENUITEM } from './base'
import { prefix } from '../../utils/common'
import mixin from './menu-mixin'
import Emitter from '../../mixins/emitter'
import Icon from '../icon'

const prefixCls = `${prefix}menu`

export default {
    name: MENUITEM,
    componentName: MENUITEM,
    components: {Icon},
    mixins: [Emitter, mixin],
    props: {
        name: {
            type: [String, Number],
            required: true
        },
        route: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        }
    },
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    computed: {
        active () {
            return this.name === this.rootMenu.currentActiveName
        },
        classes () {
            return [
                `${prefixCls}-item`,
                {
                    [`${prefixCls}-item-active`]: this.active,
                    [`${prefixCls}-item-selected`]: this.active,
                    [`${prefixCls}-item-disabled`]: this.disabled,
                    [`${prefixCls}-item-un-disabled`]: !this.disabled
                }
            ]
        }
    },
    methods: {
        handleClick () {
            if (!this.disabled) {
                this.dispatch(MENU, 'item-click', this)
                this.$emit('click', this)
            }
        }
    },
    mounted () {
        this.parentMenu.addItem(this)
        this.rootMenu.addItem(this)
    },
    beforeDestroy () {
        this.parentMenu.removeItem(this)
        this.rootMenu.removeItem(this)
    }
}
</script>

<style scoped>

</style>
