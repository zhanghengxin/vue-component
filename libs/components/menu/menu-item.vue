
<script>
import { MENU, MENUITEM } from './base'
import { prefix } from '&/utils/common'
import mixin from './menu-mixin'
import Emitter from '../../mixins/emitter'
const prefixCls = `${prefix}menu`

export default {
    name: MENUITEM,
    componentName: MENUITEM,
    render (h) {
        this.icon = `${prefix}icon`
        const menuItemProps = {
            class: this.classes,
            style: this.paddingStyle,
            on: {
                click: this.handleClick
            }
        }
        return (
            <li {...menuItemProps}>
                <span class="item-solt">
                    <this.icon type={this.iconType} size="14" class="menu-pre-icon" v-show={this.iconType}></this.icon>
                    <span class={prefixCls + '-item-dot'} v-show={!this.iconType}></span>
                    { this.$slots.default }
                </span>
            </li>
        )
    },
    mixins: [ Emitter, mixin ],
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
        iconType: {
            type: String
        }
    },
    data () {
        return {
            // active: false
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
