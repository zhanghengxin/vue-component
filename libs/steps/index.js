/**
 * Created by gaoguoqing on 2018/9/5.
 *
 */
import Steps from './Steps'
import Step from './Step'

Steps.install = function (Vue) {
    Vue.component(Steps.name, Steps)
}

Step.install = function (Vue) {
    Vue.component(Step.name, Step)
}

export {Steps, Step}
