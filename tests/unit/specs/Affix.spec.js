/*
 * @Author: hanshuai@baiwang.com
 * @Date: 2019-01-25 14:55:20
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 09:56:56
 */

import { createTest, destroyVM } from '../utils'
import Affix from '&/components/affix'
import { prefix } from '&/utils/common'
const bAffix = prefix + 'affix'

describe('affix', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createTest(Affix)
        expect(vm.$el.querySelector(`.${bAffix}`)).toBeTruthy()
    })
})
