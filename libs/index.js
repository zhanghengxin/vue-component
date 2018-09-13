/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Button from './button'
import Icon from './icon'

const components = [
    Button, Icon
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    Button,
    Icon
}