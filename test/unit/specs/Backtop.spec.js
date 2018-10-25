
/*  前者一个测试套执行一次, 后者每个测试用例执行一次。*/

import {createVue, destroyVM, createTest} from '../utils'

// describe('breadTop.vue', () => { // describe相当于一个测试套，可以嵌套。
//     let vm
//     afterEach(() => {
//         destroyVM(vm) // 清理环境或全局变量
//     })
//     it('height', () => { // it('tc name',() => {})是一个测试用例。
//         vm = createTest(backtop, {
//           height:300
//         }, true)
//         let buttonElm = vm.$el
//         expect(buttonElm.style.height).to.equal('300px')
//     })
// })
