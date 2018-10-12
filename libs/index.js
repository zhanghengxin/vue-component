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
import Circle from './circle'
import { Steps, Step } from './steps/index'
import Card from './card'
import Modal from './modal'
import Tooltip from './tooltip'

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
    Modal,
    Circle,
    Tooltip
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
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
    Circle,
    Steps,
    Step,
    Card,
    Modal,
    Tooltip
}
