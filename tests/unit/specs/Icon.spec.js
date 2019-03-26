/**
 * Created by gaoguoqing on 2018/9/12.
 *
 */
import Icon from '&/components/icon'
import { createTest, createVue, destroyVM } from '../utils'

describe('Icon.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('type', () => {
        vm = createTest(Icon, {
            type: 'zuosanjiao'
        }, true)
        let Elm = vm.$el
        expect(Elm.classList).toContain(`bw-zuosanjiao`)
    })
    it('size', () => {
        vm = createTest(Icon, {
            size: 22
        }, true)
        let Elm = vm.$el
        expect(Elm.style.fontSize).toBe('22px')
    })
    it('color', () => {
        vm = createTest(Icon, {
            color: 'red'
        }, true)
        let Elm = vm.$el
        expect(Elm.style.color).toBe('red')
    })
    it('click', done => {
        let result
        vm = createVue({
            template: `
        <b-icon @on-click="handleClick"></b-icon>
      `,
            methods: {
                handleClick (evt) {
                    result = evt
                }
            }
        }, true)
        vm.$el.click()
        setTimeout(_ => {
            expect(result).toBeTruthy()
            done()
        }, 20)
    })
})
