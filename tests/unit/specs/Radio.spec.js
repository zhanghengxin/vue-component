/**
 * Created by gonghuan on 2018/10/9.
 *
 */
import { createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}radio`

describe('radio.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('checkedValue', () => {
        vm = createVue({
            template: `
                <${prefixCls} v-model="test">哈哈</${prefixCls}>
            `,
            data () {
                return {
                    test: true
                }
            }
        }, true)
        let radioElm = vm.$el
        expect(radioElm.children[0].classList[1]).toContain(`${prefixCls}-checked`)
    })
    it('disabled', () => {
        vm = createVue({
            template: `
                <${prefixCls} v-model="test" :disabled='disabled'>哈哈</${prefixCls}>
            `,
            data () {
                return {
                    test: false,
                    disabled: true
                }
            }
        }, true)
        let radioElm = vm.$el
        expect(radioElm.children[0].classList[1]).toContain(`${prefixCls}-disabled`)
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
            data () {
                return {
                    test: false
                }
            }
        }, true)
        vm.$el.click()
        vm.$nextTick(_ => {
            expect(result).toBeTruthy()
            expect(vm.$el.children[0].classList).toContain(`${prefixCls}-checked`)
            done()
        })
    })
})
