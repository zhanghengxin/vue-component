/**
 * Created by gaoguoqing on 2018/9/8.
 *
 */
import Button from '&/components/button'
import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'

describe('Button.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('type', () => {
        vm = createTest(Button, {
            type: 'info'
        }, true)
        let buttonElm = vm.$el
        expect(buttonElm.classList.contains(`${prefix}btn-info`)).to.be.true
    })
    it('size', () => {
        vm = createTest(Button, {
            size: 'normal'
        }, true)
        let buttonElm = vm.$el
        expect(buttonElm.classList.contains(`${prefix}btn-normal`)).to.be.true
    })
    it('click', done => {
        let result
        vm = createVue({
            template: `
        <b-button @on-click="handleClick"></b-button>
      `,
            methods: {
                handleClick (evt) {
                    result = evt
                }
            }
        }, true)
        vm.$el.click()
        setTimeout(_ => {
            expect(result).to.exist
            done()
        }, 20)
    })
})
