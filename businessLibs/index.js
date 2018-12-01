/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import './utils/protoType'

import BasicInvoice from './components/income'

const components = [
    BasicInvoice
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    BasicInvoice
}
