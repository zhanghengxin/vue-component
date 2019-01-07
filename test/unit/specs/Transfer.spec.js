/*
 * @Author: hanshuai@baiwang.com
 * @Date: 2019-01-03 15:37:16
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-03 16:28:03
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
        expect(vm.$el.querySelector(`.${bTransfer}`)).to.exist
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
        expect(vm.$el.querySelectorAll(`.${bTransfer}-list-header-title`)[0]).to.property('textContent').to.include('from')
        expect(vm.$el.querySelectorAll(`.${bTransfer}-list-header-title`)[1]).to.property('textContent').to.include('to')
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
        expect(vm.$el.querySelector(`.${bTransfer}-search`)).to.exist
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
        expect(vm.$el.querySelector(`.${prefix}input`).getAttribute('placeholder')).to.include('hello world')
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
        expect(vm.$el.querySelector(`.${bTransfer}-list-content-not-found`)).to.property('textContent').to.include('列表数据为空')
    })
})
