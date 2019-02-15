/*
 * @Author: sunhao
 * @Date: 2018-11-14 15:07:10
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 14:58:23
 */

/*  前者一个测试套执行一次, 后者每个测试用例执行一次。 */
import {destroyVM, createVue} from '../utils'
// import ${Breadcrumb} from '&/components/breadcrumb'
import { prefix } from '&/utils/common'
const Breadcrumb = `${prefix}breadcrumb`
const prefixCls = `.${prefix}breadcrumb`

describe('breadcrumb.vue', () => { // describe相当于一个测试套，可以嵌套。
    let vm
    afterEach(() => {
        destroyVM(vm) // 清理环境或全局变量
    })
    it('create', done => { // it('tc name',() => {})是一个测试用例。
        vm = createVue(`
            <${Breadcrumb} separator="<b class='demo-breadcrumb-separator'>=></b>">
                <${Breadcrumb}-item href="/">Home4</${Breadcrumb}-item>
                <${Breadcrumb}-item href="&/components/breadcrumb">Components</${Breadcrumb}-item>
                <${Breadcrumb}-item>${Breadcrumb}</${Breadcrumb}-item>
            </${Breadcrumb}>
        `)
        expect(vm.$el.querySelectorAll(`${prefixCls}-item-link`).length).toBe(3)

        vm.$nextTick(_ => {
            expect(vm.$el.querySelector(`${prefixCls}-item-separator`).innerHTML).toBe('<b class="demo-breadcrumb-separator">=&gt;</b>')
            done()
        })
    })
})
