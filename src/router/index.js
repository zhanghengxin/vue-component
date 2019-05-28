import Vue from 'vue'
import Router from 'vue-router'
import menuList from '../utils/menu.json'
import onlineRun from '../components/onlineRun'

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
            if (route.incomeName) {
                route.component = r => require.ensure([], () =>
                    r(require(`../documents/businessLibs/income/${route.incomeName}.md`)))
            } else if (route.outputName) {
                route.component = r => require.ensure([], () =>
                    r(require(`../documents/businessLibs/output/${route.outputName}.md`)))
            } else {
                route.component = r => require.ensure([], () =>
                    r(require(`../documents/basicDocments/${route.name}.md`)))
            }
        }
    })
}
addRoute(routes)

routes.push(
    {
        path: '/run',
        components: {
            run: onlineRun
        }
    }
)
export default new Router({
    routes: routes
})
