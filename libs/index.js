/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './components/input/index'
import Button from './components/button'
import Drawer from './components/drawer'
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
import BackTop from './components/backTop'
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkboxGroup'
import Radio from './components/radio'
import RadioGroup from './components/radioGroup'

const components = [
    Input,
    Page,
    Button,
    Drawer,
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
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Modal,
    Circle,
    Tooltip,
    BackTop
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
    Drawer,
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
    Tooltip,
    BackTop,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup
}
