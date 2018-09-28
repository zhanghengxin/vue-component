import Vue from 'vue'
import Router from 'vue-router'
import menuList from '../utils/menu.json'

Vue.use(Router)

let routes = []

Object.keys(menuList).forEach((item) => {
    routes = routes.concat(menuList[item])
})
let addRoute = (router) => {
    router.forEach((route) => {
        if (route.items) {
            addRoute(route.items)
            routes = routes.concat(route.items)
        } else if (route.name) {
            route.component = r => require.ensure([], () =>
                r(require(`../documents/${route.name}.md`)))
        }
    })
}
addRoute(routes)
export default new Router({
    routes: routes
})
