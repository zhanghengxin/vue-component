import {destroyVM} from '../utils'
import inputNumber from '&/components/input-number'
import { mount } from '@vue/test-utils'

describe('inputNumber', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', done => {
        vm = mount(inputNumber, {
            propsData: {
                value: ''
            }
        })
        setTimeout(_ => {
            vm.trigger('mouseenter')
            const up = vm.find('.b-input-number-up')
            const down = vm.find('.b-input-number-down')
            up.trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][1][0]).toBe(1)
                down.trigger('click')
                setTimeout(_ => {
                    expect(vm.emitted()['on-change'][2][0]).toBe(0)
                    done()
                }, 20)
            }, 20)
        }, 20)
    })

    it('create', done => {
        vm = mount(inputNumber, {
            propsData: {
                value: '',
                step: 0.01
            }
        })
        setTimeout(_ => {
            vm.trigger('mouseenter')
            const up = vm.find('.b-input-number-up')
            const down = vm.find('.b-input-number-down')
            up.trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][1][0]).toBe(0.01)
                down.trigger('click')
                setTimeout(_ => {
                    expect(vm.emitted()['on-change'][2][0]).toBe(0)
                    done()
                }, 20)
            }, 20)
        }, 20)
    })

    it('max', done => {
        vm = mount(inputNumber, {
            propsData: {
                value: '',
                step: 0.01,
                max: 0.01
            }
        })
        setTimeout(_ => {
            vm.trigger('mouseenter')
            const up = vm.find('.b-input-number-up')
            up.trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][1][0]).toBe(0.01)
                up.trigger('click')
                setTimeout(_ => {
                    expect(vm.emitted()['on-change'][1][0]).toBe(0.01)
                    done()
                }, 20)
            }, 20)
        }, 20)
    })

    it('min', done => {
        vm = mount(inputNumber, {
            propsData: {
                value: 0.03,
                step: 0.02,
                min: 0.01
            }
        })
        setTimeout(_ => {
            vm.trigger('mouseenter')
            const down = vm.find('.b-input-number-down')
            down.trigger('click')
            setTimeout(_ => {
                expect(vm.emitted()['on-change'][1][0]).toBe(0.01)
                down.trigger('click')
                setTimeout(_ => {
                    expect(vm.emitted()['on-change'][1][0]).toBe(0.01)
                    done()
                }, 20)
            }, 20)
        }, 20)
    })
})
