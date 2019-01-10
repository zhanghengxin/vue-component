import {createVue, destroyVM, triggerEvent} from '../utils'
import { prefix } from '&/utils/common'
const prefixCls = `.${prefix}select`
const Select = `${prefix}select`
const options = [{
    name: '增专',
    code: '004'
}, {
    name: '增普',
    code: '007',
    disabled: true
}, {
    name: '机动车',
    code: '005'
}, {
    name: '电子票',
    code: '025'
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
    it('create && clearabled && v-model', done => {
        vm = createVue({
            template: `
            <${Select}
                v-model="value"
                :options='options'
                :clearabled="clearabled">
            </${Select}>
            `,
            data () {
                return {
                    options: options,
                    clearabled: true,
                    value: '004'
                }
            }
        }, true)
        vm.$nextTick(_ => {
            expect(vm.$el.className).to.equal(`${Select}-container`)
            expect(vm.$el.querySelector(`${prefixCls}-selection-content`).textContent).to.equal('增专')
            expect(vm.$el.querySelector(`[type='hidden']`).value).to.equal('004')
            expect(vm.$el.querySelector(`.bw-shibai-mian`)).to.exist
            expect(vm.$el.querySelector(`.b-drop`)).to.exist
            vm.$el.querySelector(`.bw-shibai-mian`).click()
            vm.$nextTick(_ => {
                expect(vm.$el.querySelector(`${prefixCls}-selection-content`).textContent).to.equal('请选择')
                expect(vm.$el.querySelector(`[type='hidden']`).value).to.equal('')
                // expect(vm.value).to.equal('')
                done()
            })
        })
    })

    it('single select', done => {
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
                    value: '',
                    count: 0
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
            expect(vm.value).to.equal('')
            triggerEvent(options[2], 'mouseenter')
            options[2].click()
            vm.$nextTick(_ => {
                expect(vm.value).to.equal('005')
                expect(vm.count).to.equal(1)
                triggerEvent(options[3], 'mouseenter')
                options[3].click()
                vm.$nextTick(_ => {
                    expect(vm.value).to.equal('025')
                    expect(vm.count).to.equal(2)
                    done()
                })
            })
        })
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
            expect(options[1].classList.contains('b-option-disabled')).to.true
            options[1].click()
            vm.$nextTick(_ => {
                expect(vm.value).to.equal('')
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
            expect(vm.$el.querySelector('.b-select-selection-disabled')).to.exist
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
            expect(options.length).to.equal(4)
            done()
        })
    })

    it('multiple select', done => {
        vm = createVue({
            template: `
            <${Select}
                v-model="value"
                :options='options'
                :multiple='multiple'
                @on-change='handleChange'>
            </${Select}>
            `,
            data () {
                return {
                    options: options,
                    multiple: true,
                    value: '',
                    count: 0
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
            expect(vm.value).to.equal('')
            options[2].click()
            options[3].click()
            vm.$nextTick(_ => {
                expect(vm.value.join(',')).to.equal('005,025')
                // expect(vm.count).to.equal(2)
                done()
            })
        })
    })

    it('multiple remove-tag', done => {
        vm = createVue({
            template: `
            <${Select}
                v-model="value"
                :options='options'
                :multiple='multiple'>
            </${Select}>
            `,
            data () {
                return {
                    options: options,
                    multiple: true,
                    value: ['005', '025']
                }
            }
        }, true)
        vm.$nextTick(_ => {
            const tagCloseIcons = vm.$el.querySelectorAll('.bw-quxiao-guanbi-shanchu')
            expect(vm.value.join(',')).to.equal('005,025')
            tagCloseIcons[1].click()
            vm.$nextTick(_ => {
                expect(vm.value.join(',')).to.equal('005')
                done()
            })
        })
    })
})
