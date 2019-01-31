import LoadingBar from './LoadingBar'
import Vue from 'vue'
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}loading-bar`

LoadingBar.newInstance = properties => {
    const _props = properties || {}

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(LoadingBar, {
                props: _props
            })
        }
    })

    const component = Instance.$mount()
    document.body.appendChild(component.$el)
    const loadingBar = Instance.$children[0]

    return {
        update (options) {
            if ('percent' in options) {
                loadingBar.percent = options.percent
            }
            if (options.status) {
                loadingBar.status = options.status
            }
            if ('show' in options) {
                loadingBar.show = options.show
            }
        },
        component: loadingBar,
        destroy () {
            document.body.removeChild(document.getElementsByClassName(`${prefixCls}`))
        }
    }
}

export default LoadingBar
