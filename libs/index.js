/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './input/index'
import Button from './button'
import Icon from './icon'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Message from './message'
import Breadcrumb from './breadcrumb'
import BreadcrumbItem from './breadcrumb-item'

const components = [
    Input, Button, Icon, Collapse, Message, CollapseItem, Breadcrumb, BreadcrumbItem
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    Vue.prototype.$message = Message
}

export default {
    install,
    Button,
    Input,
    Icon,
    Collapse,
    CollapseItem,
    Message,
    Breadcrumb,
    BreadcrumbItem
}
