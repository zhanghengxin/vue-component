/*
 * @Author: hanshuai
 * @Date: 2018-09-21 14:44:23
 * @Last Modified by: hanshuai
 * @Last Modified time: 2018-09-21 15:04:56
 */

import Card from './Card.vue'

Card.install = function (Vue) {
    Vue.component(Card.name, Card)
}

export default Card
