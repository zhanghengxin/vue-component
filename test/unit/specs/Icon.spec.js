/**
 * Created by gaoguoqing on 2018/9/12.
 *
 */
import Icon from '&/components/icon'
import { createTest, createVue, destroyVM } from '../utils'

describe('Icon.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('type', () => {
        vm = createTest(Icon, {
            type: 'fapiaoshengcheng'
        }, true)
        let Elm = vm.$el
        expect(Elm.classList.contains('b-fapiaoshengcheng')).to.be.true
    })
    it('size', () => {
        vm = createTest(Icon, {
            size: 22
        }, true)
        let Elm = vm.$el
        expect(Elm.style.fontSize).to.equal('22px')
    })
    it('color', () => {
        vm = createTest(Icon, {
            color: 'red'
        }, true)
        let Elm = vm.$el
        expect(Elm.style.color).to.equal('red')
    })
    it('click', done => {
        let result
        vm = createVue({
            template: `
        <b-icon @on-click="handleClick"></b-icon>
      `,
            methods: {
                handleClick (evt) {
                    result = evt
                }
            }
        }, true)
        vm.$el.click()
        setTimeout(_ => {
            expect(result).to.exist
            done()
        }, 20)
    })
})
