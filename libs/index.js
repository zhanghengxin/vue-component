/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Button from './button'
import Icon from './icon'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Breadcrumb from './breadcrumb'
import BreadcrumbItem from './breadcrumb-item'

const components = [
    Button, Icon, Collapse, CollapseItem, Breadcrumb, BreadcrumbItem
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    Button,
    Icon,
    Collapse,
    CollapseItem,
    Breadcrumb,
    BreadcrumbItem
}
