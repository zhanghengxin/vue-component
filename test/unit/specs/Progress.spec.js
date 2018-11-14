/**
 * Created by gaoguoqing on 2018/9/8.
 *
 */
import Progress from '&/components/Progress'
import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'

describe('Progress.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('color', () => {
        vm = createTest(Progress, {
            percentage:40,
            color: 'yellow'
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[0].children[0].style.backgroundColor).to.equal('yellow')
    })
    it('vertical', () => {
        vm = createTest(Progress, {
            percentage:40,
            vertical: true,
            strokeWidth:20
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[0].children[0].style.width).to.equal('20px')
        expect(Elm.children[0].children[0].children[0].style.height).to.equal('40%')
    })
    it('status', () => {
        vm = createTest(Progress, {
            percentage:40,
            status: 'Success'
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[0].children[0].style.width).to.equal('100%')
    })
    it('showText', () => {
        vm = createTest(Progress, {
            percentage:40,
            showText: false
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[1]).to.equal(undefined)
    })
})
