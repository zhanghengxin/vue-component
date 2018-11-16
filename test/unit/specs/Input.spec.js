// import Input from '&/components/input'
import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const prefixCls = `.${prefix}input`

describe('Input', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
            <${prefix}input  
            :minlength="3"
            :maxlength="5"
            placeholder="请输入"
            @focus="handleFocus"
            value="input"></${prefix}input>
          `,
            data () {
                return {
                    inputFocus: false
                }
            },
            methods: {
                handleFocus () {
                    this.inputFocus = true
                }
            }
        }, true)
        let inputElm = vm.$el.querySelector('input')
        inputElm.focus()
        setTimeout(() => {
            expect(vm.inputFocus).to.be.true
            expect(inputEl.querySelector(`${prefixCls}`)).to.exist
            expect(inputElm.getAttribute('placeholder')).to.equal('请输入')
            expect(inputElm.value).to.equal('input')
            expect(inputElm.type).to.be.equal('text')
            expect(inputElm.getAttribute('minlength')).to.equal('3')
            expect(inputElm.getAttribute('maxlength')).to.equal('5')
            done()
        }, 100)
    })

    // 测试 props
    describe('props', () => {
        const geInputVm = (props, options) => {
            return createVue(Object.assign({
                template: `
                    <div>
                        <${prefix}input ${props} v-model="value"></${prefix}input>
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
            expect(vm.$el.querySelector(`input`).type).to.be.equal('password')
        })

        it('disabled', () => {
            vm = createVue({
                template: `
                    <div>
                        <${prefix}input :disabled='disabled'></${prefix}input>
                    </div>`,
                data () {
                    return {
                        disabled: true
                    }
                }
            }, true)
            expect(vm.$el.querySelector(`input`).disabled).to.be.ok
        })

        it('readonly', () => {
            vm = vm = createVue({
                template: `
                    <div>
                        <${prefix}input :readonly='readonly'></${prefix}input>
                    </div>`,
                data () {
                    return {
                        readonly: true
                    }
                }
            }, true)
            expect(vm.$el.querySelector(`input`).getAttribute('readonly')).to.be.ok
        })

        it('name', () => {
            vm = geInputVm(`name='userName'`)
            expect(vm.$el.querySelector(`input`).getAttribute('name')).to.be.equal('userName')
        })

        it('size', () => {
            vm = geInputVm(`size='large'`)
            expect(vm.$el.querySelector(`input`).getAttribute('class')).include(`${prefix}input-large`)
        })

        it('type', () => {
            vm = createVue({
                template: `
                    <div>
                        <${prefix}input 
                        type='textarea'
                        autosize='autosize'></${prefix}input>
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
            expect(vm.$el.querySelector('textarea')).to.exist
        })

        it('prefix', () => {
            vm = createVue({
                template: `
                    <div>
                        <${prefix}input :prefix='iconPrefix' icon='chaxun'></${prefix}input>
                    </div>`,
                data () {
                    return {
                        iconPrefix: true
                    }
                }
            }, true)
            expect(vm.$el.querySelector(`.${prefix}chaxun`)).to.exist
            expect(vm.$el.querySelector(`${prefixCls}-icon`)).to.exist
            expect(vm.$el.querySelector(`${prefixCls}-icon-prefix`)).to.exist
        })

        it('clear', () => {
            vm = createVue({
                template: `
                    <div>
                        <${prefix}input :clearable='clearable' v-model='value'></${prefix}input>
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
            expect(vm.$el.querySelector(`.${prefix}yidongduan_conclose`)).to.exist
            expect(vm.$el.querySelector(`${prefixCls}-icon-suffix`)).to.exist
            expect(vm.$el.querySelector(`${prefixCls}-icon-clear`)).to.exist
            setTimeout(() => {
                IconEl.click()
                setTimeout(() => {
                    expect(InputEl.value).to.equal('')
                    done()
                }, 100)
            }, 100)
        })

        it('error', () => {
            vm = createVue({
                template: `
                    <div>
                        <${prefix}input :error='error'></${prefix}input>
                    </div>`,
                data () {
                    return {
                        error: true
                    }
                }
            }, true)
            const InputEl = vm.$el.querySelector(`.${prefix}-box`)
            setTimeout(() => {
                InputEl.focus()
                setTimeout(() => {
                    expect(InputEl.style.borderColor).to.be.equal('#f44336')
                    expect(InputEl.style.boxShadow).to.be('0 0 0 2px rgba(244, 67, 54, 0.2)')
                    done()
                }, 100)
            }, 100)
        })
    })

    describe('event', () => {
        let eventsData = false
        const geInputVm = (events = null) => {
            return createVue(Object.assign({
                template: `
                    <${prefix}input @${events}='events'></${prefix}input>
                `,
                methods: {
                    events (e) {
                        eventsData = true
                    }
                }
            }), true)
        }

        it('hover', () => {
            vm = geInputVm()
            const InputEl = vm.$el.querySelector(`.${prefix}-box`)
            setTimeout(() => {
                InputEl.hover()
                setTimeout(() => {
                    expect(InputEl.style.borderColor).to.be.equal('#52b7fc')
                    done()
                }, 100)
            }, 100)
        })

        it('focus', () => {
            vm = geInputVm('focus')
            const InputEl = vm.$el.querySelector(`.${prefix}-box`)
            setTimeout(() => {
                InputEl.focus()
                setTimeout(() => {
                    expect(eventsData).to.be.true
                    expect(InputEl.style.borderColor).to.be.equal('#52b7fc')
                    expect(InputEl.style.boxShadow).to.be('0 0 0 2px rgba(45, 140, 240, 0.2)')
                    done()
                }, 100)
            }, 100)
        })

        it('keyup', () => {
            vm = geInputVm('keyup')
            const InputEl = vm.$el.querySelector(`input`)
            setTimeout(() => {
                InputEl.keyup()
                setTimeout(() => {
                    expect(eventsData).to.be.true
                    done()
                }, 100)
            }, 100)
        })

        it('keydown', () => {
            vm = geInputVm('keydown')
            const InputEl = vm.$el.querySelector(`input`)
            setTimeout(() => {
                InputEl.keydown()
                setTimeout(() => {
                    expect(eventsData).to.be.true
                    done()
                }, 100)
            }, 100)
        })

        it('change', () => {
            let changeData = ''
            vm = createVue({
                template: `
                    <div>
                        <${prefix}input @change='change' v-model='value'></${prefix}input>
                    </div>`,
                data () {
                    return {
                        clearable: true,
                        value: '清空'
                    }
                },
                methods: {
                    change (e) {
                        changeData = e
                    }
                }
            }, true)
            const InputEl = vm.$el.querySelector(`input`)
            setTimeout(() => {
                InputEl.setAttribute('value', 'test')
                setTimeout(() => {
                    expect(changeData).to.be.equal('test')
                    done()
                }, 100)
            }, 100)
        })
    })
})
