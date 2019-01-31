
import Circle from '&/components/circle'
import { createTest, destroyVM } from '../utils'
import {prefix} from '&/utils/common'
const prefixCls = `${prefix}circle`

describe('Circle.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('percent radius strokew', () => {
        vm = createTest(Circle, {
            percent: 30,
            radius: 48,
            strokew: 6
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('cx')).toBe('54')
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('r')).toBe('48')
        expect(CircleEle.getElementsByTagName('foreignObject')[0].getElementsByTagName('div')[0].innerHTML).toBe('30%')
    })
    it('strokec probarc textc', () => {
        vm = createTest(Circle, {
            strokec: '#0079CC',
            probarc: '#ff8092',
            textc: '#80d2ff'
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[0].style.stroke).toBe('#0079CC')
        expect(CircleEle.getElementsByTagName('circle')[1].style.stroke).toBe('#ff8092')
        expect(CircleEle.getElementsByTagName('foreignObject')[0].getElementsByTagName('div')[0].style.color).toBe('rgb(128, 210, 255)')
    })
    it('size', () => {
        vm = createTest(Circle, {
            size: 'small'
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('r')).toBe('40')
        expect(CircleEle.getElementsByTagName('circle')[0].getAttribute('stroke-width')).toBe('6')
    })
    it('comatch', () => {
        vm = createTest(Circle, {
            comatch: 'neuco'
        }, true)
        let CircleEle = vm.$el
        expect(CircleEle.getElementsByTagName('circle')[1].getAttribute('class')).toBe(`${prefixCls}-neuco`)
    })
})
