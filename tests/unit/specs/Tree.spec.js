/**
 * Created by gaoguoqing on 2018/12/4.
 *
 */
import { createTest, createVue, destroyVM } from '../utils'
import TreeComponent from '&/components/tree'
import { prefix } from '&/utils/common'

const prefixCls = `.${prefix}tree`
const checkboxCls = `.${prefix}checkbox`
const Tree = `${prefix}tree`

describe('Tree', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('create', () => {
        vm = createTest(TreeComponent, {
            data: [
                {
                    name: 'parent 1',
                    expand: true,
                    children: [
                        {
                            name: 'parent 1-1',
                            children: [
                                {
                                    name: 'leaf 1-1-1'
                                },
                                {
                                    name: 'leaf 1-1-2'
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        const elm = vm.$el
        expect(elm.classList).toContain(`${prefix}tree`)
        expect(elm.querySelector(`${prefixCls}-children`)).toBeTruthy()
        expect(elm.querySelector(`${prefixCls}-arrow`)).toBeTruthy()
        expect(elm.querySelector(`${prefixCls}-name`)).toBeTruthy()
    })

    describe('defaultOptions', () => {
        it('selected', () => {
            vm = createTest(TreeComponent, {
                data: [
                    {
                        name: 'parent 1',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                name: 'parent 1-1',
                                children: [
                                    {
                                        name: 'leaf 1-1-1'
                                    },
                                    {
                                        name: 'leaf 1-1-2'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            const elm = vm.$el
            expect(elm.querySelector(`${prefixCls}-name-selected`)).toBeTruthy()
        })
        it('expand', () => {
            vm = createTest(TreeComponent, {
                data: [
                    {
                        name: 'parent 1',
                        expand: true,
                        children: [
                            {
                                name: 'parent 1-1',
                                children: [
                                    {
                                        name: 'leaf 1-1-1'
                                    },
                                    {
                                        name: 'leaf 1-1-2'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            const elm = vm.$el
            expect(elm.querySelector(`.bw-xiasanjiao`)).toBeTruthy()
        })
        it('disabled', () => {
            vm = createTest(TreeComponent, {
                data: [
                    {
                        name: 'parent 1',
                        disabled: true,
                        children: [
                            {
                                name: 'parent 1-1',
                                children: [
                                    {
                                        name: 'leaf 1-1-1'
                                    },
                                    {
                                        name: 'leaf 1-1-2'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                showCheckbox: true
            })
            const elm = vm.$el
            expect(elm.querySelector(`${checkboxCls}-disabled`)).toBeTruthy()
        })

        it('checked', () => {
            vm = createTest(TreeComponent, {
                data: [
                    {
                        name: 'parent 1',
                        checked: true,
                        children: [
                            {
                                name: 'parent 1-1',
                                children: [
                                    {
                                        name: 'leaf 1-1-1'
                                    },
                                    {
                                        name: 'leaf 1-1-2'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                showCheckbox: true
            })
            const elm = vm.$el
            expect(elm.querySelector(`${checkboxCls}-checked`)).toBeTruthy()
        })
    })

    describe('events', () => {
        // it('on-select', done => {
        //     let result
        //     vm = createVue({
        //         template: `
        //         <${Tree} :data='data' @on-select='handleSelect'></${Tree}>
        //       `,
        //         data () {
        //             return {
        //                 data: [
        //                     {
        //                         name: 'parent 1',
        //                         expand: true,
        //                         children: [
        //                             {
        //                                 name: 'parent 1-1',
        //                                 children: [
        //                                     {
        //                                         name: 'leaf 1-1-1'
        //                                     },
        //                                     {
        //                                         name: 'leaf 1-1-2'
        //                                     }
        //                                 ]
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         },
        //
        //         methods: {
        //             handleSelect (options) {
        //                 result = options
        //             }
        //         }
        //     }, true)
        //     vm.$el.querySelectorAll(`${prefixCls}-name`)[1].click()
        //     setTimeout(_ => {
        //         expect(result).to.exist
        //         done()
        //     }, 200)
        // })
        //
        it('on-expand', done => {
            let result
            vm = createVue({
                template: `
                <${Tree} :data='data' @on-expand='handleExpand'></${Tree}>
              `,
                data () {
                    return {
                        data: [
                            {
                                name: 'parent 1',
                                expand: true,
                                children: [
                                    {
                                        name: 'parent 1-1',
                                        children: [
                                            {
                                                name: 'leaf 1-1-1'
                                            },
                                            {
                                                name: 'leaf 1-1-2'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                methods: {
                    handleExpand (options) {
                        result = options
                    }
                }
            }, true)
            vm.$el.querySelectorAll(`.${prefix}icon`)[1].click()
            setTimeout(_ => {
                expect(result).toBeTruthy()
                done()
            }, 200)
        })

        it('on-checked', done => {
            let result
            vm = createVue({
                template: `
                    <${Tree} :data='data' show-checkbox  @on-check='handleChecked'></${Tree}>
              `,
                data () {
                    return {
                        data: [
                            {
                                name: 'parent 1',
                                expand: true,
                                children: [
                                    {
                                        name: 'parent 1-1',
                                        children: [
                                            {
                                                name: 'leaf 1-1-1'
                                            },
                                            {
                                                name: 'leaf 1-1-2'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                methods: {
                    handleChecked (options) {
                        result = options
                    }
                }
            }, true)
            vm.$el.querySelectorAll(`${checkboxCls}`)[1].click()
            setTimeout(_ => {
                expect(result).toBeTruthy()
                done()
            }, 20)
        })
    })
})
