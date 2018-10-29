
/*  前者一个测试套执行一次, 后者每个测试用例执行一次。 */

import {destroyVM, createTest} from '../utils'
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

})
