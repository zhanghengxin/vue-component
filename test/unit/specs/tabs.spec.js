import Tabs from '&/components/Tabs'
import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
describe('Tabs.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('label', () => {
        vm = createTest(Progress, {
            label:"标签一",
            name: '1'
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[0]).to.equal('标签一')
    })
    it('disabled', () => {
        vm = createTest(Progress, {
            disabled:true,
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[1]).to.equal('disabled')
    })
    it('icon', () => {
        vm = createTest(Progress, {
            icon:"zhushou_gw"
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[0]).to.equal('zhushou_gw')
    })
    it('type', () => {
        vm = createTest(Progress, {
            type:"line"
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[1]).to.equal('line')
    })
    it('type', () => {
        vm = createTest(Progress, {
            type:"line"
        }, true)
        let Elm = vm.$el
        expect(Elm.children[0].children[1]).to.equal('line')
    })
})
