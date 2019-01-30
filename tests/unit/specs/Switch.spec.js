import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const bSwitch = `${prefix}switch`

describe('Switch', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bSwitch} v-model="value"></${bSwitch}>
                </div>
            `,
            data () {
                return {
                    value: true
                }
            }
        })
        expect(vm.$el.querySelector('input').getAttribute('value')).toBe('true')
    })

    it('disabled', () => {
        vm = createVue(`
            <div>
                <${bSwitch} :disabled="true"></${bSwitch}>
            </div>
        `)

        expect(vm.$el.querySelector(`.${bSwitch}-disabled`)).toBeTruthy()
    })

    describe('size', () => {
        const sizes = ['large', 'default', 'small']
        const test = i => it(`${sizes[i]}`, () => {
            vm = createVue(`
                <div>
                    <${bSwitch} size=${sizes[i]}></${bSwitch}>
                </div>
            `)
            expect(vm.$el.querySelector(`.${bSwitch}-${sizes[i]}`)).toBeTruthy()
        })

        for (let key in sizes) {
            test(key)
        }
    })

    it('slot', () => {
        vm = createVue(`
                <div>
                    <${bSwitch}>
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </${bSwitch}>
                </div>
            `)
        expect(vm.$el.querySelector(`.${bSwitch}-inner`).querySelector('span').innerHTML).toBe('关')
    })

    it('on-change', done => {
        let result
        vm = createVue({
            template: `
                <${bSwitch} @on-change="handleChange"></${bSwitch}>
            `,
            methods: {
                handleChange (val) {
                    result = val
                }
            }
        })
        vm.$el.click()
        setTimeout(() => {
            expect(result).toBeTruthy() && expect(result).toBe(true)
            done()
        }, 20)
    })
})
