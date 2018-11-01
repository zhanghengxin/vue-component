
/*  前者一个测试套执行一次, 后者每个测试用例执行一次。 */

import {destroyVM, createTest, createVue} from '../utils'
import Backtop from '&/components/backTop'

describe('Backtop.vue', () => { // describe相当于一个测试套，可以嵌套。
    let vm
    afterEach(() => {
        destroyVM(vm) // 清理环境或全局变量
    })
    it('right', () => { // it('tc name',() => {})是一个测试用例。
        vm = createTest(Backtop, {
            right: 30
        }, true)
        let backTopEle = vm.$el
        expect(backTopEle.style.right).to.equal('30px')
    })
    it('bottom', () => { // it('tc name',() => {})是一个测试用例。
        vm = createTest(Backtop, {
            bottom: 30
        }, true)
        let backTopEle = vm.$el
        expect(backTopEle.style.bottom).to.equal('30px')
    })
    it('show', (done) => { // it('tc name',() => {})是一个测试用例。
        vm = createTest(Backtop, {
            show: true
        }, true)
        setTimeout(() => {
            let backTopEle = vm.$el
            expect(backTopEle.style.display).to.equal('')
            done()
        })
    })
    it('duration', (done) => {
        vm = createTest(Backtop, {
            duration: 1000
        }, true)
        setTimeout(() => {
            expect(document.documentElement.scrollTop).to.equal(0)
            done()
        }, 1000)
    })
    it('height', (done) => {
        vm = createTest(Backtop, {
            height: 800
        }, true)
        setTimeout(() => {
            let backTopEle = vm.$el
            backTopEle.scrollTop = 700
            expect(backTopEle.style.display).to.equal('none')
            done()
        })
    })
    it('click', done => {
        vm = createVue({
            template: `
              <backtop :show='true' @on-click="back"></backtop>
            `,
            methods: {
                back () {
                    // result = evt
                }
            }
        }, true)
        vm.$el.click()
        setTimeout(_ => {
            expect(document.documentElement.scrollTop).to.equal(0)
            done()
        }, 1000)
    })
})
