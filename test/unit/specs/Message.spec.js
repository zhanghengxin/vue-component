import Message from '&/components/message'
import { createVue, destroyVM, waitForIt } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = prefix + 'message'

describe('Message.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
        // const el = document.querySelector(`${prefixCls}-wrapper`)
        // if (!el) return
        // if (el.parentNode) {
        //     el.parentNode.removeChild(el)
        // }
        // if (el.__vue__) {
        //     el.__vue__.$destroy()
        // }
    })
    it('create', done => {
        vm = createVue({ render: () => { } })
        const messge = '信息'
        let messageContainer = null
        vm.$Message({
            messge: messge,
            duration: 200
        })
        const selector = `${prefixCls}-span`
        const checkMessageOpens = () => (messageContainer = document.querySelector(selector))

        waitForIt(checkMessageOpens, function () {
            expect(messageContainer.textContent.trim()).to.equal(messge)
            messageContainer.parentElement.removeChild(messageContainer)
            done()
        })
    })
    // it('automatically close', done => {
    //     Message({
    //         message: '信息',
    //         duration: 500
    //     })
    //     const message = document.querySelector(`${prefixCls}-span`)
    //     expect(document.querySelector(`${prefixCls}-wrapper`)).to.exist
    //     expect(message.textContent).to.equal('信息')
    //     setTimeout(() => {
    //         expect(document.querySelector(`${prefixCls}-wrapper`)).to.not.exist
    //         done()
    //     }, 1000)
    // })
    // it('click', done => {
    //     let result
    //     vm = createVue({
    //         template: `
    //         <${prefixCls} @on-click="handleClick"></${prefixCls}>
    //     `,
    //         methods: {
    //             handleClick (evt) {
    //                 result = evt
    //             }
    //         }
    //     }, true)
    //     vm.$el.click()
    //     setTimeout(_ => {
    //         expect(result).to.exist
    //         done()
    //     }, 20)
    // })
})
