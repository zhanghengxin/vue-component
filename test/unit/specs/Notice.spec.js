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
        expect(document.querySelector(`.${bNotice}-notice`)).to.exist
    })

    describe('content', () => {
        it('content', () => {
            vm = Notice({
                content: '我是通知组件'
            })
            expect(vm.$el.querySelector(`.${bNotice}-content`).textContent).to.equal('我是通知组件')
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
            expect(document.querySelector(`.${bNotice}-${arr[i]}`)).to.exist
        })

        arr.forEach((item, i) => {
            test(i)
        })
    })
})
