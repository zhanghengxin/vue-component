/**
 * @author 靳宏灿
 * @date 2018/12/1
 * @Description: steps组件的测试用例
 */
// import Steps from '&/components/steps'
// import Step from '&/components/step'
import { createVue, destroyVM, triggerEvent } from '../utils'
import {prefix} from '&/utils/common'
const menu = `${prefix}menu`
const menuItem = `${prefix}menu-item`
const submenu = `${prefix}submenu`

const menuCss = `.${prefix}menu`
const menuHorizontalCss = `${prefix}menu-horizontal`
const menuOpenCss = `.${prefix}menu-opened`
const menuItemCss = `.${prefix}menu-item`
const subMenuCss = `.${prefix}menu-submenu`
const subMenuTitleCss = `.${prefix}menu-submenu-title`
const iconCss = `.${prefix}icon`

describe('Menu组件', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    // 测试是否创建成功
    it('ifExist', done => {
        vm = createVue({
            template: `
                <div>
                    <${menu} >
                        <${menuItem} name="1" iconType="caiji">1</${menuItem}>
                        <${menuItem} name="2">2</${menuItem}>
                        <${menuItem} name="3">3</${menuItem}>
                    </${menu}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        vm.$nextTick(() => {
            expect(Elm).toBeTruthy()
            done()
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('iconType', done => {
        vm = createVue({
            template: `
                <div>
                    <${menu} >
                        <${menuItem} name="1" iconType="caiji">1</${menuItem}>
                        <${menuItem} name="2">2</${menuItem}>
                        <${menuItem} name="3">3</${menuItem}>
                    </${menu}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        vm.$nextTick(() => {
            expect(Elm.querySelectorAll(`${menuCss} ${menuItemCss} ${iconCss}`)[0].classList).toContain(`bw-caiji`)
            done()
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('accordion:false open trigger:click', done => {
        vm = createVue({
            template: `
                <div>
                    <${menu} :accordion="false">
                        <${submenu} name="1" >
                            <template slot="title">
                                处理中心1
                            </template>
                            <${menuItem} name="1-1" iconType="caiji">1</${menuItem}>
                            <${menuItem} name="1-2">2</${menuItem}>
                            <${menuItem} name="1-3">3</${menuItem}>
                        </${submenu}>
                        <${submenu} name="2" >
                            <template slot="title">
                                处理中心2
                            </template>
                            <${menuItem} name="2-1" iconType="caiji">1</${menuItem}>
                            <${menuItem} name="2-2">2</${menuItem}>
                            <${menuItem} name="2-3">3</${menuItem}>
                        </${submenu}>
                    </${menu}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        vm.$nextTick(() => {
            let submenuList = Elm.querySelectorAll(`${menuCss} ${subMenuTitleCss}`)
            submenuList[0].click()
            submenuList[1].click()
            vm.$nextTick(function () {
                let submenuList2 = Elm.querySelectorAll(`${menuCss} ${menuOpenCss}`)
                expect(submenuList2.length).toBe(2)
                done()
            }, 200)
        }, 100)
    })

    // 测试size 和 current的属性和status
    it('accordion:true open trigger:hover', done => {
        vm = createVue({
            template: `
                <div>
                    <${menu} :accordion="true" trigger="hover">
                        <${submenu} name="1" >
                            <template slot="title">
                                处理中心1
                            </template>
                            <${menuItem} name="1-1" iconType="caiji">1</${menuItem}>
                            <${menuItem} name="1-2">2</${menuItem}>
                            <${menuItem} name="1-3">3</${menuItem}>
                        </${submenu}>
                        <${submenu} name="2" >
                            <template slot="title">
                                处理中心2
                            </template>
                            <${menuItem} name="2-1" iconType="caiji">1</${menuItem}>
                            <${menuItem} name="2-2">2</${menuItem}>
                            <${menuItem} name="2-3">3</${menuItem}>
                        </${submenu}>
                    </${menu}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        vm.$nextTick(() => {
            let submenuList = Elm.querySelectorAll(`${menuCss} ${subMenuCss}`)
            triggerEvent(submenuList[0], 'mouseenter')
            triggerEvent(submenuList[1], 'mouseenter')
            setTimeout(function () {
                let submenuList2 = Elm.querySelectorAll(`${menuCss} ${menuOpenCss}`)
                expect(submenuList2.length).toBe(1)
                done()
            }, 300)
        })
    })

    // 测试mode
    it('mode  horizontal', done => {
        vm = createVue({
            template: `
                <div>
                    <${menu} mode="horizontal">
                        <${menuItem} name="1" iconType="caiji">1</${menuItem}>
                        <${menuItem} name="2">2</${menuItem}>
                        <${menuItem} name="3">3</${menuItem}>
                    </${menu}>
                </div>
            `,
            data () {
                return {

                }
            }
        }, true)
        const Elm = vm.$el
        vm.$nextTick(() => {
            expect(Elm.querySelector(`${menuCss}`).classList).toContain(`${menuHorizontalCss}`)
            done()
        }, 100)
    })
})
