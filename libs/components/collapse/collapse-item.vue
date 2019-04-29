/*
* --------------------------------------------------------------------------- *
*
* @Author: yanghao
* @Date: 2018-09-14 15:17:37
* @Last Modified by: yanghao
* @Last Modified time: 2018-12-03 16:43:19
*
* --------------------------------------------------------------------------- *
*/

<template>
    <div :class="classtype">
        <div :class="header" @click="handleChange">
            <Icon type="xia" size=12 :class="arrow"></Icon>
            <slot name="title"></slot>
        </div>
        <CollapseTransition>
            <div :class="content" v-show="show">
                <slot name="content"></slot>
            </div>
        </CollapseTransition>
    </div>
</template>

<script>
import CollapseTransition from './collapse-transition'
import Icon from '../icon'
import { prefix } from '../../utils/common'

export default {
    name: `${prefix}collapse-item`,
    components: {CollapseTransition, Icon},
    props: {
        name: {
            type: String
        }
    },
    data () {
        return {
            show: false,
            showname: '',
            isAccordion: this.collapse.getShowIndexArray().accordion,
            showIndexArray: this.collapse.getShowIndexArray().showIndexArray,
            positionArrow: this.collapse.positionArrow
        }
    },
    inject: ['collapse'],
    computed: {
        classtype () {
            return [`${prefix}collapse-item` + (this.show ? ` ${prefix}collapse-item-header-active` : '')]
        },
        header () {
            return `${prefix}collapse-item-header`
        },
        content () {
            return `${prefix}collapse-item-content`
        },
        arrow () {
            let Cls
            if (this.show) {
                Cls = `${prefix}collapse-arrow  ${prefix}collapse-arrow-${this.positionArrow}  ${prefix}collapse-arrow-active-${this.positionArrow}`
            } else {
                Cls = `${prefix}collapse-arrow  ${prefix}collapse-arrow-${this.positionArrow}`
            }
            return Cls
        }
    },
    mounted () {
        // this.$parent.$children.forEach((item, index) => {
        //   item.showname = item.name || index.toString()
        // })
        var index = [].indexOf.call(this.$el.parentNode.children, this.$el)
        this.showname = this.name || index.toString()
        this.isShow(this.showname)
    },
    methods: {
        isShow (name) {
            this.show = this.showIndexArray.indexOf(name) > -1
        },
        hideAll () {
            this.showIndexArray = []
            this.$parent.$children.forEach(item => {
                item.show = false
            })
        },
        handleChange () {
            const accordion = this.isAccordion
            const tmp = this.showname

            if (accordion) {
                if (!this.show) {
                    this.hideAll()
                    this.showIndexArray.push(tmp)
                } else {
                    this.hideAll()
                }
            } else {
                if (!this.show) {
                    this.showIndexArray.push(tmp)
                } else {
                    const removeIndex = this.showIndexArray.indexOf(tmp)
                    this.showIndexArray.splice(removeIndex, 1)
                }
            }
            this.isShow(tmp)
            this.$parent.toggle(this.showIndexArray)
        }
    }
}
</script>
