import {Tabs, TabsPanel} from '&/components/tabs'
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
        vm = createVue(TabsPanel, {
            disabled:false,
            navList:[{closable: null,
                disabled: false,
                icon: "",
                label: "标签一",
                name: "0"},{closable: null,
                disabled: false,
                icon: "",
                label: "标签二",
                name: "1"}]
        },true)
        let Elm = vm.$el
        console.log(Elm)
        console.log(Elm.children[0])
        console.log(Elm.children[0].children)
        // expect(Elm.querySelector(`${prefixCls}`)).to.exist
        // expect(Elm.classList.contains(`${prefixCls}`)).to.be.true
        expect(Elm.children.classList.contains(`${prefixCls}-disabled`)).to.be.false
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
