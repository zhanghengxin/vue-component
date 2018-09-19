import Breadcrumb from './breadcrumb.vue'
import BreadcrumbItem from './breadcrumb-item.vue'

Breadcrumb.install = function (Vue) {
    Vue.component(Breadcrumb.name, Breadcrumb)
}

Breadcrumb.Item = BreadcrumbItem
export default Breadcrumb
