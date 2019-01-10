
<script>
import { MENU, SUBMENU } from './base'
import { prefix } from '&/utils/common'
// import Drop from '../select/dropdown.vue'
import BIcon from '../icon'
import CollapseTransition from './collapse-transition'
import mixin from './menu-mixin'
import Emitter from '../../mixins/emitter'

const prefixCls = `${prefix}menu`

export default {
    name: SUBMENU,
    componentName: SUBMENU,
    components: {
        BIcon,
        CollapseTransition
    },
    data () {
        return {
            timeout: null,
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
        iconType: {
            type: String
        }
    },
    mixins: [ Emitter, mixin ],
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
            // debugger
            const { rootMenu, disabled } = this
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
    },
    render (h) {
        this.icon = `${prefix}icon`
        let submenuTitleIcon = this.opened ? 'shang' : 'xia'
        const submenuTitle = (
            <div
                class={[prefixCls + '-submenu-title']}
                ref="reference"
                on-click={this.handleClick}
                style={this.paddingStyle}
            >
                <this.icon type={this.iconType} size="14" class="menu-pre-icon" v-show={this.iconType}></this.icon>
                { this.$slots.title }
                <this.icon type={submenuTitleIcon} class="menu-arrow"></this.icon>
            </div>
        )
        const verticalMenu = (
            <collapse-transition>
                <ul v-show={this.opened}>
                    { this.$slots.default }
                </ul>
            </collapse-transition>
        )
        const horizontalMenu = (
            <transition name="slide-up">
                <ul class={[prefixCls + '-drop-list']} v-show={this.opened}>
                    { this.$slots.default }
                </ul>
            </transition>
        )
        return (
            <li
                class={this.classes}
                on-mouseenter={this.handleMouseenter}
                on-mouseleave={this.handleMouseleave}
            >
                { submenuTitle }
                { this.mode === 'vertical' ? verticalMenu : horizontalMenu }
            </li>
        )
    }
}
</script>

<style scoped>

</style>
