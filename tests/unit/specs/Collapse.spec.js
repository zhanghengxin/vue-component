import { createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const prefixCls = `.${prefix}collapse`
const Collapse = `${prefix}collapse`
const CollapseItem = `${prefix}collapse-item`
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
                    <${Collapse} v-model="showList">
                        <${CollapseItem} name='show'>
                            <span slot="title">This is Title</span>
                            <div slot="content">
                                <div>This is Content</div>
                            </div>
                        </${CollapseItem}>
                    </${Collapse} >
                </div>
                `,
            data () {
                return {
                    showList: ['show']
                }
            }
        }, true)
        it('name', () => {
            expect(vm.$children[0].$el.querySelector(`${prefixCls}-item`).classList).toContain(CollapseItem + '-header-active')
        })

        const getCollapseVm = (props, options) => {
            return createVue(Object.assign({
                template: `
                <div>
                    <${Collapse} ${props}  v-model="showList1">
                        <${CollapseItem} name='one'>
                            <span slot="title">This is Title1</span>
                            <div slot="content">
                                <div>This is Content1</div>
                            </div>
                        </${CollapseItem}>
                    </${Collapse}>    
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
            expect(vm.$children[0].$children[0].$el.querySelector(`${prefixCls}-arrow`).classList).toContain(Collapse + '-arrow-left')
        })
        it('simple', () => {
            vm = getCollapseVm('simple')
            const collapseEl = vm.$el.querySelector(`${prefixCls}box`)
            expect(collapseEl.classList).toContain(Collapse + 'box-simple')
        })

        // event
        // it('event:change', done => {
        //     vm = createVue({
        //         template: `
        //         <div>
        //             <${Collapse}  @change="handle" v-model="showList1" ref="collapse">
        //                 <${CollapseItem} name='one' ref="item1">
        //                     <span slot="title">This is Title1</span>
        //                     <div slot="content">
        //                         <div>This is Content1</div>
        //                     </div>
        //                 </${CollapseItem}>
        //             </${Collapse}>
        //         </div>
        //         `,
        //         data () {
        //             return {
        //                 showList1: ['']
        //             }
        //         },
        //         methods: {
        //             handle (val) {
        //             }
        //         }
        //     }, true)
        //     const spy = sinon.spy()
        //     vm.$refs.collapse.$on('change', spy)
        //     vm.$refs.item1.$el.querySelector(`${prefixCls}-item-header`).click()
        //     vm.$nextTick(_ => {
        //         expect(spy.withArgs().calledOnce).toBeTruthy()
        //         done()
        //     })
        // })
    })
})
