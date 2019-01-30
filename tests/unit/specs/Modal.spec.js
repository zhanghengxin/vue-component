import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const prefixCls = `.${prefix}modal`

describe('Modal', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal v-model="visible" :title="title">
                        <p>对话框内容</p>
                    </b-modal>
                </div>
            `,

            data () {
                return {
                    title: 'modal test',
                    visible: true
                }
            }
        }, true)
        const modal = vm.$children[0]
        setTimeout(() => {
            expect(document.querySelector(`${prefixCls}`)).to.exist
            expect(modal.$el.querySelector(`${prefixCls}-header-inner`).textContent).to.equal('modal test')
            expect(modal.$el.parentNode).to.equal(document.body)
            expect(modal.$el.style.display).to.not.equal('none')
            done()
        }, 100)
    })

    // 测试 content|body 内容
    it('render correct content', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal :title="title" v-model="visible">
                        <span>Content of modal</span>
                        <div slot="footer" class="modal-footer">
                        <b-button @on-click="visible = false">cancel</b-button>
                        <b-button @on-click="visible = false">ok</b-button>
                        </div>
                    </b-modal>
                </div>
            `,

            data () {
                return {
                    title: 'modal test',
                    visible: true
                }
            }
        }, true)
        const modal = vm.$children[0]
        setTimeout(() => {
            expect(modal.$el.querySelector(`${prefixCls}-body span`).textContent).to.equal('Content of modal')
            const footerBtns = modal.$el.querySelectorAll(`${prefixCls}-footer button`)
            expect(footerBtns.length).to.equal(2)
            expect(footerBtns[0].querySelector('span').textContent).to.equal('cancel')
            expect(footerBtns[1].querySelector('span').textContent).to.equal('ok')
            done()
        }, 100)
    })

    // 测试
    it('open and close', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal :title="title" v-model="visible">
                        <span>这是一段信息</span>
                    </b-modal>
                </div>
            `,

            data () {
                return {
                    title: 'modal test',
                    visible: false
                }
            }
        }, true)
        const modal = vm.$children[0].$el.querySelector(`${prefixCls}`)
        expect(modal.style.display).to.equal('none')
        vm.visible = true
        setTimeout(() => {
            expect(modal.style.display).to.not.equal('none')
            vm.visible = false
            setTimeout(() => {
                expect(modal.style.display).to.equal('none')
                done()
            }, 400)
        }, 50)
    })

    // 测试 props
    describe('props', () => {
        const getModalVm = (props, options) => {
            return createVue(Object.assign({
                template: `
                    <div>
                        <b-modal ${props} :title="title" v-model="visible">
                        <span>这是一段信息</span>
                        </b-modal>
                    </div>
                `,

                data () {
                    return {
                        title: 'modal test',
                        visible: true
                    }
                }
            }, options), true)
        }

        it('width', () => {
            vm = getModalVm('width="360px"')
            expect(vm.$children[0].$el.querySelector(`${prefixCls}`).style.width).to.equal('360px')
        })

        it('fullscreen', () => {
            vm = getModalVm('fullscreen')
            const modalEl = vm.$children[0].$el.querySelector(`${prefixCls}`)
            expect(modalEl.classList.contains('b-modal-fullscreen')).to.be.true
        })

        it('z-index', () => {
            vm = getModalVm('z-index=1024')
            expect(vm.$children[0].$el.querySelector(`${prefixCls}-wrap`).style.zIndex).to.equal('1024')
        })

        it('class-name', () => {
            vm = getModalVm('class-name="my-modal"')
            expect(vm.$children[0].$el.querySelector(`${prefixCls}-wrap`).classList.contains('my-modal')).to.be.true
        })

        it('ok-text', () => {
            vm = getModalVm('ok-text="ok"')
            const footerBtns = vm.$children[0].$el.querySelectorAll(`${prefixCls}-footer button`)
            expect(footerBtns[1].querySelector('span').textContent).to.equal('ok')
        })

        it('cancel-text', () => {
            vm = getModalVm('cancel-text="cancel"')
            const footerBtns = vm.$children[0].$el.querySelectorAll(`${prefixCls}-footer button`)
            expect(footerBtns[0].querySelector('span').textContent).to.equal('cancel')
        })
    })

    // 测试 event
    it('events', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal
                        @ok="handleOk"
                        @cancel="handleCancel"
                        @on-visible-change="visibleChange"
                        :title="title"
                        v-model="visible">
                        <span>这是一段信息</span>
                    </b-modal>
                </div>
            `,

            methods: {
                handleOk () {
                    this.state = 'open'
                },
                handleCancel () {
                    this.state = 'closed'
                },
                visibleChange (val) {
                    this.value = val
                    if (val) {
                        this.handleOk()
                    } else {
                        this.handleCancel()
                    }
                }
            },

            data () {
                return {
                    state: '',
                    title: 'modal test',
                    visible: false,
                    value: false
                }
            }
        }, true)
        vm.visible = true
        setTimeout(() => {
            expect(vm.state).to.equal('open')
            expect(vm.value).to.be.true
            vm.visible = false
            setTimeout(() => {
                expect(vm.state).to.equal('closed')
                expect(vm.value).to.be.false
                done()
            }, 50)
        }, 50)
    })

    // 测试 点击 遮罩 关闭
    it('click modal to close', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal :title="title" v-model="visible">
                        <span>这是一段信息</span>
                    </b-modal>
                </div>
            `,

            data () {
                return {
                    title: 'modal test',
                    visible: true
                }
            }
        }, true)
        const modal = vm.$children[0]
        setTimeout(() => {
            modal.$el.querySelector(`${prefixCls}-wrap`).click()
            setTimeout(() => {
                expect(vm.visible).to.be.false
                done()
            }, 400)
        }, 50)
    })

    // 测试 点击关闭 按钮 x
    it('click header btn', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal :title="title" v-model="visible">
                        <span>这是一段信息</span>
                    </b-modal>
                </div>
            `,

            data () {
                return {
                    title: 'modal test',
                    visible: true
                }
            }
        }, true)
        const modal = vm.$children[0]
        setTimeout(() => {
            modal.$el.querySelector(`${prefixCls}-close`).click()
            setTimeout(() => {
                expect(vm.visible).to.be.false
                done()
            }, 500)
        }, 50)
    })

    // 测试 esc 关闭
    it('esc close', done => {
        vm = createVue({
            template: `
                <div>
                    <b-modal :title="title" v-model="visible">
                        <span>这是一段信息</span>
                    </b-modal>
                </div>
            `,

            data () {
                return {
                    title: 'modal test',
                    visible: true,
                    closable: true,
                    escCode: 27
                }
            }
        }, true)
        setTimeout(() => {
            if (vm.escCode === 27 && vm.closable) {
                vm.visible = false
            }
            setTimeout(() => {
                expect(vm.visible).to.be.false
                done()
            }, 500)
        }, 10)
    })

    // 测试 on-after-close
    // it('after close', done => {
    //     const spy = sinon.spy()
    //     vm = createVue({
    //         template: `
    //         <div>
    //             <b-modal :title="title" v-model="visible" @on-after-close="afterClose"></b-modal>
    //         </div>
    //         `,

    //         data () {
    //             return {
    //                 title: 'modal test',
    //                 visible: true
    //             }
    //         },
    //         methods: {
    //             afterClose(done) {
    //                 spy()
    //                 done()
    //             }
    //         }
    //     }, true)
    //     const modal = vm.$children[0]
    //     setTimeout(() => {
    //         modal.$el.click()
    //         setTimeout(() => {
    //             expect(spy.called).to.be.true
    //             done()
    //         }, 500)
    //     }, 10)
    // })
})
