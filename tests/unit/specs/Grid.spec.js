/**
 * Created by gaoguoqing on 2018/11/30.
 *
 */
import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'

const colCls = `.${prefix}col`
const Col = `${prefix}col`
const Row = `${prefix}row`

describe('Col&Row', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    // it('interval', () => {
    //     vm = createVue({
    //         template: `
    //             <${Row} interval=20>
    //                <${Col} span=6>
    //                   <div>col-6</div>
    //                </${Col}>
    //                <${Col} span=6>
    //                   <div>col-6</div>
    //                </${Col}>
    //                <${Col} span=6>
    //                   <div>col-6</div>
    //                </${Col}>
    //                <${Col} span=6>
    //                   <div>col-6</div>
    //                </${Col}>
    //             </${Row}>
    //         `
    //     }, true)
    //     let elm = vm.$el
    //     expect(elm.querySelector(`${colCls}-span-6`).style.paddingLeft).to.equal('10px')
    //     expect(elm.querySelector(`${colCls}-span-6`).style.paddingRight).to.equal('10px')
    // })

    // it('offset', () => {
    //     vm = createVue({
    //         template: `
    //             <${Row}>
    //                 <${Col} span="10" offset="6">col-10 | offset-6</${Col}>
    //                 <${Col} span="6" offset="2">col-6 | pull-2</${Col}>
    //             </${Row}>
    //         `
    //     }, true)
    //     let elm = vm.$el
    //     expect(elm.querySelector(`${colCls}-offset-6`).style.marginLeft).to.equal('25%')
    // })

    it('flex-justify-start', () => {
        vm = createVue({
            template: `
                <${Row} type="flex" justify="start">
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-start`)
    })

    it('flex-justify-end', () => {
        vm = createVue({
            template: `
                 <${Row} type="flex" justify="end">
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-end`)
    })

    it('flex-justify-center', () => {
        vm = createVue({
            template: `
                 <${Row} type="flex" justify="center">
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-center`)
    })

    it('flex-justify-space-between', () => {
        vm = createVue({
            template: `
                <${Row} type="flex" justify="space-between">
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-space-between`)
    })

    it('flex-justify-space-around', () => {
        vm = createVue({
            template: `
                <${Row} type="flex" justify="space-around">
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                   <${Col} span="4">col-4</${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-space-around`)
    })

    it('flex-align-top', () => {
        vm = createVue({
            template: `
                <${Row} type="flex" justify="center" align="top">
                    <${Col} span="6"><p style="height: 80px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 30px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 100px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 60px">col-4</p></${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-top`)
    })

    it('flex-align-bottom', () => {
        vm = createVue({
            template: `
                <${Row} type="flex" justify="center" align="bottom">
                    <${Col} span="6"><p style="height: 80px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 30px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 100px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 60px">col-4</p></${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-bottom`)
    })

    it('flex-align-middle', () => {
        vm = createVue({
            template: `
                <${Row} type="flex" justify="center" align="middle">
                    <${Col} span="6"><p style="height: 80px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 30px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 100px">col-4</p></${Col}>
                    <${Col} span="6"><p style="height: 60px">col-4</p></${Col}>
                </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.classList).toContain(`${Row}-flex-middle`)
    })

    it('flex-order', () => {
        vm = createVue({
            template: `
                 <${Row} type="flex">
                       <${Col} span="6" order="4">1 | order-4</${Col}>
                       <${Col} span="6" order="3">2 | order-3</${Col}>
                       <${Col} span="6" order="2">3 | order-2</${Col}>
                       <${Col} span="6" order="1">4 | order-1</${Col}>
                 </${Row}>
            `
        }, true)
        let elm = vm.$el
        expect(elm.querySelector(`${colCls}-order-1`)).toBeTruthy()
    })
})
