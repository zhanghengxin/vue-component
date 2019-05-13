<template>
    <li
        :class="classes"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    >
        <div
            :class="[prefixCls + '-submenu-title']"
            ref="reference"
            @click="handleClick"
            :style="paddingStyle"
        >
            <Icon
                :type="icon"
                size="14"
                class="menu-pre-icon"
                v-show="icon">
            </Icon>
            <slot name="title"></slot>
            <Icon :type="submenuTitleIcon" class="menu-arrow"></Icon>
        </div>
        <collapse-transition name='gradual' v-if="mode === 'vertical'">
            <ul v-show="opened">
                <slot></slot>
            </ul>
        </collapse-transition>
        <transition name='gradual' v-else>
            <ul :class="[prefixCls +'-drop-list']" v-show="opened">
                <slot></slot>
            </ul>
        </transition>
    </li>
</template>
<script>
import { MENU, SUBMENU } from './base'
import { prefix } from '../../utils/common'
import Icon from '../icon'
import mixin from './menu-mixin'
import Emitter from '../../mixins/emitter'
import CollapseTransition from '../base/collapse-transition'

const prefixCls = `${prefix}menu`

export default {
    name: SUBMENU,
    componentName: SUBMENU,
    components: {
        Icon, CollapseTransition
    },
    data () {
        return {
            timeout: null,
            prefixCls: prefixCls,
            items: {},
            submenus: {}
        }
    },
    props: {
        name: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        }
    },
    mixins: [Emitter, mixin],
    computed: {
        classes () {
            return [
                `${prefixCls}-submenu`,
                {
                    [`${prefixCls}-item-active`]: this.active && !this.hasParentSubmenu,
                    [`${prefixCls}-opened`]: this.opened,
                    [`${prefixCls}-submenu-disabled`]: this.disabled,
                    [`${prefixCls}-submenu-un-disabled`]: !this.disabled,
                    [`${prefixCls}-submenu-has-parent-submenu`]: this.hasParentSubmenu,
                    [`${prefixCls}-child-item-active`]: this.active
                }
            ]
        },
        accordion () {
            return this.rootMenu.accordion
        },
        mode () {
            return this.rootMenu.mode
        },
        trigger () {
            return this.rootMenu.trigger
        },
        dropStyle () {
            let style = {}

            if (this.dropWidth) style.minWidth = `${this.dropWidth}px`
            return style
        },
        opened () {
            // return true
            return this.rootMenu.openedMenus.indexOf(this.name) > -1
        },
        submenuTitleIcon () {
            return this.opened ? 'shang' : 'xia'
        }
    },
    methods: {
        addItem (item) {
            this.$set(this.items, item.name, item)
        },
        removeItem (item) {
            delete this.items[item.name]
        },
        addSubmenu (item) {
            this.$set(this.submenus, item.name, item)
        },
        removeSubmenu (item) {
            delete this.submenus[item.name]
        },
        handleClick () {
            const {rootMenu, disabled} = this
            if (
                (this.trigger !== 'click') ||
                (rootMenu.collapse && rootMenu.mode === 'vertical') ||
                disabled
            ) {
                return
            }
            this.dispatch(MENU, 'submenu-click', this)
        },
        handleMouseenter () {
            if (this.disabled) return
            if (this.trigger === 'click') return
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.rootMenu.openMenu(this.name, this.namePath)
            }, 100)
        },
        handleMouseleave () {
            if (this.disabled) return
            if (this.trigger === 'click') return

            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.rootMenu.closeMenu(this.name)
            }, 150)
        }
    }
}
</script>

<style scoped>

</style>
