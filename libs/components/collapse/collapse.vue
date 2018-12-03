/*
 * --------------------------------------------------------------------------- *
 *
 * @Author: yanghao
 * @Date: 2018-09-14 15:17:51
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-12-03 10:21:24
 *
 * --------------------------------------------------------------------------- *
 */

<template>
    <div :class="classtype" >
        <slot></slot>
    </div>
</template>

<script>
import { prefix } from '../../utils/common'
const Cls = `${prefix}collapsebox`
export default {
    name: `${prefix}collapse`,
    props: {
        accordion: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Array],
            default () {
                return []
            }
        },
        simple: {
            type: Boolean,
            default: false
        },
        positionArrow: {
            type: String,
            default: 'left'
        }
    },
    data () {
        return {
            currentIndex: [].concat(this.value)
        }
    },
    provide () {
        return {
            collapse: this
        }
    },
    mounted () {
        this.getShowIndexArray()
    },
    computed: {
        classtype () {
            return [`${Cls}`, {[`${Cls}-simple`]: this.simple}]
        }
    },
    methods: {
        getShowIndexArray () {
            var accordion = this.accordion
            var showIndexArray = this.currentIndex
            if (accordion) {
                showIndexArray = [].concat(this.currentIndex[0])
            }
            return {showIndexArray, accordion}
        },
        toggle (val) {
            this.$emit('change', val)
        }
    }
}
</script>
