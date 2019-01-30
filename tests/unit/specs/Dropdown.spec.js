import {createVue, destroyVM} from '../utils'
import { prefix } from '&/utils/common'
const Dropdown = `${prefix}dropdown`

describe('Dropwdown', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('create && disabled && divided', done => {
        vm = createVue({
            template: `
            <${Dropdown}>
                <span class=>别唐国顿 <b-icon type="xia" size="14" color="#52b7fc"></b-icon></span>
                <${Dropdown}-menu slot="list">
                    <${Dropdown}-item>海天龙战血玄黄</${Dropdown}-item>
                    <${Dropdown}-item>披发长歌览大荒</${Dropdown}-item>
                    <${Dropdown}-item>易水萧萧人去也</${Dropdown}-item>
                    <${Dropdown}-item divided disabled>一天明月白如霜</${Dropdown}-item>
                </${Dropdown}-menu>
            </${Dropdown}>
            `
        }, true)
        vm.$nextTick(_ => {
            const options = vm.$el.querySelectorAll('.b-drop .b-dropdown-item')
            expect(vm.$el.className).toBe(`${Dropdown}`)
            expect(options.length).toBe(4)
            expect(options[3].classList).toContain('b-dropdown-item-divided')
            expect(options[3].classList).toContain('b-dropdown-item-disabled')
            expect(vm.$el.querySelector('.b-drop').style.display).toBe('none')
            done()
        })
    })
    // it('click', done => {
    //     vm = createVue({
    //         template: `
    //         <${Dropdown} trigger="click">
    //             <span class=>别唐国顿 <b-icon type="xia" size="14" color="#52b7fc"></b-icon></span>
    //             <${Dropdown}-menu slot="list">
    //                 <${Dropdown}-item>海天龙战血玄黄</${Dropdown}-item>
    //                 <${Dropdown}-item>披发长歌览大荒</${Dropdown}-item>
    //                 <${Dropdown}-item>易水萧萧人去也</${Dropdown}-item>
    //                 <${Dropdown}-item divided disabled>一天明月白如霜</${Dropdown}-item>
    //             </${Dropdown}-menu>
    //         </${Dropdown}>
    //         `
    //     }, true)
    //     vm.$nextTick(_ => {
    //         vm.$el.children[0].click()
    //         setTimeout(_ => {
    //             expect(vm.$el.querySelector('.b-drop').style.position).toBe('absolute')
    //             done()
    //         }, 20)
    //     })
    // })
})
