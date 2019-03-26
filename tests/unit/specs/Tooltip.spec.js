import { destroyVM, createVue, createTest } from '../utils'
import Tooltip from '&/components/tooltip'
import { prefix } from '&/utils/common'
let bTooltip = prefix + 'tooltip'

describe('Tooltip', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTooltip} content="你好"></${bTooltip}>
                </div>
            `
        })

        expect(vm.$el.querySelector(`.${bTooltip}`)).toBeTruthy()
    })

    it('content', () => {
        vm = createTest(Tooltip, {
            content: '你好'
        })
        expect(vm.$el.querySelector(`.${bTooltip}-inner`).innerHTML).toContain('你好')
    })

    // it('always', () => {
    //     vm = createTest(Tooltip, {
    //         content: '你好',
    //         always: true
    //     })
    //     // expect(vm.$el.querySelector(`.${bTooltip}-popper`).getAttribute('style')).toContain('position: absolute;')
    // })

    describe('theme', () => {
        const theme = ['dark', 'light']
        const test = i => it(`${theme[i]}`, () => {
            vm = createTest(Tooltip, {
                content: '你好',
                theme: theme[i]
            })
            expect(vm.$el.querySelector(`.${bTooltip}-${theme[i]}`)).toBeTruthy()
        })

        for (let key in theme) {
            test(key)
        }
    })
})
