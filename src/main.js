// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../libs/utils/compatible'
import codeShow from './components/CodeShow.vue'
import ColorShow from './components/ColorShow.vue'
import router from './router'
import bwUi from '../libs/index'
import '../libs/styles/index.scss'
import businessUI from '../businessLibs'
import './assets/scss/index.scss'

Vue.use(businessUI)
Vue.use(bwUi)
Vue.component('code-show', codeShow)
Vue.component('color-show', ColorShow)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
