/**
 * Created by hanshuai on 2018/9/10.
 *
 */
import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'

Carousel.install = function (Vue) {
    Vue.component(Carousel.name, Carousel)
}

CarouselItem.install = function (Vue) {
    Vue.component(CarouselItem.name, CarouselItem)
}

export { Carousel, CarouselItem }
