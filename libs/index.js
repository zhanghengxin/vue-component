/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './input/index'
import Button from './button'
import Icon from './icon'
import Page from './page'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
const components = [
    Input,
    Page,
    Button, Icon, Collapse, CollapseItem
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    Button,
    Input,
    Page,
    Icon,
    Collapse,
    CollapseItem
}
