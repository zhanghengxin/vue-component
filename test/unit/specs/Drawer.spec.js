import Drawer from '&/components/drawer'
import {
    createTest,
    createVue,
    destroyVM
} from '../utils'

describe('Drawer.vue', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('local', () => {
        vm = createTest(Drawer, {
            local: 'right'
        }, true)
        let Elm = vm.$el
        // expect(Elm.classList.contains('b-drawer-right')).to.be.true
        expect(Elm.querySelector('.b-drawer-right')).to.exist
    })
})
