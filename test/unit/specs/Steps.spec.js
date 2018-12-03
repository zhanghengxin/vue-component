/**
 * @author 靳宏灿
 * @date 2018/12/1
 * @Description: steps组件的测试用例
*/
// import Steps from '&/components/steps'
// import Step from '&/components/step'
import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'

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
                    <b-steps current="1">
                        <b-step ></b-step>
                        <b-step ></b-step>
                        <b-step ></b-step>
                        <b-step ></b-step>
                    </b-steps>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        setTimeout(() => {
            expect(Elm).to.exist
            done()
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('size current', done => {
        vm = createVue({
            template: `
                <div>
                    <b-steps current='2' size='small'>
                        <b-step title='已完成' content='content'></b-step>
                        <b-step title='正进行' content='content'></b-step>
                        <b-step title='在等待' content='content'></b-step>
                    </b-steps>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        setTimeout(() => {
            expect(Elm.querySelector('.b-step-area').classList.contains('b-step-area-small')).to.be.true
            expect(Elm.querySelectorAll('.b-step-area .b-step-item')[2].classList.contains('b-step-status-process')).to.be.true
            done()
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('status content title icon', done => {
        vm = createVue({
            template: `
                <div>
                    <b-steps current='2' size='small'>
                        <b-step title='已完成' icon="fasong" content='content1' status="wait"></b-step>
                        <b-step title='正进行' icon="dayin" content='content2' status="process"></b-step>
                        <b-step title='在等待' icon="chakan" content='content3' status="error"></b-step>
                    </b-steps>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        setTimeout(() => {
            expect(Elm.querySelectorAll('.b-step-area .b-step-item')[0].classList.contains('b-step-status-wait')).to.be.true
            expect(Elm.querySelectorAll('.b-step-area .b-step-item .b-step-content')[1].textContent).to.equal('content2')
            expect(Elm.querySelectorAll('.b-step-area .b-step-item .b-step-title')[2].textContent).to.equal('在等待')
            expect(Elm.querySelectorAll('.b-step-area .b-step-item .b-step-point')[0].querySelector('i').classList.contains(`bw-fasong`)).to.be.true
            done()
        }, 100)
    })
})
