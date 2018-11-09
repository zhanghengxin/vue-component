/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './components/input/index'
import Button from './components/button'
import Drawer from './components/drawer'
import Lswitch from './components/Lswitch'
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
import Dropdown from './components/dropdown'
import DropdownItem from './components/dropdown-item'
import DropdownMenu from './components/dropdown-menu'
import Switch from './components/switch/index'
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkboxGroup'
import Form from './components/form'

const components = [
    Input,
    Page,
    Button,
    Drawer,
    Lswitch,
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
    DropdownMenu,
    Checkbox,
    CheckboxGroup,
    Modal,
    Circle,
    Tooltip,
    BackTop,
    Form,
    Form.FormItem,
    Switch
]

const install = function (Vue) {
    if (install.installed) return
    components.forEach(component => Vue.component(component.name, component))
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
}

export default {
    install,
    ...components
}
