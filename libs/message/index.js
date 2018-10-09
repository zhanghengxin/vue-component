/**
 * Created by zhangliming on 2018/9/15.
 *
 */

import Vue from 'vue'
import MessageTemplate from './Message.vue'

const MessageConstructor = Vue.extend(MessageTemplate)
const instances = []
let count = 1
let msgCon = null

function Message (options) {
    console.log(options)
    let close = options.onClose

    if (!msgCon) {
        msgCon = document.createElement('div')
        msgCon.className = 'b-message-container'
        document.body.appendChild(msgCon)
    }

    msgCon.style.zIndex = options.zIndex ? options.zIndex : 1010
    msgCon.style.position = 'fixed'
    msgCon.style.width = '100%'
    msgCon.style.top = 0
    msgCon.style.left = 0
    msgCon.style.textAlign = 'center'

    let id = count++
    let { duration } = options
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

Message.close = function (id, duration, close) {
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
        if (!instances.length && msgCon) {
            msgCon.remove()
            msgCon = null
        }
    }, duration)
}

const types = ['info', 'success', 'error', 'warning']

types.forEach(type => {
    Message[type] = function (options) {
        options = typeof options === 'string' ? { message: options } : options
        return Message({...options, type})
    }
})

Message.install = function (Vue, options) {
    if (options && options.name) {
        Vue.prototype[`$${options.name}`] = Message
    } else {
        Vue.prototype.$Message = Message
    }
}

export default Message
