import { prefix } from '../../utils/common'

function capitalize (str) {
    str = (str + '').charAt(0).toUpperCase() + str.substring(1)
    return str.replace(/-$/, '')
}

const PREFIX = capitalize(prefix)
export const MENU = `${PREFIX}Menu`
export const SUBMENU = `${PREFIX}Submenu`
export const MENUITEM = `${PREFIX}MenuItem`
export const MENUGROUP = `${PREFIX}MenuGroup`
