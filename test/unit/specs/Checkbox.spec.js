/**
 * Created by zhangdehui on 2018/10/9.
 *
 */
import Checkbox from '&/checkbox'
import { createTest, createVue, destroyVM } from '../utils'

describe('Checkbox.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('value', () => {
        vm = createTest(Checkbox, {
            value: true
        }, true)
        let checkboxElm = vm.$el
        expect(checkboxElm.children[0].classList.contains('b-checkbox-checked')).to.be.true
    })
    it('disabled', () => {
        vm = createTest(Checkbox, {
            disabled: true
        }, true)
        let checkboxElm = vm.$el
        expect(checkboxElm.children[0].classList.contains('b-checkbox-disabled')).to.be.true
    })
    it('change', done => {
        let result
        vm = createVue({
            template: `
        <Checkbox @on-change="handleClick" v-model="test">哈哈</Checkbox>
      `,
            methods: {
                handleClick (evt) {
                    result = evt
                }
            },
            data(){
                return {
                    test:false
                } 
            }
        }, true)
        vm.$el.click()
        setTimeout(_ => {
            expect(result).to.be.true
            expect(vm.$el.children[0].classList.contains('b-checkbox-checked')).to.be.true
            done()
        }, 20)
    })
})
