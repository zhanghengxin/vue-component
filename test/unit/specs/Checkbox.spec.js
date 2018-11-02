/**
 * Created by zhangdehui on 2018/10/9.
 *
 */
import Checkbox from '&/components/checkbox'
import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}checkbox`

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
        expect(checkboxElm.children[0].classList.contains(`${prefixCls}-checked`)).to.be.true
    })
    it('disabled', () => {
        vm = createTest(Checkbox, {
            disabled: true
        }, true)
        let checkboxElm = vm.$el
        expect(checkboxElm.children[0].classList.contains(`${prefixCls}-disabled`)).to.be.true
    })
    it('change', done => {
        let result
        vm = createVue({
            template: `
        <${prefixCls} @on-change="handleClick" v-model="test">哈哈</${prefixCls}>
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
            expect(vm.$el.children[0].classList.contains(`${prefixCls}-checked`)).to.be.true
            done()
        }, 20)
    })
})
