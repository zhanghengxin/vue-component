/**
 * @author 靳宏灿
 * @date 2018/12/1
 * @Description: steps组件的测试用例
*/
// import Steps from '&/components/steps'
// import Step from '&/components/step'
import { createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}step`
const Step = `${prefix}step`
const Steps = `${prefix}steps`

describe('Steps.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    // 测试是否创建成功
    it('ifExist', done => {
        vm = createVue({
            template: `
                <div>
                    <${Steps} current="1">
                        <${Step} ></${Step}>
                        <${Step} ></${Step}>
                        <${Step} ></${Step}>
                        <${Step} ></${Step}>
                    </${Steps}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        setTimeout(() => {
            expect(Elm).toBeTruthy()
            done()
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('size current', done => {
        vm = createVue({
            template: `
                <div>
                    <${Steps} current='2' size='small'>
                        <${Step} title='已完成' content='content'></${Step}>
                        <${Step} title='正进行' content='content'></${Step}>
                        <${Step} title='在等待' content='content'></${Step}>
                    </${Steps}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        setTimeout(() => {
            expect(Elm.querySelector(`.${prefixCls}-area`).classList).toContain(`${prefixCls}-area-small`)
            expect(Elm.querySelectorAll(`.${prefixCls}-area .${prefixCls}-item`)[2].classList).toContain(`${prefixCls}-status-process`)
            done()
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('status content title icon', done => {
        vm = createVue({
            template: `
                <div>
                    <${Steps} current='2' size='small'>
                        <${Step} title='已完成' icon="fasong" content='content1' status="wait"></${Step}>
                        <${Step} title='正进行' icon="dayin" content='content2' status="process"></${Step}>
                        <${Step} title='在等待' icon="chakan" content='content3' status="error"></${Step}>
                    </${Steps}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        setTimeout(() => {
            expect(Elm.querySelectorAll(`.${prefixCls}-area .${prefixCls}-item`)[0].classList).toContain(`${prefixCls}-status-wait`)
            expect(Elm.querySelectorAll(`.${prefixCls}-area .${prefixCls}-item .${prefixCls}-content`)[1].textContent).toBe('content2')
            expect(Elm.querySelectorAll(`.${prefixCls}-area .${prefixCls}-item .${prefixCls}-title`)[2].textContent).toBe('在等待')
            expect(Elm.querySelectorAll(`.${prefixCls}-area .${prefixCls}-item .${prefixCls}-point`)[0].querySelector('i').classList).toContain(`bw-fasong`)
            done()
        }, 100)
    })
})
