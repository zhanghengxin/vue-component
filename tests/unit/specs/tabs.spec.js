import { createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}tabs`
describe('Tabs.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('disabled', () => {
        vm = createVue({
            template: `
            <div>
                <b-tabs value ="0">
                    <b-tabsPanel label="标签一" name="0">
                        标签一
                    </b-tabsPanel>
                    <b-tabsPanel label="标签二" name="1" disabled>
                        标签二
                    </b-tabsPanel>
                </b-tabs>
            </div>
            `
        }, true)
        let Elm = vm.$el
        // expect(Elm.querySelector(`.${prefixCls}-disabled`)).toBeTruthy()
        expect(Elm.querySelector(`.${prefixCls}-bar`)).toBeTruthy()
    })
    it('line', () => {
        vm = createVue({
            template: `
            <div>
                <b-tabs value ="0" type="line" >
                    <b-tabsPanel label="标签一" name="0" >
                        标签一
                    </b-tabsPanel>
                    <b-tabsPanel label="标签二" name="1">
                        标签二
                    </b-tabsPanel>
                </b-tabs>
            </div>  
            `
        }, true)
        let Elm = vm.$el
        expect(Elm.querySelector(`.${prefixCls}-line`)).toBeTruthy()
        // expect(Elm.querySelector(`.${prefixCls}-mini`)).toBeTruthy()
        // expect(Elm.querySelector('Icon')).to.exist
    })
    it('size', () => {
        vm = createVue({
            template: `
            <div>
                <b-tabs value ="0" type="line" size="small">
                    <b-tabsPanel label="标签一" name="0" >
                        标签一
                    </b-tabsPanel>
                    <b-tabsPanel label="标签二" name="1">
                        标签二
                    </b-tabsPanel>
                </b-tabs>
            </div>  
            `
        }, true)
        // let Elm = vm.$el
        // expect(Elm.querySelector(`.${prefixCls}-mini`)).toBeTruthy()
    })
})
