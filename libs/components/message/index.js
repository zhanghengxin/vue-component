/**
 * Created by zhangliming on 2018/9/15.
 *
 */

import Vue from 'vue'
import MessageTemplate from './Message.vue'
import { prefix } from '../../utils/common'

const MessageConstructor = Vue.extend(MessageTemplate)
const instances = []
const defaults = {
    duration: 3,
    top: 15
}
let count = 1
let msgCon = null

function Message (options) {
    let close = options.onClose
    if (!options.duration) options.duration = defaults.duration
    if (!msgCon) {
        msgCon = document.createElement('div')
        msgCon.className = `${prefix}message-container`
        document.body.appendChild(msgCon)
    }
    msgCon.style.zIndex = options.zIndex ? options.zIndex : 1010
    msgCon.style.position = 'fixed'
    msgCon.style.width = '100%'
    msgCon.style.top = defaults.top + 'px'
    msgCon.style.left = 0
    msgCon.style.textAlign = 'center'
    let id = `b-message-${count++}`
    let {duration} = options
    options.onClose = function () {
        Message.close(id, duration, close)
    }
    let instance = new MessageConstructor({
        el: document.createElement('div'),
        data: options
    })
    instance.id = id
    msgCon.appendChild(instance.$el)
    instance.show = true
    instances.push(instance)
    return instance
}

Message.close = function (id, close) {
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
        if (instances.length === 0 && msgCon) {
            msgCon.remove()
            msgCon = null
        }
    }, 3000)
}

const types = ['info', 'success', 'error', 'warning']

types.forEach(type => {
    Message[type] = function (options) {
        options = typeof options === 'string' ? {message: options} : options
        return Message({...options, type})
    }
})

Message.config = function (options) {
    if (options.duration || options.duration === 0) {
        defaults.duration = options.duration
    }
    if (options.top || options.top === 0) {
        defaults.top = options.top
    }
}
export default Message
