/**
 * vuex 入口
 */

import Vue from 'vue'
import Vuex from 'vuex'
import invoiceIssue from './modules/invoice-issue/index'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// dev true, pro false
const DEBUG = true

export default new Vuex.Store({
    strict: DEBUG,
    modules: {
        invoiceIssue
    },
    plugins: [createPersistedState({
        // setState: (key, state, storage) => {
        //     let data = {
        //         user: state.user,
        //         app: state.app,
        //         permission: {
        //             doneRequest: state.permission.doneRequest,
        //             currentName: state.permission.currentName
        //         },
        //         invoiceEdit: state.invoiceEdit,
        //         jxindependent: state.jxindependent
        //     }

        //     sessionStorage.setItem(key, JSON.stringify(data))
        // }
        storage: sessionStorage
    })]
})
