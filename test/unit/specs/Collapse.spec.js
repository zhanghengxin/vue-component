import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const prefixCls = `.${prefix}collapse`

describe('Collapse', () => {
    let vm
    // 在本区块的每个测试用例之后执行
    afterEach(() => {
        destroyVM(vm)
    })

    // props
    describe('props test', () => {
        vm = createVue({
            template: `
                <div>
                    <b-collapse v-model="showList">
                        <b-collapse-item name='show'>
                            <span slot="title">This is Title</span>
                            <div slot="content">
                                <div>This is Content</div>
                            </div>
                        </b-collapse-item>
                    </b-collapse>
                </div>
                `,
            data () {
                return {
                    showList: ['show']
                }
            }
        }, true)
        it('name', () => {
            expect(vm.$children[0].$el.querySelector(`${prefixCls}-item`).classList.contains('b-collapse-item-header-active')).to.be.true
        })

        const getCollapseVm = (props, options) => {
            return createVue(Object.assign({
                template: `
                <div>
                    <b-collapse ${props}  v-model="showList1">
                        <b-collapse-item name='one'>
                            <span slot="title">This is Title1</span>
                            <div slot="content">
                                <div>This is Content1</div>
                            </div>
                        </b-collapse-item>
                    </b-collapse>    
                </div>
                `,
                data () {
                    return {
                        showList1: ['one']
                    }
                }
            }, options), true)
        }
        // props
        // it('name', () => {
        //     vm = getCollapseVm('')
        //     expect(vm.$children[0].$el.querySelector(`${prefixCls}-item`).classList.contains('b-collapse-item-header-active')).to.be.true
        // })

        it('positionArrow', () => {
            vm = getCollapseVm('positionArrow = "left"')
            expect(vm.$children[0].$children[0].$el.querySelector(`${prefixCls}-arrow`).classList.contains('b-collapse-arrow-left')).to.be.true
        })
        it('simple', () => {
            vm = getCollapseVm('simple')
            const collapseEl = vm.$el.querySelector(`${prefixCls}box`)
            expect(collapseEl.classList.contains('b-collapsebox-simple')).to.be.true
        })

        // event
        it('event:change', done => {
            let result
            vm = createVue({
                template: `
                <div>
                    <b-collapse  @change="handle" v-model="showList1" ref="collapse">
                        <b-collapse-item name='one' ref="item1">
                            <span slot="title">This is Title1</span>
                            <div slot="content">
                                <div>This is Content1</div>
                            </div>
                        </b-collapse-item>
                    </b-collapse>    
                </div>
                `,
                data () {
                    return {
                        showList1: ['one']
                    }
                },
                methods: {
                    handle (val) {
                        result = val
                    }
                }
            }, true)
            const spy = sinon.spy()
            vm.$refs.collapse.$on('change', spy)
            vm.$refs.item1.$el.querySelector('.b-collapse-item-header').click()
            vm.$nextTick(_ => {
                expect(spy.withArgs().calledOnce).to.be.true
                done()
            })
        })
    })
})
