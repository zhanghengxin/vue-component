/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import BButton from './button/index'

const components = [
    BButton
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    BButton
}
