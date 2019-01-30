import { createTest, createVue, destroyVM } from '../utils'
import Tag from '&/components/Tag'
import { prefix } from '&/utils/common'
const bTag = prefix + 'tag'

describe('Tag', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue(`
            <div>
                <${bTag}>标签</${bTag}>
            </div>
        `)
        expect(vm.$el.querySelector(`.${bTag}`)).toBeTruthy()
    })

    describe('backcolor', () => {
        let colors = ['blue', 'green', 'orange', 'red']
        const test = i => it(`${colors[i]}`, () => {
            vm = createVue(`
                <div>
                    <${bTag} backcolor=${colors[i]}>标签</${bTag}>
                </div>
            `)
            expect(vm.$el.querySelector(`.${bTag}-back-${colors[i]}`)).toBeTruthy()
        })

        colors.forEach((item, i) => {
            test(i)
        })
    })

    describe('color', () => {
        let colors = ['blue', 'green', 'orange', 'red']
        const test = i => it(`${colors[i]}`, () => {
            vm = createTest(Tag, {
                type: 'dots',
                color: colors[i]
            })
            expect(vm.$el.querySelector(`.${bTag}-${colors[i]}`)).toBeTruthy()
        })

        colors.forEach((item, i) => {
            test(i)
        })
    })

    it('closeable', () => {
        vm = createVue(`
            <div>
                <${bTag} closeable>标签</${bTag}>
            </div>
        `)
        expect(vm.$el.querySelector(`.bw-quxiao-guanbi-shanchu`)).toBeTruthy()
    })
})
