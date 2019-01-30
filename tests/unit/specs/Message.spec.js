import { destroyVM } from '../utils'
import Message from '&/components/message'
import { prefix } from '&/utils/common'
let bMessage = prefix + 'message'

describe('Message', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = Message({
            message: '你好'
        })
        expect(vm.$el.querySelector(`.${bMessage}`)).toBeTruthy()
    })

    it('message', () => {
        vm = Message({
            message: '你好'
        })
        expect(vm.$el.querySelector(`.${bMessage}-content`).innerHTML).toBe('你好')
    })

    it('showClose', () => {
        vm = Message({
            message: '你好',
            showClose: true
        })
        expect(vm.$el.querySelector(`.${bMessage}-close`)).toBeTruthy()
    })

    describe('type', () => {
        let img = {
            info: 'xinxi-yiban',
            error: 'shibai',
            success: 'chenggong',
            warning: 'yichang'
        }
        const test = type => it(`${type}`, () => {
            vm = Message({
                message: '你好',
                type
            })
            expect(vm.$el.querySelector(`.bw-${img[type]}`)).toBeTruthy()
        })

        for (let key in img) {
            test(key)
        }
    })
})
