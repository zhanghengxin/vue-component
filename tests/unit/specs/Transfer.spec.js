/*
 * @Author: hanshuai@baiwang.com
 * @Date: 2019-01-03 15:37:16
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 11:34:55
 */

import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
let bTransfer = prefix + 'transfer'

describe('Transfer', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTransfer}></${bTransfer}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bTransfer}`)).toBeTruthy()
    })

    it('titles', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTransfer} :titles="titles"></${bTransfer}>
                </div>
            `,
            data () {
                return {
                    titles: ['from', 'to']
                }
            }
        })
        expect(vm.$el.querySelectorAll(`.${bTransfer}-list-header-title`)[0].innerHTML).toContain('from')
        expect(vm.$el.querySelectorAll(`.${bTransfer}-list-header-title`)[1].innerHTML).toContain('to')
    })

    it('filterable', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTransfer} filterable>
                    </${bTransfer}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bTransfer}-search`)).toBeTruthy()
    })

    it('filter-placeholder', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTransfer} 
                        filterable 
                        filter-placeholder='hello world'>
                    </${bTransfer}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${prefix}input`).getAttribute('placeholder')).toContain('hello world')
    })

    it('not-found-text', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTransfer} not-found-text='列表数据为空'>
                    </${bTransfer}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bTransfer}-list-content-not-found`).innerHTML).toContain('列表数据为空')
    })
})
