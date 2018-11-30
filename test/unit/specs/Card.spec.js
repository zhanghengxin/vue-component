/*
 * @Author: hanshuai
 * @Date: 2018-11-26 18:27:21
 * @Last Modified by: hanshuai
 * @Last Modified time: 2018-11-27 10:10:53
 */

import { createTest, createVue, destroyVM } from '../utils'
import Card from '&/components/card'
import { prefix } from '&/utils/common'
let bCard = prefix + 'card'

describe('Card', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('slot:title', () => {
        vm = createVue(`
            <${bCard}>
                <header slot='title'>今晚打老虎，你来不来</header>
            </${bCard}>
        `)
        expect(vm.$el.querySelector(`.${bCard}-header`)).to.property('textContent').to.include('今晚打老虎，你来不来')
    })

    it('title', () => {
        vm = createTest(Card, {
            title: '你肿么了'
        })
        expect(vm.$el.querySelector(`.${bCard}-header`)).to.property('textContent').to.include('你肿么了')
    })

    it('slot:extra', () => {
        vm = createVue(`
            <${bCard}>
                <header slot='extra'>今晚打老虎，你来不来</header>
            </${bCard}>
        `)
        expect(vm.$el.querySelector(`.${bCard}-extra`)).to.property('textContent').to.include('今晚打老虎，你来不来')
    })

    it('border', () => {
        vm = createTest(Card, {
            border: true,
            shadow: false
        })
        expect(vm.$el.classList.contains(`${bCard}-border`)).to.be.true
    })

    it('shadow', () => {
        vm = createTest(Card, {
            shadow: true
        })
        expect(vm.$el.classList.contains(`${bCard}-shadow`)).to.be.true
    })

    it('disHover', () => {
        vm = createTest(Card, {
            disHover: true
        })
        expect(vm.$el.classList.contains(`${bCard}-dis-hover`)).to.be.true
    })

    it('padding', () => {
        vm = createTest(Card, {
            padding: 18
        })
        expect(vm.$el.querySelector(`.${bCard}-body`).style.padding).to.equal('18px')
    })
})
