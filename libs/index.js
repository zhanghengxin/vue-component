/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './input/index'
import Button from './button'
import Icon from './icon'
<<<<<<< HEAD
import Circle from './circle'
const components = [
    Button, Icon, Circle
=======
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Breadcrumb from './breadcrumb'
import BreadcrumbItem from './breadcrumb-item'

const components = [
    Input,Button, Icon, Collapse, CollapseItem, Breadcrumb, BreadcrumbItem
>>>>>>> develop
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    Button,
<<<<<<< HEAD
    Icon,
    Circle
=======
    Input,
    Icon,
    Collapse,
    CollapseItem,
    Breadcrumb,
    BreadcrumbItem
>>>>>>> develop
}
