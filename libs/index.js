/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './components/input/index'
import Button from './components/button'
import Carousel from './components/carousel'
import CarouselItem from './components/carousel-item'
import Icon from './components/icon'
import Page from './components/page'
import Collapse from './components/collapse'
import CollapseItem from './components/collapse-item'
import Message from './components/message'
import Breadcrumb from './components/breadcrumb'
import BreadcrumbItem from './components/breadcrumb-item'
import Circle from './components/circle'
import { Steps, Step } from './components/steps/index'
import Card from './components/card'
import Modal from './components/modal'
import Tooltip from './components/tooltip'

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
    components.map(component => console.log(component.name))
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
