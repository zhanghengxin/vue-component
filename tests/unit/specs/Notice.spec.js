import { destroyVM } from '../utils'
import Notice from '&/components/notice'
import { prefix } from '&/utils/common'
let bNotice = prefix + 'notice'

describe('Notice', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = Notice({
            content: '我是通知组件'
        })
        expect(document.querySelector(`.${bNotice}-notice`)).toBeTruthy()
    })

    it('size', () => {
        vm = Notice({
            content: '你好',
            size: 'small'
        })
        expect(document.querySelector(`.${bNotice}-normal-icon .icon`).style.fontSize).toBe('16px')
    })

    it('iconVisible', () => {
        vm = Notice({
            content: '你好',
            iconVisible: false
        })
        const iconBox = document.querySelector(`.${bNotice}-normal-icon`)
        expect(iconBox.querySelector(`.icon`)).not.toBeTruthy()
    })

    describe('content && title', () => {
        it('content', () => {
            vm = Notice({
                title: '我是title',
                content: '我是通知组件'
            })
            expect(vm.$el.querySelector(`h5`).textContent).toBe('我是title')
            expect(vm.$el.querySelector(`.${bNotice}-content`).textContent).toBe('我是通知组件')
        })
    })

    describe('type', () => {
        let arr = [
            'normal',
            'success',
            'warning',
            'error'
        ]
        const test = i => it(`${arr[i]}`, () => {
            vm = Notice({
                content: '你好',
                type: arr[i]
            })
            expect(document.querySelector(`.${bNotice}-${arr[i]}`)).toBeTruthy()
        })

        arr.forEach((item, i) => {
            test(i)
        })
    })
})
