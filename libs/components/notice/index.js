import Vue from 'vue'
import Component from './notice.vue'
import { prefix } from '../../utils/common'

const NoticeConstructor = Vue.extend(Component)
let noticeList = null

const instances = []
let seed = 1
const defaults = {
    duration: 3,
    top: 16
}

const removeInstance = (instance) => {
    if (!instance) return
    const len = instances.length
    const index = instances.findIndex(inst => instance.id === inst.id)
    instances.splice(index, 1)
    if (len <= 1) return
    const removeHeight = instance.vm.height
    for (let i = index; i < len - 1; i++) {
        instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
    }
}

const notice = (options) => {
    if (Vue.prototype.$isServer) return
    if (!options.duration) options.duration = defaults.duration
    const instance = new NoticeConstructor({
        propsData: {
            ...options
        }
    })
    if (!noticeList) {
        noticeList = document.createElement('div')
        noticeList.className = `${prefix}notice-container`
        document.body.appendChild(noticeList)
    }
    noticeList.style.top = defaults.top + 'px'
    noticeList.style.right = 0
    const id = `b-notice-${seed++}`
    instance.id = id
    instance.vm = instance.$mount()
    instance.vm.visible = true
    noticeList.appendChild(instance.vm.$el)
    instances.push(instance)
    instance.vm.$on('closed', () => {
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()
    })
    instance.vm.$on('close', () => {
        instance.vm.visible = false
    })
    return instance.vm
}
const types = ['info', 'success', 'error', 'warning']

types.forEach(type => {
    notice[type] = function (options) {
        options = typeof options === 'string' ? {content: options} : options
        return notice({...options, type})
    }
})
notice.close = function (id, close) {
    for (let i = 0; i < instances.length; i++) {
        if (id === instances[i].id) {
            if (typeof close === 'function') {
                close(instances[i])
            }
            instances[i] = null
            instances.splice(i, 1)
            break
        }
    }
    setTimeout(function () {
        if (instances.length === 0 && noticeList) {
            noticeList.remove()
            noticeList = null
        }
    }, 3000)
}
notice.config = function (options) {
    if (options.duration || options.duration === 0) {
        defaults.duration = options.duration
    }
    if (options.top || options.top === 0) {
        defaults.top = options.top
    }
}
export default notice
