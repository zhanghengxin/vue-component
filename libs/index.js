/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Button from './button'
import Progress from './progress'

const components = [
    Button,
    Progress
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

export default {
    install,
    Button,
    Progress
}
