/*
 * @Author: hanshuai
 * @Date: 2018-11-26 18:27:21
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 11:21:24
 */

import { createTest, destroyVM } from '../utils'
import { mount } from '@vue/test-utils'
import Card from '&/components/card'
import { prefix } from '&/utils/common'
let bCard = prefix + 'card'

describe('Card', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('slot:title', () => {
        vm = mount({
            render () {
                return (
                    <Card>
                        <header slot='title'>今晚打老虎，你来不来</header>
                    </Card>
                )
            }
        })
        expect(vm.find(`.${bCard}-header header`).text()).toBe('今晚打老虎，你来不来')
    })

    it('title', () => {
        vm = mount(Card, {
            propsData: {
                title: '你肿么了'
            }
        })
        expect(vm.find(`.${bCard}-header-inner span`).text()).toBe('你肿么了')
    })

    it('slot:extra', () => {
        vm = mount({
            render () {
                return (
                    <Card>
                        <header slot='extra'>今晚打老虎，你来不来</header>
                    </Card>
                )
            }
        })
        expect(vm.find(`.${bCard}-extra`).text()).toBe('今晚打老虎，你来不来')
    })

    it('bordered', () => {
        vm = createTest(Card, {
            bordered: true,
            shadow: false
        })
        expect(vm.$el.classList).toContain(`${bCard}-border`)
    })

    it('shadow', () => {
        vm = createTest(Card, {
            shadow: true
        })
        expect(vm.$el.classList).toContain(`${bCard}-shadow`)
    })

    it('disHover', () => {
        vm = createTest(Card, {
            disHover: true
        })
        expect(vm.$el.classList).toContain(`${bCard}-dis-hover`)
    })

    it('padding', () => {
        vm = createTest(Card, {
            padding: 18
        })
        expect(vm.$el.querySelector(`.${bCard}-body`).style.padding).toBe('18px')
    })
})
