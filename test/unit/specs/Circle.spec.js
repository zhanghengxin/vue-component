
import Circle from '&/components/circle'
import { createTest, createVue, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}circle`

describe('Circle.vue',()=>{
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('percent radius strokew',() => {
        vm = createTest(Circle, {
            percent: 30,
            radius: 48,
            strokew: 6
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('cx')).to.equal('54')
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('r')).to.equal('48')
        expect(CircleEle.getElementsByTagName('foreignObject')[0].getElementsByTagName('div')[0].innerHTML).to.equal('30%')
    })
    it('strokec probarc textc',() => {
        vm = createTest(Circle, {
            strokec: '#0079CC',
            probarc: '#ff8092',
            textc: '#80d2ff'
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[0].style.stroke).to.equal('#0079cc')
        expect(CircleEle.getElementsByTagName('circle')[1].style.stroke).to.equal('#ff8092')
        expect(CircleEle.getElementsByTagName('foreignObject')[0].getElementsByTagName('div')[0].style.color).to.equal('rgb(128, 210, 255)')
    })
    it('size',() => {
        vm = createTest(Circle, {
            size: 'small'
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('r')).to.equal('40')
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('stroke-width')).to.equal('6')
    })
    it('comatch',() => {
        vm = createTest(Circle, {
            comatch: 'neuco'
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[1].getAttribute('class')).to.equal(`${prefixCls}-neuco`)
    })
})
