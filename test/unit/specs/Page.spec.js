/**
 * Created by gaoguoqing on 2018/11/30.
 *
 */
import { createTest, createVue, destroyVM } from '../utils'
import PageComponent from '&/components/page'
import { prefix } from '&/utils/common'

const prefixCls = `.${prefix}page`
const Page = `${prefix}page`

describe('Page', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('create', () => {
        vm = createTest(PageComponent)
        const elm = vm.$el
        // prev
        expect(elm.querySelector(`${prefixCls}-prev`)).to.exist
        // next
        expect(elm.querySelector(`${prefixCls}-next`)).to.exist
        // item
        expect(elm.querySelector(`${prefixCls}-item`)).to.exist
    })
    
    it('elevator', () => {
        vm = createTest(PageComponent, {
            showElevator: true
        })
        const elm = vm.$el
        expect(elm.querySelector(`${prefixCls}-elevator`)).to.exist
    })
    
    it('total', () => {
        vm = createVue({
            template: `
           <${Page} total=200 show-total></${Page}>
          `
        }, true)
        let elm = vm.$el
        expect(elm.querySelector(`${prefixCls}-total`)).to.exist
        expect(elm.querySelector(`${prefixCls}-total`).innerHTML).to.equal('共计 200 条')
    })
    
    it('total-slot', () => {
        vm = createVue({
            template: `
            <${Page} total=200 show-total>
                <span slot='total'>自定义 内容 </span>
            </${Page}>
          `
        }, true)
        let elm = vm.$el
        expect(elm.querySelector(`${prefixCls}-total`)).to.exist
        expect(elm.querySelector(`${prefixCls}-total`).innerHTML).to.equal(`<span>自定义 内容 </span>`)
    })
    
    it('mini', () => {
        vm = createTest(PageComponent, {
            mini: true
        })
        const elm = vm.$el
        expect(elm.classList.contains(`${prefixCls}-mini`)).to.exist
    })
    
    it('simple', () => {
        vm = createTest(PageComponent, {
            simple: true
        })
        const elm = vm.$el
        expect(elm.classList.contains(`${prefixCls}-simple`)).to.exist
    })
    
    it('on-page-change', done => {
        let result
        vm = createVue({
            template: `
        <${Page} @on-page-change="handleClick" total=100></${Page}>
      `,
            methods: {
                handleClick (page) {
                    result = page
                }
            }
        }, true)
        vm.$el.querySelectorAll(`${prefixCls}-item`)[2].click()
        setTimeout(_ => {
            expect(result).to.exist
            done()
        }, 20)
    })
})
