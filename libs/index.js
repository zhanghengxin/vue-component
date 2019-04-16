/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Input from './components/input'
import InputNumber from './components/input-number'
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
import Steps from './components/steps'
import Tabs from './components/tabs'
import { Row, Col } from './components/grid'
import Card from './components/card'
import Modal from './components/modal'
import Tooltip from './components/tooltip'
import Upload from './components/upload'
import BackTop from './components/backTop'
import Dropdown from './components/dropdown'
import DropdownItem from './components/dropdown-item'
import DropdownMenu from './components/dropdown-menu'
import Switch from './components/switch'
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkboxGroup'
import Radio from './components/radio'
import RadioGroup from './components/radioGroup'
import Form from './components/form'
import Tag from './components/tag'
import Tree from './components/tree/RootTree'
import Table from './components/table'
import Progress from './components/progress'
import Select from './components/select'
import DatePicker from './components/date-picker'
import TimePicker from './components/time-picker'
import Transfer from './components/transfer'
import Notice from './components/notice'
import Menu from './components/menu'
import MenuItem from './components/menu/menu-item'
import Submenu from './components/menu/submenu'
import MenuGroup from './components/menu/menu-item-group'
import Timeline from './components/timeline'
import TimelineItem from './components/timeline-item'
import Split from './components/split'
import Loading from './components/loading'
import LoadingBar from './components/loading-bar'
import Anchor from './components/anchor'
import AnchorLink from './components/anchor-link'
import Affix from './components/affix'
import Poptip from './components/poptip'

const components = [
    Input,
    InputNumber,
    Page,
    Button,
    Button.Group,
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
    Steps.step,
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
    Upload,
    BackTop,
    Form,
    Form.FormItem,
    Switch,
    Progress,
    Tabs,
    Tabs.panel,
    Select,
    DatePicker,
    TimePicker,
    Transfer,
    Menu,
    MenuItem,
    Submenu,
    MenuGroup,
    Timeline,
    TimelineItem,
    Split,
    Anchor,
    AnchorLink,
    Poptip,
    Affix
]

const install = function (Vue) {
    if (install.installed) return
    components.forEach(component => Vue.component(component.name, component))
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
    Vue.prototype.$Notice = Notice
    Vue.use(Loading.directive)
    Vue.prototype.$Loading = Loading.service
    Vue.prototype.$LoadingBar = LoadingBar
}
let api = {
    install,
    LoadingBar,
    Notice,
    ...components
}

// module.exports.default = module.exports = api
export default api
