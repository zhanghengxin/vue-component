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
import { Tabs, TabPanel } from './components/tabs/index'
import { Row, Col } from './components/grid/index'
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
import Radio from './components/radio'
import RadioGroup from './components/radioGroup'
import Form from './components/form'
import Tag from './components/Tag'
import Tree from './components/tree'
import Table from './components/table'
import Progress from './components/Progress'
import Select from './components/select'
import DatePicker from './components/date-picker'
import TimePicker from './components/time-picker'
import DateTimePicker from './components/datetime-picker'
import Transfer from './components/transfer/'
import Notice from './components/notice'
import Menu from './components/menu'
import MenuItem from './components/menu/menu-item'
import Submenu from './components/menu/submenu'
import MenuGroup from './components/menu/menu-item-group'
import Timeline from './components/timeline'
import TimelineItem from './components/timeline-item/'

const components = [
    Input,
    Page,
    Button,
    Drawer,
    Tag,
    Tree,
    Table,
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
    Row,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Modal,
    Circle,
    Tooltip,
    BackTop,
    Form,
    Form.FormItem,
    Switch,
    Progress,
    Tabs,
    TabPanel,
    Select,
    DatePicker,
    TimePicker,
    DateTimePicker,
    Transfer,
    Notice,
    Menu,
    MenuItem,
    Submenu,
    MenuGroup,
    Timeline,
    TimelineItem
]

const install = function (Vue) {
    if (install.installed) return
    components.forEach(component => Vue.component(component.name, component))
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
    Vue.prototype.$Notice = Notice
}

export default {
    install,
    ...components
}
