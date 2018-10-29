/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './input/index'
import Button from './button'
import Carousel from './carousel'
import CarouselItem from './carousel-item'
import Icon from './icon'
import Page from './page'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Message from './message'
import Breadcrumb from './breadcrumb'
import BreadcrumbItem from './breadcrumb-item'
import { Steps, Step } from './steps/index'
import Card from './card'
import Dropdown from './dropdown'
import DropdownItem from './dropdown-item'
import DropdownMenu from './dropdown-menu'

const components = [
    Input,
    Page,
    Button,
    Icon,
    Message,
    Collapse,
    CollapseItem,
    Breadcrumb,
    BreadcrumbItem,
    Carousel,
    CarouselItem,
    Steps,
    Step,
    Card,
    Dropdown,
    DropdownItem,
    DropdownMenu
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    Vue.prototype.$message = Message
}

export default {
    install,
    Button,
    Carousel,
    CarouselItem,
    Input,
    Page,
    Icon,
    Collapse,
    CollapseItem,
    Message,
    Breadcrumb,
    BreadcrumbItem,
    Steps,
    Step,
    Card,
    Dropdown,
    DropdownItem,
    DropdownMenu
}
