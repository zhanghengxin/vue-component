/*
 * --------------------------------------------------------------------------- *
 *
 * @Author: yanghao
 * @Date: 2018-09-14 15:17:51
 * @Last Modified by: yanghao
 * @Last Modified time: 2018-09-14 18:18:58
 *
 * --------------------------------------------------------------------------- *
 */

<template>
    <div :class="classtype">
        <slot></slot>
    </div>
</template>

<script>
const Cls = 'collapsebox'
export default {
    name: 'Collapse',
    props: {
        accordion: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Array]
        },
        simple: {
            type: Boolean,
            default: false
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
            return [`${Cls}`]
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
            //   设置父组件的v - module的值
            //   this.$emit('input', this.value)
        }
    }
}
</script>

<style>
.collapsebox{
    border-radius: 3px;
    border: 1px solid #dcdee2;
}
.item{
    border-top: 1px solid #dcdee2;
}
.collapsebox .item:first-child{
    border-top:0
}
.item-header{
    cursor: pointer;
    height: 38px;
    line-height: 38px;
    padding-left: 16px;
    background: #f7f7f7;
}
/* 展开 */
.item-header-active .item-header{
    border-bottom: 1px solid #dcdee2;
}
.item-content{
    color: #515a6e;
    padding: 16px;
    background-color: #fff;
}
</style>
