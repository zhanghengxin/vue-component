import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}tabs`
describe('Tabs.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    // it('label', () => {
    //     vm = createTest(Tabs, {
    //         label:"标签一",
    //         name: '1'
    //     }, true)
    //     let Elm = vm.$el
    //     expect(Elm.children[0]).to.equal("标签一")
    // })
    // it('disabled', () => {
    //     vm = createTest(Tabs, {
    //         disabled:false
    //     }, false)
    //     let Elm = vm.$el
    //     expect(Elm.children[0].children[0].disabled).to.be.false
    // })
    it('disabled', () => {
        vm = createVue({
            template: `
            <tabs value ="0">
                <tab-panel label="标签一" name="0">
                    标签一
                </tab-panel>
                <tab-panel label="标签二" name="1" disabled>
                    标签二
                </tab-panel>
            </tabs>
            `
        }, true)
        let Elm = vm.$el
        expect(Elm.querySelector(`${prefixCls}-disabled`)).to.not.exist
        expect(Elm.querySelector(`${prefixCls}-bar`)).to.not.exist
    })
    // it('type', () => {
    //     vm = createTest(Tabs, {
    //         type:"line"
    //     }, true)
    //     let Elm = vm.$el
    //     expect(Elm.children[0].children[1]).to.equal('line')
    // })
    // it('type', () => {
    //     vm = createTest(Tabs, {
    //         type:"line"
    //     }, true)
    //     let Elm = vm.$el
    //     expect(Elm.children[0].children[1]).to.equal('line')
    // })
})
