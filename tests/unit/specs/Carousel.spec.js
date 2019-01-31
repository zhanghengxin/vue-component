/*
 * @Author: hanshuai
 * @Date: 2018-11-30 09:31:52
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 11:22:54
 */

import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
let bCarousel = prefix + 'carousel'

describe('Carousel', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bCarousel}>
                        <${bCarousel}-item><div class='carousel-example'>1</div></${bCarousel}-item>
                        <${bCarousel}-item><div class='carousel-example'>2</div></${bCarousel}-item>
                    </${bCarousel}>
                </div>
            `
        })
        expect(vm.$el.querySelectorAll(`.${bCarousel}-fade`).length).toBe(2)
    })

    it('height', () => {
        vm = createVue({
            template: `
            <div>
                <${bCarousel} :height='720'>
                    <${bCarousel}-item><div class='carousel-example'>1</div></${bCarousel}-item>
                    <${bCarousel}-item><div class='carousel-example'>2</div></${bCarousel}-item>
                </${bCarousel}>
            </div>
            `
        })
        expect(vm.$el.querySelector(`.${bCarousel}-wrapper`).style.height).toBe('720px')
    })

    it('animation', () => {
        vm = createVue({
            template: `
                <div>
                    <${bCarousel} animation='slide'>
                        <${bCarousel}-item><div class='carousel-example'>1</div></${bCarousel}-item>
                        <${bCarousel}-item><div class='carousel-example'>2</div></${bCarousel}-item>
                    </${bCarousel}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${bCarousel}-slide`)).toBeTruthy()
    })
    it('arrow', () => {
        vm = createVue({
            template: `
            <div>
                <${bCarousel} :arrow='true'>
                    <${bCarousel}-item><div class='carousel-example'>1</div></${bCarousel}-item>
                    <${bCarousel}-item><div class='carousel-example'>2</div></${bCarousel}-item>
                </${bCarousel}>
            </div>
            `
        })
        expect(vm.$el.querySelector(`.${bCarousel}-prev`)).toBeTruthy()
        expect(vm.$el.querySelector(`.${bCarousel}-next`)).toBeTruthy()
    })
    it('pointer', () => {
        vm = createVue({
            template: `
            <div>
                <${bCarousel} :pointer='true'>
                    <${bCarousel}-item><div class='carousel-example'>1</div></${bCarousel}-item>
                    <${bCarousel}-item><div class='carousel-example'>2</div></${bCarousel}-item>
                </${bCarousel}>
            </div>
            `
        })
        expect(vm.$el.querySelector(`.${bCarousel}-control`)).toBeTruthy()
    })
    it('auto', done => {
        vm = createVue({
            template: `
            <div>
                <${bCarousel} :auto='true' animation='slide' :interval='60'>
                    <${bCarousel}-item><div class='carousel-example'>1</div></${bCarousel}-item>
                    <${bCarousel}-item><div class='carousel-example'>2</div></${bCarousel}-item>
                </${bCarousel}>
            </div>
          `
        })
        setTimeout(() => {
            let items = vm.$el.querySelectorAll(`.${bCarousel}-slide`)
            expect(items[0].classList.contains('is-active')).toBeTruthy()
            setTimeout(() => {
                expect(items[1].classList.contains('is-active')).toBeTruthy()
                done()
            }, 60)
        }, 10)
    })
})
