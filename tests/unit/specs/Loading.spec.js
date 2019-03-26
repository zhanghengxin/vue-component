import { createVue, destroyVM } from '../utils'
import Loading from '&/components/Loading'
import { prefix } from '&/utils/common'
let bLoading = prefix + 'loading'
let LoadingService = Loading.service

describe('Loading', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    describe('service', () => {
        it('create text', () => {
            vm = LoadingService({
                lock: true,
                text: 'Loading',
                body: true,
                spinner: 'chushihua',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(_ => {
                const mask = document.querySelector(`.${bLoading}-mask`)
                const text = mask.querySelector(`.${bLoading}-text`)
                expect(mask).toBeTruthy()
                expect(text).toBeTruthy()
                expect(text.textContent).toBe('Loading')
            }, 200)
        })

        it('customClass', () => {
            vm = LoadingService({ customClass: 'loading-custom-class' })
            setTimeout(_ => {
                const customClass = document.querySelector('.loading-custom-class')
                expect(customClass).toBeTruthy()
            }, 200)
        })
    })

    describe('directive', () => {
        it('create', done => {
            vm = createVue({
                template: `
            <div v-loading="loading" loading-text="Loading"></div>
          `,
                data () {
                    return {
                        loading: true
                    }
                }
            })
            vm.$nextTick(() => {
                const mask = vm.$el.querySelector(`.${bLoading}-mask`)
                const text = mask.querySelector(`.${bLoading}-text`)
                expect(mask).toBeTruthy()
                expect(text).toBeTruthy()
                expect(text.textContent).toBe('Loading')
                vm.loading = false
                setTimeout(() => {
                    expect(mask.style.display).toBe('none')
                    done()
                }, 100)
            })
        })
    })
})
