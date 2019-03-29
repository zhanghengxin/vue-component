import {createVue, destroyVM} from '../utils'
import select from '&/components/select'
import { prefix } from '&/utils/common'
import { mount } from '@vue/test-utils'
const prefixCls = `.${prefix}select`
const Select = `${prefix}select`
const options = [{
    label: '增专',
    value: '004'
}, {
    label: '增普',
    value: '007',
    disabled: true
}, {
    label: '机动车',
    value: '005'
}, {
    label: '电子票',
    value: '025'
}]

const options1 = [{
    label: '增专',
    value: '004'
}, {
    label: '增普',
    value: '007'
}, {
    label: '机动车',
    value: '005'
}, {
    label: '电子票',
    value: '025'
}]

describe('Select', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('create && clearable && v-model', done => {
        vm = createVue({
            template: `
            <${Select}
                v-model="value"
                :options='options'
                :clearable="clearable">
            </${Select}>
            `,
            data () {
                return {
                    options: options,
                    clearable: true,
                    value: '004'
                }
            }
        }, true)
        vm.$nextTick(_ => {
            expect(vm.$el.classList.contains(`${Select}`)).toBeTruthy()
            expect(vm.$el.querySelector(`${prefixCls}-main-content`).textContent).toBe('增专')
            expect(vm.$el.querySelector(`[type='hidden']`).value).toBe('004')
            expect(vm.$el.querySelector(`.bw-shibai-mian`)).toBeTruthy()
            expect(vm.$el.querySelector(`.b-drop`)).toBeTruthy()
            vm.$el.querySelector(`.bw-shibai-mian`).click()
            vm.$nextTick(_ => {
                expect(vm.$el.querySelector(`${prefixCls}-main-content`).textContent).toBe('请选择')
                expect(vm.$el.querySelector(`[type='hidden']`).value).toBe('')
                //     expect(vm.value).toBe('')
                done()
            })
        })
    })

    it('single select', done => {
        vm = mount(select, {
            propsData: {
                options: options,
                value: ''
            }
        })
        setTimeout(_ => {
            const options = vm.findAll('.b-option')
            options.at(0).trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][0][0]).toBe('004')
                done()
            }, 20)
        }, 20)
    })

    it('disabled option', done => {
        vm = createVue({
            template: `
            <${Select}
                v-model="value"
                :options='options'
                @on-change='handleChange'>
            </${Select}>
            `,
            data () {
                return {
                    options: options,
                    value: ''
                }
            },
            methods: {
                handleChange () {
                    this.count++
                }
            }
        }, true)
        vm.$nextTick(_ => {
            const options = vm.$el.querySelectorAll('.b-drop .b-option')
            expect(options[1].classList.contains('b-option-disabled')).toBeTruthy()
            options[1].click()
            vm.$nextTick(_ => {
                expect(vm.value).toBe('')
                done()
            })
        })
    })

    it('disabled select', done => {
        vm = vm = createVue({
            template: `
            <${Select}
                v-model="value"
                :options='options'
                :disabled='disabled'>
            </${Select}>
            `,
            data () {
                return {
                    options: options,
                    value: '',
                    disabled: true
                }
            }
        }, true)
        vm.$nextTick(_ => {
            expect(vm.$el.querySelector('.b-select-disabled')).toBeTruthy()
            done()
        })
    })

    it('namekey codeKey', done => {
        vm = vm = createVue({
            template: `
            <${Select}
                v-model="value"
                nameKey='label'
                codeKey='value'
                :options='options'>
            </${Select}>
            `,
            data () {
                return {
                    options: options1,
                    value: ''
                }
            }
        }, true)
        vm.$nextTick(_ => {
            const options = vm.$el.querySelectorAll('.b-drop .b-option')
            expect(options.length).toBe(4)
            done()
        })
    })

    it('multiple select', done => {
        vm = mount(select, {
            propsData: {
                options: options,
                multiple: true,
                value: ''

            }
        })
        setTimeout(_ => {
            const options = vm.findAll('.b-option')
            options.at(2).trigger('click')
            options.at(3).trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][1][0][0]).toBe('005')
                expect(vm.emitted()['on-change'][1][0][1]).toBe('025')
                done()
            }, 20)
        }, 20)
    })

    it('multiple remove-tag', done => {
        vm = mount(select, {
            propsData: {
                options: options,
                multiple: true,
                value: ['005', '025']
            }
        })
        setTimeout(_ => {
            const tagCloseIcons = vm.findAll('.bw-quxiao-guanbi-shanchu')
            tagCloseIcons.at(1).trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][1][0].join(',')).toBe('005')
                done()
            }, 20)
        }, 20)
    })
})
