/*
 * --------------------------------------------------------------------------- *
 *
 * @Author: yanghao
 * @Date: 2018-09-14 15:17:37
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-09-17 09:44:55
 *
 * --------------------------------------------------------------------------- *
 */

<template>
    <div :class="classtype" @click="handleChange">
        <div class="item-header">
            <b-icon type="xiala" size=12 :class="arrow" ></b-icon>
            <slot name="title"></slot>
        </div>
        <transition name="slideup">
            <div class="item-content" v-show="show">
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'CollapseItem',
    props: {
        name: {
            type: String
        },
        positionArrow: {
            type: String,
            default: 'arrow-left'
        }
    },
    data () {
        return {
            show: false,
            showname: '',
            isAccordion: this.collapse.getShowIndexArray().accordion,
            showIndexArray: this.collapse.getShowIndexArray().showIndexArray
        }
    },
    inject: ['collapse'],
    computed: {
        classtype () {
            return ['item' + (this.show ? ' item-header-active' : '')]
        },
        arrow () {
            return `arrow  ${this.positionArrow}`
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
    // 只关心当前自己是否展示
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

<style scoped>
.arrow{
    margin-right: 5px;
}
.arrow-right{
    transform: rotate(0deg);
    transition: transform 0.24s,
}

.item-header-active .arrow-right{
    display:inline-block;
    transform: rotate(90deg)
}

.arrow-left{
    transform: rotate(-90deg);
    transition: transform 0.24s,
}

.item-header-active .arrow-left{
    display:inline-block;
    transform: rotate(0deg)
}

</style>
