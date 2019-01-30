/*
 * @Author: hanshuai@baiwang.com
 * @Date: 2019-01-24 14:53:01
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 11:28:50
 */

import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const bSplit = prefix + 'split'

describe('Split', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bSplit}></${bSplit}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bSplit}`)).toBeTruthy()
    })

    it('mode:horizontal', () => {
        vm = createVue({
            template: `
                <div>
                    <${bSplit} mode='horizontal'>
                        <div slot="left">
                            左面
                        </div>
                        <div slot="right">
                            右面
                        </div>
                    </${bSplit}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bSplit}-horizontal`)).toBeTruthy()
    })

    it('mode:vertical', () => {
        vm = createVue({
            template: `
                <div>
                    <${bSplit} mode='vertical'>
                        <div slot="top">
                            上面
                        </div>
                        <div slot="bottom">
                            下面
                        </div>
                    </${bSplit}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bSplit}-vertical`)).toBeTruthy()
    })

    describe('slot', () => {
        const directions = ['left', 'right', 'top', 'bottom']
        const test = i => it(`${directions[i]}`, () => {
            const mode = i < 2 ? 'horizontal' : 'vertical'
            vm = createVue({
                template: `
                    <div>
                        <${bSplit} mode=${mode}>
                            <div slot=${directions[i]}></div>
                        </${bSplit}>
                    </div>
                `
            })
            expect(vm.$el.querySelector(`.${directions[i]}-pane`)).toBeTruthy()
        })

        for (let key in directions) {
            test(key)
        }
    })
})
