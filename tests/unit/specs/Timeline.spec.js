/*
 * @Author: hanshuai@baiwang.com
 * @Date: 2019-01-21 11:44:36
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 11:32:37
 */

import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const bTimeline = prefix + 'timeline'

describe('Timeline', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTimeline}>
                        <${bTimeline}-item></${bTimeline}-item>
                    </${bTimeline}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bTimeline}`)).toBeTruthy()
        expect(vm.$el.querySelector(`.${bTimeline}-item`)).toBeTruthy()
    })

    it('pending', () => {
        vm = createVue({
            template: `
                <div>
                    <${bTimeline} pending>
                        <${bTimeline}-item></${bTimeline}-item>
                    </${bTimeline}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bTimeline}-pending`)).toBeTruthy()
    })

    describe('color', () => {
        const colors = ['blue', 'green', 'red', 'orange']
        const test = i => it(`${colors[i]}`, () => {
            vm = createVue({
                template: `
                    <div>
                        <${bTimeline}>
                            <${bTimeline}-item color=${colors[i]}></${bTimeline}-item>
                        </${bTimeline}>
                    </div>
                `
            })
            expect(vm.$el.querySelector(`.${bTimeline}-item-head-${colors[i]}`)).toBeTruthy()
        })

        for (let key in colors) {
            test(key)
        }
    })
})
