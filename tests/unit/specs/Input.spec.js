// import Input from '&/components/input'
import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const prefixCls = `.${prefix}input`
const Input = `${prefix}input`

describe('Input', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', done => {
        vm = createVue({
            template: `
            <${Input}
            :minlength="3"
            :maxlength="5"
            placeholder="请输入"
            @focus="handleFocus"
            value="input"></${Input}>
          `,
            data () {
                return {
                    inputFocus: false
                }
            },
            methods: {
                handleFocus (e) {
                    this.inputFocus = true
                }
            }
        }, true)
        let inputElm = vm.$el.querySelector('input')
        setTimeout(() => {
            expect(inputElm.classList).toContain(`${prefix}input`)
            expect(inputElm.getAttribute('placeholder')).toBe('请输入')
            expect(inputElm.value).toBe('input')
            expect(inputElm.type).toBe('text')
            expect(inputElm.getAttribute('minlength')).toBe('3')
            expect(inputElm.getAttribute('maxlength')).toBe('5')
            done()
        }, 100)
    })

    // 测试 props
    describe('props', () => {
        const geInputVm = (props, options) => {
            return createVue(Object.assign({
                template: `
                    <div>
                        <${Input} ${props} v-model="value"></${Input}>
                    </div>
                `,

                data () {
                    return {
                        value: '测试'
                    }
                }
            }, options), true)
        }

        it('type', () => {
            vm = geInputVm(`type='password'`)
            expect(vm.$el.querySelector(`input`).type).toBe('password')
        })

        it('disabled', () => {
            vm = createVue({
                template: `
                    <div>
                        <${Input} :disabled='disabled'></${Input}>
                    </div>`,
                data () {
                    return {
                        disabled: true
                    }
                }
            }, true)
            expect(vm.$el.querySelector(`input`).disabled).toBeTruthy()
        })

        it('readonly', () => {
            vm = vm = createVue({
                template: `
                    <div>
                        <${Input} :readonly='readonly'></${Input}>
                    </div>`,
                data () {
                    return {
                        readonly: true
                    }
                }
            }, true)
            expect(vm.$el.querySelector(`input`).getAttribute('readonly')).toBeTruthy()
        })

        it('name', () => {
            vm = geInputVm(`name='userName'`)
            expect(vm.$el.querySelector(`input`).getAttribute('name')).toBe('userName')
        })

        it('size', () => {
            vm = geInputVm(`size='large'`)
            expect(vm.$el.querySelector(`${prefixCls}-box-large`)).toBeTruthy()
        })

        it('type', () => {
            vm = createVue({
                template: `
                    <div>
                        <${Input}
                        type='textarea'
                        autosize='autosize'></${Input}>
                    </div>`,
                data () {
                    return {
                        autosize: {
                            minRows: 3,
                            maxRows: 5
                        }
                    }
                }
            }, true)
            expect(vm.$el.querySelector('textarea')).toBeTruthy()
        })

        it('prefix', () => {
            vm = createVue({
                template: `
                    <div>
                        <${Input} :prefix='iconPrefix' icon='chaxun'></${Input}>
                    </div>`,
                data () {
                    return {
                        iconPrefix: true
                    }
                }
            }, true)
            expect(vm.$el.querySelector(`.bw-chaxun`)).toBeTruthy()
            expect(vm.$el.querySelector(`${prefixCls}-icon`)).toBeTruthy()
            expect(vm.$el.querySelector(`${prefixCls}-icon-prefix`)).toBeTruthy()
        })

        it('clear', done => {
            vm = createVue({
                template: `
                    <div>
                        <${Input} :clearable='clearable' v-model='value'></${Input}>
                    </div>`,
                data () {
                    return {
                        clearable: true,
                        value: '清空'
                    }
                }
            }, true)
            const InputEl = vm.$el.querySelector(`input`)
            const IconEl = vm.$el.querySelector(`.${prefix}icon`)
            expect(vm.$el.querySelector(`.bw-shibai-mian`)).toBeTruthy()
            expect(vm.$el.querySelector(`${prefixCls}-icon-suffix`)).toBeTruthy()
            expect(vm.$el.querySelector(`${prefixCls}-icon-clear`)).toBeTruthy()
            setTimeout(() => {
                IconEl.click()
                setTimeout(() => {
                    expect(InputEl.value).toBe('')
                    done()
                }, 100)
            }, 100)
        })

        it('error', () => {
            vm = createVue({
                template: `
                    <div>
                        <${Input} :error='error'></${Input}>
                    </div>`,
                data () {
                    return {
                        error: true
                    }
                }
            }, true)
            const InputBoxEl = vm.$el.children[0]
            expect(InputBoxEl.classList).toContain(`${prefix}input-error`)
        })
    })

    // describe('event', done => {
    //     it('focus', done => {
    //         vm = createVue({
    //             template: `
    //             <b-input
    //                 ref='input'
    //                 placeholder="请输入内容"
    //                 :value="input">
    //             </b-input>
    //           `,
    //             data () {
    //                 return {
    //                     input: 'a'
    //                 }
    //             }
    //         }, true)
    //         const spyFocus = sinon.spy()
    //         const spyBlur = sinon.spy()
    //         vm.$refs.input.$on('focus', spyFocus)
    //         vm.$refs.input.$on('blur', spyBlur)
    //         vm.$el.querySelector('input').focus()
    //         vm.$el.querySelector('input').blur()
    //         vm.$nextTick(_ => {
    //             expect(spyFocus.calledOnce).to.be.true
    //             expect(spyBlur.calledOnce).to.be.true
    //             done()
    //         })
    // const InputEl = vm.$el.querySelector(`${prefixCls}-box`)
    // setTimeout(() => {
    //     InputEl.focus()
    //     setTimeout(() => {
    //         expect(eventsData).to.be.true
    //         expect(InputEl.style.borderColor).to.be.equal('#52b7fc')
    //         expect(InputEl.style.boxShadow).to.be('0 0 0 2px rgba(45, 140, 240, 0.2)')
    //         done()
    //     }, 100)
    // }, 100)
    // })

    // it('event:change', done => {
    //     // NOTE: should be same as native's change behavior
    //     vm = createVue({
    //         template: `
    //         <b-input
    //             ref='input'
    //             placeholder="请输入内容"
    //             :value="input">
    //         </b-input>
    //       `,
    //         data () {
    //             return {
    //                 input: 'a'
    //             }
    //         }
    //     }, true)

    //     const inputElm = vm.$el.querySelector('input')
    //     const simulateEvent = (text, event) => {
    //         inputElm.value = text
    //         inputElm.dispatchEvent(new Event(event))
    //     }

    //     const spy = sinon.spy()
    //     vm.$refs.input.$on('change', spy)

    //     // simplified test, component should emit change when native does
    //     simulateEvent('1', 'input')
    //     simulateEvent('2', 'change')
    //     setTimeout(_ => {
    //         expect(spy.calledWith('2')).to.be.true
    //         expect(spy.calledOnce).to.be.true
    //         done()
    //     }, 100)
    // })

    //     it('keyup', done => {
    //         vm = geInputVm('keyup')
    //         const InputEl = vm.$el.querySelector(`input`)
    //         setTimeout(() => {
    //             InputEl.keyup()
    //             setTimeout(() => {
    //                 expect(eventsData).to.be.true
    //                 done()
    //             }, 100)
    //         }, 100)
    //     })

    //     it('keydown', done => {
    //         vm = geInputVm('keydown')
    //         const InputEl = vm.$el.querySelector(`input`)
    //         setTimeout(() => {
    //             InputEl.keydown()
    //             setTimeout(() => {
    //                 expect(eventsData).to.be.true
    //                 done()
    //             }, 100)
    //         }, 100)
    //     })

    //     it('change', done => {
    //         vm = createVue({
    //             template: `
    //                 <div>
    //                     <${prefix}input @change='handleChange' v-model='value'></${prefix}input>
    //                 </div>`,
    //             data () {
    //                 return {
    //                     clearable: true,
    //                     value: '清空',
    //                     changeData: ''
    //                 }
    //             },
    //             methods: {
    //                 handleChange (e) {
    //                     this.changeData = e.target.value
    //                 }
    //             }
    //         }, true)
    //         const InputEl = vm.$el.querySelector('input')
    //         setTimeout(() => {
    //             InputEl.value = 'test'
    //             setTimeout(() => {
    //                 expect(vm.changeData).to.be.equal('test')
    //                 done()
    //             }, 100)
    //         }, 100)
    //     })
    // })
})
