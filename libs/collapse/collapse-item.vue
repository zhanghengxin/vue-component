/*
 * --------------------------------------------------------------------------- *
 *
 * @Author: yanghao
 * @Date: 2018-09-14 15:17:37
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-09-28 17:03:03
 *
 * --------------------------------------------------------------------------- *
 */

<template>
    <div :class="classtype" >
        <div class="bw-collapse-item-header" @click="handleChange">
            <b-icon type="xiala" size=12 :class="arrow" ></b-icon>
            <slot name="title"></slot>
        </div>
        <CollapseTransition>
            <div class="bw-collapse-item-content" v-show="show">
                <slot name="content"></slot>
            </div>
        </CollapseTransition>
    </div>
</template>

<script>
import CollapseTransition from './collapse-transition'

export default {
    name: 'bw-collapse-item',
    components: {CollapseTransition},
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
            return ['bw-collapse-item' + (this.show ? ' bw-collapse-item-header-active' : '')]
        },
        arrow () {
            let Cls
            if (this.show) {
                Cls = `bw-collapse-arrow  bw-collapse-arrow-${this.positionArrow}  bw-collapse-arrow-active-${this.positionArrow}`
            } else {
                Cls = `bw-collapse-arrow  bw-collapse-arrow-${this.positionArrow}`
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
