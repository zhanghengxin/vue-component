import Vue from 'vue'
import Spin from './spin.vue'
import { prefix } from '../../utils/common'

import { existenceIndex, existenceIncrease } from '../../utils/existence-queue'

function handleGetIndex () {
    existenceIncrease()
    return existenceIndex
}

let tIndex = handleGetIndex()

Spin.newInstance = properties => {
    const _props = properties || {}
    const Instance = new Vue({
        data: Object.assign({}, _props, {}),
        render (h) {
            let vnode = ''
            if (this.render) {
                vnode = h(Spin, {
                    props: {
                        fix: true,
                        fullscreen: true
                    }
                }, [this.render(h)])
            } else {
                vnode = h(Spin, {
                    props: {
                        size: 'large',
                        fix: true,
                        fullscreen: true
                    }
                })
            }
            return h('div', {
                'class': `${prefix}spin-fullscreen ${prefix}spin-fullscreen-wrapper`,
                'style': {
                    'z-index': 2010 + tIndex
                }
            }, [vnode])
        }
    })
    const component = Instance.$mount()
    document.body.appendChild(component.$el)
    const spin = Instance.$children[0]
    return {
        show () {
            spin.visible = true
            tIndex = handleGetIndex()
        },
        remove (cb) {
            spin.visible = false
            setTimeout(function () {
                spin.$parent.$destroy()
                if (document.getElementsByClassName(`${prefix}spin-fullscreen`)[0] !== undefined) {
                    document.body.removeChild(document.getElementsByClassName(`${prefix}spin-fullscreen`)[0])
                }
                cb()
            }, 500)
        },
        component: spin
    }
}

export default Spin
