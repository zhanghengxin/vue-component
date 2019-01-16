
import { MENU, SUBMENU } from './base'

export default {
    inject: ['rootMenu'],
    computed: {
        namePath () {
            const path = [this.name]
            let parent = this.$parent
            while (parent.$options.componentName !== MENU) {
                if (parent.name) {
                    path.unshift(parent.name)
                }
                parent = parent.$parent
            }
            return path
        },
        parentMenu () {
            let parent = this.$parent
            while (parent && [MENU, SUBMENU].indexOf(parent.$options.componentName) === -1) {
                parent = parent.$parent
            }
            return parent
        },
        paddingStyle () {
            if (this.rootMenu.mode !== 'vertical') return {}

            let padding = 20
            let parent = this.$parent

            if (this.rootMenu.collapse) {
                padding = 20
            } else {
                while (parent && parent.$options.componentName !== MENU) {
                    if (parent.$options.componentName === SUBMENU) {
                        padding += 20
                    }
                    parent = parent.$parent
                }
            }
            padding = 50
            return {paddingLeft: padding + 'px'}
        },
        levelPadding () {
            let padding = 20
            let parent = this.$parent
            if (this.rootMenu.collapse) return 20
            while (parent && parent.$options.componentName !== MENU) {
                if (parent.$options.componentName === SUBMENU) {
                    padding += 20
                }
                parent = parent.$parent
            }
            padding = 50
            return padding
        }
    }
}
