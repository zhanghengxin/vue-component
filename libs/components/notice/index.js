import Notice from './notice.vue'
import notice from './function'
export default (Vue) => {
    Vue.component(Notice.name, Notice)
    Vue.prototype.$notice = notice
}
