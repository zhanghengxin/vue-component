/*
 * @Author: hanshuai
 * @Date: 2018-11-30 09:31:52
 * @Last Modified by: hanshuai
 * @Last Modified time: 2018-11-30 14:03:23
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
        expect(vm.$el.querySelectorAll(`.${bCarousel}-fade`).length).to.equal(2)
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
        expect(vm.$el.querySelector(`.${bCarousel}-wrapper`).style.height).to.be.equal('720px')
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
        expect(vm.$el.querySelector(`.${bCarousel}-slide`)).to.exist
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
        expect(vm.$el.querySelector(`.${bCarousel}-prev`)).to.exist
        expect(vm.$el.querySelector(`.${bCarousel}-next`)).to.exist
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
        expect(vm.$el.querySelector(`.${bCarousel}-control`)).to.exist
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
            expect(items[0].classList.contains('is-active')).to.true
            setTimeout(() => {
                expect(items[1].classList.contains('is-active')).to.true
                done()
            }, 60)
        }, 10)
    })
})
