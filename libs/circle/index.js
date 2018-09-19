import Circle from './Circle.vue'

Circle.install = function (Vue) {
    Vue.component(Circle.name, Circle)
}

export default Circle
