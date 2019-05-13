<template>
    <ul :class="classes" :style="styles"><slot></slot></ul>
</template>
<script>
import { prefix, oneOf } from '../../utils/common'
import { MENU, SUBMENU } from './base'
const prefixCls = `${prefix}menu`

export default {
    name: MENU,
    props: {
        mode: {
            validator (value) {
                return oneOf(value, ['horizontal', 'vertical'])
            },
            default: 'vertical'
        },
        theme: {
            validator (value) {
                return oneOf(value, ['light', 'dark', 'primary'])
            },
            default: 'light'
        },
        activeName: {
            type: [String, Number]
        },
        openNames: {
            type: Array,
            default () {
                return []
            }
        },
        accordion: {// 手风琴效果
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '220px'
        },
        collapse: {
            type: Boolean,
            default: false
        },
        // 开通的时候，直接跳转， name 和 activeName 保持一致
        router: {
            type: Boolean,
            default: false
        },
        // 子菜单打开的触发方式,可选hover/click,暂未完成
        trigger: {
            type: String,
            default: 'click'
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${this.mode}`]: this.mode,
                    [`${prefixCls}-${this.theme}`]: this.theme
                }
            ]
        },
        styles () {
            let style = {}

            if (this.mode === 'vertical') style.width = this.width

            return style
        }
    },
    componentName: MENU,
    provide () {
        return {
            rootMenu: this
        }
    },
    data () {
        return {
            currentActiveName: this.activeName,
            openedMenus: (this.openNames && !this.collapse) ? this.openNames.slice(0) : [],
            items: {},
            submenus: {}
        }
    },
    methods: {
        updateOpened (arr) {
            if (Object.prototype.toString.call(arr) === '[object Array]') {
                this.openedMenus = arr
            }
        },
        updateActiveName (activeName) {
            const item = this.items[activeName || this.activeName]
            if (item) {
                this.currentActiveName = item.name
                this.initOpenedMenu()
            } else {
                this.currentActiveName = null
            }
        },
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
        openMenu (name, namePath) {
            let openedMenus = this.openedMenus
            if (openedMenus.indexOf(name) !== -1) return
            // 将不在该菜单路径下的其余菜单收起
            // collapse all menu that are not under current menu item
            if (this.accordion) {
                this.openedMenus = openedMenus.filter(name => {
                    return namePath.indexOf(name) !== -1
                })
            }
            this.openedMenus.push(name)
        },
        closeMenu (name) {
            const i = this.openedMenus.indexOf(name)
            if (i !== -1) {
                this.openedMenus.splice(i, 1)
            }
        },
        handleSubmenuClick (submenu) {
            const { name, namePath } = submenu
            let isOpened = ~this.openedMenus.indexOf(name)
            if (isOpened) {
                this.closeMenu(name)
            } else {
                this.openMenu(name, namePath)
            }
            this.$emit('on-open-change', name, namePath)
        },
        handleItemClick (item) {
            // debugger
            const { name, namePath } = item
            const oldActiveName = this.currentActiveName
            this.currentActiveName = name

            this.$emit('on-select', name, namePath, item)

            if (this.mode === 'horizontal' || this.collapse) {
                this.openedMenus = []
            }
            if (this.router) {
                this.routeToItem(item, (error) => {
                    this.currentActiveName = oldActiveName
                    if (error) {
                        throw new Error(error)
                    }
                })
            }
        },
        // 初始化展开菜单
        // initialize opened menu
        initOpenedMenu () {
            const name = this.currentActiveName
            const activeItem = this.items[name]
            if (!activeItem || this.mode === 'horizontal' || this.collapse) return

            let namePath = activeItem.namePath

            // 展开该菜单项的路径上所有子菜单
            // expand all submenus of the menu item
            namePath.forEach(name => {
                let submenu = this.submenus[name]
                submenu && this.openMenu(name, submenu.namePath)
            })
        },
        routeToItem (item, onError) {
            let route = item.route || item.name
            try {
                this.$router.push(route, () => {}, onError)
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    watch: {
        activeName: 'updateActiveName',
        openNames (value) {
            if (!this.collapse) {
                this.openedMenus = value
            }
        },
        collapse (value) {
            if (value) {
                this.openedMenus = []
            }
            this.broadcast(SUBMENU, 'toggle-collapse', value)
        }
    },
    mounted () {
        this.initOpenedMenu()
        this.$on('item-click', this.handleItemClick)
        this.$on('submenu-click', this.handleSubmenuClick)

        this.$watch('items', this.updateActiveName)
    }
}
</script>

<style scoped>

</style>
