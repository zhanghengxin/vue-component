/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: BWCloudPrepose-catering
 * @FileName: invoice-edit.js
 * @Dependence: --
 * @Description: --
 * @CreatedBy: zhangliao
 * @CreateDate: 2018/2/24 下午2:32
 * @LastModifiedBy: zhangliao
 * @LastModifiedDate: 2018/2/24 下午2:32
 *
 * --------------------------------------------------------------------------- *
 */

import states from './states'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
    // namespaced:true,
    state () {
        return states
    },
    getters,
    mutations,
    actions
}
